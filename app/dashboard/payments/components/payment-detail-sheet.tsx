"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PaymentStatusBadge } from "./payment-status-badge";
import {
  Crown,
  Handshake,
  Code,
  Smartphone,
  Megaphone,
  Palette,
  Download,
  Copy,
  Check,
  Calendar,
  Hash,
  CreditCard,
  AlertCircle,
  RotateCcw,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Payment {
  id: number;
  paymentType: string;
  amount: string;
  currency: string;
  provider: string;
  providerOrderId: string | null;
  providerPaymentId: string | null;
  status: string;
  failureReason: string | null;
  paidAt: string | null;
  refundedAt: string | null;
  createdAt: string;
  updatedAt: string;
  membershipPlan: { id: number; name: string; billingCycle: string } | null;
  partnershipPlan: { id: number; name: string } | null;
  service: {
    id: number;
    name: string;
    icon: string | null;
    color: string | null;
  } | null;
}

interface PaymentDetailSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  payment: Payment | null;
}

const iconMap: Record<string, any> = {
  Code,
  Smartphone,
  Megaphone,
  Palette,
};

function getPaymentMeta(payment: Payment) {
  if (payment.paymentType === "membership" && payment.membershipPlan) {
    return {
      icon: Crown,
      color: "#f59e0b",
      title: `${payment.membershipPlan.name} Membership`,
      subtitle: payment.membershipPlan.billingCycle,
    };
  }
  if (payment.paymentType === "partnership" && payment.partnershipPlan) {
    return {
      icon: Handshake,
      color: "#8b5cf6",
      title: `${payment.partnershipPlan.name} Partnership`,
      subtitle: "One-time",
    };
  }
  if (payment.paymentType === "service" && payment.service) {
    const Icon = iconMap[payment.service.icon || "Code"] || Code;
    return {
      icon: Icon,
      color: payment.service.color || "#0a0a0a",
      title: payment.service.name,
      subtitle: "Service",
    };
  }
  return { icon: Code, color: "#0a0a0a", title: "Payment", subtitle: "" };
}

