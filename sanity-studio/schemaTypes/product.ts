import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Product Name',
      type: 'string'
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      }
    }),
    defineField({
      name: 'description',
      title: 'Product Description',
      type: 'blockContent'
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number'
    }),
    defineField({
      name: 'compareAtPrice',
      title: 'Original Price (for sales)',
      type: 'number'
    }),
    defineField({
      name: 'inventory',
      title: 'Inventory Count',
      type: 'number'
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Product Image',
      type: 'image',
      options: {
        hotspot: true,
      }
    }),
    defineField({
      name: 'gallery',
      title: 'Additional Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          }
        }
      ]
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      }
    }),
    defineField({
      name: 'festivalAttribution',
      title: 'Festival Attribution',
      type: 'string'
    }),
    defineField({
      name: 'instagramPost',
      title: 'Instagram Post URL',
      type: 'url'
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
              name: 'name',
              title: 'Variant Name',
              type: 'string'
            },
            {
              name: 'price',
              title: 'Price Override',
              type: 'number'
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'materials',
      title: 'Materials Used',
      type: 'array',
      of: [{type: 'string'}]
    }),
    defineField({
      name: 'careInstructions',
      title: 'Care Instructions',
      type: 'text',
      rows: 3
    }),
    defineField({
      name: 'timeToMake',
      title: 'Creation Time',
      type: 'string'
    }),
    defineField({
      name: 'artistNotes',
      title: 'Artist Notes',
      type: 'text',
      rows: 3
    }),
    defineField({
      name: 'isOneOfAKind',
      title: 'One-of-a-Kind Item',
      type: 'boolean'
    }),
    defineField({
      name: 'isAvailable',
      title: 'Available for Purchase',
      type: 'boolean',
      initialValue: true
    })
  ],

  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      subtitle: 'shortDescription',
      price: 'price'
    },
    prepare(selection) {
      const {title, media, subtitle, price} = selection
      return {
        title: title,
        subtitle: subtitle ? `$${price} - ${subtitle}` : `$${price}`,
        media: media
      }
    }
  }
})