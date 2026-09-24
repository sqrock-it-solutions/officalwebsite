import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { user as userTable, partners, partnershipPlans } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { SettingsClient } from "./components/settings-client";

export default async function SettingsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect("/login");

  const [dbUser] = await db
    .select()
    .from(userTable)
    .where(eq(userTable.id, session.user.id))
    .limit(1);

  if (!dbUser) redirect("/login");

  // Partner info
  let partnerInfo = null;
  if (dbUser.isPartner) {
    const [partner] = await db
      .select({
        id: partners.id,
        referralCode: partners.referralCode,
        status: partners.status,
        payoutMethod: partners.payoutMethod,
        payoutDetails: partners.payoutDetails,
        plan: {
          id: partnershipPlans.id,
          name: partnershipPlans.name,
          commissionPercent: partnershipPlans.commissionPercent,
        },
      })
      .from(partners)
      .leftJoin(partnershipPlans, eq(partners.planId, partnershipPlans.id))
      .where(eq(partners.userId, session.user.id))
      .limit(1);

    partnerInfo = partner || null;
  }

  return (
    <SettingsClient
      initialData={{
        user: dbUser,
        partner: partnerInfo,
      }}
    />
  );
}