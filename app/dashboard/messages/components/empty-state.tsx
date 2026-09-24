"use client";

import { Button } from "@/components/ui/button";
import { MessageSquare, Plus, FolderOpen } from "lucide-react";
import Link from "next/link";

interface EmptyStateProps {
  variant: "no-project" | "no-project-selected" | "no-messages";
}

export function EmptyState({ variant }: EmptyStateProps) {
  if (variant === "no-project") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
        <div className="mb-4 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 p-6 dark:from-blue-950 dark:to-purple-950">
          <FolderOpen className="h-12 w-12 text-blue-600 dark:text-blue-400" />
        </div>
        <h2 className="text-xl font-semibold">No projects yet</h2>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          Create your first project to start messaging with our team.
        </p>
        <Button render={<Link href="/dashboard/projects/new" />} className="mt-6">
          <Plus className="mr-2 h-4 w-4" />
          Create Project
        </Button>
      </div>
    );
  }

  if (variant === "no-project-selected") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
        <div className="mb-4 rounded-full bg-muted p-6">
          <MessageSquare className="h-10 w-10 text-muted-foreground" />
        </div>
        <h3 className="text-base font-semibold">Select a project</h3>
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          Choose a project from the left to view and send messages
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
      <div className="mb-4 rounded-full bg-muted p-6">
        <MessageSquare className="h-10 w-10 text-muted-foreground" />
      </div>
      <h3 className="text-base font-semibold">No messages yet</h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        Start the conversation by sending your first message
      </p>
    </div>
  );
}