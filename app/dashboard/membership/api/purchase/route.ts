import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import {
  membershipPlans,
  membershipSubscriptions,
  payments,
} from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { razorpay } from "@/lib/razorpay";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const body = await req.json();
    const { action } = body;

    // ─────────────────────────────────
    // ACTION 1: Create Razorpay Order
    // ─────────────────────────────────
    if (action === "create-order") {
      const { planId } = body;

      if (!planId) {
        return NextResponse.json(
          { message: "Plan ID required" },
          { status: 400 },
        );
      }

      const [plan] = await db
        .select()
        .from(membershipPlans)
        .where(eq(membershipPlans.id, planId))
        .limit(1);

      if (!plan) {
        return NextResponse.json(
          { message: "Plan not found" },
          { status: 404 },
        );
      }

      // Check if user already has active subscription
      const [existingSub] = await db
        .select()
        .from(membershipSubscriptions)
        .where(
          and(
            eq(membershipSubscriptions.userId, userId),
            eq(membershipSubscriptions.status, "active"),
          ),
        )
        .limit(1);

      if (existingSub) {
        return NextResponse.json(
          { message: "You already have an active membership" },
          { status: 409 },
        );
      }

      const amountInPaise = Math.round(parseFloat(plan.price) * 100);

      const order = await razorpay.orders.create({
        amount: amountInPaise,
        currency: plan.currency || "INR",
        receipt: `membership_${Date.now()}`,
        notes: {
          userId,
          planId: String(plan.id),
          type: "membership",
        },
      });

      // Create pending payment record
      const [payment] = await db
        .insert(payments)
        .values({
          userId,
          paymentType: "membership",
          membershipPlanId: plan.id,
          amount: plan.price,
          currency: plan.currency || "INR",
          provider: "razorpay",
          providerOrderId: order.id,
          status: "pending",
        })
        .returning();

      return NextResponse.json({
        orderId: order.id,
        amount: amountInPaise,
        currency: plan.currency || "INR",
        paymentRecordId: payment.id,
        planName: plan.name,
      });
    }

    // ─────────────────────────────────
    // ACTION 2: Verify Payment
    // ─────────────────────────────────
    if (action === "verify-payment") {
      const {
        paymentRecordId,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      } = body;

      if (
        !paymentRecordId ||
        !razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature
      ) {
        return NextResponse.json(
          { message: "Missing verification fields" },
          { status: 400 },
        );
      }

      // Verify signature
      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");

      if (expectedSignature !== razorpay_signature) {
        await db
          .update(payments)
          .set({
            status: "failed",
            failureReason: "Invalid signature",
          })
          .where(eq(payments.id, paymentRecordId));

        return NextResponse.json(
          { success: false, message: "Payment verification failed" },
          { status: 400 },
        );
      }

      // Get payment record
      const [paymentRecord] = await db
        .select()
        .from(payments)
        .where(eq(payments.id, paymentRecordId))
        .limit(1);

      if (!paymentRecord || !paymentRecord.membershipPlanId) {
        return NextResponse.json(
          { message: "Payment record not found" },
          { status: 404 },
        );
      }

      // Get plan
      const [plan] = await db
        .select()
        .from(membershipPlans)
        .where(eq(membershipPlans.id, paymentRecord.membershipPlanId))
        .limit(1);

      if (!plan) {
        return NextResponse.json(
          { message: "Plan not found" },
          { status: 404 },
        );
      }

      // Calculate expiry
      const expiresAt = new Date();
      if (plan.billingCycle === "monthly") {
        expiresAt.setDate(expiresAt.getDate() + 30);
      } else if (plan.billingCycle === "yearly") {
        expiresAt.setDate(expiresAt.getDate() + 365);
      } else {
        expiresAt.setDate(expiresAt.getDate() + plan.durationInDays);
      }

      // 1. Create subscription (active)
      const [subscription] = await db
        .insert(membershipSubscriptions)
        .values({
          userId,
          planId: plan.id,
          status: "active",
          startedAt: new Date(),
          expiresAt,
          amountPaid: plan.price,
          currency: plan.currency || "INR",
          paymentProvider: "razorpay",
          paymentId: razorpay_payment_id,
          orderId: razorpay_order_id,
        })
        .returning();

      // 2. Update payment record
      await db
        .update(payments)
        .set({
          status: "success",
          providerPaymentId: razorpay_payment_id,
          providerSignature: razorpay_signature,
          membershipSubscriptionId: subscription.id,
          paidAt: new Date(),
        })
        .where(eq(payments.id, paymentRecordId));

      // 3. Update user flag
      const { user } = await import("@/db/schema");
      await db
        .update(user)
        .set({ isMember: true })
        .where(eq(user.id, userId));

      return NextResponse.json({
        success: true,
        message: "Membership activated!",
        subscription,
      });
    }

    // ─────────────────────────────────
    // ACTION 3: Cancel Payment
    // ─────────────────────────────────
    if (action === "cancel-payment") {
      const { paymentRecordId } = body;

      await db
        .update(payments)
        .set({
          status: "cancelled",
          failureReason: "User cancelled checkout",
        })
        .where(eq(payments.id, paymentRecordId));

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ message: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("Membership purchase error:", error);
    return NextResponse.json(
      { message: error.message || "Purchase failed" },
      { status: 500 },
    );
  }
}