import {defineField, defineType, defineArrayMember} from 'sanity'

export default defineType({
  name: 'homepageContent',
  title: 'Homepage Content',
  type: 'document',
  icon: () => '🏠',
  fields: [
    // Values Section
    defineField({
      name: 'valuesSectionTitle',
      title: 'Values Section Title',
      type: 'string',
      initialValue: 'Our Festival Values'
    }),
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
      initialValue: [
        {
          emoji: '🎨',
          title: 'Handcrafted',
          description: 'Every piece is lovingly made by hand with attention to detail and artistic flair'
        },
        {
          emoji: '🌱',
          title: 'Sustainable',
          description: 'Using natural materials and eco-friendly practices for a better planet'
        },
        {
          emoji: '🎪',
          title: 'Festival Spirit',
          description: 'Designed for the vibrant community of festival-goers and music lovers'
        }
      ]
    }),
    
    // Collections Section
    defineField({
      name: 'collectionsSectionTitle',
      title: 'Collections Section Title',
      type: 'string',
      initialValue: 'Featured Collections'
    }),
    defineField({
      name: 'collections',
      title: 'Featured Collections',
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
              title: 'Collection Title',
              type: 'string'
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text'
            }),
            defineField({
              name: 'linkUrl',
              title: 'Link URL',
              type: 'string'
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
      initialValue: [
        {
          emoji: '👕',
          title: 'Festival Apparel',
          description: 'Handcrafted clothing perfect for EDM festivals and desert burns',
          linkUrl: '/collections/apparel'
        },
        {
          emoji: '💎',
          title: 'Natural Jewelry',
          description: 'Handmade pieces from pinecones and natural materials',
          linkUrl: '/collections/jewelry'
        },
        {
          emoji: '✨',
          title: 'Unique Accessories',
          description: 'Pins, stickers, and one-of-a-kind festival essentials',
          linkUrl: '/collections/knick-knacks'
        }
      ]
    }),
    
    // Hero Buttons
    defineField({
      name: 'primaryButtonText',
      title: 'Primary Button Text',
      type: 'string',
      initialValue: 'Shop All Products ✨'
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
      initialValue: 'Handmade Jewelry'
    }),
    defineField({
      name: 'secondaryButtonUrl',
      title: 'Secondary Button URL',
      type: 'string',
      initialValue: '/collections/jewelry'
    }),
    
    // Footer Content
    defineField({
      name: 'footerDescription',
      title: 'Footer Description',
      type: 'text',
      initialValue: 'Handcrafted festival apparel and accessories for your journey'
    })
  ],
  
  preview: {
    prepare() {
      return {
        title: 'Homepage Content Settings'
      }
    }
  }
})