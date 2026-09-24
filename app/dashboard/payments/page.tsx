import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import {
  payments,
  membershipPlans,
  partnershipPlans,
  services,
} from "@/db/schema";
import { eq, desc, sql } from "drizzle-orm";
import { redirect } from "next/navigation";
import { PaymentsClient } from "./components/payments-client";

export default async function PaymentsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect("/login");

  const userId = session.user.id;

  // Payments with relations
  const rows = await db
    .select({
      id: payments.id,
      paymentType: payments.paymentType,
      amount: payments.amount,
      currency: payments.currency,
      provider: payments.provider,
      providerOrderId: payments.providerOrderId,
      providerPaymentId: payments.providerPaymentId,
      status: payments.status,
      failureReason: payments.failureReason,
      paidAt: payments.paidAt,
      refundedAt: payments.refundedAt,
      createdAt: payments.createdAt,
      updatedAt: payments.updatedAt,
      membershipPlan: {
        id: membershipPlans.id,
        name: membershipPlans.name,
        billingCycle: membershipPlans.billingCycle,
      },
      partnershipPlan: {
        id: partnershipPlans.id,
        name: partnershipPlans.name,
      },
      service: {
        id: services.id,
        name: services.name,
        icon: services.icon,
        color: services.color,
      },
    })
    .from(payments)
    .leftJoin(
      membershipPlans,
      eq(payments.membershipPlanId, membershipPlans.id),
    )
    .leftJoin(
      partnershipPlans,
      eq(payments.partnershipPlanId, partnershipPlans.id),
    )
    .leftJoin(services, eq(payments.serviceId, services.id))
    .where(eq(payments.userId, userId))
    .orderBy(desc(payments.createdAt));

  // Stats
  const statsRows = await db
    .select({
      status: payments.status,
      count: sql<number>`count(*)::int`,
      sum: sql<string>`coalesce(sum(${payments.amount}), 0)`,
    })
    .from(payments)
    .where(eq(payments.userId, userId))
    .groupBy(payments.status);

  const stats = {
    total: 0,
    success: 0,
    pending: 0,
    failed: 0,
    refunded: 0,
    totalSpent: 0,
    totalRefunded: 0,
  };

  statsRows.forEach((row) => {
    const key = row.status as keyof typeof stats;
    if (key in stats && typeof stats[key] === "number") {
      (stats as any)[key] = row.count;
    }
    stats.total += row.count;
    if (row.status === "success") {
      stats.totalSpent += parseFloat(row.sum);
    }
    if (row.status === "refunded") {
      stats.totalRefunded += parseFloat(row.sum);
    }
  });

  return <PaymentsClient initialData={{ payments: rows as any, stats }} />;
}