import { getCompleteHomepageData } from '@/lib/sanity'
import Link from 'next/link'
import Image from 'next/image'
import CartTrigger from '@/components/CartTrigger'
import DynamicLogo from '@/components/DynamicLogo'
import FontProvider from '@/components/FontProvider'
import ThemeProvider from '@/components/ThemeProvider'
import MobileNav from '@/components/MobileNav'
import FeaturedProducts from '@/components/FeaturedProducts'
import HeroCarousel from '@/components/HeroCarousel'

interface Product {
  _id: string
  title: string
  slug: { current: string }
  shortDescription: string
  price: number
  mainImageUrl: string
  tags: string[]
  festivalAttribution?: string
}

interface BrandSettings {
  logoUrl?: string
  logoText?: string
  logoIcon?: string
  primaryColor?: string
  secondaryColor?: string
  backgroundColor?: string
  sectionBackgroundColor?: string
  heroTitle?: string
  heroSubtitle?: string
  heroBackgroundImageUrl?: string
  heroImages?: Array<{ url: string; alt?: string }>
  themeStyle?: string
  buttonStyle?: string
  headerFont?: string
  bodyFont?: string
  fontWeightStyle?: string
  featuredProducts?: Product[]
}

interface HomepageContent {
  valuesSectionTitle?: string
  values?: Array<{
    emoji: string
    title: string
    description: string
  }>
  collectionsSectionTitle?: string
  collections?: Array<{
    emoji: string
    title: string
    description: string
    linkUrl: string
  }>
  primaryButtonText?: string
  primaryButtonUrl?: string
  secondaryButtonText?: string
  secondaryButtonUrl?: string
  footerDescription?: string
}

interface CompleteHomepageData {
  brandSettings: BrandSettings | null
  homepageContent: HomepageContent | null
  featuredProducts: Product[]
  newArrivals: Product[]
}

