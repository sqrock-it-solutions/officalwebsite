// db/schema.ts
import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  boolean,
  integer,
  index,
  decimal,
  uniqueIndex,
} from "drizzle-orm/pg-core";



import { relations } from "drizzle-orm/_relations";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),

  // NEW FIELDS
  role: varchar("role", { length: 30 }).default("user").notNull(), // user, partner, admin
  isMember: boolean("is_member").default(false).notNull(),
  isPartner: boolean("is_partner").default(false).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});
export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));




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




/* =========================
   MEMBERSHIP PLANS
========================= */

export const membershipPlans = pgTable("membership_plans", {
  id: serial("id").primaryKey(),

  name: varchar("name", { length: 100 }).notNull().unique(), // e.g. "Starter", "Pro", "All-Access"

  slug: varchar("slug", { length: 100 }).notNull().unique(),

  description: text("description"),

  price: decimal("price", { precision: 10, scale: 2 }).notNull(), // 500.00

  currency: varchar("currency", { length: 10 }).default("INR").notNull(),

  billingCycle: varchar("billing_cycle", { length: 20 })
    .default("monthly")
    .notNull(), // monthly, yearly, lifetime

  durationInDays: integer("duration_in_days").default(30).notNull(),

  // JSON array of features: ["Web Dev", "App Dev", "Digital Marketing", "UI/UX"]
  features: text("features"), // ya jsonb use kar sakta hai

  maxProjects: integer("max_projects").default(5).notNull(),

  maxServiceRequests: integer("max_service_requests").default(10).notNull(),

  isPopular: boolean("is_popular").default(false).notNull(),

  isActive: boolean("is_active").default(true).notNull(),

  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});



/* =========================
   MEMBERSHIP SUBSCRIPTIONS
========================= */

export const membershipSubscriptions = pgTable(
  "membership_subscriptions",
  {
    id: serial("id").primaryKey(),

    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),

    planId: integer("plan_id")
      .notNull()
      .references(() => membershipPlans.id, { onDelete: "restrict" }),

    status: varchar("status", { length: 30 })
      .default("active")
      .notNull(), // active, expired, cancelled, pending, paused

    startedAt: timestamp("started_at", { withTimezone: true })
      .defaultNow()
      .notNull(),

    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),

    cancelledAt: timestamp("cancelled_at", { withTimezone: true }),

    autoRenew: boolean("auto_renew").default(false).notNull(),

    // Payment info (Razorpay / Stripe order id etc.)
    paymentProvider: varchar("payment_provider", { length: 50 }), // razorpay, stripe

    paymentId: varchar("payment_id", { length: 255 }),

    orderId: varchar("order_id", { length: 255 }),

    amountPaid: decimal("amount_paid", { precision: 10, scale: 2 }),

    currency: varchar("currency", { length: 10 }).default("INR").notNull(),

    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("membership_sub_userId_idx").on(table.userId),
    index("membership_sub_planId_idx").on(table.planId),
    index("membership_sub_status_idx").on(table.status),
  ],
);


/* =========================
   SERVICES CATALOG
========================= */

export const services = pgTable("services", {
  id: serial("id").primaryKey(),

  name: varchar("name", { length: 150 }).notNull().unique(), // "Web Development"

  slug: varchar("slug", { length: 150 }).notNull().unique(),

  description: text("description"),

  icon: varchar("icon", { length: 50 }).default("Code"),

  color: varchar("color", { length: 50 }).default("#0a0a0a"),

  // Individual market price (agar bina membership le to)
  standalonePrice: decimal("standalone_price", { precision: 10, scale: 2 }),

  // Membership me is service ka "value" (marketing ke liye)
  membershipValue: decimal("membership_value", { precision: 10, scale: 2 }),

  deliveryDays: integer("delivery_days").default(7).notNull(),

  isActive: boolean("is_active").default(true).notNull(),

  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});


/* =========================
   PLAN SERVICES (Many-to-Many)
========================= */

