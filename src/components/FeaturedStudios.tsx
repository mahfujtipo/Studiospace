import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";

export interface Studio {
  _id: string;
  title: string;
  category: string;
  hourlyRate: number;
  securityDeposit?: number;
  maxCapacity: number;
  location: string;
  imageUrl?: string;
  amenities?: string[];
  overview?: string;
  ownerName?: string;
  ownerEmail?: string;
  createdAt?: string;
  updatedAt?: string;
}

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80";

async function getFeaturedStudios(): Promise<{
  studios: Studio[];
  error?: string;
}> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/alldata?limit=6`,
      {
        cache: "no-store",
      },
    );

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

    const featured = studioList.slice(0, 6);
    return { studios: featured };
  } catch (err: any) {
    console.error("Error fetching featured studios:", err);
    return {
      studios: [],
      error: err.message || "Failed to load studios. Please try again later.",
    };
  }
}

export default async function FeaturedStudios() {
  await connection();

  const { studios, error } = await getFeaturedStudios();

  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="inline-block text-emerald-600 dark:text-emerald-400 font-semibold text-sm tracking-widest uppercase mb-2">
            FEATURED SPACES
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
            Discover Your Perfect Creative Space
          </h2>
          <p className="text-gray-600 dark:text-zinc-400 text-base md:text-lg">
            Explore professional creative spaces for your projects, tailored to
            bring your vision to life.
          </p>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-xl p-6 text-center max-w-xl mx-auto mb-12">
            <p className="text-red-600 dark:text-red-400 font-medium">
              Unable to load studios at the moment.
            </p>
            <p className="text-sm text-red-500 dark:text-red-500/80 mt-1">
              {error}
            </p>
          </div>
        )}

        {/* Empty State */}
        {!error && studios.length === 0 && (
          <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-12 text-center max-w-xl mx-auto mb-12 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No Studios Found
            </h3>
            <p className="text-gray-600 dark:text-zinc-400 text-sm">
              We couldn't find any creative spaces available right now. Please
              check back later!
            </p>
          </div>
        )}

        {/* Studio Cards Grid */}
        {studios.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {studios.map((studio) => (
                <div
                  key={studio._id}
                  className="group bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Image Container with Zoom Effect */}
                    <div className="relative h-56 w-full overflow-hidden bg-gray-100 dark:bg-zinc-800">
                      <Image
                        src={studio.imageUrl || FALLBACK_IMAGE}
                        alt={studio.title || "Studio Space"}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        priority={false}
                      />
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-emerald-600 dark:text-emerald-400 shadow-sm">
                        {studio.category || "Studio"}
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="p-6">
                      <div className="flex items-center text-xs text-gray-500 dark:text-zinc-400 mb-2 gap-1">
                        <svg
                          className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0"
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
                        <span className="truncate">
                          {studio.location || "Location unavailable"}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {studio.title}
                      </h3>

                      {/* Specs Row: Capacity & Rate */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-zinc-800 text-sm text-gray-600 dark:text-zinc-300 mb-6">
                        <div className="flex items-center gap-1.5">
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
                              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                            />
                          </svg>
                          <span>Max {studio.maxCapacity || "N/A"} guests</span>
                        </div>
                        <div className="font-bold text-gray-900 dark:text-white flex items-center">
                          <span className="text-emerald-600 dark:text-emerald-400 text-base">
                            ${studio.hourlyRate}
                          </span>
                          <span className="text-xs font-normal text-gray-500 dark:text-zinc-400 ml-1">
                            / hr
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Button Footer */}
                  <div className="px-6 pb-6 pt-0">
                    <Link
                      href={`/studios/${studio._id}`}
                      className="w-full inline-flex items-center justify-center py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm transition-colors shadow-sm shadow-emerald-600/20"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Explore All Studios CTA */}
            <div className="text-center">
              <Link
                href="/explore"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-emerald-600 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-600 hover:text-white font-semibold text-sm transition-all duration-300 shadow-sm"
              >
                Explore All Studios
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
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
