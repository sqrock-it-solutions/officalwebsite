"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Wallet,
  TrendingUp,
  Clock,
  CheckCircle2,
  RotateCcw,
  IndianRupee,
} from "lucide-react";

interface PaymentsStatsProps {
  stats: {
    total: number;
    success: number;
    pending: number;
    failed: number;
    refunded: number;
    totalSpent: number;
    totalRefunded: number;
  };
}

export function PaymentsStats({ stats }: PaymentsStatsProps) {
  const cards = [
    {
      label: "Total Spent",
      value: `₹${stats.totalSpent.toLocaleString("en-IN")}`,
      icon: IndianRupee,
      color: "text-green-600 dark:text-green-400",
      bg: "bg-green-100 dark:bg-green-950/40",
    },
    {
      label: "Transactions",
      value: stats.total.toString(),
      icon: Wallet,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-100 dark:bg-blue-950/40",
    },
    {
      label: "Successful",
      value: stats.success.toString(),
      icon: CheckCircle2,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-100 dark:bg-emerald-950/40",
    },
    {
      label: "Refunded",
      value: `₹${stats.totalRefunded.toLocaleString("en-IN")}`,
      icon: RotateCcw,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-100 dark:bg-purple-950/40",
    },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.label}>
          <CardContent className="flex items-center justify-between p-4">
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">{card.label}</p>
              <p className="mt-1 truncate text-xl font-bold">{card.value}</p>
            </div>
            <div className={`rounded-lg p-2.5 ${card.bg} shrink-0`}>
              <card.icon className={`h-5 w-5 ${card.color}`} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}