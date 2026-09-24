import { NextRequest, NextResponse } from "next/server";
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

export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    // 1. All active services
    const allServices = await db
      .select()
      .from(services)
      .where(eq(services.isActive, true))
      .orderBy(services.name);

    // 2. Current subscription
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

    // 3. If sub exists, fetch plan + included services with usage limits
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

    // 4. Active project count per service (for usage tracking)
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

    const projectCountMap = new Map(
      projectCounts.map((p) => [p.serviceId, p.count]),
    );

    return NextResponse.json({
      services: allServices,
      currentSubscription: currentSub || null,
      currentPlan,
      includedServiceIds,
      projectCountMap: Object.fromEntries(projectCountMap),
      hasMembership: !!currentSub,
    });
  } catch (error: any) {
    console.error("Services GET error:", error);
    return NextResponse.json(
      { message: error.message || "Failed to fetch services" },
      { status: 500 },
    );
  }
}