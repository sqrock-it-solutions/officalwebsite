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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";

export function PasswordForm() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.currentPassword) e.currentPassword = "Required";
    if (form.newPassword.length < 8)
      e.newPassword = "Must be at least 8 characters";
    if (form.newPassword !== form.confirmPassword)
      e.confirmPassword = "Passwords don't match";
    if (form.currentPassword === form.newPassword)
      e.newPassword = "New password must be different";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);

    try {
      const res = await fetch("/dashboard/settings/api/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error("Failed to change password", {
          description: data.message,
        });
        setSaving(false);
        return;
      }

      toast.success("Password changed successfully", {
        description: "All other sessions have been logged out",
      });
      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err: any) {
      toast.error("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const passwordFields = [
    {
      key: "currentPassword" as const,
      label: "Current Password",
      showKey: "current" as const,
      placeholder: "Enter current password",
    },
    {
      key: "newPassword" as const,
      label: "New Password",
      showKey: "new" as const,
      placeholder: "Min. 8 characters",
    },
    {
      key: "confirmPassword" as const,
      label: "Confirm New Password",
      showKey: "confirm" as const,
      placeholder: "Re-enter new password",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5" />
          Change Password
        </CardTitle>
        <CardDescription>
          Update your password to keep your account secure
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {passwordFields.map((field) => (
            <div key={field.key} className="space-y-2">
              <Label htmlFor={field.key}>{field.label}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id={field.key}
                  type={showPasswords[field.showKey] ? "text" : "password"}
                  placeholder={field.placeholder}
                  className="pl-10 pr-10"
                  value={form[field.key]}
                  onChange={(e) =>
                    setForm({ ...form, [field.key]: e.target.value })
                  }
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPasswords({
                      ...showPasswords,
                      [field.showKey]: !showPasswords[field.showKey],
                    })
                  }
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                >
                  {showPasswords[field.showKey] ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors[field.key] && (
                <p className="flex items-center gap-1 text-xs text-red-500">
                  <AlertCircle className="h-3 w-3" />
                  {errors[field.key]}
                </p>
              )}
            </div>
          ))}

          <div className="rounded-lg border border-blue-200 bg-blue-50/50 p-3 dark:border-blue-900 dark:bg-blue-950/20">
            <p className="flex items-start gap-2 text-xs text-blue-800 dark:text-blue-300">
              <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              <span>
                For security, you'll be logged out from all other devices
                after changing your password.
              </span>
            </p>
          </div>

          <Button type="submit" disabled={saving}>
            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Update Password
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}