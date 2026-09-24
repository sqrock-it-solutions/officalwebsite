"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Crown,
  Calendar,
  CheckCircle2,
  Clock,
  Zap,
  Code,
  Smartphone,
  Megaphone,
  Palette,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

interface CurrentPlanProps {
  subscription: {
    id: number;
    status: string;
    startedAt: string;
    expiresAt: string;
    amountPaid: string | null;
  };
  plan: {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    price: string;
    features: string | null;
    maxProjects: number;
    maxServiceRequests: number;
  };
  includedServices: any[];
}

const iconMap: Record<string, any> = {
  Code,
  Smartphone,
  Megaphone,
  Palette,
};

export function CurrentPlan({
  subscription,
  plan,
  includedServices,
}: CurrentPlanProps) {
  const start = new Date(subscription.startedAt).getTime();
  const end = new Date(subscription.expiresAt).getTime();
  const now = Date.now();
  const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  const daysLeft = Math.max(
    0,
    Math.ceil((end - now) / (1000 * 60 * 60 * 24)),
  );
  const progress = ((totalDays - daysLeft) / totalDays) * 100;

  const features = plan.features ? JSON.parse(plan.features) : [];

  return (
    <div className="flex flex-col gap-4">
      {/* Main plan card */}
      <Card className="overflow-hidden border-amber-200 dark:border-amber-900">
        <div className="h-2 bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500" />

        <CardHeader>
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-amber-100 p-3 dark:bg-amber-950">
                <Crown className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-900"
                  >
                    <CheckCircle2 className="mr-1 h-3 w-3" />
                    Active
                  </Badge>
                </div>
                <CardDescription className="mt-1">
                  {plan.description}
                </CardDescription>
              </div>
            </div>

            <Button variant="outline" size="sm" >
              <Link href="#payment-history">
                Manage <ArrowUpRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col gap-6">
          {/* Billing info */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center gap-3 rounded-lg border p-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Started</p>
                <p className="text-sm font-medium">
                  {new Date(subscription.startedAt).toLocaleDateString(
                    "en-IN",
                    { day: "numeric", month: "short", year: "numeric" },
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg border p-3">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Expires</p>
                <p className="text-sm font-medium">
                  {new Date(subscription.expiresAt).toLocaleDateString(
                    "en-IN",
                    { day: "numeric", month: "short", year: "numeric" },
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg border p-3">
              <Zap className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Days Left</p>
                <p className="text-sm font-medium">{daysLeft} days</p>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div>
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>Billing cycle progress</span>
              <span>{Math.round(progress)}% used</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Included services */}
          <div>
            <h4 className="text-sm font-semibold mb-3">
              Included Services
            </h4>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {includedServices.map((service) => {
                const Icon = iconMap[service.icon] || Code;
                return (
                  <div
                    key={service.id}
                    className="flex flex-col items-center gap-2 rounded-lg border p-3 text-center"
                  >
                    <div
                      className="rounded-full p-2"
                      style={{
                        backgroundColor: (service.color || "#0a0a0a") + "15",
                      }}
                    >
                      <Icon
                        className="h-5 w-5"
                        style={{ color: service.color || "#0a0a0a" }}
                      />
                    </div>
                    <p className="text-xs font-medium">{service.name}</p>
                    <p className="text-[10px] text-muted-foreground">
                      {service.usageLimit}x/month
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}