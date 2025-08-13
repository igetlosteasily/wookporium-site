import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'variant',
  title: 'Product Variant',
  type: 'object',
  fields: [
    defineField({
      name: 'sku',
      title: 'SKU',
      type: 'string',
      description: 'e.g., SHIRT-BLK-M'
    }),
    defineField({
      name: 'name',
      title: 'Variant Name',
      type: 'string',
      description: 'e.g., "Medium Black Shirt"'
    }),
    defineField({
      name: 'size',
      title: 'Size',
      type: 'string'
    }),
    defineField({
      name: 'color',
      title: 'Color',
      type: 'string'
    }),
    defineField({
      name: 'material',
      title: 'Material',
      type: 'string'
    }),
    defineField({
      name: 'style',
      title: 'Style',
      type: 'string'
    }),
    defineField({
      name: 'priceAdjustment',
      title: 'Price Adjustment',
      type: 'number',
      initialValue: 0,
      description: 'Amount to add/subtract from base price'
    }),
    defineField({
      name: 'inventory',
      title: 'Stock Count',
      type: 'number',
      initialValue: 1
    }),
    defineField({
      name: 'isAvailable',
      title: 'Available',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'variantImage',
      title: 'Variant Image',
      type: 'image',
      options: {
        hotspot: true,
      }
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'sku',
      media: 'variantImage'
    }
  }
})