"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!email.trim() || !password) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    try {
      await authClient.signIn.email(
        {
          email: email.trim(),
          password,
          rememberMe,
          callbackURL: "/",
        },
        {
          onRequest: () => {
            setIsLoading(true);
            setErrorMessage("");
            setSuccessMessage("");
          },
          onSuccess: () => {
            setSuccessMessage("Sign in successful!");
          },
          onError: (ctx) => {
            setErrorMessage(ctx.error.message);
          },
        },
      );
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white dark:bg-zinc-950 pt-20">
      {/* Left Side: Branding & Creative Showcase */}
      <div className="hidden lg:relative lg:flex flex-col justify-between bg-zinc-900 text-white p-12 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80"
            alt="Studio Space Background"
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900/60 to-transparent z-0" />

        {/* Top Branding Header */}
        <div className="relative z-10">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight text-white flex items-center gap-2"
          >
            <span className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white text-sm font-black">
              S
            </span>
            StudioSpace
          </Link>
        </div>

        {/* Center Content */}
        <div className="relative z-10 max-w-md my-auto py-12">
          <span className="inline-block text-emerald-400 font-semibold text-xs tracking-widest uppercase mb-3 bg-emerald-950/80 border border-emerald-800/80 px-3.5 py-1 rounded-full">
            WELCOME BACK
          </span>
          <h1 className="text-3xl xl:text-4xl font-extrabold tracking-tight mb-4 leading-tight">
            Your next creative space is just a few clicks away.
          </h1>
          <p className="text-gray-300 text-sm leading-relaxed mb-8">
            Access your active reservations, saved creative spots, and manage
            your production bookings seamlessly.
          </p>

          {/* Key Benefits */}
          <div className="space-y-3">
            {[
              "Discover verified creative spaces",
              "Manage your active bookings",
              "Connect directly with studio owners",
            ].map((benefit, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 text-sm text-gray-200"
              >
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/40">
                  ✓
                </div>
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 text-xs text-gray-400">
          © 2026 StudioSpace Marketplace. All rights reserved.
        </div>
      </div>

      {/* Right Side: Sign In Form */}
      <div className="flex flex-col justify-center px-6 sm:px-12 md:px-20 py-12 lg:py-16 bg-gray-50 dark:bg-zinc-950">
        <div className="max-w-md w-full mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600 dark:text-zinc-400 text-sm">
              Sign in to continue to your account.
            </p>
          </div>

          {/* Feedback Alerts */}
          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 text-xs font-medium">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 text-emerald-600 dark:text-emerald-400 text-xs font-medium">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-zinc-300 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="creator@example.com"
                className="w-full px-4 py-3 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all shadow-sm"
              />
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold text-gray-700 dark:text-zinc-300 uppercase tracking-wider">
                  Password
                </label>
                <a
                  href="#forgot"
                  onClick={(e) => e.preventDefault()}
                  className="text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all shadow-sm pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400 hover:text-gray-600 dark:hover:text-zinc-200"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-xs text-gray-600 dark:text-zinc-400">
                  Remember me
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-zinc-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-gray-50 dark:bg-zinc-950 px-2 text-gray-400">
                Or continue with
              </span>
            </div>
          </div>

          {/* Google Sign In Button (UI only) */}
          <button
            type="button"
            onClick={() => alert("Google Sign In demo (backend not connected)")}
            className="w-full py-3 px-4 rounded-xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-gray-700 dark:text-zinc-200 font-semibold text-sm hover:bg-gray-50 dark:hover:bg-zinc-800/80 transition-all flex items-center justify-center gap-3 shadow-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            Sign in with Google
          </button>

          {/* Bottom Redirect */}
          <p className="text-center text-xs text-gray-600 dark:text-zinc-400 mt-8">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
