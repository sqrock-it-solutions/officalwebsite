import type { Metadata } from "next";
import { db } from "@/db";
import { jobOpenings, jobCategories } from "@/db/schema";
import {
  and,
  desc,
  eq,
  gt,
  isNull,
  or,
} from "drizzle-orm";

import { CareersHero } from "./careers-hero";
import { CareerBenefits } from "./career-benefits";
import { JobList } from "./job-list";
import { HiringProcess } from "./hiring-process";
import { ResumeCTA } from "./resume-cta";

export const metadata: Metadata = {
  title: "Careers | SQROCK IT Solutions",
  description:
    "Explore career opportunities at SQROCK IT Solutions and join a team building meaningful digital solutions.",
};

/* =========================================================
   GET ACTIVE JOBS
========================================================= */

async function getActiveJobs() {
  try {
    const now = new Date();

    const jobs = await db
      .select()
      .from(jobOpenings)
      .leftJoin(
        jobCategories,
        eq(jobOpenings.categoryId, jobCategories.id)
      )
      .where(
        and(
          eq(jobOpenings.isActive, true),

          // Show jobs when:
          // 1. No deadline is set
          // OR
          // 2. Deadline is still in the future
          or(
            isNull(jobOpenings.applicationDeadline),
            gt(jobOpenings.applicationDeadline, now)
          )
        )
      )
      .orderBy(
        desc(jobOpenings.isFeatured),
        desc(jobOpenings.createdAt)
      )
      .limit(50);

    return jobs.map((job) => ({
      ...job.job_openings,

      category: job.job_categories?.name || null,
    }));
  } catch (error) {
    console.error("Failed to fetch active jobs:", error);

    return [];
  }
}

/* =========================================================
   GET ACTIVE JOB CATEGORIES
========================================================= */

async function getJobCategories() {
  try {
    const categories = await db
      .select()
      .from(jobCategories)
      .where(eq(jobCategories.isActive, true))
      .orderBy(jobCategories.name);

    return categories;
  } catch (error) {
    console.error("Failed to fetch job categories:", error);

    return [];
  }
}

/* =========================================================
   CAREERS PAGE
========================================================= */

export default async function CareersPage() {
  const [jobs, categories] = await Promise.all([
    getActiveJobs(),
    getJobCategories(),
  ]);

  return (
    <main className="min-h-screen bg-white">
      <CareersHero />

      <CareerBenefits />

      <JobList
        initialJobs={jobs}
        categories={categories}
      />

      <HiringProcess />

      <ResumeCTA />
    </main>
  );
}