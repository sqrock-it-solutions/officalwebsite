import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { user, partners, partnershipPlans } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const [dbUser] = await db
      .select()
      .from(user)
      .where(eq(user.id, session.user.id))
      .limit(1);

    if (!dbUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // If partner → include partner info
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
        .leftJoin(
          partnershipPlans,
          eq(partners.planId, partnershipPlans.id),
        )
        .where(eq(partners.userId, session.user.id))
        .limit(1);

      partnerInfo = partner || null;
    }

    return NextResponse.json({ user: dbUser, partner: partnerInfo });
  } catch (error: any) {
    console.error("Settings GET error:", error);
    return NextResponse.json(
      { message: error.message || "Failed to fetch" },
      { status: 500 },
    );
  }
}