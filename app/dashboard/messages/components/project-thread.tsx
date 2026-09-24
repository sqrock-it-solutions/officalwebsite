"use client";

import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";
import { ThreadHeader } from "./thread-header";
import { MessageItem } from "./message-item";
import { MessageComposer } from "./message-composer";
import { EmptyState } from "./empty-state";
import { Loader2 } from "lucide-react";

interface ProjectThreadProps {
  projectId: number;
  userId: string;
}

export function ProjectThread({ projectId, userId }: ProjectThreadProps) {
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const fetchThread = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/dashboard/messages/api?projectId=${projectId}`,
      );
      const data = await res.json();

      if (!res.ok) {
        toast.error("Failed to load messages");
        return;
      }

      setProject(data.project);
      setMessages(data.messages || []);
    } catch (err) {
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (projectId) fetchThread();
  }, [projectId]);

  // Auto scroll on new messages
  useEffect(() => {
    if (scrollRef.current && messages.length > 0) {
      setTimeout(() => {
        scrollRef.current?.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 100);
    }
  }, [messages.length]);

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!project) {
    return <EmptyState variant="no-project-selected" />;
  }

  return (
    <div className="flex h-full flex-col">
      <ThreadHeader project={project} />

      <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <EmptyState variant="no-messages" />
        ) : (
          <div className="divide-y">
            {messages.map((msg) => (
              <MessageItem
                key={msg.id}
                message={msg}
                isOwn={msg.sender.id === userId}
              />
            ))}
          </div>
        )}
      </div>

      <MessageComposer projectId={projectId} onSent={fetchThread} />
    </div>
  );
}