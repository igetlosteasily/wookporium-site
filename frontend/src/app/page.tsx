import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getHomepageData, getHeroSlides, getHomepageFeaturedCollection } from "@/lib/sanity";
import PortableText from "@/components/PortableText";
import HeroSlider from "@/components/HeroSlider";
import FeaturedCollectionParallax from "@/components/FeaturedCollectionParallax";
import MotionReveal from "@/components/MotionReveal";
import ParallaxSection from "@/components/ParallaxSection";

export const metadata: Metadata = {
  title: "Home",
};

// ISR: re-fetch Sanity content in the background at most once per 60s.
// A Studio publish shows up within this window — no rebuild required.
export const revalidate = 60;

export default async function HomePage() {
  // Fetch all homepage data from Sanity
  const [
    { business, featuredProducts, featuredReviews },
    heroSlides,
    featuredCollection,
  ] = await Promise.all([
    getHomepageData(),
    getHeroSlides(),
    getHomepageFeaturedCollection(),
  ]);

  // Fallback values for legacy static hero (if no slides exist)
  const heroTitle = business?.heroTitle || "Wookporium";
  const heroSubtitle = business?.heroSubtitle || "Handcrafted festival apparel and natural jewelry for your journey";
  const heroImageUrl = business?.heroImage?.asset?.url;

  return (
    <main className="min-h-screen">
      {/* Hero Section - Slider or Static */}
      {heroSlides.length > 0 ? (
        <HeroSlider slides={heroSlides} />
      ) : (
        // Legacy static hero (fallback if no slides in CMS)
        // NOW WITH PARALLAX!
        // Legacy static hero (fallback if no slides in CMS)
        <ParallaxSection
          backgroundImage={heroImageUrl || '/images/backgrounds/concert-hero-lasers.jpg'}
          height="min-h-[80vh]"
          overlayOpacity={0.7}
        >
          {/* Hero Content */}
          <div className="relative z-10 text-center max-w-4xl mx-auto space-y-8 py-20">
            <MotionReveal delay={0.2}>
              <h1 className="text-6xl md:text-8xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent drop-shadow-[0_0_15px_rgba(0,240,255,0.4)]">
                {heroTitle}
              </h1>
            </MotionReveal>
            <MotionReveal delay={0.4}>
              <p className="text-xl md:text-3xl text-warm-white drop-shadow-md max-w-3xl mx-auto leading-relaxed font-light">
                {heroSubtitle}
              </p>
            </MotionReveal>
            <MotionReveal delay={0.6}>
              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
                <Link
                  href="/products"
                  className="btn-primary text-lg"
                >
                  Shop Collection 🌿
                </Link>
                <Link
                  href="/about"
                  className="glass-dark px-10 py-4 rounded-full font-bold text-warm-white hover:text-primary transition-all duration-200 text-lg shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]"
                >
                  Our Story
                </Link>
              </div>
            </MotionReveal>
          </div>
        </ParallaxSection>
      )}

      {/* Homepage Introduction Section (Rich Text from CMS) */}
      {business?.homepageIntro && business.homepageIntro.length > 0 && (
        <section className="section-container max-w-4xl mx-auto">
          <PortableText
            content={business.homepageIntro}
            className="text-center"
          />
        </section>
      )}

      {/* Featured Collection Spotlight with Parallax */}
      {featuredCollection && (
        <FeaturedCollectionParallax collection={featuredCollection} />
      )}

      {/* Featured Products Section */}
      {featuredProducts.length > 0 && (
        // FEATURED PRODUCTS - NOW WITH PARALLAX BACKGROUND
        <ParallaxSection
          backgroundImage="/images/backgrounds/concert-blue-atmosphere.png"
          height="min-h-screen" // Taller for better scroll effect
          overlayOpacity={0.7} // Darker overlay for text legibility against lasers
        >
          <div className="relative z-10 py-24">
            <MotionReveal delay={0.2}>
              <div className="text-center mb-16">
                <h2 className="text-5xl md:text-6xl font-header text-primary mb-6 drop-shadow-[0_0_15px_rgba(0,240,255,0.6)] glass-dark inline-block px-8 py-2 rounded-full border border-primary/30">
                  Featured Products
                </h2>
                <p className="text-xl text-warm-white max-w-2xl mx-auto font-medium glass-dark p-4 rounded-xl inline-block mt-4 border border-white/10">
                  Handpicked favorites from our collection
                </p>
              </div>
            </MotionReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {featuredProducts.map((product, index) => (
                <MotionReveal key={product._id} delay={index * 0.2}>
                  <Link
                    href={`/products/${product.slug.current}`}
                    className="card group border-none shadow-[0_0_30px_rgba(0,0,0,0.8)] hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] transition-all duration-300 bg-surface-dark/90 backdrop-blur-md hover:-translate-y-2 border border-white/5"
                  >
                    {/* Product Image */}
                    <div className="relative aspect-[4/5] overflow-hidden">
                      {product.mainImageUrl && product.mainImageUrl.trim() !== '' ? (
                        <Image
                          src={product.mainImageUrl}
                          alt={product.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-deep-bg font-bold text-sm">
                          No Image
                        </div>
                      )}
                      {product.isOneOfAKind && (
                        <div className="absolute top-4 right-4 bg-accent/90 backdrop-blur text-deep-bg px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(176,38,255,0.8)]">
                          One of a Kind
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-6 text-left border-t border-white/10">
                      <h3 className="text-2xl font-serif font-bold text-warm-white mb-2 group-hover:text-primary transition-colors drop-shadow-md">
                        {product.title}
                      </h3>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-xl font-bold text-primary drop-shadow-[0_0_8px_rgba(0,240,255,0.5)]">
                          ${product.price}
                        </span>
                        <span className="text-xs font-bold text-secondary uppercase tracking-widest border border-secondary/50 px-2 py-1 rounded drop-shadow-[0_0_5px_rgba(255,0,170,0.5)]">
                          {product.category}
                        </span>
                      </div>
                    </div>
                  </Link>
                </MotionReveal>
              ))}
            </div>

            {/* View All Link */}
            <div className="text-center mt-16">
              <Link
                href="/products"
                className="btn-outline inline-block text-lg glass-dark"
              >
                View All Products →
              </Link>
            </div>
          </div>
        </ParallaxSection>
      )}

      {/* Reviews Section */}
      {featuredReviews.length > 0 && (
        <>
          {/* SECTION BREAK / HEADER - Solid block to separate parallax images */}
          <section className="bg-surface-dark py-20 px-4 relative z-20 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] border-t border-b border-primary/20">
            <MotionReveal delay={0.2}>
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-5xl md:text-6xl font-header text-primary drop-shadow-[0_0_10px_rgba(0,240,255,0.4)] mb-6">
                  What Festival Fam Say
                </h2>
                <p className="text-xl text-secondary drop-shadow-[0_0_8px_rgba(255,0,170,0.4)] max-w-2xl mx-auto font-bold tracking-wide">
                  Real reviews from real people
                </p>
              </div>
            </MotionReveal>
          </section>

          <section
            className="relative py-24 px-4 parallax-bg"
            style={{
              backgroundImage: 'url(/images/backgrounds/festival-crowd-lights.png)',
              backgroundAttachment: 'fixed',
              backgroundPosition: 'center',
              backgroundSize: 'cover'
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-primary/10 backdrop-blur-sm" />

            <div className="relative z-10 max-w-7xl mx-auto">
              {/* Removed internal header */}


              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredReviews.map((review, index) => (
                  <MotionReveal key={review._id} delay={index * 0.2}>
                    <div
                      className="bg-surface-dark/60 backdrop-blur-md rounded-2xl p-8 shadow-[0_0_20px_rgba(0,0,0,0.6)] border border-white/10 hover:border-accent/50 hover:shadow-[0_0_20px_rgba(176,38,255,0.3)] hover:transform hover:-translate-y-2 transition-all duration-300 h-full flex flex-col"
                    >
                      {/* Rating Stars */}
                      <div className="flex items-center gap-1 mb-6">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span
                            key={i}
                            className={i < review.rating ? 'text-accent text-lg drop-shadow-[0_0_5px_rgba(176,38,255,0.8)]' : 'text-gray-700 text-lg'}
                          >
                            ⭐
                          </span>
                        ))}
                      </div>

                      {/* Review Text */}
                      <p className="text-warm-white mb-6 leading-relaxed italic text-lg flex-grow">
                        "{review.reviewText}"
                      </p>

                      {/* Customer Info */}
                      <div className="flex items-center gap-4 mt-auto border-t border-white/10 pt-4">
                        {review.customerPhotoUrl && review.customerPhotoUrl.trim() !== '' && (
                          <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-primary shadow-[0_0_10px_rgba(0,240,255,0.5)]">
                            <Image
                              src={review.customerPhotoUrl}
                              alt={review.customerName}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div>
                          <p className="font-bold text-warm-white text-lg drop-shadow-sm">
                            {review.customerName}
                          </p>
                          {review.festivalContext && (
                            <p className="text-sm text-primary font-bold">
                              {review.festivalContext}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </MotionReveal>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Empty State if No Content */}
      {featuredProducts.length === 0 && featuredReviews.length === 0 && (
        <section className="section-container text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-4xl font-header text-primary">
              Coming Soon ✨
            </h2>
            <p className="text-xl text-secondary">
              We're building something magical. Check back soon!
            </p>
            <Link
              href="/about"
              className="btn-primary inline-block"
            >
              Learn Our Story
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}
