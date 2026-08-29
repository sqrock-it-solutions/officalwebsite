"use client";

import { useEffect, useRef } from "react";

interface StatItem {
  number: string;
  label: string;
}

const statsData: StatItem[] = [
  { number: "500+", label: "Projects" },
  { number: "120+", label: "Clients" },
  { number: "4+", label: "Years" },
  { number: "24/7", label: "Support" },
];

const StatsBar = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const animatedElement = section.querySelector<HTMLElement>(
      ".stats-animate"
    );

    if (!animatedElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animatedElement.classList.add("stats-visible");
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(animatedElement);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="absolute right-0 -top-15 z-20 w-1/2 px-4 sm:bottom-12 sm:px-6 lg:bottom-16 lg:px-8"
    >
      <div className="stats-animate translate-y-6 opacity-0 transition-all duration-700 ease-out">
        <div className="relative ml-auto max-w-md overflow-hidden rounded-xl border border-white/10 bg-black/80 backdrop-blur-sm shadow-2xl shadow-black/50">
          {/* Decorative gradient accents */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-20 -top-20 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl"
          />

          <div className="relative grid grid-cols-4 gap-0">
            {statsData.map((stat, index) => (
              <div
                key={stat.label}
                className={`
                  flex flex-col items-center justify-center
                  px-2 py-3 text-center
                  sm:px-3 sm:py-4
                  ${
                    index < 3
                      ? "border-r border-white/10"
                      : ""
                  }
                `}
              >
                <span className="text-base font-bold leading-none tracking-tight text-white sm:text-lg md:text-xl">
                  {stat.number}
                </span>

                <p className="mt-1 text-[8px] font-medium tracking-wide text-gray-400 sm:text-[10px]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .stats-animate.stats-visible {
          opacity: 1;
          transform: translateY(0);
        }

        @media (prefers-reduced-motion: reduce) {
          .stats-animate {
            opacity: 1;
            transform: translateY(0);
            transition: none;
          }
        }
      `}</style>
    </section>
  );
};

export default StatsBar;