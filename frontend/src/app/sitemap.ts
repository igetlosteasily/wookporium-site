import { MetadataRoute } from 'next'
import { getProducts } from '@/lib/sanity'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://wookporium.com'

    // Fetch dynamic routes
    const products = await getProducts()
    // const collections = await getCollections() // Assuming this exists or will exist

    const productsUrls = products.map((product) => ({
        url: `${baseUrl}/products/${product.slug.current}`,
        lastModified: new Date(product._updatedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    // const collectionsUrls = collections.map((collection) => ({
    //   url: `${baseUrl}/collections/${collection.slug.current}`,
    //   lastModified: new Date(collection._updatedAt),
    //   changeFrequency: 'weekly' as const,
    //   priority: 0.7,
    // }))

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/products`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/privacy`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/terms`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.5,
        },
        ...productsUrls,
        // ...collectionsUrls,
    ]
}