export function PaymentDetailSheet({
  open,
  onOpenChange,
  payment,
}: PaymentDetailSheetProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!payment) return null;

  const meta = getPaymentMeta(payment);
  const Icon = meta.icon;
  const amount = parseFloat(payment.amount);

  const formatDate = (date: string | null) => {
    if (!date) return "—";
    return new Date(date).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleCopy = (value: string, field: string) => {
    navigator.clipboard.writeText(value);
    setCopiedField(field);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleDownload = () => {
    toast.info("Receipt download", {
      description: "Receipt generation will be available shortly.",
    });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 p-0 sm:max-w-md"
      >
        {/* HEADER */}
        <SheetHeader
          className="shrink-0 border-b px-6 py-5"
          style={{
            background: `linear-gradient(135deg, ${meta.color}10 0%, transparent 100%)`,
          }}
        >
          <div className="flex items-start gap-3">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
              style={{ backgroundColor: meta.color + "20" }}
            >
              <Icon className="h-6 w-6" style={{ color: meta.color }} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {payment.paymentType}
              </p>
              <SheetTitle className="mt-0.5 line-clamp-2 text-lg">
                {meta.title}
              </SheetTitle>
              <div className="mt-2">
                <PaymentStatusBadge status={payment.status} />
              </div>
            </div>
          </div>

          {/* Amount */}
          <div className="mt-4 rounded-lg border bg-background/50 p-4">
            <p className="text-xs text-muted-foreground">Amount</p>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-3xl font-bold">
                ₹{amount.toLocaleString("en-IN")}
              </span>
              <span className="text-sm text-muted-foreground">
                {payment.currency}
              </span>
            </div>
          </div>
        </SheetHeader>

        {/* BODY */}
        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="space-y-5 px-6 py-6">
            {/* Failure reason */}
            {payment.status === "failed" && payment.failureReason && (
              <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-900 dark:bg-red-950/20">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600 dark:text-red-400" />
                <div>
                  <p className="text-sm font-medium text-red-800 dark:text-red-300">
                    Payment Failed
                  </p>
                  <p className="mt-0.5 text-xs text-red-700 dark:text-red-400">
                    {payment.failureReason}
                  </p>
                </div>
              </div>
            )}

            {/* Refund info */}
            {payment.status === "refunded" && (
              <div className="flex items-start gap-2 rounded-lg border border-purple-200 bg-purple-50 p-3 dark:border-purple-900 dark:bg-purple-950/20">
                <RotateCcw className="mt-0.5 h-4 w-4 shrink-0 text-purple-600 dark:text-purple-400" />
                <div>
                  <p className="text-sm font-medium text-purple-800 dark:text-purple-300">
                    Refunded
                  </p>
                  <p className="mt-0.5 text-xs text-purple-700 dark:text-purple-400">
                    Refunded on {formatDate(payment.refundedAt)}
                  </p>
                </div>
              </div>
            )}

            {/* Timeline */}
            <div>
              <h4 className="mb-3 text-sm font-semibold">Timeline</h4>
              <div className="space-y-3">
                <TimelineRow
                  label="Initiated"
                  value={formatDate(payment.createdAt)}
                  icon={Calendar}
                />
                {payment.paidAt && (
                  <TimelineRow
                    label="Paid"
                    value={formatDate(payment.paidAt)}
                    icon={Check}
                    iconClass="text-green-500"
                  />
                )}
                {payment.refundedAt && (
                  <TimelineRow
                    label="Refunded"
                    value={formatDate(payment.refundedAt)}
                    icon={RotateCcw}
                    iconClass="text-purple-500"
                  />
                )}
              </div>
            </div>

            <Separator />

            {/* Transaction details */}
            <div>
              <h4 className="mb-3 text-sm font-semibold">
                Transaction Details
              </h4>
              <div className="space-y-3">
                <CopyRow
                  icon={CreditCard}
                  label="Provider"
                  value={payment.provider}
                  onCopy={handleCopy}
                  copiedField={copiedField}
                  fieldKey="provider"
                  capitalize
                />
                {payment.providerOrderId && (
                  <CopyRow
                    icon={Hash}
                    label="Order ID"
                    value={payment.providerOrderId}
                    onCopy={handleCopy}
                    copiedField={copiedField}
                    fieldKey="order"
                    mono
                  />
                )}
                {payment.providerPaymentId && (
                  <CopyRow
                    icon={Hash}
                    label="Payment ID"
                    value={payment.providerPaymentId}
                    onCopy={handleCopy}
                    copiedField={copiedField}
                    fieldKey="payment"
                    mono
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="shrink-0 border-t bg-background/95 px-6 py-4 backdrop-blur">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Close
            </Button>
            {payment.status === "success" && (
              <Button onClick={handleDownload} className="flex-1">
                <Download className="mr-2 h-4 w-4" />
                Receipt
              </Button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function TimelineRow({
  label,
  value,
  icon: Icon,
  iconClass = "text-muted-foreground",
}: {
  label: string;
  value: string;
  icon: any;
  iconClass?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-background">
        <Icon className={`h-3.5 w-3.5 ${iconClass}`} />
      </div>
      <div className="flex flex-1 items-center justify-between">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-xs text-muted-foreground">{value}</span>
      </div>
    </div>
  );
}

function CopyRow({
  icon: Icon,
  label,
  value,
  onCopy,
  copiedField,
  fieldKey,
  mono,
  capitalize,
}: {
  icon: any;
  label: string;
  value: string;
  onCopy: (v: string, k: string) => void;
  copiedField: string | null;
  fieldKey: string;
  mono?: boolean;
  capitalize?: boolean;
}) {
  const isCopied = copiedField === fieldKey;

  return (
    <div className="flex items-center justify-between gap-2 rounded-lg border p-3">
      <div className="flex min-w-0 items-center gap-3">
        <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
        <div className="min-w-0">
          <p className="text-[11px] text-muted-foreground">{label}</p>
          <p
            className={`truncate text-sm font-medium ${mono ? "font-mono" : ""} ${capitalize ? "capitalize" : ""}`}
          >
            {value}
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={() => onCopy(value, fieldKey)}
        className="shrink-0 rounded-sm p-1.5 text-muted-foreground hover:bg-muted"
      >
        {isCopied ? (
          <Check className="h-3.5 w-3.5 text-green-500" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
      </button>
    </div>
  );
}