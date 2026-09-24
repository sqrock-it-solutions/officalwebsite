"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { ServiceSummary } from "./service-summary";
import { OrderSummary } from "./order-summary";
import { PaymentMethodInfo } from "./payment-method-info";
import { SuccessDialog } from "./success-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
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
  ArrowLeft,
  Lock,
  Loader2,
  AlertCircle,
  FileText,
  Flag,
  Calendar,
  ShoppingCart,
} from "lucide-react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface BuyClientProps {
  service: {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    icon: string | null;
    color: string | null;
    standalonePrice: string;
    deliveryDays: number;
  };
  user: {
    name: string;
    email: string;
  };
}

const priorityOptions = [
  { value: "low", label: "Low", desc: "No rush" },
  { value: "normal", label: "Normal", desc: "Standard" },
  { value: "high", label: "High", desc: "Faster" },
  { value: "urgent", label: "Urgent", desc: "ASAP" },
] as const;

export function BuyClient({ service, user }: BuyClientProps) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    brief: "",
    priority: "normal" as "low" | "normal" | "high" | "urgent",
    dueAt: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [createdProject, setCreatedProject] = useState<{
    id: number;
    title: string;
  } | null>(null);

  const price = parseFloat(service.standalonePrice);

  // Load Razorpay script
  useEffect(() => {
    if (document.getElementById("razorpay-script")) return;
    const script = document.createElement("script");
    script.id = "razorpay-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const validate = () => {
    const e: Record<string, string> = {};
    if (form.title.trim().length < 5)
      e.title = "Title must be at least 5 characters";
    if (form.description.trim().length < 20)
      e.description = "Description must be at least 20 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePurchase = async () => {
    if (!validate()) {
      toast.error("Please fill in required fields");
      return;
    }

    setLoading(true);

    try {
      // Step 1: Create order
      const orderRes = await fetch(
        `/dashboard/services/${service.slug}/buy/api/purchase`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "create-order",
            serviceId: service.id,
            title: form.title,
            description: form.description,
            brief: form.brief,
            priority: form.priority,
            dueAt: form.dueAt || null,
          }),
        },
      );

      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        toast.error("Failed to create order", {
          description: orderData.message,
        });
        setLoading(false);
        return;
      }

      // Step 2: Open Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "SQRock",
        description: service.name,
        order_id: orderData.orderId,
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: { color: service.color || "#0a0a0a" },
        handler: async function (response: any) {
          // Step 3: Verify
          const verifyRes = await fetch(
            `/dashboard/services/${service.slug}/buy/api/purchase`,
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
            toast.error("Payment verification failed", {
              description:
                verifyData.message || "Please contact support",
            });
            setLoading(false);
            return;
          }

          // Success!
          setCreatedProject(verifyData.project);
          setShowSuccess(true);
          setLoading(false);
        },
        modal: {
          ondismiss: async function () {
            await fetch(
              `/dashboard/services/${service.slug}/buy/api/purchase`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  action: "cancel-payment",
                  paymentRecordId: orderData.paymentRecordId,
                }),
              },
            );
            toast.info("Payment cancelled");
            setLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err: any) {
      console.error(err);
      toast.error("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        {/* Back link */}
        <div>
          <Button variant="ghost" size="sm" >
            <Link href="/dashboard/services">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Services
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Purchase {service.name}
          </h1>
          <p className="text-sm text-muted-foreground">
            Fill in your project details and complete payment
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          {/* LEFT: Form + Service info */}
          <div className="flex flex-col gap-6">
            {/* Project details form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <FileText className="h-4 w-4" />
                  Project Details
                </CardTitle>
                <CardDescription>
                  Tell us what you need so we can get started
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">
                    Project Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    placeholder="e.g., Landing page for my SaaS product"
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    className={errors.title ? "border-red-500" : ""}
                  />
                  {errors.title && (
                    <p className="flex items-center gap-1 text-xs text-red-500">
                      <AlertCircle className="h-3 w-3" />
                      {errors.title}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">
                    Short Description <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Briefly describe what you need..."
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    rows={3}
                    className={errors.description ? "border-red-500" : ""}
                  />
                  <div className="flex items-center justify-between">
                    {errors.description ? (
                      <p className="flex items-center gap-1 text-xs text-red-500">
                        <AlertCircle className="h-3 w-3" />
                        {errors.description}
                      </p>
                    ) : (
                      <p className="text-xs text-muted-foreground">
                        Minimum 20 characters
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      {form.description.length} chars
                    </p>
                  </div>
                </div>

                {/* Brief */}
                <div className="space-y-2">
                  <Label htmlFor="brief">Detailed Brief (Optional)</Label>
                  <Textarea
                    id="brief"
                    placeholder="Add references, links, colors, features..."
                    value={form.brief}
                    onChange={(e) =>
                      setForm({ ...form, brief: e.target.value })
                    }
                    rows={5}
                  />
                </div>

                {/* Priority + Due Date */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Flag className="h-3.5 w-3.5" />
                      Priority
                    </Label>
                    <Select
                      value={form.priority}
                      onValueChange={(v) =>
                        setForm({ ...form, priority: v as any })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {priorityOptions.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label} — {opt.desc}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="dueAt"
                      className="flex items-center gap-2"
                    >
                      <Calendar className="h-3.5 w-3.5" />
                      Preferred Due Date
                    </Label>
                    <Input
                      id="dueAt"
                      type="date"
                      value={form.dueAt}
                      onChange={(e) =>
                        setForm({ ...form, dueAt: e.target.value })
                      }
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Service info */}
            <ServiceSummary service={service} />

            {/* Payment methods */}
            <PaymentMethodInfo />
          </div>

          {/* RIGHT: Order summary + Pay button */}
          <div className="flex flex-col gap-4">
            <OrderSummary
              price={price}
              serviceName={service.name}
              membershipSave={price - 500 > 0 ? price - 500 : 0}
            />

            <Button
              size="lg"
              onClick={handlePurchase}
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Lock className="mr-2 h-4 w-4" />
                  Pay ₹{price.toLocaleString("en-IN")}
                </>
              )}
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              By proceeding, you agree to our{" "}
              <Link href="/terms" className="underline hover:text-foreground">
                Terms of Service
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Success dialog */}
      {createdProject && (
        <SuccessDialog
          open={showSuccess}
          projectTitle={createdProject.title}
          projectId={createdProject.id}
        />
      )}
    </>
  );
}