import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const BlogHero: React.FC = () => {
  return (
    <section className="w-full bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-16 md:pt-24 md:pb-24 lg:pt-32 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text Content */}
          <div>
            <span className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-4 block">
              OUR BLOG
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6 whitespace-pre-line">
              Insights, Ideas &<br />Industry Trends
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-lg">
              Stay updated with the latest in technology, business, and digital transformation.
            </p>
            <button className="bg-white text-black rounded-md px-6 py-3 font-semibold hover:bg-gray-200 transition-colors inline-flex items-center gap-2">
              Explore All Articles
              <ArrowRight size={20} />
            </button>
          </div>

          {/* Right Column: Image */}
          <div className="relative w-full aspect-video lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="/bloghero.png"
              alt="Sleek dark laptop workspace"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogHero;