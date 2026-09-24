"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServicesFiltersProps {
  search: string;
  onSearchChange: (v: string) => void;
  sortBy: "name" | "price" | "delivery";
  onSortChange: (v: "name" | "price" | "delivery") => void;
  total: number;
}

export function ServicesFilters({
  search,
  onSearchChange,
  sortBy,
  onSortChange,
  total,
}: ServicesFiltersProps) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="relative flex-1 md:max-w-sm">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search services..."
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
          {total} service{total !== 1 ? "s" : ""}
        </span>

        <Select value={sortBy} onValueChange={onSortChange as any}>
          <SelectTrigger className="w-[160px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Sort: Name</SelectItem>
            <SelectItem value="price">Sort: Price</SelectItem>
            <SelectItem value="delivery">Sort: Delivery</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}