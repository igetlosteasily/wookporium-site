import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { colorInput } from '@sanity/color-input'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'wookporium-studio',
  title: 'Wookporium - Festival Fashion CMS',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '7iiji3rf',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [
    structureTool(),
    visionTool(),
    colorInput(),
  ],

  schema: {
    types: schemaTypes,
  },
})
