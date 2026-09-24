"use client";

import { ServiceSelectorCard } from "./service-selector-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertCircle,
  ArrowRight,
  Package,
  Crown,
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

interface StepServiceProps {
  services: Service[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  onNext: () => void;
  planName?: string;
}

export function StepService({
  services,
  selectedId,
  onSelect,
  onNext,
  planName,
}: StepServiceProps) {
  const availableServices = services.filter((s) => s.remaining > 0);
  const fullServices = services.filter((s) => s.remaining <= 0);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold">Choose a Service</h2>
        <p className="text-sm text-muted-foreground">
          Select which service you'd like us to work on
        </p>
      </div>

      {/* Plan info */}
      {planName && (
        <div className="flex items-center gap-2 rounded-lg border bg-muted/40 p-3">
          <Crown className="h-4 w-4 text-amber-500" />
          <span className="text-sm">
            You're on <strong>{planName}</strong> plan
          </span>
          <Badge variant="secondary" className="ml-auto">
            {availableServices.length} available
          </Badge>
        </div>
      )}

      {/* Available services */}
      {availableServices.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {availableServices.map((service) => (
            <ServiceSelectorCard
              key={service.id}
              service={service}
              isSelected={selectedId === service.id}
              onSelect={() => onSelect(service.id)}
            />
          ))}
        </div>
      ) : (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            You've reached your usage limit for all services. Please wait for
            your billing cycle to renew or upgrade your plan.
          </AlertDescription>
        </Alert>
      )}

      {/* Full services */}
      {fullServices.length > 0 && (
        <div className="flex flex-col gap-3">
          <h3 className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <AlertCircle className="h-3.5 w-3.5" />
            At Limit ({fullServices.length})
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {fullServices.map((service) => (
              <ServiceSelectorCard
                key={service.id}
                service={service}
                isSelected={false}
                onSelect={() => {}}
              />
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between border-t pt-4">
        <p className="text-xs text-muted-foreground">
          <Package className="mr-1 inline h-3.5 w-3.5" />
          Step 1 of 3
        </p>
        <Button
          onClick={onNext}
          disabled={!selectedId}
          className="min-w-[120px]"
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}