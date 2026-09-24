"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ProjectsFilters } from "./projects-filters";
import { ProjectCard } from "./project-card";
import { ProjectDetailSheet } from "./project-detail-sheet";
import { EmptyState } from "./empty-state";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Plus,
  Rocket,
  Loader2,
  CheckCircle2,
  Clock,
  Eye,
  TrendingUp,
} from "lucide-react";

type Status = "all" | "pending" | "in_progress" | "review" | "completed" | "cancelled";
type SortBy = "recent" | "oldest" | "priority" | "due";

interface Project {
  id: number;
  title: string;
  description: string | null;
  brief: string | null;
  status: string;
  priority: string;
  deliveryUrl: string | null;
  feedback: string | null;
  rating: number | null;
  startedAt: string | null;
  dueAt: string | null;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
  service: {
    id: number;
    name: string;
    slug: string;
    icon: string | null;
    color: string | null;
  };
}

interface ProjectsClientProps {
  initialData: {
    projects: Project[];
    stats: {
      total: number;
      pending: number;
      in_progress: number;
      review: number;
      completed: number;
      cancelled: number;
    };
  };
}

const priorityOrder: Record<string, number> = {
  urgent: 4,
  high: 3,
  normal: 2,
  low: 1,
};

export function ProjectsClient({ initialData }: ProjectsClientProps) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<Status>("all");
  const [sortBy, setSortBy] = useState<SortBy>("recent");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const { projects, stats } = initialData;

  const filteredProjects = useMemo(() => {
    let result = projects.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.service.name.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = status === "all" || p.status === status;
      return matchesSearch && matchesStatus;
    });

    // Sort
    if (sortBy === "recent") {
      result.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    } else if (sortBy === "oldest") {
      result.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
    } else if (sortBy === "priority") {
      result.sort(
        (a, b) =>
          (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0),
      );
    } else if (sortBy === "due") {
      result.sort((a, b) => {
        if (!a.dueAt) return 1;
        if (!b.dueAt) return -1;
        return new Date(a.dueAt).getTime() - new Date(b.dueAt).getTime();
      });
    }

    return result;
  }, [projects, search, status, sortBy]);

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project);
    setDetailOpen(true);
  };

  const handleResetFilters = () => {
    setSearch("");
    setStatus("all");
    setSortBy("recent");
  };

  const isFiltered = search !== "" || status !== "all";

  return (
    <div className="flex flex-col gap-6">
      {/* HEADER */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            My Projects
          </h1>
          <p className="text-sm text-muted-foreground">
            Track all your project requests and their progress
          </p>
        </div>
        <Button >
          <Link href="/dashboard/projects/new">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Link>
        </Button>
      </div>

      {/* STATS OVERVIEW */}
      {stats.total > 0 && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Total"
            value={stats.total}
            icon={Rocket}
            color="text-blue-500"
          />
          <StatCard
            label="In Progress"
            value={stats.in_progress}
            icon={Loader2}
            color="text-amber-500"
            spinning
          />
          <StatCard
            label="In Review"
            value={stats.review}
            icon={Eye}
            color="text-purple-500"
          />
          <StatCard
            label="Completed"
            value={stats.completed}
            icon={CheckCircle2}
            color="text-green-500"
          />
        </div>
      )}

      {/* FILTERS */}
      {stats.total > 0 && (
        <ProjectsFilters
          search={search}
          onSearchChange={setSearch}
          status={status}
          onStatusChange={setStatus}
          sortBy={sortBy}
          onSortChange={setSortBy}
          total={filteredProjects.length}
          stats={stats}
        />
      )}

      {/* PROJECTS GRID */}
      {filteredProjects.length === 0 ? (
        <EmptyState isFiltered={isFiltered} onReset={handleResetFilters} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onViewDetails={() => handleViewDetails(project)}
            />
          ))}
        </div>
      )}

      {/* DETAIL SHEET */}
      <ProjectDetailSheet
        open={detailOpen}
        onOpenChange={setDetailOpen}
        project={selectedProject}
      />
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  color,
  spinning,
}: {
  label: string;
  value: number;
  icon: any;
  color: string;
  spinning?: boolean;
}) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-4">
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="mt-1 text-2xl font-bold">{value}</p>
        </div>
        <div className="rounded-lg bg-muted p-2.5">
          <Icon
            className={`h-5 w-5 ${color} ${spinning && value > 0 ? "animate-spin" : ""}`}
          />
        </div>
      </CardContent>
    </Card>
  );
}