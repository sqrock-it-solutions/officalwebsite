// Process.tsx
import React from 'react';
import { MessageSquare, FileText, Code2, Rocket, ChevronRight } from 'lucide-react';

interface ProcessStep {
  id: number;
  number: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

const processSteps: ProcessStep[] = [
  {
    id: 1,
    number: '01',
    title: 'Consultation',
    description: 'We understand your vision, goals, and challenges through in-depth discussions.',
    icon: MessageSquare
  },
  {
    id: 2,
    number: '02',
    title: 'Strategy',
    description: 'We create a comprehensive roadmap tailored to your specific business needs.',
    icon: FileText
  },
  {
    id: 3,
    number: '03',
    title: 'Development',
    description: 'Our experts build and refine your solution using cutting-edge technologies.',
    icon: Code2
  },
  {
    id: 4,
    number: '04',
    title: 'Launch',
    description: 'We deploy, test, and ensure a seamless launch with ongoing support.',
    icon: Rocket
  }
];

const Process: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold text-gray-500 tracking-wider uppercase block mb-2">
            OUR PROCESS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0a0a0a]">
            A Simple & Transparent Process
          </h2>
          <p className="text-gray-600 mt-2">
            We follow a structured process to ensure the best results.
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative flex flex-col md:flex-row justify-between items-start mt-16 gap-8 md:gap-4">
          {processSteps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <React.Fragment key={step.id}>
                <div className="flex gap-4 items-start w-full md:w-1/4 relative">
                  {/* Icon Box */}
                  <div className="bg-[#0a0a0a] text-white w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <IconComponent size={24} />
                  </div>
                  
                  {/* Content */}
                  <div>
                    <span className="text-sm font-bold text-gray-400">
                      {step.number}
                    </span>
                    <h3 className="text-lg font-bold text-[#0a0a0a]">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {step.description}
                    </p>
                  </div>
                </div>
                
                {/* Connecting Arrow - Desktop Only */}
                {index < processSteps.length - 1 && (
                  <div className="hidden md:flex items-center justify-center flex-shrink-0">
                    <ChevronRight size={28} className="text-gray-300" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Process;