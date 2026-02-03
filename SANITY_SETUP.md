# Sanity CMS Setup Guide

This guide will help you set up Sanity CMS for the New Muslim Aid website.

## Prerequisites

- Node.js 18+ installed
- A Sanity account (free at [sanity.io](https://sanity.io))

## Step 1: Create a Sanity Project

1. Go to [sanity.io](https://sanity.io) and create an account
2. Create a new project:
   - Project name: `new-muslim-aid`
   - Dataset: `production`
   - Choose "Clean project with no predefined schemas"

## Step 2: Get Your Project Credentials

1. In your Sanity project dashboard, go to Settings → API
2. Copy your Project ID
3. Note your Dataset name (usually "production")

## Step 3: Set Up Environment Variables

Create a `.env.local` file in your project root:

```bash
# Sanity CMS Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your-actual-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2023-12-01

# Optional: For write operations (if needed)
SANITY_API_TOKEN=your-sanity-api-token
```

Replace `your-actual-project-id` with your actual Sanity project ID.

## Step 4: Install Sanity CLI (Optional)

If you want to use Sanity Studio locally:

```bash
npm install -g @sanity/cli
```

## Step 5: Initialize Sanity Studio

Run the following command to set up Sanity Studio:

```bash
npx sanity init --template clean --create-project "New Muslim Aid" --dataset production
```

When prompted:
- Choose "Yes" to use the existing project
- Select your project
- Choose "Yes" to use the existing dataset

## Step 6: Start Sanity Studio

```bash
npx sanity dev
```

This will start Sanity Studio at `http://localhost:3333`

## Step 7: Create Content

### 1. Site Settings
- Go to "Site Settings" in Sanity Studio
- Create a new document with:
  - Site title
  - Description
  - Contact information
  - Emergency contacts
  - Social media links

### 2. Hero Section
- Go to "Hero Section"
- Create content for:
  - Main title (English & Bengali)
  - Subtitle (English & Bengali)
  - CTA buttons
  - Trust indicators
  - Emergency contact

### 3. Stats Section
- Go to "Statistics Section"
- Add your impact statistics
  - People helped
  - Volunteers
  - Projects
  - Locations
- Add achievements

### 4. Blog Posts
- Go to "Blog Post"
- Create posts with:
  - Title (English & Bengali)
  - Content (English & Bengali)
  - Featured image
  - Category
  - Author
  - Read time

### 5. Testimonials
- Go to "Testimonial"
- Add testimonials with:
  - Name (English & Bengali)
  - Location (English & Bengali)
  - Content (English & Bengali)
  - Rating
  - Conversion date
  - Profile image

### 6. Categories
- Go to "Category"
- Create categories like:
  - Training
  - Events
  - News
  - Resources

### 7. Authors
- Go to "Author"
- Add team members with:
  - Name
  - Bio (English & Bengali)
  - Role (English & Bengali)
  - Profile image

## Step 8: Test the Integration

1. Start your Next.js development server:
   ```bash
   npm run dev
   ```

2. Visit your website and check that:
   - Hero section displays dynamic content
   - Stats section shows your numbers
   - Latest updates show your blog posts
   - Testimonials display correctly

## Content Management Tips

### Multilingual Content
- Always fill both English and Bengali fields
- Use consistent terminology across languages
- Test both language versions

### Images
- Use high-quality images (recommended: 1200x800px)
- Optimize images before uploading
- Use descriptive alt text

### SEO
- Write compelling titles and excerpts
- Use relevant categories
- Include proper meta descriptions

### Regular Updates
- Post new content regularly
- Update statistics monthly
- Add new testimonials as they come in

## Troubleshooting

### Content Not Showing
1. Check environment variables are correct
2. Verify content is published (not draft)
3. Check browser console for errors
4. Ensure Sanity project is accessible

### Images Not Loading
1. Verify image URLs are correct
2. Check Sanity image configuration
3. Ensure Next.js image domains are set

### Performance Issues
1. Use appropriate image sizes
2. Implement proper caching
3. Consider using ISR for static pages

## API Reference

### Key Queries
- `getHomePageData()` - Fetches all home page data
- `getHeroData()` - Fetches hero section data
- `getStatsData()` - Fetches statistics
- `getLatestPosts(limit)` - Fetches recent blog posts
- `getTestimonials(limit)` - Fetches testimonials

### Environment Variables
- `NEXT_PUBLIC_SANITY_PROJECT_ID` - Your Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET` - Dataset name (usually "production")
- `NEXT_PUBLIC_SANITY_API_VERSION` - API version

## Support

If you encounter issues:
1. Check the [Sanity documentation](https://www.sanity.io/docs)
2. Review the [Next.js documentation](https://nextjs.org/docs)
3. Check the project's GitHub issues

## Next Steps

Once the basic setup is complete, consider:
1. Setting up webhooks for automatic deployments
2. Implementing content preview functionality
3. Adding more content types as needed
4. Setting up analytics and monitoring 