// Base Sanity types
export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

export interface SanitySlug {
  _type: 'slug'
  current: string
}

// Site Settings
export interface SiteSettings {
  _id: string
  _type: 'siteSettings'
  title: string
  description?: string
  logo?: SanityImage
  contactInfo?: {
    phone?: string
    email?: string
    address?: string
  }
  emergencyContacts?: Array<{
    name: string
    phone: string
    description: string
  }>
  socialMedia?: {
    facebook?: string
    twitter?: string
    instagram?: string
    youtube?: string
  }
}

// Hero Section
export interface Hero {
  _id: string
  _type: 'hero'
  title: string
  titleBn: string
  subtitle: string
  subtitleBn: string
  badgeText?: string
  badgeTextBn?: string
  primaryCta?: {
    text: string
    textBn: string
    link: string
  }
  secondaryCta?: {
    text: string
    textBn: string
    link: string
  }
  trustIndicators?: Array<{
    text: string
    textBn: string
    value: string
  }>
  emergencyContact?: {
    title: string
    titleBn: string
    phone: string
  }
  featuredImage?: SanityImage
}

// Stats Section
export interface Stats {
  _id: string
  _type: 'stats'
  title: string
  titleBn: string
  subtitle?: string
  subtitleBn?: string
  badgeText?: string
  badgeTextBn?: string
  statistics?: Array<{
    value: string
    suffix?: string
    label: string
    labelBn: string
    description?: string
    descriptionBn?: string
    icon?: string
    gradient?: string
  }>
  achievements?: Array<{
    title: string
    titleBn: string
    description?: string
    descriptionBn?: string
    icon?: string
    gradient?: string
  }>
}

// Category
export interface Category {
  _id: string
  _type: 'category'
  title: string
  titleBn: string
  slug: SanitySlug
  description?: string
  descriptionBn?: string
  color?: string
}

// Author
export interface Author {
  _id: string
  _type: 'author'
  name: string
  bio?: string
  bioBn?: string
  image?: SanityImage
  email?: string
  role?: string
  roleBn?: string
  social?: {
    facebook?: string
    twitter?: string
    linkedin?: string
  }
}

// Blog Post
export interface Post {
  _id: string
  _type: 'post'
  title: string
  titleBn: string
  slug: SanitySlug
  excerpt: string
  excerptBn: string
  content?: any[] // PortableText
  contentBn?: any[] // PortableText
  mainImage?: SanityImage
  category?: Category
  author?: Author
  publishedAt: string
  readTime: number
  featured?: boolean
  status: 'draft' | 'published'
}

// Testimonial
export interface Testimonial {
  _id: string
  _type: 'testimonial'
  name: string
  nameBn: string
  location: string
  locationBn: string
  content: string
  contentBn: string
  rating: number
  conversionDate: string
  isAnonymous?: boolean
  image?: SanityImage
  featured?: boolean
  status: 'draft' | 'published'
}

// Home page data
export interface HomePageData {
  hero: Hero
  stats: Stats
  latestPosts: Post[]
  testimonials: Testimonial[]
  siteSettings: SiteSettings
} 