// src/components/StudioBookingCard.tsx
"use client";

interface Booking {
  _id: string;
  studioId: string;
  studioName?: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  duration: number;
  totalAmount: number;
  status: string; // "Pending" | "Confirmed" | "Completed" | "Cancelled"
}

interface StudioBookingCardProps {
  booking: Booking;
  active: boolean;
  isDeleting: boolean;
  onDeleteClick: (booking: Booking) => void;
  formatCurrency: (amount: number) => string;
}

export default function StudioBookingCard({
  booking,
  active,
  isDeleting,
  onDeleteClick,
  formatCurrency,
}: StudioBookingCardProps) {
  const getStatusBadgeStyle = (status: string) => {
    const normalized = status?.toLowerCase().trim() || "pending";

    switch (normalized) {
      case "confirmed":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400 border-emerald-300 dark:border-emerald-900";
      case "completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-400 border-blue-300 dark:border-blue-900";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-400 border-red-300 dark:border-red-900";
      default: // pending
        return "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-400 border-amber-300 dark:border-amber-900";
    }
  };

  const statusText = booking.status || "Pending";
  const isPending = statusText.toLowerCase().trim() === "pending";

  return (
    <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow space-y-4">
      <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-zinc-800 gap-2">
        {/* ডাইনামিক স্ট্যাটাস ব্যাজ */}
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border shrink-0 ${getStatusBadgeStyle(
            statusText,
          )}`}
        >
          {statusText}
        </span>

        <h3
          className="font-bold text-gray-900 dark:text-white text-sm truncate"
          title={booking.studioName || "Studio Space"}
        >
          {booking.studioName || "Studio Space"}
        </h3>
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
            {booking.duration} Hour{booking.duration > 1 ? "s" : ""}
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
        <span className="truncate mr-2">ID: {booking._id.slice(-6)}</span>

        <a
          href={`/studios/${booking.studioId}`}
          className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline whitespace-nowrap"
        >
          View Studio &rarr;
        </a>
      </div>

      {active && (
        <p className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-lg p-3">
          This booking is currently active. You cannot cancel it until the
          booking period ends.
        </p>
      )}

      {isPending && (
        <div className="pt-2">
          <button
            type="button"
            disabled={active || isDeleting}
            onClick={() => onDeleteClick(booking)}
            className="w-full px-4 py-2.5 rounded-xl border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 font-semibold text-sm hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
          >
            {active ? "Cancellation Unavailable" : "Cancel Booking"}
          </button>
        </div>
      )}
    </div>
  );
}
