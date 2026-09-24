"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CurrentPlan } from "./current-plan";
import { PlanCard } from "./plan-card";
import { PaymentHistory } from "./payment-history";
import { UpgradeDialog } from "./upgrade-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Crown,
  Sparkles,
  ShieldCheck,
  Clock,
  Zap,
} from "lucide-react";

interface MembershipClientProps {
  initialData: {
    plans: any[];
    currentSubscription: any | null;
    currentPlan: any | null;
    includedServices: any[];
    paymentHistory: any[];
  };
}

export function MembershipClient({ initialData }: MembershipClientProps) {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<any | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { currentSubscription, currentPlan, plans, paymentHistory } =
    initialData;

  const hasActiveMembership = !!currentSubscription;

  const handleUpgrade = (plan: any) => {
    setSelectedPlan(plan);
    setDialogOpen(true);
  };

  const handleSuccess = () => {
    setDialogOpen(false);
    router.refresh();
  };

  return (
    <div className="flex flex-col gap-6">
      {/* HEADER */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          My Membership
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage your subscription and unlock all services
        </p>
      </div>

      {/* CURRENT PLAN (agar active hai) */}
      {hasActiveMembership && currentPlan && (
        <CurrentPlan
          subscription={currentSubscription}
          plan={currentPlan}
          includedServices={initialData.includedServices}
        />
      )}

      {/* AVAILABLE PLANS (agar subscription nahi hai) */}
      {!hasActiveMembership && (
        <>
          {/* Benefits banner */}
          <Card className="border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 dark:border-amber-900 dark:from-amber-950/30 dark:to-orange-950/30">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-amber-100 p-3 dark:bg-amber-950">
                  <Crown className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <CardTitle className="text-lg">
                    Get All Services for Just ₹500/month
                  </CardTitle>
                  <CardDescription className="mt-1">
                    Web Dev • App Dev • Digital Marketing • UI/UX Design — all
                    in one plan
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                <div className="flex items-center gap-2 text-sm">
                  <ShieldCheck className="h-4 w-4 text-green-500" />
                  Unlimited requests
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-blue-500" />
                  Priority support
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Zap className="h-4 w-4 text-yellow-500" />
                  Fast delivery
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Sparkles className="h-4 w-4 text-purple-500" />
                  Cancel anytime
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Plans grid */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Choose Your Plan</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {plans.map((plan) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  onSelect={() => handleUpgrade(plan)}
                  isPopular={plan.isPopular}
                />
              ))}
            </div>
          </div>
        </>
      )}

      {/* PAYMENT HISTORY */}
      <PaymentHistory payments={paymentHistory} />

      {/* UPGRADE DIALOG */}
      {selectedPlan && (
        <UpgradeDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          plan={selectedPlan}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
}