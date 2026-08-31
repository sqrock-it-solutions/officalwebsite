'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Home,
  Users,
  Layers3,
  BookOpen,
  Phone,
  ShieldCheck,
  FileText,
  Network,
  Download,
  Mail,
  MapPin,
  ExternalLink,
  Luggage,
} from 'lucide-react';


const mainPages = [
  {
    title: 'Home',
    description: 'Discover SQROCK and explore how we help businesses grow with technology.',
    href: '/',
    icon: Home,
  },
  {
    title: 'About Us',
    description: 'Learn about our story, expertise, values, and technology-driven approach.',
    href: '/about',
    icon: Users,
  },
  {
    title: 'Services',
    description: 'Explore our complete range of software and IT development services.',
    href: '/services',
    icon: Layers3,
  },
  {
    title: 'Blog & Insights',
    description: 'Read technology insights, development tips, trends, and business ideas.',
    href: '/blog',
    icon: BookOpen,
  },
  {
    title: 'Contact Us',
    description: 'Have a project in mind? Talk to our team and book a free consultation.',
    href: '/contact',
    icon: Phone,
  },
  {
    title: 'Privacy Policy',
    description: 'Understand how we collect, use, and protect your information.',
    href: '/privacy',
    icon: ShieldCheck,
  },
  {
    title: 'Terms & Conditions',
    description: 'Review the terms and conditions governing our website and services.',
    href: '/terms',
    icon: FileText,
  },
  {
    title: 'Sitemap',
    description: 'A complete overview of all important pages available on our website.',
    href: '/sitemap',
    icon: Network,
    current: true,
  },
   {
    title: 'Career',
    description: 'A complete overview of all important pages available on our website.',
    href: '/career',
    icon: Luggage,
    current: true,
  },
];

const services = [
  {
    title: 'Custom Software Development',
    href: '/services',
  },
  {
    title: 'Web Development',
    href: '/services',
  },
  {
    title: 'Mobile App Development',
    href: '/services',
  },
  {
    title: 'IT Consulting & Strategy',
    href: '/services',
  },
  {
    title: 'Digital Marketing',
    href: '/services',
  },
];

const blogTopics = [
  'AI & Technology',
  'Web Development',
  'Cloud Computing',
  'Software Engineering',
  'Business Technology',
  'Digital Transformation',
];

