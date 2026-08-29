// Testimonials.tsx
import React from 'react';
import { Star, ArrowLeft, ArrowRight } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  title: string;
  company: string;
  quote: string;
  rating: number;
}

const testimonialsData: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    title: 'CEO',
    company: 'TechStart Inc.',
    quote: 'The team delivered an exceptional product that exceeded our expectations. Our revenue increased by 150% within the first quarter.',
    rating: 5
  },
  {
    id: 2,
    name: 'Michael Chen',
    title: 'CTO',
    company: 'InnovateCorp',
    quote: 'Working with this team was a game-changer. They understood our vision and executed it flawlessly. Highly recommend their services.',
    rating: 5
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    title: 'Product Manager',
    company: 'GrowthLabs',
    quote: 'The level of professionalism and technical expertise was outstanding. They delivered ahead of schedule and within budget.',
    rating: 5
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <span className="text-xs font-bold text-gray-500 tracking-wider uppercase block mb-2">
              TESTIMONIALS
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a0a0a]">
              What Our Clients Say
            </h2>
            <p className="text-gray-600 mt-2">
              Trusted by businesses across industries.
            </p>
          </div>
          {/* Navigation Buttons - Desktop Only */}
          <div className="hidden sm:flex gap-2 mt-4 md:mt-0">
            <button 
              className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 transition-colors"
              aria-label="Previous testimonial"
            >
              <ArrowLeft size={18} className="text-gray-600" />
            </button>
            <button 
              className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 transition-colors"
              aria-label="Next testimonial"
            >
              <ArrowRight size={18} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, index) => (
                  <Star 
                    key={index} 
                    size={18} 
                    className="text-[#0a0a0a] fill-current" 
                  />
                ))}
              </div>
              
              {/* Quote */}
              <p className="text-lg font-medium text-[#0a0a0a] mb-8 leading-relaxed">
                "{testimonial.quote}"
              </p>
              
              {/* Client Info */}
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-gray-300 to-gray-400 rounded-full w-12 h-12 flex-shrink-0" />
                <div>
                  <p className="font-bold text-[#0a0a0a]">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">
                    {testimonial.title}, {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;