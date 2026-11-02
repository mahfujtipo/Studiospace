import Categories from "@/components/Categories";
import FeaturedStudios from "@/components/FeaturedStudios";
import FeaturedStudiosSkeleton from "@/components/FeaturedStudiosSkeleton";
import HeroBanner from "@/components/HeroBanner";
import HowItWorks from "@/components/HowItWorks";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="relative">
      <HeroBanner />
      <Suspense fallback={<FeaturedStudiosSkeleton />}>
        <FeaturedStudios />
      </Suspense>
      <Categories />
      <HowItWorks />
    </main>
  );
}
