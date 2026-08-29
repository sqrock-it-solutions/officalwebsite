import Image from 'next/image';
import { Calendar } from 'lucide-react';

const TermsHero = () => {
  return (
    <section className="bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-16 md:pt-24 lg:pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <div className="order-2 lg:order-1">
            <span className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-4 block">
              TERMS & CONDITIONS
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.2] mb-6 whitespace-pre-line">
              Terms that build
              <br />
              trust and transparency.
            </h1>
            
            <p className="text-gray-300 text-lg mb-8 max-w-lg">
              These Terms and Conditions govern your use of our website and services. 
              Please read them carefully.
            </p>
            
            <div className="flex items-center gap-2 text-gray-300 text-sm font-medium">
              <Calendar className="w-4 h-4" />
              <span>Last Updated: May 26, 2026</span>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="order-1 lg:order-2 relative w-full aspect-video lg:aspect-[4/3]">
            <Image
              src="/termshero.png"
              alt="Terms and Conditions illustration"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermsHero;