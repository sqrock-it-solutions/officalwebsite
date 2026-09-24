"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Code,
  Smartphone,
  Megaphone,
  Palette,
  ExternalLink,
  Clock,
  Calendar,
} from "lucide-react";
import { ProjectStatusBadge } from "../../projects/components/project-status-badge";

interface ThreadHeaderProps {
  project: {
    id: number;
    title: string;
    status: string;
    service: {
      id: number;
      name: string;
      icon: string | null;
      color: string | null;
    };
  };
}

const iconMap: Record<string, any> = {
  Code,
  Smartphone,
  Megaphone,
  Palette,
};

export function ThreadHeader({ project }: ThreadHeaderProps) {
  const Icon = iconMap[project.service.icon || "Code"] || Code;
  const color = project.service.color || "#0a0a0a";

  return (
    <div className="shrink-0 border-b bg-card">
      <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
            style={{ backgroundColor: color + "15" }}
          >
            <Icon className="h-5 w-5" style={{ color }} />
          </div>
          <div className="min-w-0">
            <h2 className="truncate text-base font-semibold">
              {project.title}
            </h2>
            <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
              <span>{project.service.name}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ProjectStatusBadge status={project.status} />
          <Button
            variant="outline"
            size="sm"
            render={<Link href={`/dashboard/projects`} />}
          >
            <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
            View Project
          </Button>
        </div>
      </div>
    </div>
  );
}