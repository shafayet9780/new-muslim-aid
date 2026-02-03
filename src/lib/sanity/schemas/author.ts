export default {
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'bio',
      title: 'Bio (English)',
      type: 'text',
      rows: 3
    },
    {
      name: 'bioBn',
      title: 'Bio (Bengali)',
      type: 'text',
      rows: 3
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
      name: 'email',
      title: 'Email',
      type: 'string'
    },
    {
      name: 'role',
      title: 'Role (English)',
      type: 'string'
    },
    {
      name: 'roleBn',
      title: 'Role (Bengali)',
      type: 'string'
    },
    {
      name: 'social',
      title: 'Social Media',
      type: 'object',
      fields: [
        {
          name: 'facebook',
          title: 'Facebook',
          type: 'url'
        },
        {
          name: 'twitter',
          title: 'Twitter',
          type: 'url'
        },
        {
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'url'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image'
    }
  }
} 