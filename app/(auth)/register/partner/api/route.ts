import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { user, partners, partnershipPlans, payments } from "@/db/schema";
import { eq } from "drizzle-orm";

function generateReferralCode(name: string): string {
  const prefix = name.replace(/[^a-zA-Z]/g, "").slice(0, 4).toUpperCase();
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `${prefix}${random}`;
}

// GET: fetch plans for the register page
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const action = searchParams.get("action");

  if (action === "plans") {
    const plans = await db
      .select({
        id: partnershipPlans.id,
        name: partnershipPlans.name,
        slug: partnershipPlans.slug,
        description: partnershipPlans.description,
        joiningFee: partnershipPlans.joiningFee,
        commissionPercent: partnershipPlans.commissionPercent,
        badge: partnershipPlans.badge,
        perks: partnershipPlans.perks,
      })
      .from(partnershipPlans)
      .where(eq(partnershipPlans.isActive, true));

    return NextResponse.json({ plans });
  }

  return NextResponse.json({ message: "Invalid action" }, { status: 400 });
}

// POST: register partner
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      password,
      phone,
      planSlug,
      payoutMethod,
      payoutDetails,
      motivation,
    } = body;

    if (!name || !email || !password || !planSlug) {
      return NextResponse.json(
        { message: "All required fields must be filled" },
        { status: 400 },
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { message: "Password must be at least 8 characters" },
        { status: 400 },
      );
    }

    // Check existing user
    const existing = await db
      .select()
      .from(user)
      .where(eq(user.email, email))
      .limit(1);

    if (existing.length > 0) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 409 },
      );
    }

    // Get plan
    const [selectedPlan] = await db
      .select()
      .from(partnershipPlans)
      .where(eq(partnershipPlans.slug, planSlug))
      .limit(1);

    if (!selectedPlan) {
      return NextResponse.json(
        { message: "Invalid plan selected" },
        { status: 400 },
      );
    }

    const isFree = parseFloat(selectedPlan.joiningFee) === 0;

    // 1. Create user via Better Auth
    const signUpResponse = await auth.api.signUpEmail({
      body: { name, email, password },
      asResponse: true,
    });

    if (!signUpResponse.ok) {
      const errData = await signUpResponse.json();
      return NextResponse.json(
        { message: errData.message || "Registration failed" },
        { status: 400 },
      );
    }

    const [newUser] = await db
      .select()
      .from(user)
      .where(eq(user.email, email))
      .limit(1);

    if (!newUser) {
      return NextResponse.json(
        { message: "User creation failed" },
        { status: 500 },
      );
    }

    // 2. Update user role
    await db
      .update(user)
      .set({ role: "partner", isPartner: true })
      .where(eq(user.id, newUser.id));

    // 3. Generate unique referral code
    let referralCode = generateReferralCode(name);
    for (let i = 0; i < 5; i++) {
      const dup = await db
        .select()
        .from(partners)
        .where(eq(partners.referralCode, referralCode))
        .limit(1);
      if (dup.length === 0) break;
      referralCode = generateReferralCode(name);
    }

    // 4. Create partner record
    //    - Free plan → active
    //    - Paid plan → pending_payment (payment ke baad active hoga)
    const [partner] = await db
      .insert(partners)
      .values({
        userId: newUser.id,
        planId: selectedPlan.id,
        referralCode,
        status: isFree ? "active" : "pending_payment",
        payoutMethod: payoutMethod || null,
        payoutDetails: payoutDetails
          ? JSON.stringify({ method: payoutMethod, value: payoutDetails })
          : null,
      })
      .returning();

    // 5. Forward auth cookies
    const res = NextResponse.json(
      {
        message: isFree
          ? "Partner registration successful"
          : "Account created. Please complete payment.",
        userId: newUser.id,
        partnerId: partner.id,
        planId: selectedPlan.id,
        requiresPayment: !isFree,
        amount: selectedPlan.joiningFee,
        referralCode: partner.referralCode,
      },
      { status: 201 },
    );

    const setCookie = signUpResponse.headers.get("set-cookie");
    if (setCookie) res.headers.set("set-cookie", setCookie);

    return res;
  } catch (error: any) {
    console.error("Partner register error:", error);
    return NextResponse.json(
      { message: error.message || "Registration failed" },
      { status: 500 },
    );
  }
}