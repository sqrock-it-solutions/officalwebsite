import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { userProjects, projectMessages, services, user } from "@/db/schema";
import { eq, and, desc, sql, inArray } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get("projectId");

    // ─────────────────────────────────
    // Single project thread
    // ─────────────────────────────────
    if (projectId) {
      const pid = parseInt(projectId);

      // Verify project belongs to user
      const [project] = await db
        .select({
          id: userProjects.id,
          title: userProjects.title,
          status: userProjects.status,
          service: {
            id: services.id,
            name: services.name,
            icon: services.icon,
            color: services.color,
          },
        })
        .from(userProjects)
        .innerJoin(services, eq(userProjects.serviceId, services.id))
        .where(and(eq(userProjects.id, pid), eq(userProjects.userId, userId)))
        .limit(1);

      if (!project) {
        return NextResponse.json(
          { message: "Project not found" },
          { status: 404 },
        );
      }

      // Fetch messages
      const messages = await db
        .select({
          id: projectMessages.id,
          message: projectMessages.message,
          attachments: projectMessages.attachments,
          isRead: projectMessages.isRead,
          createdAt: projectMessages.createdAt,
          sender: {
            id: user.id,
            name: user.name,
            image: user.image,
            role: user.role,
          },
        })
        .from(projectMessages)
        .innerJoin(user, eq(projectMessages.senderId, user.id))
        .where(eq(projectMessages.projectId, pid))
        .orderBy(projectMessages.createdAt);

      // Mark as read
      await db
        .update(projectMessages)
        .set({ isRead: true })
        .where(
          and(
            eq(projectMessages.projectId, pid),
            sql`${projectMessages.senderId} != ${userId}`,
          ),
        );

      return NextResponse.json({ project, messages });
    }

    // ─────────────────────────────────
    // All projects with last message + unread count
    // ─────────────────────────────────
    const projects = await db
      .select({
        id: userProjects.id,
        title: userProjects.title,
        status: userProjects.status,
        updatedAt: userProjects.updatedAt,
        service: {
          id: services.id,
          name: services.name,
          icon: services.icon,
          color: services.color,
        },
      })
      .from(userProjects)
      .innerJoin(services, eq(userProjects.serviceId, services.id))
      .where(eq(userProjects.userId, userId))
      .orderBy(desc(userProjects.updatedAt));

    if (projects.length === 0) {
      return NextResponse.json({ projects: [], unreadTotal: 0 });
    }

    const projectIds = projects.map((p) => p.id);

    // Last message per project
    const lastMessages = await db
      .select({
        projectId: projectMessages.projectId,
        message: projectMessages.message,
        createdAt: projectMessages.createdAt,
        senderId: projectMessages.senderId,
      })
      .from(projectMessages)
      .where(inArray(projectMessages.projectId, projectIds))
      .orderBy(desc(projectMessages.createdAt));

    const lastMessageMap = new Map<number, (typeof lastMessages)[0]>();
    lastMessages.forEach((m) => {
      if (!lastMessageMap.has(m.projectId)) {
        lastMessageMap.set(m.projectId, m);
      }
    });

    // Unread count per project
    const unreadRows = await db
      .select({
        projectId: projectMessages.projectId,
        count: sql<number>`count(*)::int`,
      })
      .from(projectMessages)
      .where(
        and(
          inArray(projectMessages.projectId, projectIds),
          eq(projectMessages.isRead, false),
          sql`${projectMessages.senderId} != ${userId}`,
        ),
      )
      .groupBy(projectMessages.projectId);

    const unreadMap = new Map(
      unreadRows.map((r) => [r.projectId, r.count]),
    );

    const enriched = projects.map((p) => ({
      ...p,
      lastMessage: lastMessageMap.get(p.id) || null,
      unread: unreadMap.get(p.id) || 0,
    }));

    const unreadTotal = unreadRows.reduce((sum, r) => sum + r.count, 0);

    return NextResponse.json({ projects: enriched, unreadTotal });
  } catch (error: any) {
    console.error("Messages GET error:", error);
    return NextResponse.json(
      { message: error.message || "Failed to fetch" },
      { status: 500 },
    );
  }
}