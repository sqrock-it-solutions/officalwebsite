import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import {
  services,
  userProjects,
  membershipSubscriptions,
  planServices,
} from "@/db/schema";
import { eq, and, desc, sql } from "drizzle-orm";

// ─────────────────────────────────
// GET: available services for user
// ─────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

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

    if (!sub) {
      return NextResponse.json({
        hasMembership: false,
        services: [],
        message: "No active membership",
      });
    }

    // Included services with usage limits
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

    // Current usage per service
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

    return NextResponse.json({
      hasMembership: true,
      subscription: sub,
      services: includedServices.map((s) => ({
        ...s,
        used: usageMap[s.id] || 0,
        remaining: s.usageLimit - (usageMap[s.id] || 0),
      })),
    });
  } catch (error: any) {
    console.error("New project GET error:", error);
    return NextResponse.json(
      { message: error.message || "Failed to fetch" },
      { status: 500 },
    );
  }
}

// ─────────────────────────────────
// POST: Create new project
// ─────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const body = await req.json();

    const {
      serviceId,
      title,
      description,
      brief,
      priority = "normal",
      attachments = [],
      dueAt,
    } = body;

    // Validate
    if (!serviceId || !title || !description) {
      return NextResponse.json(
        { message: "Service, title, and description are required" },
        { status: 400 },
      );
    }

    if (title.length < 5) {
      return NextResponse.json(
        { message: "Title must be at least 5 characters" },
        { status: 400 },
      );
    }

    if (description.length < 20) {
      return NextResponse.json(
        { message: "Description must be at least 20 characters" },
        { status: 400 },
      );
    }

    // Check active subscription
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

    if (!sub) {
      return NextResponse.json(
        { message: "No active membership. Please subscribe first." },
        { status: 403 },
      );
    }

    // Check service is in the plan
    const [planService] = await db
      .select()
      .from(planServices)
      .where(
        and(
          eq(planServices.planId, sub.planId),
          eq(planServices.serviceId, serviceId),
        ),
      )
      .limit(1);

    if (!planService) {
      return NextResponse.json(
        { message: "This service is not included in your plan" },
        { status: 403 },
      );
    }

    // Check usage limit
    const [usage] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(userProjects)
      .where(
        and(
          eq(userProjects.userId, userId),
          eq(userProjects.serviceId, serviceId),
          sql`${userProjects.status} NOT IN ('completed', 'cancelled')`,
        ),
      );

    const currentUsage = usage?.count || 0;

    if (currentUsage >= planService.usageLimit) {
      return NextResponse.json(
        {
          message: `Limit reached for this service (${currentUsage}/${planService.usageLimit}). Please wait for cycle renewal.`,
        },
        { status: 429 },
      );
    }

    // Create project
    const [project] = await db
      .insert(userProjects)
      .values({
        userId,
        subscriptionId: sub.id,
        serviceId,
        title,
        description,
        brief: brief || null,
        priority,
        status: "pending",
        attachments: attachments.length ? JSON.stringify(attachments) : null,
        dueAt: dueAt ? new Date(dueAt) : null,
      })
      .returning();

    return NextResponse.json(
      {
        success: true,
        message: "Project created successfully!",
        project,
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Create project error:", error);
    return NextResponse.json(
      { message: error.message || "Failed to create project" },
      { status: 500 },
    );
  }
}