export default function SitemapPage() {
  return (
    <main className="min-h-screen bg-white text-[#0a0a0a]">

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative overflow-hidden border-b border-gray-100">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full border border-gray-100" />
          <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full border border-gray-100" />

          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                'radial-gradient(#000 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-sm text-gray-500 mb-8"
          >
            <Link
              href="/"
              className="hover:text-black transition-colors"
            >
              Home
            </Link>

            <span>›</span>

            <span className="text-black font-medium">
              Sitemap
            </span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 border border-gray-200 rounded-full px-4 py-2 text-xs font-medium mb-6">
                <Network size={14} />
                Website Navigation
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95]">
                Sitemap
              </h1>

              <p className="mt-7 max-w-xl text-lg sm:text-xl text-gray-600 leading-relaxed">
                Explore all the important pages and sections of
                SQROCK IT Solutions in one place. Find exactly what
                you need quickly and easily.
              </p>
            </motion.div>

            {/* Sitemap Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative hidden lg:block h-[300px]"
            >
              {/* Main node */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2">
                <div className="w-28 h-20 bg-[#0a0a0a] rounded-2xl flex items-center justify-center shadow-xl">
                  <span className="text-white font-bold text-lg">
                    SQROCK
                  </span>
                </div>
              </div>

              {/* Connecting line */}
              <div className="absolute top-[84px] left-1/2 w-px h-12 bg-gray-300" />

              <div className="absolute top-[135px] left-[10%] right-[10%] h-px bg-gray-300" />

              {/* Nodes */}
              {[
                { label: 'Home', left: '5%' },
                { label: 'About', left: '27%' },
                { label: 'Services', left: '49%' },
                { label: 'Blog', left: '71%' },
                { label: 'Contact', left: '89%' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="absolute top-[135px] -translate-x-1/2"
                  style={{ left: item.left }}
                >
                  <div className="h-3 w-3 rounded-full bg-black mx-auto -mt-1.5" />

                  <div className="mt-5 px-5 py-4 rounded-xl border border-gray-200 bg-white shadow-sm min-w-[95px] text-center">
                    <span className="text-sm font-semibold">
                      {item.label}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          MAIN PAGES
      ===================================================== */}
      <section className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500 font-semibold mb-3">
              Explore
            </p>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Main Pages
            </h2>

            <p className="mt-3 text-gray-500">
              Quickly navigate to all our important pages.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {mainPages.map((page, index) => {
              const Icon = page.icon;

              return (
                <motion.div
                  key={page.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.04,
                  }}
                >
                  <Link
                    href={page.href}
                    className={`group block h-full rounded-2xl border p-6 transition-all duration-300 ${
                      page.current
                        ? 'border-black bg-[#fafafa]'
                        : 'border-gray-200 bg-white hover:border-black hover:shadow-lg'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors duration-300">
                        <Icon size={22} />
                      </div>

                      {page.current && (
                        <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-black text-white">
                          You&apos;re here
                        </span>
                      )}
                    </div>

                    <h3 className="mt-6 text-xl font-semibold">
                      {page.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
                      {page.description}
                    </p>

                    <div className="mt-6 flex items-center gap-2 text-sm font-semibold">
                      Visit Page
                      <ArrowRight
                        size={17}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          SERVICES
      ===================================================== */}
      <section className="bg-[#f7f7f7] py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid lg:grid-cols-2 gap-12">

            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-gray-500 font-semibold mb-3">
                What We Do
              </p>

              <h2 className="text-3xl sm:text-4xl font-bold">
                Our Services
              </h2>

              <p className="mt-4 text-gray-600 max-w-lg leading-7">
                Explore the technology and digital solutions we
                provide to startups, SMEs, and growing businesses.
              </p>
            </div>

            <div className="space-y-3">
              {services.map((service, index) => (
                <Link
                  key={service.title}
                  href={service.href}
                  className="group flex items-center justify-between bg-white border border-gray-200 rounded-xl px-5 py-4 hover:border-black transition-all"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-gray-400 font-mono">
                      0{index + 1}
                    </span>

                    <span className="font-medium">
                      {service.title}
                    </span>
                  </div>

                  <ArrowRight
                    size={18}
                    className="text-gray-400 group-hover:text-black group-hover:translate-x-1 transition-all"
                  />
                </Link>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          BLOG TOPICS
      ===================================================== */}
      <section className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500 font-semibold mb-3">
              Knowledge
            </p>

            <h2 className="text-3xl sm:text-4xl font-bold">
              Explore Our Insights
            </h2>

            <p className="mt-4 text-gray-500">
              Stay updated with technology, development, and
              digital business trends.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {blogTopics.map((topic) => (
              <Link
                key={topic}
                href="/blog"
                className="px-5 py-3 border border-gray-200 rounded-full text-sm font-medium hover:bg-black hover:text-white hover:border-black transition-all"
              >
                {topic}
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-semibold text-sm hover:gap-3 transition-all"
            >
              View All Insights
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          HELPFUL LINKS
      ===================================================== */}
      <section className="pb-20 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="rounded-3xl bg-[#f5f6f7] border border-gray-200 p-7 sm:p-10">

            <div className="mb-8">
              <h2 className="text-2xl font-bold">
                Helpful Links
              </h2>

              <p className="mt-2 text-gray-500 text-sm">
                Important resources and ways to get in touch.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">

              {/* XML Sitemap */}
              <a
                href="/sitemap.xml"
                className="group bg-white rounded-2xl border border-gray-200 p-5 hover:border-black transition-all"
              >
                <Download size={21} />

                <h3 className="font-semibold mt-5">
                  XML Sitemap
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  View the sitemap used by search engines.
                </p>

                <div className="mt-5 flex items-center gap-2 text-sm font-semibold">
                  Open Sitemap
                  <ExternalLink
                    size={15}
                    className="group-hover:translate-x-0.5 transition-transform"
                  />
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:support@sqrock.cloud"
                className="group bg-white rounded-2xl border border-gray-200 p-5 hover:border-black transition-all"
              >
                <Mail size={21} />

                <h3 className="font-semibold mt-5">
                  Contact Support
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Need help? Send us an email anytime.
                </p>

                <div className="mt-5 text-sm font-semibold break-all">
                  support@sqrock.cloud
                </div>
              </a>

              {/* Contact */}
              <Link
                href="/contact"
                className="group bg-white rounded-2xl border border-gray-200 p-5 hover:border-black transition-all"
              >
                <MapPin size={21} />

                <h3 className="font-semibold mt-5">
                  Get In Touch
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Have a project idea? Let&apos;s discuss it.
                </p>

                <div className="mt-5 flex items-center gap-2 text-sm font-semibold">
                  Contact Us
                  <ArrowRight
                    size={15}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </Link>

            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}
      <section className="pb-20 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="relative overflow-hidden rounded-3xl bg-[#0a0a0a] px-7 py-12 sm:px-12 sm:py-14 text-white">

            {/* Grid */}
            <div
              className="absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />

            <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">

              <div>
                <p className="text-gray-400 text-sm mb-2">
                  Ready to build something?
                </p>

                <h2 className="text-3xl sm:text-4xl font-bold">
                  Let&apos;s Build Something Great Together.
                </h2>

                <p className="mt-3 text-gray-400 max-w-xl">
                  Tell us about your idea and our team will help
                  you turn it into a scalable digital solution.
                </p>
              </div>

              <Link
                href="/contact"
                className="shrink-0 inline-flex items-center gap-3 bg-white text-black px-6 py-3.5 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Book a Free Consultation
                <ArrowRight size={18} />
              </Link>

            </div>
          </div>
        </div>
      </section>

    </main>
  );
}