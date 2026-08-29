// app/cta/actions.ts
'use server'

import { db } from '@/db'
import { contacts } from '@/db/schema'
import { desc, sql } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

// Types
export interface CTASubmissionData {
  name: string
  email: string
  phone: string
  company: string
  description: string
}

// Submit CTA form
export async function submitCTAForm(formData: FormData) {
  try {
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const company = formData.get('company') as string
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

    if (!phone || phone.trim().length < 10) {
      return { 
        success: false, 
        message: 'Please enter a valid phone number (minimum 10 digits)' 
      }
    }

    if (!description || description.trim().length < 10) {
      return { 
        success: false, 
        message: 'Please tell us about your project (minimum 10 characters)' 
      }
    }

    // Insert into database (using contacts table)
    await db.insert(contacts).values({
      name: name.trim(),
      email: email.trim(),
      subject: `CTA Request - ${company || 'Individual'}`,
      description: `
        Company: ${company || 'Not provided'}
        Phone: ${phone || 'Not provided'}
        
        Message: 
        ${description.trim()}
      `,
    })

    revalidatePath('/')

    // Here you can also send email notification
    // await sendCTAEmail({ name, email, phone, company, description })

    return { 
      success: true, 
      message: 'Thank you! We will get back to you within 24 hours.' 
    }

  } catch (error) {
    console.error('CTA form submission error:', error)
    return { 
      success: false, 
      message: 'Something went wrong. Please try again later.' 
    }
  }
}

// Get all CTA submissions (Admin only)
export async function getCTASubmissions({
  page = 1,
  limit = 10,
}: {
  page?: number
  limit?: number
} = {}) {
  try {
    const offset = (page - 1) * limit

    // Fetch all contacts with CTA subject
    const allSubmissions = await db
      .select()
      .from(contacts)
      .where(sql`${contacts.subject} ILIKE 'CTA Request%'`)
      .orderBy(desc(contacts.createdAt))

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
    console.error('Error fetching CTA submissions:', error)
    return {
      submissions: [],
      totalCount: 0,
      totalPages: 0,
      currentPage: page,
      error: 'Failed to fetch submissions',
    }
  }
}