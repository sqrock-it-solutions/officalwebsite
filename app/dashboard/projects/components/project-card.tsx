"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ProjectStatusBadge } from "./project-status-badge";
import {
  Code,
  Smartphone,
  Megaphone,
  Palette,
  Clock,
  Calendar,
  ArrowRight,
  ExternalLink,
  AlertCircle,
  Star,
  MessageSquare,
} from "lucide-react";

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

interface ProjectCardProps {
  project: Project;
  onViewDetails: () => void;
}

const iconMap: Record<string, any> = {
  Code,
  Smartphone,
  Megaphone,
  Palette,
};

const priorityConfig: Record<
  string,
  { label: string; className: string }
> = {
  low: {
    label: "Low",
    className:
      "border-neutral-200 bg-neutral-50 text-neutral-600 dark:border-neutral-800 dark:bg-neutral-950/40 dark:text-neutral-400",
  },
  normal: {
    label: "Normal",
    className:
      "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-400",
  },
  high: {
    label: "High",
    className:
      "border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-900 dark:bg-orange-950/40 dark:text-orange-400",
  },
  urgent: {
    label: "Urgent",
    className:
      "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-400",
  },
};

export function ProjectCard({ project, onViewDetails }: ProjectCardProps) {
  const Icon = iconMap[project.service.icon || "Code"] || Code;
  const color = project.service.color || "#0a0a0a";
  const priority = priorityConfig[project.priority] || priorityConfig.normal;

  const isOverdue =
    project.dueAt &&
    project.status !== "completed" &&
    project.status !== "cancelled" &&
    new Date(project.dueAt) < new Date();

  const formatDate = (date: string | null) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <Card className="group flex h-full flex-col overflow-hidden transition-all hover:shadow-md">
      {/* Colored top strip */}
      <div
        className="h-1 w-full shrink-0"
        style={{ backgroundColor: color }}
      />

      <CardContent className="flex flex-1 flex-col gap-3 p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg"
            style={{ backgroundColor: color + "15" }}
          >
            <Icon className="h-5 w-5" style={{ color }} />
          </div>

          <div className="flex flex-col items-end gap-1">
            <ProjectStatusBadge status={project.status} size="sm" />
            {isOverdue && (
              <Badge
                variant="outline"
                className="gap-1 border-red-200 bg-red-50 text-[10px] text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-400"
              >
                <AlertCircle className="h-3 w-3" />
                Overdue
              </Badge>
            )}
          </div>
        </div>

        {/* Title + service */}
        <div>
          <p className="text-[11px] font-medium text-muted-foreground">
            {project.service.name}
          </p>
          <h3 className="mt-0.5 line-clamp-2 text-base font-semibold leading-tight">
            {project.title}
          </h3>
        </div>

        {/* Description */}
        {project.description && (
          <p className="line-clamp-2 text-xs text-muted-foreground">
            {project.description}
          </p>
        )}

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <Badge variant="outline" className={`text-[10px] ${priority.className}`}>
            {priority.label}
          </Badge>

          {project.dueAt && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span className={isOverdue ? "text-red-500 font-medium" : ""}>
                Due {formatDate(project.dueAt)}
              </span>
            </div>
          )}

          {!project.dueAt && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-3 w-3" />
              {formatDate(project.createdAt)}
            </div>
          )}
        </div>

        {/* Rating (agar completed hai) */}
        {project.status === "completed" && project.rating && (
          <div className="flex items-center gap-1 text-xs">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < project.rating!
                    ? "fill-amber-400 text-amber-400"
                    : "text-muted-foreground/30"
                }`}
              />
            ))}
            <span className="ml-1 text-muted-foreground">
              {project.rating}/5
            </span>
          </div>
        )}

        {/* Actions */}
        <div className="mt-auto flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onViewDetails}
            className="flex-1"
          >
            <MessageSquare className="mr-1.5 h-3.5 w-3.5" />
            Details
          </Button>

          {project.deliveryUrl && project.status === "completed" ? (
            <Button size="sm" className="flex-1" >
              <a
                href={project.deliveryUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                View
              </a>
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={onViewDetails}
              className="flex-1"
            >
              Open <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}