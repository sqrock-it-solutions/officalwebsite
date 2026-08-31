"use server";

import { db } from "@/db";
import { jobApplications } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const applicationSchema = z.object({
  jobOpeningId: z.number().nullable().optional(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone number is required"),
  location: z.string().optional(),
  resumeUrl: z.string().min(1, "Resume is required"),
  coverLetter: z.string().optional(),
  portfolioUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  linkedinUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  githubUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  experience: z.string().optional(),
});

export async function submitApplication(formData: FormData) {
  try {
    const rawData = {
      jobOpeningId: formData.get("jobOpeningId") 
        ? parseInt(formData.get("jobOpeningId") as string) 
        : null,
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      location: formData.get("location") || undefined,
      resumeUrl: formData.get("resumeUrl"),
      coverLetter: formData.get("coverLetter") || undefined,
      portfolioUrl: formData.get("portfolioUrl") || undefined,
      linkedinUrl: formData.get("linkedinUrl") || undefined,
      githubUrl: formData.get("githubUrl") || undefined,
      experience: formData.get("experience") || undefined,
    };

    // Validate data
    const validated = applicationSchema.parse(rawData);

    // Check for duplicate submissions (same email and job)
    if (validated.jobOpeningId) {
      const existing = await db
        .select()
        .from(jobApplications)
        .where(
          and(
            eq(jobApplications.email, validated.email),
            eq(jobApplications.jobOpeningId, validated.jobOpeningId)
          )
        )
        .limit(1);

      if (existing.length > 0) {
        return {
          success: false,
          message: "You have already applied for this position.",
        };
      }
    }

    // Insert application
    await db.insert(jobApplications).values({
      jobOpeningId: validated.jobOpeningId || undefined,
      name: validated.name,
      email: validated.email,
      phone: validated.phone,
      location: validated.location || null,
      resumeUrl: validated.resumeUrl,
      coverLetter: validated.coverLetter || null,
      portfolioUrl: validated.portfolioUrl || null,
      linkedinUrl: validated.linkedinUrl || null,
      githubUrl: validated.githubUrl || null,
      experience: validated.experience || null,
      status: "Applied",
    });

    revalidatePath("/carrier");

    return {
      success: true,
      message: "Application submitted successfully!",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: (error as any).errors[0]?.message || "Validation error",
      };
    }

    console.error("Application submission error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}