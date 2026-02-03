export default {
  name: 'category',
  title: 'Category',
  type: 'document',
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
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'description',
      title: 'Description (English)',
      type: 'text',
      rows: 3
    },
    {
      name: 'descriptionBn',
      title: 'Description (Bengali)',
      type: 'text',
      rows: 3
    },
    {
      name: 'color',
      title: 'Category Color',
      type: 'string',
      description: 'Tailwind color class (e.g., "green", "blue", "purple")'
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description'
    }
  }
} 