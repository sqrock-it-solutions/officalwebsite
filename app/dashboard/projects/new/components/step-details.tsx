"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  ArrowRight,
  AlertCircle,
  Lightbulb,
  FileText,
  Calendar,
  Flag,
} from "lucide-react";

interface StepDetailsProps {
  data: {
    title: string;
    description: string;
    brief: string;
    priority: "low" | "normal" | "high" | "urgent";
    dueAt: string;
  };
  onChange: (data: Partial<StepDetailsProps["data"]>) => void;
  onBack: () => void;
  onNext: () => void;
}

const priorityOptions = [
  {
    value: "low",
    label: "Low",
    desc: "No rush, take your time",
    className:
      "border-neutral-200 bg-neutral-50 text-neutral-700 dark:border-neutral-800 dark:bg-neutral-950/40 dark:text-neutral-400",
  },
  {
    value: "normal",
    label: "Normal",
    desc: "Standard delivery time",
    className:
      "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-400",
  },
  {
    value: "high",
    label: "High",
    desc: "Need it faster",
    className:
      "border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-900 dark:bg-orange-950/40 dark:text-orange-400",
  },
  {
    value: "urgent",
    label: "Urgent",
    desc: "Critical, ASAP",
    className:
      "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-400",
  },
] as const;

export function StepDetails({
  data,
  onChange,
  onBack,
  onNext,
}: StepDetailsProps) {
  const [errors, setErrors] = useState<{ title?: string; description?: string }>(
    {},
  );

  const validate = () => {
    const newErrors: typeof errors = {};
    if (data.title.trim().length < 5) {
      newErrors.title = "Title must be at least 5 characters";
    }
    if (data.description.trim().length < 20) {
      newErrors.description = "Description must be at least 20 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) onNext();
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold">Project Details</h2>
        <p className="text-sm text-muted-foreground">
          Tell us more about what you need
        </p>
      </div>

      {/* Form */}
      <div className="flex flex-col gap-5">
        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title">
            Project Title <span className="text-red-500">*</span>
          </Label>
          <Input
            id="title"
            placeholder="e.g., Landing page for my SaaS product"
            value={data.title}
            onChange={(e) => onChange({ title: e.target.value })}
            className={errors.title ? "border-red-500" : ""}
          />
          {errors.title && (
            <p className="flex items-center gap-1 text-xs text-red-500">
              <AlertCircle className="h-3 w-3" />
              {errors.title}
            </p>
          )}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">
            Short Description <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="description"
            placeholder="Briefly describe what you need in 2-3 lines..."
            value={data.description}
            onChange={(e) => onChange({ description: e.target.value })}
            rows={3}
            className={errors.description ? "border-red-500" : ""}
          />
          <div className="flex items-center justify-between">
            {errors.description ? (
              <p className="flex items-center gap-1 text-xs text-red-500">
                <AlertCircle className="h-3 w-3" />
                {errors.description}
              </p>
            ) : (
              <p className="text-xs text-muted-foreground">
                Minimum 20 characters
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              {data.description.length} chars
            </p>
          </div>
        </div>

        {/* Brief */}
        <div className="space-y-2">
          <Label htmlFor="brief" className="flex items-center gap-2">
            <FileText className="h-3.5 w-3.5" />
            Detailed Brief (Optional)
          </Label>
          <Textarea
            id="brief"
            placeholder="Share references, requirements, colors, specific features, links..."
            value={data.brief}
            onChange={(e) => onChange({ brief: e.target.value })}
            rows={5}
          />
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <Lightbulb className="h-3 w-3" />
            Tip: Add as much detail as possible for better results
          </p>
        </div>

        {/* Priority */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Flag className="h-3.5 w-3.5" />
            Priority
          </Label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {priorityOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => onChange({ priority: opt.value })}
                className={`flex flex-col items-start gap-0.5 rounded-lg border-2 p-3 text-left transition-all ${
                  data.priority === opt.value
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-muted hover:border-muted-foreground/30"
                }`}
              >
                <span className="text-xs font-semibold">{opt.label}</span>
                <span className="text-[10px] text-muted-foreground">
                  {opt.desc}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Due Date */}
        <div className="space-y-2">
          <Label htmlFor="dueAt" className="flex items-center gap-2">
            <Calendar className="h-3.5 w-3.5" />
            Preferred Due Date (Optional)
          </Label>
          <Input
            id="dueAt"
            type="date"
            value={data.dueAt}
            onChange={(e) => onChange({ dueAt: e.target.value })}
            min={new Date().toISOString().split("T")[0]}
          />
          <p className="text-xs text-muted-foreground">
            We'll try to meet your preferred timeline
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t pt-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="flex items-center gap-3">
          <p className="hidden text-xs text-muted-foreground sm:block">
            Step 2 of 3
          </p>
          <Button onClick={handleNext} className="min-w-[120px]">
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}