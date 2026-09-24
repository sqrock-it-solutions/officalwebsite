"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  User,
  Briefcase,
  TrendingUp,
  Percent,
  CheckCircle2,
  IndianRupee,
  Crown,
} from "lucide-react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface Plan {
  id: number;
  name: string;
  slug: string;
  description: string;
  joiningFee: string;
  commissionPercent: string;
  badge: string | null;
  perks: string | null;
}

export default function PartnerRegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [plans, setPlans] = useState<Plan[]>([]);
  const [plansLoading, setPlansLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    planSlug: "",
    payoutMethod: "upi",
    payoutDetails: "",
    motivation: "",
  });

  // Fetch plans from DB
  useEffect(() => {
    fetch("/register/partner/api?action=plans")
      .then((r) => r.json())
      .then((data) => {
        setPlans(data.plans || []);
        if (data.plans?.length > 0) {
          // Default select the cheapest/free plan
          const freePlan =
            data.plans.find((p: Plan) => parseFloat(p.joiningFee) === 0) ||
            data.plans[0];
          setForm((f) => ({ ...f, planSlug: freePlan.slug }));
        }
      })
      .catch(() => setError("Failed to load plans"))
      .finally(() => setPlansLoading(false));
  }, []);

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const selectedPlan = plans.find((p) => p.slug === form.planSlug);
  const requiresPayment = selectedPlan
    ? parseFloat(selectedPlan.joiningFee) > 0
    : false;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    if (!form.planSlug) {
      setError("Please select a plan");
      return;
    }

    setLoading(true);

    try {
      // Step 1: Create partner account (pending_payment)
      const res = await fetch("/register/partner/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      // ✅ Free plan → direct login
      if (!requiresPayment) {
        router.push("/dashboard/partner?welcome=1");
        router.refresh();
        return;
      }

      // Step 2: Paid plan → open Razorpay checkout
      const orderRes = await fetch("/register/partner/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create-order",
          userId: data.userId,
          planId: data.planId,
          amount: selectedPlan!.joiningFee,
        }),
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok || !orderData.orderId) {
        setError(orderData.message || "Failed to create payment order");
        return;
      }

      // Step 3: Open Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount, // in paise
        currency: orderData.currency || "INR",
        name: "SQRock",
        description: `${selectedPlan!.name} Partnership`,
        order_id: orderData.orderId,
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        theme: { color: "#0a0a0a" },
        handler: async function (response: any) {
          // Step 4: Verify payment
          const verifyRes = await fetch("/register/partner/api/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              action: "verify-payment",
              userId: data.userId,
              paymentId: orderData.paymentRecordId,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const verifyData = await verifyRes.json();

          if (!verifyRes.ok || !verifyData.success) {
            setError(
              verifyData.message ||
                "Payment verification failed. Please contact support.",
            );
            setLoading(false);
            return;
          }

          router.push("/dashboard/partner?welcome=1&payment=success");
          router.refresh();
        },
        modal: {
          ondismiss: async function () {
            // User ne Razorpay band kar diya
            setError(
              "Payment cancelled. Your partner account is created but inactive. Please complete payment to activate.",
            );
            setLoading(false);
            // Optionally mark payment as cancelled
            await fetch("/register/partner/api/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                action: "cancel-payment",
                paymentId: orderData.paymentRecordId,
              }),
            });
          },
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-950 dark:to-slate-900 px-4 py-8">
      <Card className="w-full max-w-3xl shadow-xl">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center gap-2 mb-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl font-bold">
              Become a Partner
            </CardTitle>
          </div>
          <CardDescription className="text-center">
            Earn commissions by selling our services
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Plans Grid with Prices */}
          <div className="mb-6">
            <Label className="mb-3 block text-base font-semibold">
              Choose Your Plan
            </Label>

            {plansLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-4">
                {plans.map((plan) => {
                  const isSelected = form.planSlug === plan.slug;
                  const isFree = parseFloat(plan.joiningFee) === 0;

                  return (
                    <button
                      key={plan.slug}
                      type="button"
                      onClick={() =>
                        setForm({ ...form, planSlug: plan.slug })
                      }
                      className={`relative p-4 rounded-xl border-2 text-left transition-all ${
                        isSelected
                          ? "border-primary bg-primary/5 shadow-md"
                          : "border-slate-200 dark:border-slate-700 hover:border-slate-300"
                      }`}
                    >
                      {isSelected && (
                        <CheckCircle2 className="absolute top-2 right-2 h-5 w-5 text-primary" />
                      )}

                      {/* Badge */}
                      {plan.badge && (
                        <div className="flex items-center gap-1 mb-2">
                          <Crown className="h-3 w-3 text-amber-500" />
                          <span className="text-xs font-medium text-amber-600">
                            {plan.badge}
                          </span>
                        </div>
                      )}

                      <h3 className="font-bold text-lg">{plan.name}</h3>

                      {/* Price */}
                      <div className="flex items-baseline gap-1 mt-2">
                        {isFree ? (
                          <span className="text-2xl font-bold text-green-600">
                            Free
                          </span>
                        ) : (
                          <>
                            <IndianRupee className="h-4 w-4 text-slate-700" />
                            <span className="text-2xl font-bold">
                              {parseFloat(plan.joiningFee).toLocaleString(
                                "en-IN",
                              )}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              one-time
                            </span>
                          </>
                        )}
                      </div>

                      {/* Commission */}
                      <div className="flex items-center gap-1 mt-3 text-sm font-medium text-primary">
                        <Percent className="h-4 w-4" />
                        {parseFloat(plan.commissionPercent)}% commission
                      </div>

                      {/* Perks */}
                      {plan.perks && (
                        <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
                          {JSON.parse(plan.perks)
                            .slice(0, 3)
                            .map((perk: string, i: number) => (
                              <li
                                key={i}
                                className="flex items-start gap-1"
                              >
                                <CheckCircle2 className="h-3 w-3 text-green-500 mt-0.5 shrink-0" />
                                {perk}
                              </li>
                            ))}
                        </ul>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Payment notice */}
            {requiresPayment && selectedPlan && (
              <div className="mt-4 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900">
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  <strong>Note:</strong> Aapne {selectedPlan.name} plan
                  select kiya hai (₹
                  {parseFloat(selectedPlan.joiningFee).toLocaleString("en-IN")}{" "}
                  one-time). Registration ke baad payment karna hoga. Payment
                  fail hone par aapka partner account activate nahi hoga.
                </p>
              </div>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder="John Doe"
                    className="pl-10"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    placeholder="+91 98765 43210"
                    className="pl-10"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-10"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Min. 8 characters"
                    className="pl-10 pr-10"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-muted-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Re-enter password"
                    className="pl-10"
                    value={form.confirmPassword}
                    onChange={(e) =>
                      setForm({ ...form, confirmPassword: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
            </div>

            {/* Payout Info — only if paid plan */}
            <div className="border-t pt-4 mt-4">
              <h3 className="font-semibold mb-3">Payout Details</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Payout Method</Label>
                  <Select
                    value={form.payoutMethod}
                    onValueChange={(v) =>
                      setForm({ ...form, payoutMethod: v! })
                    }
                  >
                    <SelectTrigger className={'w-full'}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upi">UPI</SelectItem>
                      <SelectItem value="bank">Bank Transfer</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Payout Details</Label>
                  <Input
                    placeholder={
                      form.payoutMethod === "upi"
                        ? "yourname@upi"
                        : form.payoutMethod === "bank"
                          ? "Account number"
                          : "PayPal email"
                    }
                    value={form.payoutDetails}
                    onChange={(e) =>
                      setForm({ ...form, payoutDetails: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="motivation">
                Why do you want to become a partner? (optional)
              </Label>
              <Textarea
                id="motivation"
                placeholder="Tell us briefly..."
                value={form.motivation}
                onChange={(e) =>
                  setForm({ ...form, motivation: e.target.value })
                }
                rows={3}
              />
            </div>

            {error && (
              <div className="text-sm text-red-500 bg-red-50 dark:bg-red-950/20 p-3 rounded">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={loading || plansLoading}
              size="lg"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading
                ? "Processing..."
                : requiresPayment
                  ? `Continue to Payment (₹${parseFloat(selectedPlan?.joiningFee || "0").toLocaleString("en-IN")})`
                  : "Create Partner Account"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground text-center">
            Already a partner?{" "}
            <Link
              href="/login"
              className="text-primary font-medium hover:underline"
            >
              Login
            </Link>
          </p>
          <p className="text-sm text-muted-foreground text-center">
            Just want to use services?{" "}
            <Link
              href="/register"
              className="text-primary font-medium hover:underline"
            >
              Register as User
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}