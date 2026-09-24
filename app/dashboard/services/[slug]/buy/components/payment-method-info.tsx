"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreditCard, Smartphone, Building2, Wallet } from "lucide-react";

const methods = [
  { icon: CreditCard, label: "Credit/Debit Card" },
  { icon: Smartphone, label: "UPI / QR" },
  { icon: Building2, label: "Net Banking" },
  { icon: Wallet, label: "Wallets" },
];

export function PaymentMethodInfo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Accepted Payment Methods</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {methods.map((method) => (
            <div
              key={method.label}
              className="flex items-center gap-2 rounded-lg border bg-muted/30 p-3"
            >
              <method.icon className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="text-xs font-medium">{method.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}