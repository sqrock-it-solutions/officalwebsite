"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Code,
  Smartphone,
  Megaphone,
  Palette,
  Clock,
  Check,
  Lock,
  ArrowRight,
  Sparkles,
  IndianRupee,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";

const iconMap: Record<string, any> = {
  Code,
  Smartphone,
  Megaphone,
  Palette,
};

interface ServiceCardProps {
  service: any;
  isIncluded: boolean;
  hasMembership: boolean;
  usageLimit: number;
  usageCount: number;
  onRequest: () => void;
  onViewDetails: () => void;
  onBuy: () => void; // ⬅️ NEW: standalone purchase
}

export function ServiceCard({
  service,
  isIncluded,
  hasMembership,
  usageLimit,
  usageCount,
  onRequest,
  onViewDetails,
  onBuy,
}: ServiceCardProps) {
  const Icon = iconMap[service.icon || "Code"] || Code;
  const color = service.color || "#0a0a0a";
  const standalonePrice = parseFloat(service.standalonePrice || "0");
  const membershipValue = parseFloat(service.membershipValue || "0");
  const usagePercent = usageLimit > 0 ? (usageCount / usageLimit) * 100 : 0;
  const isLimitReached = usageCount >= usageLimit && usageLimit > 0;
  const canRequest = hasMembership && isIncluded && !isLimitReached;

  // Determine state
  const state = !hasMembership
    ? "no-membership"
    : !isIncluded
      ? "not-included"
      : isLimitReached
        ? "limit-reached"
        : "included";

  return (
    <Card className="group flex h-full flex-col overflow-hidden transition-all hover:shadow-md">
      <div
        className="h-1 w-full shrink-0"
        style={{ backgroundColor: color }}
      />

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
            style={{ backgroundColor: color + "15" }}
          >
            <Icon className="h-6 w-6" style={{ color }} />
          </div>

          {/* State-based badge */}
          {state === "included" && (
            <Badge
              variant="outline"
              className="gap-1 border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950 dark:text-green-400 shrink-0"
            >
              <Check className="h-3 w-3" />
              Included
            </Badge>
          )}
          {state === "limit-reached" && (
            <Badge
              variant="outline"
              className="gap-1 border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-400 shrink-0"
            >
              Limit reached
            </Badge>
          )}
          {state === "not-included" && (
            <Badge
              variant="outline"
              className="gap-1 border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-400 shrink-0"
            >
              <TrendingUp className="h-3 w-3" />
              Upgrade
            </Badge>
          )}
          {state === "no-membership" && (
            <Badge
              variant="outline"
              className="gap-1 text-muted-foreground shrink-0"
            >
              <Lock className="h-3 w-3" />
              Locked
            </Badge>
          )}
        </div>

        <h3 className="mt-3 text-lg font-semibold leading-tight">
          {service.name}
        </h3>

        {service.description && (
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {service.description}
          </p>
        )}
      </CardHeader>

      <CardContent className="flex flex-1 flex-col justify-end gap-3">
        {/* ─── PRICING ROW ─── */}
        {state === "no-membership" && standalonePrice > 0 && (
          // No membership → standalone price
          <div className="flex items-baseline gap-1">
            <IndianRupee className="h-4 w-4 text-foreground" />
            <span className="text-2xl font-bold">
              {standalonePrice.toLocaleString("en-IN")}
            </span>
            <span className="text-xs text-muted-foreground">one-time</span>
          </div>
        )}

        {state === "included" && (
          // Included → show "Free with membership"
          <div className="flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400">
            <Sparkles className="h-3 w-3" />
            Free with your membership
          </div>
        )}

        {state === "not-included" && standalonePrice > 0 && (
          // Not included → show standalone + upgrade hint
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-1">
              <IndianRupee className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-sm font-medium">
                {standalonePrice.toLocaleString("en-IN")}
              </span>
            </div>
            <span className="text-[11px] text-blue-600 dark:text-blue-400">
              or upgrade plan
            </span>
          </div>
        )}

        {state === "limit-reached" && (
          // Limit reached → show reset date hint
          <div className="text-xs text-amber-600 dark:text-amber-400">
            Limit resets next billing cycle
          </div>
        )}

        {/* Delivery time */}
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          <span>Delivery in {service.deliveryDays} days</span>
        </div>

        {/* Usage bar (only if included) */}
        {state === "included" && usageLimit > 0 && (
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px] text-muted-foreground">
              <span>Usage this cycle</span>
              <span>
                {usageCount}/{usageLimit}
              </span>
            </div>
            <Progress value={usagePercent} className="h-1.5" />
          </div>
        )}

        {/* ─── ACTIONS ─── */}
        <div className="flex gap-2 pt-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={onViewDetails}
            className="flex-1"
          >
            Details
          </Button>

          {state === "no-membership" && (
            <Button
              variant="default"
              size="sm"
              onClick={onBuy}
              className="flex-1"
            >
              <ShoppingCart className="mr-1 h-3 w-3" />
              Buy Now
            </Button>
          )}

          {state === "included" && (
            <Button
              variant="default"
              size="sm"
              onClick={onRequest}
              className="flex-1"
            >
              Request <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          )}

          {state === "not-included" && (
            <Button
              variant="default"
              size="sm"
              onClick={onBuy}
              className="flex-1"
            >
              <ShoppingCart className="mr-1 h-3 w-3" />
              Buy
            </Button>
          )}

          {state === "limit-reached" && (
            <Button variant="outline" size="sm" disabled className="flex-1">
              Limit reached
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}