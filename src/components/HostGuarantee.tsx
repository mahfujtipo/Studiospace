// components/HostGuarantee.tsx

import React from "react";
import Image from "next/image";

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tag: string;
}

const featuresData: FeatureItem[] = [
  {
    id: "spaces-with-soul",
    title: "Spaces With Soul",
    description:
      "Not cookie-cutter. Every spot carries distinct character, natural lighting, and a creative atmosphere.",
    imageUrl:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
    tag: "Character",
  },
  {
    id: "community-over-corporate",
    title: "Community Over Corporate",
    description:
      "Built specifically for makers, artists, and visionaries—designed to inspire, not host sterile meetings.",
    imageUrl:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80",
    tag: "For Creators",
  },
  {
    id: "quick-and-easy",
    title: "Lightning-Fast Booking",
    description:
      "Secure your ideal creative workspace seamlessly in fewer clicks than your morning social scroll.",
    imageUrl:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80",
    tag: "Instant",
  },
  {
    id: "trusted-network",
    title: "Trusted Creative Network",
    description:
      "Connect, collaborate, and build alongside a rapidly expanding crew of ambitious dreamers and doers.",
    imageUrl:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=600&q=80",
    tag: "Community",
  },
];

export default function HostGuarantee() {
  return (
    <section className="py-24 md:py-32 bg-zinc-50/50 dark:bg-zinc-950 relative overflow-hidden">
      {/* Ambient background blur effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-wider uppercase mb-4 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Why Chill With Us
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">
            We’re not just booking spaces.
            <br />
            <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              We’re fueling creativity.
            </span>
          </h2>
          <p className="text-gray-600 dark:text-zinc-400 text-base md:text-lg">
            Experience a platform built by creators, for creators. Here is what
            sets StudioSpace apart.
          </p>
        </div>

        {/* Ultra-Modern Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {featuresData.map((feature) => (
            <div
              key={feature.id}
              className="group relative bg-white dark:bg-zinc-900/90 rounded-3xl p-6 md:p-7 border border-gray-200/80 dark:border-zinc-800/80 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all duration-500 flex flex-col justify-between shadow-sm hover:shadow-2xl hover:-translate-y-1.5 overflow-hidden backdrop-blur-xl"
            >
              {/* Top border illumination on hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div>
                {/* Tag badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-medium px-3 py-1 rounded-full bg-gray-100 dark:bg-zinc-800/80 text-gray-600 dark:text-zinc-300 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950/50 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {feature.tag}
                  </span>
                </div>

                {/* Image Box with zoom */}
                <div className="relative h-40 w-full mb-5 rounded-2xl overflow-hidden bg-gray-100 dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800">
                  <Image
                    src={feature.imageUrl}
                    alt={feature.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Bottom interaction indicator */}
              <div className="mt-6 pt-4 border-t border-gray-100 dark:border-zinc-800/80 flex items-center justify-between text-xs font-semibold text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                <span>Explore benefit</span>
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}