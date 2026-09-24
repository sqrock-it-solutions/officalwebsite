"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  XCircle,
  Clock,
  Loader2,
  Receipt,
  IndianRupee,
} from "lucide-react";

interface Payment {
  id: number;
  amount: string;
  currency: string;
  status: string;
  provider: string;
  providerPaymentId: string | null;
  providerOrderId: string | null;
  failureReason: string | null;
  paidAt: string | null;
  createdAt: string;
}

const statusConfig: Record<
  string,
  { label: string; icon: any; className: string }
> = {
  success: {
    label: "Success",
    icon: CheckCircle2,
    className:
      "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-900",
  },
  pending: {
    label: "Pending",
    icon: Clock,
    className:
      "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-900",
  },
  processing: {
    label: "Processing",
    icon: Loader2,
    className:
      "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-900",
  },
  failed: {
    label: "Failed",
    icon: XCircle,
    className:
      "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-900",
  },
  cancelled: {
    label: "Cancelled",
    icon: XCircle,
    className:
      "bg-neutral-50 text-neutral-700 border-neutral-200 dark:bg-neutral-950 dark:text-neutral-400 dark:border-neutral-900",
  },
  refunded: {
    label: "Refunded",
    icon: XCircle,
    className:
      "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-400 dark:border-purple-900",
  },
};

export function PaymentHistory({ payments }: { payments: Payment[] }) {
  return (
    <Card id="payment-history">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-muted p-2">
            <Receipt className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-base">Payment History</CardTitle>
            <CardDescription className="text-xs">
              Your membership transactions
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {payments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="rounded-full bg-muted p-3 mb-2">
              <Receipt className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium">No payments yet</p>
            <p className="text-xs text-muted-foreground">
              Your transactions will appear here
            </p>
          </div>
        ) : (
          <div className="flex flex-col divide-y">
            {payments.map((payment) => {
              const config =
                statusConfig[payment.status] || statusConfig.pending;
              const StatusIcon = config.icon;

              return (
                <div
                  key={payment.id}
                  className="flex items-center justify-between py-3 gap-3"
                >
                  {/* Left */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="rounded-lg bg-muted p-2 shrink-0">
                      <IndianRupee className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">
                        Membership Payment
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(payment.createdAt).toLocaleDateString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          },
                        )}
                      </p>
                      {payment.providerPaymentId && (
                        <p className="text-[10px] text-muted-foreground font-mono truncate mt-0.5">
                          ID: {payment.providerPaymentId}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right */}
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <p className="text-sm font-semibold">
                      ₹{parseFloat(payment.amount).toLocaleString("en-IN")}
                    </p>
                    <Badge
                      variant="outline"
                      className={`text-[10px] gap-1 ${config.className}`}
                    >
                      <StatusIcon className="h-3 w-3" />
                      {config.label}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}