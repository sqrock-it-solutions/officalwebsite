"use client";

import { useState, useMemo } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JobCard } from "./job-card";
import { JobDetailsModal } from "./job-details";
import { JobApplicationForm } from "./job-application-form";

interface JobCategory {
  id: number;
  name: string;
  slug: string;
}

interface Job {
  id: number;
  title: string;
  slug: string;
  shortDescription: string | null;
  description: string;
  requirements: string | null;
  responsibilities: string | null;
  qualifications: string | null;
  skills: string | null;
  categoryId: number | null;
  category: string | null;
  employmentType: string;
  workMode: string;
  location: string | null;
  salary: string | null;
  experience: string | null;
  openings: number;
  applicationDeadline: Date | null;
  isActive: boolean;
  isFeatured: boolean;
}

interface JobListProps {
  initialJobs: Job[];
  categories: JobCategory[];
}

export function JobList({ initialJobs, categories }: JobListProps) {
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  const filteredJobs = useMemo(() => {
    if (selectedDepartment === "all") {
      return initialJobs;
    }
    return initialJobs.filter(
      (job) => job.category?.toLowerCase() === selectedDepartment.toLowerCase()
    );
  }, [selectedDepartment, initialJobs]);

  const handleViewPosition = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
    setShowApplicationForm(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
    setShowApplicationForm(false);
  };

  const handleApply = () => {
    setIsModalOpen(false);
    setShowApplicationForm(true);
  };

  const handleBackToJobs = () => {
    setShowApplicationForm(false);
    setSelectedJob(null);
  };

  // If applying, show full-screen application form
  if (showApplicationForm && selectedJob) {
    return (
      <JobApplicationForm
        jobId={selectedJob.id}
        jobTitle={selectedJob.title}
        onBack={handleBackToJobs}
      />
    );
  }

  return (
    <section className="bg-gray-50 py-16 md:py-24" id="joblist">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              OPEN POSITIONS
            </span>
            <h2 className="mt-2 text-3xl font-bold text-black md:text-4xl">
              Explore Current Opportunities
            </h2>
          </div>
          <Button variant="ghost" className="text-black hover:bg-gray-200">
            View All Openings <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedDepartment("all")}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              selectedDepartment === "all"
                ? "bg-black text-white"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            All Departments
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedDepartment(category.name.toLowerCase())}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                selectedDepartment === category.name.toLowerCase()
                  ? "bg-black text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Job Listings */}
        {filteredJobs.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center">
            <h3 className="mb-2 text-xl font-semibold text-black">
              No open positions right now.
            </h3>
            <p className="text-gray-600">
              We're always looking for talented people. Check back soon or send
              us your resume.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onViewPosition={() => handleViewPosition(job)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Job Details Modal */}
      {selectedJob && (
        <JobDetailsModal
          job={selectedJob}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onApply={handleApply}
        />
      )}
    </section>
  );
}