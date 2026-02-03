import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Sanity client configuration
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-12-01',
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
});

// Image URL builder
const builder = imageUrlBuilder(client);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source);
}

// Common GROQ queries
export const queries = {
  // Get hero section data
  hero: `*[_type == "hero"][0] {
    _id,
    title,
    titleBn,
    subtitle,
    subtitleBn,
    badgeText,
    badgeTextBn,
    primaryCta,
    secondaryCta,
    trustIndicators,
    emergencyContact,
    featuredImage
  }`,

  // Get stats section data
  stats: `*[_type == "stats"][0] {
    _id,
    title,
    titleBn,
    subtitle,
    subtitleBn,
    badgeText,
    badgeTextBn,
    statistics,
    achievements
  }`,

  // Get latest blog posts
  latestPosts: `*[_type == "post" && status == "published"] | order(publishedAt desc)[0...6] {
    _id,
    title,
    titleBn,
    slug,
    publishedAt,
    excerpt,
    excerptBn,
    mainImage,
    readTime,
    "category": category->{title, titleBn, slug},
    "author": author->{name, image}
  }`,

  // Get single post by slug
  postBySlug: `*[_type == "post" && slug.current == $slug && status == "published"][0] {
    _id,
    title,
    titleBn,
    slug,
    publishedAt,
    content,
    contentBn,
    mainImage,
    excerpt,
    excerptBn,
    readTime,
    "category": category->{title, titleBn, slug},
    "author": author->{name, image, bio, bioBn}
  }`,

  // Get all published posts
  allPosts: `*[_type == "post" && status == "published"] | order(publishedAt desc) {
    _id,
    title,
    titleBn,
    slug,
    publishedAt,
    excerpt,
    excerptBn,
    mainImage,
    readTime,
    "category": category->{title, titleBn, slug},
    "author": author->{name, image}
  }`,

  // Get featured testimonials
  testimonials: `*[_type == "testimonial" && status == "published"] | order(featured desc, publishedAt desc)[0...10] {
    _id,
    name,
    nameBn,
    content,
    contentBn,
    location,
    locationBn,
    rating,
    conversionDate,
    isAnonymous,
    image,
    featured
  }`,

  // Get site settings
  siteSettings: `*[_type == "siteSettings"][0] {
    _id,
    title,
    description,
    logo,
    contactInfo,
    emergencyContacts,
    socialMedia
  }`,

  // Get categories
  categories: `*[_type == "category"] | order(title asc) {
    _id,
    title,
    titleBn,
    slug,
    description,
    descriptionBn,
    color
  }`,

  // Get authors
  authors: `*[_type == "author"] | order(name asc) {
    _id,
    name,
    bio,
    bioBn,
    image,
    email,
    role,
    roleBn,
    social
  }`
};

// Helper function to fetch data
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function sanityFetch<T = any>({
  query,
  params = {},
  tags = [],
}: {
  query: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: Record<string, any>;
  tags?: string[];
}): Promise<T> {
  return await client.fetch(query, params, {
    next: {
      tags,
    },
  });
}

// Data fetching functions for home page
export async function getHomePageData() {
  const [hero, stats, latestPosts, testimonials, siteSettings] = await Promise.all([
    sanityFetch({ query: queries.hero, params: {}, tags: ['hero'] }),
    sanityFetch({ query: queries.stats, params: {}, tags: ['stats'] }),
    sanityFetch({ query: queries.latestPosts, params: {}, tags: ['posts'] }),
    sanityFetch({ query: queries.testimonials, params: {}, tags: ['testimonials'] }),
    sanityFetch({ query: queries.siteSettings, params: {}, tags: ['siteSettings'] })
  ]);

  return {
    hero,
    stats,
    latestPosts,
    testimonials,
    siteSettings
  };
}

// Individual data fetching functions
export async function getHeroData() {
  return sanityFetch({ query: queries.hero, params: {}, tags: ['hero'] });
}

export async function getStatsData() {
  return sanityFetch({ query: queries.stats, params: {}, tags: ['stats'] });
}

export async function getLatestPosts(limit = 6) {
  return sanityFetch({
    query: `*[_type == "post" && status == "published"] | order(publishedAt desc)[0...${limit}] {
      _id,
      title,
      titleBn,
      slug,
      publishedAt,
      excerpt,
      excerptBn,
      mainImage,
      readTime,
      "category": category->{title, titleBn, slug},
      "author": author->{name, image}
    }`,
    params: {},
    tags: ['posts']
  });
}

export async function getTestimonials(limit = 10) {
  return sanityFetch({
    query: `*[_type == "testimonial" && status == "published"] | order(featured desc, publishedAt desc)[0...${limit}] {
      _id,
      name,
      nameBn,
      content,
      contentBn,
      location,
      locationBn,
      rating,
      conversionDate,
      isAnonymous,
      image,
      featured
    }`,
    params: {},
    tags: ['testimonials']
  });
}

export async function getSiteSettings() {
  return sanityFetch({ query: queries.siteSettings, params: {}, tags: ['siteSettings'] });
} 