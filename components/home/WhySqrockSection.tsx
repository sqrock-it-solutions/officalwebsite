"use client";

import { useEffect, useRef } from "react";
import {
  Heart,
  ShieldCheck,
  MessageSquare,
  TrendingUp,
} from "lucide-react";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <Heart className="h-5 w-5" />,
    title: "Client First",
    description: "Your goals drive our decisions.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Quality Driven",
    description: "Clean code. Solid process. Real results.",
  },
  {
    icon: <MessageSquare className="h-5 w-5" />,
    title: "Transparent",
    description: "Clear communication at every step.",
  },
  {
    icon: <TrendingUp className="h-5 w-5" />,
    title: "Growth Focused",
    description: "We build for today, with tomorrow in mind.",
  },
];

const WhySqrockSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const elements = section.querySelectorAll<HTMLElement>(
      ".animate-on-scroll"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="why-heading"
      className="relative overflow-hidden bg-[#050510] py-16 sm:py-20 lg:py-28"
    >
      {/* Background Effects */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-blue-600/5 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-purple-600/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Layout */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(280px,0.85fr)_minmax(0,2fr)] lg:items-center lg:gap-14 xl:gap-20">
          
          {/* Left Content */}
          <div className="max-w-xl lg:max-w-none">
            <div className="animate-on-scroll">
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
                Why SQROCK
              </span>
            </div>

            <div className="animate-on-scroll mt-3 sm:mt-4">
              <h2
                id="why-heading"
                className="text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-3xl lg:text-[30px] xl:text-[37px]"
              >
                More Than a Vendor.
                <span className="mt-1 block bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                  A Long-Term Partner.
                </span>
              </h2>
            </div>

            <div className="animate-on-scroll mt-4 sm:mt-5">
              
            </div>
          </div>

          {/* Right Features */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="animate-on-scroll"
                style={{
                  transitionDelay: `${index * 100 + 200}ms`,
                }}
              >
                <div className="group relative h-full min-h-[190px] rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:bg-white/[0.07] hover:shadow-xl hover:shadow-blue-500/5">
                  
                  {/* Hover Glow */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />

                  <div className="relative">
                    {/* Icon */}
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-500/20 bg-gradient-to-br from-blue-500/15 to-purple-500/15 text-blue-400 transition-all duration-300 group-hover:border-blue-400/40 group-hover:text-blue-300 group-hover:shadow-lg group-hover:shadow-blue-500/10">
                      {feature.icon}
                    </div>

                    {/* Text */}
                    <h3 className="mt-5 text-base font-bold text-white">
                      {feature.title}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-gray-400">
                      {feature.description}
                    </p>
                  </div>

                  {/* Accent */}
                  <div className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 group-hover:w-1/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(1.25rem);
          transition:
            opacity 0.7s ease-out,
            transform 0.7s ease-out;
        }

        .animate-on-scroll.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-on-scroll,
          .animate-on-scroll.animate-in {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }
      `}</style>
    </section>
  );
};

export default WhySqrockSection;