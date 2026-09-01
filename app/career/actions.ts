"use server";

import { db } from "@/db";
import { jobApplications, jobOpenings } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const applicationSchema = z.object({
  jobOpeningId: z.number().int().positive("Job opening is required"),

  name: z
    .string()
    .trim()
    .min(1, "Name is required"),

  email: z
    .string()
    .trim()
    .email("Valid email is required"),

  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required"),

  location: z
    .string()
    .trim()
    .optional(),

  resumeUrl: z
    .string()
    .trim()
    .min(1, "Resume is required"),

  coverLetter: z
    .string()
    .trim()
    .optional(),

  portfolioUrl: z
    .string()
    .trim()
    .url("Invalid portfolio URL")
    .optional()
    .or(z.literal("")),

  linkedinUrl: z
    .string()
    .trim()
    .url("Invalid LinkedIn URL")
    .optional()
    .or(z.literal("")),

  githubUrl: z
    .string()
    .trim()
    .url("Invalid GitHub URL")
    .optional()
    .or(z.literal("")),

  experience: z
    .string()
    .trim()
    .optional(),
});

/* =========================================================
   GET ACTIVE JOB OPENINGS
========================================================= */

export async function getJobOpenings() {
  try {
    const openings = await db
      .select({
        id: jobOpenings.id,
        title: jobOpenings.title,
        slug: jobOpenings.slug,
        shortDescription: jobOpenings.shortDescription,
        description: jobOpenings.description,
        requirements: jobOpenings.requirements,
        responsibilities: jobOpenings.responsibilities,
        qualifications: jobOpenings.qualifications,
        skills: jobOpenings.skills,
        categoryId: jobOpenings.categoryId,
        employmentType: jobOpenings.employmentType,
        workMode: jobOpenings.workMode,
        location: jobOpenings.location,
        salary: jobOpenings.salary,
        experience: jobOpenings.experience,
        openings: jobOpenings.openings,
        applicationDeadline: jobOpenings.applicationDeadline,
        isActive: jobOpenings.isActive,
        isFeatured: jobOpenings.isFeatured,
        createdAt: jobOpenings.createdAt,
        updatedAt: jobOpenings.updatedAt,
      })
      .from(jobOpenings)
      .where(eq(jobOpenings.isActive, true))
      .orderBy(jobOpenings.isFeatured);

    return {
      success: true,
      data: openings,
    };
  } catch (error) {
    console.error("Failed to fetch job openings:", error);

    return {
      success: false,
      data: [],
      message: "Failed to load job openings.",
    };
  }
}

/* =========================================================
   GET SINGLE JOB OPENING
========================================================= */

export async function getJobOpeningById(jobOpeningId: number) {
  try {
    if (!Number.isInteger(jobOpeningId) || jobOpeningId <= 0) {
      return {
        success: false,
        data: null,
        message: "Invalid job opening.",
      };
    }

    const result = await db
      .select()
      .from(jobOpenings)
      .where(
        and(
          eq(jobOpenings.id, jobOpeningId),
          eq(jobOpenings.isActive, true)
        )
      )
      .limit(1);

    if (result.length === 0) {
      return {
        success: false,
        data: null,
        message: "Job opening not found.",
      };
    }

    return {
      success: true,
      data: result[0],
    };
  } catch (error) {
    console.error("Failed to fetch job opening:", error);

    return {
      success: false,
      data: null,
      message: "Failed to load job opening.",
    };
  }
}

/* =========================================================
   GET JOB OPENING BY SLUG
========================================================= */

export async function getJobOpeningBySlug(slug: string) {
  try {
    if (!slug?.trim()) {
      return {
        success: false,
        data: null,
        message: "Invalid job opening.",
      };
    }

    const result = await db
      .select()
      .from(jobOpenings)
      .where(
        and(
          eq(jobOpenings.slug, slug),
          eq(jobOpenings.isActive, true)
        )
      )
      .limit(1);

    if (result.length === 0) {
      return {
        success: false,
        data: null,
        message: "Job opening not found.",
      };
    }

    return {
      success: true,
      data: result[0],
    };
  } catch (error) {
    console.error("Failed to fetch job opening by slug:", error);

    return {
      success: false,
      data: null,
      message: "Failed to load job opening.",
    };
  }
}

