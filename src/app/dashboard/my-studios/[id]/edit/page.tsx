// src/app/dashboard/my-studios/[id]/edit/page.tsx
"use client";

import { useState, useEffect, FormEvent } from "react";
import { authClient } from "@/lib/auth-client";
import { clientsidejwt } from "@/lib/clientsidejwt";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { toast, Toaster } from "sonner";

const availableAmenities = [
  "Wi-Fi",
  "Air Conditioning",
  "Sound System",
  "Professional Lighting",
  "Green Screen",
  "Makeup Room",
  "Parking Space",
  "Restroom",
];

export default function EditStudioPage() {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const params = useParams();
  const studioId = params?.id;

  const [formData, setFormData] = useState({
    title: "",
    category: "Music Recording Suite",
    hourlyRate: "",
    securityDeposit: "",
    maxCapacity: "",
    location: "",
    description: "",
    imageUrl: "",
  });

  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!studioId) return;

    const fetchStudioData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/studios/${studioId}`,
        );
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch studio details.");
        }

        const studio = data.studio || data;

        setFormData({
          title: studio.title || "",
          category: studio.category || "Music Recording Suite",
          hourlyRate: studio.hourlyRate?.toString() || "",
          securityDeposit: studio.securityDeposit?.toString() || "",
          maxCapacity: studio.maxCapacity?.toString() || "",
          location: studio.location || "",
          description: studio.overview || studio.description || "",
          imageUrl: studio.imageUrl || studio.image || "",
        });

        if (Array.isArray(studio.amenities)) {
          setSelectedAmenities(studio.amenities);
        }
      } catch (err) {
        const errorMsg =
          err instanceof Error ? err.message : "Error loading studio data.";
        setError(errorMsg);
        toast.error(errorMsg);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudioData();
  }, [studioId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAmenityToggle = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity],
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!session?.user?.email) {
      const errorMsg = "You must be logged in as a host to update this studio.";
      setError(errorMsg);
      toast.error(errorMsg);
      return;
    }

    try {
      setIsSubmitting(true);

      const token = await clientsidejwt();

      if (!token) {
        throw new Error("Authentication token not found. Please log in again.");
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/studios/${studioId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...formData,
            amenities: selectedAmenities,
            userEmail: session.user.email,
            userName: session.user.name || "Host",
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update studio.");
      }

      // এখানে সফলভাবে আপডেট হওয়ার টোস্ট ট্রিগার হচ্ছে
      toast.success("Studio updated successfully!");

      setTimeout(() => {
        router.push("/dashboard/my-studios");
      }, 1500);
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "Something went wrong.";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-24">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-emerald-500 border-t-transparent"></div>
        <p className="text-sm text-gray-500 dark:text-zinc-400 mt-3">
          Loading studio information...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn relative pb-16">
      {/* লোকাল ব্যাকআপ হিসেবে Toaster কম্পোনেন্ট যোগ করা হলো যাতে টোস্ট রেন্ডার হতে মিস না করে */}
      <Toaster position="top-center" richColors closeButton />

      <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            Update Studio Space
          </h1>
          <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">
            Modify details and specifications for your creative listing.
          </p>
        </div>
        <Link
          href="/dashboard/my-studios"
          className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-700 dark:text-zinc-300 font-semibold text-xs transition-colors"
        >
          &larr; Back to My Listings
        </Link>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-sm">
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 rounded-2xl bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-800">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                Host Name (Auto-filled)
              </label>
              <input
                type="text"
                disabled
                value={session?.user?.name || "Host"}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-200/60 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400 text-sm border border-gray-200 dark:border-zinc-700 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                Host Email (Auto-filled)
              </label>
              <input
                type="email"
                disabled
                value={session?.user?.email || "host@example.com"}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-200/60 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400 text-sm border border-gray-200 dark:border-zinc-700 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-zinc-300 mb-2">
                Studio Title *
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Sonic Wave Soundstage"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-zinc-300 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Photography Studio">Photography Studio</option>
                <option value="Film & Video Studio">Film & Video Studio</option>
                <option value="Podcast Room">Podcast Room</option>
                <option value="Music Recording Suite">
                  Music Recording Suite
                </option>
                <option value="Creative Workshop">Creative Workshop</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-zinc-300 mb-2">
                Hourly Rate (৳) *
              </label>
              <input
                type="number"
                name="hourlyRate"
                required
                min="0"
                value={formData.hourlyRate}
                onChange={handleChange}
                placeholder="e.g. 5000"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-zinc-300 mb-2">
                Security Deposit (৳)
              </label>
              <input
                type="number"
                name="securityDeposit"
                min="0"
                value={formData.securityDeposit}
                onChange={handleChange}
                placeholder="e.g. 10000"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-zinc-300 mb-2">
                Max Capacity (Persons)
              </label>
              <input
                type="number"
                name="maxCapacity"
                min="1"
                value={formData.maxCapacity}
                onChange={handleChange}
                placeholder="e.g. 10"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-zinc-300 mb-2">
                Location *
              </label>
              <input
                type="text"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Banani, Dhaka"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-zinc-300 mb-2">
              Studio Image URL
            </label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/studio-image.jpg"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-zinc-300 mb-2">
              Amenities List (Select features)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {availableAmenities.map((amenity) => (
                <label
                  key={amenity}
                  className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs font-medium cursor-pointer transition-all ${
                    selectedAmenities.includes(amenity)
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400"
                      : "bg-gray-50 dark:bg-zinc-800/50 border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-zinc-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedAmenities.includes(amenity)}
                    onChange={() => handleAmenityToggle(amenity)}
                    className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>{amenity}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-zinc-300 mb-2">
              Description / Overview
            </label>
            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide details about equipments, lighting, acoustics, rules..."
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-100 dark:border-zinc-800">
            <Link
              href="/dashboard/my-studios"
              className="px-6 py-3 rounded-xl bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-700 dark:text-zinc-300 font-semibold text-sm transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors shadow-lg shadow-emerald-600/20 disabled:opacity-50"
            >
              {isSubmitting ? "Updating..." : "Update Studio"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
