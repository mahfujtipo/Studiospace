// src/components/Navbar.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Explore Studios", href: "/explore" },
  { name: "How It Works", href: "/how-it-works" },
  { name: "About Us", href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isHomePage = pathname === "/";
  const isTransparent = isHomePage && !isScrolled && !mobileMenuOpen;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed left-0 top-0 z-50 w-full border-b transition-all duration-300 ${
        isTransparent
          ? "border-white/20 bg-transparent text-white"
          : "border-[#E8E5F0] bg-[#F8F7FF] text-[#25233A] shadow-sm"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className={`text-2xl font-bold transition-colors ${
            isTransparent ? "text-white" : "text-[#25233A]"
          }`}
        >
          StudioSpace
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isTransparent
                    ? isActive
                      ? "font-semibold text-white"
                      : "text-white/80 hover:text-white"
                    : isActive
                      ? "font-semibold text-emerald-600"
                      : "text-[#625F72] hover:text-emerald-600"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Auth Buttons */}
        <div className="hidden items-center gap-4 md:flex">
          <Link
            href="/login"
            className={`text-sm font-medium transition-colors ${
              isTransparent
                ? "text-white/90 hover:text-white"
                : "text-[#25233A] hover:text-emerald-600"
            }`}
          >
            Log In
          </Link>

          {/* ডেথকটপ Sign Up লিংকটি /signup থেকে /register করা হলো */}
          <Link
            href="/register"
            className="rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-600"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`text-2xl md:hidden ${isTransparent ? "text-white" : "text-[#25233A]"}`}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          className={`border-t px-6 py-5 backdrop-blur-md md:hidden ${
            isTransparent
              ? "border-white/10 bg-gray-950/95 text-white"
              : "border-[#E8E5F0] bg-[#F8F7FF] text-[#25233A] shadow-lg"
          }`}
        >
          <div className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium transition-colors hover:opacity-75"
              >
                {link.name}
              </Link>
            ))}

            <div className="flex flex-col gap-4 border-t border-current/20 pt-5">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium transition-colors hover:opacity-75"
              >
                Log In
              </Link>

              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg bg-emerald-500 px-5 py-2.5 text-center text-sm font-semibold text-white hover:bg-emerald-600"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