export const planServices = pgTable(
  "plan_services",
  {
    id: serial("id").primaryKey(),

    planId: integer("plan_id")
      .notNull()
      .references(() => membershipPlans.id, { onDelete: "cascade" }),

    serviceId: integer("service_id")
      .notNull()
      .references(() => services.id, { onDelete: "cascade" }),

    // Kitni baar is service ko use kar sakta hai (per cycle)
    usageLimit: integer("usage_limit").default(1).notNull(),

    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex("plan_service_unique_idx").on(table.planId, table.serviceId),
  ],
);


/* =========================
   USER PROJECTS
========================= */

export const userProjects = pgTable(
  "user_projects",
  {
    id: serial("id").primaryKey(),

    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),

    subscriptionId: integer("subscription_id").references(
      () => membershipSubscriptions.id,
      { onDelete: "set null" },
    ),

    serviceId: integer("service_id")
      .notNull()
      .references(() => services.id, { onDelete: "restrict" }),

    title: varchar("title", { length: 255 }).notNull(),

    description: text("description"),

    brief: text("brief"), // requirements, references, links

    attachments: text("attachments"), // JSON array of file urls

    status: varchar("status", { length: 30 })
      .default("pending")
      .notNull(), // pending, in_progress, review, completed, cancelled

    priority: varchar("priority", { length: 20 })
      .default("normal")
      .notNull(), // low, normal, high, urgent

    assignedTo: text("assigned_to").references(() => user.id, {
      onDelete: "set null",
    }), // internal team member

    deliveryUrl: text("delivery_url"),

    feedback: text("feedback"),

    rating: integer("rating"), // 1-5

    startedAt: timestamp("started_at", { withTimezone: true }),

    dueAt: timestamp("due_at", { withTimezone: true }),

    completedAt: timestamp("completed_at", { withTimezone: true }),

    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("user_projects_userId_idx").on(table.userId),
    index("user_projects_status_idx").on(table.status),
    index("user_projects_serviceId_idx").on(table.serviceId),
  ],
);


/* =========================
   PROJECT MESSAGES
========================= */

