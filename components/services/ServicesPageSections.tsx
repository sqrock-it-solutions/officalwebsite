'use client'
import React, { useState } from 'react';
import {
  MessageSquare,
  FileText,
  Code2,
  Rocket,
  ArrowRight,
  Plus,
  Minus,
  CheckCircle,
  Users,
  Star,
} from 'lucide-react';

const ServicesPageSections: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const processSteps = [
    {
      id: '01',
      title: 'Consultation',
      description: 'We start by understanding your goals and project requirements.',
      icon: MessageSquare,
    },
    {
      id: '02',
      title: 'Plan',
      description: 'We create a detailed roadmap, timeline, and design strategy.',
      icon: FileText,
    },
    {
      id: '03',
      title: 'Development',
      description: 'Our team builds your solution with clean, scalable code.',
      icon: Code2,
    },
    {
      id: '04',
      title: 'Launch & Support',
      description: 'We deploy your project and provide ongoing maintenance.',
      icon: Rocket,
    },
  ];

  const stats = [
    { icon: CheckCircle, value: '100+', label: 'Projects Delivered' },
    { icon: Users, value: '50+', label: 'Happy Clients' },
    { icon: Star, value: '99%', label: 'Client Satisfaction' },
  ];

  const faqs = [
    {
      question: 'How long does a typical project take?',
      answer: 'Project timelines vary based on scope and complexity. A typical website project takes 4-8 weeks, while more complex applications may take 3-6 months. We provide a detailed timeline during the planning phase.',
    },
    {
      question: 'Do you provide post-launch support?',
      answer: 'Yes! We offer comprehensive post-launch support including bug fixes, security updates, performance monitoring, and feature enhancements. Our support packages are flexible to meet your ongoing needs.',
    },
    {
      question: 'What technologies do you work with?',
      answer: 'We work with modern technologies including React, Next.js, TypeScript, Node.js, Python, and various cloud platforms. We choose the best tech stack based on your specific project requirements.',
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="bg-white">
      {/* Section 1: Our Process */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-16">
          <div>
            <span className="text-xs font-bold text-gray-500 tracking-wider uppercase block mb-3">
              OUR PROCESS
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a0a0a] leading-tight whitespace-pre-line">
              A Simple, Transparent{"\n"}Process
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 md:gap-0">
            <p className="text-gray-600 max-w-sm mb-4 md:mb-0">
              We follow a proven process to ensure your project is delivered on time, with the highest quality.
            </p>
            <button className="px-6 py-2.5 rounded-full border border-gray-200 text-[#0a0a0a] font-semibold hover:bg-gray-50 transition flex items-center gap-2 whitespace-nowrap">
              Start Your Project <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Process Steps */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 md:gap-4 relative">
          {processSteps.map((step, index) => (
            <div key={step.id} className="flex items-start gap-4 w-full md:w-1/4 relative">
              <div className="bg-gray-50 p-4 rounded-2xl shrink-0">
                <step.icon className="text-[#0a0a0a]" size={24} />
              </div>
              <div>
                <span className="text-sm font-bold text-gray-400">{step.id}</span>
                <h3 className="font-bold text-[#0a0a0a]">{step.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{step.description}</p>
              </div>
              {index < processSteps.length - 1 && (
                <div className="hidden md:block absolute -right-6 top-8 text-gray-300">
                  <ArrowRight size={20} />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Dark CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-24">
        <div className="bg-[#0a0a0a] rounded-3xl p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row justify-between items-center gap-12 relative overflow-hidden">
          {/* Subtle gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
          
          {/* Left Content */}
          <div className="relative z-10 flex-1">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 block">
              READY TO WORK TOGETHER?
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6 whitespace-pre-line">
              Let's Build Something{"\n"}Great Together.
            </h2>
            <p className="text-gray-400 max-w-md mb-6">
              Have a project in mind? Get in touch with us today and let's discuss how we can help you achieve your goals.
            </p>
            <button className="bg-white text-[#0a0a0a] px-6 py-3 rounded-lg font-bold inline-flex items-center gap-2 hover:bg-gray-100 transition">
              Book a Free Consultation <ArrowRight size={18} />
            </button>
          </div>

          {/* Stats Column */}
          <div className="relative z-10 flex flex-col gap-6 lg:border-l lg:border-white/10 lg:pl-12 w-full lg:w-auto">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="bg-white/10 p-2 rounded-full text-white">
                  <stat.icon size={18} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: FAQ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 border-t border-gray-100">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <span className="text-xs font-bold text-gray-500 tracking-wider uppercase block mb-3">
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a0a0a] leading-tight whitespace-pre-line">
              Frequently Asked{"\n"}Questions
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="text-gray-600">Still have questions? We're here to help.</p>
            <button className="border border-gray-200 px-5 py-2 rounded-full text-sm font-bold hover:bg-gray-50 transition flex items-center gap-2">
              Contact Us <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Accordion List */}
        <div className="max-w-3xl space-y-2">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full py-4 flex justify-between items-center group hover:bg-gray-50/50 px-4 rounded-lg transition"
              >
                <span className="font-semibold text-[#0a0a0a] group-hover:text-gray-700 transition text-left">
                  {faq.question}
                </span>
                <span className="shrink-0 ml-4 text-gray-500 group-hover:text-gray-700 transition">
                  {openFaqIndex === index ? (
                    <Minus size={20} />
                  ) : (
                    <Plus size={20} />
                  )}
                </span>
              </button>
              {openFaqIndex === index && (
                <div className="px-4 pb-4 text-gray-600 text-sm leading-relaxed animate-fadeIn">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ServicesPageSections;