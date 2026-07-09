import { defineType, defineField } from 'sanity'

/**
 * Business Information Schema
 * Single source of truth for all brand/business information
 * Dynamic content that populates across the entire site
 */

export default defineType({
  name: 'business',
  title: 'Business Information',
  type: 'document',
  icon: () => '🏪',
  
  fields: [
    // Brand Identity
    defineField({
      name: 'brandName',
      title: 'Brand Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Wookporium',
    }),
    
    defineField({
      name: 'tagline',
      title: 'Brand Tagline',
      type: 'string',
      validation: (Rule) => Rule.required().max(120),
      description: 'Short tagline that appears across the site',
      initialValue: 'Handcrafted festival apparel and natural jewelry for your journey',
    }),
    
    defineField({
      name: 'logo',
      title: 'Logo Image',
      type: 'image',
      description: 'Brand logo (PNG with transparency recommended)',
      options: {
        hotspot: true,
      },
    }),
    
    defineField({
      name: 'brandStory',
      title: 'Brand Story',
      type: 'text',
      rows: 6,
      description: 'Full brand story for About page',
      validation: (Rule) => Rule.required(),
    }),
    
    // Hero Section Content
    defineField({
      name: 'heroTitle',
      title: 'Homepage Hero Title',
      type: 'string',
      initialValue: 'Wookporium',
    }),
    
    defineField({
      name: 'heroSubtitle',
      title: 'Homepage Hero Subtitle',
      type: 'text',
      rows: 3,
      initialValue: 'Handcrafted festival apparel and natural jewelry for your journey',
    }),
    
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      description: 'Large, high-quality hero image (1920x1080 recommended)',
      options: {
        hotspot: true,
      },
    }),
    
    // Homepage Introduction Section (Rich Text)
    defineField({
      name: 'homepageIntro',
      title: 'Homepage Introduction',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Rich text content for homepage introduction section (appears between hero and featured products). Supports formatting, links, lists, etc.',
    }),
    
    // Social Media
    defineField({
      name: 'instagramHandle',
      title: 'Instagram Handle',
      type: 'string',
      description: 'Without @ symbol (e.g., "wookporium")',
    }),
    
    defineField({
      name: 'facebookUrl',
      title: 'Facebook Page URL',
      type: 'url',
    }),
    
    defineField({
      name: 'tiktokHandle',
      title: 'TikTok Handle',
      type: 'string',
      description: 'Without @ symbol',
    }),
    
    // Contact Info
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    
    // SEO
    defineField({
      name: 'seoDescription',
      title: 'SEO Meta Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(160),
      description: 'Description for search engines (max 160 characters)',
    }),
    
    defineField({
      name: 'seoKeywords',
      title: 'SEO Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Keywords for SEO (e.g., "festival fashion", "handmade jewelry")',
    }),
  ],
  
  preview: {
    select: {
      title: 'brandName',
      subtitle: 'tagline',
      media: 'logo',
    },
  },
})
