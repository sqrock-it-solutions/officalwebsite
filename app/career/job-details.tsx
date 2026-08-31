"use client";

import { useEffect, useRef, useState } from "react";
import { X, Briefcase, MapPin, Clock, DollarSign, Users, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Job {
  id: number;
  title: string;
  category: string | null;
  employmentType: string;
  workMode: string;
  location: string | null;
  salary: string | null;
  experience: string | null;
  openings: number;
  applicationDeadline: Date | null;
  description: string;
  responsibilities: string | null;
  requirements: string | null;
  qualifications: string | null;
  skills: string | null;
}

interface JobDetailsModalProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
  onApply: () => void;
}

export function JobDetailsModal({ job, isOpen, onClose, onApply }: JobDetailsModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const formatDate = (date: Date | null) => {
    if (!date) return "Not specified";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        ref={modalRef}
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl md:p-8"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 hover:bg-gray-100"
          aria-label="Close job details"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Content */}
        <div className="pr-8">
          {/* Header */}
          <div className="mb-6 border-b border-gray-200 pb-4">
            {job.category && (
              <span className="text-xs font-medium uppercase tracking-wider text-gray-500">
                {job.category}
              </span>
            )}
            <h2 className="mt-1 text-2xl font-bold text-black md:text-3xl">
              {job.title}
            </h2>

            <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1.5">
                <Briefcase className="h-4 w-4" />
                {job.employmentType}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                {job.location || "Remote"}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {job.workMode}
              </span>
              {job.experience && (
                <span className="flex items-center gap-1.5">
                  <Users className="h-4 w-4" />
                  {job.experience}
                </span>
              )}
              {job.salary && (
                <span className="flex items-center gap-1.5">
                  <DollarSign className="h-4 w-4" />
                  {job.salary}
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                Description
              </h3>
              <p className="mt-2 text-gray-700">{job.description}</p>
            </div>

            {job.responsibilities && (
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                  Responsibilities
                </h3>
                <div className="mt-2 whitespace-pre-wrap text-gray-700">
                  {job.responsibilities}
                </div>
              </div>
            )}

            {job.requirements && (
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                  Requirements
                </h3>
                <div className="mt-2 whitespace-pre-wrap text-gray-700">
                  {job.requirements}
                </div>
              </div>
            )}

            {job.qualifications && (
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                  Qualifications
                </h3>
                <div className="mt-2 whitespace-pre-wrap text-gray-700">
                  {job.qualifications}
                </div>
              </div>
            )}

            {job.skills && (
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                  Skills
                </h3>
                <div className="mt-2 whitespace-pre-wrap text-gray-700">
                  {job.skills}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-4 border-t border-gray-200 pt-4 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <Users className="h-4 w-4" />
                Openings: {job.openings}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                Application Deadline: {formatDate(job.applicationDeadline)}
              </span>
            </div>
          </div>

          {/* Apply Button */}
          <div className="mt-6 border-t border-gray-200 pt-6">
            <Button
              onClick={onApply}
              className="bg-black text-white hover:bg-gray-800"
            >
              Apply for this Position <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}