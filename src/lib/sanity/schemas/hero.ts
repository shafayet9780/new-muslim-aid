export default {
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Main Title (English)',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'titleBn',
      title: 'Main Title (Bengali)',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'subtitle',
      title: 'Subtitle (English)',
      type: 'text',
      rows: 3,
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'subtitleBn',
      title: 'Subtitle (Bengali)',
      type: 'text',
      rows: 3,
      validation: (Rule: any) => Rule.required()
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
      name: 'primaryCta',
      title: 'Primary CTA Button',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Button Text (English)',
          type: 'string'
        },
        {
          name: 'textBn',
          title: 'Button Text (Bengali)',
          type: 'string'
        },
        {
          name: 'link',
          title: 'Button Link',
          type: 'string'
        }
      ]
    },
    {
      name: 'secondaryCta',
      title: 'Secondary CTA Button',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Button Text (English)',
          type: 'string'
        },
        {
          name: 'textBn',
          title: 'Button Text (Bengali)',
          type: 'string'
        },
        {
          name: 'link',
          title: 'Button Link',
          type: 'string'
        }
      ]
    },
    {
      name: 'trustIndicators',
      title: 'Trust Indicators',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Text (English)',
              type: 'string'
            },
            {
              name: 'textBn',
              title: 'Text (Bengali)',
              type: 'string'
            },
            {
              name: 'value',
              title: 'Value (e.g., "1250+")',
              type: 'string'
            }
          ]
        }
      ]
    },
    {
      name: 'emergencyContact',
      title: 'Emergency Contact',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Title (English)',
          type: 'string'
        },
        {
          name: 'titleBn',
          title: 'Title (Bengali)',
          type: 'string'
        },
        {
          name: 'phone',
          title: 'Phone Number',
          type: 'string'
        }
      ]
    },
    {
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true
      }
    }
  ]
} 