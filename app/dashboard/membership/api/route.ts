import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import {
  membershipPlans,
  membershipSubscriptions,
  payments,
  services,
  planServices,
} from "@/db/schema";
import { eq, desc, and } from "drizzle-orm";

// GET: plans + current subscription + payment history
export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    // 1. All active plans
    const plans = await db
      .select()
      .from(membershipPlans)
      .where(eq(membershipPlans.isActive, true))
      .orderBy(membershipPlans.price);

    // 2. Current active subscription (agar hai)
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

    // 3. If subscription exists, get its plan details
    let currentPlan = null;
    if (currentSub) {
      const [plan] = await db
        .select()
        .from(membershipPlans)
        .where(eq(membershipPlans.id, currentSub.planId))
        .limit(1);
      currentPlan = plan || null;
    }

    // 4. Payment history for memberships
    const membershipPayments = await db
      .select()
      .from(payments)
      .where(
        and(
          eq(payments.userId, userId),
          eq(payments.paymentType, "membership"),
        ),
      )
      .orderBy(desc(payments.createdAt))
      .limit(10);

    // 5. Services included (for current plan)
    let includedServices: any[] = [];
    if (currentSub) {
      includedServices = await db
        .select({
          id: services.id,
          name: services.name,
          slug: services.slug,
          icon: services.icon,
          color: services.color,
          description: services.description,
          standalonePrice: services.standalonePrice,
          membershipValue: services.membershipValue,
          deliveryDays: services.deliveryDays,
          usageLimit: planServices.usageLimit,
        })
        .from(planServices)
        .innerJoin(services, eq(planServices.serviceId, services.id))
        .where(eq(planServices.planId, currentSub.planId));
    }

    // 6. Usage this cycle — pending, skip for now

    return NextResponse.json({
      plans,
      currentSubscription: currentSub || null,
      currentPlan,
      includedServices,
      paymentHistory: membershipPayments,
    });
  } catch (error: any) {
    console.error("Membership GET error:", error);
    return NextResponse.json(
      { message: error.message || "Failed to fetch data" },
      { status: 500 },
    );
  }
}