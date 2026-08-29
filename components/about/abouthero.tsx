import React from 'react';
import Image from 'next/image';
import { ArrowRight, Users } from 'lucide-react';

const AboutHero: React.FC = () => {
  return (
    <section className="pt-16 pb-12 md:pt-24 md:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Column - Text Content */}
          <div>
            <span className="text-xs font-bold text-gray-500 tracking-widest uppercase block mb-4">
              ABOUT SQROCK
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0a0a0a] leading-[1.1] mb-6">
              Innovating Today for a Better Tomorrow
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              We are a team of passionate developers, designers and strategists, 
              committed to building technology that creates real-world impact.
            </p>
            
            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <button className="flex items-center gap-2 bg-[#0a0a0a] text-white font-medium px-6 py-3 rounded-md hover:bg-[#1a1a1a] transition-colors duration-200">
                Book a Free Consultation
                <ArrowRight size={18} className="inline-block" aria-hidden="true" />
              </button>
              <button className="flex items-center gap-2 bg-white text-black border border-gray-300 font-medium px-6 py-3 rounded-md hover:bg-gray-50 transition-colors duration-200">
                Get to Know Us
              </button>
            </div>
          </div>

          {/* Right Column - Image & Overlays */}
          <div className="relative">
            {/* Main Image Container */}
            <div className="relative w-full aspect-[4/3] lg:aspect-square max-h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/abouthero.png"
                alt="About SQROCK - Innovation and Technology"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Text Overlay - Top Right */}
              <div className="absolute top-8 right-8 p-8 text-right">
                <div className="text-white/90 font-medium text-lg leading-snug drop-shadow-lg">
                  <p>Ideas.</p>
                  <p>Strategy.</p>
                  <p>Technology.</p>
                  <p>Real Impact.</p>
                </div>
                {/* White horizontal line */}
                <div className="w-12 h-0.5 bg-white/70 ml-auto mt-3"></div>
              </div>
            </div>

            {/* Floating Badge - Bottom Right */}
            <div className="absolute -bottom-6 -right-6 lg:-bottom-8 lg:-right-8 bg-white rounded-xl p-5 shadow-xl max-w-[300px] z-10">
              <div className="flex items-center gap-4">
                {/* Icon Box */}
                <div className="bg-gray-100 rounded-lg p-2 flex-shrink-0">
                  <Users size={24} className="text-[#0a0a0a]" />
                </div>
                {/* Content */}
                <div>
                  <span className="text-sm font-bold text-[#0a0a0a] block">
                    A Team United by Innovation
                  </span>
                  <span className="text-xs text-gray-500 mt-1 block">
                    Developers • Designers • Thinkers • Problem Solvers
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;