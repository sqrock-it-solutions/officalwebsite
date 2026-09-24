"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Code,
  Smartphone,
  Megaphone,
  Palette,
  Clock,
  Check,
  Lock,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

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

interface ServiceSelectorCardProps {
  service: Service;
  isSelected: boolean;
  onSelect: () => void;
}

const iconMap: Record<string, any> = {
  Code,
  Smartphone,
  Megaphone,
  Palette,
};

export function ServiceSelectorCard({
  service,
  isSelected,
  onSelect,
}: ServiceSelectorCardProps) {
  const Icon = iconMap[service.icon || "Code"] || Code;
  const color = service.color || "#0a0a0a";
  const isFull = service.remaining <= 0;
  const usagePercent =
    service.usageLimit > 0
      ? Math.min((service.used / service.usageLimit) * 100, 100)
      : 0;

  return (
    <Card
      onClick={isFull ? undefined : onSelect}
      className={cn(
        "group relative flex flex-col gap-3 overflow-hidden p-4 transition-all",
        isFull
          ? "cursor-not-allowed opacity-60"
          : "cursor-pointer hover:border-primary/50 hover:shadow-md",
        isSelected && "border-primary border-2 shadow-md ring-2 ring-primary/20",
      )}
    >
      {/* Colored strip */}
      <div
        className="absolute left-0 top-0 h-full w-1"
        style={{ backgroundColor: color }}
      />

      {/* Selected check */}
      {isSelected && (
        <div className="absolute right-3 top-3">
          <div
            className="flex h-6 w-6 items-center justify-center rounded-full"
            style={{ backgroundColor: color }}
          >
            <Check className="h-4 w-4 text-white" />
          </div>
        </div>
      )}

      {/* Icon + Name */}
      <div className="flex items-start gap-3">
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg"
          style={{ backgroundColor: color + "15" }}
        >
          <Icon className="h-5 w-5" style={{ color }} />
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="text-sm font-semibold">{service.name}</h4>
          {service.description && (
            <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
              {service.description}
            </p>
          )}
        </div>
      </div>

      {/* Delivery */}
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Clock className="h-3.5 w-3.5" />
        <span>Delivery in {service.deliveryDays} days</span>
      </div>

      {/* Usage */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Usage</span>
          <span
            className={cn(
              "font-medium",
              isFull ? "text-red-500" : "text-foreground",
            )}
          >
            {service.used}/{service.usageLimit}
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${usagePercent}%`,
              backgroundColor: isFull ? "#ef4444" : color,
            }}
          />
        </div>
      </div>

      {/* Status badges */}
      <div className="mt-auto">
        {isFull ? (
          <Badge
            variant="outline"
            className="gap-1 border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-400"
          >
            <AlertCircle className="h-3 w-3" />
            Limit reached
          </Badge>
        ) : (
          <Badge
            variant="outline"
            className="gap-1 border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950/40 dark:text-green-400"
          >
            <Check className="h-3 w-3" />
            {service.remaining} request
            {service.remaining !== 1 ? "s" : ""} left
          </Badge>
        )}
      </div>
    </Card>
  );
}