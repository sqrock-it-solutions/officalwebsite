"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X } from "lucide-react";

type PaymentType = "all" | "membership" | "partnership" | "service";
type PaymentStatus =
  | "all"
  | "success"
  | "pending"
  | "failed"
  | "refunded"
  | "cancelled";

interface PaymentsFiltersProps {
  search: string;
  onSearchChange: (v: string) => void;
  type: PaymentType;
  onTypeChange: (v: PaymentType) => void;
  status: PaymentStatus;
  onStatusChange: (v: PaymentStatus) => void;
  total: number;
}

const typeTabs: { value: PaymentType; label: string }[] = [
  { value: "all", label: "All" },
  { value: "membership", label: "Membership" },
  { value: "partnership", label: "Partnership" },
  { value: "service", label: "Services" },
];

export function PaymentsFilters({
  search,
  onSearchChange,
  type,
  onTypeChange,
  status,
  onStatusChange,
  total,
}: PaymentsFiltersProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Type tabs */}
      <div className="flex flex-wrap gap-2">
        {typeTabs.map((tab) => (
          <Button
            key={tab.value}
            variant={type === tab.value ? "default" : "outline"}
            size="sm"
            onClick={() => onTypeChange(tab.value)}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Search + status filter */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-sm">
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by payment ID or plan..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 pr-9"
          />
          {search && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm p-1 text-muted-foreground hover:bg-muted"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden text-sm text-muted-foreground md:inline">
            {total} payment{total !== 1 ? "s" : ""}
          </span>

          <Select value={status} onValueChange={onStatusChange as any}>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="success">Success</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="refunded">Refunded</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}