"use client";

import { useMemo, useState } from "react";
import { PaymentsStats } from "./payments-stats";
import { PaymentsFilters } from "./payments-filters";
import { PaymentRow } from "./payment-row";
import { PaymentDetailSheet } from "./payment-detail-sheet";
import { EmptyState } from "./empty-state";

type PaymentType = "all" | "membership" | "partnership" | "service";
type PaymentStatus =
  | "all"
  | "success"
  | "pending"
  | "failed"
  | "refunded"
  | "cancelled";

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

interface PaymentsClientProps {
  initialData: {
    payments: Payment[];
    stats: {
      total: number;
      success: number;
      pending: number;
      failed: number;
      refunded: number;
      totalSpent: number;
      totalRefunded: number;
    };
  };
}

export function PaymentsClient({ initialData }: PaymentsClientProps) {
  const [search, setSearch] = useState("");
  const [type, setType] = useState<PaymentType>("all");
  const [status, setStatus] = useState<PaymentStatus>("all");
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const { payments, stats } = initialData;

  const filteredPayments = useMemo(() => {
    return payments.filter((p) => {
      const matchesType = type === "all" || p.paymentType === type;
      const matchesStatus = status === "all" || p.status === status;
      const matchesSearch =
        search === "" ||
        (p.providerPaymentId?.toLowerCase() || "").includes(
          search.toLowerCase(),
        ) ||
        (p.providerOrderId?.toLowerCase() || "").includes(
          search.toLowerCase(),
        ) ||
        (p.membershipPlan?.name?.toLowerCase() || "").includes(
          search.toLowerCase(),
        ) ||
        (p.partnershipPlan?.name?.toLowerCase() || "").includes(
          search.toLowerCase(),
        ) ||
        (p.service?.name?.toLowerCase() || "").includes(
          search.toLowerCase(),
        );

      return matchesType && matchesStatus && matchesSearch;
    });
  }, [payments, type, status, search]);

  const handleView = (payment: Payment) => {
    setSelectedPayment(payment);
    setDetailOpen(true);
  };

  const handleResetFilters = () => {
    setSearch("");
    setType("all");
    setStatus("all");
  };

  const isFiltered = search !== "" || type !== "all" || status !== "all";

  return (
    <div className="flex flex-col gap-6">
      {/* HEADER */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Payments
        </h1>
        <p className="text-sm text-muted-foreground">
          View all your transactions, invoices, and receipts
        </p>
      </div>

      {/* STATS */}
      {stats.total > 0 && <PaymentsStats stats={stats} />}

      {/* FILTERS */}
      {stats.total > 0 && (
        <PaymentsFilters
          search={search}
          onSearchChange={setSearch}
          type={type}
          onTypeChange={setType}
          status={status}
          onStatusChange={setStatus}
          total={filteredPayments.length}
        />
      )}

      {/* LIST */}
      {filteredPayments.length === 0 ? (
        <EmptyState isFiltered={isFiltered} onReset={handleResetFilters} />
      ) : (
        <div className="flex flex-col gap-2">
          {filteredPayments.map((payment) => (
            <PaymentRow
              key={payment.id}
              payment={payment}
              onView={() => handleView(payment)}
            />
          ))}
        </div>
      )}

      {/* DETAIL SHEET */}
      <PaymentDetailSheet
        open={detailOpen}
        onOpenChange={setDetailOpen}
        payment={selectedPayment}
      />
    </div>
  );
}