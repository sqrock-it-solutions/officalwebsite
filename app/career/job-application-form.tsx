"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitApplication } from "./actions";
import { Loader2, CheckCircle, AlertCircle, ArrowLeft } from "lucide-react";

const applicationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone number is required"),
  location: z.string().optional(),
  resumeUrl: z.string().min(1, "Resume is required"),
  coverLetter: z.string().optional(),
  portfolioUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  linkedinUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  githubUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  experience: z.string().optional(),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

interface JobApplicationFormProps {
  jobId?: number | null;
  jobTitle?: string;
  onBack?: () => void;
}

export function JobApplicationForm({ 
  jobId, 
  jobTitle, 
  onBack 
}: JobApplicationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      location: "",
      coverLetter: "",
      portfolioUrl: "",
      linkedinUrl: "",
      githubUrl: "",
      experience: "",
    },
  });

  const onSubmit = async (data: ApplicationFormData) => {
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const formData = new FormData();
      formData.append("jobOpeningId", jobId?.toString() || "");
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      if (data.location) formData.append("location", data.location);
      formData.append("resumeUrl", data.resumeUrl);
      if (data.coverLetter) formData.append("coverLetter", data.coverLetter);
      if (data.portfolioUrl) formData.append("portfolioUrl", data.portfolioUrl);
      if (data.linkedinUrl) formData.append("linkedinUrl", data.linkedinUrl);
      if (data.githubUrl) formData.append("githubUrl", data.githubUrl);
      if (data.experience) formData.append("experience", data.experience);

      const result = await submitApplication(formData);

      if (result.success) {
        setSubmitStatus({ type: "success", message: result.message });
        reset();
      } else {
        setSubmitStatus({ type: "error", message: result.message });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 md:py-20">
      <div className="container mx-auto max-w-3xl px-4 md:px-6">
        {/* Back Button */}
        {onBack && (
          <button
            onClick={onBack}
            className="mb-6 flex items-center gap-2 text-gray-600 transition-colors hover:text-black"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Jobs
          </button>
        )}

        {/* Header */}
        <div className="mb-8 border-b border-gray-200 pb-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Apply Now
          </span>
          <h1 className="mt-2 text-3xl font-bold text-black md:text-4xl">
            {jobTitle ? `Apply for ${jobTitle}` : "Send Your Resume"}
          </h1>
          <p className="mt-2 text-gray-600">
            Fill in the details below and we'll get back to you soon.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Status Messages */}
          {submitStatus.type && (
            <div
              className={`rounded-lg p-4 ${
                submitStatus.type === "success"
                  ? "bg-green-50 text-green-800"
                  : "bg-red-50 text-red-800"
              }`}
            >
              <div className="flex items-center gap-2">
                {submitStatus.type === "success" ? (
                  <CheckCircle className="h-5 w-5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                )}
                <p>{submitStatus.message}</p>
              </div>
            </div>
          )}

          {/* Personal Information */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
              Personal Information
            </h2>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name *
                </label>
                <Input
                  id="name"
                  {...register("name")}
                  className="mt-1"
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address *
                </label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="mt-1"
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number *
              </label>
              <Input
                id="phone"
                {...register("phone")}
                className="mt-1"
                placeholder="+91 98765 43210"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <Input
                id="location"
                {...register("location")}
                className="mt-1"
                placeholder="Jaipur, Rajasthan"
              />
            </div>
          </div>

          {/* Professional Information */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
              Professional Information
            </h2>

            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                Years of Experience
              </label>
              <Input
                id="experience"
                {...register("experience")}
                className="mt-1"
                placeholder="2-4 years"
              />
            </div>

            <div>
              <label htmlFor="resumeUrl" className="block text-sm font-medium text-gray-700">
                Resume URL *
              </label>
              <Input
                id="resumeUrl"
                {...register("resumeUrl")}
                className="mt-1"
                placeholder="https://example.com/resume.pdf"
              />
              <p className="mt-1 text-xs text-gray-500">
                Upload your resume to a cloud storage (Google Drive, Dropbox, etc.) and paste the link here.
              </p>
              {errors.resumeUrl && (
                <p className="mt-1 text-sm text-red-600">{errors.resumeUrl.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700">
                Cover Letter
              </label>
              <Textarea
                id="coverLetter"
                {...register("coverLetter")}
                className="mt-1"
                rows={5}
                placeholder="Tell us why you're a great fit for this role..."
              />
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
              Links & Portfolio
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="portfolioUrl" className="block text-sm font-medium text-gray-700">
                  Portfolio URL
                </label>
                <Input
                  id="portfolioUrl"
                  {...register("portfolioUrl")}
                  className="mt-1"
                  placeholder="https://portfolio.com"
                />
                {errors.portfolioUrl && (
                  <p className="mt-1 text-sm text-red-600">{errors.portfolioUrl.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="linkedinUrl" className="block text-sm font-medium text-gray-700">
                  LinkedIn URL
                </label>
                <Input
                  id="linkedinUrl"
                  {...register("linkedinUrl")}
                  className="mt-1"
                  placeholder="https://linkedin.com/in/john"
                />
                {errors.linkedinUrl && (
                  <p className="mt-1 text-sm text-red-600">{errors.linkedinUrl.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-700">
                GitHub URL
              </label>
              <Input
                id="githubUrl"
                {...register("githubUrl")}
                className="mt-1"
                placeholder="https://github.com/john"
              />
              {errors.githubUrl && (
                <p className="mt-1 text-sm text-red-600">{errors.githubUrl.message}</p>
              )}
            </div>
          </div>

          {/* Submit */}
          <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:items-center">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-black text-white hover:bg-gray-800 sm:w-auto sm:px-8"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Application →"
              )}
            </Button>
            {onBack && (
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                className="w-full border-gray-300 text-black hover:bg-gray-50 sm:w-auto"
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}