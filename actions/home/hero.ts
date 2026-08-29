// app/hero/actions.ts
'use server'

import { db } from '@/db'
import { heroAnnouncement, blogs } from '@/db/schema'
import { desc, eq, and, count } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

// Types
export interface HeroData {
  id: number
  heroHeading: string
  heroSubHeading: string | null
  heroShortDescription: string | null
  heroImage: string | null
  content: string | null
  blogId: number | null
  createdAt: Date
  updatedAt: Date
}

export interface HeroDataWithStats extends HeroData {
  stats?: {
    happyClients: number
    projectsDelivered: number
    yearsExperience: number
  }
  blog?: {
    id: number
    title: string
    slug: string
    featuredImage: string | null
  } | null
}

// Get active hero content (latest published) with blog data
export async function getActiveHeroContent() {
  try {
    const result = await db
      .select()
      .from(heroAnnouncement)
      .orderBy(desc(heroAnnouncement.createdAt))
      .limit(1)

    if (result.length === 0) {
      return getDefaultHeroContent()
    }

    const heroData = result[0]
    
    // Fetch blog data if blogId exists
    let blogData = null
    if (heroData.blogId) {
      const blogResult = await db
        .select({
          id: blogs.id,
          title: blogs.title,
          slug: blogs.slug,
          featuredImage: blogs.featuredImage,
        })
        .from(blogs)
        .where(eq(blogs.id, heroData.blogId))
        .limit(1)
      
      if (blogResult.length > 0) {
        blogData = blogResult[0]
      }
    }

    return formatHeroData(heroData, blogData)
  } catch (error) {
    console.error('Error fetching hero content:', error)
    return getDefaultHeroContent()
  }
}

// Get all hero content with blog references (Admin only)
export async function getAllHeroContent({
  page = 1,
  limit = 10,
}: {
  page?: number
  limit?: number
} = {}) {
  try {
    const offset = (page - 1) * limit

    const results = await db
      .select()
      .from(heroAnnouncement)
      .orderBy(desc(heroAnnouncement.createdAt))
      .limit(limit)
      .offset(offset)

    const totalCount = await db
      .select({ count: count() })
      .from(heroAnnouncement)

    const total = totalCount[0]?.count || 0
    const totalPages = Math.ceil(total / limit)

    // Fetch blog data for each hero
    const heroContentWithBlogs = await Promise.all(
      results.map(async (item) => {
        let blogData = null
        if (item.blogId) {
          const blogResult = await db
            .select({
              id: blogs.id,
              title: blogs.title,
              slug: blogs.slug,
            })
            .from(blogs)
            .where(eq(blogs.id, item.blogId))
            .limit(1)
          if (blogResult.length > 0) {
            blogData = blogResult[0]
          }
        }
        return formatHeroData(item, blogData)
      })
    )

    return {
      heroContent: heroContentWithBlogs,
      totalCount: total,
      totalPages,
      currentPage: page,
    }
  } catch (error) {
    console.error('Error fetching all hero content:', error)
    return {
      heroContent: [],
      totalCount: 0,
      totalPages: 0,
      currentPage: page,
      error: 'Failed to fetch hero content',
    }
  }
}

// Get all blogs for dropdown (Admin only)
export async function getAllBlogsForHero() {
  try {
    const results = await db
      .select({
        id: blogs.id,
        title: blogs.title,
        slug: blogs.slug,
      })
      .from(blogs)
      .where(eq(blogs.isPublished, true))
      .orderBy(desc(blogs.createdAt))

    return results
  } catch (error) {
    console.error('Error fetching blogs for hero:', error)
    return []
  }
}

// Create new hero content with blogId (Admin only)
export async function createHeroContent(formData: FormData) {
  try {
    const heroHeading = formData.get('heroHeading') as string
    const heroSubHeading = formData.get('heroSubHeading') as string
    const heroShortDescription = formData.get('heroShortDescription') as string
    const heroImage = formData.get('heroImage') as string
    const content = formData.get('content') as string
    const blogId = formData.get('blogId') as string

    if (!heroHeading || heroHeading.trim().length < 3) {
      return {
        success: false,
        message: 'Hero heading is required (minimum 3 characters)'
      }
    }

    await db.insert(heroAnnouncement).values({
      heroHeading: heroHeading.trim(),
      heroSubHeading: heroSubHeading?.trim() || null,
      heroShortDescription: heroShortDescription?.trim() || null,
      heroImage: heroImage?.trim() || null,
      content: content?.trim() || null,
      blogId: blogId ? parseInt(blogId) : null,
    })

    revalidatePath('/')
    revalidatePath('/admin/hero')

    return {
      success: true,
      message: 'Hero content created successfully!'
    }
  } catch (error) {
    console.error('Error creating hero content:', error)
    return {
      success: false,
      message: 'Failed to create hero content'
    }
  }
}

// Update hero content with blogId (Admin only)
export async function updateHeroContent(id: number, formData: FormData) {
  try {
    const heroHeading = formData.get('heroHeading') as string
    const heroSubHeading = formData.get('heroSubHeading') as string
    const heroShortDescription = formData.get('heroShortDescription') as string
    const heroImage = formData.get('heroImage') as string
    const content = formData.get('content') as string
    const blogId = formData.get('blogId') as string

    if (!heroHeading || heroHeading.trim().length < 3) {
      return {
        success: false,
        message: 'Hero heading is required (minimum 3 characters)'
      }
    }

    await db
      .update(heroAnnouncement)
      .set({
        heroHeading: heroHeading.trim(),
        heroSubHeading: heroSubHeading?.trim() || null,
        heroShortDescription: heroShortDescription?.trim() || null,
        heroImage: heroImage?.trim() || null,
        content: content?.trim() || null,
        blogId: blogId ? parseInt(blogId) : null,
        updatedAt: new Date(),
      })
      .where(eq(heroAnnouncement.id, id))

    revalidatePath('/')
    revalidatePath('/admin/hero')

    return {
      success: true,
      message: 'Hero content updated successfully!'
    }
  } catch (error) {
    console.error('Error updating hero content:', error)
    return {
      success: false,
      message: 'Failed to update hero content'
    }
  }
}

// Delete hero content (Admin only)
export async function deleteHeroContent(id: number) {
  try {
    await db
      .delete(heroAnnouncement)
      .where(eq(heroAnnouncement.id, id))

    revalidatePath('/')
    revalidatePath('/admin/hero')

    return {
      success: true,
      message: 'Hero content deleted successfully!'
    }
  } catch (error) {
    console.error('Error deleting hero content:', error)
    return {
      success: false,
      message: 'Failed to delete hero content'
    }
  }
}

// Helper function to format hero data with default stats
function formatHeroData(data: any, blogData: any = null): HeroDataWithStats {
  return {
    ...data,
    stats: {
      happyClients: 250,
      projectsDelivered: 500,
      yearsExperience: 10,
    },
    blog: blogData || null,
  }
}

// Default hero content if nothing in DB
function getDefaultHeroContent(): HeroDataWithStats {
  return {
    id: 0,
    heroHeading: 'We Build Scalable Software for Growing Businesses',
    heroSubHeading: 'Custom Software • Web • Mobile',
    heroShortDescription: 'Custom software, web & mobile solutions to transform your ideas into powerful digital products.',
    heroImage: '/heroimg.png',
    content: null,
    blogId: null,
    blog: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    stats: {
      happyClients: 250,
      projectsDelivered: 500,
      yearsExperience: 10,
    }
  }
}