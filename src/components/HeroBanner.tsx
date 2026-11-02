"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2400&q=85",
    subtitle: "YOUR CREATIVE SPACE STARTS HERE",
    title: "Where Creativity Meets Its Perfect Space.",
    description:
      "Discover inspiring photography studios, professional recording rooms, and creative production spaces designed to bring your ideas to life.",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=2400&q=85", // Professional recording & studio equipment setup
    subtitle: "YOUR VISION, OUR SPACE",
    title: "Every Great Idea Deserves the Perfect Space.",
    description:
      "Bring your creative vision to life in inspiring spaces built for photography, filmmaking, podcasts, and unforgettable projects.",
  },

  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1782274265689-4f10a91d4abb?auto=format&fit=crop&w=2400&q=85",
    subtitle: "LIST YOUR STUDIO AND EARN",
    title: "Turn Your Creative Space Into a Source of Income.",
    description:
      "Own a photography studio, recording room, or podcast space? List it on StudioSpace, connect with creators, and earn by renting out your space.",
  },
];

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const activeSlide = slides[currentSlide];

  const changeSlide = (index: number) => {
    setCurrentSlide((index + slides.length) % slides.length);
    setAnimationKey((previous) => previous + 1);
  };

  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setCurrentSlide((previous) => (previous + 1) % slides.length);
      setAnimationKey((previous) => previous + 1);
    }, 6000);

    return () => clearInterval(interval);
  }, [paused]);

  return (
    <section
      className="relative z-0 flex min-h-[620px] w-full items-center overflow-hidden bg-gray-950 sm:min-h-[700px] lg:min-h-[760px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="StudioSpace featured studios"
    >
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
            currentSlide === index ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
        >
          {/* Blurred Background */}
          <div
            className="absolute inset-0 scale-110 bg-cover bg-center blur-2xl"
            style={{ backgroundImage: `url('${slide.image}')` }}
          />

          {/* Complete Image */}
          <img
            src={slide.image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </div>
      ))}

      {/* Background Overlays */}
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/10" />

      {/* Hero Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-40 pb-32 sm:px-8 sm:pt-44 sm:pb-36 lg:px-10">
        <div key={animationKey} className="max-w-3xl">
          <p className="hero-subtitle mb-4 text-[10px] font-bold tracking-[0.25em] text-emerald-400 sm:mb-5 sm:text-xs sm:tracking-[0.3em] md:text-sm">
            {activeSlide.subtitle}
          </p>

          <h1 className="hero-heading text-3xl leading-[1.2] font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            {activeSlide.title}
          </h1>

          <p className="hero-description mt-5 max-w-2xl text-sm leading-7 text-gray-200 sm:mt-7 sm:text-base sm:leading-8 md:text-lg">
            {activeSlide.description}
          </p>

          <div className="hero-buttons mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <Link
              href="/explore"
              className="w-full rounded-full bg-emerald-500 px-7 py-3.5 text-center text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-600 sm:w-auto sm:px-8 sm:py-4 sm:text-base"
            >
              Explore Studios →
            </Link>

            <Link
              href="/login"
              className="w-full rounded-full border border-white/70 bg-white/10 px-7 py-3.5 text-center text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-gray-900 sm:w-auto sm:px-8 sm:py-4 sm:text-base"
            >
              Become a Host ↗
            </Link>
          </div>
        </div>
      </div>

      {/* Previous Button */}
      <button
        type="button"
        onClick={() => changeSlide(currentSlide - 1)}
        aria-label="Previous slide"
        className="absolute top-1/2 left-3 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/30 text-2xl text-white backdrop-blur-md transition hover:bg-emerald-500 sm:flex sm:left-5 lg:left-8"
      >
        ‹
      </button>

      {/* Next Button */}
      <button
        type="button"
        onClick={() => changeSlide(currentSlide + 1)}
        aria-label="Next slide"
        className="absolute top-1/2 right-3 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/30 text-2xl text-white backdrop-blur-md transition hover:bg-emerald-500 sm:flex sm:right-5 lg:right-8"
      >
        ›
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 sm:bottom-10">
        {slides.map((slide, index) => (
          <button
            type="button"
            key={slide.id}
            onClick={() => changeSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={currentSlide === index}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? "w-10 bg-emerald-400"
                : "w-2.5 bg-white/60 hover:bg-white"
            }`}
          />
        ))}
      </div>

      <div className="absolute right-5 bottom-7 z-20 hidden text-sm font-medium tracking-widest text-white/80 sm:block lg:right-8">
        0{currentSlide + 1}{" "}
        <span className="text-white/40">/ 0{slides.length}</span>
      </div>
    </section>
  );
}
