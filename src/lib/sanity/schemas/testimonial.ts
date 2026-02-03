export default {
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name (English)',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'nameBn',
      title: 'Name (Bengali)',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'location',
      title: 'Location (English)',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'locationBn',
      title: 'Location (Bengali)',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'content',
      title: 'Testimonial Content (English)',
      type: 'text',
      rows: 4,
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'contentBn',
      title: 'Testimonial Content (Bengali)',
      type: 'text',
      rows: 4,
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(1).max(5),
      initialValue: 5
    },
    {
      name: 'conversionDate',
      title: 'Date of Conversion',
      type: 'date',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'isAnonymous',
      title: 'Anonymous Testimonial',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'image',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'featured',
      title: 'Featured Testimonial',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Published', value: 'published' }
        ]
      },
      initialValue: 'draft'
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'location',
      media: 'image'
    }
  }
} 