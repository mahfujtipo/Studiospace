// components/Categories.tsx

import Image from "next/image";
import Link from "next/link";

export interface CategoryItem {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

const categoriesData: CategoryItem[] = [
  {
    id: "photography-studio",
    name: "Photography Studio",
    description:
      "Professional cycloramas, natural light lofts, and fully equipped lighting setups.",
    imageUrl:
      "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "film-video-studio",
    name: "Film & Video Studio",
    description:
      "Spacious sound stages, green screens, and production-ready video spaces.",
    imageUrl:
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "podcast-room",
    name: "Podcast Room",
    description:
      "Acoustic-treated recording booths with multi-mic setups and streaming gear.",
    imageUrl:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "music-recording-suite",
    name: "Music Recording Suite",
    description:
      "Professional vocal booths, mixing consoles, and high-end instrument gear.",
    imageUrl:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80", // Music recording console image
  },
  {
    id: "creative-workshop",
    name: "Creative Workshop",
    description:
      "Versatile open-plan spaces designed for art classes, workshops, and brainstorming.",
    imageUrl:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80",
  },
];

export default function Categories() {
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-zinc-900 border-t border-gray-100 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="inline-block text-emerald-600 dark:text-emerald-400 font-semibold text-sm tracking-widest uppercase mb-2">
            CATEGORIES
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
            Explore by Category
          </h2>
          <p className="text-gray-600 dark:text-zinc-400 text-base md:text-lg">
            Discover professional spaces tailored precisely to your creative and
            production needs.
          </p>
        </div>

        {/* Categories Container: Flexbox with justify-center to automatically balance 5 items (3 top, 2 centered bottom) */}
        <div className="flex flex-wrap justify-center gap-8">
          {categoriesData.map((category) => (
            <Link
              key={category.id}
              href={`/explore?category=${encodeURIComponent(category.name)}`}
              className="group w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.35rem)] bg-gray-50 dark:bg-zinc-950 rounded-2xl border border-gray-200 dark:border-zinc-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image Container */}
                <div className="relative h-48 w-full overflow-hidden bg-gray-200 dark:bg-zinc-800">
                  <Image
                    src={category.imageUrl}
                    alt={category.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                </div>

                {/* Content Details */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 dark:text-zinc-400 text-sm line-clamp-2">
                    {category.description}
                  </p>
                </div>
              </div>

              {/* Clickable Action Prompt */}
              <div className="px-6 pb-6 pt-0 flex items-center text-sm font-semibold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
                <span>Browse spaces</span>
                <svg
                  className="w-4 h-4 ml-1.5"
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
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
