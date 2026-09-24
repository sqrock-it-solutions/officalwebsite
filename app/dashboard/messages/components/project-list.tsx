"use client";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Code,
  Smartphone,
  Megaphone,
  Palette,
  Search,
  X,
} from "lucide-react";
import { ProjectStatusBadge } from "../../projects/components/project-status-badge";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";

interface Project {
  id: number;
  title: string;
  status: string;
  updatedAt: string;
  service: {
    id: number;
    name: string;
    icon: string | null;
    color: string | null;
  };
  lastMessage: {
    projectId: number;
    message: string;
    createdAt: string;
    senderId: string;
  } | null;
  unread: number;
}

interface ProjectListProps {
  projects: Project[];
  selectedId: number | null;
  userId: string;
  onSelect: (id: number) => void;
}

const iconMap: Record<string, any> = {
  Code,
  Smartphone,
  Megaphone,
  Palette,
};

function formatRelative(date: string) {
  const now = Date.now();
  const d = new Date(date).getTime();
  const diff = now - d;

  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "now";
  if (mins < 60) return `${mins}m`;

  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d`;

  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
}

export function ProjectList({
  projects,
  selectedId,
  userId,
  onSelect,
}: ProjectListProps) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search) return projects;
    return projects.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [projects, search]);

  return (
    <div className="flex h-full flex-col border-r bg-card">
      {/* Header */}
      <div className="shrink-0 border-b p-4">
        <h2 className="text-sm font-semibold">Conversations</h2>
        <p className="text-xs text-muted-foreground">
          {projects.length} project{projects.length !== 1 ? "s" : ""}
        </p>

        {/* Search */}
        <div className="relative mt-3">
          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 pl-8 pr-8 text-sm"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm p-1 text-muted-foreground hover:bg-muted"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>

      {/* List */}
      <div className="min-h-0 flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="p-6 text-center text-xs text-muted-foreground">
            No projects match
          </div>
        ) : (
          filtered.map((project) => {
            const Icon = iconMap[project.service.icon || "Code"] || Code;
            const color = project.service.color || "#0a0a0a";
            const isSelected = selectedId === project.id;
            const isOwnMessage =
              project.lastMessage?.senderId === userId;

            return (
              <button
                key={project.id}
                onClick={() => onSelect(project.id)}
                className={cn(
                  "flex w-full items-start gap-3 border-b p-3 text-left transition-colors last:border-b-0",
                  isSelected
                    ? "bg-primary/5 border-l-2 border-l-primary"
                    : "hover:bg-muted/50",
                )}
              >
                {/* Service icon */}
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: color + "15" }}
                >
                  <Icon className="h-5 w-5" style={{ color }} />
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="truncate text-sm font-medium">
                      {project.title}
                    </p>
                    {project.lastMessage && (
                      <span className="shrink-0 text-[10px] text-muted-foreground">
                        {formatRelative(project.lastMessage.createdAt)}
                      </span>
                    )}
                  </div>

                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {project.lastMessage ? (
                      <>
                        {isOwnMessage && (
                          <span className="text-foreground">You: </span>
                        )}
                        {project.lastMessage.message}
                      </>
                    ) : (
                      <span className="italic">No messages yet</span>
                    )}
                  </p>

                  <div className="mt-1.5 flex items-center gap-2">
                    <ProjectStatusBadge
                      status={project.status}
                      size="sm"
                    />
                    {project.unread > 0 && (
                      <Badge className="h-5 min-w-5 rounded-full bg-primary px-1.5 text-[10px] text-primary-foreground">
                        {project.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}