"use client";

import { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { ProfileForm } from "./profile-form";
import { PasswordForm } from "./password-form";
import { NotificationForm } from "./notification-form";
import { PayoutForm } from "./payout-form";
import { DangerZone } from "./danger-zone";
import {
  User,
  Lock,
  Bell,
  Wallet,
  AlertTriangle,
} from "lucide-react";

interface SettingsClientProps {
  initialData: {
    user: any;
    partner: any;
  };
}

export function SettingsClient({ initialData }: SettingsClientProps) {
  const { user, partner } = initialData;
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Settings
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:w-auto lg:inline-grid">
          <TabsTrigger value="profile" className="gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="password" className="gap-2">
            <Lock className="h-4 w-4" />
            <span className="hidden sm:inline">Password</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          {user.isPartner && (
            <TabsTrigger value="payout" className="gap-2">
              <Wallet className="h-4 w-4" />
              <span className="hidden sm:inline">Payout</span>
            </TabsTrigger>
          )}
          <TabsTrigger value="danger" className="gap-2">
            <AlertTriangle className="h-4 w-4" />
            <span className="hidden sm:inline">Danger</span>
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="profile">
            <ProfileForm user={user} />
          </TabsContent>

          <TabsContent value="password">
            <PasswordForm />
          </TabsContent>

          <TabsContent value="notifications">
            <NotificationForm />
          </TabsContent>

          {user.isPartner && (
            <TabsContent value="payout">
              <PayoutForm partner={partner} />
            </TabsContent>
          )}

          <TabsContent value="danger">
            <DangerZone userEmail={user.email} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}