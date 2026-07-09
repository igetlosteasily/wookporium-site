/**
 * TypeScript Interfaces for Sanity CMS Data
 * Strict typing for all CMS content
 */

// Business Information
export interface Business {
  _id: string
  brandName: string
  tagline: string
  logo?: {
    asset: {
      url: string
    }
  }
  brandStory: string
  heroTitle: string
  heroSubtitle: string
  heroImage?: {
    asset: {
      url: string
    }
  }
  homepageIntro?: any[] // Portable Text blocks
  instagramHandle?: string
  facebookUrl?: string
  tiktokHandle?: string
  email?: string
  seoDescription?: string
  seoKeywords?: string[]
}

// Product
export interface Product {
  _id: string
  title: string
  slug: {
    current: string
  }
  description: string
  price: number
  compareAtPrice?: number
  inventory: number
  isAvailable: boolean
  mainImage: {
    asset: {
      url: string
    }
  }
  gallery?: Array<{
    asset: {
      url: string
    }
  }>
  category: string
  tags?: string[]
  festivalAttribution?: string
  featured: boolean
  isOneOfAKind: boolean
  materials?: string[]
  careInstructions?: string
  weight?: number
  hasVariants: boolean
  variants?: ProductVariant[]
  seoTitle?: string
  seoDescription?: string
}

// Product Variant
export interface ProductVariant {
  variantName: string
  sku?: string
  priceAdjustment: number
  inventory: number
  variantImage?: {
    asset: {
      url: string
    }
  }
}

// Review
export interface Review {
  _id: string
  customerName: string
  reviewText: string
  rating: number
  product?: {
    _id: string
    title: string
    slug: {
      current: string
    }
  }
  customerPhoto?: {
    asset: {
      url: string
    }
  }
  reviewDate: string
  featured: boolean
  verified: boolean
  festivalContext?: string
}

// Simplified types for list views (better performance)
export interface ProductListItem {
  _id: string
  _updatedAt: string
  title: string
  slug: {
    current: string
  }
  price: number
  mainImageUrl: string
  category: string
  featured: boolean
  isOneOfAKind: boolean
  festivalAttribution?: string
}

export interface ReviewListItem {
  _id: string
  customerName: string
  reviewText: string
  rating: number
  customerPhotoUrl?: string
  festivalContext?: string
}

// About Page
export interface AboutPage {
  _id: string
  heroHeading: string
  heroSubheading?: string
  heroImage?: {
    asset: {
      url: string
    }
  }
  storyHeading: string
  storyContent: any[] // Portable Text blocks
  storyImage?: {
    asset: {
      url: string
    }
  }
  missionHeading: string
  missionPoints?: Array<{
    icon?: string
    heading: string
    description: string
  }>
  processHeading: string
  processContent?: string
  processImages?: Array<{
    asset: {
      url: string
    }
  }>
  contactHeading: string
  contactText?: string
  showSocialLinks: boolean
  seoTitle?: string
  seoDescription?: string
}

// Hero Slide
export interface HeroSlide {
  _id: string
  title: string
  subtitle: string
  backgroundImage: {
    asset: {
      url: string
    }
  }
  primaryButton: {
    text: string
    link: string
  }
  secondaryButton?: {
    text: string
    link: string
  }
  order: number
  isActive: boolean
}

// Featured Collection
export interface FeaturedCollection {
  _id: string
  name: string
  slug: {
    current: string
  }
  festivalTag: string
  curatorsNote: any[] // Portable Text blocks
  vibeDescription?: string
  officialUrl?: string
  eventStartDate?: string
  eventEndDate?: string
  customHeroImage?: {
    asset: {
      url: string
    }
  }
  marinasPicks?: Array<{
    _id: string
    title: string
    slug: {
      current: string
    }
    price: number
    mainImage: {
      asset: {
        url: string
      }
    }
  }>
  festivalTips?: Array<{
    tip: string
    icon?: string
  }>
  hashtags?: string[]
  themeColor?: {
    hex: string
  }
  isActive: boolean
  isFeatured: boolean
  order: number
  seoTitle?: string
  seoDescription?: string
  // Enriched data (fetched from OG)
  ogData?: {
    title?: string
    description?: string
    image?: string
    siteName?: string
  }
}
