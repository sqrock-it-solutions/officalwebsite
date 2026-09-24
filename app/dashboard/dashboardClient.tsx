"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconHome,
  IconCrown,
  IconApps,
  IconRocket,
  IconMessageCircle,
  IconCreditCard,
  IconSettings,
  IconLogout,
  IconPlus,
  IconBriefcase,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";

interface DashboardClientProps {
  user: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
    isPartner?: boolean;
    isMember?: boolean;
    role?: string;
  };
  children: React.ReactNode;
}

export function DashboardClient({ user, children }: DashboardClientProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          router.refresh();
        },
      },
    });
  };

  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (
        <IconHome className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
      active: pathname === "/dashboard",
    },
    {
      label: "Membership",
      href: "/dashboard/membership",
      icon: (
        <IconCrown className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
      active: pathname === "/dashboard/membership",
    },
    {
      label: "Services",
      href: "/dashboard/services",
      icon: (
        <IconApps className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
      active: pathname === "/dashboard/services",
    },
    {
      label: "My Projects",
      href: "/dashboard/projects",
      icon: (
        <IconRocket className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
      active: pathname?.startsWith("/dashboard/projects"),
    },
    {
      label: "Messages",
      href: "/dashboard/messages",
      icon: (
        <IconMessageCircle className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
      active: pathname === "/dashboard/messages",
    },
    {
      label: "Payments",
      href: "/dashboard/payments",
      icon: (
        <IconCreditCard className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
      active: pathname === "/dashboard/payments",
    },
    {
      label: "Settings",
      href: "/dashboard/settings",
      icon: (
        <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
      active: pathname === "/dashboard/settings",
    },
  ];

  const partnerLink = {
    label: "Partner Dashboard",
    href: "/dashboard/partner",
    icon: (
      <IconBriefcase className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
    active: pathname?.startsWith("/dashboard/partner"),
  };

  const avatarUrl =
    user.image ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0a0a0a&color=fff`;

  return (
    <div
      className={cn(
        "mx-auto flex w-full flex-1 flex-col overflow-hidden md:flex-row",
        "h-screen bg-neutral-50 dark:bg-neutral-900",
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10 border-r border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}

            <div className="mt-8 flex flex-col gap-1">
              {links.map((link, idx) => (
                <SidebarLink
                  key={idx}
                  link={link}
                  className={cn(
                    link.active &&
                    "bg-neutral-100 dark:bg-neutral-800 rounded-md",
                  )}
                />
              ))}

              {/* Partner section — sirf partners ko dikhega */}
              {user.isPartner && (
                <>
                  <div className="my-2 border-t border-neutral-200 dark:border-neutral-800" />
                  <p
                    className={cn(
                      "px-3 text-xs font-medium text-neutral-400 uppercase tracking-wider",
                      !open && "hidden",
                    )}
                  >
                    Partner
                  </p>
                  <SidebarLink
                    link={partnerLink}
                    className={cn(
                      partnerLink.active &&
                      "bg-neutral-100 dark:bg-neutral-800 rounded-md",
                    )}
                  />
                </>
              )}
            </div>

            {/* New Project */}
            <div className="mt-4">
              <SidebarLink
              className="text-white"
                link={{
                  label: "New Project",
                  href: "/dashboard/projects/new",
                  icon: (
                    <IconPlus className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
                  ),
                }}
              />
            </div>

          </div>

          {/* Bottom section: user + logout */}
          <div className="flex flex-col gap-2">
            <SidebarLink
              link={{
                label: user.name,
                href: "/dashboard/settings",
                icon: (
                  <img
                    src={avatarUrl}
                    className="h-7 w-7 shrink-0 rounded-full object-cover"
                    width={50}
                    height={50}
                    alt={user.name}
                  />
                ),
              }}
            />

            <button
              onClick={handleLogout}
              className={cn(
                "flex items-center gap-2 rounded-md px-2 py-1 text-sm text-red-500 transition hover:bg-red-50 dark:hover:bg-red-950/30",
                !open && "justify-center",
              )}
            >
              <IconLogout className="h-5 w-5 shrink-0" />
              {open && <span>Logout</span>}
            </button>
          </div>
        </SidebarBody>
      </Sidebar>

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        <div className="flex h-full w-full flex-1 flex-col overflow-y-auto p-4 bg-white dark:bg-neutral-900">
          {children}
        </div>
      </div>
    </div>
  );
}

/* =========================
   LOGO COMPONENTS
========================= */

export const Logo = () => {
  return (
    <Link
      href="/"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-black dark:text-white"
      >
        SQRock
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      href="/"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
    </Link>
  );
};