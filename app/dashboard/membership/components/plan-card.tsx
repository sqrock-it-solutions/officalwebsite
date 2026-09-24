"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, Crown, IndianRupee } from "lucide-react";

interface PlanCardProps {
  plan: {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    price: string;
    currency: string;
    billingCycle: string;
    features: string | null;
    maxProjects: number;
    maxServiceRequests: number;
    isPopular: boolean;
  };
  onSelect: () => void;
  isPopular?: boolean;
}

export function PlanCard({ plan, onSelect, isPopular }: PlanCardProps) {
  const features = plan.features ? JSON.parse(plan.features) : [];
  const price = parseFloat(plan.price);

  return (
    <Card
      className={`relative flex h-full flex-col transition-shadow ${
        isPopular
          ? "border-primary shadow-md ring-1 ring-primary/20"
          : "hover:shadow-md"
      }`}
    >
      {/* Popular badge — card ke andar, top-right corner me */}
      {isPopular && (
        <div className="absolute right-3 top-3">
          <Badge className="bg-primary text-primary-foreground shadow-sm">
            <Crown className="mr-1 h-3 w-3" />
            Popular
          </Badge>
        </div>
      )}

      <CardHeader className="pb-4">
        <CardTitle className="text-xl">{plan.name}</CardTitle>
        {plan.description && (
          <CardDescription className="text-xs">
            {plan.description}
          </CardDescription>
        )}

        <div className="flex items-baseline gap-1 mt-4">
          <IndianRupee className="h-5 w-5 text-muted-foreground" />
          <span className="text-4xl font-bold">
            {price.toLocaleString("en-IN")}
          </span>
          <span className="text-sm text-muted-foreground">
            /{plan.billingCycle === "monthly" ? "mo" : plan.billingCycle}
          </span>
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        <ul className="space-y-2.5 text-sm">
          {features.map((feature: string, i: number) => (
            <li key={i} className="flex items-start gap-2">
              <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
              <span>{feature}</span>
            </li>
          ))}

          <li className="flex items-start gap-2">
            <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
            <span>Up to {plan.maxProjects} active projects</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
            <span>{plan.maxServiceRequests} service requests/month</span>
          </li>
        </ul>
      </CardContent>

      <CardFooter>
        <Button
          onClick={onSelect}
          className="w-full"
          variant={isPopular ? "default" : "outline"}
          size="lg"
        >
          Get Started
        </Button>
      </CardFooter>
    </Card>
  );
}