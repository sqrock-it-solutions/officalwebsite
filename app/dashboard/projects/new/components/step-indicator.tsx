"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  currentStep: number;
  steps: { title: string; description: string }[];
}

export function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
  return (
    <div className="flex w-full items-center">
      {steps.map((step, idx) => {
        const stepNum = idx + 1;
        const isCompleted = currentStep > stepNum;
        const isActive = currentStep === stepNum;

        return (
          <div key={idx} className="flex flex-1 items-center">
            {/* Circle */}
            <div className="flex flex-col items-center gap-2">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all",
                  isCompleted &&
                    "border-primary bg-primary text-primary-foreground",
                  isActive &&
                    "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/30",
                  !isCompleted &&
                    !isActive &&
                    "border-muted-foreground/30 bg-background text-muted-foreground",
                )}
              >
                {isCompleted ? <Check className="h-5 w-5" /> : stepNum}
              </div>
              <div className="text-center">
                <p
                  className={cn(
                    "text-xs font-medium hidden sm:block",
                    (isCompleted || isActive) && "text-foreground",
                    !isCompleted && !isActive && "text-muted-foreground",
                  )}
                >
                  {step.title}
                </p>
              </div>
            </div>

            {/* Connector line */}
            {idx < steps.length - 1 && (
              <div className="mx-2 h-0.5 flex-1 overflow-hidden bg-muted">
                <div
                  className={cn(
                    "h-full bg-primary transition-all duration-500",
                    currentStep > stepNum ? "w-full" : "w-0",
                  )}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}