/**
 * Collection Page Loading State
 * Beautiful skeleton screen while collection content loads
 */

export default function CollectionLoading() {
  return (
    <main className="min-h-screen animate-pulse">
      {/* Hero Skeleton */}
      <section className="relative min-h-[400px] md:min-h-[500px] bg-gray-200" />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-12">
            {/* Marina's Note Skeleton */}
            <div>
              <div className="h-10 bg-gray-200 rounded-lg mb-6 max-w-md" />
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg space-y-4">
                <div className="h-6 bg-gray-200 rounded" />
                <div className="h-6 bg-gray-200 rounded" />
                <div className="h-6 bg-gray-200 rounded w-3/4" />
              </div>
            </div>

            {/* Products Skeleton */}
            <div>
              <div className="h-10 bg-gray-200 rounded-lg mb-6 max-w-sm" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md">
                    <div className="aspect-square bg-gray-200" />
                    <div className="p-4 space-y-3">
                      <div className="h-6 bg-gray-200 rounded" />
                      <div className="h-6 bg-gray-200 rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="h-8 bg-gray-200 rounded mb-4" />
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
