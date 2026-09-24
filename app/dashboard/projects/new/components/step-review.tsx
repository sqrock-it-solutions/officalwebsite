"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ProjectStatusBadge } from "../../components/project-status-badge";
import {
  Code,
  Smartphone,
  Megaphone,
  Palette,
  ArrowLeft,
  Send,
  Loader2,
  Clock,
  Calendar,
  Flag,
  FileText,
  CheckCircle2,
} from "lucide-react";

interface Service {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  color: string | null;
  deliveryDays: number;
  usageLimit: number;
  used: number;
  remaining: number;
}

interface StepReviewProps {
  service: Service | null;
  data: {
    title: string;
    description: string;
    brief: string;
    priority: "low" | "normal" | "high" | "urgent";
    dueAt: string;
  };
  onBack: () => void;
  onSubmit: () => void;
  submitting: boolean;
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
      "border-neutral-200 bg-neutral-50 text-neutral-700 dark:border-neutral-800 dark:bg-neutral-950/40 dark:text-neutral-400",
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

export function StepReview({
  service,
  data,
  onBack,
  onSubmit,
  submitting,
}: StepReviewProps) {
  if (!service) return null;

  const Icon = iconMap[service.icon || "Code"] || Code;
  const color = service.color || "#0a0a0a";
  const priority = priorityConfig[data.priority];

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold">Review Your Project</h2>
        <p className="text-sm text-muted-foreground">
          Make sure everything looks good before submitting
        </p>
      </div>

      {/* Service Card */}
      <div
        className="flex items-start gap-3 rounded-xl border p-4"
        style={{
          background: `linear-gradient(135deg, ${color}10 0%, transparent 100%)`,
        }}
      >
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
          style={{ backgroundColor: color + "20" }}
        >
          <Icon className="h-6 w-6" style={{ color }} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-muted-foreground">
            Service
          </p>
          <h3 className="text-base font-semibold">{service.name}</h3>
          <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            Delivery in {service.deliveryDays} days
          </div>
        </div>
        <ProjectStatusBadge status="pending" size="sm" />
      </div>

      <Separator />

      {/* Details */}
      <div className="flex flex-col gap-4">
        <DetailRow
          icon={FileText}
          label="Project Title"
          value={data.title}
        />

        <div>
          <div className="mb-1.5 flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <FileText className="h-3.5 w-3.5" />
            Description
          </div>
          <p className="rounded-lg border bg-muted/40 p-3 text-sm">
            {data.description}
          </p>
        </div>

        {data.brief && (
          <div>
            <div className="mb-1.5 flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <FileText className="h-3.5 w-3.5" />
              Detailed Brief
            </div>
            <p className="whitespace-pre-wrap rounded-lg border bg-muted/40 p-3 text-sm">
              {data.brief}
            </p>
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <div className="mb-1.5 flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <Flag className="h-3.5 w-3.5" />
              Priority
            </div>
            <Badge variant="outline" className={priority.className}>
              {priority.label}
            </Badge>
          </div>

          {data.dueAt && (
            <div>
              <div className="mb-1.5 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                Preferred Due Date
              </div>
              <p className="text-sm font-medium">
                {new Date(data.dueAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          )}
        </div>
      </div>

      <Separator />

      {/* Info note */}
      <div className="flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50/50 p-3 dark:border-blue-900 dark:bg-blue-950/20">
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" />
        <div className="text-xs text-blue-800 dark:text-blue-300">
          <p className="font-medium">What happens next?</p>
          <p className="mt-0.5">
            Our team will review your request and start working on it within 24
            hours. You'll be notified via email and dashboard.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t pt-4">
        <Button variant="outline" onClick={onBack} disabled={submitting}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="flex items-center gap-3">
          <p className="hidden text-xs text-muted-foreground sm:block">
            Step 3 of 3
          </p>
          <Button
            onClick={onSubmit}
            disabled={submitting}
            className="min-w-[140px]"
          >
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Submit Project
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center gap-2 text-xs font-medium text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <p className="text-sm font-medium">{value}</p>
    </div>
  );
}