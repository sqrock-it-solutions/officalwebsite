// db/schema.ts
import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  boolean,
  integer,
} from "drizzle-orm/pg-core";

/* =========================
   BLOGS
========================= */

export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),

  title: varchar("title", { length: 255 }).notNull(),

  slug: varchar("slug", { length: 255 }).notNull().unique(),

  shortDescription: text("short_description"),

  content: text("content").notNull(),

  featuredImage: text("featured_image"),

  author: varchar("author", { length: 150 }),

  categoryId: integer("category_id").references(() => categories.id),

  isPublished: boolean("is_published").default(false).notNull(),

  createdAt: timestamp("created_at", {
    withTimezone: true,
  }).defaultNow().notNull(),

  updatedAt: timestamp("updated_at", {
    withTimezone: true,
  }).defaultNow().notNull(),
});

/* =========================
   CATEGORIES
========================= */

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),

  name: varchar("name", { length: 100 }).notNull().unique(),

  slug: varchar("slug", { length: 100 }).notNull().unique(),

  description: text("description"),

  icon: varchar("icon", { length: 50 }).default('Cpu'), // Icon name from lucide-react

  color: varchar("color", { length: 50 }).default('#0a0a0a'),

  isActive: boolean("is_active").default(true).notNull(),

  createdAt: timestamp("created_at", {
    withTimezone: true,
  }).defaultNow().notNull(),

  updatedAt: timestamp("updated_at", {
    withTimezone: true,
  }).defaultNow().notNull(),
});

/* =========================
   BLOG CATEGORIES (Many-to-Many - if needed)
========================= */

// If a blog can have multiple categories, use this
// export const blogCategories = pgTable("blog_categories", {
//   id: serial("id").primaryKey(),
//   blogId: integer("blog_id").references(() => blogs.id).notNull(),
//   categoryId: integer("category_id").references(() => categories.id).notNull(),
//   createdAt: timestamp("created_at", {
//     withTimezone: true,
//   }).defaultNow().notNull(),
// });

/* =========================
   CONTACTS
========================= */

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),

  name: varchar("name", { length: 150 }).notNull(),

  email: varchar("email", { length: 255 }).notNull(),

  subject: varchar("subject", { length: 255 }).notNull(),

  description: text("description").notNull(),

  createdAt: timestamp("created_at", {
    withTimezone: true,
  }).defaultNow().notNull(),
});

/* =========================
   EMAILS
========================= */

export const emails = pgTable("emails", {
  id: serial("id").primaryKey(),

  sendTo: varchar("send_to", { length: 255 }).notNull(),

  subject: varchar("subject", { length: 255 }).notNull(),

  emailContent: text("email_content").notNull(),

  note: text("note"),

  createdAt: timestamp("created_at", {
    withTimezone: true,
  }).defaultNow().notNull(),
});

/* =========================
   HERO ANNOUNCEMENT
========================= */
export const heroAnnouncement = pgTable("hero_announcement", {
  id: serial("id").primaryKey(),

  heroHeading: varchar("hero_heading", {
    length: 255,
  }).notNull(),

  heroSubHeading: varchar("hero_sub_heading", {
    length: 255,
  }),

  heroShortDescription: text("hero_short_description"),

  heroImage: text("hero_image"),

  content: text("content"),

  blogId: integer("blog_id").references(() => blogs.id, {
    onDelete: "set null",
  }),

  createdAt: timestamp("created_at", {
    withTimezone: true,
  }).defaultNow().notNull(),

  updatedAt: timestamp("updated_at", {
    withTimezone: true,
  }).defaultNow().notNull(),
});




/* =========================
   JOB CATEGORIES
========================= */

export const jobCategories = pgTable("job_categories", {
  id: serial("id").primaryKey(),

  name: varchar("name", { length: 100 }).notNull().unique(),

  slug: varchar("slug", { length: 100 }).notNull().unique(),

  description: text("description"),

  isActive: boolean("is_active").default(true).notNull(),

  createdAt: timestamp("created_at", {
    withTimezone: true,
  }).defaultNow().notNull(),

  updatedAt: timestamp("updated_at", {
    withTimezone: true,
  }).defaultNow().notNull(),
});


/* =========================
   JOB OPENINGS
========================= */

export const jobOpenings = pgTable("job_openings", {
  id: serial("id").primaryKey(),

  title: varchar("title", { length: 200 }).notNull(),

  slug: varchar("slug", { length: 200 }).notNull().unique(),

  shortDescription: text("short_description"),

  description: text("description").notNull(),

  requirements: text("requirements"),

  responsibilities: text("responsibilities"),

  qualifications: text("qualifications"),

  skills: text("skills"),

  categoryId: integer("category_id").references(
    () => jobCategories.id,
    {
      onDelete: "set null",
    }
  ),

  employmentType: varchar("employment_type", {
    length: 50,
  }).default("Full-time").notNull(),

  workMode: varchar("work_mode", {
    length: 50,
  }).default("On-site").notNull(),

  location: varchar("location", {
    length: 150,
  }),

  salary: varchar("salary", {
    length: 100,
  }),

  experience: varchar("experience", {
    length: 100,
  }),

  openings: integer("openings").default(1).notNull(),

  applicationDeadline: timestamp("application_deadline", {
    withTimezone: true,
  }),

  isActive: boolean("is_active").default(true).notNull(),

  isFeatured: boolean("is_featured").default(false).notNull(),

  createdAt: timestamp("created_at", {
    withTimezone: true,
  }).defaultNow().notNull(),

  updatedAt: timestamp("updated_at", {
    withTimezone: true,
  }).defaultNow().notNull(),
});


/* =========================
   JOB APPLICATIONS
========================= */

export const jobApplications = pgTable("job_applications", {
  id: serial("id").primaryKey(),

  jobOpeningId: integer("job_opening_id")
    .references(() => jobOpenings.id, {
      onDelete: "cascade",
    })
    .notNull(),

  name: varchar("name", {
    length: 150,
  }).notNull(),

  email: varchar("email", {
    length: 255,
  }).notNull(),

  phone: varchar("phone", {
    length: 30,
  }),

  location: varchar("location", {
    length: 150,
  }),

  resumeUrl: text("resume_url"),

  coverLetter: text("cover_letter"),

  portfolioUrl: text("portfolio_url"),

  linkedinUrl: text("linkedin_url"),

  githubUrl: text("github_url"),

  experience: varchar("experience", {
    length: 100,
  }),

  status: varchar("status", {
    length: 50,
  }).default("Applied").notNull(),

  notes: text("notes"),

  createdAt: timestamp("created_at", {
    withTimezone: true,
  }).defaultNow().notNull(),

  updatedAt: timestamp("updated_at", {
    withTimezone: true,
  }).defaultNow().notNull(),
});

