// app/actions/blog-actions.ts
"use server";

import { db } from "@/db";
import { blogs, categories } from "@/db/schema";
import { eq, and, desc, sql } from "drizzle-orm";
import { cache } from "react";

// Get single blog by slug with category
export const getBlogBySlug = cache(async (slug: string) => {
  try {
    if (!slug) {
      console.error("No slug provided");
      return null;
    }

    console.log("Attempting to fetch blog with slug:", slug);
    
    const result = await db
      .select({
        blog: blogs,
        category: categories,
      })
      .from(blogs)
      .leftJoin(categories, eq(blogs.categoryId, categories.id))
      .where(
        and(
          eq(blogs.slug, slug),
          eq(blogs.isPublished, true)
        )
      )
      .limit(1);

    console.log("Query result:", result.length > 0 ? "Found" : "Not found");
    
    if (result.length === 0) {
      return null;
    }

    return result[0];
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
});

// Get related blogs
export const getRelatedBlogs = cache(async (categoryId: number | null, currentSlug: string, limit: number = 3) => {
  try {
    if (!categoryId) return [];

    const result = await db
      .select({
        blog: blogs,
        category: categories,
      })
      .from(blogs)
      .leftJoin(categories, eq(blogs.categoryId, categories.id))
      .where(
        and(
          eq(blogs.categoryId, categoryId),
          eq(blogs.isPublished, true),
          sql`${blogs.slug} != ${currentSlug}` // Proper way to do not equal
        )
      )
      .orderBy(desc(blogs.createdAt))
      .limit(limit);

    return result;
  } catch (error) {
    console.error("Error fetching related blogs:", error);
    return [];
  }
});

// Get all published blogs
export const getAllPublishedBlogs = cache(async () => {
  try {
    const result = await db
      .select({
        blog: blogs,
        category: categories,
      })
      .from(blogs)
      .leftJoin(categories, eq(blogs.categoryId, categories.id))
      .where(eq(blogs.isPublished, true))
      .orderBy(desc(blogs.createdAt));

    return result;
  } catch (error) {
    console.error("Error fetching all blogs:", error);
    return [];
  }
});

// Get a blog by ID (for admin purposes)
export const getBlogById = cache(async (id: number) => {
  try {
    const result = await db
      .select({
        blog: blogs,
        category: categories,
      })
      .from(blogs)
      .leftJoin(categories, eq(blogs.categoryId, categories.id))
      .where(eq(blogs.id, id))
      .limit(1);

    return result[0] || null;
  } catch (error) {
    console.error("Error fetching blog by ID:", error);
    return null;
  }
});