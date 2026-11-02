// app/explore/page.tsx

import { Suspense } from "react";
import Link from "next/link";
import ExploreClientView from "@/components/ExploreClientView";
import { Studio } from "@/types/studio";

async function getAllStudios(): Promise<{ studios: Studio[]; error?: string }> {
  try {
    const res = await fetch("http://localhost:8000/alldata", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch studios: ${res.statusText}`);
    }

    const data = await res.json();

    let studioList: Studio[] = [];
    if (Array.isArray(data)) {
      studioList = data;
    } else if (data && Array.isArray(data.studios)) {
      studioList = data.studios;
    } else if (data && Array.isArray(data.data)) {
      studioList = data.data;
    }

    return { studios: studioList };
  } catch (err: any) {
    console.error("Error fetching studios:", err);
    return {
      studios: [],
      error: err.message || "Unable to connect to backend server.",
    };
  }
}

async function StudioContent({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const selectedCategory =
    typeof resolvedParams.category === "string" ? resolvedParams.category : "";

  const { studios, error } = await getAllStudios();

  const filteredStudios = selectedCategory
    ? studios.filter((s) => {
        if (!s.category) return false;

        const apiCategory = s.category.trim().toLowerCase();
        const targetCategory = selectedCategory.trim().toLowerCase();

        return (
          apiCategory === targetCategory ||
          apiCategory.includes(targetCategory) ||
          targetCategory.includes(apiCategory)
        );
      })
    : studios;

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-xl p-8 text-center max-w-xl mx-auto my-12">
        <h2 className="text-lg font-bold text-red-600 dark:text-red-400">
          Connection Error
        </h2>
        <p className="text-sm text-red-500 mt-2">{error}</p>
      </div>
    );
  }

  return (
    <ExploreClientView
      studios={filteredStudios}
      activeCategory={selectedCategory}
    />
  );
}

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default function ExplorePage({ searchParams }: PageProps) {
  return (
    <main className="min-h-screen py-12 md:py-20 bg-gray-50 dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block text-emerald-600 dark:text-emerald-400 font-semibold text-sm tracking-widest uppercase mb-2">
            EXPLORE CATALOG
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            Explore Creative Spaces
          </h1>
          <p className="text-gray-600 dark:text-zinc-400 text-base md:text-lg mb-6">
            Discover and book the perfect creative space for your next project.
          </p>

          {/* Back to Homepage Button placed right after the sentence */}
          <div className="inline-block">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors bg-white dark:bg-zinc-900 px-4 py-2 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Homepage
            </Link>
          </div>
        </div>

        {/* Suspense Boundary */}
        <Suspense
          fallback={
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-80 bg-gray-200 dark:bg-zinc-900 animate-pulse rounded-2xl"
                />
              ))}
            </div>
          }
        >
          <StudioContent searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}
