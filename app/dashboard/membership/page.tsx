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
import { MembershipClient } from "./components/membership-client";

export default async function MembershipPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session!.user.id;

  // 1. All plans
  const plans = await db
    .select()
    .from(membershipPlans)
    .where(eq(membershipPlans.isActive, true))
    .orderBy(membershipPlans.price);

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

  // 3. Current plan
  let currentPlan = null;
  if (currentSub) {
    const [plan] = await db
      .select()
      .from(membershipPlans)
      .where(eq(membershipPlans.id, currentSub.planId))
      .limit(1);
    currentPlan = plan || null;
  }

  // 4. Payment history
  const paymentHistory = await db
    .select()
    .from(payments)
    .where(
      and(eq(payments.userId, userId), eq(payments.paymentType, "membership")),
    )
    .orderBy(desc(payments.createdAt))
    .limit(10);

  // 5. Included services
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

  return (
    <MembershipClient
      initialData={{
        plans,
        currentSubscription: currentSub || null,
        currentPlan,
        includedServices,
        paymentHistory,
      }}
    />
  );
}