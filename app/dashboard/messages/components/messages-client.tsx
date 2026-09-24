"use client";

import { useState } from "react";
import { ProjectList } from "./project-list";
import { ProjectThread } from "./project-thread";
import { EmptyState } from "./empty-state";

interface MessagesClientProps {
  initialData: {
    projects: any[];
    unreadTotal: number;
    userId: string;
  };
  initialSelectedProjectId: number | null;
}

export function MessagesClient({
  initialData,
  initialSelectedProjectId,
}: MessagesClientProps) {
  const { projects, userId } = initialData;

  // Auto-select first project if none selected
  const defaultId =
    initialSelectedProjectId ||
    (projects.length > 0 ? projects[0].id : null);

  const [selectedId, setSelectedId] = useState<number | null>(defaultId);

  // No projects at all
  if (projects.length === 0) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <EmptyState variant="no-project" />
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden rounded-lg border bg-background">
      {/* Left: Project list */}
      <div className="w-full shrink-0 sm:w-80 md:w-96">
        <ProjectList
          projects={projects}
          selectedId={selectedId}
          userId={userId}
          onSelect={setSelectedId}
        />
      </div>

      {/* Right: Thread */}
      <div className="hidden flex-1 sm:block">
        {selectedId ? (
          <ProjectThread projectId={selectedId} userId={userId} />
        ) : (
          <EmptyState variant="no-project-selected" />
        )}
      </div>
    </div>
  );
}