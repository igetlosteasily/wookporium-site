import { defineType, defineField } from 'sanity'

/**
 * About Page Schema
 * Single document for managing About page content
 */

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  icon: () => '✨',
  
  fields: [
    // Hero Section
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
      initialValue: 'About Wookporium',
      validation: (Rule) => Rule.required(),
    }),
    
    defineField({
      name: 'heroSubheading',
      title: 'Hero Subheading',
      type: 'text',
      rows: 2,
      initialValue: 'Handcrafted festival fashion made with love',
    }),
    
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Large banner image for the top of the About page',
    }),
    
    // Main Story Section
    defineField({
      name: 'storyHeading',
      title: 'Story Section Heading',
      type: 'string',
      initialValue: 'Our Story',
    }),
    
    defineField({
      name: 'storyContent',
      title: 'Story Content',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Tell your brand story - supports rich text formatting',
      validation: (Rule) => Rule.required(),
    }),
    
    defineField({
      name: 'storyImage',
      title: 'Story Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Image to accompany your story',
    }),
    
    // Mission/Values Section
    defineField({
      name: 'missionHeading',
      title: 'Mission Section Heading',
      type: 'string',
      initialValue: 'What We Believe',
    }),
    
    defineField({
      name: 'missionPoints',
      title: 'Mission Points',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'icon',
              title: 'Icon Emoji',
              type: 'string',
              description: 'Single emoji (e.g., ✨, 🌱, 💚)',
              validation: (Rule) => Rule.max(2),
            },
            {
              name: 'heading',
              title: 'Point Heading',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Point Description',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'heading',
              subtitle: 'description',
            },
          },
        },
      ],
      description: 'Key values or mission points (3-6 recommended)',
    }),
    
    // Process Section
    defineField({
      name: 'processHeading',
      title: 'Process Section Heading',
      type: 'string',
      initialValue: 'How We Create',
    }),
    
    defineField({
      name: 'processContent',
      title: 'Process Description',
      type: 'text',
      rows: 4,
      description: 'Describe your creation process',
    }),
    
    defineField({
      name: 'processImages',
      title: 'Process Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
      description: 'Gallery of your work process',
    }),
    
    // Contact Section
    defineField({
      name: 'contactHeading',
      title: 'Contact Section Heading',
      type: 'string',
      initialValue: 'Get In Touch',
    }),
    
    defineField({
      name: 'contactText',
      title: 'Contact Text',
      type: 'text',
      rows: 3,
      description: 'Invitation to contact you',
    }),
    
    defineField({
      name: 'showSocialLinks',
      title: 'Show Social Media Links',
      type: 'boolean',
      initialValue: true,
      description: 'Display social media links in contact section',
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
      title: 'heroHeading',
      subtitle: 'heroSubheading',
      media: 'heroImage',
    },
  },
})
