import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface StatItem {
  id: number;
  value: string;
  label: string;
}

const statsData: StatItem[] = [
  { id: 1, value: '100+', label: 'Projects Delivered' },
  { id: 2, value: '50+', label: 'Happy Clients' },
  { id: 3, value: '4+', label: 'Years of Experience' },
  { id: 4, value: '99%', label: 'Client Satisfaction' },
];

const ServicesHero: React.FC = () => {
  return (
    <section className="bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="pt-16 md:pt-24 lg:pt-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16 lg:mb-24">
            {/* Left Column - Text & Buttons */}
            <div>
              <span className="text-xs font-bold text-gray-400 tracking-widest uppercase block mb-4">
                OUR SERVICES
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
                Technology Solutions for Every Stage of Your Growth
              </h1>
              <p className="text-lg text-gray-300 mb-10 max-w-lg">
                From idea to impact — we build, scale, and support businesses with innovative IT solutions.
              </p>
              
              {/* Buttons */}
              <div className="flex flex-wrap gap-4">
                <button className="flex items-center gap-2 bg-white text-[#0a0a0a] font-semibold px-6 py-3 rounded-md hover:bg-gray-200 transition-colors duration-200">
                  Book a Free Consultation
                  <ArrowRight size={18} className="inline-block" aria-hidden="true" />
                </button>
                <button className="flex items-center gap-2 bg-transparent text-white border border-white/30 font-semibold px-6 py-3 rounded-md hover:bg-white/10 transition-colors duration-200">
                  View Our Work
                </button>
              </div>
            </div>

            {/* Right Column - Image with Overlay */}
            <div className="relative w-full aspect-video lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/serviceshero.png"
                alt="Technology Solutions for Business Growth"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              
              {/* Text Overlay - Top Left */}
              <div className="absolute top-8 left-8">
                
                {/* Horizontal line */}
                <div className="w-12 h-0.5 bg-white/70 mt-4"></div>
              </div>
            </div>
          </div>

          {/* Bottom Stats Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pb-12">
            {statsData.map((stat) => (
              <div key={stat.id}>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesHero;