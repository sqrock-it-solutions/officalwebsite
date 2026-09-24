import { db } from "@/db";
import {
  services,
  membershipPlans,
  planServices,
  partnershipPlans,
} from "./schema";

async function seed() {
  console.log("🌱 Seeding started...");

  // ─────────────────────────────────
  // 1. SERVICES CATALOG
  // ─────────────────────────────────
  // Yahan tu har service ka price set kar sakta hai
  const servicesData = [
  {
    name: "Web Development",
    slug: "web-development",
    description: "Custom websites, landing pages, and full-stack web apps",
    icon: "Code",
    color: "#3b82f6",
    standalonePrice: "9800.00",
    membershipValue: "500.00",
    deliveryDays: 14,
  },
  {
    name: "App Development",
    slug: "app-development",
    description: "iOS & Android mobile apps with modern UI",
    icon: "Smartphone",
    color: "#8b5cf6",
    standalonePrice: "19799.00",
    membershipValue: "2400.00",
    deliveryDays: 30,
  },
  {
    name: "Digital Marketing",
    slug: "digital-marketing",
    description: "SEO, social media marketing, and ad campaigns",
    icon: "Megaphone",
    color: "#f59e0b",
    standalonePrice: "6700.00",
    membershipValue: "400.00",
    deliveryDays: 7,
  },
  {
    name: "UI/UX Design",
    slug: "ui-ux-design",
    description: "Modern, user-friendly interface and experience design",
    icon: "Palette",
    color: "#ec4899",
    standalonePrice: "7500.00",
    membershipValue: "350.00",
    deliveryDays: 10,
  },
  {
    name: "Logo & Branding",
    slug: "logo-branding",
    description: "Logo design, brand kit, and visual identity",
    icon: "Palette",
    color: "#10b981",
    standalonePrice: "2500.00",
    membershipValue: "150.00",
    deliveryDays: 5,
  },
  {
    name: "SEO Optimization",
    slug: "seo-optimization",
    description: "On-page and off-page SEO for better rankings",
    icon: "Megaphone",
    color: "#06b6d4",
    standalonePrice: "4500.00",
    membershipValue: "300.00",
    deliveryDays: 7,
  },
];

  const insertedServices = await db
    .insert(services)
    .values(servicesData)
    .onConflictDoNothing()
    .returning();

  console.log(`✅ ${insertedServices.length} services inserted`);

  // Existing services bhi fetch kar (agar already the)
  const allServices = insertedServices.length
    ? insertedServices
    : await db.select().from(services);

  const serviceMap = new Map(allServices.map((s) => [s.slug, s.id]));

  // ─────────────────────────────────
  // 2. MEMBERSHIP PLANS
  // ─────────────────────────────────
  const plansData = [
    {
      name: "Starter",
      slug: "starter",
      description: "Perfect for individuals getting started",
      price: "299.00",
      billingCycle: "monthly",
      durationInDays: 30,
      features: JSON.stringify([
        "Access to Web Development",
        "Access to UI/UX Design",
        "5 service requests/month",
        "Priority email support",
      ]),
      maxProjects: 3,
      maxServiceRequests: 5,
      isPopular: false,
    },
    {
      name: "All Access",
      slug: "all-access",
      description: "Everything you need to grow — most popular choice",
      price: "500.00",
      billingCycle: "monthly",
      durationInDays: 30,
      features: JSON.stringify([
        "All services included",
        "Unlimited project requests",
        "Priority support",
        "Fast delivery",
        "Dedicated account manager",
      ]),
      maxProjects: 10,
      maxServiceRequests: 50,
      isPopular: true,
    },
    {
      name: "Business",
      slug: "business",
      description: "For teams and growing businesses",
      price: "1999.00",
      billingCycle: "monthly",
      durationInDays: 30,
      features: JSON.stringify([
        "Everything in All Access",
        "Multiple team members",
        "Custom integrations",
        "24/7 priority support",
        "Quarterly strategy calls",
      ]),
      maxProjects: 50,
      maxServiceRequests: 200,
      isPopular: false,
    },
  ];

  const insertedPlans = await db
    .insert(membershipPlans)
    .values(plansData)
    .onConflictDoNothing()
    .returning();

  console.log(`✅ ${insertedPlans.length} membership plans inserted`);

  const allPlans = insertedPlans.length
    ? insertedPlans
    : await db.select().from(membershipPlans);

  const planMap = new Map(allPlans.map((p) => [p.slug, p.id]));

  // ─────────────────────────────────
  // 3. PLAN ↔ SERVICE MAPPING
  // ─────────────────────────────────
  // Yahan decide kar konsa plan me konsi service included hai
  // Aur kitni baar use kar sakte hai (usage limit)

  const planServicesData = [
    // STARTER plan — sirf Web Dev + UI/UX
    {
      planId: planMap.get("starter")!,
      serviceId: serviceMap.get("web-development")!,
      usageLimit: 2,
    },
    {
      planId: planMap.get("starter")!,
      serviceId: serviceMap.get("ui-ux-design")!,
      usageLimit: 3,
    },

    // ALL ACCESS plan — sab kuch
    {
      planId: planMap.get("all-access")!,
      serviceId: serviceMap.get("web-development")!,
      usageLimit: 5,
    },
    {
      planId: planMap.get("all-access")!,
      serviceId: serviceMap.get("app-development")!,
      usageLimit: 3,
    },
    {
      planId: planMap.get("all-access")!,
      serviceId: serviceMap.get("digital-marketing")!,
      usageLimit: 5,
    },
    {
      planId: planMap.get("all-access")!,
      serviceId: serviceMap.get("ui-ux-design")!,
      usageLimit: 5,
    },
    {
      planId: planMap.get("all-access")!,
      serviceId: serviceMap.get("logo-branding")!,
      usageLimit: 10,
    },
    {
      planId: planMap.get("all-access")!,
      serviceId: serviceMap.get("seo-optimization")!,
      usageLimit: 5,
    },

    // BUSINESS plan — unlimited-ish
    {
      planId: planMap.get("business")!,
      serviceId: serviceMap.get("web-development")!,
      usageLimit: 20,
    },
    {
      planId: planMap.get("business")!,
      serviceId: serviceMap.get("app-development")!,
      usageLimit: 10,
    },
    {
      planId: planMap.get("business")!,
      serviceId: serviceMap.get("digital-marketing")!,
      usageLimit: 20,
    },
    {
      planId: planMap.get("business")!,
      serviceId: serviceMap.get("ui-ux-design")!,
      usageLimit: 20,
    },
    {
      planId: planMap.get("business")!,
      serviceId: serviceMap.get("logo-branding")!,
      usageLimit: 50,
    },
    {
      planId: planMap.get("business")!,
      serviceId: serviceMap.get("seo-optimization")!,
      usageLimit: 20,
    },
  ];

  await db.insert(planServices).values(planServicesData).onConflictDoNothing();
  console.log(`✅ Plan-service mappings inserted`);

  // ─────────────────────────────────
  // 4. PARTNERSHIP PLANS
  // ─────────────────────────────────
  const partnershipData = [
    {
      name: "Free Partner",
      slug: "free",
      description: "Start earning with 5% commission on every sale",
      joiningFee: "0",
      commissionPercent: "5.00",
      maxReferralsPerMonth: 10,
      perks: JSON.stringify([
        "5% commission",
        "Basic dashboard",
        "Email support",
      ]),
      badge: "Starter",
    },
    {
      name: "Premium Partner",
      slug: "premium",
      description: "Get 10% commission and priority support",
      joiningFee: "999.00",
      commissionPercent: "10.00",
      maxReferralsPerMonth: 50,
      perks: JSON.stringify([
        "10% commission",
        "Priority support",
        "Marketing materials",
        "Custom referral link",
      ]),
      badge: "Premium",
    },
    {
      name: "Elite Partner",
      slug: "elite",
      description: "Maximum 15% commission with dedicated manager",
      joiningFee: "4999.00",
      commissionPercent: "15.00",
      maxReferralsPerMonth: null,
      perks: JSON.stringify([
        "15% commission",
        "Dedicated account manager",
        "Custom landing pages",
        "Early payouts",
        "White-label options",
      ]),
      badge: "Elite",
    },
  ];

  await db
    .insert(partnershipPlans)
    .values(partnershipData)
    .onConflictDoNothing();

  console.log(`✅ Partnership plans inserted`);

  console.log("🎉 Seeding complete!");
  process.exit(0);
}

seed().catch((e) => {
  console.error("❌ Seed failed:", e);
  process.exit(1);
});