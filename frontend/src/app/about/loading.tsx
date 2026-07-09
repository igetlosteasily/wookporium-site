/**
 * About Page Loading State
 * Beautiful skeleton screen while content loads
 */

export default function AboutLoading() {
  return (
    <main className="min-h-screen animate-pulse">
      {/* Hero Section Skeleton */}
      <section className="relative bg-cream-light py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Heading skeleton */}
            <div className="h-12 bg-gray-200 rounded-lg mb-6 max-w-2xl mx-auto" />
            {/* Subheading skeleton */}
            <div className="h-8 bg-gray-200 rounded-lg mb-8 max-w-3xl mx-auto" />
          </div>

          {/* Hero image skeleton */}
          <div className="mt-12 max-w-5xl mx-auto">
            <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden bg-gray-200" />
          </div>
        </div>
      </section>

      {/* Story Section Skeleton */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Content skeleton */}
              <div>
                <div className="h-10 bg-gray-200 rounded-lg mb-6 max-w-sm" />
                <div className="space-y-4">
                  <div className="h-6 bg-gray-200 rounded" />
                  <div className="h-6 bg-gray-200 rounded" />
                  <div className="h-6 bg-gray-200 rounded w-3/4" />
                </div>
              </div>

              {/* Image skeleton */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-200" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section Skeleton */}
      <section className="py-16 md:py-24 bg-cream-light">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="h-10 bg-gray-200 rounded-lg mb-12 max-w-md mx-auto" />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl p-8 shadow-md">
                  <div className="h-16 w-16 bg-gray-200 rounded-full mb-4" />
                  <div className="h-6 bg-gray-200 rounded mb-3 w-2/3" />
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded" />
                    <div className="h-4 bg-gray-200 rounded" />
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section Skeleton */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-terracotta/10 to-sage/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="h-10 bg-gray-200 rounded-lg mb-6 max-w-md mx-auto" />
            <div className="h-6 bg-gray-200 rounded mb-8 max-w-2xl mx-auto" />
            <div className="flex justify-center gap-6 mb-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-8 w-8 bg-gray-200 rounded-full" />
              ))}
            </div>
            <div className="h-12 bg-gray-200 rounded-lg max-w-xs mx-auto" />
          </div>
        </div>
      </section>
    </main>
  )
}
