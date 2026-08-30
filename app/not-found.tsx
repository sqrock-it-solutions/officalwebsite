'use client'

// app/not-found.tsx
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Home, Briefcase, BookOpen, MessageCircle } from 'lucide-react';

export default function NotFound() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const quickLinks = [
    {
      title: 'Home',
      description: 'Go back to our homepage and discover SQROCK.',
      link: '/',
      icon: Home
    },
    {
      title: 'Services',
      description: 'Explore our software and IT solutions.',
      link: '/services',
      icon: Briefcase
    },
    {
      title: 'Blog',
      description: 'Read our latest technology and business insights.',
      link: '/blog',
      icon: BookOpen
    },
    {
      title: 'Contact Us',
      description: 'Have a project in mind? Let\'s talk.',
      link: '/contact',
      icon: MessageCircle
    }
  ];

  return (
    <>
      
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="container mx-auto px-4 py-12 md:py-20">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-center max-w-6xl mx-auto"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 md:mb-8 border border-gray-200 rounded-full bg-white">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                <span className="text-xs font-medium tracking-wider uppercase text-gray-600">
                  404 • Page Not Found
                </span>
              </div>

              {/* Image - Now appears before the heading */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full max-w-3xl mx-auto mb-6 md:mb-8"
              >
                <Image
                  src="/404.png"
                  alt="404 page not found illustration"
                  width={1200}
                  height={800}
                  priority
                  className="w-full h-auto object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                />
              </motion.div>

              {/* Heading - Now appears after the image */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-gray-900 mb-4 tracking-tight">
                Oops! Page Not Found
              </h1>
              
              {/* Description */}
              <p className="text-lg md:text-xl text-center text-gray-600 max-w-2xl mx-auto mb-2">
                The page you're looking for seems to have wandered off into space.
              </p>
              <p className="text-lg md:text-xl text-center text-gray-600 max-w-2xl mx-auto mb-8 md:mb-10">
                Don't worry, we'll help you get back on track.
              </p>

              {/* Action Buttons */}
              <motion.div
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center"
              >
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 group"
                >
                  Back to Home
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-gray-900 border border-gray-300 rounded-lg font-medium hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-200 group"
                >
                  Explore Services
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Quick Navigation */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
              className="text-center mb-12"
            >
              <motion.h2 
                variants={fadeInUp}
                className="text-2xl md:text-3xl font-bold text-gray-900 mb-3"
              >
                Where would you like to go?
              </motion.h2>
              <motion.p 
                variants={fadeInUp}
                className="text-gray-600 max-w-2xl mx-auto"
              >
                Explore some of the most useful sections of SQROCK IT Solutions.
              </motion.p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {quickLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    variants={fadeInUp}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      href={item.link}
                      className="block h-full p-6 bg-white border border-gray-200 rounded-2xl hover:shadow-lg transition-shadow duration-200 group"
                    >
                      <div className="flex flex-col h-full">
                        <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-4 group-hover:bg-gray-200 transition-colors">
                          <Icon className="w-5 h-5 text-gray-700" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600 flex-grow mb-4">
                          {item.description}
                        </p>
                        <div className="flex items-center text-sm font-medium text-gray-900 group-hover:text-gray-700">
                          Learn More
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Search/Help Section */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="bg-gray-50 rounded-2xl p-8 md:p-12 border border-gray-200"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                    Can't find what you're looking for?
                  </h3>
                  <p className="text-gray-600 max-w-2xl">
                    Try exploring our website or get in touch with our team. We're here to help.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200 group"
                  >
                    Explore Website
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 group"
                  >
                    Contact Support
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
              transition={{ duration: 0.7 }}
              className="relative overflow-hidden bg-[#0a0a0a] rounded-3xl p-8 md:p-12 lg:p-16"
            >
              {/* Decorative elements */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
                <div className="absolute inset-0 border border-white/5 rounded-3xl"></div>
              </div>
              
              <div className="relative z-10 text-center">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
                  Still Looking for Something?
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto mb-8 text-lg">
                  Let's turn your next idea into a digital solution.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200 group"
                >
                  Book a Free Consultation
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

    </>
  );
}