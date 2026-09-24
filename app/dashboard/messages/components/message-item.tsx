"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  ShieldCheck,
  User as UserIcon,
} from "lucide-react";

interface MessageItemProps {
  message: {
    id: number;
    message: string;
    attachments: string | null;
    isRead: boolean;
    createdAt: string;
    sender: {
      id: string;
      name: string;
      image: string | null;
      role: string;
    };
  };
  isOwn: boolean;
}

export function MessageItem({ message, isOwn }: MessageItemProps) {
  const isTeam = message.sender.role === "admin";
  const initials = message.sender.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const formattedTime = new Date(message.createdAt).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="group relative">
      <div className="flex items-start gap-3 px-6 py-4 transition-colors hover:bg-muted/30">
        {/* Avatar */}
        <Avatar className="h-9 w-9 shrink-0 border">
          {message.sender.image ? (
            <AvatarImage src={message.sender.image} alt={message.sender.name} />
          ) : (
            <AvatarFallback
              className={cn(
                "text-xs font-medium",
                isTeam
                  ? "bg-gradient-to-br from-purple-500 to-blue-500 text-white"
                  : "bg-gradient-to-br from-blue-500 to-cyan-500 text-white",
              )}
            >
              {initials}
            </AvatarFallback>
          )}
        </Avatar>

        {/* Content */}
        <div className="min-w-0 flex-1">
          {/* Header row */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold">
              {isOwn ? "You" : message.sender.name}
            </span>

            {isTeam && (
              <Badge
                variant="outline"
                className="h-5 gap-1 border-purple-200 bg-purple-50 px-1.5 text-[10px] text-purple-700 dark:border-purple-900 dark:bg-purple-950/40 dark:text-purple-400"
              >
                <ShieldCheck className="h-2.5 w-2.5" />
                Team
              </Badge>
            )}

            <span className="text-[11px] text-muted-foreground">
              {formattedTime}
            </span>
          </div>

          {/* Message body */}
          <div className="mt-1.5">
            <p className="whitespace-pre-wrap break-words text-sm leading-relaxed text-foreground/90">
              {message.message}
            </p>
          </div>

          {/* Attachments */}
          {message.attachments && (
            <div className="mt-2 flex flex-wrap gap-2">
              {(() => {
                try {
                  const files = JSON.parse(message.attachments);
                  return files.map((url: string, i: number) => (
                    <a
                      key={i}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-md border bg-background px-2.5 py-1.5 text-xs text-muted-foreground transition hover:bg-muted"
                    >
                      📎 Attachment {i + 1}
                    </a>
                  ));
                } catch {
                  return null;
                }
              })()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}