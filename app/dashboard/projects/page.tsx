import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { userProjects, services } from "@/db/schema";
import { eq, desc, sql } from "drizzle-orm";
import { ProjectsClient } from "./components/projects-client";

export default async function ProjectsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session!.user.id;

  // Projects with service info
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
    .where(eq(userProjects.userId, userId))
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

  return (
    <ProjectsClient
      initialData={{
        projects,
        stats,
      } as any}
    />
  );
}