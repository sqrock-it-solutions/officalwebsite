"use client";

import { Button } from "@/components/ui/button";
import { Rocket, Plus, Filter } from "lucide-react";
import Link from "next/link";

interface EmptyStateProps {
  isFiltered?: boolean;
  onReset?: () => void;
}

export function EmptyState({ isFiltered, onReset }: EmptyStateProps) {
  if (isFiltered) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16 text-center">
        <div className="mb-3 rounded-full bg-muted p-4">
          <Filter className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-base font-semibold">No projects match</h3>
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          Try a different filter or search term to find what you're looking
          for.
        </p>
        {onReset && (
          <Button variant="outline" size="sm" onClick={onReset} className="mt-4">
            Clear filters
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-20 text-center">
      <div className="mb-4 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 p-5 dark:from-blue-950 dark:to-purple-950">
        <Rocket className="h-10 w-10 text-blue-600 dark:text-blue-400" />
      </div>
      <h3 className="text-lg font-semibold">No projects yet</h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        Start your first project and get your ideas built by our team.
      </p>
      <Button  className="mt-5">
        <Link href="/dashboard/projects/new">
          <Plus className="mr-2 h-4 w-4" />
          Create Your First Project
        </Link>
      </Button>
    </div>
  );
}