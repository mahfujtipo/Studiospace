// src/components/ExploreClientView.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
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

type SortOption =
  | "default"
  | "price-low-high"
  | "price-high-low"
  | "capacity-low-high"
  | "capacity-high-low";

interface ExploreClientViewProps {
  studios: Studio[];
  activeCategory: string;
}

const ITEMS_PER_PAGE = 9;

// Extract city name from a complete location.
const getCityFromLocation = (location: string) => {
  const parts = location
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length === 0) return "";

  // Handle locations containing country names.
  const lastPart = parts[parts.length - 1].toLowerCase();

  const city =
    lastPart === "bangladesh" && parts.length > 1
      ? parts[parts.length - 2]
      : parts[parts.length - 1];

  // Normalize Chittagong to Chattogram.
  if (city.toLowerCase() === "chittagong") {
    return "Chattogram";
  }

  return city;
};

export default function ExploreClientView({
  studios,
  activeCategory,
}: ExploreClientViewProps) {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(activeCategory);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOption>("default");
  const [currentPage, setCurrentPage] = useState(1);

  // Keep category selection synchronized with the URL query parameter.
  useEffect(() => {
    setSelectedCategory(activeCategory);
  }, [activeCategory]);

  // Get unique city names from MongoDB data.
  const locations = useMemo(() => {
    return Array.from(
      new Set(
        studios
          .map((studio) => getCityFromLocation(studio.location || ""))
          .filter(Boolean),
      ),
    ).sort((a, b) => a.localeCompare(b));
  }, [studios]);

  // Apply all filters and sorting together.
  const filteredStudios = useMemo(() => {
    let result = [...studios];

    // Search by studio title or complete location.
    if (searchTerm.trim()) {
      const search = searchTerm.trim().toLowerCase();

      result = result.filter(
        (studio) =>
          studio.title?.toLowerCase().includes(search) ||
          studio.location?.toLowerCase().includes(search),
      );
    }

    // Exact category filtering.
    if (selectedCategory) {
      result = result.filter(
        (studio) =>
          studio.category?.trim().toLowerCase() ===
          selectedCategory.trim().toLowerCase(),
      );
    }

    // City-wise location filtering.
    if (selectedLocation) {
      result = result.filter(
        (studio) =>
          getCityFromLocation(studio.location || "").toLowerCase() ===
          selectedLocation.toLowerCase(),
      );
    }

    // Minimum hourly price.
    if (minPrice !== "") {
      const minimum = Number(minPrice);

      if (Number.isFinite(minimum)) {
        result = result.filter(
          (studio) => Number(studio.hourlyRate) >= minimum,
        );
      }
    }

    // Maximum hourly price.
    if (maxPrice !== "") {
      const maximum = Number(maxPrice);

      if (Number.isFinite(maximum)) {
        result = result.filter(
          (studio) => Number(studio.hourlyRate) <= maximum,
        );
      }
    }

    // Sorting.
    if (sortOrder === "price-low-high") {
      result.sort((a, b) => Number(a.hourlyRate) - Number(b.hourlyRate));
    } else if (sortOrder === "price-high-low") {
      result.sort((a, b) => Number(b.hourlyRate) - Number(a.hourlyRate));
    } else if (sortOrder === "capacity-low-high") {
      result.sort((a, b) => Number(a.maxCapacity) - Number(b.maxCapacity));
    } else if (sortOrder === "capacity-high-low") {
      result.sort((a, b) => Number(b.maxCapacity) - Number(a.maxCapacity));
    }

    return result;
  }, [
    studios,
    searchTerm,
    selectedCategory,
    selectedLocation,
    minPrice,
    maxPrice,
    sortOrder,
  ]);

  // Reset pagination whenever a filter or sorting option changes.
  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchTerm,
    selectedCategory,
    selectedLocation,
    minPrice,
    maxPrice,
    sortOrder,
  ]);

  // Pagination calculations.
  const totalPages = Math.ceil(filteredStudios.length / ITEMS_PER_PAGE);

  const paginatedStudios = filteredStudios.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  // Clear all filters.
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedLocation("");
    setMinPrice("");
    setMaxPrice("");
    setSortOrder("default");
    setCurrentPage(1);

    router.replace("/explore");
  };

  const hasActiveFilters =
    searchTerm !== "" ||
    selectedCategory !== "" ||
    selectedLocation !== "" ||
    minPrice !== "" ||
    maxPrice !== "" ||
    sortOrder !== "default";

  return (
    <div>
      {/* Search and Filters */}
      <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 md:p-6">
        <div className="mb-6">
          <h2 className="mb-3 text-sm font-bold text-gray-900 dark:text-white">
            Search Creative Spaces
          </h2>

          <div className="relative">
            <svg
              className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m21 21-4.35-4.35m1.35-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by studio name or location..."
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 text-sm text-gray-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-6">
          <h2 className="mb-3 text-sm font-bold text-gray-900 dark:text-white">
            Categories
          </h2>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => {
              const isAll = category === "All Categories";

              const isActive = isAll
                ? !selectedCategory
                : selectedCategory.toLowerCase() === category.toLowerCase();

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    const nextCategory = isAll ? "" : category;

                    setSelectedCategory(nextCategory);
                    setCurrentPage(1);

                    router.replace(
                      nextCategory
                        ? `/explore?category=${encodeURIComponent(nextCategory)}`
                        : "/explore",
                    );
                  }}
                  className={`rounded-xl px-4 py-2 text-xs font-semibold transition-colors ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "bg-gray-100 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-emerald-950/50"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Location and Price Filters */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label
              htmlFor="location"
              className="mb-2 block text-xs font-semibold text-gray-700 dark:text-zinc-300"
            >
              Location
            </label>

            <select
              id="location"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-900 outline-none focus:border-emerald-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
            >
              <option value="">All Locations</option>

              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="minPrice"
              className="mb-2 block text-xs font-semibold text-gray-700 dark:text-zinc-300"
            >
              Minimum Hourly Price (৳)
            </label>

            <input
              id="minPrice"
              type="number"
              min="0"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="Minimum price"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-900 outline-none focus:border-emerald-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="maxPrice"
              className="mb-2 block text-xs font-semibold text-gray-700 dark:text-zinc-300"
            >
              Maximum Hourly Price (৳)
            </label>

            <input
              id="maxPrice"
              type="number"
              min="0"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="Maximum price"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-900 outline-none focus:border-emerald-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
            />
          </div>
        </div>

        {/* Sorting and Clear Filters */}
        <div className="mt-5 flex flex-col justify-between gap-4 border-t border-gray-100 pt-5 dark:border-zinc-800 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <label
              htmlFor="sortOrder"
              className="whitespace-nowrap text-xs font-semibold text-gray-500 dark:text-zinc-400"
            >
              Sort by:
            </label>

            <select
              id="sortOrder"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as SortOption)}
              className="rounded-xl border border-gray-200 bg-gray-50 p-2.5 text-xs font-medium text-gray-900 outline-none focus:border-emerald-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
            >
              <option value="default">Default Order</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="capacity-low-high">Capacity: Low to High</option>
              <option value="capacity-high-low">Capacity: High to Low</option>
            </select>
          </div>

          <button
            type="button"
            onClick={clearFilters}
            disabled={!hasActiveFilters}
            className="rounded-xl border border-gray-200 px-4 py-2.5 text-xs font-semibold text-gray-600 transition-colors hover:border-emerald-500 hover:text-emerald-600 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:text-zinc-300 dark:hover:text-emerald-400"
          >
            Clear All Filters
          </button>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6 flex flex-col justify-between gap-2 px-1 sm:flex-row sm:items-center">
        <p className="text-sm text-gray-600 dark:text-zinc-400">
          Showing{" "}
          <span className="font-bold text-gray-900 dark:text-white">
            {filteredStudios.length === 0
              ? 0
              : (currentPage - 1) * ITEMS_PER_PAGE + 1}
            {" - "}
            {Math.min(currentPage * ITEMS_PER_PAGE, filteredStudios.length)}
          </span>{" "}
          of{" "}
          <span className="font-bold text-gray-900 dark:text-white">
            {filteredStudios.length}
          </span>{" "}
          {filteredStudios.length === 1 ? "creative space" : "creative spaces"}
        </p>

        {selectedCategory && (
          <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            Category: {selectedCategory}
          </p>
        )}
      </div>

      {/* Empty Database State */}
      {studios.length === 0 && (
        <div className="my-12 rounded-2xl border border-gray-200 bg-white p-12 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
            No Studios Available Yet
          </h3>

          <p className="text-sm text-gray-600 dark:text-zinc-400">
            There are currently no creative spaces listed. Please check back
            later.
          </p>
        </div>
      )}

      {/* No Filter Results */}
      {studios.length > 0 && filteredStudios.length === 0 && (
        <div className="my-12 rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
            No Studios Found
          </h3>

          <p className="mb-6 text-sm text-gray-600 dark:text-zinc-400">
            No creative spaces match your current search or filters. Try
            changing your filters.
          </p>

          <button
            type="button"
            onClick={clearFilters}
            className="rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Studio Cards */}
      {paginatedStudios.length > 0 && (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {paginatedStudios.map((studio) => (
            <div
              key={String(studio._id)}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div>
                {/* Studio Image */}
                <div className="relative h-56 w-full overflow-hidden bg-gray-100 dark:bg-zinc-800">
                  <Image
                    src={studio.imageUrl || FALLBACK_IMAGE}
                    alt={studio.title || "Studio Space"}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />

                  {/* Category Badge */}
                  <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-emerald-600 shadow-sm backdrop-blur-md dark:bg-zinc-900/90 dark:text-emerald-400">
                    {studio.category || "Studio"}
                  </div>

                  {/* Default Rating Badge */}
                  <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-xs font-bold text-white shadow-sm backdrop-blur-md dark:bg-zinc-900/80">
                    <span className="text-amber-400">⭐</span>
                    <span>
                      {studio.rating ? Number(studio.rating).toFixed(1) : "4.8"}
                    </span>
                  </div>
                </div>

                {/* Studio Information */}
                <div className="p-6">
                  <div className="mb-2 flex items-center gap-1 text-xs text-gray-500 dark:text-zinc-400">
                    <svg
                      className="h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
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

                  <h3 className="mb-3 line-clamp-1 text-xl font-bold text-gray-900 transition-colors group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400">
                    {studio.title}
                  </h3>

                  <div className="mb-4 grid grid-cols-2 gap-2 border-t border-gray-100 pt-4 text-xs text-gray-600 dark:border-zinc-800 dark:text-zinc-300">
                    <div>
                      <span className="block text-gray-400">Max Capacity</span>

                      <span className="font-semibold text-gray-900 dark:text-white">
                        {studio.maxCapacity ?? "N/A"} Guests
                      </span>
                    </div>

                    <div>
                      <span className="block text-gray-400">
                        Security Deposit
                      </span>

                      <span className="font-semibold text-gray-900 dark:text-white">
                        ৳
                        {Number(studio.securityDeposit ?? 0).toLocaleString(
                          "en-BD",
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between font-bold text-gray-900 dark:text-white">
                    <span className="text-xs font-normal text-gray-500">
                      Hourly Rate
                    </span>

                    <div className="flex items-center">
                      <span className="text-lg text-emerald-600 dark:text-emerald-400">
                        ৳
                        {Number(studio.hourlyRate ?? 0).toLocaleString("en-BD")}
                      </span>

                      <span className="ml-1 text-xs font-normal text-gray-500 dark:text-zinc-400">
                        / hr
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Details Button */}
              <div className="px-6 pb-6 pt-0">
                <Link
                  href={`/studios/${studio._id}`}
                  className="inline-flex w-full items-center justify-center rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm shadow-emerald-600/20 transition-colors hover:bg-emerald-700"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            disabled={currentPage === 1}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:border-emerald-500 hover:text-emerald-600 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:text-zinc-300"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`h-10 min-w-10 rounded-lg px-3 text-sm font-semibold transition-colors ${
                  currentPage === page
                    ? "bg-emerald-600 text-white"
                    : "border border-gray-200 text-gray-600 hover:border-emerald-500 hover:text-emerald-600 dark:border-zinc-700 dark:text-zinc-300"
                }`}
              >
                {page}
              </button>
            ),
          )}

          <button
            type="button"
            onClick={() =>
              setCurrentPage((page) => Math.min(totalPages, page + 1))
            }
            disabled={currentPage === totalPages}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:border-emerald-500 hover:text-emerald-600 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:text-zinc-300"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
