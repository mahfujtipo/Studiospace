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
  status: string;
}

interface StudioBookingCardProps {
  booking: Booking;
  active: boolean;
  isDeleting: boolean;
  onDeleteClick: (booking: Booking) => void;
  formatCurrency: (amount: number) => void | string;
}

export default function StudioBookingCard({
  booking,
  active,
  isDeleting,
  onDeleteClick,
  formatCurrency,
}: StudioBookingCardProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow space-y-4">
      <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-zinc-800 gap-2">
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900 uppercase shrink-0">
          {booking.status || "Pending"}
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
          This booking is currently active. You cannot delete it until the
          booking period ends.
        </p>
      )}

      <div className="pt-2">
        <button
          type="button"
          disabled={active || isDeleting}
          onClick={() => onDeleteClick(booking)}
          className="w-full px-4 py-2.5 rounded-xl border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 font-semibold text-sm hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
        >
          {active ? "Deletion Unavailable" : "Delete Booking"}
        </button>
      </div>
    </div>
  );
}
