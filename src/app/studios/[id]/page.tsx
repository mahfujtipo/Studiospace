import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Studio } from "@/types/studio";
import BookingCard from "@/components/BookingCard";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80";

async function getStudioById(
  id: string,
): Promise<{ studio: Studio | null; error?: string }> {
  try {
    const res = await fetch(`http://localhost:8000/studios/${id}`, {
      cache: "no-store",
    });

    if (res.status === 404) {
      return { studio: null };
    }

    if (!res.ok) {
      throw new Error(`Failed to fetch studio details: ${res.statusText}`);
    }

    const data = await res.json();
    return { studio: data.studio || data };
  } catch (err: unknown) {
    console.error("Error fetching studio details:", err);

    return {
      studio: null,
      error:
        err instanceof Error
          ? err.message
          : "Unable to connect to backend server.",
    };
  }
}

async function StudioDetailContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { studio, error } = await getStudioById(id);

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-2xl p-8 text-center max-w-md mx-auto shadow-sm">
        <h2 className="text-xl font-bold text-red-600 dark:text-red-400 mb-2">
          Connection Error
        </h2>

        <p className="text-sm text-red-500 mb-6">{error}</p>

        <Link
          href="/explore"
          className="inline-flex px-6 py-2.5 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium text-sm transition-colors"
        >
          Back to Explore Studios
        </Link>
      </div>
    );
  }

  if (!studio) {
    return (
      <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-12 text-center max-w-md mx-auto shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Studio Not Found
        </h2>

        <p className="text-gray-600 dark:text-zinc-400 text-sm mb-6">
          The studio you are looking for does not exist or has been removed.
        </p>

        <Link
          href="/explore"
          className="inline-flex px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm transition-colors shadow-sm shadow-emerald-600/25"
        >
          Explore All Studios
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Studio Header Info */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide uppercase border border-emerald-200 dark:border-emerald-900">
            {studio.category || "Creative Studio"}
          </span>

          <div className="flex items-center text-sm text-gray-500 dark:text-zinc-400 gap-1.5">
            <svg
              className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>

            <span>{studio.location || "Location unavailable"}</span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
          {studio.title}
        </h1>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Image & Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Main Image */}
          <div className="relative h-[350px] sm:h-[450px] w-full rounded-2xl overflow-hidden shadow-md bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800">
            <Image
              src={studio.imageUrl || FALLBACK_IMAGE}
              alt={studio.title || "Studio Space"}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover"
            />
          </div>

          {/* Overview Section */}
          <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              About This Space
            </h3>

            <p className="text-gray-600 dark:text-zinc-300 text-base leading-relaxed whitespace-pre-line">
              {studio.overview ||
                "No detailed overview provided for this creative space."}
            </p>
          </div>

          {/* Amenities Section */}
          {studio.amenities && studio.amenities.length > 0 && (
            <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Included Amenities & Equipment
              </h3>

              <div className="flex flex-wrap gap-2.5">
                {studio.amenities.map((amenity, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-gray-50 dark:bg-zinc-800/80 text-gray-700 dark:text-zinc-200 border border-gray-200 dark:border-zinc-700"
                  >
                    <svg
                      className="w-4 h-4 text-emerald-600 dark:text-emerald-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>

                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Host Information */}
          <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-sm flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xl border border-emerald-200 dark:border-emerald-900">
              {studio.ownerName
                ? studio.ownerName.charAt(0).toUpperCase()
                : "H"}
            </div>

            <div>
              <span className="text-xs text-gray-400 uppercase font-semibold tracking-wider block mb-1">
                Hosted By
              </span>

              <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                {studio.ownerName || "Studio Host"}
              </h4>

              <p className="text-xs text-gray-500 dark:text-zinc-400 mt-0.5">
                StudioSpace Host
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Booking Card */}
        <div className="lg:col-span-1">
          <BookingCard
            hourlyRate={studio.hourlyRate ?? 0}
            securityDeposit={studio.securityDeposit ?? 0}
          />
        </div>
      </div>
    </div>
  );
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function StudioDetailsPage({ params }: PageProps) {
  return (
    <main className="min-h-screen py-12 md:py-20 bg-gray-50 dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link
            href="/explore"
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
            Back to Explore Studios
          </Link>
        </div>

        <Suspense
          fallback={
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 py-12">
              <div className="lg:col-span-2 h-[450px] bg-gray-200 dark:bg-zinc-900 animate-pulse rounded-2xl" />
              <div className="lg:col-span-1 h-96 bg-gray-200 dark:bg-zinc-900 animate-pulse rounded-2xl" />
            </div>
          }
        >
          <StudioDetailContent params={params} />
        </Suspense>
      </div>
    </main>
  );
}
