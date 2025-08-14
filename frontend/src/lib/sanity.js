import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'k3xyl4wr',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-05-03',
})

// Existing product functions
export async function getProducts() {
  return client.fetch(`*[_type == "product" && isAvailable == true] | order(_createdAt desc) {
    _id,
    title,
    slug,
    shortDescription,
    price,
    "mainImageUrl": mainImage.asset->url,
    tags,
    festivalAttribution
  }`)
}

export async function getProduct(slug) {
  return client.fetch(`*[_type == "product" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    shortDescription,
    price,
    compareAtPrice,
    inventory,
    "mainImageUrl": mainImage.asset->url,
    "galleryImages": gallery[].asset->url,
    tags,
    festivalAttribution,
    instagramPost,
    hasVariants,
    variantOptions,
    variants[] {
      sku,
      name,
      size,
      color,
      material,
      style,
      priceAdjustment,
      inventory,
      isAvailable,
      "variantImageUrl": variantImage.asset->url
    },
    materials,
    careInstructions,
    timeToMake,
    artistNotes,
    isOneOfAKind,
    isAvailable
  }`, { slug })
}

// NEW: Brand Settings functions
export async function getBrandSettings() {
  return client.fetch(`*[_type == "brandSettings"][0] {
    "logoUrl": logo.asset->url,
    logoText,
    logoIcon,
    "primaryColor": primaryColor.hex,
    "secondaryColor": secondaryColor.hex,
    "backgroundColor": backgroundColor.hex,
    "sectionBackgroundColor": sectionBackgroundColor.hex,
    heroTitle,
    heroSubtitle,
    "heroBackgroundImageUrl": heroBackgroundImage.asset->url,
    themeStyle,
    buttonStyle,
    headerFont,
    bodyFont,
    fontWeightStyle,
    featuredProducts[]-> {
      _id,
      title,
      slug,
      "mainImageUrl": mainImage.asset->url,
      price
    }
  }`)
}

// NEW: Homepage Content functions
export async function getHomepageContent() {
  return client.fetch(`*[_type == "homepageContent"][0] {
    valuesSectionTitle,
    values[] {
      emoji,
      title,
      description
    },
    collectionsSectionTitle,
    collections[] {
      emoji,
      title,
      description,
      linkUrl
    },
    primaryButtonText,
    primaryButtonUrl,
    secondaryButtonText,
    secondaryButtonUrl,
    footerDescription
  }`)
}

// Utility function to get complete homepage data
export async function getCompleteHomepageData() {
  const [brandSettings, homepageContent, products] = await Promise.all([
    getBrandSettings(),
    getHomepageContent(),
    getProducts()
  ])
  
  return {
    brandSettings,
    homepageContent,
    featuredProducts: products.slice(0, 6), // First 6 as featured
    newArrivals: products.slice(0, 4) // First 4 as new arrivals
  }
}