export const projectMessages = pgTable(
  "project_messages",
  {
    id: serial("id").primaryKey(),

    projectId: integer("project_id")
      .notNull()
      .references(() => userProjects.id, { onDelete: "cascade" }),

    senderId: text("sender_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),

    message: text("message").notNull(),

    attachments: text("attachments"), // JSON array

    isRead: boolean("is_read").default(false).notNull(),

    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [index("project_messages_projectId_idx").on(table.projectId)],
);


/* =========================
   PARTNERSHIP PLANS
========================= */

export const partnershipPlans = pgTable("partnership_plans", {
  id: serial("id").primaryKey(),

  name: varchar("name", { length: 100 }).notNull().unique(), // Free, Premium, Elite

  slug: varchar("slug", { length: 100 }).notNull().unique(),

  description: text("description"),

  // Joining fee (0 for free plan)
  joiningFee: decimal("joining_fee", { precision: 10, scale: 2 })
  .default("0")
  .notNull(),
  currency: varchar("currency", { length: 10 }).default("INR").notNull(),

  // Commission on each sale
  commissionPercent: decimal("commission_percent", {
    precision: 5,
    scale: 2,
  })
    .default("5.0")
    .notNull(), // 5.00, 10.00, 15.00

  // Extra benefits
  maxReferralsPerMonth: integer("max_referrals_per_month"), // null = unlimited

  payoutCycleDays: integer("payout_cycle_days").default(30).notNull(),

  minPayoutAmount: decimal("min_payout_amount", { precision: 10, scale: 2 })
    .default("500")
    .notNull(),

  perks: text("perks"), // JSON array

  badge: varchar("badge", { length: 50 }), // "Verified", "Gold", "Elite"

  isActive: boolean("is_active").default(true).notNull(),

  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});



/* =========================
   PARTNERS
========================= */

export const partners = pgTable(
  "partners",
  {
    id: serial("id").primaryKey(),

    userId: text("user_id")
      .notNull()
      .unique()
      .references(() => user.id, { onDelete: "cascade" }),

    planId: integer("plan_id")
      .notNull()
      .references(() => partnershipPlans.id, { onDelete: "restrict" }),

    // Unique referral code for sharing
    referralCode: varchar("referral_code", { length: 50 }).notNull().unique(),

    status: varchar("status", { length: 30 })
      .default("pending_payment")
      .notNull(), // active, suspended, banned, pending

    // Stats (denormalized for quick read)
    totalSales: integer("total_sales").default(0).notNull(),

    totalEarnings: decimal("total_earnings", { precision: 12, scale: 2 })
      .default("0")
      .notNull(),

    totalPaidOut: decimal("total_paid_out", { precision: 12, scale: 2 })
      .default("0")
      .notNull(),

    pendingPayout: decimal("pending_payout", { precision: 12, scale: 2 })
      .default("0")
      .notNull(),

    // Payment details for payouts
    payoutMethod: varchar("payout_method", { length: 50 }), // upi, bank

    payoutDetails: text("payout_details"), // JSON: { upi: "...", bank: "..." }

    joinedAt: timestamp("joined_at", { withTimezone: true })
      .defaultNow()
      .notNull(),

    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("partners_planId_idx").on(table.planId),
    index("partners_status_idx").on(table.status),
    index("partners_referralCode_idx").on(table.referralCode),
  ],
);


/* =========================
   PARTNER SALES / REFERRALS
========================= */

export const partnerSales = pgTable(
  "partner_sales",
  {
    id: serial("id").primaryKey(),

    partnerId: integer("partner_id")
      .notNull()
      .references(() => partners.id, { onDelete: "cascade" }),

    // Kis service ya plan ko becha
    itemType: varchar("item_type", { length: 50 })
      .default("service")
      .notNull(), // service, membership_plan, partnership_plan, custom

    serviceId: integer("service_id").references(() => services.id, {
      onDelete: "set null",
    }),

    planId: integer("plan_id").references(() => membershipPlans.id, {
      onDelete: "set null",
    }),

    // Customer info (agar registered user hai to userId, warna guest info)
    customerUserId: text("customer_user_id").references(() => user.id, {
      onDelete: "set null",
    }),

    customerName: varchar("customer_name", { length: 150 }),

    customerEmail: varchar("customer_email", { length: 255 }),

    customerPhone: varchar("customer_phone", { length: 30 }),

    // Amount details
    saleAmount: decimal("sale_amount", {
      precision: 12,
      scale: 2,
    }).notNull(),

    currency: varchar("currency", { length: 10 }).default("INR").notNull(),

    commissionPercent: decimal("commission_percent", {
      precision: 5,
      scale: 2,
    }).notNull(),

    commissionAmount: decimal("commission_amount", {
      precision: 12,
      scale: 2,
    }).notNull(),

    // Status
    status: varchar("status", { length: 30 })
      .default("pending")
      .notNull(), // pending, approved, paid, rejected, refunded

    paymentId: varchar("payment_id", { length: 255 }),

    notes: text("notes"),

    approvedAt: timestamp("approved_at", { withTimezone: true }),

    paidAt: timestamp("paid_at", { withTimezone: true }),

    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("partner_sales_partnerId_idx").on(table.partnerId),
    index("partner_sales_status_idx").on(table.status),
    index("partner_sales_customerUserId_idx").on(table.customerUserId),
  ],
);

/* =========================
   PARTNER PAYOUTS
========================= */

export const partnerPayouts = pgTable(
  "partner_payouts",
  {
    id: serial("id").primaryKey(),

    partnerId: integer("partner_id")
      .notNull()
      .references(() => partners.id, { onDelete: "cascade" }),

    amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),

    currency: varchar("currency", { length: 10 }).default("INR").notNull(),

    method: varchar("method", { length: 50 }), // upi, bank, paypal

    transactionId: varchar("transaction_id", { length: 255 }),

    status: varchar("status", { length: 30 })
      .default("pending")
      .notNull(), // pending, processing, completed, failed

    periodStart: timestamp("period_start", { withTimezone: true }),

    periodEnd: timestamp("period_end", { withTimezone: true }),

    notes: text("notes"),

    processedAt: timestamp("processed_at", { withTimezone: true }),

    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("partner_payouts_partnerId_idx").on(table.partnerId),
    index("partner_payouts_status_idx").on(table.status),
  ],
);


/* =========================
   SERVICE REQUESTS (Usage Tracking)
========================= */

export const serviceRequests = pgTable(
  "service_requests",
  {
    id: serial("id").primaryKey(),

    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),

    subscriptionId: integer("subscription_id")
      .notNull()
      .references(() => membershipSubscriptions.id, { onDelete: "cascade" }),

    serviceId: integer("service_id")
      .notNull()
      .references(() => services.id, { onDelete: "restrict" }),

    projectId: integer("project_id").references(() => userProjects.id, {
      onDelete: "set null",
    }),

    // Billing cycle me count karne ke liye
    billingCycleStart: timestamp("billing_cycle_start", {
      withTimezone: true,
    }).notNull(),

    billingCycleEnd: timestamp("billing_cycle_end", {
      withTimezone: true,
    }).notNull(),

    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("service_requests_userId_idx").on(table.userId),
    index("service_requests_subscriptionId_idx").on(table.subscriptionId),
  ],
);


