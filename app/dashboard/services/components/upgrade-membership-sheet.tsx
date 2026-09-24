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
import {
  Crown,
  Sparkles,
  CheckCircle2,
  Code,
  Smartphone,
  Megaphone,
  Palette,
  IndianRupee,
  Clock,
  ShieldCheck,
  Zap,
  ArrowRight,
  TrendingUp,
  Star,
  Lock,
  Wallet,
} from "lucide-react";

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

interface Plan {
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
}

interface UpgradeMembershipSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  services: Service[];
  plan: Plan; // ⬅️ Full plan object
}

const iconMap: Record<string, any> = {
  Code,
  Smartphone,
  Megaphone,
  Palette,
};

export function UpgradeMembershipSheet({
  open,
  onOpenChange,
  services,
  plan,
}: UpgradeMembershipSheetProps) {
  const router = useRouter();

  // ─────────────────────────────────
  // DB values se calculate karo
  // ─────────────────────────────────
  const price = parseFloat(plan.price);
  const totalWorth = services.reduce(
    (sum, s) => sum + parseFloat(s.standalonePrice || "0"),
    0,
  );
  const savings = totalWorth - price;
  const savingsPercent =
    totalWorth > 0 ? Math.round((savings / totalWorth) * 100) : 0;

  // Features DB se parse
  const features: string[] = plan.features
    ? JSON.parse(plan.features)
    : [];

  const billingLabel =
    plan.billingCycle === "monthly"
      ? "month"
      : plan.billingCycle === "yearly"
        ? "year"
        : plan.billingCycle;

  const handleUpgrade = () => {
    onOpenChange(false);
    router.push("/dashboard/membership");
  };

  const handleBrowse = () => onOpenChange(false);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="flex h-[90vh] flex-col gap-0 overflow-hidden p-0 sm:h-[85vh]"
      >
        {/* ─── HERO HEADER (fixed) ─── */}
        <SheetHeader className="relative shrink-0 overflow-hidden bg-gradient-to-br from-purple-600 via-purple-700 to-blue-700 px-6 py-6 text-white">
          <div className="pointer-events-none absolute inset-0 opacity-20">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white blur-3xl" />
            <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white blur-3xl" />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-4xl">
            <div className="mb-2 flex items-center gap-2">
              <div className="rounded-full bg-white/20 p-1.5 backdrop-blur">
                <Crown className="h-4 w-4" />
              </div>
              {savingsPercent > 0 && (
                <Badge className="border-0 bg-white/20 text-white backdrop-blur hover:bg-white/30">
                  <Sparkles className="mr-1 h-3 w-3" />
                  Save {savingsPercent}%
                </Badge>
              )}
              {(plan as any).isPopular && (
                <Badge className="border-0 bg-amber-400/90 text-amber-950 backdrop-blur">
                  <Star className="mr-1 h-3 w-3" />
                  Most Popular
                </Badge>
              )}
            </div>

            <SheetTitle className="text-xl font-bold text-white md:text-2xl">
              Upgrade to {plan.name}
            </SheetTitle>
            {plan.description && (
              <SheetDescription className="mt-1 max-w-2xl text-xs text-white/90 md:text-sm">
                {plan.description}
              </SheetDescription>
            )}

            {/* Stats row — DB values */}
            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="rounded-lg bg-white/10 p-2.5 backdrop-blur">
                <div className="flex items-center gap-1 text-[10px] text-white/80">
                  <Wallet className="h-3 w-3" />
                  Worth
                </div>
                <p className="mt-0.5 text-base font-bold">
                  ₹{(totalWorth / 1000).toFixed(0)}K+
                </p>
              </div>
              <div className="rounded-lg bg-white/10 p-2.5 backdrop-blur">
                <div className="flex items-center gap-1 text-[10px] text-white/80">
                  <Zap className="h-3 w-3" />
                  Services
                </div>
                <p className="mt-0.5 text-base font-bold">
                  {services.length}
                </p>
              </div>
              <div className="rounded-lg bg-white/10 p-2.5 backdrop-blur">
                <div className="flex items-center gap-1 text-[10px] text-white/80">
                  <TrendingUp className="h-3 w-3" />
                  Your Price
                </div>
                <p className="mt-0.5 text-base font-bold">₹{price}</p>
              </div>
            </div>
          </div>
        </SheetHeader>

        {/* ─── SCROLLABLE BODY ─── */}
        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-4xl px-6 py-6">
            {/* ─── PLAN FEATURES (DB se) ─── */}
            {features.length > 0 && (
              <>
                <div className="mb-6">
                  <h3 className="mb-3 text-base font-semibold md:text-lg">
                    Plan Features
                  </h3>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {features.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 rounded-lg border bg-card p-3"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Plan limits from DB */}
                  <div className="mt-3 flex flex-wrap gap-2 text-xs">
                    <Badge variant="secondary">
                      {plan.maxProjects} active projects
                    </Badge>
                    <Badge variant="secondary">
                      {plan.maxServiceRequests} requests/month
                    </Badge>
                  </div>
                </div>

                <Separator className="my-6" />
              </>
            )}

            {/* ─── SERVICES (DB se — sirf included) ─── */}
            <div className="mb-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold md:text-lg">
                    Services You'll Get
                  </h3>
                  <p className="text-xs text-muted-foreground md:text-sm">
                    All {services.length} services included in {plan.name}
                  </p>
                </div>
                <Badge variant="secondary" className="shrink-0 gap-1">
                  <CheckCircle2 className="h-3 w-3 text-green-500" />
                  All Included
                </Badge>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {services.map((service) => {
                  const Icon = iconMap[service.icon || "Code"] || Code;
                  const color = service.color || "#0a0a0a";
                  const standalone = parseFloat(
                    service.standalonePrice || "0",
                  );

                  return (
                    <div
                      key={service.id}
                      className="group flex items-start gap-3 rounded-xl border bg-card p-4 transition-all hover:border-primary/30 hover:shadow-sm"
                    >
                      <div
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg"
                        style={{ backgroundColor: color + "15" }}
                      >
                        <Icon className="h-5 w-5" style={{ color }} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm font-semibold">
                            {service.name}
                          </h4>
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-green-500" />
                        </div>

                        {service.description && (
                          <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                            {service.description}
                          </p>
                        )}

                        <div className="mt-2 flex items-center gap-3 text-xs">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {service.deliveryDays}d
                          </div>
                          {standalone > 0 && (
                            <div className="flex items-center gap-1.5">
                              <span className="text-muted-foreground">
                                Worth
                              </span>
                              <div className="flex items-center gap-0.5">
                                <IndianRupee className="h-3 w-3 text-muted-foreground" />
                                <span className="font-medium text-muted-foreground line-through opacity-60">
                                  {standalone.toLocaleString("en-IN")}
                                </span>
                              </div>
                              <span className="rounded-full bg-green-100 px-1.5 py-0.5 text-[10px] font-semibold text-green-700 dark:bg-green-950 dark:text-green-400">
                                Included
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <Separator className="my-6" />

            {/* ─── BENEFITS ─── */}
            <div className="mb-6">
              <h3 className="mb-4 text-base font-semibold md:text-lg">
                Why Members Love Us
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  {
                    icon: ShieldCheck,
                    title: "Priority Support",
                    desc: "Get help within hours, not days",
                    color: "text-blue-500",
                  },
                  {
                    icon: Zap,
                    title: "Fast Delivery",
                    desc: "Faster turnaround on every project",
                    color: "text-yellow-500",
                  },
                  {
                    icon: Crown,
                    title: "Dedicated Manager",
                    desc: "Personal point of contact",
                    color: "text-purple-500",
                  },
                  {
                    icon: TrendingUp,
                    title: "Cancel Anytime",
                    desc: "No lock-in, no questions asked",
                    color: "text-green-500",
                  },
                ].map((benefit, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-lg border bg-card p-3"
                  >
                    <div className="rounded-lg bg-muted p-2">
                      <benefit.icon
                        className={`h-4 w-4 ${benefit.color}`}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{benefit.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {benefit.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="my-6" />

            {/* ─── COMPARISON ─── */}
            <div className="mb-6">
              <h3 className="mb-4 text-base font-semibold md:text-lg">
                Pay Per Service vs {plan.name}
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {/* WITHOUT */}
                <div className="rounded-xl border border-red-200 bg-red-50/50 p-4 dark:border-red-900 dark:bg-red-950/20">
                  <div className="mb-3 flex items-center gap-2">
                    <div className="rounded-full bg-red-100 p-1.5 dark:bg-red-950">
                      <Lock className="h-3.5 w-3.5 text-red-600 dark:text-red-400" />
                    </div>
                    <p className="text-sm font-semibold text-red-800 dark:text-red-300">
                      Without Membership
                    </p>
                  </div>
                  <div className="space-y-2 text-xs">
                    {services.slice(0, 3).map((s) => (
                      <div
                        key={s.id}
                        className="flex justify-between text-red-700 dark:text-red-400"
                      >
                        <span className="truncate">{s.name}</span>
                        <span className="ml-2 shrink-0 font-medium">
                          ₹
                          {parseFloat(
                            s.standalonePrice || "0",
                          ).toLocaleString("en-IN")}
                        </span>
                      </div>
                    ))}
                    {services.length > 3 && (
                      <div className="text-red-700 opacity-70 dark:text-red-400">
                        + {services.length - 3} more services
                      </div>
                    )}
                  </div>
                  <div className="mt-3 border-t border-red-200 pt-3 dark:border-red-900">
                    <div className="flex justify-between text-sm font-bold text-red-800 dark:text-red-300">
                      <span>Total</span>
                      <span>₹{totalWorth.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                </div>

                {/* WITH */}
                <div className="relative rounded-xl border-2 border-green-400 bg-green-50/50 p-4 dark:border-green-700 dark:bg-green-950/20">
                  <div className="absolute -top-2 right-3">
                    <Badge className="bg-green-600 text-white hover:bg-green-700">
                      <Star className="mr-1 h-3 w-3" />
                      Best Value
                    </Badge>
                  </div>
                  <div className="mb-3 flex items-center gap-2">
                    <div className="rounded-full bg-green-100 p-1.5 dark:bg-green-950">
                      <Crown className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                    </div>
                    <p className="text-sm font-semibold text-green-800 dark:text-green-300">
                      With {plan.name}
                    </p>
                  </div>
                  <div className="space-y-2 text-xs">
                    {services.slice(0, 3).map((s) => (
                      <div
                        key={s.id}
                        className="flex justify-between text-green-700 dark:text-green-400"
                      >
                        <span className="truncate">{s.name}</span>
                        <span className="ml-2 shrink-0 font-semibold text-green-600 dark:text-green-300">
                          Included
                        </span>
                      </div>
                    ))}
                    {services.length > 3 && (
                      <div className="text-green-700 dark:text-green-400">
                        + {services.length - 3} more services
                      </div>
                    )}
                  </div>
                  <div className="mt-3 border-t border-green-200 pt-3 dark:border-green-900">
                    <div className="flex justify-between text-sm font-bold text-green-800 dark:text-green-300">
                      <span>Total</span>
                      <span>
                        ₹{price.toLocaleString("en-IN")}/{billingLabel}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {savings > 0 && (
                <div className="mt-3 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 p-3 text-center dark:from-green-950/30 dark:to-emerald-950/30">
                  <p className="text-sm font-medium text-green-800 dark:text-green-300">
                    🎉 You save{" "}
                    <span className="font-bold">
                      ₹{savings.toLocaleString("en-IN")}
                    </span>{" "}
                    every {billingLabel}
                  </p>
                </div>
              )}
            </div>

            <div className="h-2" />
          </div>
        </div>

        {/* ─── STICKY FOOTER ─── */}
        <div className="shrink-0 border-t bg-background/95 px-6 py-4 backdrop-blur">
          <div className="mx-auto flex w-full max-w-4xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-baseline gap-1">
                <IndianRupee className="h-4 w-4 text-muted-foreground" />
                <span className="text-2xl font-bold">
                  {price.toLocaleString("en-IN")}
                </span>
                <span className="text-sm text-muted-foreground">
                  /{billingLabel}
                </span>
              </div>
              <Separator orientation="vertical" className="h-8" />
              <div className="text-xs text-muted-foreground">
                <p className="font-medium text-foreground">
                  {services.length} services included
                </p>
                <p>Cancel anytime</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={handleBrowse}>
                Browse First
              </Button>
              <Button
                onClick={handleUpgrade}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <Crown className="mr-2 h-4 w-4" />
                Upgrade Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}