// app/contact/actions.ts
'use server'

import { db } from '@/db'
import { contacts } from '@/db/schema'
import { eq, desc, sql } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

// Types
export interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject: string
  description: string
}

export interface ContactSubmission extends ContactFormData {
  id: number
  createdAt: Date
}

// Submit contact form
export async function submitContactForm(formData: FormData) {
  try {
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const subject = formData.get('subject') as string
    const description = formData.get('description') as string

    // Validation
    if (!name || name.trim().length < 2) {
      return { 
        success: false, 
        message: 'Please enter your full name (minimum 2 characters)' 
      }
    }

    if (!email || !email.includes('@') || !email.includes('.')) {
      return { 
        success: false, 
        message: 'Please enter a valid email address' 
      }
    }

    if (!subject || subject.trim().length < 3) {
      return { 
        success: false, 
        message: 'Please enter a subject (minimum 3 characters)' 
      }
    }

    if (!description || description.trim().length < 10) {
      return { 
        success: false, 
        message: 'Please enter your message (minimum 10 characters)' 
      }
    }

    // Insert into database
    await db.insert(contacts).values({
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      description: description.trim(),
    })

    // Revalidate the contact page to show updated data
    revalidatePath('/contact')

    // Here you can also send email notification
    // await sendContactEmail({ name, email, subject, description })

    return { 
      success: true, 
      message: 'Thank you for your message! We will get back to you soon.' 
    }

  } catch (error) {
    console.error('Contact form submission error:', error)
    return { 
      success: false, 
      message: 'Something went wrong. Please try again later.' 
    }
  }
}

// Get all contact submissions (Admin only)
export async function getContactSubmissions({
  page = 1,
  limit = 10,
  search = '',
}: {
  page?: number
  limit?: number
  search?: string
} = {}) {
  try {
    const offset = (page - 1) * limit

    let query = db
      .select()
      .from(contacts)
      .orderBy(desc(contacts.createdAt))

    // If search is provided, filter by name, email, or subject
    if (search) {
      let query = db
        .select()
        .from(contacts)
        .where(
          sql`${contacts.name} ILIKE ${`%${search}%`} OR 
              ${contacts.email} ILIKE ${`%${search}%`} OR 
              ${contacts.subject} ILIKE ${`%${search}%`}`
        )
        .orderBy(desc(contacts.createdAt))
    }

    const allSubmissions = await query
    const totalCount = allSubmissions.length
    const totalPages = Math.ceil(totalCount / limit)

    const paginatedSubmissions = allSubmissions.slice(offset, offset + limit)

    return {
      submissions: paginatedSubmissions,
      totalCount,
      totalPages,
      currentPage: page,
    }
  } catch (error) {
    console.error('Error fetching contact submissions:', error)
    return {
      submissions: [],
      totalCount: 0,
      totalPages: 0,
      currentPage: page,
      error: 'Failed to fetch submissions',
    }
  }
}

// Get a single contact submission by ID (Admin only)
export async function getContactSubmissionById(id: number) {
  try {
    const result = await db
      .select()
      .from(contacts)
      .where(eq(contacts.id, id))
      .limit(1)

    return result[0] || null
  } catch (error) {
    console.error('Error fetching contact submission:', error)
    return null
  }
}

// Delete a contact submission (Admin only)
export async function deleteContactSubmission(id: number) {
  try {
    await db
      .delete(contacts)
      .where(eq(contacts.id, id))

    revalidatePath('/contact')
    revalidatePath('/admin/contacts')

    return { success: true, message: 'Submission deleted successfully' }
  } catch (error) {
    console.error('Error deleting contact submission:', error)
    return { success: false, message: 'Failed to delete submission' }
  }
}

// Mark as read (if you add a read status column)
// export async function markContactAsRead(id: number) {
//   try {
//     await db
//       .update(contacts)
//       .set({ isRead: true })
//       .where(eq(contacts.id, id))
//
//     revalidatePath('/admin/contacts')
//     return { success: true }
//   } catch (error) {
//     console.error('Error marking contact as read:', error)
//     return { success: false }
//   }
// }