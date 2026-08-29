// app/navbar/actions.ts
'use server'

import { db } from '@/db'
import { contacts } from '@/db/schema'
import { desc, sql } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

// Types
export interface ConsultationData {
  name: string
  email: string
  phone: string
  company: string
  service: string
  message: string
}

// Submit consultation form from navbar
export async function submitConsultationForm(formData: FormData) {
  try {
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const company = formData.get('company') as string
    const service = formData.get('service') as string
    const message = formData.get('message') as string

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

    if (!message || message.trim().length < 10) {
      return { 
        success: false, 
        message: 'Please tell us about your project (minimum 10 characters)' 
      }
    }

    // Get service label
    const serviceLabels: Record<string, string> = {
      'web-development': 'Web Development',
      'mobile-development': 'Mobile App Development',
      'software-development': 'Custom Software Development',
      'it-consulting': 'IT Consulting & Strategy',
      'digital-marketing': 'Digital Marketing',
      'other': 'Other',
    }

    const serviceLabel = serviceLabels[service] || service || 'Not specified'

    // Insert into database
    await db.insert(contacts).values({
      name: name.trim(),
      email: email.trim(),
      subject: `Consultation Request - ${serviceLabel}`,
      description: `
        Company: ${company || 'Not provided'}
        Phone: ${phone || 'Not provided'}
        Service: ${serviceLabel}
        
        Message: 
        ${message.trim()}
      `,
    })

    revalidatePath('/')

    // Here you can also send email notification
    // await sendConsultationEmail({ name, email, phone, company, service, message })

    return { 
      success: true, 
      message: 'Thank you! We will contact you within 24 hours to schedule your consultation.' 
    }

  } catch (error) {
    console.error('Consultation form submission error:', error)
    return { 
      success: false, 
      message: 'Something went wrong. Please try again later.' 
    }
  }
}

// Get all consultation submissions (Admin only)
export async function getConsultationSubmissions({
  page = 1,
  limit = 10,
}: {
  page?: number
  limit?: number
} = {}) {
  try {
    const offset = (page - 1) * limit

    // Fetch all contacts with Consultation subject
    const allSubmissions = await db
      .select()
      .from(contacts)
      .where(sql`${contacts.subject} ILIKE 'Consultation Request%'`)
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
    console.error('Error fetching consultation submissions:', error)
    return {
      submissions: [],
      totalCount: 0,
      totalPages: 0,
      currentPage: page,
      error: 'Failed to fetch submissions',
    }
  }
}