"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

interface BookingCardProps {
  studioId: string;
  hourlyRate: number;
  securityDeposit: number;
}

export default function BookingCard({
  studioId,
  hourlyRate,
  securityDeposit,
}: BookingCardProps) {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [today, setToday] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const currentDate = new Date();
    const localDate = [
      currentDate.getFullYear(),
      String(currentDate.getMonth() + 1).padStart(2, "0"),
      String(currentDate.getDate()).padStart(2, "0"),
    ].join("-");
    setToday(localDate);
  }, []);

  useEffect(() => {
    if (!isModalOpen) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isModalOpen]);

  const startMinutes = startTime
    ? Number(startTime.split(":")[0]) * 60 + Number(startTime.split(":")[1])
    : 0;

  const endMinutes = endTime
    ? Number(endTime.split(":")[0]) * 60 + Number(endTime.split(":")[1])
    : 0;

  const isValidTime =
    startTime !== "" && endTime !== "" && endMinutes > startMinutes;

  const duration = isValidTime ? (endMinutes - startMinutes) / 60 : 0;
  const rentalCost = duration * hourlyRate;
  const totalPrice = rentalCost + securityDeposit;

  const isBookingReady = date !== "" && isValidTime;

  const formatCurrency = (amount: number) =>
    `৳${Number(amount.toFixed(2)).toLocaleString("en-BD")}`;

  // 🔄 সরাসরি onClick-এর মাধ্যমে হ্যান্ডেল করার ফাংশন
  const handleConfirmBookingClick = async () => {
    if (!isBookingReady || isLoading) return;

    if (!session?.user) {
      setError("Please login before booking a studio.");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    const bookingPayload = {
      studioId,
      bookingDate: date,
      startTime,
      endTime,
      duration,
      hourlyRate,
      securityDeposit,
      totalAmount: totalPrice,
      userId: session.user.id,
      userName: session.user.name,
      userEmail: session.user.email,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingPayload),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Booking failed");
      }

      setSuccess("Booking successful! Redirecting...");

      // সফল হওয়ার পর সরাসরি ড্যাশবোর্ড বুকিং পেজে রিডাইরেক্ট করবে
      setTimeout(() => {
        setIsModalOpen(false);
        router.push("/dashboard/bookings");
      }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Booking Card */}
      <div className="sticky top-24 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-lg">
        <div className="mb-6 pb-6 border-b border-gray-100 dark:border-zinc-800">
          <span className="text-xs text-gray-500 dark:text-zinc-400 block mb-1">
            Hourly Rate
          </span>

          <div className="flex items-baseline">
            <span className="text-3xl font-extrabold text-gray-900 dark:text-white">
              {formatCurrency(hourlyRate)}
            </span>
            <span className="text-xs text-gray-500 dark:text-zinc-400 ml-1">
              / hour
            </span>
          </div>
        </div>

        <div className="space-y-4 mb-6 text-sm">
          <div className="flex justify-between text-gray-600 dark:text-zinc-300">
            <span>Security Deposit</span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {formatCurrency(securityDeposit)}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setError("");
            setSuccess("");
            setIsModalOpen(true);
          }}
          className="w-full inline-flex items-center justify-center py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-base transition-colors shadow-lg shadow-emerald-600/25"
        >
          Book This Studio
        </button>

        <p className="text-xs text-center text-gray-400 dark:text-zinc-500 mt-4">
          Select your preferred date and time to estimate the booking cost.
        </p>
      </div>

      {/* Booking Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !isLoading) {
              setIsModalOpen(false);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-modal-title"
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-zinc-800"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-zinc-800">
              <div>
                <h2
                  id="booking-modal-title"
                  className="text-xl font-bold text-gray-900 dark:text-white"
                >
                  Book This Studio
                </h2>
                <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">
                  Select your preferred date and time
                </p>
              </div>

              <button
                type="button"
                disabled={isLoading}
                onClick={() => setIsModalOpen(false)}
                aria-label="Close booking modal"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-300 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* এখানে আর <form onSubmit> ব্যবহার করা হয়নি, সাধারণ div দিয়ে করা হয়েছে */}
            <div className="p-6 space-y-5">
              {/* Booking Date */}
              <div>
                <label
                  htmlFor="booking-date"
                  className="block text-sm font-semibold text-gray-700 dark:text-zinc-300 mb-2"
                >
                  Select Booking Date
                </label>
                <input
                  id="booking-date"
                  type="date"
                  min={today || undefined}
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Start and End Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="start-time"
                    className="block text-sm font-semibold text-gray-700 dark:text-zinc-300 mb-2"
                  >
                    Start Time
                  </label>
                  <input
                    id="start-time"
                    type="time"
                    value={startTime}
                    onChange={(event) => setStartTime(event.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="end-time"
                    className="block text-sm font-semibold text-gray-700 dark:text-zinc-300 mb-2"
                  >
                    End Time
                  </label>
                  <input
                    id="end-time"
                    type="time"
                    value={endTime}
                    onChange={(event) => setEndTime(event.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {startTime && endTime && !isValidTime && (
                <p className="text-sm text-red-500">
                  End time must be later than start time.
                </p>
              )}

              {/* Duration */}
              <div className="flex justify-between items-center bg-emerald-50 dark:bg-emerald-950/30 rounded-xl p-4">
                <span className="text-sm font-medium text-gray-700 dark:text-zinc-300">
                  Booking Duration
                </span>
                <span className="font-bold text-emerald-700 dark:text-emerald-400">
                  {duration > 0 ? `${duration} hours` : "Not selected"}
                </span>
              </div>

              {/* Price Summary */}
              <div className="border-t border-gray-100 dark:border-zinc-800 pt-5 space-y-4">
                <h3 className="font-bold text-gray-900 dark:text-white">
                  Price Summary
                </h3>

                <div className="flex justify-between text-sm text-gray-600 dark:text-zinc-300">
                  <span>Hourly Rate</span>
                  <span>{formatCurrency(hourlyRate)}</span>
                </div>

                <div className="flex justify-between text-sm text-gray-600 dark:text-zinc-300">
                  <span>Rental Cost</span>
                  <span>{formatCurrency(rentalCost)}</span>
                </div>

                <div className="flex justify-between text-sm text-gray-600 dark:text-zinc-300">
                  <span>Security Deposit</span>
                  <span>{formatCurrency(securityDeposit)}</span>
                </div>

                <div className="flex justify-between items-center border-t border-gray-100 dark:border-zinc-800 pt-4">
                  <span className="font-bold text-gray-900 dark:text-white">
                    Estimated Total
                  </span>
                  <span className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
                    {formatCurrency(totalPrice)}
                  </span>
                </div>
              </div>

              {/* Error and Success Messages */}
              {error && (
                <p className="text-sm text-red-500 bg-red-50 dark:bg-red-950/30 p-3 rounded-lg">
                  {error}
                </p>
              )}

              {success && (
                <p className="text-sm text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 p-3 rounded-lg">
                  {success}
                </p>
              )}

              {/* Confirm Button with onClick */}
              <button
                type="button"
                disabled={!isBookingReady || isLoading}
                onClick={handleConfirmBookingClick}
                className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold transition-colors shadow-lg shadow-emerald-600/25"
              >
                {isLoading ? "Submitting..." : "Confirm Booking"}
              </button>

              <p className="text-xs text-center text-gray-400 dark:text-zinc-500">
                Your booking request will be submitted for approval.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
