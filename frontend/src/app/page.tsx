import { getCompleteHomepageData } from '@/lib/sanity'
import Link from 'next/link'
import Image from 'next/image'
import CartTrigger from '@/components/CartTrigger'
import DynamicLogo from '@/components/DynamicLogo'
import FontProvider from '@/components/FontProvider'
import ThemeProvider from '@/components/ThemeProvider'
// import MobileNav from '@/components/MobileNav'

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
  const { brandSettings, homepageContent, newArrivals } = data

  // Fallback values
  const heroTitle = brandSettings?.heroTitle || 'Wookporium'
  const heroSubtitle = brandSettings?.heroSubtitle || 'Handcrafted festival apparel, natural jewelry, and unique accessories for your journey'
  const primaryButtonText = homepageContent?.primaryButtonText || 'Shop All Products ✨'
  const primaryButtonUrl = homepageContent?.primaryButtonUrl || '/products/'
  const secondaryButtonText = homepageContent?.secondaryButtonText || 'Handmade Jewelry'
  const secondaryButtonUrl = homepageContent?.secondaryButtonUrl || '/collections/jewelry'

  // Dynamic styling
  const primaryColor = brandSettings?.primaryColor || '#111827' // gray-900
  const secondaryColor = brandSettings?.secondaryColor || '#6b7280' // gray-500
  const backgroundColor = brandSettings?.backgroundColor || '#ffffff'
  const sectionBackgroundColor = brandSettings?.sectionBackgroundColor || '#f8fafc'

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
        <div className="min-h-screen" style={{ backgroundColor }}>
          {/* Navigation Bar - Fixed transparency */}
          <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between h-16">
                {/* Dynamic Logo */}
                <DynamicLogo brandSettings={brandSettings} />

                {/* Desktop Navigation Links */}
                <div className="hidden md:flex items-center space-x-8" style={{ fontFamily: 'var(--font-body)', fontWeight: 'var(--font-weight-medium)' }}>
                  <Link href="/collections/tops" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Tops
                  </Link>
                  <Link href="/collections/bottoms" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Bottoms
                  </Link>
                  <Link href="/collections/outerwear" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Outerwear
                  </Link>
                  <Link href="/collections/jewelry" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Jewelry
                  </Link>
                  <Link href="/collections/apparel" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Apparel
                  </Link>
                  <Link href="/collections/knick-knacks" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Knick-knacks
                  </Link>
                  <Link href="/links" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Links
                  </Link>
                  <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
                    About Us
                  </Link>
                </div>

                {/* Mobile + Desktop Cart/Menu */}
                <div className="flex items-center gap-4">
                  {/* Desktop Cart */}
                  <CartTrigger 
                    className="hidden md:block text-white py-2 px-4 transition-all duration-300 themed-button"
                    style={{ 
                      backgroundColor: primaryColor,
                      fontFamily: 'var(--font-body)',
                      fontWeight: 'var(--font-weight-semibold)',
                      borderRadius: 'var(--theme-button-radius)',
                      boxShadow: 'var(--theme-button-shadow)'
                    }}
                  />
                  
                  {/* Mobile Cart */}
                  <CartTrigger 
                    className="md:hidden text-white py-2 px-3 transition-all duration-300 themed-button"
                    style={{ 
                      backgroundColor: primaryColor,
                      fontFamily: 'var(--font-body)',
                      fontWeight: 'var(--font-weight-semibold)',
                      borderRadius: 'var(--theme-button-radius)',
                      boxShadow: 'var(--theme-button-shadow)'
                    }}
                  />
                  
                  {/* Mobile Navigation - Temporarily disabled */}
                  {/* <MobileNav brandSettings={brandSettings} /> */}
                </div>
              </div>
            </div>
          </nav>

          {/* Hero Section */}
          <section 
            className="relative py-20 px-4 themed-hero"
            style={{
              background: brandSettings?.heroBackgroundImageUrl 
                ? `url(${brandSettings.heroBackgroundImageUrl})` 
                : 'var(--theme-hero-gradient)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="container mx-auto text-center">
              <h1 
                className="text-6xl md:text-7xl mb-6 themed-heading"
                style={{ 
                  color: primaryColor,
                  fontFamily: 'var(--font-header)',
                  fontWeight: 'var(--font-weight-bold)'
                }}
              >
                {heroTitle}
              </h1>
              <p 
                className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
                style={{ 
                  fontFamily: 'var(--font-body)',
                  fontWeight: 'var(--font-weight-normal)'
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
                  className="border-2 text-gray-700 hover:bg-gray-50 py-4 px-8 transition-all themed-button-secondary"
                  style={{ 
                    borderColor: secondaryColor,
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
          </section>

          {/* New Arrivals Section */}
          {newArrivals.length > 0 && (
            <section className="py-16 px-4">
              <div className="container mx-auto">
                <div className="flex items-center justify-between mb-12">
                  <h2 
                    className="text-4xl"
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
                    className="text-gray-600 hover:text-gray-900 transition-colors"
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
                      style={{
                        background: 'var(--theme-card-background)',
                        borderRadius: 'var(--theme-card-radius)',
                        boxShadow: 'var(--theme-card-shadow)',
                        transitionDuration: 'var(--theme-animation-speed)'
                      }}
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
                            className="text-lg text-gray-900 mb-2 hover:text-gray-700 transition-colors cursor-pointer line-clamp-2"
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
                            className="text-xl"
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
                              className="text-xs text-gray-500 bg-gray-100 px-2 py-1"
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

          {/* Values Section - Dynamic CMS Content */}
          {homepageContent?.values && homepageContent.values.length > 0 && (
            <section 
              className="py-16 px-4 themed-section"
              style={{ backgroundColor: sectionBackgroundColor }}
            >
              <div className="container mx-auto">
                <h2 
                  className="text-4xl text-center mb-12"
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
                      style={{
                        background: 'var(--theme-card-background)',
                        borderRadius: 'var(--theme-card-radius)',
                        boxShadow: 'var(--theme-card-shadow)',
                        transitionDuration: 'var(--theme-animation-speed)'
                      }}
                    >
                      <div className="text-4xl mb-4">{value.emoji}</div>
                      <h3 
                        className="text-xl mb-3"
                        style={{ 
                          color: primaryColor,
                          fontFamily: 'var(--font-header)',
                          fontWeight: 'var(--font-weight-bold)'
                        }}
                      >
                        {value.title}
                      </h3>
                      <p 
                        className="text-gray-600"
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

          {/* Featured Collections - Dynamic CMS Content */}
          {homepageContent?.collections && homepageContent.collections.length > 0 && (
            <section className="py-16 px-4" style={{ backgroundColor }}>
              <div className="container mx-auto">
                <h2 
                  className="text-4xl text-center mb-12"
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
                      <div 
                        className="p-8 text-center transition-all border themed-collection-card"
                        style={{ 
                          background: 'var(--theme-accent-gradient)',
                          borderRadius: 'var(--theme-card-radius)',
                          borderColor: `${primaryColor}30`,
                          transitionDuration: 'var(--theme-animation-speed)'
                        }}
                      >
                        <div className="text-4xl mb-4">{collection.emoji}</div>
                        <h3 
                          className="text-2xl mb-3"
                          style={{ 
                            color: primaryColor,
                            fontFamily: 'var(--font-header)',
                            fontWeight: 'var(--font-weight-bold)'
                          }}
                        >
                          {collection.title}
                        </h3>
                        <p 
                          className="text-gray-600 mb-4"
                          style={{ 
                            fontFamily: 'var(--font-body)',
                            fontWeight: 'var(--font-weight-normal)'
                          }}
                        >
                          {collection.description}
                        </p>
                        <span 
                          className="group-hover:opacity-80 transition-opacity"
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