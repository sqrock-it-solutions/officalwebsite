import React from 'react';
import Image from 'next/image';
import { Clock } from 'lucide-react';

const PrivacyHero: React.FC = () => {
  return (
    <section className="w-full bg-[#0a0a0a] relative overflow-hidden">
      {/* Subtle dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#0a0a0a] to-[#1a1a1a] opacity-80" />
      
      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-16 md:pt-24 lg:pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Text Content */}
          <div className="flex flex-col">
            {/* Eyebrow */}
            <span className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-4 block">
              PRIVACY POLICY
            </span>
            
            {/* Heading with underline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.2] mb-6 whitespace-pre-line">
              <span className="border-b-4 border-white pb-1 inline-block">
                Your Privacy.
              </span>
              <br />
              Our Responsibility.
            </h1>
            
            {/* Paragraph */}
            <p className="text-gray-300 text-lg mb-8 max-w-lg">
              At SQROCK IT Solutions, we are committed to protecting your privacy and ensuring the security of your personal information.
            </p>
            
            {/* Date Meta */}
            <div className="flex items-center gap-2 text-gray-300 text-sm font-medium">
              <Clock className="w-4 h-4" />
              <span>Last Updated: May 26, 2026</span>
            </div>
          </div>
          
          {/* Right Column - Image */}
          <div className="relative w-full aspect-video lg:aspect-[4/3]">
            <Image
              src="/privacyhero.png"
              alt="Privacy Protection - Laptop and Shield"
              fill
              className="object-contain"
              priority
              sizes="(max-width: 968px) 100vw, (max-width: 1500px) 50vw, 33vw"
            />
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default PrivacyHero;