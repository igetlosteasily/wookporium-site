import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'brandSettings',
  title: 'Brand & Visual Settings',
  type: 'document',
  icon: () => '🎨',
  fields: [
    // Logo Management
    defineField({
      name: 'logo',
      title: 'Logo Image',
      type: 'image',
      description: 'Upload your logo (PNG/SVG recommended). Leave empty to use text logo.',
      options: {
        hotspot: true,
      }
    }),
    defineField({
      name: 'logoText',
      title: 'Logo Text',
      type: 'string',
      initialValue: 'Wookporium',
      description: 'Text to display if no logo image is uploaded'
    }),
    defineField({
      name: 'logoIcon',
      title: 'Logo Icon Letter',
      type: 'string',
      initialValue: 'W',
      description: 'Single letter for the circle icon (if no logo image)',
      validation: Rule => Rule.max(1)
    }),
    
    // Color Scheme
    defineField({
      name: 'primaryColor',
      title: 'Primary Color',
      type: 'color',
      description: 'Main brand color (buttons, links, accents)',
      options: {
        disableAlpha: true
      }
    }),
    defineField({
      name: 'secondaryColor',
      title: 'Secondary Color', 
      type: 'color',
      description: 'Secondary brand color (gradients, highlights)',
      options: {
        disableAlpha: true
      }
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'color',
      description: 'Main background color for the entire site',
      options: {
        disableAlpha: true
      },
      initialValue: { hex: '#ffffff' }
    }),
    defineField({
      name: 'sectionBackgroundColor',
      title: 'Section Background Color',
      type: 'color',
      description: 'Background color for alternating sections (Values, Collections, etc.)',
      options: {
        disableAlpha: true
      },
      initialValue: { hex: '#f8fafc' }
    }),
    
    // Homepage Hero Content
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      initialValue: 'Wookporium',
      description: 'Main headline on homepage'
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      initialValue: 'Handcrafted festival apparel, natural jewelry, and unique accessories for your journey',
      description: 'Subtitle text below main headline'
    }),
    defineField({
      name: 'heroBackgroundImage',
      title: 'Hero Background Image',
      type: 'image',
      description: 'Optional background image for hero section',
      options: {
        hotspot: true
      }
    }),
    
    // Theme Style with Background Presets
    defineField({
      name: 'themeStyle',
      title: 'Overall Theme Style',
      type: 'string',
      options: {
        list: [
          { title: 'Clean & Minimal (White)', value: 'minimal' },
          { title: 'Festival Vibes (Cosmic Purple)', value: 'festival' },
          { title: 'Earthy Bohemian (Warm Beige)', value: 'bohemian' },
          { title: 'Desert Burn (Sandy Orange)', value: 'desert' },
          { title: 'Dark Mode (Charcoal)', value: 'dark' },
          { title: 'Sunset Vibes (Pink/Orange)', value: 'sunset' },
          { title: 'Forest (Deep Green)', value: 'forest' },
          { title: 'Ocean (Blue Gradient)', value: 'ocean' },
          { title: 'Custom (Use Color Pickers Above)', value: 'custom' }
        ]
      },
      initialValue: 'minimal',
      description: 'Choose preset theme or select Custom to use your own colors above'
    }),
    
    // Button Styles
    defineField({
      name: 'buttonStyle',
      title: 'Button Style',
      type: 'string',
      options: {
        list: [
          { title: 'Rounded (Current)', value: 'rounded' },
          { title: 'Sharp Corners', value: 'square' },
          { title: 'Pill Shaped', value: 'pill' }
        ]
      },
      initialValue: 'rounded'
    }),
    
    // Typography Settings
    defineField({
      name: 'headerFont',
      title: 'Header Font',
      type: 'string',
      description: 'Font for headings (H1, H2, etc.)',
      options: {
        list: [
          { title: 'Inter (Clean & Modern)', value: 'inter' },
          { title: 'Playfair Display (Elegant)', value: 'playfair' },
          { title: 'Montserrat (Bold & Strong)', value: 'montserrat' },
          { title: 'Poppins (Friendly & Round)', value: 'poppins' },
          { title: 'Oswald (Condensed & Impact)', value: 'oswald' },
          { title: 'Dancing Script (Handwritten)', value: 'dancing' },
          { title: 'Bebas Neue (Festival Poster)', value: 'bebas' },
          { title: 'Righteous (Fun & Playful)', value: 'righteous' },
          { title: 'System Default', value: 'system' }
        ]
      },
      initialValue: 'inter'
    }),
    defineField({
      name: 'bodyFont',
      title: 'Body Font',
      type: 'string',
      description: 'Font for body text and descriptions',
      options: {
        list: [
          { title: 'Inter (Clean & Readable)', value: 'inter' },
          { title: 'Open Sans (Friendly)', value: 'opensans' },
          { title: 'Lato (Professional)', value: 'lato' },
          { title: 'Source Sans Pro (Tech)', value: 'sourcesans' },
          { title: 'Nunito (Rounded)', value: 'nunito' },
          { title: 'Roboto (Google Style)', value: 'roboto' },
          { title: 'Merriweather (Traditional)', value: 'merriweather' },
          { title: 'System Default', value: 'system' }
        ]
      },
      initialValue: 'inter'
    }),
    defineField({
      name: 'fontWeightStyle',
      title: 'Font Weight Style',
      type: 'string',
      description: 'Overall font weight preference',
      options: {
        list: [
          { title: 'Light & Airy', value: 'light' },
          { title: 'Normal (Current)', value: 'normal' },
          { title: 'Bold & Strong', value: 'bold' }
        ]
      },
      initialValue: 'normal'
    }),
    
    // Featured Content
    defineField({
      name: 'featuredProducts',
      title: 'Featured Products',
      type: 'array',
      description: 'Products to highlight on homepage',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
      validation: Rule => Rule.max(6)
    })
  ],
  
  preview: {
    select: {
      title: 'logoText',
      media: 'logo'
    },
    prepare(selection) {
      const { title, media } = selection
      return {
        title: `Brand Settings: ${title}`,
        media
      }
    }
  }
})