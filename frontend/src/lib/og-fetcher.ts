/**
 * Open Graph Metadata Fetcher
 * Extracts OG tags from external URLs to enrich collection pages
 * Uses server-side fetching with proper error handling
 */

interface OpenGraphData {
  title?: string
  description?: string
  image?: string
  siteName?: string
}

/**
 * Fetch Open Graph metadata from a URL
 * Extracts og:title, og:description, og:image, og:site_name
 * 
 * @param url - Full URL to fetch metadata from
 * @returns OpenGraphData object or null on error
 */
export async function fetchOpenGraphData(url: string): Promise<OpenGraphData | null> {
  try {
    // Validate URL
    if (!url || !url.startsWith('http')) {
      console.warn('Invalid URL provided to fetchOpenGraphData:', url)
      return null
    }

    // Fetch the HTML content
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; WookporiumBot/1.0; +https://wookporium.com)',
      },
      // Cache for 1 hour to avoid hammering external sites
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      console.warn(`Failed to fetch OG data from ${url}: ${response.status}`)
      return null
    }

    const html = await response.text()

    // Extract OG tags using regex (simple but effective for OG tags)
    const ogData: OpenGraphData = {}

    // Extract og:title
    const titleMatch = html.match(/<meta\s+property="og:title"\s+content="([^"]+)"/i)
    if (titleMatch) {
      ogData.title = decodeHtmlEntities(titleMatch[1])
    }

    // Extract og:description
    const descMatch = html.match(/<meta\s+property="og:description"\s+content="([^"]+)"/i)
    if (descMatch) {
      ogData.description = decodeHtmlEntities(descMatch[1])
    }

    // Extract og:image
    const imageMatch = html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/i)
    if (imageMatch) {
      ogData.image = imageMatch[1]
    }

    // Extract og:site_name
    const siteMatch = html.match(/<meta\s+property="og:site_name"\s+content="([^"]+)"/i)
    if (siteMatch) {
      ogData.siteName = decodeHtmlEntities(siteMatch[1])
    }

    // Fallback: If no og:title, try standard title tag
    if (!ogData.title) {
      const standardTitleMatch = html.match(/<title>([^<]+)<\/title>/i)
      if (standardTitleMatch) {
        ogData.title = decodeHtmlEntities(standardTitleMatch[1])
      }
    }

    // Fallback: If no og:description, try meta description
    if (!ogData.description) {
      const metaDescMatch = html.match(/<meta\s+name="description"\s+content="([^"]+)"/i)
      if (metaDescMatch) {
        ogData.description = decodeHtmlEntities(metaDescMatch[1])
      }
    }

    // Return null if no useful data was found
    if (!ogData.title && !ogData.description && !ogData.image) {
      console.warn('No OG data found at URL:', url)
      return null
    }

    return ogData
  } catch (error) {
    console.error('Error fetching Open Graph data:', error)
    return null
  }
}

/**
 * Decode HTML entities in text
 * Handles common entities like &amp;, &quot;, &#39;, etc.
 */
function decodeHtmlEntities(text: string): string {
  const entities: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&apos;': "'",
    '&#x27;': "'",
    '&#x2F;': '/',
    '&nbsp;': ' ',
  }

  return text.replace(/&[#\w]+;/g, (entity) => entities[entity] || entity)
}
