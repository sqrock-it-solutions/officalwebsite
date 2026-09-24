"use client";

import { Button } from "@/components/ui/button";
import { PackageOpen, RotateCcw } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  onReset?: () => void;
}

export function EmptyState({
  title,
  description,
  onReset,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16 text-center">
      <div className="mb-3 rounded-full bg-muted p-4">
        <PackageOpen className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        {description}
      </p>
      {onReset && (
        <Button variant="outline" size="sm" onClick={onReset} className="mt-4">
          <RotateCcw className="mr-2 h-3.5 w-3.5" />
          Clear search
        </Button>
      )}
    </div>
  );
}