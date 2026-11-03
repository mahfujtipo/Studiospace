// src/app/dashboard/add-studio/page.tsx
"use client";

import { useState, FormEvent } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AddStudioPage() {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    studioName: "",
    category: "Music Recording Suite",
    pricePerHour: "",
    securityDeposit: "",
    maxCapacity: "",
    location: "",
    description: "",
    image: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!session?.user?.email) {
      setError("You must be logged in as a host to add a studio.");
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch("http://localhost:8000/studios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userEmail: session.user.email,
          userName: session.user.name || "Host",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to add studio.");
      }

      setSuccessMessage("Studio added successfully!");
      setTimeout(() => {
        router.push("/dashboard/my-studios");
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push("/dashboard");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            Add New Studio Space
          </h1>
          <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">
            List your creative space for creators and artists to book.
          </p>
        </div>
        <Link
          href="/dashboard"
          className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-700 dark:text-zinc-300 font-semibold text-xs transition-colors"
        >
          &larr; Back to Dashboard
        </Link>
      </div>

      {/* Form Container */}
      <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-sm">
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-600 dark:text-emerald-400 text-sm">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Read-only User Info Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 rounded-2xl bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-800">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                Host Name (Auto-filled)
              </label>
              <input
                type="text"
                disabled
                value={session?.user?.name || "Loading..."}
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
                value={session?.user?.email || "Loading..."}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-200/60 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400 text-sm border border-gray-200 dark:border-zinc-700 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Dynamic Studio Info Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-zinc-300 mb-2">
                Studio Name *
              </label>
              <input
                type="text"
                name="studioName"
                required
                value={formData.studioName}
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
                Price Per Hour (৳) *
              </label>
              <input
                type="number"
                name="pricePerHour"
                required
                min="0"
                value={formData.pricePerHour}
                onChange={handleChange}
                placeholder="e.g. 1500"
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
                placeholder="e.g. 500"
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
                placeholder="e.g. GEC, Chattogram"
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
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/studio-image.jpg"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
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

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-100 dark:border-zinc-800">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-3 rounded-xl bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-700 dark:text-zinc-300 font-semibold text-sm transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors shadow-lg shadow-emerald-600/20 disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Add Studio"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
