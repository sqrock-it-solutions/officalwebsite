CREATE TABLE "account" (
	"id" text PRIMARY KEY,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "membership_plans" (
	"id" serial PRIMARY KEY,
	"name" varchar(100) NOT NULL UNIQUE,
	"slug" varchar(100) NOT NULL UNIQUE,
	"description" text,
	"price" numeric(10,2) NOT NULL,
	"currency" varchar(10) DEFAULT 'INR' NOT NULL,
	"billing_cycle" varchar(20) DEFAULT 'monthly' NOT NULL,
	"duration_in_days" integer DEFAULT 30 NOT NULL,
	"features" text,
	"max_projects" integer DEFAULT 5 NOT NULL,
	"max_service_requests" integer DEFAULT 10 NOT NULL,
	"is_popular" boolean DEFAULT false NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "membership_subscriptions" (
	"id" serial PRIMARY KEY,
	"user_id" text NOT NULL,
	"plan_id" integer NOT NULL,
	"status" varchar(30) DEFAULT 'active' NOT NULL,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"cancelled_at" timestamp with time zone,
	"auto_renew" boolean DEFAULT false NOT NULL,
	"payment_provider" varchar(50),
	"payment_id" varchar(255),
	"order_id" varchar(255),
	"amount_paid" numeric(10,2),
	"currency" varchar(10) DEFAULT 'INR' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "partner_payouts" (
	"id" serial PRIMARY KEY,
	"partner_id" integer NOT NULL,
	"amount" numeric(12,2) NOT NULL,
	"currency" varchar(10) DEFAULT 'INR' NOT NULL,
	"method" varchar(50),
	"transaction_id" varchar(255),
	"status" varchar(30) DEFAULT 'pending' NOT NULL,
	"period_start" timestamp with time zone,
	"period_end" timestamp with time zone,
	"notes" text,
	"processed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "partner_sales" (
	"id" serial PRIMARY KEY,
	"partner_id" integer NOT NULL,
	"item_type" varchar(50) DEFAULT 'service' NOT NULL,
	"service_id" integer,
	"plan_id" integer,
	"customer_user_id" text,
	"customer_name" varchar(150),
	"customer_email" varchar(255),
	"customer_phone" varchar(30),
	"sale_amount" numeric(12,2) NOT NULL,
	"currency" varchar(10) DEFAULT 'INR' NOT NULL,
	"commission_percent" numeric(5,2) NOT NULL,
	"commission_amount" numeric(12,2) NOT NULL,
	"status" varchar(30) DEFAULT 'pending' NOT NULL,
	"payment_id" varchar(255),
	"notes" text,
	"approved_at" timestamp with time zone,
	"paid_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "partners" (
	"id" serial PRIMARY KEY,
	"user_id" text NOT NULL UNIQUE,
	"plan_id" integer NOT NULL,
	"referral_code" varchar(50) NOT NULL UNIQUE,
	"status" varchar(30) DEFAULT 'pending_payment' NOT NULL,
	"total_sales" integer DEFAULT 0 NOT NULL,
	"total_earnings" numeric(12,2) DEFAULT '0' NOT NULL,
	"total_paid_out" numeric(12,2) DEFAULT '0' NOT NULL,
	"pending_payout" numeric(12,2) DEFAULT '0' NOT NULL,
	"payout_method" varchar(50),
	"payout_details" text,
	"joined_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "partnership_plans" (
	"id" serial PRIMARY KEY,
	"name" varchar(100) NOT NULL UNIQUE,
	"slug" varchar(100) NOT NULL UNIQUE,
	"description" text,
	"joining_fee" numeric(10,2) DEFAULT '0' NOT NULL,
	"currency" varchar(10) DEFAULT 'INR' NOT NULL,
	"commission_percent" numeric(5,2) DEFAULT '5.0' NOT NULL,
	"max_referrals_per_month" integer,
	"payout_cycle_days" integer DEFAULT 30 NOT NULL,
	"min_payout_amount" numeric(10,2) DEFAULT '500' NOT NULL,
	"perks" text,
	"badge" varchar(50),
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"id" serial PRIMARY KEY,
	"user_id" text NOT NULL,
	"payment_type" varchar(50) NOT NULL,
	"membership_plan_id" integer,
	"partnership_plan_id" integer,
	"membership_subscription_id" integer,
	"partner_id" integer,
	"service_id" integer,
	"user_project_id" integer,
	"amount" numeric(12,2) NOT NULL,
	"currency" varchar(10) DEFAULT 'INR' NOT NULL,
	"provider" varchar(50) DEFAULT 'razorpay' NOT NULL,
	"provider_order_id" varchar(255),
	"provider_payment_id" varchar(255),
	"provider_signature" text,
	"status" varchar(30) DEFAULT 'pending' NOT NULL,
	"failure_reason" text,
	"notes" text,
	"metadata" text,
	"paid_at" timestamp with time zone,
	"refunded_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "plan_services" (
	"id" serial PRIMARY KEY,
	"plan_id" integer NOT NULL,
	"service_id" integer NOT NULL,
	"usage_limit" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "project_messages" (
	"id" serial PRIMARY KEY,
	"project_id" integer NOT NULL,
	"sender_id" text NOT NULL,
	"message" text NOT NULL,
	"attachments" text,
	"is_read" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "service_requests" (
	"id" serial PRIMARY KEY,
	"user_id" text NOT NULL,
	"subscription_id" integer NOT NULL,
	"service_id" integer NOT NULL,
	"project_id" integer,
	"billing_cycle_start" timestamp with time zone NOT NULL,
	"billing_cycle_end" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "services" (
	"id" serial PRIMARY KEY,
	"name" varchar(150) NOT NULL UNIQUE,
	"slug" varchar(150) NOT NULL UNIQUE,
	"description" text,
	"icon" varchar(50) DEFAULT 'Code',
	"color" varchar(50) DEFAULT '#0a0a0a',
	"standalone_price" numeric(10,2),
	"membership_value" numeric(10,2),
	"delivery_days" integer DEFAULT 7 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL UNIQUE,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY,
	"name" text NOT NULL,
	"email" text NOT NULL UNIQUE,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"role" varchar(30) DEFAULT 'user' NOT NULL,
	"is_member" boolean DEFAULT false NOT NULL,
	"is_partner" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_projects" (
	"id" serial PRIMARY KEY,
	"user_id" text NOT NULL,
	"subscription_id" integer,
	"service_id" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"brief" text,
	"attachments" text,
	"status" varchar(30) DEFAULT 'pending' NOT NULL,
	"priority" varchar(20) DEFAULT 'normal' NOT NULL,
	"assigned_to" text,
	"delivery_url" text,
	"feedback" text,
	"rating" integer,
	"started_at" timestamp with time zone,
	"due_at" timestamp with time zone,
	"completed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "account_userId_idx" ON "account" ("user_id");--> statement-breakpoint
CREATE INDEX "membership_sub_userId_idx" ON "membership_subscriptions" ("user_id");--> statement-breakpoint
CREATE INDEX "membership_sub_planId_idx" ON "membership_subscriptions" ("plan_id");--> statement-breakpoint
CREATE INDEX "membership_sub_status_idx" ON "membership_subscriptions" ("status");--> statement-breakpoint
CREATE INDEX "partner_payouts_partnerId_idx" ON "partner_payouts" ("partner_id");--> statement-breakpoint
CREATE INDEX "partner_payouts_status_idx" ON "partner_payouts" ("status");--> statement-breakpoint
CREATE INDEX "partner_sales_partnerId_idx" ON "partner_sales" ("partner_id");--> statement-breakpoint
CREATE INDEX "partner_sales_status_idx" ON "partner_sales" ("status");--> statement-breakpoint
CREATE INDEX "partner_sales_customerUserId_idx" ON "partner_sales" ("customer_user_id");--> statement-breakpoint
CREATE INDEX "partners_planId_idx" ON "partners" ("plan_id");--> statement-breakpoint
CREATE INDEX "partners_status_idx" ON "partners" ("status");--> statement-breakpoint
CREATE INDEX "partners_referralCode_idx" ON "partners" ("referral_code");--> statement-breakpoint
CREATE INDEX "payments_userId_idx" ON "payments" ("user_id");--> statement-breakpoint
CREATE INDEX "payments_status_idx" ON "payments" ("status");--> statement-breakpoint
CREATE INDEX "payments_type_idx" ON "payments" ("payment_type");--> statement-breakpoint
CREATE INDEX "payments_providerOrderId_idx" ON "payments" ("provider_order_id");--> statement-breakpoint
CREATE INDEX "payments_providerPaymentId_idx" ON "payments" ("provider_payment_id");--> statement-breakpoint
CREATE UNIQUE INDEX "plan_service_unique_idx" ON "plan_services" ("plan_id","service_id");--> statement-breakpoint
CREATE INDEX "project_messages_projectId_idx" ON "project_messages" ("project_id");--> statement-breakpoint
CREATE INDEX "service_requests_userId_idx" ON "service_requests" ("user_id");--> statement-breakpoint
CREATE INDEX "service_requests_subscriptionId_idx" ON "service_requests" ("subscription_id");--> statement-breakpoint
CREATE INDEX "session_userId_idx" ON "session" ("user_id");--> statement-breakpoint
CREATE INDEX "user_projects_userId_idx" ON "user_projects" ("user_id");--> statement-breakpoint
CREATE INDEX "user_projects_status_idx" ON "user_projects" ("status");--> statement-breakpoint
CREATE INDEX "user_projects_serviceId_idx" ON "user_projects" ("service_id");--> statement-breakpoint
CREATE INDEX "verification_identifier_idx" ON "verification" ("identifier");--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "membership_subscriptions" ADD CONSTRAINT "membership_subscriptions_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "membership_subscriptions" ADD CONSTRAINT "membership_subscriptions_plan_id_membership_plans_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "membership_plans"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "partner_payouts" ADD CONSTRAINT "partner_payouts_partner_id_partners_id_fkey" FOREIGN KEY ("partner_id") REFERENCES "partners"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "partner_sales" ADD CONSTRAINT "partner_sales_partner_id_partners_id_fkey" FOREIGN KEY ("partner_id") REFERENCES "partners"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "partner_sales" ADD CONSTRAINT "partner_sales_service_id_services_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE SET NULL;--> statement-breakpoint
ALTER TABLE "partner_sales" ADD CONSTRAINT "partner_sales_plan_id_membership_plans_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "membership_plans"("id") ON DELETE SET NULL;--> statement-breakpoint
ALTER TABLE "partner_sales" ADD CONSTRAINT "partner_sales_customer_user_id_user_id_fkey" FOREIGN KEY ("customer_user_id") REFERENCES "user"("id") ON DELETE SET NULL;--> statement-breakpoint
ALTER TABLE "partners" ADD CONSTRAINT "partners_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "partners" ADD CONSTRAINT "partners_plan_id_partnership_plans_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "partnership_plans"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_membership_plan_id_membership_plans_id_fkey" FOREIGN KEY ("membership_plan_id") REFERENCES "membership_plans"("id") ON DELETE SET NULL;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_partnership_plan_id_partnership_plans_id_fkey" FOREIGN KEY ("partnership_plan_id") REFERENCES "partnership_plans"("id") ON DELETE SET NULL;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_wBCMJvovSSNi_fkey" FOREIGN KEY ("membership_subscription_id") REFERENCES "membership_subscriptions"("id") ON DELETE SET NULL;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_partner_id_partners_id_fkey" FOREIGN KEY ("partner_id") REFERENCES "partners"("id") ON DELETE SET NULL;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_service_id_services_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE SET NULL;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_user_project_id_user_projects_id_fkey" FOREIGN KEY ("user_project_id") REFERENCES "user_projects"("id") ON DELETE SET NULL;--> statement-breakpoint
ALTER TABLE "plan_services" ADD CONSTRAINT "plan_services_plan_id_membership_plans_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "membership_plans"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "plan_services" ADD CONSTRAINT "plan_services_service_id_services_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "project_messages" ADD CONSTRAINT "project_messages_project_id_user_projects_id_fkey" FOREIGN KEY ("project_id") REFERENCES "user_projects"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "project_messages" ADD CONSTRAINT "project_messages_sender_id_user_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "user"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "service_requests" ADD CONSTRAINT "service_requests_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "service_requests" ADD CONSTRAINT "service_requests_7bdubafKf1aQ_fkey" FOREIGN KEY ("subscription_id") REFERENCES "membership_subscriptions"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "service_requests" ADD CONSTRAINT "service_requests_service_id_services_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "service_requests" ADD CONSTRAINT "service_requests_project_id_user_projects_id_fkey" FOREIGN KEY ("project_id") REFERENCES "user_projects"("id") ON DELETE SET NULL;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "user_projects" ADD CONSTRAINT "user_projects_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "user_projects" ADD CONSTRAINT "user_projects_subscription_id_membership_subscriptions_id_fkey" FOREIGN KEY ("subscription_id") REFERENCES "membership_subscriptions"("id") ON DELETE SET NULL;--> statement-breakpoint
ALTER TABLE "user_projects" ADD CONSTRAINT "user_projects_service_id_services_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "user_projects" ADD CONSTRAINT "user_projects_assigned_to_user_id_fkey" FOREIGN KEY ("assigned_to") REFERENCES "user"("id") ON DELETE SET NULL;