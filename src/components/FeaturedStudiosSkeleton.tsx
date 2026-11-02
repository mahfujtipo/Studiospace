// components/FeaturedStudiosSkeleton.tsx

export default function FeaturedStudiosSkeleton() {
  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-zinc-950 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading Skeleton */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="h-4 w-32 bg-gray-200 dark:bg-zinc-800 rounded mx-auto mb-2" />
          <div className="h-8 w-3/4 bg-gray-200 dark:bg-zinc-800 rounded mx-auto mb-4" />
          <div className="h-4 w-1/2 bg-gray-200 dark:bg-zinc-800 rounded mx-auto" />
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 overflow-hidden shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="h-56 w-full bg-gray-200 dark:bg-zinc-800" />
                <div className="p-6">
                  <div className="h-3 w-24 bg-gray-200 dark:bg-zinc-800 rounded mb-3" />
                  <div className="h-6 w-full bg-gray-200 dark:bg-zinc-800 rounded mb-4" />
                  <div className="pt-4 border-t border-gray-100 dark:border-zinc-800 flex justify-between">
                    <div className="h-4 w-20 bg-gray-200 dark:bg-zinc-800 rounded" />
                    <div className="h-4 w-16 bg-gray-200 dark:bg-zinc-800 rounded" />
                  </div>
                </div>
              </div>
              <div className="px-6 pb-6 pt-0">
                <div className="h-10 w-full bg-gray-200 dark:bg-zinc-800 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
