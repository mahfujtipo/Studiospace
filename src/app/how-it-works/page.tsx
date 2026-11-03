// src/app/how-it-works/page.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function HowItWorksPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const creatorSteps = [
    {
      step: "01",
      title: "Discover Spaces",
      description:
        "Browse different creative spaces and filter by category, location, and hourly price to find what fits your project best.",
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
      step: "02",
      title: "Explore Details",
      description:
        "View studio images, full descriptions, listed amenities, guest capacity, precise location, and hourly rates before deciding.",
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
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      ),
    },
    {
      step: "03",
      title: "Book Your Session",
      description:
        "Choose your preferred date and time, review the total hourly cost along with security deposits, and confirm your session.",
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
  ];

  const ownerSteps = [
    {
      step: "01",
      title: "Create Your Account",
      description:
        "Register on StudioSpace as a host to gain access to your personalized studio management dashboard.",
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
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
    {
      step: "02",
      title: "List Your Studio",
      description:
        "Add key studio information, images, location, hourly rate, security deposit, max capacity, and included equipment.",
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
            d="M12 4v16m8-8H4"
          />
        </svg>
      ),
    },
    {
      step: "03",
      title: "Manage Your Listings",
      description:
        "Effortlessly manage your studio details, review upcoming bookings, and track your active workspace performance.",
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
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      ),
    },
  ];

  const features = [
    {
      title: "Multiple Creative Spaces",
      description:
        "Explore photography studios, film stages, podcast rooms, music recording suites, and workshops in one marketplace.",
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
      title: "Easy Studio Discovery",
      description:
        "Quickly filter through listings by category or sort spaces by hourly pricing and guest capacity.",
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
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
          />
        </svg>
      ),
    },
    {
      title: "Transparent Hourly Pricing",
      description:
        "All hourly rates and required security deposits are clearly listed upfront so you can budget accurately.",
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
      title: "Detailed Studio Information",
      description:
        "Review studio specs, host details, amenities badges, and locations before submitting booking requests.",
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
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "Convenient Booking Experience",
      description:
        "Smooth flow built for fast execution, allowing creators to view availability and confirm creative slots.",
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
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
    {
      title: "Creator-Friendly Platform",
      description:
        "Built specifically for independent artists, production crews, podcasters, and workspace hosts.",
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
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
    },
  ];

  const workflowSteps = [
    { title: "Explore Studios", label: "Creator" },
    { title: "View Details", label: "Inspect Specs" },
    { title: "Select Date & Time", label: "Schedule" },
    { title: "Review Booking", label: "Pricing Breakdown" },
    { title: "Booking Complete", label: "Confirmation" },
  ];

  const faqs = [
    {
      q: "What is StudioSpace?",
      a: "StudioSpace is a creative rental marketplace connecting content creators, photographers, filmmakers, and musicians with verified studio owners offering professional spaces.",
    },
    {
      q: "How can I find a suitable studio?",
      a: "Navigate to the Explore Studios page. You can filter spaces by category (such as Photography Studio, Film Stage, Podcast Room) or sort listings by hourly price and guest capacity.",
    },
    {
      q: "What types of studios are available?",
      a: "We offer Photography Studios, Film & Video Production Stages, Podcast Rooms, Music Recording Suites, and Creative Workshops.",
    },
    {
      q: "Can I list my own studio?",
      a: "Yes! Studio owners can create an account and list their spaces by adding studio photos, hourly pricing, security deposit details, location, and available amenities.",
    },
    {
      q: "How is the studio rental price calculated?",
      a: "Pricing is based on the host's specified hourly rate multiplied by the duration of your session, plus any applicable refundable security deposits.",
    },
    {
      q: "Can I manage my studio listings?",
      a: "Yes, studio owners can log into their account dashboard to add, update, or manage their studio listings anytime.",
    },
    {
      q: "How can I view my bookings?",
      a: "Once signed into your StudioSpace account, you can access your user dashboard to view your booking requests and status updates.",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-zinc-100">
      {/* SECTION 1: HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-zinc-900 text-white">
        <div className="absolute inset-0 z-0 opacity-35">
          <Image
            src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1920&q=80"
            alt="Creative Studio Setup"
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-zinc-900/70 to-zinc-950 z-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-emerald-400 font-semibold text-xs sm:text-sm tracking-widest uppercase mb-4 bg-emerald-950/80 border border-emerald-800/80 px-4 py-1.5 rounded-full shadow-sm">
            SIMPLE. SMART. CREATIVE.
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight mb-6">
            How <span className="text-emerald-400">StudioSpace</span> Works
          </h1>
          <p className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Discovering and booking professional creative spaces made simple for
            creators, while helping studio hosts monetize their workspace
            effortlessly.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/explore"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-base transition-all duration-200 shadow-lg shadow-emerald-600/30 text-center"
            >
              Explore Studios
            </Link>
            <Link
              href="/signup"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-base border border-white/20 transition-all duration-200 backdrop-blur-md text-center"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 2: HOW IT WORKS FOR CREATORS */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-xs tracking-widest uppercase mb-2 block">
            FOR CREATORS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Find Your Perfect Creative Space
          </h2>
          <p className="text-gray-600 dark:text-zinc-400 text-base">
            Book professional production environments in three straightforward
            steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {creatorSteps.map((item, idx) => (
            <div
              key={idx}
              className="relative bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-900/60 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  {item.icon}
                </div>
                <span className="text-3xl font-extrabold text-emerald-600/20 dark:text-emerald-400/20 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {item.step}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-zinc-400 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: HOW IT WORKS FOR STUDIO OWNERS */}
      <section className="py-16 md:py-24 bg-white dark:bg-zinc-900/50 border-y border-gray-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-xs tracking-widest uppercase mb-2 block">
              FOR HOSTS & OWNERS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
              Turn Your Creative Space Into an Opportunity
            </h2>
            <p className="text-gray-600 dark:text-zinc-400 text-base">
              Showcase your studio equipment and receive bookings from local
              artists and production crews.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ownerSteps.map((item, idx) => (
              <div
                key={idx}
                className="bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-900/60 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    {item.icon}
                  </div>
                  <span className="text-3xl font-extrabold text-emerald-600/20 dark:text-emerald-400/20 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
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

      {/* SECTION 4: WHY STUDIOSPACE? */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-xs tracking-widest uppercase mb-2 block">
            THE STUDIOSPACE EXPERIENCE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Everything You Need in One Place
          </h2>
          <p className="text-gray-600 dark:text-zinc-400 text-base">
            Comprehensive tools for artists, producers, and workspace hosts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-900/60 flex items-center justify-center mb-6">
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

      {/* SECTION 5: PLATFORM WORKFLOW */}
      <section className="py-16 md:py-24 bg-white dark:bg-zinc-900/50 border-t border-gray-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-xs tracking-widest uppercase mb-2 block">
              BOOKING PIPELINE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
              Platform Workflow
            </h2>
            <p className="text-gray-600 dark:text-zinc-400 text-base">
              How a project moves from initial discovery to session
              confirmation.
            </p>
          </div>

          {/* Responsive Workflow Display */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 relative">
            {workflowSteps.map((step, idx) => (
              <div
                key={idx}
                className="flex flex-col lg:flex-row items-center w-full lg:w-auto"
              >
                <div className="bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 text-center w-full lg:w-52 shadow-sm">
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block mb-1">
                    {step.label}
                  </span>
                  <h4 className="text-base font-bold text-gray-900 dark:text-white">
                    {step.title}
                  </h4>
                </div>

                {/* Arrow Connector */}
                {idx < workflowSteps.length - 1 && (
                  <div className="my-3 lg:my-0 lg:mx-3 text-emerald-600 dark:text-emerald-400 shrink-0">
                    <svg
                      className="w-6 h-6 rotate-90 lg:rotate-0"
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
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: FREQUENTLY ASKED QUESTIONS */}
      <section className="py-16 md:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-xs tracking-widest uppercase mb-2 block">
            GOT QUESTIONS?
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 dark:text-zinc-400 text-base">
            Find quick answers regarding our marketplace operations and booking
            details.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-5 text-left font-bold text-gray-900 dark:text-white flex justify-between items-center gap-4 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  <span className="text-base sm:text-lg">{faq.q}</span>
                  <span className="text-emerald-600 dark:text-emerald-400 shrink-0 text-xl font-extrabold">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-0 text-gray-600 dark:text-zinc-400 text-sm leading-relaxed border-t border-gray-100 dark:border-zinc-800/60 mt-2 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 7: FINAL CALL TO ACTION */}
      <section className="py-16 md:py-20 bg-zinc-900 text-white border-t border-zinc-800 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            Your Next Creative Project{" "}
            <span className="text-emerald-400">Starts Here</span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Discover inspiring spaces, connect with creative opportunities, and
            bring your ideas to life with StudioSpace.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/explore"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-base transition-all duration-200 shadow-lg shadow-emerald-600/30 text-center"
            >
              Explore Studios
            </Link>
            <Link
              href="/signup"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold text-base border border-zinc-700 transition-all duration-200 text-center"
            >
              Create an Account
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