/* =========================================================
   SUBMIT JOB APPLICATION
========================================================= */

export async function submitApplication(formData: FormData) {
  try {
    /* -------------------------
       Get Job Opening ID
    ------------------------- */

    const jobOpeningIdValue = formData.get("jobOpeningId");

    if (!jobOpeningIdValue) {
      return {
        success: false,
        message: "Job opening is required.",
      };
    }

    const jobOpeningId = Number(jobOpeningIdValue);

    if (!Number.isInteger(jobOpeningId) || jobOpeningId <= 0) {
      return {
        success: false,
        message: "Invalid job opening.",
      };
    }

    /* -------------------------
       Prepare Form Data
    ------------------------- */

    const rawData = {
      jobOpeningId,

      name: String(formData.get("name") || "").trim(),

      email: String(formData.get("email") || "")
        .trim()
        .toLowerCase(),

      phone: String(formData.get("phone") || "").trim(),

      location:
        String(formData.get("location") || "").trim() || undefined,

      resumeUrl: String(formData.get("resumeUrl") || "").trim(),

      coverLetter:
        String(formData.get("coverLetter") || "").trim() || undefined,

      portfolioUrl:
        String(formData.get("portfolioUrl") || "").trim() || "",

      linkedinUrl:
        String(formData.get("linkedinUrl") || "").trim() || "",

      githubUrl:
        String(formData.get("githubUrl") || "").trim() || "",

      experience:
        String(formData.get("experience") || "").trim() || undefined,
    };

    /* -------------------------
       Validate
    ------------------------- */

    const validated = applicationSchema.parse(rawData);

    /* -------------------------
       Check Job Opening
    ------------------------- */

    const jobOpening = await db
      .select({
        id: jobOpenings.id,
        title: jobOpenings.title,
        isActive: jobOpenings.isActive,
        applicationDeadline: jobOpenings.applicationDeadline,
      })
      .from(jobOpenings)
      .where(eq(jobOpenings.id, validated.jobOpeningId))
      .limit(1);

    if (jobOpening.length === 0) {
      return {
        success: false,
        message: "This job opening does not exist.",
      };
    }

    if (!jobOpening[0].isActive) {
      return {
        success: false,
        message: "This job opening is no longer active.",
      };
    }

    /* -------------------------
       Check Deadline
    ------------------------- */

    const deadline = jobOpening[0].applicationDeadline;

    if (deadline && new Date() > new Date(deadline)) {
      return {
        success: false,
        message: "The application deadline for this position has passed.",
      };
    }

    /* -------------------------
       Check Duplicate Application
    ------------------------- */

    const existing = await db
      .select({
        id: jobApplications.id,
      })
      .from(jobApplications)
      .where(
        and(
          eq(jobApplications.email, validated.email),
          eq(
            jobApplications.jobOpeningId,
            validated.jobOpeningId
          )
        )
      )
      .limit(1);

    if (existing.length > 0) {
      return {
        success: false,
        message: "You have already applied for this position.",
      };
    }

    /* -------------------------
       Insert Application
    ------------------------- */

    await db.insert(jobApplications).values({
      jobOpeningId: validated.jobOpeningId,

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

    /* -------------------------
       Revalidate Career Page
    ------------------------- */

    revalidatePath("/career");

    return {
      success: true,
      message: "Application submitted successfully!",
    };
  } catch (error) {
    /* -------------------------
       Zod Validation Error
    ------------------------- */

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message:
          error.issues[0]?.message ||
          "Please check your application details.",
      };
    }

    /* -------------------------
       Database / Unknown Error
    ------------------------- */

    console.error("Application submission error:", error);

    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}