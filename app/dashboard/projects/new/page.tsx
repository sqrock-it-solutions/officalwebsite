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
import { redirect } from "next/navigation";
import { NewProjectClient } from "./components/new-project-client";

export default async function NewProjectPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect("/login");

  const userId = session.user.id;

  // Active subscription
  const [sub] = await db
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

  // No membership → redirect to membership page
  if (!sub) {
    redirect("/dashboard/membership?reason=no-membership");
  }

  // Get plan
  const [plan] = await db
    .select()
    .from(membershipPlans)
    .where(eq(membershipPlans.id, sub.planId))
    .limit(1);

  // Included services with usage
  const includedServices = await db
    .select({
      id: services.id,
      name: services.name,
      slug: services.slug,
      description: services.description,
      icon: services.icon,
      color: services.color,
      deliveryDays: services.deliveryDays,
      usageLimit: planServices.usageLimit,
    })
    .from(planServices)
    .innerJoin(services, eq(planServices.serviceId, services.id))
    .where(eq(planServices.planId, sub.planId));

  const usageCounts = await db
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

  const usageMap: Record<number, number> = {};
  usageCounts.forEach((u) => {
    usageMap[u.serviceId] = u.count;
  });

  const servicesWithUsage = includedServices.map((s) => ({
    ...s,
    used: usageMap[s.id] || 0,
    remaining: s.usageLimit - (usageMap[s.id] || 0),
  }));

  return (
    <NewProjectClient
      initialData={{
        services: servicesWithUsage,
        plan: plan || null,
        subscription: sub,
      }}
    />
  );
}