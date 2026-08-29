// WhyChooseUs.tsx
import React from 'react';
import { 
  CircleDollarSign, 
  ShieldCheck, 
  Headphones, 
  UserCheck 
} from 'lucide-react';

interface FeatureCard {
  id: number;
  icon: React.ElementType;
  title: string;
  description: string;
}

const featuresData: FeatureCard[] = [
  {
    id: 1,
    icon: CircleDollarSign,
    title: 'Transparent Pricing',
    description: 'No hidden costs, no surprises.'
  },
  {
    id: 2,
    icon: ShieldCheck,
    title: 'Quality Assurance',
    description: 'Rigorous testing for bug-free solutions.'
  },
  {
    id: 3,
    icon: Headphones,
    title: 'Post-launch Support',
    description: "We're always here for you."
  },
  {
    id: 4,
    icon: UserCheck,
    title: 'Dedicated Project Managers',
    description: 'Your single point of contact.'
  }
];

const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <div>
            <span className="text-xs font-bold text-gray-500 tracking-wider uppercase block mb-4">
              WHY CHOOSE US
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0a0a0a] leading-tight mb-6">
              More Than a Service, A Long-Term Partner
            </h2>
            <p className="text-gray-600 text-lg">
              We don't just build software, we build long-term partnerships based on 
              trust, quality, and results.
            </p>
          </div>

          {/* Right Column - Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {featuresData.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <div 
                  key={feature.id}
                  className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row gap-4 items-start hover:shadow-md transition-shadow duration-300"
                >
                  {/* Icon Container */}
                  <div className="bg-gray-50 p-3 rounded-xl shrink-0">
                    <IconComponent size={24} className="text-[#0a0a0a]" />
                  </div>
                  
                  {/* Text Container */}
                  <div>
                    <h3 className="font-bold text-[#0a0a0a] text-lg mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;