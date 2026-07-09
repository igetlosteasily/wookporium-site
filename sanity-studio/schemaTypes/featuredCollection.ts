import { defineType, defineField } from 'sanity'

/**
 * Featured Collection Schema
 * Festival or seasonal collections with automatic product filtering
 * Enriched with Open Graph data from official event pages
 */

export default defineType({
  name: 'featuredCollection',
  title: 'Featured Collections',
  type: 'document',
  icon: () => '🎪',
  
  fields: [
    // Basic Info
    defineField({
      name: 'name',
      title: 'Collection Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'e.g., "Hulaween 2025" or "Autumn Vibes"',
    }),
    
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    
    defineField({
      name: 'festivalTag',
      title: 'Festival Tag',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Must match product "Festival Attribution" exactly (e.g., "Hulaween", "Autumn")',
      placeholder: 'Hulaween',
    }),
    
    // Content
    defineField({
      name: 'curatorsNote',
      title: "Marina's Note",
      type: 'array',
      of: [{ type: 'block' }],
      description: "Marina's personal introduction to the collection",
      validation: (Rule) => Rule.required(),
    }),
    
    defineField({
      name: 'vibeDescription',
      title: 'Vibe Description',
      type: 'string',
      validation: (Rule) => Rule.max(100),
      description: 'Short vibe description (e.g., "Psychedelic forest magic")',
      placeholder: 'Psychedelic forest magic',
    }),
    
    // Festival Information
    defineField({
      name: 'officialUrl',
      title: 'Official Event/Festival URL',
      type: 'url',
      description: 'We will automatically fetch the logo and description from this page',
    }),
    
    defineField({
      name: 'eventStartDate',
      title: 'Event Start Date',
      type: 'datetime',
      description: 'Shows countdown timer if set',
    }),
    
    defineField({
      name: 'eventEndDate',
      title: 'Event End Date',
      type: 'datetime',
      description: 'Optional - for multi-day events',
    }),
    
    // Images
    defineField({
      name: 'customHeroImage',
      title: 'Custom Hero Image (Optional)',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Override the auto-fetched festival image with your own',
    }),
    
    // Marina's Picks
    defineField({
      name: 'marinasPicks',
      title: "Marina's Picks",
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'product' }],
        },
      ],
      validation: (Rule) => Rule.max(6),
      description: 'Highlight 3-6 favorite pieces from this collection',
    }),
    
    // Festival Tips
    defineField({
      name: 'festivalTips',
      title: 'Festival Tips & Essentials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'tip',
              title: 'Tip',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'icon',
              title: 'Icon Emoji',
              type: 'string',
              validation: (Rule) => Rule.max(2),
              description: 'Single emoji (e.g., 🎒, 💧, 🔦)',
            },
          ],
          preview: {
            select: {
              title: 'tip',
              subtitle: 'icon',
            },
          },
        },
      ],
      description: 'Packing tips, survival advice, etc.',
    }),
    
    // Social
    defineField({
      name: 'hashtags',
      title: 'Hashtag Suggestions',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Suggested hashtags (without #)',
      placeholder: 'Hulaween2025',
    }),
    
    // Theme Colors (Optional)
    defineField({
      name: 'themeColor',
      title: 'Theme Color (Optional)',
      type: 'color',
      description: 'Custom accent color for this collection',
    }),
    
    // Settings
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Show this collection on the site',
    }),
    
    defineField({
      name: 'isFeatured',
      title: 'Featured on Homepage',
      type: 'boolean',
      initialValue: false,
      description: 'Show this collection in the homepage featured section',
    }),
    
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
      initialValue: 0,
      description: 'Lower numbers appear first',
    }),
    
    // SEO
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'Custom title for search engines',
    }),
    
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.max(160),
      description: 'Custom description for search engines (max 160 chars)',
    }),
  ],
  
  preview: {
    select: {
      title: 'name',
      subtitle: 'festivalTag',
      media: 'customHeroImage',
      isActive: 'isActive',
      isFeatured: 'isFeatured',
      order: 'order',
    },
    prepare({ title, subtitle, media, isActive, isFeatured, order }) {
      return {
        title: `${order}. ${title}`,
        subtitle: `${subtitle} ${!isActive ? '⚠️ INACTIVE' : ''} ${isFeatured ? '⭐ FEATURED' : ''}`,
        media,
      }
    },
  },
  
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
