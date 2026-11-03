"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  role: string;
}

interface UpdateProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onSuccess?: () => void;
}

export default function UpdateProfileModal({
  isOpen,
  onClose,
  user,
  onSuccess,
}: UpdateProfileModalProps) {
  const [name, setName] = useState(user.name);
  const [avatar, setAvatar] = useState(user.avatar);
  const [isUpdating, setIsUpdating] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setName(user.name);
    setAvatar(user.avatar);
    setErrorMsg("");
  }, [user, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setErrorMsg("");

    try {
      const { error } = await authClient.updateUser({
        name: name,
        image: avatar,
      });

      if (error) {
        throw new Error(error.message || "Failed to update profile.");
      }

      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-fadeIn">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-zinc-800">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Update Profile
          </h3>
          <button
            type="button"
            disabled={isUpdating}
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-zinc-200 text-sm font-semibold disabled:opacity-50"
          >
            ✕
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 text-xs rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-zinc-400 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isUpdating}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-zinc-400 mb-2">
              Avatar Image URL
            </label>
            <input
              type="text"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              placeholder="https://example.com/image.jpg"
              disabled={isUpdating}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-zinc-800">
            <button
              type="button"
              disabled={isUpdating}
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-200 text-xs font-semibold hover:bg-gray-200 transition-colors border border-gray-200 dark:border-zinc-700 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUpdating}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors shadow-lg shadow-emerald-600/20 disabled:opacity-50"
            >
              {isUpdating ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
