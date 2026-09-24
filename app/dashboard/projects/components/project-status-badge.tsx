"use client";

import { Badge } from "@/components/ui/badge";
import {
  Clock,
  Loader2,
  Eye,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";

interface ProjectStatusBadgeProps {
  status: string;
  className?: string;
  size?: "sm" | "default";
}

const config: Record<
  string,
  {
    label: string;
    icon: any;
    className: string;
  }
> = {
  pending: {
    label: "Pending",
    icon: Clock,
    className:
      "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-400",
  },
  in_progress: {
    label: "In Progress",
    icon: Loader2,
    className:
      "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-400",
  },
  review: {
    label: "In Review",
    icon: Eye,
    className:
      "border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-900 dark:bg-purple-950/40 dark:text-purple-400",
  },
  completed: {
    label: "Completed",
    icon: CheckCircle2,
    className:
      "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950/40 dark:text-green-400",
  },
  cancelled: {
    label: "Cancelled",
    icon: XCircle,
    className:
      "border-neutral-200 bg-neutral-50 text-neutral-700 dark:border-neutral-800 dark:bg-neutral-950/40 dark:text-neutral-400",
  },
};

export function ProjectStatusBadge({
  status,
  className = "",
  size = "default",
}: ProjectStatusBadgeProps) {
  const c = config[status] || config.pending;
  const Icon = c.icon;
  const isSpinning = status === "in_progress";

  return (
    <Badge
      variant="outline"
      className={`gap-1 ${c.className} ${
        size === "sm" ? "text-[10px] px-1.5 h-5" : ""
      } ${className}`}
    >
      <Icon
        className={`h-3 w-3 ${isSpinning ? "animate-spin" : ""}`}
      />
      {c.label}
    </Badge>
  );
}