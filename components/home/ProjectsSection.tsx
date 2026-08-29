"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

interface Project {
  title: string;
  category: string;
  description: string;
  tags: string[];
  href: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    title: "SQROCK Office",
    category: "Business Management Platform",
    description:
      "A complete internal office platform for managing teams, projects, work, notifications and business operations.",
    tags: ["Next.js", "TypeScript", "PostgreSQL"],
    href: "/work/sqrock-office",
    featured: true,
  },
  {
    title: "Coprofiles",
    category: "Jobs & Internship Platform",
    description:
      "A digital platform connecting students, candidates and businesses through jobs, internships, applications and performance tracking.",
    tags: ["Flutter", "Node.js", "PostgreSQL"],
    href: "/work/coprofiles",
  },
  {
    title: "Custom Digital Solutions",
    category: "Web & Software Development",
    description:
      "Scalable websites and software solutions designed around real business requirements.",
    tags: ["React", "Next.js", "Cloud"],
    href: "/work/custom-solutions",
  },
];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    const elements = sectionRef.current?.querySelectorAll(".animate-on-scroll");
    elements?.forEach((el) => observer.observe(el));

    return () => {
      elements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-20 lg:py-28 bg-white"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-6 mb-12 md:mb-16 lg:mb-20">
          <div className="space-y-3 md:space-y-4">
            <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 ease-out">
              <span className="inline-block text-sm md:text-base font-semibold tracking-widest uppercase text-blue-600">
                OUR WORK
              </span>
            </div>
            <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-100 ease-out">
              <h2
                id="projects-heading"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold leading-[1.1] text-gray-900"
              >
                Built to Make an Impact.
              </h2>
            </div>
            <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-200 ease-out">
              <p className="text-base md:text-lg text-gray-600 max-w-2xl">
                A selection of digital products and solutions we've built for
                businesses, startups and ambitious teams.
              </p>
            </div>
          </div>

          <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-300 ease-out flex-shrink-0">
            <Link
              href="/work"
              className="group inline-flex items-center text-sm md:text-base font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200"
            >
              View All Projects
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>

        {/* Projects Grid - Asymmetric/Bento Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => {
            const isFeatured = project.featured;
            return (
              <div
                key={project.title}
                className={`animate-on-scroll opacity-0 translate-y-6 transition-all duration-700 ease-out ${
                  isFeatured ? "md:col-span-2 lg:col-span-2" : ""
                }`}
                style={{ transitionDelay: `${index * 100 + 400}ms` }}
              >
                <Link
                  href={project.href}
                  className="group block h-full"
                  aria-label={`View case study for ${project.title}`}
                >
                  <div
                    className={`flex flex-col h-full bg-white border border-gray-200/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/30 ${
                      isFeatured ? "lg:flex-row" : ""
                    }`}
                  >
                    {/* Visual Preview Area */}
                    <div
                      className={`relative overflow-hidden ${
                        isFeatured
                          ? "w-full lg:w-2/5 h-64 lg:h-auto flex-shrink-0"
                          : "w-full h-56"
                      }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1a] to-[#1a0a2e]">
                        {/* Abstract decorative elements */}
                        <div className="absolute -top-20 -right-20 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl" />
                        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/20 flex items-center justify-center">
                            <ExternalLink className="w-6 h-6 md:w-8 md:h-8 text-blue-400/50 group-hover:text-blue-400 transition-colors duration-300" />
                          </div>
                        </div>
                        {/* Subtle grid pattern overlay */}
                        <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(90deg,transparent_0%,rgba(59,130,246,0.1)_1px,transparent_1px,transparent_100%)] bg-[length:30px_30px]" />
                      </div>

                      {/* Featured Badge */}
                      {isFeatured && (
                        <div className="absolute top-4 left-4 z-10">
                          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase text-blue-600 bg-blue-500/10 border border-blue-500/20 rounded-full backdrop-blur-sm">
                            Featured Project
                          </span>
                        </div>
                      )}

                      {/* Zoom overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Content Area */}
                    <div
                      className={`flex flex-col flex-1 p-6 md:p-8 ${
                        isFeatured ? "lg:w-3/5" : ""
                      }`}
                    >
                      <div className="flex-1">
                        {/* Category */}
                        <span className="text-xs font-semibold tracking-wider uppercase text-blue-600">
                          {project.category}
                        </span>

                        {/* Title */}
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mt-2 mb-3">
                          {project.title}
                        </h3>

                        {/* Description */}
                        <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-4">
                          {project.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-block px-3 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="mt-auto pt-4 border-t border-gray-100">
                        <span className="inline-flex items-center text-sm font-semibold text-blue-600 group-hover:text-purple-600 transition-colors duration-200">
                          View Case Study
                          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="animate-on-scroll opacity-0 translate-y-6 transition-all duration-700 delay-600 ease-out mt-12 md:mt-16 lg:mt-20">
          <div className="text-center max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Have a project in mind?
            </h3>
            <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8">
              Let's build something great together.
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center px-8 md:px-10 py-3.5 md:py-4 text-sm md:text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              Start a Project
              <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(1rem);
          transition: opacity 0.7s ease-out, transform 0.7s ease-out;
        }

        .animate-on-scroll.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-on-scroll {
            opacity: 1;
            transform: translateY(0);
          }
          .animate-on-scroll.animate-in {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
};

export default ProjectsSection;