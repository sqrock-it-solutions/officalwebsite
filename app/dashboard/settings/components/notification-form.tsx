"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Bell, Loader2, Mail, Smartphone } from "lucide-react";

interface NotificationPrefs {
  email: {
    projectUpdates: boolean;
    messages: boolean;
    payments: boolean;
    marketing: boolean;
  };
  push: {
    projectUpdates: boolean;
    messages: boolean;
  };
}

const defaultPrefs: NotificationPrefs = {
  email: {
    projectUpdates: true,
    messages: true,
    payments: true,
    marketing: false,
  },
  push: {
    projectUpdates: true,
    messages: true,
  },
};

export function NotificationForm() {
  const [prefs, setPrefs] = useState<NotificationPrefs>(defaultPrefs);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/dashboard/settings/api/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(prefs),
      });

      if (!res.ok) {
        toast.error("Failed to save preferences");
        return;
      }

      toast.success("Notification preferences saved");
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notification Preferences
        </CardTitle>
        <CardDescription>
          Choose how you want to be notified
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Email */}
        <div>
          <div className="mb-4 flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Email Notifications</h3>
          </div>
          <div className="space-y-3">
            <ToggleRow
              label="Project Updates"
              desc="Get notified when your projects have updates"
              checked={prefs.email.projectUpdates}
              onChange={(v) =>
                setPrefs({
                  ...prefs,
                  email: { ...prefs.email, projectUpdates: v },
                })
              }
            />
            <ToggleRow
              label="Messages"
              desc="New messages from your project team"
              checked={prefs.email.messages}
              onChange={(v) =>
                setPrefs({ ...prefs, email: { ...prefs.email, messages: v } })
              }
            />
            <ToggleRow
              label="Payment Receipts"
              desc="Receipts and invoices for your payments"
              checked={prefs.email.payments}
              onChange={(v) =>
                setPrefs({ ...prefs, email: { ...prefs.email, payments: v } })
              }
            />
            <ToggleRow
              label="Marketing & Offers"
              desc="Product updates, offers, and newsletters"
              checked={prefs.email.marketing}
              onChange={(v) =>
                setPrefs({ ...prefs, email: { ...prefs.email, marketing: v } })
              }
            />
          </div>
        </div>

        <Separator />

        {/* Push */}
        <div>
          <div className="mb-4 flex items-center gap-2">
            <Smartphone className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Push Notifications</h3>
          </div>
          <div className="space-y-3">
            <ToggleRow
              label="Project Updates"
              desc="Real-time project status changes"
              checked={prefs.push.projectUpdates}
              onChange={(v) =>
                setPrefs({
                  ...prefs,
                  push: { ...prefs.push, projectUpdates: v },
                })
              }
            />
            <ToggleRow
              label="Messages"
              desc="Instant message notifications"
              checked={prefs.push.messages}
              onChange={(v) =>
                setPrefs({ ...prefs, push: { ...prefs.push, messages: v } })
              }
            />
          </div>
        </div>

        <Button onClick={handleSave} disabled={saving}>
          {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Preferences
        </Button>
      </CardContent>
    </Card>
  );
}

function ToggleRow({
  label,
  desc,
  checked,
  onChange,
}: {
  label: string;
  desc: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-lg border p-3">
      <div className="flex-1">
        <Label className="cursor-pointer text-sm font-medium">{label}</Label>
        <p className="mt-0.5 text-xs text-muted-foreground">{desc}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}