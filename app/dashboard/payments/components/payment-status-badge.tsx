"use client";

import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  XCircle,
  Clock,
  Loader2,
  RotateCcw,
  Ban,
} from "lucide-react";

interface PaymentStatusBadgeProps {
  status: string;
  size?: "sm" | "default";
  className?: string;
}

const config: Record<
  string,
  { label: string; icon: any; className: string }
> = {
  success: {
    label: "Success",
    icon: CheckCircle2,
    className:
      "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950/40 dark:text-green-400",
  },
  pending: {
    label: "Pending",
    icon: Clock,
    className:
      "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-400",
  },
  processing: {
    label: "Processing",
    icon: Loader2,
    className:
      "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-400",
  },
  failed: {
    label: "Failed",
    icon: XCircle,
    className:
      "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-400",
  },
  cancelled: {
    label: "Cancelled",
    icon: Ban,
    className:
      "border-neutral-200 bg-neutral-50 text-neutral-700 dark:border-neutral-800 dark:bg-neutral-950/40 dark:text-neutral-400",
  },
  refunded: {
    label: "Refunded",
    icon: RotateCcw,
    className:
      "border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-900 dark:bg-purple-950/40 dark:text-purple-400",
  },
};

export function PaymentStatusBadge({
  status,
  size = "default",
  className = "",
}: PaymentStatusBadgeProps) {
  const c = config[status] || config.pending;
  const Icon = c.icon;
  const spinning = status === "processing";

  return (
    <Badge
      variant="outline"
      className={`gap-1 ${c.className} ${
        size === "sm" ? "text-[10px] px-1.5 h-5" : ""
      } ${className}`}
    >
      <Icon className={`h-3 w-3 ${spinning ? "animate-spin" : ""}`} />
      {c.label}
    </Badge>
  );
}