"use client";
import { useEffect, useState, useMemo } from "react";
import { authClient } from "@/lib/auth-client";
import { clientsidejwt } from "@/lib/clientsidejwt";
import Link from "next/link";

export interface Studio {
  _id: string;
  title: string;
  category: string;
  hourlyRate: number;
  securityDeposit: number;
  maxCapacity: number;
  location: string;
  imageUrl: string;
  amenities: string[];
  overview: string;
  ownerName: string;
  ownerEmail: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function MyStudiosPage() {
  const { data: session } = authClient.useSession();
  const [studios, setStudios] = useState<Studio[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [studioToDelete, setStudioToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const fetchUserStudios = async () => {
    if (!session?.user?.email) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);

      const token = await clientsidejwt();
      console.log("JWT Token:", token);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/studios/my-studios`,
        {
          cache: "no-store",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!res.ok) {
        throw new Error("Failed to fetch your studio listings.");
      }

      const data = await res.json();
      const studiosWithStatus = Array.isArray(data)
        ? data.map((s: Studio) => ({
            ...s,
            status: s.status || "available",
          }))
        : [];
      setStudios(studiosWithStatus);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserStudios();
  }, [session?.user?.email]);

  const stats = useMemo(() => {
    const total = studios.length;
    const available = studios.filter(
      (s) => (s.status || "available") === "available",
    ).length;
    const booked = studios.filter((s) => s.status === "booked").length;
    const inactive = studios.filter((s) => s.status === "inactive").length;
    return { total, available, booked, inactive };
  }, [studios]);

  const categories = useMemo(() => {
    const cats = new Set(studios.map((s) => s.category));
    return ["All", ...Array.from(cats)];
  }, [studios]);

  const filteredStudios = useMemo(() => {
    let result = [...studios];

    if (searchQuery.trim()) {
      result = result.filter((s) =>
        s.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (selectedCategory !== "All") {
      result = result.filter((s) => s.category === selectedCategory);
    }

    if (selectedStatus !== "All") {
      result = result.filter(
        (s) => (s.status || "available") === selectedStatus.toLowerCase(),
      );
    }

    result.sort((a, b) => {
      if (sortBy === "newest") {
        return (
          new Date(b.createdAt || 0).getTime() -
          new Date(a.createdAt || 0).getTime()
        );
      } else if (sortBy === "oldest") {
        return (
          new Date(a.createdAt || 0).getTime() -
          new Date(b.createdAt || 0).getTime()
        );
      } else if (sortBy === "lowest-price") {
        return a.hourlyRate - b.hourlyRate;
      } else if (sortBy === "highest-price") {
        return b.hourlyRate - a.hourlyRate;
      }
      return 0;
    });

    return result;
  }, [studios, searchQuery, selectedCategory, selectedStatus, sortBy]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedStatus("All");
    setSortBy("newest");
  };

  const confirmDelete = (id: string) => {
    setStudioToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!studioToDelete) return;

    try {
      setIsDeleting(true);

      const token = await clientsidejwt();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/studios/${studioToDelete}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete studio.");

      setStudios((prev) => prev.filter((s) => s._id !== studioToDelete));
      setToastMessage("Studio deleted successfully!");
      setTimeout(() => setToastMessage(""), 3000);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete.");
    } finally {
      setIsDeleting(false);
      setDeleteModalOpen(false);
      setStudioToDelete(null);
    }
  };

  const formatCurrency = (amount: number) =>
    `৳${Number(amount || 0).toLocaleString("en-BD")}`;

  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-fadeIn relative">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce">
          <span>✅</span>
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            My Studio Listings
          </h1>
          <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">
            Manage all the studios you have listed on StudioSpace.
          </p>
        </div>
        <Link
          href="/dashboard/add-studio"
          className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shadow-sm shadow-emerald-600/20 flex items-center gap-2"
        >
          <span>+ Add New Studio</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
            Total Studios
          </span>
          <div className="text-3xl font-black text-gray-900 dark:text-white mt-2">
            {stats.total}
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Available Studios
          </span>
          <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-2">
            {stats.available}
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Booked Studios
          </span>
          <div className="text-3xl font-black text-blue-600 dark:text-blue-400 mt-2">
            {stats.booked}
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            Inactive Studios
          </span>
          <div className="text-3xl font-black text-amber-600 dark:text-amber-400 mt-2">
            {stats.inactive}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 dark:text-white"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 dark:text-white"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                Category: {cat}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 dark:text-white"
          >
            <option value="All">Status: All</option>
            <option value="available">Available</option>
            <option value="booked">Booked</option>
            <option value="inactive">Inactive</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 dark:text-white"
          >
            <option value="newest">Sort: Newest First</option>
            <option value="oldest">Sort: Oldest First</option>
            <option value="lowest-price">Sort: Price (Low to High)</option>
            <option value="highest-price">Sort: Price (High to Low)</option>
          </select>
        </div>

        <div className="flex justify-end pt-2 border-t border-gray-100 dark:border-zinc-800">
          <button
            onClick={handleClearFilters}
            className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            Clear all filters
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-emerald-500 border-t-transparent"></div>
          <p className="text-sm text-gray-500 dark:text-zinc-400 mt-3">
            Loading your studio listings...
          </p>
        </div>
      ) : error ? (
        <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-2xl p-6 text-center text-red-600 text-sm">
          {error}
        </div>
      ) : filteredStudios.length === 0 ? (
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl p-12 text-center shadow-sm space-y-4">
          <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto text-2xl font-bold">
            🏢
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            No Studios Found
          </h3>
          <p className="text-sm text-gray-500 dark:text-zinc-400 max-w-sm mx-auto">
            You haven't listed any studios matching your filter or criteria yet.
          </p>
          <Link
            href="/dashboard/add-studio"
            className="inline-block px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs"
          >
            Add New Studio
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudios.map((studio) => (
            <div
              key={studio._id}
              className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 w-full bg-gray-100 dark:bg-zinc-800 overflow-hidden">
                  <img
                    src={
                      studio.imageUrl ||
                      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04"
                    }
                    alt={studio.title}
                    className="w-full h-full object-cover"
                  />
                  <span
                    className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold uppercase shadow-md ${
                      studio.status === "booked"
                        ? "bg-blue-500 text-white"
                        : studio.status === "inactive"
                          ? "bg-amber-500 text-white"
                          : "bg-emerald-500 text-white"
                    }`}
                  >
                    {studio.status || "available"}
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider">
                    <span>{studio.category}</span>
                    <span>Cap: {studio.maxCapacity} ppl</span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">
                    {studio.title}
                  </h3>

                  <p className="text-xs text-gray-500 dark:text-zinc-400 flex items-center gap-1">
                    <span>📍</span> {studio.location}
                  </p>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100 dark:border-zinc-800 text-xs">
                    <div>
                      <span className="block text-gray-400">Hourly Rate</span>
                      <span className="font-black text-emerald-600 dark:text-emerald-400 text-sm">
                        {formatCurrency(studio.hourlyRate)}/hr
                      </span>
                    </div>
                    <div>
                      <span className="block text-gray-400">
                        Security Deposit
                      </span>
                      <span className="font-semibold text-gray-700 dark:text-zinc-300">
                        {formatCurrency(studio.securityDeposit)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-zinc-800/50 border-t border-gray-100 dark:border-zinc-800 flex items-center justify-between gap-2">
                <Link
                  href={`/studios/${studio._id}`}
                  className="flex-1 text-center py-2 rounded-xl bg-white dark:bg-zinc-800 hover:bg-emerald-50 text-emerald-600 dark:text-emerald-400 border border-gray-200 dark:border-zinc-700 font-semibold text-xs transition-colors"
                >
                  View
                </Link>
                <Link
                  href={`/dashboard/my-studios/${studio._id}/edit`}
                  className="flex-1 text-center py-2 rounded-xl bg-white dark:bg-zinc-800 hover:bg-blue-50 text-blue-600 border border-gray-200 dark:border-zinc-700 font-semibold text-xs transition-colors"
                >
                  Edit
                </Link>
                <button
                  onClick={() => confirmDelete(studio._id)}
                  className="flex-1 text-center py-2 rounded-xl bg-white dark:bg-zinc-800 hover:bg-red-50 text-red-600 border border-gray-200 dark:border-zinc-700 font-semibold text-xs transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-4 shadow-2xl animate-scaleUp">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Confirm Deletion
            </h3>
            <p className="text-sm text-gray-500 dark:text-zinc-400">
              Are you sure you want to delete this studio listing? This action
              cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3 pt-4">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 font-semibold text-xs"
              >
                Cancel
              </button>
              <button
                disabled={isDeleting}
                onClick={handleDelete}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Delete Studio"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
