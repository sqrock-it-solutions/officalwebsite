// app/blog/actions.ts
'use server'

import { db } from '@/db'
import { blogs, categories } from '@/db/schema'
import { desc, eq, ilike, and, sql, count } from 'drizzle-orm'

// Types
export interface BlogPost {
  id: number
  title: string
  slug: string
  shortDescription: string | null
  content: string
  featuredImage: string | null
  author: string | null
  categoryId: number | null
  isPublished: boolean
  createdAt: Date
  updatedAt: Date
  category?: Category
}

export interface Category {
  id: number
  name: string
  slug: string
  description: string | null
  icon: string
  color: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface BlogPostWithReadTime extends BlogPost {
  readTime: string
  category: string
  categorySlug: string
  date: string
  excerpt: string
  image: string
}

// Get all published blogs with pagination and category
export async function getPublishedBlogs({
  page = 1,
  limit = 6,
  search = '',
  categorySlug = 'all',
}: {
  page?: number
  limit?: number
  search?: string
  categorySlug?: string
}) {
  try {
    const offset = (page - 1) * limit

    // Build where conditions
    let conditions = [eq(blogs.isPublished, true)]

    if (search) {
      conditions.push(
        sql`(${ilike(blogs.title, `%${search}%`)} OR ${ilike(blogs.shortDescription, `%${search}%`)} OR ${ilike(blogs.content, `%${search}%`)} OR ${ilike(blogs.author, `%${search}%`)})`
      )
    }

    // Get blogs with category join
    let query = db
      .select()
      .from(blogs)
      .leftJoin(categories, eq(blogs.categoryId, categories.id))
      .where(and(...conditions))
      .orderBy(desc(blogs.createdAt))

    // If specific category, filter
    if (categorySlug !== 'all') {
      const categoryResult = await db
        .select()
        .from(categories)
        .where(eq(categories.slug, categorySlug))
        .limit(1)

      if (categoryResult.length > 0) {
        query = db
          .select()
          .from(blogs)
          .leftJoin(categories, eq(blogs.categoryId, categories.id))
          .where(and(...conditions, eq(blogs.categoryId, categoryResult[0].id)))
          .orderBy(desc(blogs.createdAt))
      }
    }

    const results = await query

    // Get total count for pagination
    let countQuery = db
      .select({ count: count() })
      .from(blogs)
      .where(and(...conditions))

    if (categorySlug !== 'all') {
      const categoryResult = await db
        .select()
        .from(categories)
        .where(eq(categories.slug, categorySlug))
        .limit(1)

      if (categoryResult.length > 0) {
        countQuery = db
          .select({ count: count() })
          .from(blogs)
          .where(and(...conditions, eq(blogs.categoryId, categoryResult[0].id)))
      }
    }

    const totalCountResult = await countQuery
    const totalCount = totalCountResult[0]?.count || 0
    const totalPages = Math.ceil(totalCount / limit)

    // Apply pagination
    const paginatedResults = results.slice(offset, offset + limit)

    return {
      blogs: paginatedResults.map((result) => formatBlogPost(result.blogs, result.categories)),
      totalCount,
      totalPages,
      currentPage: page,
    }
  } catch (error) {
    console.error('Error fetching blogs:', error)
    return {
      blogs: [],
      totalCount: 0,
      totalPages: 0,
      currentPage: page,
      error: 'Failed to fetch blogs',
    }
  }
}

// Get all categories with counts
export async function getCategoriesWithCount() {
  try {
    const results = await db
      .select({
        id: categories.id,
        name: categories.name,
        slug: categories.slug,
        icon: categories.icon,
        color: categories.color,
        description: categories.description,
        count: count(blogs.id),
      })
      .from(categories)
      .leftJoin(blogs, eq(categories.id, blogs.categoryId))
      .where(eq(categories.isActive, true))
      .groupBy(categories.id)
      .orderBy(categories.name)

    return results.map((cat) => ({
      ...cat,
      count: Number(cat.count) || 0,
    }))
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

// Get a single blog by slug
export async function getBlogBySlug(slug: string) {
  try {
    const result = await db
      .select()
      .from(blogs)
      .leftJoin(categories, eq(blogs.categoryId, categories.id))
      .where(and(eq(blogs.slug, slug), eq(blogs.isPublished, true)))
      .limit(1)

    if (result.length === 0) {
      return null
    }

    return formatBlogPost(result[0].blogs, result[0].categories)
  } catch (error) {
    console.error('Error fetching blog:', error)
    return null
  }
}

// Get popular posts
export async function getPopularPosts(limit: number = 3) {
  try {
    const result = await db
      .select({
        title: blogs.title,
        slug: blogs.slug,
        featuredImage: blogs.featuredImage,
        createdAt: blogs.createdAt,
      })
      .from(blogs)
      .where(eq(blogs.isPublished, true))
      .orderBy(desc(blogs.createdAt))
      .limit(limit)

    return result.map((post) => ({
      title: post.title,
      date: formatDate(post.createdAt),
      image: post.featuredImage || '/placeholder-image.jpg',
      slug: post.slug,
    }))
  } catch (error) {
    console.error('Error fetching popular posts:', error)
    return []
  }
}

// Subscribe to newsletter
export async function subscribeToNewsletter(email: string) {
  try {
    if (!email || !email.includes('@')) {
      return { success: false, message: 'Invalid email address' }
    }

    // Add your newsletter subscription logic here
    return { success: true, message: 'Subscribed successfully!' }
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return { success: false, message: 'Failed to subscribe' }
  }
}

// Helper functions
function formatBlogPost(blog: any, category: any): BlogPostWithReadTime {
  return {
    ...blog,
    readTime: calculateReadTime(blog.content || ''),
    category: category?.name || 'Uncategorized',
    categorySlug: category?.slug || 'uncategorized',
    date: formatDate(blog.createdAt),
    excerpt: blog.shortDescription || extractExcerpt(blog.content || ''),
    image: blog.featuredImage || '/placeholder-image.jpg',
    categoryId: blog.categoryId,
  }
}

function calculateReadTime(content: string): string {
  const wordsPerMinute = 200
  const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  return `${Math.max(1, minutes)} min read`
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function extractExcerpt(content: string, length: number = 120): string {
  const plainText = content.replace(/<[^>]*>/g, '')
  return plainText.length > length 
    ? plainText.substring(0, length) + '...' 
    : plainText
}