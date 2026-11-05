"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { clientsidejwt } from "@/lib/clientsidejwt";
import Link from "next/link";
import StudioBookingCard from "@/components/StudioBookingCard";
import { toast } from "sonner";

interface Booking {
  _id: string;
  studioId: string;
  studioName?: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  duration: number;
  totalAmount: number;
  status: string;
  createdAt?: string;
}

export default function MyBookingsPage() {
  const { data: session } = authClient.useSession();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [deleteError, setDeleteError] = useState<string>("");
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentTime(new Date());

    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function fetchUserBookings() {
      if (!session?.user?.email) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError("");

        const token = await clientsidejwt();

        if (!token) {
          throw new Error(
            "Authentication token not found. Please log in again.",
          );
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/my-bookings`,
          {
            cache: "no-store",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!res.ok) {
          throw new Error("Failed to fetch your bookings.");
        }

        const data = await res.json();

        const processedBookings = Array.isArray(data) ? data : [];

        setBookings(processedBookings);
      } catch (err) {
        const errMessage =
          err instanceof Error ? err.message : "Something went wrong.";
        setError(errMessage);
        toast.error(errMessage);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserBookings();
  }, [session?.user?.email]);

  const getBookingTimes = (booking: Booking) => {
    const bookingStart = new Date(
      `${booking.bookingDate}T${booking.startTime}:00+06:00`,
    );

    const bookingEnd = new Date(
      `${booking.bookingDate}T${booking.endTime}:00+06:00`,
    );

    return { bookingStart, bookingEnd };
  };

  const getBookingStatus = (booking: Booking) => {
    const currentStatus = booking.status?.toLowerCase().trim();

    if (currentStatus === "cancelled" || currentStatus === "completed") {
      return currentStatus === "cancelled" ? "Cancelled" : "Completed";
    }

    if (!currentTime) return "Pending";

    const { bookingStart, bookingEnd } = getBookingTimes(booking);

    if (
      Number.isNaN(bookingStart.getTime()) ||
      Number.isNaN(bookingEnd.getTime())
    ) {
      return "Pending";
    }

    if (currentTime < bookingStart) {
      return "Pending";
    }

    if (currentTime >= bookingStart && currentTime < bookingEnd) {
      return "Confirmed";
    }

    return "Completed";
  };

  const isBookingActive = (booking: Booking) => {
    if (!currentTime) return false;

    const { bookingStart, bookingEnd } = getBookingTimes(booking);

    if (
      Number.isNaN(bookingStart.getTime()) ||
      Number.isNaN(bookingEnd.getTime())
    ) {
      return false;
    }

    return currentTime >= bookingStart && currentTime < bookingEnd;
  };

  const handleDeleteBooking = async () => {
    if (!selectedBooking || !session?.user?.email) {
      const errMessage = "Please login before cancelling a booking.";
      setDeleteError(errMessage);
      toast.error(errMessage);
      return;
    }

    if (isBookingActive(selectedBooking)) {
      const errMessage = "You cannot cancel a booking while it is active.";
      setDeleteError(errMessage);
      toast.error(errMessage);
      return;
    }

    if (getBookingStatus(selectedBooking) !== "Pending") {
      const errMessage = "Only pending bookings can be cancelled.";
      setDeleteError(errMessage);
      toast.error(errMessage);
      return;
    }

    try {
      setDeletingId(selectedBooking._id);
      setDeleteError("");

      const token = await clientsidejwt();

      if (!token) {
        throw new Error("Authentication token not found. Please log in again.");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${selectedBooking._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to cancel booking.");
      }

      setBookings((previousBookings) =>
        previousBookings.map((booking) =>
          booking._id === selectedBooking._id
            ? { ...booking, status: "Cancelled" }
            : booking,
        ),
      );

      toast.success("Booking cancelled successfully!");
      setSelectedBooking(null);
    } catch (err) {
      const errMessage =
        err instanceof Error ? err.message : "Something went wrong.";
      setDeleteError(errMessage);
      toast.error(errMessage);
    } finally {
      setDeletingId(null);
    }
  };

  const formatCurrency = (amount: number) =>
    `৳${Number(amount || 0).toLocaleString("en-BD")}`;

  return (
    <div className="space-y-8 max-w-6xl mx-auto animate-fadeIn">
      <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            My Studio Bookings
          </h1>
          <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">
            Review all your reserved creative spaces and reservation statuses.
          </p>
        </div>

        <Link
          href="/explore"
          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shadow-sm shadow-emerald-600/20"
        >
          Book New Studio
        </Link>
      </div>

      {isLoading ? (
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-emerald-500 border-t-transparent"></div>
          <p className="text-sm text-gray-500 dark:text-zinc-400 mt-3">
            Loading your bookings...
          </p>
        </div>
      ) : error ? (
        <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-2xl p-6 text-center text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      ) : bookings.length === 0 ? (
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl p-12 text-center shadow-sm space-y-4">
          <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mx-auto text-2xl font-bold">
            📅
          </div>

          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            No Bookings Found
          </h3>

          <p className="text-sm text-gray-500 dark:text-zinc-400 max-w-sm mx-auto">
            You haven't reserved any studio spaces yet. Explore our listings and
            book your first session!
          </p>

          <Link
            href="/explore"
            className="inline-block px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors"
          >
            Explore Studios
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookings.map((booking) => {
            const active = isBookingActive(booking);

            const displayedBooking = {
              ...booking,
              status: getBookingStatus(booking),
            };

            return (
              <StudioBookingCard
                key={booking._id}
                booking={displayedBooking}
                active={active}
                isDeleting={deletingId === booking._id}
                onDeleteClick={(selected) => {
                  setDeleteError("");
                  setSelectedBooking(selected);
                }}
                formatCurrency={formatCurrency}
              />
            );
          })}
        </div>
      )}

      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-gray-200 dark:border-zinc-800 p-6 space-y-5">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Cancel Booking?
              </h2>

              <p className="text-sm text-gray-500 dark:text-zinc-400 mt-2">
                Are you sure you want to cancel this booking? This action cannot
                be undone.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-zinc-800 rounded-xl p-4 space-y-2 text-sm">
              <p className="text-gray-700 dark:text-zinc-300">
                <span className="font-semibold">Studio:</span>{" "}
                {selectedBooking.studioName || "Studio Space"}
              </p>

              <p className="text-gray-700 dark:text-zinc-300">
                <span className="font-semibold">Date:</span>{" "}
                {selectedBooking.bookingDate}
              </p>

              <p className="text-gray-700 dark:text-zinc-300">
                <span className="font-semibold">Time:</span>{" "}
                {selectedBooking.startTime} - {selectedBooking.endTime}
              </p>

              <p className="text-gray-700 dark:text-zinc-300">
                <span className="font-semibold">Amount:</span>{" "}
                {formatCurrency(selectedBooking.totalAmount)}
              </p>
            </div>

            {deleteError && (
              <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-lg p-3">
                {deleteError}
              </p>
            )}

            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
              <button
                type="button"
                disabled={deletingId !== null}
                onClick={() => {
                  setSelectedBooking(null);
                  setDeleteError("");
                }}
                className="px-5 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-zinc-300 font-semibold text-sm hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50"
              >
                Close
              </button>

              <button
                type="button"
                disabled={deletingId === selectedBooking._id}
                onClick={handleDeleteBooking}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm transition-colors disabled:opacity-50"
              >
                {deletingId === selectedBooking._id
                  ? "Cancelling..."
                  : "Yes, Cancel Booking"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
