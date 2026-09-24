import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { userProjects, services } from "@/db/schema";
import { eq, and, desc, sql, inArray } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status"); // optional filter

    // Build where clause
    const conditions = [eq(userProjects.userId, userId)];
    if (status && status !== "all") {
      conditions.push(eq(userProjects.status, status));
    }

    // Fetch projects with service details
    const projects = await db
      .select({
        id: userProjects.id,
        title: userProjects.title,
        description: userProjects.description,
        brief: userProjects.brief,
        status: userProjects.status,
        priority: userProjects.priority,
        deliveryUrl: userProjects.deliveryUrl,
        feedback: userProjects.feedback,
        rating: userProjects.rating,
        startedAt: userProjects.startedAt,
        dueAt: userProjects.dueAt,
        completedAt: userProjects.completedAt,
        createdAt: userProjects.createdAt,
        updatedAt: userProjects.updatedAt,
        service: {
          id: services.id,
          name: services.name,
          slug: services.slug,
          icon: services.icon,
          color: services.color,
        },
      })
      .from(userProjects)
      .innerJoin(services, eq(userProjects.serviceId, services.id))
      .where(and(...conditions))
      .orderBy(desc(userProjects.createdAt));

    // Stats
    const statusCounts = await db
      .select({
        status: userProjects.status,
        count: sql<number>`count(*)::int`,
      })
      .from(userProjects)
      .where(eq(userProjects.userId, userId))
      .groupBy(userProjects.status);

    const stats = {
      total: 0,
      pending: 0,
      in_progress: 0,
      review: 0,
      completed: 0,
      cancelled: 0,
    };

    statusCounts.forEach((s) => {
      const key = s.status as keyof typeof stats;
      if (key in stats) stats[key] = s.count;
      stats.total += s.count;
    });

    return NextResponse.json({ projects, stats });
  } catch (error: any) {
    console.error("Projects GET error:", error);
    return NextResponse.json(
      { message: error.message || "Failed to fetch projects" },
      { status: 500 },
    );
  }
}