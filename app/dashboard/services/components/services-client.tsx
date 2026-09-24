"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { ServicesFilters } from "./services-filters";
import { ServiceCard } from "./service-card";
import { ServiceDetailDialog } from "./service-detail-dialog";
import { EmptyState } from "./empty-state";
import { UpgradeMembershipSheet } from "./upgrade-membership-sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Crown, Sparkles, ArrowRight, Lock } from "lucide-react";
import Link from "next/link";

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
  isActive: boolean;
}

interface PromotedPlan {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  price: string;
  currency: string;
  billingCycle: string;
  features: string | null;
  maxProjects: number;
  maxServiceRequests: number;
  isPopular: boolean;
}

interface ServicesClientProps {
  initialData: {
    services: Service[];
    currentSubscription: any;
    currentPlan: any;
    includedServiceIds: { serviceId: number; usageLimit: number }[];
    projectCountMap: Record<string, number>;
    hasMembership: boolean;
    promotedPlan: PromotedPlan | null;
    promotedPlanServices: { serviceId: number; usageLimit: number }[];
  };
}

export function ServicesClient({ initialData }: ServicesClientProps) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "price" | "delivery">("name");
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [upgradeSheetOpen, setUpgradeSheetOpen] = useState(false);

  const {
    services,
    currentSubscription,
    currentPlan,
    includedServiceIds,
    projectCountMap,
    hasMembership,
    promotedPlan,
    promotedPlanServices,
  } = initialData;

  // Map service ID -> usage limit
  const includedMap = useMemo(() => {
    const m = new Map<number, number>();
    includedServiceIds.forEach((s) => m.set(s.serviceId, s.usageLimit));
    return m;
  }, [includedServiceIds]);

  // ─────────────────────────────────
  // PROMOTED PLAN ki services filter karo
  // Sheet me sirf wahi services dikhengi jo us plan me included hai
  // ─────────────────────────────────
  const promotedServiceIds = useMemo(() => {
    return new Set(promotedPlanServices.map((p) => p.serviceId));
  }, [promotedPlanServices]);

  const promotedServices = useMemo(() => {
    if (!promotedPlan) return services; // fallback: all services
    return services.filter((s) => promotedServiceIds.has(s.id));
  }, [services, promotedServiceIds, promotedPlan]);

  // Filtered + sorted
  const filteredServices = useMemo(() => {
    let result = services.filter((s) =>
      s.name.toLowerCase().includes(search.toLowerCase()),
    );

    if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "price") {
      result.sort(
        (a, b) =>
          parseFloat(a.standalonePrice || "0") -
          parseFloat(b.standalonePrice || "0"),
      );
    } else if (sortBy === "delivery") {
      result.sort((a, b) => a.deliveryDays - b.deliveryDays);
    }

    return result;
  }, [services, search, sortBy]);

  // ─────────────────────────────────
  // HANDLERS
  // ─────────────────────────────────

  const handleRequest = (service: Service) => {
    if (!hasMembership) {
      setUpgradeSheetOpen(true);
      return;
    }

    const limit = includedMap.get(service.id);
    if (!limit) {
      toast.error("Service not included", {
        description: `${service.name} is not part of your current plan. Upgrade to unlock.`,
        action: {
          label: "Upgrade",
          onClick: () => setUpgradeSheetOpen(true),
        },
      });
      return;
    }

    const used = projectCountMap[service.id] || 0;
    if (used >= limit) {
      toast.warning("Limit reached", {
        description: `You've used ${used}/${limit} requests for ${service.name} this cycle. Please wait for renewal.`,
      });
      return;
    }

    setSelectedService(service);
    setDetailOpen(true);
  };

  const handleBuy = (service: Service) => {
    const price = parseFloat(service.standalonePrice || "0");

    if (price <= 0) {
      toast.error("Price unavailable", {
        description: "This service doesn't have a standalone price yet.",
      });
      return;
    }

    toast.info("Continue to purchase", {
      description: `You'll pay ₹${price.toLocaleString("en-IN")} for ${service.name} (one-time).`,
      action: {
        label: "Continue",
        onClick: () => {
          window.location.href = `/dashboard/services/${service.slug}/buy`;
        },
      },
      duration: 6000,
    });
  };

  const handleViewDetails = (service: Service) => {
    setSelectedService(service);
    setDetailOpen(true);
  };

  const handleClearSearch = () => setSearch("");

  const handleOpenUpgrade = () => setUpgradeSheetOpen(true);

  // ─────────────────────────────────
  // RENDER
  // ─────────────────────────────────

  return (
    <div className="flex flex-col gap-6">
      {/* HEADER */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Services
        </h1>
        <p className="text-sm text-muted-foreground">
          Explore all services included in your membership
        </p>
      </div>

      {/* MEMBERSHIP BANNER */}
      {hasMembership && currentPlan ? (
        <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 dark:border-green-900 dark:from-green-950/30 dark:to-emerald-950/30">
          <CardContent className="flex flex-col gap-3 py-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-green-100 p-2 dark:bg-green-950">
                <Crown className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm font-semibold">
                  {currentPlan.name} Active
                </p>
                <p className="text-xs text-muted-foreground">
                  All services unlocked — request anytime
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {includedServiceIds.length > 0 && (
                <Badge variant="secondary" className="gap-1">
                  <Sparkles className="h-3 w-3" />
                  {includedServiceIds.length} services included
                </Badge>
              )}
<Button variant="outline" size="sm" onClick={() => window.location.href = "/dashboard/membership"}>
  Manage <ArrowRight className="ml-1 h-3 w-3" />
</Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        // NO MEMBERSHIP → Promoted plan from DB
        <Card className="border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 dark:border-amber-900 dark:from-amber-950/30 dark:to-orange-950/30">
          <CardContent className="flex flex-col gap-3 py-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-amber-100 p-2 dark:bg-amber-950">
                <Lock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-sm font-semibold">No active membership</p>
                <p className="text-xs text-muted-foreground">
                  Buy services individually or subscribe to unlock everything
                  {promotedPlan && (
                    <>
                      {" "}
                      from{" "}
                      <span className="font-medium text-foreground">
                        ₹
                        {parseFloat(
                          promotedPlan.price,
                        ).toLocaleString("en-IN")}
                        /{promotedPlan.billingCycle === "monthly" ? "mo" : promotedPlan.billingCycle}
                      </span>
                    </>
                  )}
                </p>
              </div>
            </div>
            <Button
              size="sm"
              onClick={handleOpenUpgrade}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <Crown className="mr-1.5 h-3.5 w-3.5" />
              {promotedPlan ? `Upgrade to ${promotedPlan.name}` : "Upgrade Membership"}
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          </CardContent>
        </Card>
      )}

      {/* FILTERS */}
      <ServicesFilters
        search={search}
        onSearchChange={setSearch}
        sortBy={sortBy}
        onSortChange={setSortBy}
        total={filteredServices.length}
      />

      {/* SERVICES GRID */}
      {filteredServices.length === 0 ? (
        <EmptyState
          title="No services found"
          description={
            search
              ? `No services match "${search}". Try a different search term.`
              : "No services available at the moment."
          }
          onReset={search ? handleClearSearch : undefined}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service) => {
            const isIncluded = includedMap.has(service.id);
            const limit = includedMap.get(service.id) || 0;
            const used = projectCountMap[service.id] || 0;

            return (
              <ServiceCard
                key={service.id}
                service={service}
                isIncluded={isIncluded}
                hasMembership={hasMembership}
                usageLimit={limit}
                usageCount={used}
                onRequest={() => handleRequest(service)}
                onViewDetails={() => handleViewDetails(service)}
                onBuy={() => handleBuy(service)}
              />
            );
          })}
        </div>
      )}

      {/* DETAIL DIALOG */}
      {selectedService && (
        <ServiceDetailDialog
          open={detailOpen}
          onOpenChange={setDetailOpen}
          service={selectedService}
          isIncluded={includedMap.has(selectedService.id)}
          hasMembership={hasMembership}
          usageLimit={includedMap.get(selectedService.id) || 0}
          usageCount={projectCountMap[selectedService.id] || 0}
        />
      )}

      {/* ⬇️ UPGRADE SHEET — DB se plan + services pass karo */}
      {promotedPlan && (
        <UpgradeMembershipSheet
          open={upgradeSheetOpen}
          onOpenChange={setUpgradeSheetOpen}
          services={promotedServices} // ⬅️ Only included services
          plan={{
            id: promotedPlan.id,
            name: promotedPlan.name,
            slug: promotedPlan.slug,
            description: promotedPlan.description,
            price: promotedPlan.price,
            currency: promotedPlan.currency,
            billingCycle: promotedPlan.billingCycle,
            features: promotedPlan.features,
            maxProjects: promotedPlan.maxProjects,
            maxServiceRequests: promotedPlan.maxServiceRequests,
          }}
        />
      )}
    </div>
  );
}