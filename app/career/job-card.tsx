import { ArrowRight, Briefcase, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Job {
  id: number;
  title: string;
  slug: string;
  shortDescription: string | null;
  employmentType: string;
  location: string | null;
  experience: string | null;
  category: string | null;
}

interface JobCardProps {
  job: Job;
  onViewPosition: () => void;
}

export function JobCard({ job, onViewPosition }: JobCardProps) {
  return (
    <div className="group rounded-2xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex-1">
          <div className="mb-1 flex flex-wrap items-center gap-2">
            {job.category && (
              <span className="text-xs font-medium uppercase tracking-wider text-gray-500">
                {job.category}
              </span>
            )}
          </div>
          <h3 className="text-xl font-semibold text-black">{job.title}</h3>
          {job.shortDescription && (
            <p className="mt-1 text-gray-600">{job.shortDescription}</p>
          )}
          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <Briefcase className="h-4 w-4" />
              {job.employmentType}
            </span>
            {job.location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                {job.location}
              </span>
            )}
            {job.experience && (
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {job.experience}
              </span>
            )}
          </div>
        </div>
        <Button
          variant="ghost"
          className="group/btn self-start text-black hover:bg-gray-100 md:self-center"
          onClick={onViewPosition}
        >
          View Position{" "}
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
        </Button>
      </div>
    </div>
  );
}