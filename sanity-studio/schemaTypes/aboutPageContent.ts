// Create: sanity-studio/schemaTypes/aboutPageContent.ts

import {defineField, defineType, defineArrayMember} from 'sanity'

export default defineType({
  name: 'aboutPageContent',
  title: 'About Page Content',
  type: 'document',
  icon: () => '👥',
  fields: [
    // Page Header
    defineField({
      name: 'pageTitle',
      title: 'Page Title',
      type: 'string',
      initialValue: 'About The Wookporium'
    }),
    defineField({
      name: 'pageSubtitle',
      title: 'Page Subtitle',
      type: 'text',
      initialValue: 'Handcrafted festival apparel and natural jewelry for the vibrant community of festival-goers and music lovers'
    }),
    
    // Our Story Section
    defineField({
      name: 'storyTitle',
      title: 'Story Section Title',
      type: 'string',
      initialValue: 'Our Story'
    }),
    defineField({
      name: 'storyContent',
      title: 'Story Content',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'paragraph',
              title: 'Paragraph',
              type: 'text'
            })
          ],
          preview: {
            select: {
              title: 'paragraph'
            },
            prepare(selection) {
              const {title} = selection
              return {
                title: title ? `${title.substring(0, 50)}...` : 'Story paragraph'
              }
            }
          }
        })
      ],
      initialValue: [
        {
          paragraph: 'The Wookporium was born from a passion for the festival community and a love for handcrafted artistry. We believe that festival fashion should be as unique and vibrant as the experiences that bring us together.'
        },
        {
          paragraph: 'Every piece in our collection is thoughtfully handcrafted with attention to detail and artistic flair. From crocheted apparel that flows with your dance moves to natural jewelry made from pinecones and organic materials, we create pieces that celebrate self-expression and creativity.'
        },
        {
          paragraph: 'Our journey began with a simple belief: festival-goers deserve clothing and accessories that are as authentic and spirited as they are. Whether you are dancing under desert stars or vibing at an EDM festival, our pieces are designed to move with you and reflect your unique energy.'
        }
      ]
    }),
    
    // Values Section
    defineField({
      name: 'values',
      title: 'Company Values',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'emoji',
              title: 'Emoji',
              type: 'string'
            }),
            defineField({
              name: 'title',
              title: 'Value Title',
              type: 'string'
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text'
            })
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'emoji'
            }
          }
        })
      ],
      validation: Rule => Rule.max(6).warning('Consider limiting to 6 values for better layout'),
      initialValue: [
        {
          emoji: '🎨',
          title: 'Handcrafted',
          description: 'Every piece is lovingly made by hand with attention to detail and artistic flair that celebrates individuality.'
        },
        {
          emoji: '🌱',
          title: 'Sustainable', 
          description: 'Using natural materials and eco-friendly practices because we care about the planet that hosts our festivals.'
        },
        {
          emoji: '🎪',
          title: 'Festival Spirit',
          description: 'Designed for the vibrant community of festival-goers, music lovers, and free spirits who dance to their own beat.'
        }
      ]
    }),
    
    // What Makes Us Special Section
    defineField({
      name: 'specialSectionTitle',
      title: 'What Makes Us Special - Title',
      type: 'string',
      initialValue: 'What Makes Us Special'
    }),
    defineField({
      name: 'specialItems',
      title: 'Special Items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon (emoji or text)',
              type: 'string'
            }),
            defineField({
              name: 'title',
              title: 'Item Title',
              type: 'string'
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text'
            })
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'icon'
            }
          }
        })
      ],
      validation: Rule => Rule.max(6).warning('Consider limiting to 6 items for better layout'),
      initialValue: [
        {
          icon: '🧶',
          title: 'Handcrafted Apparel',
          description: 'Our crocheted tops, flowing pants, and unique festival wear are made with traditional techniques and modern style.'
        },
        {
          icon: '🌲',
          title: 'Natural Jewelry',
          description: 'We transform pinecones and other natural materials into beautiful, one-of-a-kind jewelry pieces.'
        },
        {
          icon: '✨',
          title: 'Unique Accessories',
          description: 'From festival pins to custom stickers, we create the little details that make your festival look complete.'
        },
        {
          icon: '🎵',
          title: 'Community Focus',
          description: 'Made by festival-goers, for festival-goers. We understand the culture and create pieces that truly belong.'
        }
      ]
    }),
    
    // Call to Action Section
    defineField({
      name: 'ctaTitle',
      title: 'Call to Action Title',
      type: 'string',
      initialValue: 'Join Our Festival Family'
    }),
    defineField({
      name: 'ctaDescription',
      title: 'Call to Action Description',
      type: 'text',
      initialValue: 'Ready to express your unique festival style? Browse our collections and find pieces that speak to your spirit.'
    }),
    defineField({
      name: 'primaryButtonText',
      title: 'Primary Button Text',
      type: 'string',
      initialValue: 'Shop All Products'
    }),
    defineField({
      name: 'primaryButtonUrl',
      title: 'Primary Button URL',
      type: 'string',
      initialValue: '/products/'
    }),
    defineField({
      name: 'secondaryButtonText',
      title: 'Secondary Button Text',
      type: 'string',
      initialValue: 'See Our Jewelry'
    }),
    defineField({
      name: 'secondaryButtonUrl',
      title: 'Secondary Button URL',
      type: 'string',
      initialValue: '/collections/jewelry'
    })
  ],
  
  preview: {
    prepare() {
      return {
        title: 'About Page Content Settings'
      }
    }
  }
})