"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Code,
  Smartphone,
  Megaphone,
  Palette,
  Clock,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Zap,
  Award,
} from "lucide-react";

interface ServiceSummaryProps {
  service: {
    id: number;
    name: string;
    description: string | null;
    icon: string | null;
    color: string | null;
    deliveryDays: number;
  };
}

const iconMap: Record<string, any> = {
  Code,
  Smartphone,
  Megaphone,
  Palette,
};

export function ServiceSummary({ service }: ServiceSummaryProps) {
  const Icon = iconMap[service.icon || "Code"] || Code;
  const color = service.color || "#0a0a0a";

  const benefits = [
    {
      icon: Award,
      title: "Premium Quality",
      desc: "Handcrafted by experts",
    },
    {
      icon: Clock,
      title: `${service.deliveryDays} Days Delivery`,
      desc: "Fast turnaround",
    },
    {
      icon: ShieldCheck,
      title: "Money-back",
      desc: "If not satisfied",
    },
    {
      icon: Zap,
      title: "Priority Support",
      desc: "Direct line to team",
    },
  ];

  const includes = [
    "Dedicated project manager",
    "Unlimited revisions (within scope)",
    "Full source files & assets",
    "30 days post-delivery support",
    "Commercial usage rights",
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Service Card */}
      <Card className="overflow-hidden">
        <div
          className="h-2 w-full"
          style={{ backgroundColor: color }}
        />
        <CardHeader>
          <div className="flex items-start gap-4">
            <div
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl"
              style={{ backgroundColor: color + "15" }}
            >
              <Icon className="h-7 w-7" style={{ color }} />
            </div>
            <div>
              <Badge
                variant="outline"
                className="mb-1.5 gap-1 text-[10px]"
              >
                <Sparkles className="h-3 w-3" />
                Premium Service
              </Badge>
              <CardTitle className="text-xl">{service.name}</CardTitle>
              {service.description && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {service.description}
                </p>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <h4 className="mb-3 text-sm font-semibold">
            What's Included
          </h4>
          <ul className="space-y-2">
            {includes.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Benefits Grid */}
      <div className="grid grid-cols-2 gap-3">
        {benefits.map((benefit) => (
          <div
            key={benefit.title}
            className="flex items-start gap-3 rounded-lg border bg-card p-3"
          >
            <div className="rounded-lg bg-muted p-2">
              <benefit.icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs font-semibold">{benefit.title}</p>
              <p className="text-[11px] text-muted-foreground">
                {benefit.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}