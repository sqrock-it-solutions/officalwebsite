import React from 'react';
import { ArrowRight, Check } from 'lucide-react';

const MetricsAndProblemSolution: React.FC = () => {
  const metrics = [
    { value: '150+', label: 'Projects Delivered' },
    { value: '80+', label: 'Happy Clients' },
    { value: '4+', label: 'Years of Experience' },
    { value: '98%', label: 'Client Satisfaction' },
  ];

  const solutions = [
    'Automate Processes',
    'Save Time & Cost',
    'Improve Productivity',
    'Focus on What Matters',
  ];

  return (
    <>
      {/* Section 1: Metrics Bar */}
      <section className="bg-gray-50/50 border-y border-gray-100 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:divide-x md:divide-gray-200 text-center">
            {metrics.map((metric, index) => (
              <div
                key={index}
                className={`${
                  index % 2 === 0 ? 'border-r border-gray-200 md:border-r-0' : ''
                } md:border-r-0 ${
                  index > 0 ? 'md:pl-8' : ''
                } ${index < metrics.length - 1 ? 'md:pr-8' : ''}`}
              >
                <div className="text-3xl md:text-4xl font-bold text-[#0a0a0a] mb-2">
                  {metric.value}
                </div>
                <div className="text-sm md:text-base text-gray-500 font-medium">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Problem vs Solution Block */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 md:gap-12 items-start">
            {/* Left Column: The Problem */}
            <div>
              <div className="bg-gray-100 rounded-full px-4 py-1 inline-block mb-6">
                <span className="text-xs font-bold text-gray-600 tracking-wider uppercase">
                  THE PROBLEM
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0a0a0a] leading-tight mb-4">
                Manual Work Slows Growth.
              </h2>
              <p className="text-gray-600 md:text-lg">
                Outdated systems, scattered data and manual processes can hold your business back,
                leading to lost time, higher costs and missed opportunities.
              </p>
            </div>

            {/* Center: Arrow */}
            <div className="hidden lg:flex items-center justify-center w-12 h-12 rounded-full border border-gray-200 mt-16">
              <ArrowRight size={24} className="text-gray-600" />
            </div>
            <div className="flex lg:hidden justify-center w-full mt-4">
              <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center rotate-90">
                <ArrowRight size={24} className="text-gray-600" />
              </div>
            </div>

            {/* Right Column: Our Solution */}
            <div>
              <div className="bg-gray-100 rounded-full px-4 py-1 inline-block mb-6">
                <span className="text-xs font-bold text-gray-600 tracking-wider uppercase">
                  OUR SOLUTION
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left part: Heading and Paragraph */}
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#0a0a0a] leading-tight mb-4">
                    Smarter Solutions for a Bigger Tomorrow.
                  </h2>
                  <p className="text-gray-600 md:text-lg">
                    We build custom digital solutions that automate your work, improve efficiency and
                    help you scale faster.
                  </p>
                </div>

                {/* Right part: Checklist */}
                <div className="space-y-3">
                  {solutions.map((solution, index) => (
                    <div key={index} className="flex items-center">
                      <div className="bg-gray-100 rounded-full p-1 mr-3 flex-shrink-0">
                        <Check size={16} className="text-[#0a0a0a]" />
                      </div>
                      <span className="font-medium text-[#0a0a0a]">{solution}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MetricsAndProblemSolution;