/* =========================
   RELATIONS
========================= */

export const membershipPlansRelations = relations(
  membershipPlans,
  ({ many }) => ({
    subscriptions: many(membershipSubscriptions),
    planServices: many(planServices),
  }),
);

export const membershipSubscriptionsRelations = relations(
  membershipSubscriptions,
  ({ one, many }) => ({
    user: one(user, {
      fields: [membershipSubscriptions.userId],
      references: [user.id],
    }),
    plan: one(membershipPlans, {
      fields: [membershipSubscriptions.planId],
      references: [membershipPlans.id],
    }),
    projects: many(userProjects),
    serviceRequests: many(serviceRequests),
  }),
);

export const servicesRelations = relations(services, ({ many }) => ({
  planServices: many(planServices),
  projects: many(userProjects),
}));

export const planServicesRelations = relations(planServices, ({ one }) => ({
  plan: one(membershipPlans, {
    fields: [planServices.planId],
    references: [membershipPlans.id],
  }),
  service: one(services, {
    fields: [planServices.serviceId],
    references: [services.id],
  }),
}));

export const userProjectsRelations = relations(
  userProjects,
  ({ one, many }) => ({
    user: one(user, {
      fields: [userProjects.userId],
      references: [user.id],
    }),
    service: one(services, {
      fields: [userProjects.serviceId],
      references: [services.id],
    }),
    subscription: one(membershipSubscriptions, {
      fields: [userProjects.subscriptionId],
      references: [membershipSubscriptions.id],
    }),
    messages: many(projectMessages),
  }),
);

export const projectMessagesRelations = relations(
  projectMessages,
  ({ one }) => ({
    project: one(userProjects, {
      fields: [projectMessages.projectId],
      references: [userProjects.id],
    }),
    sender: one(user, {
      fields: [projectMessages.senderId],
      references: [user.id],
    }),
  }),
);

export const partnershipPlansRelations = relations(
  partnershipPlans,
  ({ many }) => ({
    partners: many(partners),
  }),
);

export const partnersRelations = relations(partners, ({ one, many }) => ({
  user: one(user, {
    fields: [partners.userId],
    references: [user.id],
  }),
  plan: one(partnershipPlans, {
    fields: [partners.planId],
    references: [partnershipPlans.id],
  }),
  sales: many(partnerSales),
  payouts: many(partnerPayouts),
}));

