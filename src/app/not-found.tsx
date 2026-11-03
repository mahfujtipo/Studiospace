// src/app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-950 px-4">
      <div className="max-w-md w-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl p-8 text-center shadow-sm space-y-6">
        <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-3xl flex items-center justify-center mx-auto text-4xl shadow-inner">
          🎨
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Page Not Found
          </h1>
          <p className="text-sm text-gray-500 dark:text-zinc-400">
            Oops! The creative studio or page you are looking for doesn&apos;t
            exist or has been moved.
          </p>
        </div>

        <Link
          href="/"
          className="inline-block w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors shadow-lg shadow-emerald-600/20"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
