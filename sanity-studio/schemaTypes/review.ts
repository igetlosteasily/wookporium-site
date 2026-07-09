import { defineType, defineField } from 'sanity'

/**
 * Review Schema
 * Manually added customer reviews/testimonials
 * Can be linked to specific products or stand-alone
 */

export default defineType({
  name: 'review',
  title: 'Customer Reviews',
  type: 'document',
  icon: () => '⭐',
  
  fields: [
    // Review Content
    defineField({
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    
    defineField({
      name: 'reviewText',
      title: 'Review',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(5).integer(),
      description: 'Star rating from 1-5',
      initialValue: 5,
      options: {
        list: [
          { title: '⭐ 1 Star', value: 1 },
          { title: '⭐⭐ 2 Stars', value: 2 },
          { title: '⭐⭐⭐ 3 Stars', value: 3 },
          { title: '⭐⭐⭐⭐ 4 Stars', value: 4 },
          { title: '⭐⭐⭐⭐⭐ 5 Stars', value: 5 },
        ],
      },
    }),
    
    // Optional Product Link
    defineField({
      name: 'product',
      title: 'Related Product',
      type: 'reference',
      to: [{ type: 'product' }],
      description: 'Optional: Link this review to a specific product',
    }),
    
    // Optional Customer Photo
    defineField({
      name: 'customerPhoto',
      title: 'Customer Photo',
      type: 'image',
      description: 'Optional: Photo of customer wearing/using the product',
      options: {
        hotspot: true,
      },
    }),
    
    // Metadata
    defineField({
      name: 'reviewDate',
      title: 'Review Date',
      type: 'date',
      initialValue: new Date().toISOString().split('T')[0],
    }),
    
    defineField({
      name: 'featured',
      title: 'Featured Review',
      type: 'boolean',
      initialValue: false,
      description: 'Check to display on homepage',
    }),
    
    defineField({
      name: 'verified',
      title: 'Verified Purchase',
      type: 'boolean',
      initialValue: true,
      description: 'Was this a verified purchase?',
    }),
    
    // Festival/Event Context
    defineField({
      name: 'festivalContext',
      title: 'Festival/Event',
      type: 'string',
      description: 'Optional: Which festival was this worn to? (e.g., "Electric Forest 2024")',
    }),
  ],
  
  preview: {
    select: {
      title: 'customerName',
      subtitle: 'reviewText',
      rating: 'rating',
      media: 'customerPhoto',
      featured: 'featured',
    },
    prepare({ title, subtitle, rating, media, featured }) {
      const stars = '⭐'.repeat(rating || 0)
      return {
        title: `${featured ? '🌟 ' : ''}${title} - ${stars}`,
        subtitle: subtitle ? subtitle.substring(0, 60) + '...' : 'No review text',
        media,
      }
    },
  },
  
  orderings: [
    {
      title: 'Newest First',
      name: 'dateDesc',
      by: [{ field: 'reviewDate', direction: 'desc' }],
    },
    {
      title: 'Highest Rating',
      name: 'ratingDesc',
      by: [{ field: 'rating', direction: 'desc' }],
    },
    {
      title: 'Featured First',
      name: 'featuredFirst',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: 'reviewDate', direction: 'desc' },
      ],
    },
  ],
})
