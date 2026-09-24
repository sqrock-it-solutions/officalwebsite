"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PaymentStatusBadge } from "./payment-status-badge";
import {
  Crown,
  Handshake,
  Code,
  Smartphone,
  Megaphone,
  Palette,
  ChevronRight,
  Calendar,
} from "lucide-react";

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
  membershipPlan: { id: number; name: string; billingCycle: string } | null;
  partnershipPlan: { id: number; name: string } | null;
  service: {
    id: number;
    name: string;
    icon: string | null;
    color: string | null;
  } | null;
}

interface PaymentRowProps {
  payment: Payment;
  onView: () => void;
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
  return {
    icon: Code,
    color: "#0a0a0a",
    title: "Payment",
    subtitle: "",
  };
}

export function PaymentRow({ payment, onView }: PaymentRowProps) {
  const meta = getPaymentMeta(payment);
  const Icon = meta.icon;
  const amount = parseFloat(payment.amount);

  const formatDate = (date: string | null) => {
    if (!date) return "—";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <button
      onClick={onView}
      className="group flex w-full items-center gap-3 rounded-lg border bg-card p-3 text-left transition-all hover:border-primary/30 hover:shadow-sm"
    >
      {/* Icon */}
      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg"
        style={{ backgroundColor: meta.color + "15" }}
      >
        <Icon className="h-5 w-5" style={{ color: meta.color }} />
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{meta.title}</p>
            <div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span className="capitalize">{payment.paymentType}</span>
              {meta.subtitle && <span>• {meta.subtitle}</span>}
            </div>
          </div>

          <div className="flex shrink-0 flex-col items-end gap-1">
            <p className="text-sm font-bold">
              ₹{amount.toLocaleString("en-IN")}
            </p>
            <PaymentStatusBadge status={payment.status} size="sm" />
          </div>
        </div>

        <div className="mt-1.5 flex items-center gap-3 text-[11px] text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {formatDate(payment.paidAt || payment.createdAt)}
          </div>
          {payment.providerPaymentId && (
            <span className="truncate font-mono">
              {payment.providerPaymentId.slice(0, 18)}...
            </span>
          )}
        </div>
      </div>

      {/* Chevron */}
      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
    </button>
  );
}