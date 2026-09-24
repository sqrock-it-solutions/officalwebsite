"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  IndianRupee,
  ShieldCheck,
  Lock,
  CreditCard,
  Sparkles,
  TrendingUp,
} from "lucide-react";

interface OrderSummaryProps {
  price: number;
  serviceName: string;
  membershipSave?: number;
}

export function OrderSummary({
  price,
  serviceName,
  membershipSave,
}: OrderSummaryProps) {
  return (
    <Card className="sticky top-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <CreditCard className="h-4 w-4" />
          Order Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Service line */}
        <div className="flex items-start justify-between gap-3 text-sm">
          <div className="min-w-0">
            <p className="font-medium">{serviceName}</p>
            <p className="text-xs text-muted-foreground">
              One-time payment
            </p>
          </div>
          <div className="flex items-baseline gap-0.5 shrink-0">
            <IndianRupee className="h-3.5 w-3.5" />
            <span className="font-semibold">
              {price.toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        {/* Membership hint */}
        {membershipSave && membershipSave > 0 && (
          <div className="rounded-lg border border-green-200 bg-green-50 p-3 dark:border-green-900 dark:bg-green-950/30">
            <div className="flex items-start gap-2">
              <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-green-600 dark:text-green-400" />
              <div className="text-xs">
                <p className="font-medium text-green-800 dark:text-green-300">
                  Save ₹{membershipSave.toLocaleString("en-IN")}
                </p>
                <p className="mt-0.5 text-green-700 dark:text-green-400">
                  With membership you'd pay just ₹500/month for unlimited
                  access to all services
                </p>
              </div>
            </div>
          </div>
        )}

        <Separator />

        {/* Subtotal */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span>₹{price.toLocaleString("en-IN")}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">GST (included)</span>
            <span className="text-muted-foreground">—</span>
          </div>
        </div>

        <Separator />

        {/* Total */}
        <div className="flex items-baseline justify-between">
          <span className="text-sm font-semibold">Total</span>
          <div className="flex items-baseline gap-1">
            <IndianRupee className="h-4 w-4" />
            <span className="text-2xl font-bold">
              {price.toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        {/* Trust badges */}
        <div className="space-y-2 rounded-lg bg-muted/40 p-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-green-500" />
            Secure payment via Razorpay
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Lock className="h-3.5 w-3.5 text-blue-500" />
            256-bit SSL encryption
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-purple-500" />
            Money-back guarantee
          </div>
        </div>
      </CardContent>
    </Card>
  );
}