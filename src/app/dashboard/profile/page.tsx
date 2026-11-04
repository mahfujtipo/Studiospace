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
      <div className="py-20 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
        <p className="mt-3 text-sm text-gray-500 dark:text-zinc-400">
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)] shadow-sm">
        <div className="h-10 w-full bg-gradient-to-r from-emerald-600 to-emerald-800" />
        <div className="flex flex-col justify-between gap-6 p-8 sm:flex-row sm:items-center">
          <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
            <div className="relative flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-3xl border-4 border-[var(--card)] bg-emerald-100 shadow-xl dark:bg-emerald-950/80">
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
            <div className="space-y-1.5">
              <h2 className="text-2xl font-black capitalize tracking-tight text-[var(--foreground)] sm:text-3xl">
                {user.name}
              </h2>

              <p className="text-sm font-medium text-gray-500 dark:text-zinc-400">
                {user.email}
              </p>

              <div className="pt-1">
                <span className="inline-block rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-xs font-semibold text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-300">
                  {user.role}
                </span>
              </div>
            </div>
          </div>
          <div className="flex w-full items-center justify-center gap-3 sm:w-auto">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="rounded-xl border border-[var(--border)] bg-[var(--background)] px-5 py-2.5 text-xs font-semibold text-[var(--foreground)] shadow-sm transition-colors hover:brightness-95"
            >
              Back
            </button>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-emerald-600/20 transition-colors hover:bg-emerald-700"
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>
      <div className="space-y-6 rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-sm">
        <h3 className="border-b border-[var(--border)] pb-4 text-lg font-bold text-[var(--foreground)]">
          Personal Details
        </h3>

        <div className="grid grid-cols-1 gap-6 text-sm md:grid-cols-2">
          <div>
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-gray-400">
              Full Name
            </span>
            <span className="font-medium capitalize text-[var(--foreground)]">
              {user.name}
            </span>
          </div>

          <div>
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-gray-400">
              Email Address
            </span>
            <span className="font-medium text-[var(--foreground)]">
              {user.email}
            </span>
          </div>

          <div>
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-gray-400">
              Account Role
            </span>
            <span className="font-medium text-[var(--foreground)]">
              {user.role}
            </span>
          </div>

          <div>
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-gray-400">
              Status
            </span>
            <span className="flex items-center gap-1.5 font-medium text-emerald-600 dark:text-emerald-400">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              Active & Verified
            </span>
          </div>
        </div>
      </div>
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
