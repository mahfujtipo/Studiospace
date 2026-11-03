// src/app/explore/loading.tsx
export default function ExploreLoading() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-8 animate-fadeIn">
      <div className="space-y-3">
        <div className="h-8 bg-gray-200 dark:bg-zinc-800 rounded-xl w-1/3 animate-pulse" />
        <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded-lg w-1/2 animate-pulse" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div
            key={n}
            className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-4 space-y-4 animate-pulse shadow-sm"
          >
            <div className="h-48 bg-gray-200 dark:bg-zinc-800 rounded-xl w-full" />

            <div className="flex justify-between items-center">
              <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-1/4" />
              <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-1/5" />
            </div>

            <div className="h-5 bg-gray-200 dark:bg-zinc-800 rounded w-3/4" />

            <div className="pt-2 border-t border-gray-100 dark:border-zinc-800 flex justify-between items-center">
              <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-1/3" />
              <div className="h-6 bg-gray-200 dark:bg-zinc-800 rounded w-1/4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
