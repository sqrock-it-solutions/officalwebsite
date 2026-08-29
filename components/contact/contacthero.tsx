// components/ContactHero.tsx
import Image from 'next/image';
import { Headphones, ShieldCheck } from 'lucide-react';

const ContactHero = () => {
  return (
    <section className="bg-[#0a0a0a] w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-16 md:pt-24 lg:pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column */}
          <div className="order-2 lg:order-1">
            {/* Eyebrow */}
            <span className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-4 block">
              GET IN TOUCH
            </span>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6 whitespace-pre-line">
              Let's Build
              Something Great
              Together.
            </h1>

            {/* Divider */}
            <div className="w-12 h-1 bg-white mb-8"></div>

            {/* Paragraph */}
            <p className="text-gray-300 text-lg mb-12 max-w-md">
              Have a project in mind or need expert advice? We're here to help you turn your ideas into powerful digital solutions.
            </p>

            {/* Trust Signals */}
            <div className="flex flex-col sm:flex-row gap-8">
              {/* Trust Item 1 */}
              <div className="flex items-start gap-4">
                <div className="border border-white/20 rounded-full p-3 text-white shrink-0">
                  <Headphones className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm mb-1">Quick Response</p>
                  <p className="text-gray-400 text-xs">We'll get back to you within 24 hours.</p>
                </div>
              </div>

              {/* Trust Item 2 */}
              <div className="flex items-start gap-4">
                <div className="border border-white/20 rounded-full p-3 text-white shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm mb-1">100% Confidential</p>
                  <p className="text-gray-400 text-xs">Your information is safe with us.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="order-1 lg:order-2 relative w-full aspect-[4/3] lg:aspect-square max-h-[600px] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="/contacthero.png"
              alt="Contact us - Let's build something great together"
              fill
              className="object-cover"
              priority
            />
            {/* Subtle dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 via-[#0a0a0a]/20 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;