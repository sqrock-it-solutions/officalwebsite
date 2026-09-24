"use client";

import { useState, useEffect } from "react";
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
import {
  Crown,
  IndianRupee,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface UpgradeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plan: {
    id: number;
    name: string;
    price: string;
    currency: string;
    billingCycle: string;
  };
  onSuccess: () => void;
}

export function UpgradeDialog({
  open,
  onOpenChange,
  plan,
  onSuccess,
}: UpgradeDialogProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load Razorpay script
  useEffect(() => {
    if (document.getElementById("razorpay-script")) return;
    const script = document.createElement("script");
    script.id = "razorpay-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePayment = async () => {
    setLoading(true);
    setError("");

    try {
      // 1. Create order
      const orderRes = await fetch("/dashboard/membership/api/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create-order",
          planId: plan.id,
        }),
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        setError(orderData.message || "Failed to create order");
        setLoading(false);
        return;
      }

      // 2. Open Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "SQRock",
        description: `${plan.name} Membership`,
        order_id: orderData.orderId,
        theme: { color: "#0a0a0a" },
        handler: async function (response: any) {
          // 3. Verify
          const verifyRes = await fetch(
            "/dashboard/membership/api/purchase",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                action: "verify-payment",
                paymentRecordId: orderData.paymentRecordId,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            },
          );

          const verifyData = await verifyRes.json();

          if (!verifyRes.ok || !verifyData.success) {
            setError(
              verifyData.message || "Payment verification failed",
            );
            setLoading(false);
            return;
          }

          // Success!
          onSuccess();
        },
        modal: {
          ondismiss: async function () {
            await fetch("/dashboard/membership/api/purchase", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                action: "cancel-payment",
                paymentRecordId: orderData.paymentRecordId,
              }),
            });
            setError("Payment cancelled");
            setLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      setLoading(false);
    }
  };

  const price = parseFloat(plan.price);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-1">
            <div className="rounded-full bg-amber-100 p-2 dark:bg-amber-950">
              <Crown className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <DialogTitle>Confirm Membership</DialogTitle>
          </div>
          <DialogDescription>
            You're about to subscribe to the {plan.name} plan
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4">
          {/* Plan summary */}
          <div className="rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{plan.name} Plan</span>
              <Badge variant="secondary">{plan.billingCycle}</Badge>
            </div>
            <div className="flex items-baseline gap-1 mt-3">
              <IndianRupee className="h-4 w-4 text-muted-foreground" />
              <span className="text-3xl font-bold">
                {price.toLocaleString("en-IN")}
              </span>
              <span className="text-sm text-muted-foreground">
                /{plan.billingCycle === "monthly" ? "month" : plan.billingCycle}
              </span>
            </div>
          </div>

          {/* Benefits */}
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              Instant activation
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              Cancel anytime
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-blue-500" />
              Secure payment via Razorpay
            </li>
          </ul>

          {error && (
            <div className="flex items-start gap-2 rounded-lg bg-red-50 dark:bg-red-950/30 p-3 text-sm text-red-600 dark:text-red-400">
              <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            onClick={handlePayment}
            disabled={loading}
            className="w-full sm:w-auto"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>Pay ₹{price.toLocaleString("en-IN")}</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}