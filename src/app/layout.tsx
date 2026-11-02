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
    <html lang="en" data-theme="light">
      <body>
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
