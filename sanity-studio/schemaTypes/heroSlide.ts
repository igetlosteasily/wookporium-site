import { defineType, defineField } from 'sanity'

/**
 * Hero Slide Schema
 * Individual slides for the homepage hero carousel
 * Business owner can create multiple slides with different images, text, and CTAs
 */

export default defineType({
  name: 'heroSlide',
  title: 'Hero Slides',
  type: 'document',
  icon: () => '🎠',
  
  fields: [
    defineField({
      name: 'title',
      title: 'Slide Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Main heading for this slide',
    }),
    
    defineField({
      name: 'subtitle',
      title: 'Slide Subtitle',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
      description: 'Supporting text below the title',
    }),
    
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
      description: 'Large, high-quality image (1920x1080 recommended)',
    }),
    
    defineField({
      name: 'primaryButton',
      title: 'Primary Button',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'link',
          title: 'Button Link',
          type: 'string',
          validation: (Rule) => Rule.required(),
          description: 'Internal link (e.g., /products) or external URL',
        },
      ],
      description: 'Main call-to-action button',
    }),
    
    defineField({
      name: 'secondaryButton',
      title: 'Secondary Button (Optional)',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
        },
        {
          name: 'link',
          title: 'Button Link',
          type: 'string',
          description: 'Internal link (e.g., /about) or external URL',
        },
      ],
      description: 'Optional second button (e.g., "Learn More")',
    }),
    
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
      initialValue: 0,
      description: 'Lower numbers appear first (0, 1, 2, etc.)',
    }),
    
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Uncheck to temporarily hide this slide without deleting it',
    }),
  ],
  
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'backgroundImage',
      order: 'order',
      isActive: 'isActive',
    },
    prepare({ title, subtitle, media, order, isActive }) {
      return {
        title: `${order}. ${title}`,
        subtitle: isActive ? subtitle : '⚠️ INACTIVE - ' + subtitle,
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
