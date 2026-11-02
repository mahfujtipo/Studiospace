// components/ExploreClientView.tsx

"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Studio } from "@/types/studio";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80";

const CATEGORIES = [
  "All Categories",
  "Photography Studio",
  "Film & Video Studio",
  "Podcast Room",
  "Music Recording Suite",
  "Creative Workshop",
];

interface ExploreClientViewProps {
  studios: Studio[];
  activeCategory: string;
}

export default function ExploreClientView({
  studios,
  activeCategory,
}: ExploreClientViewProps) {
  const [sortOrder, setSortOrder] = useState<
    "default" | "low-high" | "high-low"
  >("default");

  // Sort studios based on hourlyRate
  const sortedStudios = useMemo(() => {
    let result = [...studios];
    if (sortOrder === "low-high") {
      result.sort((a, b) => (a.hourlyRate || 0) - (b.hourlyRate || 0));
    } else if (sortOrder === "high-low") {
      result.sort((a, b) => (b.hourlyRate || 0) - (a.hourlyRate || 0));
    }
    return result;
  }, [studios, sortOrder]);

  return (
    <div>
      {/* Controls Bar: Category Pills & Price Sorting */}
      <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Category Quick Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {CATEGORIES.map((cat) => {
            const isAll = cat === "All Categories";
            const isActive = isAll
              ? !activeCategory
              : activeCategory.toLowerCase() === cat.toLowerCase();
            const href = isAll
              ? "/explore"
              : `/explore?category=${encodeURIComponent(cat)}`;

            return (
              <Link
                key={cat}
                href={href}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/50"
                }`}
              >
                {cat}
              </Link>
            );
          })}
        </div>

        {/* Price Sorting Selector */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <span className="text-xs font-semibold text-gray-500 dark:text-zinc-400 whitespace-nowrap">
            Sort by Price:
          </span>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as any)}
            className="p-2.5 bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl text-gray-900 dark:text-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="default">Default Order</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Dynamic Results Count Bar */}
      <div className="flex items-center justify-between mb-8 px-1">
        <p className="text-sm text-gray-600 dark:text-zinc-400">
          Showing{" "}
          <span className="font-bold text-gray-900 dark:text-white">
            {sortedStudios.length}
          </span>{" "}
          {sortedStudios.length === 1 ? "creative space" : "creative spaces"}
          {activeCategory && (
            <span>
              {" "}
              for{" "}
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                "{activeCategory}"
              </span>
            </span>
          )}
        </p>
      </div>

      {/* Empty State */}
      {sortedStudios.length === 0 && (
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-12 text-center max-w-xl mx-auto my-12 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            No Studios Found
          </h3>
          <p className="text-gray-600 dark:text-zinc-400 text-sm mb-6">
            There are no creative spaces available under this category at the
            moment.
          </p>
          <Link
            href="/explore"
            className="inline-flex px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm transition-colors"
          >
            View All Studios
          </Link>
        </div>
      )}

      {/* Studio Cards Grid */}
      {sortedStudios.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedStudios.map((studio) => (
            <div
              key={studio._id}
              className="group bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Studio Image Container */}
                <div className="relative h-56 w-full overflow-hidden bg-gray-100 dark:bg-zinc-800">
                  <Image
                    src={studio.imageUrl || FALLBACK_IMAGE}
                    alt={studio.title || "Studio Space"}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-emerald-600 dark:text-emerald-400 shadow-sm">
                    {studio.category || "Studio"}
                  </div>
                </div>

                {/* Studio Details */}
                <div className="p-6">
                  <div className="flex items-center text-xs text-gray-500 dark:text-zinc-400 mb-2 gap-1">
                    <svg
                      className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="truncate">
                      {studio.location || "Location unavailable"}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {studio.title}
                  </h3>

                  <div className="grid grid-cols-2 gap-2 pt-4 border-t border-gray-100 dark:border-zinc-800 text-xs text-gray-600 dark:text-zinc-300 mb-4">
                    <div>
                      <span className="text-gray-400 block">Max Capacity</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {studio.maxCapacity ?? "N/A"} Guests
                      </span>
                    </div>
                    {studio.securityDeposit !== undefined && (
                      <div>
                        <span className="text-gray-400 block">Deposit</span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          ${studio.securityDeposit}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between font-bold text-gray-900 dark:text-white">
                    <span className="text-xs text-gray-500 font-normal">
                      Hourly Rate
                    </span>
                    <div className="flex items-center">
                      <span className="text-emerald-600 dark:text-emerald-400 text-lg">
                        ${studio.hourlyRate ?? 0}
                      </span>
                      <span className="text-xs font-normal text-gray-500 dark:text-zinc-400 ml-1">
                        / hr
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* View Details Action Button */}
              <div className="px-6 pb-6 pt-0">
                <Link
                  href={`/studios/${studio._id}`}
                  className="w-full inline-flex items-center justify-center py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm transition-colors shadow-sm shadow-emerald-600/20"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
