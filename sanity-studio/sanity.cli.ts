import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || '7iiji3rf',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production'
  },
  deployment: {
    appId: 'gcevfzn7ey7xjpxpdooprp52'
  }
})
