// src/app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function DashboardOverviewPage() {
  const [totalStudios, setTotalStudios] = useState<number>(0);
  const [totalBookings, setTotalBookings] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchDashboardMetrics() {
      try {
        setIsLoading(true);

        // Fetch user email or assume host context. Fetching total spaces.
        const resSpaces = await fetch("http://localhost:8000/spaces", {
          cache: "no-store",
        });
        if (resSpaces.ok) {
          const spacesData = await resSpaces.json();
          const list = Array.isArray(spacesData)
            ? spacesData
            : spacesData.spaces || [];
          setTotalStudios(list.length);
        }

        // Fetch bookings associated with user email
        const resBookings = await fetch(
          "http://localhost:8000/bookings/my-bookings",
          {
            cache: "no-store",
          },
        );
        if (resBookings.ok) {
          const bookingsData = await resBookings.json();
          const bookingsList = Array.isArray(bookingsData) ? bookingsData : [];
          setTotalBookings(bookingsList.length);
        }
      } catch (err) {
        console.warn("Could not connect to backend server for stats:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDashboardMetrics();
  }, []);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-900 via-emerald-800 to-zinc-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-emerald-700/30">
        <div className="absolute right-0 top-0 translate-x-1/4 -translate-y-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/30 border border-emerald-400/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-4 backdrop-blur-md">
            Host Control Center
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3">
            Welcome back to StudioSpace
          </h2>
          <p className="text-emerald-100/80 text-sm sm:text-base leading-relaxed mb-6">
            Here is a live summary of your creative spaces and booking
            reservations.
          </p>
        </div>
      </div>

      {/* Live Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Card 1: Available Studios */}
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-zinc-400">
              Total Studios
            </span>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-900 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-sm">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
              {isLoading ? "..." : totalStudios}
            </span>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-full border border-emerald-200/60 dark:border-emerald-900/60">
              Active Listings
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-zinc-400 mt-3 leading-relaxed">
            Total count of creative spaces listed under your account.
          </p>
        </div>

        {/* Card 2: My Bookings */}
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-zinc-400">
              Total Booked
            </span>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-900 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-sm">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
              {isLoading ? "..." : totalBookings}
            </span>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-full border border-emerald-200/60 dark:border-emerald-900/60">
              Reservations
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-zinc-400 mt-3 leading-relaxed">
            Total number of bookings associated with your registered email.
          </p>
        </div>
      </div>

      {/* Website Navigation Buttons (Explore & Home) */}
      <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
            Explore StudioSpace
          </h3>
          <p className="text-xs text-gray-500 dark:text-zinc-400">
            Quickly navigate back to public pages or explore other listings
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
          <Link
            href="/"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gray-100 dark:bg-zinc-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 hover:text-emerald-600 dark:hover:text-emerald-400 text-gray-700 dark:text-zinc-200 font-semibold text-sm transition-all border border-gray-200 dark:border-zinc-700 shadow-sm"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span>Home</span>
          </Link>

          <Link
            href="/explore"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-all shadow-lg shadow-emerald-600/20"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            <span>Explore</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
