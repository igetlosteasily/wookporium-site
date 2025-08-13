import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Wookporium',
  projectId: 'k3xyl4wr', // Your new project ID
  dataset: 'production',
  plugins: [deskTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
})