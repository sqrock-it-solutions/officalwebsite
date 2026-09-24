"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, X } from "lucide-react";

type Status = "all" | "pending" | "in_progress" | "review" | "completed" | "cancelled";
type SortBy = "recent" | "oldest" | "priority" | "due";

interface ProjectsFiltersProps {
  search: string;
  onSearchChange: (v: string) => void;
  status: Status;
  onStatusChange: (v: Status) => void;
  sortBy: SortBy;
  onSortChange: (v: SortBy) => void;
  total: number;
  stats: {
    total: number;
    pending: number;
    in_progress: number;
    review: number;
    completed: number;
    cancelled: number;
  };
}

const statusTabs: { value: Status; label: string; countKey: keyof ProjectsFiltersProps["stats"] }[] = [
  { value: "all", label: "All", countKey: "total" },
  { value: "pending", label: "Pending", countKey: "pending" },
  { value: "in_progress", label: "In Progress", countKey: "in_progress" },
  { value: "review", label: "Review", countKey: "review" },
  { value: "completed", label: "Completed", countKey: "completed" },
  { value: "cancelled", label: "Cancelled", countKey: "cancelled" },
];

export function ProjectsFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  sortBy,
  onSortChange,
  total,
  stats,
}: ProjectsFiltersProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* STATUS TABS */}
      <div className="flex flex-wrap gap-2">
        {statusTabs.map((tab) => {
          const count = stats[tab.countKey];
          const isActive = status === tab.value;
          return (
            <Button
              key={tab.value}
              variant={isActive ? "default" : "outline"}
              size="sm"
              onClick={() => onStatusChange(tab.value)}
              className="gap-1.5"
            >
              {tab.label}
              <Badge
                variant={isActive ? "secondary" : "outline"}
                className="ml-0.5 h-5 min-w-5 rounded-full px-1.5 text-[10px]"
              >
                {count}
              </Badge>
            </Button>
          );
        })}
      </div>

      {/* SEARCH + SORT */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-sm">
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
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
            {total} project{total !== 1 ? "s" : ""}
          </span>

          <Select value={sortBy} onValueChange={onSortChange as any}>
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="priority">By Priority</SelectItem>
              <SelectItem value="due">By Due Date</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}