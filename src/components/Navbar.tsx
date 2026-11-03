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
        <Link
          href="/"
          className={`group flex items-center gap-2.5 text-2xl font-bold tracking-tight transition-colors ${
            isTransparent ? "text-white" : "text-[#25233A]"
          }`}
        >
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-colors ${isTransparent ? "border-white/20 bg-white/10 text-white" : "border-emerald-500/20 bg-emerald-50 text-emerald-600"}`}
          >
            <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.78L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
          </div>
          <span>
            Studio<span className="text-emerald-500">Space</span>
          </span>
        </Link>

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

        <div className="hidden items-center md:flex">
          <AuthMenu isTransparent={isTransparent} />
        </div>

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

      {mobileMenuOpen && (
        <div
          className={`border-t px-6 py-6 backdrop-blur-xl md:hidden ${
            isTransparent
              ? "border-white/10 bg-gray-950/95 text-white"
              : "border-[#E8E5F0] bg-[#F8F7FF]/98 text-[#25233A] shadow-xl"
          }`}
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-5">
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

            <div className="border-t border-current/10 pt-5">
              <AuthMenu mobile onNavigate={() => setMobileMenuOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
