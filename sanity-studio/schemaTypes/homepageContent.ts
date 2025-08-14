// sanity-studio/schemaTypes/homepageContent.ts
export default {
  name: 'homepageContent',
  title: 'Homepage Content',
  type: 'document',
  fields: [
    {
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      initialValue: 'The Wookporium'
    },
    {
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      initialValue: 'Handcrafted festival apparel, natural jewelry, and unique accessories for your journey'
    },
    {
      name: 'heroBackgroundImage',
      title: 'Hero Background Image',
      type: 'image',
      options: {
        hotspot: true
      }
    }
  ]
}