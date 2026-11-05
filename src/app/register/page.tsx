// src/app/register/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [currentYear, setCurrentYear] = useState("2026");

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPhotoURLValid =
    photoURL.trim() === "" || /^https?:\/\/.+/i.test(photoURL.trim());
  const isLengthValid = password.length >= 6;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const isPasswordMatch = password === confirmPassword && password.length > 0;
  const isFormValid =
    fullName.trim() !== "" &&
    isEmailValid &&
    isPhotoURLValid &&
    isLengthValid &&
    hasUppercase &&
    hasLowercase &&
    isPasswordMatch &&
    agreeTerms;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) {
      toast.error(
        "Please ensure all requirements are met and terms are accepted.",
      );
      return;
    }

    try {
      await authClient.signUp.email(
        {
          email: email.trim(),
          password,
          name: fullName.trim(),
          image: photoURL.trim() || undefined,
        },
        {
          onRequest: () => {
            setIsLoading(true);
          },
          onSuccess: async () => {
            try {
              await authClient.signOut();
            } catch (err) {
              console.error(err);
            }

            toast.success("Account created successfully! Redirecting...");
            setIsLoading(false);

            setTimeout(() => {
              window.location.href = "/login";
            }, 1000);
          },
          onError: (ctx) => {
            setIsLoading(false);
            toast.error(ctx.error.message || "Registration failed.");
          },
        },
      );
    } catch (error) {
      setIsLoading(false);
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  };

  const handleGoogleSignUp = async () => {
    setIsGoogleLoading(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      setIsGoogleLoading(false);
      toast.error(
        error instanceof Error
          ? error.message
          : "Google sign up failed. Please try again.",
      );
    }
  };

  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white dark:bg-zinc-950 pt-20">
      <div className="hidden lg:relative lg:flex flex-col justify-between bg-zinc-900 text-white p-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80"
            alt="Creative Studio Register Background"
            fill
            priority
            className="object-cover opacity-85"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-tr from-white/95 via-white/70 to-transparent dark:from-zinc-950/95 dark:via-zinc-900/70 z-0" />

        <div className="relative z-10">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2"
          >
            <span className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white text-sm font-black">
              S
            </span>
            StudioSpace
          </Link>
        </div>

        <div className="relative z-10 max-w-md my-auto py-12 text-gray-900 dark:text-white">
          <span className="inline-block text-emerald-600 dark:text-emerald-400 font-semibold text-xs tracking-widest uppercase mb-3 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800/80 px-3.5 py-1 rounded-full">
            JOIN THE COMMUNITY
          </span>
          <h1 className="text-3xl xl:text-4xl font-extrabold tracking-tight mb-4 leading-tight">
            Discover inspiring spaces and bring creative ideas to life.
          </h1>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-8">
            Whether you are booking your next production stage or listing your
            own creative studio, StudioSpace makes collaboration effortless.
          </p>

          <div className="space-y-3">
            {[
              "Find your perfect creative space",
              "Showcase and monetize your own studio",
              "Manage your bookings with transparency",
            ].map((benefit, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 text-sm text-gray-800 dark:text-gray-200"
              >
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/40">
                  ✓
                </div>
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-xs text-gray-600 dark:text-gray-400">
          © {currentYear} StudioSpace Marketplace. All rights reserved.
        </div>
      </div>

      <div className="flex flex-col justify-center px-6 sm:px-12 md:px-20 py-12 lg:py-16 bg-gray-50 dark:bg-zinc-950">
        <div className="max-w-md w-full mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
              Create Your Account
            </h2>
            <p className="text-gray-600 dark:text-zinc-400 text-sm">
              Join StudioSpace and start exploring creative environments.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Mahafujul Alam Tipo"
                className="w-full px-4 py-3 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all shadow-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
                Profile Photo URL{" "}
                <span className="normal-case text-gray-400 font-normal">
                  (Optional)
                </span>
              </label>
              <input
                type="url"
                name="photoURL"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                placeholder="https://example.com/profile.jpg"
                className="w-full px-4 py-3 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all shadow-sm"
              />
              {!isPhotoURLValid && (
                <p className="text-[11px] text-red-500 mt-1">
                  Please enter a valid HTTP or HTTPS image URL.
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="creator@example.com"
                className="w-full px-4 py-3 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all shadow-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
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

              <div className="grid grid-cols-2 gap-2 mt-2 text-[11px]">
                <span
                  className={
                    isLengthValid
                      ? "text-emerald-600 dark:text-emerald-400 font-medium"
                      : "text-gray-400"
                  }
                >
                  ✓ At least 6 characters
                </span>
                <span
                  className={
                    hasUppercase
                      ? "text-emerald-600 dark:text-emerald-400 font-medium"
                      : "text-gray-400"
                  }
                >
                  ✓ One uppercase letter
                </span>
                <span
                  className={
                    hasLowercase
                      ? "text-emerald-600 dark:text-emerald-400 font-medium"
                      : "text-gray-400"
                  }
                >
                  ✓ One lowercase letter
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all shadow-sm pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400 hover:text-gray-600 dark:hover:text-zinc-200"
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
              {confirmPassword.length > 0 && !isPasswordMatch && (
                <p className="text-[11px] text-red-500 mt-1">
                  Passwords do not match
                </p>
              )}
            </div>

            <div className="pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  value="true"
                  required
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-xs text-gray-600 dark:text-zinc-400">
                  I agree to the{" "}
                  <a
                    href="#terms"
                    onClick={(e) => e.preventDefault()}
                    className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium"
                  >
                    Terms and Conditions
                  </a>{" "}
                  and Privacy Policy.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading || isGoogleLoading || !isFormValid}
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
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
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0v3c0 3.042 1.135 5.824 3 7.938l-2.647z"
                    ></path>
                  </svg>
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

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

          <button
            type="button"
            onClick={handleGoogleSignUp}
            disabled={isGoogleLoading || isLoading}
            className="w-full py-3 px-4 rounded-xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-gray-700 dark:text-zinc-200 font-semibold text-sm hover:bg-gray-50 dark:hover:bg-zinc-800/80 transition-all flex items-center justify-center gap-3 shadow-sm disabled:opacity-50"
          >
            {isGoogleLoading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4"
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
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 1 5.373 1 12h4z"
                  />
                </svg>
                Connecting to Google...
              </>
            ) : (
              <>
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
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 2.47 3.99 4.94 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                Sign up with Google
              </>
            )}
          </button>

          <p className="text-center text-xs text-gray-600 dark:text-zinc-400 mt-8">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
