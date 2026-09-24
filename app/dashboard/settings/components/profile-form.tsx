"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AvatarUpload } from "./avatar-upload";
import {
  Loader2,
  Mail,
  User as UserIcon,
  CheckCircle2,
  Crown,
  Handshake,
} from "lucide-react";

interface ProfileFormProps {
  user: {
    id: string;
    name: string;
    email: string;
    image: string | null;
    emailVerified: boolean;
    isMember: boolean;
    isPartner: boolean;
    role: string;
    createdAt: string;
  };
}

export function ProfileForm({ user }: ProfileFormProps) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    image: user.image,
  });
  const [saving, setSaving] = useState(false);

  const isDirty =
    form.name !== user.name ||
    form.email !== user.email ||
    form.image !== user.image;

  const handleSave = async () => {
    setSaving(true);

    try {
      const res = await fetch("/dashboard/settings/api/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error("Failed to update", {
          description: data.message,
        });
        setSaving(false);
        return;
      }

      toast.success("Profile updated successfully");
      router.refresh();
    } catch (err: any) {
      toast.error("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Profile Card */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            Update your personal information and profile picture
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar */}
          <AvatarUpload
            value={form.image}
            name={form.name}
            onChange={(url) => setForm({ ...form, image: url })}
          />

          <Separator />

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              <UserIcon className="h-3.5 w-3.5" />
              Full Name
            </Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your full name"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5" />
              Email Address
            </Label>
            <div className="flex items-center gap-2">
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
              />
              {user.emailVerified && (
                <Badge
                  variant="outline"
                  className="gap-1 shrink-0 border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950/40 dark:text-green-400"
                >
                  <CheckCircle2 className="h-3 w-3" />
                  Verified
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Changing email will require re-verification
            </p>
          </div>

          <Separator />

          {/* Save button */}
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              {isDirty ? "You have unsaved changes" : "All changes saved"}
            </p>
            <Button onClick={handleSave} disabled={!isDirty || saving}>
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Account Info Card */}
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>
            Your account status and role
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Account Type</span>
            <div className="flex gap-2">
              <Badge variant="outline" className="capitalize">
                {user.role}
              </Badge>
              {user.isMember && (
                <Badge className="gap-1 bg-amber-500 hover:bg-amber-600">
                  <Crown className="h-3 w-3" />
                  Member
                </Badge>
              )}
              {user.isPartner && (
                <Badge className="gap-1 bg-purple-500 hover:bg-purple-600">
                  <Handshake className="h-3 w-3" />
                  Partner
                </Badge>
              )}
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Member Since</span>
            <span className="text-sm font-medium">
              {new Date(user.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}