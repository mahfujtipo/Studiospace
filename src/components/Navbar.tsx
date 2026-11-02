"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import AuthMenu from "./AuthMenu";

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
          : "border-[#E8E5F0]/80 bg-[#F8F7FF]/95 text-[#25233A] shadow-sm backdrop-blur-xl"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className={`group text-2xl font-bold tracking-tight transition-colors ${
            isTransparent ? "text-white" : "text-[#25233A]"
          }`}
        >
          Studio<span className="text-emerald-500">Space</span>
          <span className="ml-1 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 transition-transform group-hover:scale-150" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 rounded-full border border-current/10 bg-current/[0.03] p-1 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2.5 text-[13px] font-medium transition-all duration-200 ${
                  isTransparent
                    ? isActive
                      ? "bg-white/20 text-white"
                      : "text-white/75 hover:bg-white/10 hover:text-white"
                    : isActive
                      ? "bg-emerald-50 font-semibold text-emerald-700 shadow-sm"
                      : "text-[#625F72] hover:bg-white hover:text-emerald-600"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Desktop Authentication */}
        <div className="hidden items-center md:flex">
          <AuthMenu isTransparent={isTransparent} />
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`flex h-11 w-11 items-center justify-center rounded-xl text-2xl transition-colors md:hidden ${
            isTransparent
              ? "text-white hover:bg-white/10"
              : "text-[#25233A] hover:bg-gray-100"
          }`}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className={`border-t px-6 py-6 backdrop-blur-xl md:hidden ${
            isTransparent
              ? "border-white/10 bg-gray-950/95 text-white"
              : "border-[#E8E5F0] bg-[#F8F7FF]/98 text-[#25233A] shadow-xl"
          }`}
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-5">
            {/* Mobile Navigation Links */}
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-emerald-500/10 text-emerald-500"
                        : "hover:bg-current/5"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Authentication */}
            <div className="border-t border-current/10 pt-5">
              <AuthMenu mobile onNavigate={() => setMobileMenuOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
