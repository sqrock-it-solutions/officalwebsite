import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import {
  services,
  membershipSubscriptions,
  membershipPlans,
  planServices,
  userProjects,
} from "@/db/schema";
import { eq, and, desc, sql } from "drizzle-orm";
import { ServicesClient } from "./components/services-client";

export default async function ServicesPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session!.user.id;

  // ─────────────────────────────────
  // 1. All active services
  // ─────────────────────────────────
  const allServices = await db
    .select()
    .from(services)
    .where(eq(services.isActive, true))
    .orderBy(services.name);

  // ─────────────────────────────────
  // 2. Current subscription (user ka active plan)
  // ─────────────────────────────────
  const [currentSub] = await db
    .select()
    .from(membershipSubscriptions)
    .where(
      and(
        eq(membershipSubscriptions.userId, userId),
        eq(membershipSubscriptions.status, "active"),
      ),
    )
    .orderBy(desc(membershipSubscriptions.createdAt))
    .limit(1);

  let currentPlan = null;
  let includedServiceIds: { serviceId: number; usageLimit: number }[] = [];

  if (currentSub) {
    const [plan] = await db
      .select()
      .from(membershipPlans)
      .where(eq(membershipPlans.id, currentSub.planId))
      .limit(1);
    currentPlan = plan || null;

    includedServiceIds = await db
      .select({
        serviceId: planServices.serviceId,
        usageLimit: planServices.usageLimit,
      })
      .from(planServices)
      .where(eq(planServices.planId, currentSub.planId));
  }

  // ─────────────────────────────────
  // 3. PROMOTED PLAN — user ko konse plan me upgrade karna chahiye
  // ─────────────────────────────────
  // Priority: isPopular=true wala plan
  // Fallback: sabse zyada services wala plan
  // Fallback: sabse sasta plan
  let promotedPlan = null;
  let promotedPlanServices: {
    serviceId: number;
    usageLimit: number;
  }[] = [];

  // Pehle popular plan try karo
  const [popularPlan] = await db
    .select()
    .from(membershipPlans)
    .where(
      and(
        eq(membershipPlans.isActive, true),
        eq(membershipPlans.isPopular, true),
      ),
    )
    .limit(1);

  if (popularPlan) {
    promotedPlan = popularPlan;
  } else {
    // Warna sabse sasta plan
    const [cheapest] = await db
      .select()
      .from(membershipPlans)
      .where(eq(membershipPlans.isActive, true))
      .orderBy(membershipPlans.price)
      .limit(1);
    promotedPlan = cheapest || null;
  }

  // Promoted plan ke included services fetch karo
  if (promotedPlan) {
    promotedPlanServices = await db
      .select({
        serviceId: planServices.serviceId,
        usageLimit: planServices.usageLimit,
      })
      .from(planServices)
      .where(eq(planServices.planId, promotedPlan.id));
  }

  // ─────────────────────────────────
  // 4. Active project counts (usage tracking)
  // ─────────────────────────────────
  const projectCounts = await db
    .select({
      serviceId: userProjects.serviceId,
      count: sql<number>`count(*)::int`,
    })
    .from(userProjects)
    .where(
      and(
        eq(userProjects.userId, userId),
        sql`${userProjects.status} NOT IN ('completed', 'cancelled')`,
      ),
    )
    .groupBy(userProjects.serviceId);

  const projectCountMap: Record<string, number> = {};
  projectCounts.forEach((p) => {
    projectCountMap[p.serviceId] = p.count;
  });

  return (
    <ServicesClient
      initialData={{
        services: allServices,
        currentSubscription: currentSub || null,
        currentPlan,
        includedServiceIds,
        projectCountMap,
        hasMembership: !!currentSub,
        // ⬇️ NEW: DB se aane wala promoted plan data
        promotedPlan,
        promotedPlanServices,
      }}
    />
  );
}