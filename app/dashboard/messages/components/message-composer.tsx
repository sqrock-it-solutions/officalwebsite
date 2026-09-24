"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Send, Loader2 } from "lucide-react";

interface MessageComposerProps {
  projectId: number;
  onSent: () => void;
}

export function MessageComposer({ projectId, onSent }: MessageComposerProps) {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;

    setSending(true);

    try {
      const res = await fetch("/dashboard/messages/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId,
          message: message.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error("Failed to send", {
          description: data.message,
        });
        setSending(false);
        return;
      }

      setMessage("");
      onSent();
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="shrink-0 border-t bg-card p-4">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-xl border bg-background transition focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10">
          <Textarea
            placeholder="Type your message... Use Cmd/Ctrl + Enter to send"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="min-h-[90px] resize-none border-0 bg-transparent focus-visible:ring-0"
            maxLength={5000}
          />
          <div className="flex items-center justify-between border-t px-3 py-2">
            <p className="text-[11px] text-muted-foreground">
              {message.length}/5000 characters
            </p>
            <Button
              size="sm"
              onClick={handleSend}
              disabled={!message.trim() || sending}
            >
              {sending ? (
                <>
                  <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                  Sending
                </>
              ) : (
                <>
                  <Send className="mr-1.5 h-3.5 w-3.5" />
                  Send Message
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}