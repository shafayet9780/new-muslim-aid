export default {
  name: 'stats',
  title: 'Statistics Section',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Section Title (English)',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'titleBn',
      title: 'Section Title (Bengali)',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'subtitle',
      title: 'Section Subtitle (English)',
      type: 'text',
      rows: 3
    },
    {
      name: 'subtitleBn',
      title: 'Section Subtitle (Bengali)',
      type: 'text',
      rows: 3
    },
    {
      name: 'badgeText',
      title: 'Badge Text (English)',
      type: 'string'
    },
    {
      name: 'badgeTextBn',
      title: 'Badge Text (Bengali)',
      type: 'string'
    },
    {
      name: 'statistics',
      title: 'Statistics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'value',
              title: 'Value (e.g., "1250")',
              type: 'string',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'suffix',
              title: 'Suffix (e.g., "+")',
              type: 'string'
            },
            {
              name: 'label',
              title: 'Label (English)',
              type: 'string',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'labelBn',
              title: 'Label (Bengali)',
              type: 'string',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'description',
              title: 'Description (English)',
              type: 'string'
            },
            {
              name: 'descriptionBn',
              title: 'Description (Bengali)',
              type: 'string'
            },
            {
              name: 'icon',
              title: 'Icon Name',
              type: 'string',
              description: 'Heroicon name (e.g., "UsersIcon", "HeartIcon")'
            },
            {
              name: 'gradient',
              title: 'Gradient Colors',
              type: 'string',
              description: 'Tailwind gradient classes (e.g., "from-blue-500 to-cyan-500")'
            }
          ]
        }
      ]
    },
    {
      name: 'achievements',
      title: 'Achievements',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title (English)',
              type: 'string',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'titleBn',
              title: 'Title (Bengali)',
              type: 'string',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'description',
              title: 'Description (English)',
              type: 'text',
              rows: 2
            },
            {
              name: 'descriptionBn',
              title: 'Description (Bengali)',
              type: 'text',
              rows: 2
            },
            {
              name: 'icon',
              title: 'Icon Name',
              type: 'string',
              description: 'Heroicon name'
            },
            {
              name: 'gradient',
              title: 'Gradient Colors',
              type: 'string'
            }
          ]
        }
      ]
    }
  ]
} 