import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "StudioSpace",
  description: "Find your perfect creative space",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="bg-white dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 transition-colors">
        <Suspense
          fallback={<div className="h-20 bg-[#F8F7FF] dark:bg-zinc-950" />}
        >
          <Navbar />
        </Suspense>
        {children}
        <Footer />
      </body>
    </html>
  );
}
