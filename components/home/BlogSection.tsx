"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";

interface BlogArticle {
  category: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  href: string;
  featured?: boolean;
  gradient: string;
}

const articles: BlogArticle[] = [
  {
    category: "Technology",
    title: "How Modern Businesses Can Build Better Digital Products",
    description:
      "The principles we use to create scalable, reliable and user-focused digital products.",
    date: "Aug 20, 2026",
    readTime: "6 min read",
    href: "/blog/build-better-digital-products",
    featured: true,
    gradient: "from-blue-600 to-purple-600",
  },
  {
    category: "Development",
    title: "Why Choosing the Right Tech Stack Matters",
    description:
      "A practical look at making technology decisions that support long-term product growth.",
    date: "Aug 12, 2026",
    readTime: "5 min read",
    href: "/blog/choosing-the-right-tech-stack",
    gradient: "from-blue-500 to-blue-700",
  },
  {
    category: "Business",
    title: "From Idea to Product: A Better Way to Build",
    description:
      "How a structured product development process can turn an idea into something people actually use.",
    date: "Aug 05, 2026",
    readTime: "7 min read",
    href: "/blog/idea-to-product",
    gradient: "from-purple-500 to-purple-700",
  },
];

const BlogSection = () => {
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
      aria-labelledby="blog-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-6 mb-12 md:mb-16 lg:mb-20">
          <div className="space-y-3 md:space-y-4">
            <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 ease-out">
              <span className="inline-block text-sm md:text-base font-semibold tracking-widest uppercase text-blue-600">
                INSIGHTS & IDEAS
              </span>
            </div>
            <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-100 ease-out">
              <h2
                id="blog-heading"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold leading-[1.1] text-gray-900"
              >
                What We're Thinking.
              </h2>
            </div>
            <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-200 ease-out">
              <p className="text-base md:text-lg text-gray-600 max-w-2xl">
                Practical insights on technology, product development, business
                and digital growth.
              </p>
            </div>
          </div>

          <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-300 ease-out flex-shrink-0">
            <Link
              href="/blog"
              className="group inline-flex items-center text-sm md:text-base font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200"
            >
              View All Articles
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {articles.map((article, index) => {
            const isFeatured = article.featured;
            return (
              <article
                key={article.title}
                className={`animate-on-scroll opacity-0 translate-y-6 transition-all duration-700 ease-out ${
                  isFeatured ? "md:col-span-2 lg:col-span-1" : ""
                }`}
                style={{ transitionDelay: `${index * 100 + 400}ms` }}
              >
                <Link
                  href={article.href}
                  className="group block h-full"
                  aria-label={`Read article: ${article.title}`}
                >
                  <div className="flex flex-col h-full bg-white border border-gray-200/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/30">
                    {/* Visual Area */}
                    <div className="relative h-56 md:h-60 lg:h-64 overflow-hidden flex-shrink-0">
                      <div className={`absolute inset-0 bg-gradient-to-br ${article.gradient}`}>
                        {/* Abstract decorative patterns */}
                        <div className="absolute inset-0 opacity-20">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border border-white/10 rounded-full" />
                          <div className="absolute top-1/3 right-1/4 w-16 h-16 border border-white/10 rounded-full" />
                          <div className="absolute bottom-1/4 left-1/3 w-12 h-12 border border-white/10 rounded-full" />
                        </div>
                        {/* Grid pattern overlay */}
                        <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.1)_1px,transparent_1px,transparent_100%)] bg-[length:20px_20px]" />
                        <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(0deg,transparent_0%,rgba(255,255,255,0.1)_1px,transparent_1px,transparent_100%)] bg-[length:20px_20px]" />
                      </div>

                      {/* Featured Badge */}
                      {isFeatured && (
                        <div className="absolute top-4 left-4 z-10">
                          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg shadow-blue-500/20 backdrop-blur-sm">
                            Featured
                          </span>
                        </div>
                      )}

                      {/* Zoom overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 p-6 md:p-8">
                      {/* Category */}
                      <span className="text-xs font-semibold tracking-wider uppercase text-blue-600">
                        {article.category}
                      </span>

                      {/* Title */}
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 mt-2 mb-3 leading-snug group-hover:text-blue-600 transition-colors duration-200">
                        {article.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-4 flex-1">
                        {article.description}
                      </p>

                      {/* Meta Info */}
                      <div className="flex items-center gap-4 text-xs md:text-sm text-gray-500 mb-4">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                          {article.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                          {article.readTime}
                        </span>
                      </div>

                      {/* Read Article CTA */}
                      <div className="pt-4 border-t border-gray-100">
                        <span className="inline-flex items-center text-sm font-semibold text-blue-600 group-hover:text-purple-600 transition-colors duration-200">
                          Read Article
                          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>

        {/* Bottom Newsletter Mini CTA */}
        <div className="animate-on-scroll opacity-0 translate-y-6 transition-all duration-700 delay-600 ease-out mt-12 md:mt-16 lg:mt-20">
          <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-2xl border border-gray-200/60 p-6 md:p-8 lg:p-10 text-center">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Stay Ahead.
              </h3>
              <p className="text-base md:text-lg text-gray-600 mb-6">
                Get useful technology and digital growth insights from SQROCK.
              </p>
              <Link
                href="/blog"
                className="group inline-flex items-center px-8 md:px-10 py-3 md:py-3.5 text-sm md:text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                Explore Insights
                <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
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

export default BlogSection;