import { defineType, defineField } from 'sanity'

/**
 * Product Schema
 * Streamlined product management with category dropdown
 * Supports both one-of-a-kind pieces and variants
 */

export default defineType({
  name: 'product',
  title: 'Products',
  type: 'document',
  icon: () => '✨',
  
  fields: [
    // Basic Info
    defineField({
      name: 'title',
      title: 'Product Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      description: 'Auto-generated from product name',
    }),
    
    defineField({
      name: 'description',
      title: 'Product Description',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    
    // Pricing & Inventory
    defineField({
      name: 'price',
      title: 'Price (USD)',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    }),
    
    defineField({
      name: 'compareAtPrice',
      title: 'Compare At Price (Original Price)',
      type: 'number',
      description: 'Optional: Show a sale/discount',
    }),
    
    defineField({
      name: 'inventory',
      title: 'Inventory Count',
      type: 'number',
      initialValue: 1,
      validation: (Rule) => Rule.integer().min(0),
    }),
    
    defineField({
      name: 'isAvailable',
      title: 'Available for Purchase',
      type: 'boolean',
      initialValue: true,
      description: 'Uncheck to hide from store',
    }),
    
    // Images
    defineField({
      name: 'mainImage',
      title: 'Main Product Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    
    defineField({
      name: 'gallery',
      title: 'Image Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
      description: 'Additional product images',
    }),
    
    // Categorization
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Tops', value: 'tops' },
          { title: 'Bottoms', value: 'bottoms' },
          { title: 'Outerwear', value: 'outerwear' },
          { title: 'Headwear', value: 'headwear' },
          { title: 'Jewelry', value: 'jewelry' },
          { title: 'Accessories', value: 'accessories' },
          { title: 'Knick-knacks', value: 'knick-knacks' },
        ],
      },
      validation: (Rule) => Rule.required(),
      description: 'Select which collection this belongs to',
    }),
    
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      description: 'Add tags like "crochet", "hand-dyed", "one-of-a-kind"',
    }),
    
    // Festival Attribution
    defineField({
      name: 'festivalAttribution',
      title: 'Festival Attribution',
      type: 'string',
      description: 'Optional: Which festival inspired this (e.g., "Electric Forest 2024")',
    }),
    
    // Featured & Special Flags
    defineField({
      name: 'featured',
      title: 'Featured Product',
      type: 'boolean',
      initialValue: false,
      description: 'Check to display on homepage featured section',
    }),
    
    defineField({
      name: 'isOneOfAKind',
      title: 'One-of-a-Kind Piece',
      type: 'boolean',
      initialValue: false,
      description: 'Check if this is a unique, non-reproducible item',
    }),
    
    // Product Details
    defineField({
      name: 'materials',
      title: 'Materials',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Materials used (e.g., "cotton", "wool", "recycled yarn")',
    }),
    
    defineField({
      name: 'careInstructions',
      title: 'Care Instructions',
      type: 'text',
      rows: 3,
      description: 'How to care for this item',
    }),
    
    defineField({
      name: 'weight',
      title: 'Weight (oz)',
      type: 'number',
      description: 'Weight in ounces for shipping calculations',
    }),
    
    // Variants (Optional)
    defineField({
      name: 'hasVariants',
      title: 'This Product Has Variants',
      type: 'boolean',
      initialValue: false,
      description: 'Check if this product comes in multiple sizes/colors/etc',
    }),
    
    defineField({
      name: 'variants',
      title: 'Product Variants',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'variantName',
              title: 'Variant Name',
              type: 'string',
              description: 'E.g., "Small - Blue" or "Large - Red"',
            },
            {
              name: 'sku',
              title: 'SKU',
              type: 'string',
              description: 'Unique identifier for this variant',
            },
            {
              name: 'priceAdjustment',
              title: 'Price Adjustment',
              type: 'number',
              description: 'Add to base price (e.g., +5 for Large)',
              initialValue: 0,
            },
            {
              name: 'inventory',
              title: 'Variant Inventory',
              type: 'number',
              validation: (Rule) => Rule.integer().min(0),
            },
            {
              name: 'variantImage',
              title: 'Variant Image',
              type: 'image',
              description: 'Optional: Image specific to this variant',
              options: {
                hotspot: true,
              },
            },
          ],
          preview: {
            select: {
              title: 'variantName',
              media: 'variantImage',
            },
          },
        },
      ],
      hidden: ({ document }: any) => !document?.hasVariants,
      description: 'Add different versions of this product',
    }),
    
    // SEO
    defineField({
      name: 'seoTitle',
      title: 'SEO Title Override',
      type: 'string',
      description: 'Optional: Custom title for search engines',
    }),
    
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(160),
      description: 'Optional: Custom description for search engines (max 160 chars)',
    }),
  ],
  
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'mainImage',
      featured: 'featured',
      available: 'isAvailable',
    },
    prepare({ title, subtitle, media, featured, available }) {
      return {
        title: `${featured ? '⭐ ' : ''}${title}${!available ? ' (Unavailable)' : ''}`,
        subtitle: subtitle ? subtitle.toUpperCase() : 'Uncategorized',
        media,
      }
    },
  },
  
  orderings: [
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
    {
      title: 'Price Low-High',
      name: 'priceAsc',
      by: [{ field: 'price', direction: 'asc' }],
    },
    {
      title: 'Price High-Low',
      name: 'priceDesc',
      by: [{ field: 'price', direction: 'desc' }],
    },
    {
      title: 'Featured First',
      name: 'featuredFirst',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: 'title', direction: 'asc' },
      ],
    },
  ],
})
