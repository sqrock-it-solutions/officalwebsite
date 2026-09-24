import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { partners, payments, membershipSubscriptions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { razorpay } from "@/lib/razorpay";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action } = body;

    // ─────────────────────────────────
    // ACTION 1: Create Razorpay Order
    // ─────────────────────────────────
    if (action === "create-order") {
      const { userId, planId, amount } = body;

      if (!userId || !planId || !amount) {
        return NextResponse.json(
          { message: "Missing required fields" },
          { status: 400 },
        );
      }

      const amountInPaise = Math.round(parseFloat(amount) * 100);

      // Create Razorpay order
      const order = await razorpay.orders.create({
        amount: amountInPaise,
        currency: "INR",
        receipt: `partner_${Date.now()}`,
        notes: {
          userId,
          planId: String(planId),
          type: "partnership",
        },
      });

      // Create payment record (pending)
      const [payment] = await db
        .insert(payments)
        .values({
          userId,
          paymentType: "partnership",
          partnershipPlanId: planId,
          amount: amount.toString(),
          currency: "INR",
          provider: "razorpay",
          providerOrderId: order.id,
          status: "pending",
        })
        .returning();

      return NextResponse.json({
        orderId: order.id,
        amount: amountInPaise,
        currency: "INR",
        paymentRecordId: payment.id,
      });
    }

    // ─────────────────────────────────
    // ACTION 2: Verify Razorpay Payment
    // ─────────────────────────────────
    if (action === "verify-payment") {
      const {
        userId,
        paymentId,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      } = body;

      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return NextResponse.json(
          { message: "Missing payment verification fields" },
          { status: 400 },
        );
      }

      // ✅ Verify signature
      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");

      const isValid = expectedSignature === razorpay_signature;

      if (!isValid) {
        // Mark payment as failed
        await db
          .update(payments)
          .set({
            status: "failed",
            failureReason: "Invalid signature",
          })
          .where(eq(payments.id, paymentId));

        return NextResponse.json(
          { success: false, message: "Payment verification failed" },
          { status: 400 },
        );
      }

      // ✅ Payment valid → update everything
      // 1. Update payment
      const [paymentRecord] = await db
        .update(payments)
        .set({
          status: "success",
          providerPaymentId: razorpay_payment_id,
          providerSignature: razorpay_signature,
          paidAt: new Date(),
        })
        .where(eq(payments.id, paymentId))
        .returning();

      if (!paymentRecord) {
        return NextResponse.json(
          { message: "Payment record not found" },
          { status: 404 },
        );
      }

      // 2. Activate partner
      const [partner] = await db
        .update(partners)
        .set({ status: "active" })
        .where(eq(partners.userId, userId))
        .returning();

      // 3. Link payment to partner
      if (partner) {
        await db
          .update(payments)
          .set({ partnerId: partner.id })
          .where(eq(payments.id, paymentRecord.id));
      }

      return NextResponse.json({
        success: true,
        message: "Payment verified. Partner account activated!",
      });
    }

    // ─────────────────────────────────
    // ACTION 3: Cancel Payment (modal dismiss)
    // ─────────────────────────────────
    if (action === "cancel-payment") {
      const { paymentId } = body;

      await db
        .update(payments)
        .set({
          status: "cancelled",
          failureReason: "User cancelled checkout",
        })
        .where(eq(payments.id, paymentId));

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ message: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("Payment verify error:", error);
    return NextResponse.json(
      { message: error.message || "Payment processing failed" },
      { status: 500 },
    );
  }
}