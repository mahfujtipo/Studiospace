// src/app/dashboard/profile/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import UpdateProfileModal from "@/components/UpdateProfileModal";

export default function ProfilePage() {
  const { data: session, isPending, refetch } = authClient.useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  const user = {
    name: session?.user?.name || "User",
    email: session?.user?.email || "",
    avatar: session?.user?.image || "",
    role: "Studio Host & Creator",
  };

  const firstLetter = user.name ? user.name.charAt(0).toUpperCase() : "U";
  const showFallback = imgError || !user.avatar;

  if (isPending) {
    return (
      <div className="text-center py-20">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-emerald-500 border-t-transparent"></div>
        <p className="text-sm text-gray-500 dark:text-zinc-400 mt-3">
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Profile Header Card */}
      <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl p-8 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-emerald-600 to-emerald-800" />

        <div className="relative pt-16 flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            {/* Profile Avatar Container */}
            <div className="relative w-28 h-28 rounded-2xl overflow-hidden shadow-xl border-4 border-white dark:border-zinc-900 bg-emerald-100 dark:bg-emerald-950/80 shrink-0 flex items-center justify-center">
              {showFallback ? (
                <span className="text-4xl font-extrabold text-emerald-600 dark:text-emerald-400">
                  {firstLetter}
                </span>
              ) : (
                <Image
                  src={user.avatar}
                  alt={user.name}
                  fill
                  className="object-cover"
                  onError={() => setImgError(true)}
                />
              )}
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl font-black text-gray-900 dark:text-white">
                {user.name}
              </h2>
              <p className="text-sm text-gray-500 dark:text-zinc-400">
                {user.email}
              </p>
              <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900">
                {user.role}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-5 py-2.5 rounded-xl bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-200 text-xs font-semibold hover:bg-gray-200 transition-colors border border-gray-200 dark:border-zinc-700"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors shadow-lg shadow-emerald-600/20"
            >
              Update
            </button>
          </div>
        </div>
      </div>

      {/* Profile Details Grid */}
      <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl p-8 shadow-sm space-y-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white pb-4 border-b border-gray-100 dark:border-zinc-800">
          Personal Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <span className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
              Full Name
            </span>
            <span className="font-medium text-gray-900 dark:text-white">
              {user.name}
            </span>
          </div>

          <div>
            <span className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
              Email Address
            </span>
            <span className="font-medium text-gray-900 dark:text-white">
              {user.email}
            </span>
          </div>

          <div>
            <span className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
              Account Role
            </span>
            <span className="font-medium text-gray-900 dark:text-white">
              {user.role}
            </span>
          </div>

          <div>
            <span className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
              Status
            </span>
            <span className="font-medium text-emerald-600 dark:text-emerald-400">
              Active & Verified
            </span>
          </div>
        </div>
      </div>

      {/* Update Profile Modal Component */}
      <UpdateProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={user}
        onSuccess={() => {
          setImgError(false);
          if (refetch) refetch();
        }}
      />
    </div>
  );
}
