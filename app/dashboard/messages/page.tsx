import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { userProjects, projectMessages, services } from "@/db/schema";
import { eq, and, desc, sql, inArray } from "drizzle-orm";
import { redirect } from "next/navigation";
import { MessagesClient } from "./components/messages-client";

export default async function MessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ project?: string }>;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect("/login");

  const userId = session.user.id;
  const params = await searchParams;
  const selectedProjectId = params.project ? parseInt(params.project) : null;

  // All projects
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

  let enrichedProjects: any[] = [];
  let unreadTotal = 0;

  if (projects.length > 0) {
    const projectIds = projects.map((p) => p.id);

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

    const unreadMap = new Map(unreadRows.map((r) => [r.projectId, r.count]));

    enrichedProjects = projects.map((p) => ({
      ...p,
      lastMessage: lastMessageMap.get(p.id) || null,
      unread: unreadMap.get(p.id) || 0,
    }));

    unreadTotal = unreadRows.reduce((sum, r) => sum + r.count, 0);
  }

  return (
    <MessagesClient
      initialData={{
        projects: enrichedProjects,
        unreadTotal,
        userId,
      }}
      initialSelectedProjectId={selectedProjectId}
    />
  );
}