export const partnerSalesRelations = relations(partnerSales, ({ one }) => ({
  partner: one(partners, {
    fields: [partnerSales.partnerId],
    references: [partners.id],
  }),
  service: one(services, {
    fields: [partnerSales.serviceId],
    references: [services.id],
  }),
  plan: one(membershipPlans, {
    fields: [partnerSales.planId],
    references: [membershipPlans.id],
  }),
  customer: one(user, {
    fields: [partnerSales.customerUserId],
    references: [user.id],
  }),
}));

export const partnerPayoutsRelations = relations(
  partnerPayouts,
  ({ one }) => ({
    partner: one(partners, {
      fields: [partnerPayouts.partnerId],
      references: [partners.id],
    }),
  }),
);




/* =========================
   PAYMENTS
========================= */

export const payments = pgTable(
  "payments",
  {
    id: serial("id").primaryKey(),

    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),

    // Kis type ka payment hai
    paymentType: varchar("payment_type", { length: 50 })
      .notNull(), // membership, partnership, service, custom

    // Related IDs (jo bhi applicable ho)
    membershipPlanId: integer("membership_plan_id").references(
      () => membershipPlans.id,
      { onDelete: "set null" },
    ),

    partnershipPlanId: integer("partnership_plan_id").references(
      () => partnershipPlans.id,
      { onDelete: "set null" },
    ),

    membershipSubscriptionId: integer("membership_subscription_id").references(
      () => membershipSubscriptions.id,
      { onDelete: "set null" },
    ),

    partnerId: integer("partner_id").references(() => partners.id, {
      onDelete: "set null",
    }),

    serviceId: integer("service_id").references(() => services.id, {
      onDelete: "set null",
    }),

    userProjectId: integer("user_project_id").references(
      () => userProjects.id,
      { onDelete: "set null" },
    ),

    // Payment details
    amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),

    currency: varchar("currency", { length: 10 }).default("INR").notNull(),

    // Payment provider info
    provider: varchar("provider", { length: 50 })
      .default("razorpay")
      .notNull(), // razorpay, stripe, cashfree

    providerOrderId: varchar("provider_order_id", { length: 255 }),

    providerPaymentId: varchar("provider_payment_id", { length: 255 }),

    providerSignature: text("provider_signature"),

    // Status
    status: varchar("status", { length: 30 })
      .default("pending")
      .notNull(), // pending, processing, success, failed, refunded, cancelled

    failureReason: text("failure_reason"),

    // Metadata
    notes: text("notes"), // JSON

    metadata: text("metadata"), // JSON — raw provider response

    // Timestamps
    paidAt: timestamp("paid_at", { withTimezone: true }),

    refundedAt: timestamp("refunded_at", { withTimezone: true }),

    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("payments_userId_idx").on(table.userId),
    index("payments_status_idx").on(table.status),
    index("payments_type_idx").on(table.paymentType),
    index("payments_providerOrderId_idx").on(table.providerOrderId),
    index("payments_providerPaymentId_idx").on(table.providerPaymentId),
  ],
);



export const paymentsRelations = relations(payments, ({ one }) => ({
  user: one(user, {
    fields: [payments.userId],
    references: [user.id],
  }),
  membershipPlan: one(membershipPlans, {
    fields: [payments.membershipPlanId],
    references: [membershipPlans.id],
  }),
  partnershipPlan: one(partnershipPlans, {
    fields: [payments.partnershipPlanId],
    references: [partnershipPlans.id],
  }),
  membershipSubscription: one(membershipSubscriptions, {
    fields: [payments.membershipSubscriptionId],
    references: [membershipSubscriptions.id],
  }),
  partner: one(partners, {
    fields: [payments.partnerId],
    references: [partners.id],
  }),
  service: one(services, {
    fields: [payments.serviceId],
    references: [services.id],
  }),
}));

// userRelations me bhi add kar:
// payments: many(payments),