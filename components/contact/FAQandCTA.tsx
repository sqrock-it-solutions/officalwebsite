// components/FAQandCTA.tsx
'use client';

import { useState } from 'react';
import { Plus, MessageSquare, ArrowRight } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQandCTA = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const faqData: FAQItem[] = [
    {
      id: 1,
      question: 'How long does it take to get a response?',
      answer:
        'We typically respond within 24 hours during business days. For urgent inquiries, please call us directly and we\'ll prioritize your request.',
    },
    {
      id: 2,
      question: 'Do you offer free consultations?',
      answer:
        'Yes, we offer a free 30-minute consultation to discuss your project requirements, goals, and how we can help you achieve them.',
    },
    {
      id: 3,
      question: 'What information should I include in my message?',
      answer:
        'Please include your project goals, timeline, budget range, and any specific requirements you have in mind. This helps us understand your needs better.',
    },
    {
      id: 4,
      question: 'How do you ensure the security of my project?',
      answer:
        'We follow industry best practices for data security, including encryption, secure protocols, and strict confidentiality agreements with all team members.',
    },
  ];

  const toggleAccordion = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <>
      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-gray-500 tracking-wider uppercase mb-3 block">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0a0a0a]">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqData.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:border-gray-200 transition-colors"
            >
              {/* Question Header - Clickable */}
              <button
                onClick={() => toggleAccordion(item.id)}
                className="w-full flex justify-between items-center p-5 md:p-6 cursor-pointer group"
                aria-expanded={openId === item.id}
                aria-controls={`faq-answer-${item.id}`}
              >
                <span className="text-sm md:text-base font-bold text-[#0a0a0a] group-hover:text-gray-600 transition-colors text-left">
                  {item.question}
                </span>
                <Plus
                  className={`w-5 h-5 text-gray-400 group-hover:text-[#0a0a0a] transition-all duration-300 shrink-0 ml-4 ${
                    openId === item.id ? 'rotate-45' : ''
                  }`}
                />
              </button>

              {/* Answer - Expandable */}
              <div
                id={`faq-answer-${item.id}`}
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openId === item.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-5 md:px-6 pb-5 md:pb-6">
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-24">
        <div className="bg-[#0a0a0a] rounded-3xl p-8 md:p-12 lg:p-14 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          {/* Left Area - Icon & Text */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start md:items-center text-center sm:text-left gap-6">
            {/* Icon Box */}
            <div className="border border-white/20 rounded-full p-4 flex-shrink-0">
              <MessageSquare className="text-white w-8 h-8" />
            </div>

            {/* Text Group */}
            <div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
                Ready to Start Your Project?
              </h3>
              <p className="text-sm md:text-base text-gray-400 max-w-lg">
                Let's discuss how we can help you achieve your goals and take your
                business to the next level.
              </p>
            </div>
          </div>

          {/* Right Area - Button */}
          <div className="flex-shrink-0">
            <a
              href="#"
              className="bg-white text-[#0a0a0a] px-6 py-3.5 rounded-xl font-bold inline-flex items-center justify-center gap-2 hover:bg-gray-100 transition whitespace-nowrap group"
            >
              Book a Free Consultation
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQandCTA;