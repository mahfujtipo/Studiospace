// src/app/dashboard/bookings/page.tsx
"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

interface Booking {
  _id: string;
  studioId: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  duration: number;
  totalAmount: number;
  status: string;
  createdAt: string;
}

export default function MyBookingsPage() {
  const { data: session } = authClient.useSession();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [deleteError, setDeleteError] = useState<string>("");
  const [deleteSuccess, setDeleteSuccess] = useState<string>("");
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

        const res = await fetch(
          `http://localhost:8000/bookings/my-bookings?email=${encodeURIComponent(
            session.user.email,
          )}`,
          { cache: "no-store" },
        );

        if (!res.ok) {
          throw new Error("Failed to fetch your bookings.");
        }

        const data = await res.json();
        setBookings(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
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
      setDeleteError("Please login before deleting a booking.");
      return;
    }

    if (isBookingActive(selectedBooking)) {
      setDeleteError("You cannot delete a booking while it is active.");
      return;
    }

    try {
      setDeletingId(selectedBooking._id);
      setDeleteError("");
      setDeleteSuccess("");

      const response = await fetch(
        `http://localhost:8000/bookings/${selectedBooking._id}?email=${encodeURIComponent(
          session.user.email,
        )}`,
        {
          method: "DELETE",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete booking.");
      }

      setBookings((previousBookings) =>
        previousBookings.filter(
          (booking) => booking._id !== selectedBooking._id,
        ),
      );

      setDeleteSuccess("Booking deleted successfully.");
      setSelectedBooking(null);
    } catch (err) {
      setDeleteError(
        err instanceof Error ? err.message : "Something went wrong.",
      );
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

      {deleteSuccess && (
        <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 rounded-xl p-4 text-sm text-emerald-700 dark:text-emerald-400">
          {deleteSuccess}
        </div>
      )}

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

            return (
              <div
                key={booking._id}
                className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow space-y-4"
              >
                <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-zinc-800">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900 uppercase">
                    {booking.status || "Pending"}
                  </span>

                  <span className="text-xs text-gray-400 dark:text-zinc-500 font-medium">
                    ID: {booking._id.slice(-6)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="block text-xs text-gray-400 uppercase font-semibold tracking-wider mb-1">
                      Booking Date
                    </span>
                    <span className="font-bold text-gray-900 dark:text-white">
                      {booking.bookingDate}
                    </span>
                  </div>

                  <div>
                    <span className="block text-xs text-gray-400 uppercase font-semibold tracking-wider mb-1">
                      Time Slot
                    </span>
                    <span className="font-bold text-gray-900 dark:text-white">
                      {booking.startTime} - {booking.endTime}
                    </span>
                  </div>

                  <div>
                    <span className="block text-xs text-gray-400 uppercase font-semibold tracking-wider mb-1">
                      Duration
                    </span>
                    <span className="font-medium text-gray-700 dark:text-zinc-300">
                      {booking.duration} Hour
                      {booking.duration > 1 ? "s" : ""}
                    </span>
                  </div>

                  <div>
                    <span className="block text-xs text-gray-400 uppercase font-semibold tracking-wider mb-1">
                      Total Amount
                    </span>
                    <span className="font-black text-emerald-600 dark:text-emerald-400 text-base">
                      {formatCurrency(booking.totalAmount)}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 dark:border-zinc-800 flex items-center justify-between text-xs text-gray-500 dark:text-zinc-400">
                  <span className="truncate mr-2">
                    Studio ID: {booking.studioId}
                  </span>

                  <Link
                    href={`/studios/${booking.studioId}`}
                    className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline whitespace-nowrap"
                  >
                    View Studio &rarr;
                  </Link>
                </div>

                {active && (
                  <p className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-lg p-3">
                    This booking is currently active. You cannot delete it until
                    the booking period ends.
                  </p>
                )}

                <div className="pt-2">
                  <button
                    type="button"
                    disabled={active || deletingId === booking._id}
                    onClick={() => {
                      setDeleteError("");
                      setSelectedBooking(booking);
                    }}
                    className="w-full px-4 py-2.5 rounded-xl border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 font-semibold text-sm hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                  >
                    {active ? "Deletion Unavailable" : "Delete Booking"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-gray-200 dark:border-zinc-800 p-6 space-y-5">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Delete Booking?
              </h2>

              <p className="text-sm text-gray-500 dark:text-zinc-400 mt-2">
                Are you sure you want to delete this booking? This action cannot
                be undone.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-zinc-800 rounded-xl p-4 space-y-2 text-sm">
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
                Cancel
              </button>

              <button
                type="button"
                disabled={deletingId === selectedBooking._id}
                onClick={handleDeleteBooking}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm transition-colors disabled:opacity-50"
              >
                {deletingId === selectedBooking._id
                  ? "Deleting..."
                  : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
