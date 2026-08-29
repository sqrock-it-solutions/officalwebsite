// AboutStory.tsx
import React from 'react';
import Image from 'next/image';
import { Rocket, Users, Clock, Globe, Target, Eye } from 'lucide-react';

const AboutStory: React.FC = () => {
  return (
    <>
      {/* Section 1: Our Story */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left - Image (spans 5 cols) */}
            <div className="lg:col-span-5 relative w-full aspect-video lg:aspect-[4/5] rounded-3xl overflow-hidden">
              <Image
                src="/storyabout.png"
                alt="Our Story - SQROCK IT Solutions"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              {/* Overlay Text */}
              <div className="absolute left-8 top-1/2 -translate-y-1/2 text-white">
                <p className="font-medium text-2xl leading-snug">
                  Better<br />
                  Software.<br />
                  Stronger<br />
                  Businesses.
                </p>
                <div className="w-12 h-0.5 bg-white/70 mt-4"></div>
              </div>
            </div>

            {/* Right - Content & Timeline (spans 7 cols) */}
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Left side - Text */}
              <div>
                <span className="text-xs font-bold text-gray-500 tracking-wider uppercase block mb-3">
                  OUR STORY
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-[#0a0a0a] leading-tight mb-4">
                  From a Simple Idea to a Growing Impact
                </h2>
                <p className="text-gray-600 text-sm md:text-base">
                  SQROCK IT Solutions was founded with a simple belief — technology should make life 
                  easier. What started as a small team of passionate developers has now grown into a 
                  full-service IT company, helping businesses across industries build, scale, and 
                  succeed in the digital world.
                </p>
              </div>

              {/* Right side - Timeline */}
              <div className="relative border-l-2 border-gray-100 ml-3 md:ml-0 space-y-6 py-2">
                {/* Timeline Item 1 */}
                <div className="relative pl-6">
                  <div className="absolute w-2.5 h-2.5 bg-[#0a0a0a] rounded-full -left-[5.5px] top-1.5"></div>
                  <span className="text-sm font-bold text-[#0a0a0a]">2021</span>
                  <span className="text-sm font-bold text-[#0a0a0a] block">The Beginning</span>
                  <p className="text-xs text-gray-500 mt-0.5">A small idea with a big vision.</p>
                </div>

                {/* Timeline Item 2 */}
                <div className="relative pl-6">
                  <div className="absolute w-2.5 h-2.5 bg-[#0a0a0a] rounded-full -left-[5.5px] top-1.5"></div>
                  <span className="text-sm font-bold text-[#0a0a0a]">2023</span>
                  <span className="text-sm font-bold text-[#0a0a0a] block">Growing Stronger</span>
                  <p className="text-xs text-gray-500 mt-0.5">Expanded our services and team.</p>
                </div>

                {/* Timeline Item 3 */}
                <div className="relative pl-6">
                  <div className="absolute w-2.5 h-2.5 bg-[#0a0a0a] rounded-full -left-[5.5px] top-1.5"></div>
                  <span className="text-sm font-bold text-[#0a0a0a]">2025</span>
                  <span className="text-sm font-bold text-[#0a0a0a] block">Bigger Impact</span>
                  <p className="text-xs text-gray-500 mt-0.5">100+ projects delivered globally.</p>
                </div>

                {/* Timeline Item 4 */}
                <div className="relative pl-6">
                  <div className="absolute w-2.5 h-2.5 bg-[#0a0a0a] rounded-full -left-[5.5px] top-1.5"></div>
                  <span className="text-sm font-bold text-[#0a0a0a]">Beyond</span>
                  <span className="text-sm font-bold text-[#0a0a0a] block">Building the Future</span>
                  <p className="text-xs text-gray-500 mt-0.5">Continuing to innovate and create real impact.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Stats Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 bg-gray-50/50 md:bg-transparent rounded-2xl md:rounded-none p-6 md:p-0 border md:border-none border-gray-100 md:divide-x md:divide-gray-200 md:border-y md:border-gray-100 md:py-8">
          {/* Stat 1 */}
          <div className="flex items-center gap-4 justify-center md:justify-start md:px-8">
            <div className="bg-gray-100 rounded-full p-3 flex-shrink-0">
              <Rocket size={20} className="text-[#0a0a0a]" />
            </div>
            <div>
              <span className="text-2xl font-bold text-[#0a0a0a]">100+</span>
              <span className="text-xs text-gray-500 font-medium block">Projects Delivered</span>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="flex items-center gap-4 justify-center md:justify-start md:px-8">
            <div className="bg-gray-100 rounded-full p-3 flex-shrink-0">
              <Users size={20} className="text-[#0a0a0a]" />
            </div>
            <div>
              <span className="text-2xl font-bold text-[#0a0a0a]">50+</span>
              <span className="text-xs text-gray-500 font-medium block">Happy Clients</span>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="flex items-center gap-4 justify-center md:justify-start md:px-8">
            <div className="bg-gray-100 rounded-full p-3 flex-shrink-0">
              <Clock size={20} className="text-[#0a0a0a]" />
            </div>
            <div>
              <span className="text-2xl font-bold text-[#0a0a0a]">4+</span>
              <span className="text-xs text-gray-500 font-medium block">Years of Experience</span>
            </div>
          </div>

          {/* Stat 4 */}
          <div className="flex items-center gap-4 justify-center md:justify-start md:px-8">
            <div className="bg-gray-100 rounded-full p-3 flex-shrink-0">
              <Globe size={20} className="text-[#0a0a0a]" />
            </div>
            <div>
              <span className="text-2xl font-bold text-[#0a0a0a]">10+</span>
              <span className="text-xs text-gray-500 font-medium block">Industries Served</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mission Card - Light */}
          <div className="bg-white border border-gray-100 rounded-2xl p-8 flex items-start gap-5 shadow-sm">
            <div className="bg-gray-100 rounded-full p-3 flex-shrink-0">
              <Target size={24} className="text-[#0a0a0a]" />
            </div>
            <div>
              <h3 className="font-bold text-xl mb-2 text-[#0a0a0a]">Our Mission</h3>
              <p className="text-gray-600">
                To empower businesses with innovative and scalable technology solutions that create real value.
              </p>
            </div>
          </div>

          {/* Vision Card - Dark */}
          <div className="bg-[#0a0a0a] rounded-2xl p-8 flex items-start gap-5 relative overflow-hidden text-white">
            {/* Subtle gradient pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/5 to-transparent rounded-full -mr-32 -mt-32"></div>
            
            <div className="bg-white rounded-full p-3 flex-shrink-0 relative z-10">
              <Eye size={24} className="text-[#0a0a0a]" />
            </div>
            <div className="relative z-10">
              <h3 className="font-bold text-xl mb-2 text-white">Our Vision</h3>
              <p className="text-gray-300">
                To be a globally trusted IT partner known for quality, innovation, and long-term relationships.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutStory;