import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import ExploreClientView from "../../components/ExploreClientView";
import { Studio } from "../../types/studio";

async function getAllStudios(): Promise<{
  studios: Studio[];
  error?: string;
}> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/alldata`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch studios: ${res.status} ${res.statusText}`,
      );
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
  } catch (err: unknown) {
    console.error("Error fetching studios:", err);

    return {
      studios: [],
      error:
        err instanceof Error
          ? err.message
          : "Unable to connect to backend server.",
    };
  }
}

async function StudioContent({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}) {
  await connection(); // ডাইনামিক রেন্ডারিং ফোর্স করার জন্য এটি যোগ করা হয়েছে
  const resolvedParams = await searchParams;

  const selectedCategory =
    typeof resolvedParams.category === "string" ? resolvedParams.category : "";

  const { studios, error } = await getAllStudios();

  if (error) {
    return (
      <div className="max-w-xl mx-auto my-12 rounded-2xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/30 p-8 text-center">
        <h2 className="text-lg font-bold text-red-600 dark:text-red-400">
          Connection Error
        </h2>

        <p className="mt-2 text-sm text-red-500 dark:text-red-300">{error}</p>

        <p className="mt-3 text-sm text-gray-600 dark:text-zinc-400">
          Please make sure your Express backend server is running.
        </p>

        <Link
          href="/explore"
          className="inline-flex mt-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors"
        >
          Try Again
        </Link>
      </div>
    );
  }

  return (
    <ExploreClientView studios={studios} activeCategory={selectedCategory} />
  );
}

interface PageProps {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}

function ExploreLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-8">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
        >
          <div className="h-56 animate-pulse bg-gray-200 dark:bg-zinc-800" />

          <div className="space-y-4 p-6">
            <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200 dark:bg-zinc-800" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200 dark:bg-zinc-800" />
            <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-zinc-800" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ExplorePage({ searchParams }: PageProps) {
  return (
    <main className="min-h-screen bg-gray-50 py-12 dark:bg-zinc-950 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
            EXPLORE CATALOG
          </span>

          <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl md:text-5xl">
            Explore Creative Spaces
          </h1>

          <p className="mb-6 text-base text-gray-600 dark:text-zinc-400 md:text-lg">
            Discover and book the perfect creative space for your next project.
          </p>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-600 shadow-sm transition-colors hover:text-emerald-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:text-emerald-400"
          >
            <svg
              className="h-4 w-4"
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
        <Suspense fallback={<ExploreLoading />}>
          <StudioContent searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}