export default async function HomePage() {
  // Get all homepage data from CMS
  const data: CompleteHomepageData = await getCompleteHomepageData()
  const { brandSettings, homepageContent, featuredProducts, newArrivals } = data

  // Fallback values
  const heroTitle = brandSettings?.heroTitle || 'Wookporium'
  const heroSubtitle = brandSettings?.heroSubtitle || 'Handcrafted festival apparel, natural jewelry, and unique accessories for your journey'
  const primaryButtonText = homepageContent?.primaryButtonText || 'Shop All Products ✨'
  const primaryButtonUrl = homepageContent?.primaryButtonUrl || '/products/'
  const secondaryButtonText = homepageContent?.secondaryButtonText || 'Handmade Jewelry'
  const secondaryButtonUrl = homepageContent?.secondaryButtonUrl || '/collections/jewelry'

  // Dynamic styling
  const primaryColor = brandSettings?.primaryColor || '#111827'
  const secondaryColor = brandSettings?.secondaryColor || '#6b7280'
  const backgroundColor = brandSettings?.backgroundColor || '#ffffff'
  const sectionBackgroundColor = brandSettings?.sectionBackgroundColor || '#f8fafc'

  // Prepare hero images for carousel
  const heroImages = brandSettings?.heroImages && brandSettings.heroImages.length > 0
    ? brandSettings.heroImages.map(img => img.url)
    : []

  return (
    <ThemeProvider 
      themeStyle={brandSettings?.themeStyle}
      primaryColor={primaryColor}
      secondaryColor={secondaryColor}
      backgroundColor={backgroundColor}
      sectionBackgroundColor={sectionBackgroundColor}
    >
      <FontProvider 
        headerFont={brandSettings?.headerFont}
        bodyFont={brandSettings?.bodyFont}
        fontWeightStyle={brandSettings?.fontWeightStyle}
      >
        {/* FIXED: Remove inline backgroundColor styles, let theme system handle it */}
        <div className="min-h-screen themed-page">
          {/* Navigation Bar - THEME RESPONSIVE */}
          <nav className="sticky top-0 z-50 border-b border-gray-200 shadow-sm themed-nav">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between h-16">
                {/* Dynamic Logo */}
                <DynamicLogo brandSettings={brandSettings} />

                {/* Desktop Navigation Links */}
                <div className="hidden md:flex items-center space-x-8">
                  <Link href="/collections/tops" className="themed-nav-link">
                    Tops
                  </Link>
                  <Link href="/collections/bottoms" className="themed-nav-link">
                    Bottoms
                  </Link>
                  <Link href="/collections/outerwear" className="themed-nav-link">
                    Outerwear
                  </Link>
                  <Link href="/collections/jewelry" className="themed-nav-link">
                    Jewelry
                  </Link>
                  <Link href="/collections/apparel" className="themed-nav-link">
                    Apparel
                  </Link>
                  <Link href="/collections/knick-knacks" className="themed-nav-link">
                    Knick-knacks
                  </Link>
                  <Link href="/links" className="themed-nav-link">
                    Links
                  </Link>
                  <Link href="/about" className="themed-nav-link">
                    About Us
                  </Link>
                </div>

                {/* Mobile + Desktop Cart/Menu */}
                <div className="flex items-center gap-4">
                  {/* Desktop Cart */}
                  <CartTrigger 
                    className="hidden md:block themed-button-primary"
                    style={{ 
                      backgroundColor: primaryColor,
                      color: '#ffffff'
                    }}
                  />
                  
                  {/* Mobile Cart */}
                  <CartTrigger 
                    className="md:hidden themed-button-primary"
                    style={{ 
                      backgroundColor: primaryColor,
                      color: '#ffffff'
                    }}
                  />
                  
                  {/* Mobile Navigation */}
                  <MobileNav brandSettings={brandSettings} />
                </div>
              </div>
            </div>
          </nav>

          {/* Hero Section with Carousel */}
          <HeroCarousel
            images={heroImages}
            fallbackImage={brandSettings?.heroBackgroundImageUrl}
            autoAdvance={true}
            intervalMs={5000}
            className="themed-hero"
          >
            <div className="container mx-auto text-center">
              <h1 
                className="text-6xl md:text-7xl mb-6 themed-heading text-white"
                style={{ 
                  fontFamily: 'var(--font-header)',
                  fontWeight: 'var(--font-weight-bold)',
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
                }}
              >
                {heroTitle}
              </h1>
              <p 
                className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto leading-relaxed"
                style={{ 
                  fontFamily: 'var(--font-body)',
                  fontWeight: 'var(--font-weight-normal)',
                  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
                }}
              >
                {heroSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href={primaryButtonUrl}
                  className="text-white py-4 px-8 transition-all transform themed-button-primary"
                  style={{ 
                    backgroundColor: primaryColor,
                    fontFamily: 'var(--font-body)',
                    fontWeight: 'var(--font-weight-semibold)',
                    borderRadius: 'var(--theme-button-radius)',
                    boxShadow: 'var(--theme-button-shadow)',
                    transitionDuration: 'var(--theme-animation-speed)'
                  }}
                >
                  {primaryButtonText}
                </Link>
                <Link 
                  href={secondaryButtonUrl}
                  className="border-2 text-white hover:bg-white/10 py-4 px-8 transition-all themed-button-secondary"
                  style={{ 
                    borderColor: '#ffffff',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 'var(--font-weight-semibold)',
                    borderRadius: 'var(--theme-button-radius)',
                    transitionDuration: 'var(--theme-animation-speed)'
                  }}
                >
                  {secondaryButtonText}
                </Link>
              </div>
            </div>
          </HeroCarousel>

          {/* Featured Products Section */}
          {featuredProducts.length > 0 && (
            <FeaturedProducts
              products={featuredProducts}
              title="Featured Products"
              primaryColor={primaryColor}
            />
          )}

          {/* New Arrivals Section - FIXED: Use themed class instead of inline background */}
          {newArrivals.length > 0 && (
            <section className="py-16 px-4 themed-section">
              <div className="container mx-auto">
                <div className="flex items-center justify-between mb-12">
                  <h2 
                    className="text-4xl themed-heading"
                    style={{ 
                      color: primaryColor,
                      fontFamily: 'var(--font-header)',
                      fontWeight: 'var(--font-weight-bold)'
                    }}
                  >
                    New Arrivals
                  </h2>
                  <Link 
                    href="/products/" 
                    className="themed-nav-link"
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      fontWeight: 'var(--font-weight-medium)'
                    }}
                  >
                    View All →
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {newArrivals.map((product) => (
                    <div
                      key={product._id}
                      className="overflow-hidden transition-all themed-card"
                    >
                      {product.mainImageUrl && (
                        <Link href={`/products/${product.slug.current}/`} className="aspect-square overflow-hidden block relative">
                          <Image
                            src={product.mainImageUrl}
                            alt={product.title}
                            fill
                            className="object-cover transition-transform duration-500 hover:scale-110"
                            sizes="(max-width: 768px) 50vw, 25vw"
                          />
                        </Link>
                      )}
                      
                      <div className="p-4">
                        <Link href={`/products/${product.slug.current}/`}>
                          <h3 
                            className="text-lg themed-text-primary mb-2 hover:opacity-80 transition-colors cursor-pointer line-clamp-2"
                            style={{ 
                              fontFamily: 'var(--font-body)',
                              fontWeight: 'var(--font-weight-semibold)'
                            }}
                          >
                            {product.title}
                          </h3>
                        </Link>
                        <div className="flex items-center justify-between">
                          <span 
                            className="text-xl themed-text-primary"
                            style={{ 
                              color: primaryColor,
                              fontFamily: 'var(--font-body)',
                              fontWeight: 'var(--font-weight-bold)'
                            }}
                          >
                            ${product.price}
                          </span>
                          {product.festivalAttribution && (
                            <span 
                              className="text-xs themed-text-secondary px-2 py-1 themed-badge"
                              style={{ 
                                fontFamily: 'var(--font-body)',
                                fontWeight: 'var(--font-weight-normal)',
                                borderRadius: 'var(--theme-radius)'
                              }}
                            >
                              {product.festivalAttribution}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Values Section - FIXED: Use themed classes */}
          {homepageContent?.values && homepageContent.values.length > 0 && (
            <section className="py-16 px-4 themed-section-alt">
              <div className="container mx-auto">
                <h2 
                  className="text-4xl text-center mb-12 themed-heading"
                  style={{ 
                    color: primaryColor,
                    fontFamily: 'var(--font-header)',
                    fontWeight: 'var(--font-weight-bold)'
                  }}
                >
                  {homepageContent.valuesSectionTitle || 'Our Values'}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {homepageContent.values.map((value, index) => (
                    <div 
                      key={index} 
                      className="p-6 text-center transition-all themed-card"
                    >
                      <div className="text-4xl mb-4">{value.emoji}</div>
                      <h3 
                        className="text-xl mb-3 themed-heading"
                        style={{ 
                          color: primaryColor,
                          fontFamily: 'var(--font-header)',
                          fontWeight: 'var(--font-weight-bold)'
                        }}
                      >
                        {value.title}
                      </h3>
                      <p 
                        className="themed-text-secondary"
                        style={{ 
                          fontFamily: 'var(--font-body)',
                          fontWeight: 'var(--font-weight-normal)'
                        }}
                      >
                        {value.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Featured Collections - FIXED: Use themed classes */}
          {homepageContent?.collections && homepageContent.collections.length > 0 && (
            <section className="py-16 px-4 themed-section">
              <div className="container mx-auto">
                <h2 
                  className="text-4xl text-center mb-12 themed-heading"
                  style={{ 
                    color: primaryColor,
                    fontFamily: 'var(--font-header)',
                    fontWeight: 'var(--font-weight-bold)'
                  }}
                >
                  {homepageContent.collectionsSectionTitle || 'Featured Collections'}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {homepageContent.collections.map((collection, index) => (
                    <Link key={index} href={collection.linkUrl} className="group">
                      <div className="p-8 text-center transition-all border themed-collection-card">
                        <div className="text-4xl mb-4">{collection.emoji}</div>
                        <h3 
                          className="text-2xl mb-3 themed-heading"
                          style={{ 
                            color: primaryColor,
                            fontFamily: 'var(--font-header)',
                            fontWeight: 'var(--font-weight-bold)'
                          }}
                        >
                          {collection.title}
                        </h3>
                        <p 
                          className="themed-text-secondary mb-4"
                          style={{ 
                            fontFamily: 'var(--font-body)',
                            fontWeight: 'var(--font-weight-normal)'
                          }}
                        >
                          {collection.description}
                        </p>
                        <span 
                          className="group-hover:opacity-80 transition-opacity themed-text-accent"
                          style={{ 
                            color: secondaryColor,
                            fontFamily: 'var(--font-body)',
                            fontWeight: 'var(--font-weight-medium)'
                          }}
                        >
                          Shop Collection →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>
      </FontProvider>
    </ThemeProvider>
  )
}