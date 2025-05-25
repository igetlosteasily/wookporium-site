import { createClient } from 'next-sanity'

export const sanityClient = createClient({
  projectId: 'xuk0sjea', // Your Sanity project ID
  dataset: 'production', // Your dataset name
  useCdn: true, // Use CDN for faster loading
  apiVersion: '2023-05-03', // Current API version
})

// Helper function to get product data
export async function getProducts() {
  const query = `*[_type == "product" && isAvailable == true] {
    _id,
    title,
    slug,
    shortDescription,
    price,
    "mainImageUrl": mainImage.asset->url,
    tags,
    festivalAttribution
  }`
  
  return await sanityClient.fetch(query)
}

// Helper function to get single product
export async function getProduct(slug) {
  const query = `*[_type == "product" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    shortDescription,
    price,
    compareAtPrice,
    "mainImageUrl": mainImage.asset->url,
    "galleryImages": gallery[].asset->url,
    tags,
    festivalAttribution,
    instagramPost,
    materials,
    careInstructions,
    artistNotes,
    timeToMake,
    isOneOfAKind,
    variants,
    isAvailable
  }`
  
  return await sanityClient.fetch(query, { slug })
}