

import React from "react";

export interface StepItem {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const stepsData: StepItem[] = [
  {
    number: "01",
    title: "Discover a Studio",
    description:
      "Browse different creative spaces and find the perfect studio for your project.",
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
    number: "02",
    title: "Choose Your Time",
    description:
      "Select your preferred booking date, available time slot, and duration.",
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
    number: "03",
    title: "Book Your Space",
    description:
      "Confirm your booking and get ready to bring your creative ideas to life.",
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
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-zinc-950 border-t border-gray-100 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="inline-block text-emerald-600 dark:text-emerald-400 font-semibold text-sm tracking-widest uppercase mb-2">
            PROCESS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-gray-600 dark:text-zinc-400 text-base md:text-lg">
            Booking your perfect creative space is simple and easy.
          </p>
        </div>

        {/* Steps Grid (3 columns on desktop, 1 on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stepsData.map((step) => (
            <div
              key={step.number}
              className="relative group bg-white dark:bg-zinc-900 rounded-2xl p-8 border border-gray-200 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header row: Step Number & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-4xl font-extrabold text-emerald-600/20 dark:text-emerald-400/20 group-hover:text-emerald-600/40 transition-colors">
                    {step.number}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-zinc-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Bottom decorative accent line */}
              <div className="mt-8 h-1 w-12 bg-emerald-600/20 group-hover:w-full transition-all duration-500 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
