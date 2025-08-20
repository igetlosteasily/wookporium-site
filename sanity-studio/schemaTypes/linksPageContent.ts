// Create: sanity-studio/schemaTypes/linksPageContent.ts

import {defineField, defineType, defineArrayMember} from 'sanity'

export default defineType({
  name: 'linksPageContent',
  title: 'Links Page Content',
  type: 'document',
  icon: () => '🔗',
  fields: [
    // Page Header
    defineField({
      name: 'pageTitle',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Useful Links'
    }),
    defineField({
      name: 'pageDescription',
      title: 'Page Description',
      type: 'text',
      initialValue: 'Curated resources for festival-goers, music lovers, and the vibrant community we\'re all part of'
    }),
    
    // Link Categories
    defineField({
      name: 'linkCategories',
      title: 'Link Categories',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Category Title',
              type: 'string'
            }),
            defineField({
              name: 'emoji',
              title: 'Category Emoji',
              type: 'string'
            }),
            defineField({
              name: 'links',
              title: 'Links in this Category',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'name',
                      title: 'Link Name',
                      type: 'string'
                    }),
                    defineField({
                      name: 'url',
                      title: 'URL',
                      type: 'url'
                    }),
                    defineField({
                      name: 'description',
                      title: 'Description',
                      type: 'text'
                    })
                  ],
                  preview: {
                    select: {
                      title: 'name',
                      subtitle: 'url'
                    }
                  }
                })
              ]
            })
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'emoji',
              linkCount: 'links'
            },
            prepare(selection) {
              const {title, subtitle, linkCount} = selection
              const count = linkCount ? linkCount.length : 0
              return {
                title: title,
                subtitle: `${subtitle} ${count} links`
              }
            }
          }
        })
      ],
      initialValue: [
        {
          title: 'Festival Resources',
          emoji: '🎪',
          links: [
            { name: 'Festival Safety Tips', url: 'https://festivalguide.com/safety', description: 'Essential safety information for festival-goers' },
            { name: 'Packing Lists', url: 'https://festivalguide.com/packing', description: 'Complete festival packing checklists' },
            { name: 'Festival Calendar', url: 'https://festivalcalendar.com', description: 'Find upcoming festivals worldwide' },
            { name: 'Weather Preparation', url: 'https://festivalweather.com', description: 'Weather tips and gear recommendations' }
          ]
        },
        {
          title: 'Music & EDM',
          emoji: '🎵',
          links: [
            { name: 'EDM.com', url: 'https://edm.com', description: 'Latest EDM news and artist updates' },
            { name: 'SoundCloud', url: 'https://soundcloud.com', description: 'Discover new music and emerging artists' },
            { name: 'Beatport', url: 'https://beatport.com', description: 'Electronic music downloads and charts' },
            { name: 'Resident Advisor', url: 'https://ra.co', description: 'Electronic music events and culture' }
          ]
        },
        {
          title: 'Sustainability',
          emoji: '🌱',
          links: [
            { name: 'Leave No Trace', url: 'https://lnt.org', description: 'Environmental responsibility principles' },
            { name: 'Sustainable Festivals', url: 'https://sustainablefestivals.com', description: 'Eco-friendly festival practices' },
            { name: 'Green Festival Guide', url: 'https://greenfestivalguide.org', description: 'Environmental festival resources' },
            { name: 'Earth Guardians', url: 'https://earthguardians.org', description: 'Youth-led environmental activism' }
          ]
        },
        {
          title: 'Community',
          emoji: '🤝',
          links: [
            { name: 'Festival Forums', url: 'https://festivalforums.com', description: 'Connect with fellow festival-goers' },
            { name: 'Reddit Festivals', url: 'https://reddit.com/r/festivals', description: 'Festival community discussions' },
            { name: 'PLUR Community', url: 'https://plurcommunity.com', description: 'Peace, Love, Unity, Respect community' },
            { name: 'Festival Families', url: 'https://festivalfamilies.com', description: 'Find your festival family' }
          ]
        },
        {
          title: 'Art & Inspiration',
          emoji: '🎨',
          links: [
            { name: 'Burning Man Arts', url: 'https://burningman.org/culture/arts-culture/', description: 'Art and culture from Burning Man' },
            { name: 'Festival Art Directory', url: 'https://festivalart.com', description: 'Artists and installations at festivals' },
            { name: 'Visionary Art', url: 'https://visionaryart.org', description: 'Psychedelic and visionary art community' },
            { name: 'Flow Arts Institute', url: 'https://flowarts.org', description: 'Learn flow arts and movement' }
          ]
        },
        {
          title: 'Wellness',
          emoji: '🧘',
          links: [
            { name: 'Festival Wellness', url: 'https://festivalwellness.com', description: 'Health and wellness at festivals' },
            { name: 'Harm Reduction', url: 'https://harmreduction.org', description: 'Safety and harm reduction resources' },
            { name: 'Mental Health Resources', url: 'https://mentalhealth.gov', description: 'Mental health support and resources' },
            { name: 'Yoga & Meditation', url: 'https://yogajournal.com', description: 'Yoga and meditation practices' }
          ]
        }
      ]
    }),
    
    // Call to Action Section
    defineField({
      name: 'ctaTitle',
      title: 'Call to Action Title',
      type: 'string',
      initialValue: 'Ready to Festival in Style?'
    }),
    defineField({
      name: 'ctaDescription',
      title: 'Call to Action Description',
      type: 'text',
      initialValue: 'Check out our handcrafted apparel and natural jewelry collection'
    }),
    defineField({
      name: 'ctaButtonText',
      title: 'CTA Button Text',
      type: 'string',
      initialValue: 'Shop The Wookporium'
    }),
    defineField({
      name: 'ctaButtonUrl',
      title: 'CTA Button URL',
      type: 'string',
      initialValue: '/products/'
    }),
    
    // Disclaimer
    defineField({
      name: 'disclaimerText',
      title: 'Disclaimer Text',
      type: 'text',
      initialValue: 'External links are provided for convenience. The Wookporium is not responsible for external content.'
    })
  ],
  
  preview: {
    select: {
      categoryCount: 'linkCategories'
    },
    prepare(selection) {
      const {categoryCount} = selection
      const count = categoryCount ? categoryCount.length : 0
      return {
        title: `Links Page Content (${count} categories)`
      }
    }
  }
})