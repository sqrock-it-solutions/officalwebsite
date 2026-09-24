"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { StepIndicator } from "./step-indicator";
import { StepService } from "./step-service";
import { StepDetails } from "./step-details";
import { StepReview } from "./step-review";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Service {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  color: string | null;
  deliveryDays: number;
  usageLimit: number;
  used: number;
  remaining: number;
}

interface NewProjectClientProps {
  initialData: {
    services: Service[];
    plan: any;
    subscription: any;
  };
}

const steps = [
  { title: "Service", description: "Choose what you need" },
  { title: "Details", description: "Describe your project" },
  { title: "Review", description: "Confirm and submit" },
];

export function NewProjectClient({ initialData }: NewProjectClientProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(
    null,
  );
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    brief: "",
    priority: "normal" as "low" | "normal" | "high" | "urgent",
    dueAt: "",
  });

  const { services, plan } = initialData;

  const selectedService =
    services.find((s) => s.id === selectedServiceId) || null;

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleFormChange = (updates: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handleSubmit = async () => {
    if (!selectedServiceId) {
      toast.error("Please select a service");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/dashboard/projects/new/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: selectedServiceId,
          title: formData.title,
          description: formData.description,
          brief: formData.brief,
          priority: formData.priority,
          dueAt: formData.dueAt || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error("Failed to create project", {
          description: data.message || "Something went wrong",
        });
        setSubmitting(false);
        return;
      }

      toast.success("Project created! 🎉", {
        description:
          "Your project has been submitted. We'll start working on it soon.",
      });

      // Redirect to projects list
      setTimeout(() => {
        router.push("/dashboard/projects");
        router.refresh();
      }, 800);
    } catch (err: any) {
      console.error(err);
      toast.error("Something went wrong", {
        description: err.message || "Please try again",
      });
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Top bar with back link */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" >
          <Link href="/dashboard/projects">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>
        </Button>
      </div>

      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Create New Project
        </h1>
        <p className="text-sm text-muted-foreground">
          Submit a new request and we'll get started right away
        </p>
      </div>

      {/* Step Indicator */}
      <StepIndicator currentStep={currentStep} steps={steps} />

      {/* Main card */}
      <Card>
        <CardContent className="p-6">
          {currentStep === 1 && (
            <StepService
              services={services}
              selectedId={selectedServiceId}
              onSelect={setSelectedServiceId}
              onNext={handleNext}
              planName={plan?.name}
            />
          )}

          {currentStep === 2 && (
            <StepDetails
              data={formData}
              onChange={handleFormChange}
              onBack={handleBack}
              onNext={handleNext}
            />
          )}

          {currentStep === 3 && (
            <StepReview
              service={selectedService}
              data={formData}
              onBack={handleBack}
              onSubmit={handleSubmit}
              submitting={submitting}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}