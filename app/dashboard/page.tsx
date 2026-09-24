import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import {
  userProjects,
  projectMessages,
  membershipSubscriptions,
  membershipPlans,
  services,
  payments,
  user as userTable,
} from "@/db/schema";
import { eq, and, desc, sql, ne, inArray } from "drizzle-orm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProjectStatusBadge } from "./projects/components/project-status-badge";
import {
  Crown,
  Rocket,
  MessageSquare,
  ArrowRight,
  Sparkles,
  Clock,
  CheckCircle2,
  Wallet,
  TrendingUp,
  Handshake,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect("/login");

  const userId = session.user.id;

  // ═════════════════════════════════════
  // 1. FRESH USER DATA (role, isPartner, isMember)
  // ═════════════════════════════════════
  const [user] = await db
    .select()
    .from(userTable)
    .where(eq(userTable.id, userId))
    .limit(1);

  if (!user) redirect("/login");

  // ═════════════════════════════════════
  // 2. ACTIVE PROJECTS COUNT
  // ═════════════════════════════════════
  const [projectStats] = await db
    .select({
      active: sql<number>`count(*) filter (where ${userProjects.status} not in ('completed', 'cancelled'))::int`,
      total: sql<number>`count(*)::int`,
      completed: sql<number>`count(*) filter (where ${userProjects.status} = 'completed')::int`,
    })
    .from(userProjects)
    .where(eq(userProjects.userId, userId));

  const activeProjects = projectStats?.active || 0;
  const totalProjects = projectStats?.total || 0;
  const completedProjects = projectStats?.completed || 0;

  // ═════════════════════════════════════
  // 3. UNREAD MESSAGES COUNT
  // ═════════════════════════════════════
  const projectIds = await db
    .select({ id: userProjects.id })
    .from(userProjects)
    .where(eq(userProjects.userId, userId));

  let unreadMessages = 0;
  if (projectIds.length > 0) {
    const [unreadRow] = await db
      .select({
        count: sql<number>`count(*)::int`,
      })
      .from(projectMessages)
      .where(
        and(
          inArray(
            projectMessages.projectId,
            projectIds.map((p) => p.id),
          ),
          eq(projectMessages.isRead, false),
          ne(projectMessages.senderId, userId),
        ),
      );
    unreadMessages = unreadRow?.count || 0;
  }

  // ═════════════════════════════════════
  // 4. ACTIVE MEMBERSHIP
  // ═════════════════════════════════════
  const [subscription] = await db
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

  let membershipPlan = null;
  let daysLeft = 0;

  if (subscription) {
    const [plan] = await db
      .select()
      .from(membershipPlans)
      .where(eq(membershipPlans.id, subscription.planId))
      .limit(1);
    membershipPlan = plan || null;

    if (subscription.expiresAt) {
      const end = new Date(subscription.expiresAt).getTime();
      daysLeft = Math.max(
        0,
        Math.ceil((end - Date.now()) / (1000 * 60 * 60 * 24)),
      );
    }
  }

  // ═════════════════════════════════════
  // 5. RECENT PROJECTS (last 5) with service
  // ═════════════════════════════════════
  const recentProjects = await db
    .select({
      id: userProjects.id,
      title: userProjects.title,
      status: userProjects.status,
      priority: userProjects.priority,
      createdAt: userProjects.createdAt,
      updatedAt: userProjects.updatedAt,
      dueAt: userProjects.dueAt,
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
    .orderBy(desc(userProjects.updatedAt))
    .limit(5);

  // ═════════════════════════════════════
  // 6. TOTAL SPENT (successful payments)
  // ═════════════════════════════════════
  const [spentRow] = await db
    .select({
      total: sql<string>`coalesce(sum(${payments.amount}), 0)`,
    })
    .from(payments)
    .where(
      and(eq(payments.userId, userId), eq(payments.status, "success")),
    );

  const totalSpent = parseFloat(spentRow?.total || "0");

  // ═════════════════════════════════════
  // STATS ARRAY
  // ═════════════════════════════════════
  const stats = [
    {
      title: "Active Projects",
      value: activeProjects.toString(),
      subtext:
        totalProjects > 0
          ? `${completedProjects} completed`
          : "No projects yet",
      icon: Rocket,
      color: "text-blue-500",
      bg: "bg-blue-100 dark:bg-blue-950/40",
      href: "/dashboard/projects",
    },
    {
      title: "Unread Messages",
      value: unreadMessages.toString(),
      subtext:
        unreadMessages > 0
          ? "Tap to view"
          : "All caught up",
      icon: MessageSquare,
      color: "text-green-500",
      bg: "bg-green-100 dark:bg-green-950/40",
      href: "/dashboard/messages",
    },
    {
      title: "Membership",
      value: subscription ? "Active" : "None",
      subtext: subscription
        ? daysLeft > 0
          ? `${daysLeft} days left`
          : "Expiring soon"
        : "Subscribe now",
      icon: Crown,
      color: "text-amber-500",
      bg: "bg-amber-100 dark:bg-amber-950/40",
      href: "/dashboard/membership",
    },
    {
      title: "Total Spent",
      value: `₹${totalSpent.toLocaleString("en-IN")}`,
      subtext: "Lifetime",
      icon: Wallet,
      color: "text-purple-500",
      bg: "bg-purple-100 dark:bg-purple-950/40",
      href: "/dashboard/payments",
    },
  ];

  // ═════════════════════════════════════
  // RENDER
  // ═════════════════════════════════════
  return (
    <div className="flex flex-col gap-6">
      {/* ─── HEADER ─── */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Welcome back, {user.name?.split(" ")[0]} 👋
        </h1>
        <p className="text-sm text-muted-foreground">
          Here's what's happening with your account today.
        </p>
      </div>

      {/* ─── STATS GRID ─── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card className="group cursor-pointer transition-all hover:border-primary/30 hover:shadow-md h-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`rounded-lg p-1.5 ${stat.bg}`}>
                  <stat.icon className={`h-3.5 w-3.5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {stat.subtext}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* ─── QUICK ACTIONS ─── */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* New Project */}
        <Card className="relative overflow-hidden">
          <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-blue-100/40 blur-3xl dark:bg-blue-950/40" />
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-950">
                <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <CardTitle className="text-base">Start a New Project</CardTitle>
                <CardDescription className="text-xs">
                  Web Dev, App Dev, Marketing, UI/UX
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button render={<Link href="/dashboard/projects/new" />} className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Create Project
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Membership */}
        <Card className="relative overflow-hidden">
          <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-amber-100/40 blur-3xl dark:bg-amber-950/40" />
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-amber-100 p-2 dark:bg-amber-950">
                <Crown className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <CardTitle className="text-base">
                  {subscription ? "Membership Active" : "Get Membership"}
                </CardTitle>
                <CardDescription className="text-xs">
                  {subscription
                    ? `${membershipPlan?.name} • ${daysLeft} days left`
                    : "All services for just ₹500/month"}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button
              variant="outline"
              render={<Link href="/dashboard/membership" />}
              className="w-full"
            >
              {subscription ? "Manage Plan" : "View Plans"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* ─── PARTNER CTA (agar partner nahi hai) ─── */}
      {!user.isPartner && (
        <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50 dark:border-purple-900 dark:from-purple-950/30 dark:to-blue-950/30">
          <CardHeader>
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-purple-100 p-3 dark:bg-purple-950">
                <Handshake className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex-1">
                <CardTitle className="flex items-center gap-2 text-base">
                  <TrendingUp className="h-4 w-4" />
                  Become a Partner & Earn
                </CardTitle>
                <CardDescription className="mt-1">
                  Sell our services to others and earn up to 15% commission on
                  every sale
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button
              className="bg-purple-600 hover:bg-purple-700"
              render={<Link href="/register/partner" />}
            >
              Join as Partner
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      )}

      {/* ─── RECENT PROJECTS ─── */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Projects</CardTitle>
              <CardDescription>
                Your latest project updates and activity
              </CardDescription>
            </div>
            {recentProjects.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                render={<Link href="/dashboard/projects" />}
              >
                View All
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {recentProjects.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-3 rounded-full bg-muted p-4">
                <Rocket className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium">No projects yet</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Create your first project to get started
              </p>
              <Button
                size="sm"
                className="mt-4"
                render={<Link href="/dashboard/projects/new" />}
              >
                <Plus className="mr-1.5 h-3.5 w-3.5" />
                New Project
              </Button>
            </div>
          ) : (
            <div className="divide-y">
              {recentProjects.map((project) => (
                <Link
                  key={project.id}
                  href={`/dashboard/projects`}
                  className="flex items-center gap-3 py-3 transition-colors hover:bg-muted/30 -mx-2 px-2 rounded-lg"
                >
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                    style={{
                      backgroundColor:
                        (project.service.color || "#0a0a0a") + "15",
                    }}
                  >
                    <IconRenderer
                      iconName={project.service.icon || "Code"}
                      color={project.service.color || "#0a0a0a"}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {project.title}
                    </p>
                    <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{project.service.name}</span>
                      <span>•</span>
                      <span>
                        {new Date(project.updatedAt).toLocaleDateString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "short",
                          },
                        )}
                      </span>
                    </div>
                  </div>
                  <ProjectStatusBadge status={project.status} size="sm" />
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// ─────────────────────────────────
// Small icon renderer (avoid importing dynamic)
// ─────────────────────────────────
import { Code, Smartphone, Megaphone, Palette } from "lucide-react";

function IconRenderer({
  iconName,
  color,
}: {
  iconName: string;
  color: string;
}) {
  const iconMap: Record<string, any> = {
    Code,
    Smartphone,
    Megaphone,
    Palette,
  };
  const Icon = iconMap[iconName] || Code;
  return <Icon className="h-4 w-4" style={{ color }} />;
}