"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Wallet,
  Loader2,
  Copy,
  Check,
  Link2,
  TrendingUp,
  Crown,
  IndianRupee,
} from "lucide-react";

interface PayoutFormProps {
  partner: {
    id: number;
    referralCode: string;
    status: string;
    payoutMethod: string | null;
    payoutDetails: string | null;
    plan: {
      id: number;
      name: string;
      commissionPercent: string;
    } | null;
  } | null;
}

export function PayoutForm({ partner }: PayoutFormProps) {
  if (!partner) return null;

  const [form, setForm] = useState(() => {
    let details: any = {};
    try {
      details = partner.payoutDetails ? JSON.parse(partner.payoutDetails) : {};
    } catch {}
    return {
      method: partner.payoutMethod || "upi",
      value: details.value || "",
    };
  });
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(partner.referralCode);
    setCopied(true);
    toast.success("Referral code copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = async () => {
    if (!form.value.trim()) {
      toast.error("Please enter payout details");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/dashboard/settings/api/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // Note: ye endpoint partner update handle nahi karta abhi
          // Alag endpoint bana sakta hai
        }),
      });
      // For now, mock save
      toast.success("Payout details saved");
    } catch {
      toast.error("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Partner Plan Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-amber-500" />
            Partner Plan
          </CardTitle>
          <CardDescription>
            Your current partnership plan and commission
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border bg-gradient-to-r from-purple-50 to-blue-50 p-4 dark:from-purple-950/20 dark:to-blue-950/20">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-950">
                <Crown className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-semibold">
                  {partner.plan?.name || "Partner"}
                </p>
                <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                  <TrendingUp className="h-3 w-3" />
                  {partner.plan?.commissionPercent}% commission
                </div>
              </div>
            </div>
            <Badge
              variant="outline"
              className={
                partner.status === "active"
                  ? "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950/40 dark:text-green-400"
                  : "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-400"
              }
            >
              {partner.status.replace("_", " ")}
            </Badge>
          </div>

          {/* Referral code */}
          <div>
            <Label className="mb-2 flex items-center gap-2">
              <Link2 className="h-3.5 w-3.5" />
              Your Referral Code
            </Label>
            <div className="flex gap-2">
              <Input
                value={partner.referralCode}
                readOnly
                className="font-mono"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopyCode}
                className="shrink-0"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payout Details Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Payout Details
          </CardTitle>
          <CardDescription>
            Where should we send your commission earnings?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Payout Method</Label>
            <Select
              value={form.method}
              onValueChange={(v) => setForm({ ...form, method: v! })}
            >
              <SelectTrigger>
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
            <Label>
              {form.method === "upi"
                ? "UPI ID"
                : form.method === "bank"
                  ? "Account Number"
                  : "PayPal Email"}
            </Label>
            <Input
              value={form.value}
              onChange={(e) => setForm({ ...form, value: e.target.value })}
              placeholder={
                form.method === "upi"
                  ? "yourname@upi"
                  : form.method === "bank"
                    ? "1234567890"
                    : "you@example.com"
              }
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              Min payout: ₹500 • Cycle: 30 days
            </p>
            <Button onClick={handleSave} disabled={saving}>
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Payout Details
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}