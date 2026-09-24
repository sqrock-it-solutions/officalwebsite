"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JobApplicationForm } from "./job-application-form";

export function ResumeCTA() {
  const [showForm, setShowForm] = useState(false);

  const handleBack = () => {
    setShowForm(false);
  };

  if (showForm) {
    return (
      <JobApplicationForm
        jobId={null}
        jobTitle="General Application"
        onBack={handleBack}
      />
    );
  }

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-gray-50 p-8 text-center md:p-12">
          <h2 className="text-3xl font-bold text-black md:text-4xl">
            Don't see the right role?
          </h2>
          <p className="mt-3 text-base text-gray-600 md:text-lg">
            We're always looking for talented people.
            <br />
            Send us your resume and let's connect!
          </p>
          
          <Button 
            onClick={() => setShowForm(true)}
            className="mt-6 bg-black text-white hover:bg-gray-800"
          >
            Send Your Resume <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}