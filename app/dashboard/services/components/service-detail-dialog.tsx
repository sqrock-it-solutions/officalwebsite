"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Code,
  Smartphone,
  Megaphone,
  Palette,
  Clock,
  Check,
  Lock,
  ArrowRight,
  IndianRupee,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Service {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  color: string | null;
  standalonePrice: string | null;
  membershipValue: string | null;
  deliveryDays: number;
}

interface ServiceDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service: Service;
  isIncluded: boolean;
  hasMembership: boolean;
  usageLimit: number;
  usageCount: number;
}

const iconMap: Record<string, any> = {
  Code,
  Smartphone,
  Megaphone,
  Palette,
};

export function ServiceDetailDialog({
  open,
  onOpenChange,
  service,
  isIncluded,
  hasMembership,
  usageLimit,
  usageCount,
}: ServiceDetailDialogProps) {
  const router = useRouter();
  const Icon = iconMap[service.icon || "Code"] || Code;
  const color = service.color || "#0a0a0a";
  const isLocked = !isIncluded || !hasMembership;

  const handleRequest = () => {
    onOpenChange(false);
    toast.success("Opening request form", {
      description: `Redirecting to create a ${service.name} project...`,
    });
    // Navigate to new project page with service preselect
    setTimeout(() => {
      router.push(`/dashboard/projects/new?service=${service.slug}`);
    }, 400);
  };

  const handleUnlock = () => {
    onOpenChange(false);
    router.push("/dashboard/membership");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-start gap-4">
            <div
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl"
              style={{ backgroundColor: color + "15" }}
            >
              <Icon className="h-7 w-7" style={{ color }} />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-xl">{service.name}</DialogTitle>
              {service.description && (
                <DialogDescription className="mt-1">
                  {service.description}
                </DialogDescription>
              )}
            </div>
          </div>
        </DialogHeader>

        <Separator />

        {/* Info grid */}
        <div className="grid grid-cols-2 gap-3 py-2">
          <div className="flex items-center gap-2 rounded-lg border p-3">
            <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
            <div className="min-w-0">
              <p className="text-[11px] text-muted-foreground">Delivery</p>
              <p className="text-sm font-medium">{service.deliveryDays} days</p>
            </div>
          </div>

          {service.standalonePrice && (
            <div className="flex items-center gap-2 rounded-lg border p-3">
              <IndianRupee className="h-4 w-4 text-muted-foreground shrink-0" />
              <div className="min-w-0">
                <p className="text-[11px] text-muted-foreground">
                  Standalone
                </p>
                <p className="text-sm font-medium line-through opacity-60">
                  ₹{parseFloat(service.standalonePrice).toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Status */}
        {isIncluded && hasMembership ? (
          <div className="rounded-lg border border-green-200 bg-green-50 p-3 dark:border-green-900 dark:bg-green-950/30">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
              <p className="text-sm font-medium text-green-800 dark:text-green-200">
                Included in your membership
              </p>
            </div>
            {usageLimit > 0 && (
              <p className="mt-1 text-xs text-green-700 dark:text-green-300">
                Usage: {usageCount} of {usageLimit} this cycle
              </p>
            )}
          </div>
        ) : (
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 dark:border-amber-900 dark:bg-amber-950/30">
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                {!hasMembership
                  ? "Membership required"
                  : "Not in your current plan"}
              </p>
            </div>
            <p className="mt-1 text-xs text-amber-700 dark:text-amber-300">
              {!hasMembership
                ? "Subscribe to unlock this service"
                : "Upgrade your plan to unlock this service"}
            </p>
          </div>
        )}

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto"
          >
            Close
          </Button>
          {isLocked ? (
            <Button onClick={handleUnlock} className="w-full sm:w-auto">
              <Sparkles className="mr-2 h-4 w-4" />
              {hasMembership ? "Upgrade Plan" : "Get Membership"}
            </Button>
          ) : (
            <Button onClick={handleRequest} className="w-full sm:w-auto">
              Request Service <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}