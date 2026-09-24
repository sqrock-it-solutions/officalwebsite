"use client";

import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ProjectStatusBadge } from "./project-status-badge";
import {
  Code,
  Smartphone,
  Megaphone,
  Palette,
  Calendar,
  Clock,
  ExternalLink,
  MessageSquare,
  Star,
  CheckCircle2,
  ArrowRight,
  FileText,
  Sparkles,
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

interface ProjectDetailSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: Project | null;
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
    label: "Low Priority",
    className:
      "border-neutral-200 bg-neutral-50 text-neutral-600 dark:border-neutral-800 dark:bg-neutral-950/40 dark:text-neutral-400",
  },
  normal: {
    label: "Normal Priority",
    className:
      "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-400",
  },
  high: {
    label: "High Priority",
    className:
      "border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-900 dark:bg-orange-950/40 dark:text-orange-400",
  },
  urgent: {
    label: "Urgent",
    className:
      "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-400",
  },
};

export function ProjectDetailSheet({
  open,
  onOpenChange,
  project,
}: ProjectDetailSheetProps) {
  const router = useRouter();

  if (!project) return null;

  const Icon = iconMap[project.service.icon || "Code"] || Code;
  const color = project.service.color || "#0a0a0a";
  const priority = priorityConfig[project.priority] || priorityConfig.normal;

  const formatDate = (date: string | null, withTime = false) => {
    if (!date) return "—";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      ...(withTime && { hour: "2-digit", minute: "2-digit" }),
    });
  };

  const handleMessage = () => {
    onOpenChange(false);
    router.push(`/dashboard/messages?project=${project.id}`);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 p-0 sm:max-w-lg"
      >
        {/* HEADER */}
        <SheetHeader
          className="shrink-0 border-b px-6 py-5"
          style={{
            background: `linear-gradient(135deg, ${color}10 0%, transparent 100%)`,
          }}
        >
          <div className="flex items-start gap-3">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
              style={{ backgroundColor: color + "20" }}
            >
              <Icon className="h-6 w-6" style={{ color }} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-muted-foreground">
                {project.service.name}
              </p>
              <SheetTitle className="mt-0.5 line-clamp-2 text-lg">
                {project.title}
              </SheetTitle>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <ProjectStatusBadge status={project.status} size="sm" />
                <Badge
                  variant="outline"
                  className={`text-[10px] ${priority.className}`}
                >
                  {priority.label}
                </Badge>
              </div>
            </div>
          </div>
        </SheetHeader>

        {/* SCROLLABLE BODY */}
        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="space-y-6 px-6 py-6">
            {/* DESCRIPTION */}
            {project.description && (
              <div>
                <h4 className="mb-2 text-sm font-semibold">Description</h4>
                <p className="text-sm text-muted-foreground">
                  {project.description}
                </p>
              </div>
            )}

            {/* BRIEF */}
            {project.brief && (
              <div>
                <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold">
                  <FileText className="h-4 w-4" />
                  Project Brief
                </h4>
                <div className="rounded-lg border bg-muted/40 p-3">
                  <p className="whitespace-pre-wrap text-sm text-muted-foreground">
                    {project.brief}
                  </p>
                </div>
              </div>
            )}

            <Separator />

            {/* TIMELINE */}
            <div>
              <h4 className="mb-3 text-sm font-semibold">Timeline</h4>
              <div className="space-y-3">
                <TimelineItem
                  icon={Sparkles}
                  label="Created"
                  date={formatDate(project.createdAt, true)}
                  color="text-blue-500"
                />
                {project.startedAt && (
                  <TimelineItem
                    icon={Clock}
                    label="Started"
                    date={formatDate(project.startedAt, true)}
                    color="text-amber-500"
                  />
                )}
                {project.dueAt && (
                  <TimelineItem
                    icon={Calendar}
                    label="Due date"
                    date={formatDate(project.dueAt)}
                    color="text-orange-500"
                  />
                )}
                {project.completedAt && (
                  <TimelineItem
                    icon={CheckCircle2}
                    label="Completed"
                    date={formatDate(project.completedAt, true)}
                    color="text-green-500"
                  />
                )}
              </div>
            </div>

            {/* DELIVERY */}
            {project.deliveryUrl && (
              <>
                <Separator />
                <div>
                  <h4 className="mb-2 text-sm font-semibold">
                    Delivery
                  </h4>
                  <a
                    href={project.deliveryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-lg border bg-green-50 p-3 text-sm font-medium text-green-700 transition hover:bg-green-100 dark:bg-green-950/30 dark:text-green-400 dark:hover:bg-green-950/50"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View Delivered Work
                    <ArrowRight className="ml-auto h-4 w-4" />
                  </a>
                </div>
              </>
            )}

            {/* FEEDBACK + RATING */}
            {(project.feedback || project.rating) && (
              <>
                <Separator />
                <div>
                  <h4 className="mb-2 text-sm font-semibold">
                    Your Feedback
                  </h4>
                  {project.rating && (
                    <div className="mb-2 flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < project.rating!
                              ? "fill-amber-400 text-amber-400"
                              : "text-muted-foreground/30"
                          }`}
                        />
                      ))}
                      <span className="ml-1 text-sm text-muted-foreground">
                        {project.rating}/5
                      </span>
                    </div>
                  )}
                  {project.feedback && (
                    <div className="rounded-lg border bg-muted/40 p-3">
                      <p className="text-sm text-muted-foreground">
                        {project.feedback}
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* STICKY FOOTER */}
        <div className="shrink-0 border-t bg-background/95 px-6 py-4 backdrop-blur">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Close
            </Button>
            <Button onClick={handleMessage} className="flex-1">
              <MessageSquare className="mr-2 h-4 w-4" />
              Message Team
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function TimelineItem({
  icon: Icon,
  label,
  date,
  color,
}: {
  icon: any;
  label: string;
  date: string;
  color: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-background">
        <Icon className={`h-4 w-4 ${color}`} />
      </div>
      <div className="flex flex-1 items-center justify-between">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-xs text-muted-foreground">{date}</span>
      </div>
    </div>
  );
}