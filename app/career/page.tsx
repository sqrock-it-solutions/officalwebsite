import { Metadata } from "next";
import { db } from "@/db";
import { jobOpenings, jobCategories } from "@/db/schema";
import { and, eq, isNotNull, lt, desc } from "drizzle-orm";
import { CareersHero } from "./careers-hero";
import { CareerBenefits } from "./career-benefits";
import { JobList } from "./job-list";
import { LifeAtSQROCK } from "./life-at-sqrock";
import { HiringProcess } from "./hiring-process";
import { ResumeCTA } from "./resume-cta";

export const metadata: Metadata = {
  title: "Careers | SQROCK IT Solutions",
  description:
    "Explore career opportunities at SQROCK IT Solutions and join a team building meaningful digital solutions.",
};

async function getActiveJobs() {
  const now = new Date();
  
  const jobs = await db
    .select()
    .from(jobOpenings)
    .leftJoin(jobCategories, eq(jobOpenings.categoryId, jobCategories.id))
    .where(
      and(
        eq(jobOpenings.isActive, true),
        isNotNull(jobOpenings.applicationDeadline),
        lt(jobOpenings.applicationDeadline, now)
      )
    )
    .orderBy(desc(jobOpenings.isFeatured), desc(jobOpenings.createdAt))
    .limit(50);

  return jobs.map((job) => ({
    ...job.job_openings,
    category: job.job_categories?.name || null,
  }));
}

async function getJobCategories() {
  const categories = await db
    .select()
    .from(jobCategories)
    .where(eq(jobCategories.isActive, true))
    .orderBy(jobCategories.name);

  return categories;
}

export default async function CareersPage() {
  const [jobs, categories] = await Promise.all([
    getActiveJobs(),
    getJobCategories(),
  ]);

  return (
    <main className="min-h-screen bg-white">
      <CareersHero />
      <CareerBenefits />
      <JobList initialJobs={jobs} categories={categories} />
      {/* <LifeAtSQROCK /> */}
      <HiringProcess />
      <ResumeCTA />
    </main>
  );
}