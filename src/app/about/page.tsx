// src/app/about/page.tsx

import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  const whyChooseUs = [
    {
      title: "Wide Range of Creative Spaces",
      description:
        "From high-end photography suites and film stages to acoustically treated podcast rooms and music studios.",
      icon: (
        <svg
          className="w-6 h-6 text-emerald-600 dark:text-emerald-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
    },
    {
      title: "Easy Discovery",
      description:
        "Effortlessly search and filter studios based on location, capacity, equipment, and category tailored to your needs.",
      icon: (
        <svg
          className="w-6 h-6 text-emerald-600 dark:text-emerald-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      ),
    },
    {
      title: "Transparent Hourly Pricing",
      description:
        "No hidden fees or surprises. Clear hourly rates and security deposits displayed upfront for easy budgeting.",
      icon: (
        <svg
          className="w-6 h-6 text-emerald-600 dark:text-emerald-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "Convenient Booking Experience",
      description:
        "Seamless booking interface allowing creators to reserve creative environments with confidence.",
      icon: (
        <svg
          className="w-6 h-6 text-emerald-600 dark:text-emerald-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      title: "Flexible Options",
      description:
        "Choose half-day, full-day, or multi-hour sessions with custom schedules that match production timelines.",
      icon: (
        <svg
          className="w-6 h-6 text-emerald-600 dark:text-emerald-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "Direct Connection",
      description:
        "Connecting creators directly with studio hosts, fostering collaborative relationships across the creative industry.",
      icon: (
        <svg
          className="w-6 h-6 text-emerald-600 dark:text-emerald-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
  ];

  const whoWeServe = [
    {
      title: "Photographers",
      description:
        "Find natural light studios, cyclorama walls, and full lighting setups for editorial, product, or portrait shoots.",
      icon: (
        <svg
          className="w-7 h-7 text-emerald-600 dark:text-emerald-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
    {
      title: "Filmmakers",
      description:
        "Access green screen rooms, production stages, and spacious set builds for commercials, shorts, and music videos.",
      icon: (
        <svg
          className="w-7 h-7 text-emerald-600 dark:text-emerald-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      title: "Podcasters",
      description:
        "Book soundproofed podcast booths equipped with multi-channel mics and visual recording environments.",
      icon: (
        <svg
          className="w-7 h-7 text-emerald-600 dark:text-emerald-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
          />
        </svg>
      ),
    },
    {
      title: "Musicians",
      description:
        "Discover acoustic rehearsal facilities, vocal isolation booths, and professional audio mixing environments.",
      icon: (
        <svg
          className="w-7 h-7 text-emerald-600 dark:text-emerald-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 .895-2 3-2 3 .895 3 2zm12 0c0 1.105-1.343 2-3 2s-3-.895-3-2 .895-2 3-2 3 .895 3 2zM9 10l12-3"
          />
        </svg>
      ),
    },
    {
      title: "Content Creators",
      description:
        "Reserve stylish, aesthetic rooms with adaptable backdrops perfect for YouTube, social content, and branding.",
      icon: (
        <svg
          className="w-7 h-7 text-emerald-600 dark:text-emerald-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "Studio Owners",
      description:
        "Monetize unused creative spaces by reaching thousands of verified artists, creators, and production teams.",
      icon: (
        <svg
          className="w-7 h-7 text-emerald-600 dark:text-emerald-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V11m0 0h4m-4 0H9m4 0V7m0 0h4m-4 0H9"
          />
        </svg>
      ),
    },
  ];

  const values = [
    {
      title: "Creativity",
      description:
        "Empowering artists by providing environments engineered for artistic production.",
    },
    {
      title: "Accessibility",
      description:
        "Making premium spaces reachable for creators of all scales and project sizes.",
    },
    {
      title: "Transparency",
      description:
        "Fostering clear terms, upfront rates, and clear specs across all creative listings.",
    },
    {
      title: "Community",
      description:
        "Bridging the gap between space owners and independent production professionals.",
    },
    {
      title: "Simplicity",
      description:
        "Streamlining discovery, scheduling, and workspace booking into a unified process.",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-zinc-100">
      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-zinc-900 text-white">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1920&q=80"
            alt="Studio Space Background"
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900/60 to-transparent z-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-emerald-400 font-semibold text-xs sm:text-sm tracking-widest uppercase mb-3 bg-emerald-950/60 border border-emerald-800/60 px-4 py-1.5 rounded-full">
            ABOUT STUDIOSPACE
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight mb-6">
            Where Ideas Find Their{" "}
            <span className="text-emerald-400">Perfect Creative Space</span>
          </h1>
          <p className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            StudioSpace makes it easier for creators to discover, evaluate, and
            book professional creative environments suited for their next
            project.
          </p>
          <div className="flex justify-center">
            <Link
              href="/explore"
              className="px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-base transition-all duration-200 shadow-lg shadow-emerald-600/30 hover:scale-105"
            >
              Explore Studios
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Our Story */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-xs tracking-widest uppercase mb-2 block">
              OUR STORY
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-6">
              Simplifying Space Rental for the Modern Creator
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-zinc-300 text-base leading-relaxed">
              <p>
                Finding the right creative space has historically been
                fragmented and time-consuming. Creators often faced incomplete
                details, unclear pricing, and lengthy back-and-forth
                communication just to check availability.
              </p>
              <p>
                StudioSpace was created to solve this problem. We built a
                unified platform where creators can browse high-quality
                photography studios, sound stages, podcast booths, and music
                suites with transparent information.
              </p>
              <p>
                At the same time, we help studio owners showcase their spaces to
                a growing network of artists, directors, and content producers,
                facilitating smoother bookings for both sides.
              </p>
            </div>
          </div>
          <div className="relative h-[380px] sm:h-[450px] w-full rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-zinc-800">
            <Image
              src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80"
              alt="Creative Workshop and Production Studio"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 3. Our Mission and Vision */}
      <section className="py-16 bg-white dark:bg-zinc-900/50 border-y border-gray-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-xs tracking-widest uppercase mb-2 block">
              PURPOSE & DIRECTION
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
              Driven by Passion for Creation
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission Card */}
            <div className="bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-8 sm:p-10 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-2 h-full bg-emerald-600 dark:bg-emerald-500" />
              <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xl mb-6">
                🎯
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600 dark:text-zinc-300 text-base leading-relaxed">
                To make discovering and booking creative spaces simple,
                transparent, and accessible for creators of all disciplines,
                eliminating administrative friction so they can focus on their
                art.
              </p>
            </div>

            {/* Vision Card */}
            <div className="bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-8 sm:p-10 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-2 h-full bg-emerald-600 dark:bg-emerald-500" />
              <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xl mb-6">
                🚀
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Our Vision
              </h3>
              <p className="text-gray-600 dark:text-zinc-300 text-base leading-relaxed">
                To build a connected creative community where independent
                creators and studio owners grow together through efficient
                resource sharing and accessible workspace utilization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Why Choose StudioSpace? */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-xs tracking-widest uppercase mb-2 block">
            THE PLATFORM ADVANTAGE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Why Choose StudioSpace?
          </h2>
          <p className="text-gray-600 dark:text-zinc-400 text-base">
            Designed specifically to serve the operational needs of production
            teams and space hosts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyChooseUs.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-900/60 flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-zinc-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Who We Serve */}
      <section className="py-16 md:py-24 bg-white dark:bg-zinc-900/50 border-t border-gray-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-xs tracking-widest uppercase mb-2 block">
              OUR COMMUNITY
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
              Who We Serve
            </h2>
            <p className="text-gray-600 dark:text-zinc-400 text-base">
              Connecting diverse creative disciplines with customized space
              requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {whoWeServe.map((item, idx) => (
              <div
                key={idx}
                className="bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-sm hover:border-emerald-500/40 transition-colors"
              >
                <div className="w-14 h-14 rounded-2xl bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 flex items-center justify-center mb-6 shadow-sm">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-zinc-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Our Values */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-xs tracking-widest uppercase mb-2 block">
            CORE PRINCIPLES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Our Values
          </h2>
          <p className="text-gray-600 dark:text-zinc-400 text-base">
            Guiding how we build our software and support our ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {values.map((val, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 text-center shadow-sm"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 font-bold text-sm flex items-center justify-center mx-auto mb-4">
                0{idx + 1}
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {val.title}
              </h3>
              <p className="text-gray-600 dark:text-zinc-400 text-xs leading-relaxed">
                {val.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Final CTA */}
      <section className="py-16 md:py-20 bg-zinc-900 text-white border-t border-zinc-800 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            Let's Create Something{" "}
            <span className="text-emerald-400">Amazing Together</span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Discover creative workspaces built for your next project, or list
            your studio space to join our growing network.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/explore"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-base transition-all duration-200 shadow-lg shadow-emerald-600/30 text-center"
            >
              Explore Studios
            </Link>
            <Link
              href="/how-it-works"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold text-base border border-zinc-700 transition-all duration-200 text-center"
            >
              Learn How It Works
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
