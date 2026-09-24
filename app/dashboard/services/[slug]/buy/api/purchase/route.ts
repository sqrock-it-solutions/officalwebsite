import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import {
  services,
  payments,
  userProjects,
} from "@/db/schema";
import { eq } from "drizzle-orm";
import { razorpay } from "@/lib/razorpay";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const body = await req.json();
    const { action } = body;

    // ─────────────────────────────────
    // ACTION 1: Create Order
    // ─────────────────────────────────
    if (action === "create-order") {
      const { serviceId, title, description, brief, priority, dueAt } = body;

      if (!serviceId) {
        return NextResponse.json(
          { message: "Service ID required" },
          { status: 400 },
        );
      }

      const [service] = await db
        .select()
        .from(services)
        .where(eq(services.id, serviceId))
        .limit(1);

      if (!service) {
        return NextResponse.json(
          { message: "Service not found" },
          { status: 404 },
        );
      }

      const price = parseFloat(service.standalonePrice || "0");
      if (price <= 0) {
        return NextResponse.json(
          { message: "Service price not set" },
          { status: 400 },
        );
      }

      const amountInPaise = Math.round(price * 100);

      // Create Razorpay order
      const order = await razorpay.orders.create({
        amount: amountInPaise,
        currency: "INR",
        receipt: `svc_${serviceId}_${Date.now()}`,
        notes: {
          userId,
          serviceId: String(serviceId),
          type: "service",
        },
      });

      // Create pending payment record
      const [payment] = await db
        .insert(payments)
        .values({
          userId,
          paymentType: "service",
          serviceId,
          amount: price.toString(),
          currency: "INR",
          provider: "razorpay",
          providerOrderId: order.id,
          status: "pending",
          notes: JSON.stringify({
            title,
            description,
            brief,
            priority,
            dueAt,
          }),
        })
        .returning();

      return NextResponse.json({
        orderId: order.id,
        amount: amountInPaise,
        currency: "INR",
        paymentRecordId: payment.id,
        serviceName: service.name,
        price,
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

      if (!paymentRecord || !paymentRecord.serviceId) {
        return NextResponse.json(
          { message: "Payment record not found" },
          { status: 404 },
        );
      }

      // Parse notes (project details)
      let notes: any = {};
      try {
        notes = paymentRecord.notes ? JSON.parse(paymentRecord.notes) : {};
      } catch {}

      // 1. Create project
      const [project] = await db
        .insert(userProjects)
        .values({
          userId,
          serviceId: paymentRecord.serviceId,
          title: notes.title || "Project Request",
          description: notes.description || null,
          brief: notes.brief || null,
          priority: notes.priority || "normal",
          status: "pending",
          dueAt: notes.dueAt ? new Date(notes.dueAt) : null,
        })
        .returning();

      // 2. Update payment
      await db
        .update(payments)
        .set({
          status: "success",
          providerPaymentId: razorpay_payment_id,
          providerSignature: razorpay_signature,
          userProjectId: project.id,
          paidAt: new Date(),
        })
        .where(eq(payments.id, paymentRecordId));

      return NextResponse.json({
        success: true,
        message: "Payment successful! Project created.",
        project: {
          id: project.id,
          title: project.title,
        },
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
    console.error("Service purchase error:", error);
    return NextResponse.json(
      { message: error.message || "Purchase failed" },
      { status: 500 },
    );
  }
}