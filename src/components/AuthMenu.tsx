"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

interface AuthMenuProps {
  isTransparent?: boolean;
  mobile?: boolean;
  onNavigate?: () => void;
}

const menuLinks = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: "dashboard",
    description: "Overview of your account",
  },
  {
    name: "Add New Studio",
    href: "/dashboard/add-studio",
    icon: "plus",
    description: "List a new creative space",
  },
  {
    name: "My Studio Listings",
    href: "/dashboard/my-studios",
    icon: "building",
    description: "Manage your studios",
  },
  {
    name: "My Bookings",
    href: "/dashboard/bookings",
    icon: "calendar",
    description: "View your reservations",
  },
];

function MenuIcon({ type }: { type: string }) {
  const commonProps = {
    className: "h-5 w-5",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    viewBox: "0 0 24 24",
  };

  switch (type) {
    case "dashboard":
      return (
        <svg {...commonProps}>
          <rect x="3" y="3" width="8" height="8" rx="2" />
          <rect x="13" y="3" width="8" height="5" rx="2" />
          <rect x="13" y="10" width="8" height="11" rx="2" />
          <rect x="3" y="13" width="8" height="8" rx="2" />
        </svg>
      );

    case "plus":
      return (
        <svg {...commonProps}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      );

    case "building":
      return (
        <svg {...commonProps}>
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <path d="M9 21v-4h6v4M8 7h2M14 7h2M8 11h2M14 11h2" />
        </svg>
      );

    case "calendar":
      return (
        <svg {...commonProps}>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M16 3v4M8 3v4M3 10h18M8 14h2M14 14h2M8 17h2" />
        </svg>
      );

    default:
      return null;
  }
}

export default function AuthMenu({
  isTransparent = false,
  mobile = false,
  onNavigate,
}: AuthMenuProps) {
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;
  const userName = user?.name || user?.email || "User";
  const userEmail = user?.email || "";
  const userImage = user?.image;
  const firstLetter = userName.charAt(0).toUpperCase();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);

      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            setIsDropdownOpen(false);
            onNavigate?.();
            router.push("/");
            router.refresh();
          },
        },
      });
    } finally {
      setIsSigningOut(false);
    }
  };

  if (isPending) {
    return (
      <div
        className={`h-11 w-28 animate-pulse rounded-full ${
          isTransparent ? "bg-white/20" : "bg-gray-200"
        }`}
      />
    );
  }

  if (!session) {
    return (
      <div
        className={`flex ${
          mobile ? "w-full flex-col gap-3" : "items-center gap-5"
        }`}
      >
        <Link
          href="/login"
          onClick={onNavigate}
          className={`text-sm font-semibold transition-colors ${
            mobile
              ? "rounded-xl border border-current/10 px-4 py-3 hover:bg-current/5"
              : isTransparent
                ? "text-white/90 hover:text-white"
                : "text-[#25233A] hover:text-emerald-600"
          }`}
        >
          Log In
        </Link>

        <Link
          href="/register"
          onClick={onNavigate}
          className="rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-6 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:from-emerald-600 hover:to-green-700 hover:shadow-emerald-500/30"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  return (
    <div ref={dropdownRef} className={`relative ${mobile ? "w-full" : ""}`}>
      {/* Profile Trigger */}
      <button
        type="button"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        aria-label="Open profile menu"
        aria-expanded={isDropdownOpen}
        className={`group flex items-center gap-3 rounded-full transition-all duration-300 ${
          mobile
            ? "w-full justify-between rounded-2xl border border-current/10 p-3 hover:bg-current/5"
            : "rounded-full py-1 pl-1 pr-3 hover:bg-black/5"
        }`}
      >
        <span className="rounded-full bg-gradient-to-tr from-emerald-400 via-green-500 to-teal-400 p-[2px] shadow-md shadow-emerald-500/20 transition-transform duration-300 group-hover:scale-105">
          <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-emerald-50 text-sm font-bold text-emerald-700">
            {userImage && !imageError ? (
              <img
                src={userImage}
                alt={userName}
                className="h-full w-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              firstLetter
            )}
          </span>
        </span>

        <span
          className={`min-w-0 flex-1 text-left ${
            mobile ? "block" : "hidden lg:block"
          }`}
        >
          <span
            className={`block max-w-32 truncate text-sm font-semibold ${
              isTransparent && !mobile ? "text-white" : "text-[#25233A]"
            }`}
          >
            {userName}
          </span>

          <span
            className={`block text-[11px] ${
              isTransparent && !mobile ? "text-white/60" : "text-gray-500"
            }`}
          >
            My Account
          </span>
        </span>

        <svg
          className={`h-4 w-4 shrink-0 transition-transform duration-300 ${
            isDropdownOpen ? "rotate-180" : ""
          } ${isTransparent && !mobile ? "text-white" : "text-gray-500"}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {/* Profile Dropdown */}
      {isDropdownOpen && (
        <div
          className={`z-[70] overflow-hidden rounded-2xl border border-gray-100 bg-white text-[#25233A] shadow-2xl shadow-gray-900/10 animate-in fade-in slide-in-from-top-2 duration-200 ${
            mobile
              ? "relative mt-3 w-full"
              : "absolute right-0 top-full mt-4 w-[300px]"
          }`}
        >
          {/* User Profile Header */}
          <div className="relative overflow-hidden bg-gradient-to-br from-[#102F25] via-[#145A3B] to-emerald-600 px-5 py-5">
            <div className="absolute -right-8 -top-10 h-32 w-32 rounded-full border border-white/10" />
            <div className="absolute -right-2 -top-4 h-24 w-24 rounded-full border border-white/10" />

            <div className="relative flex items-center gap-3">
              <div className="rounded-full bg-white/20 p-[3px]">
                <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-2 border-white/70 bg-white text-base font-bold text-emerald-700">
                  {userImage && !imageError ? (
                    <img
                      src={userImage}
                      alt={userName}
                      className="h-full w-full object-cover"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    firstLetter
                  )}
                </div>
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-white">
                  {userName}
                </p>
                <p className="truncate text-xs text-white/70">{userEmail}</p>
                <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-medium text-white">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                  Active Account
                </span>
              </div>
            </div>
          </div>

          {/* Menu Heading */}
          <div className="px-5 pb-2 pt-4">
            <p className="text-[10px] font-bold uppercase tracking-[1.5px] text-gray-400">
              Manage Account
            </p>
          </div>

          {/* Menu Items */}
          <div className="space-y-1 px-3 pb-3">
            {menuLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => {
                  setIsDropdownOpen(false);
                  onNavigate?.();
                }}
                className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 hover:bg-emerald-50"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-500 transition-all duration-200 group-hover:bg-emerald-100 group-hover:text-emerald-600">
                  <MenuIcon type={link.icon} />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-[13px] font-semibold text-gray-700 transition-colors group-hover:text-emerald-700">
                    {link.name}
                  </span>
                  <span className="block text-[10px] text-gray-400">
                    {link.description}
                  </span>
                </span>

                <svg
                  className="h-4 w-4 text-gray-300 transition-all duration-200 group-hover:translate-x-1 group-hover:text-emerald-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m9 18 6-6-6-6"
                  />
                </svg>
              </Link>
            ))}
          </div>

          {/* Sign Out */}
          <div className="border-t border-gray-100 bg-gray-50/80 p-3">
            <button
              type="button"
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-red-500 transition-all duration-200 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-500">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"
                  />
                </svg>
              </span>

              <span>{isSigningOut ? "Signing out..." : "Sign Out"}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
