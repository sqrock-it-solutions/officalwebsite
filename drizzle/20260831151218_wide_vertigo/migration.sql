CREATE TABLE "job_applications" (
	"id" serial PRIMARY KEY,
	"job_opening_id" integer NOT NULL,
	"name" varchar(150) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(30),
	"location" varchar(150),
	"resume_url" text,
	"cover_letter" text,
	"portfolio_url" text,
	"linkedin_url" text,
	"github_url" text,
	"experience" varchar(100),
	"status" varchar(50) DEFAULT 'Applied' NOT NULL,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "job_categories" (
	"id" serial PRIMARY KEY,
	"name" varchar(100) NOT NULL UNIQUE,
	"slug" varchar(100) NOT NULL UNIQUE,
	"description" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "job_openings" (
	"id" serial PRIMARY KEY,
	"title" varchar(200) NOT NULL,
	"slug" varchar(200) NOT NULL UNIQUE,
	"short_description" text,
	"description" text NOT NULL,
	"requirements" text,
	"responsibilities" text,
	"qualifications" text,
	"skills" text,
	"category_id" integer,
	"employment_type" varchar(50) DEFAULT 'Full-time' NOT NULL,
	"work_mode" varchar(50) DEFAULT 'On-site' NOT NULL,
	"location" varchar(150),
	"salary" varchar(100),
	"experience" varchar(100),
	"openings" integer DEFAULT 1 NOT NULL,
	"application_deadline" timestamp with time zone,
	"is_active" boolean DEFAULT true NOT NULL,
	"is_featured" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "hero_announcement" ADD COLUMN "blog_id" integer;--> statement-breakpoint
ALTER TABLE "hero_announcement" ADD CONSTRAINT "hero_announcement_blog_id_blogs_id_fkey" FOREIGN KEY ("blog_id") REFERENCES "blogs"("id") ON DELETE SET NULL;--> statement-breakpoint
ALTER TABLE "job_applications" ADD CONSTRAINT "job_applications_job_opening_id_job_openings_id_fkey" FOREIGN KEY ("job_opening_id") REFERENCES "job_openings"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "job_openings" ADD CONSTRAINT "job_openings_category_id_job_categories_id_fkey" FOREIGN KEY ("category_id") REFERENCES "job_categories"("id") ON DELETE SET NULL;