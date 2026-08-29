import React from 'react';
import { 
  Code2, 
  Smartphone, 
  Settings, 
  BarChart, 
  Megaphone,
  ArrowRight 
} from 'lucide-react';
import Link from 'next/link';

interface Service {
  id: number;
  icon: React.ElementType;
  title: string;
  description: string;
}

const servicesData: Service[] = [
  {
    id: 1,
    icon: Code2,
    title: 'Web Development',
    description: 'Custom web applications built with modern frameworks for exceptional performance and user experience.'
  },
  {
    id: 2,
    icon: Smartphone,
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile solutions that engage users and drive business growth.'
  },
  {
    id: 3,
    icon: Settings,
    title: 'Custom Software',
    description: 'Tailored software solutions designed to automate workflows and solve complex business challenges.'
  },
  {
    id: 4,
    icon: BarChart,
    title: 'IT Consulting',
    description: 'Strategic technology guidance to optimize infrastructure and align IT with business objectives.'
  },
  {
    id: 5,
    icon: Megaphone,
    title: 'Digital Marketing',
    description: 'Data-driven marketing strategies to boost visibility, generate leads, and increase conversions.'
  }
];

const Services: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          {/* Left side - Text */}
          <div>
            <span className="text-xs font-bold text-gray-600 tracking-wider uppercase block mb-3">
              OUR SERVICES
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a0a0a] leading-tight mb-3">
              Complete IT Solutions Under One Roof.
            </h2>
            <p className="text-gray-600 md:text-lg">
              From idea to execution, we provide end-to-end IT services to help your business grow.
            </p>
          </div>

          {/* Right side - View All Link */}
          <Link 
            href="/services" 
            className="font-bold text-[#0a0a0a] hover:text-gray-600 transition-colors flex items-center gap-2 flex-shrink-0"
          >
            View All Services
            <ArrowRight size={18} className="inline-block" />
          </Link>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {servicesData.map((service) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                className="group bg-gray-50 border border-gray-100 rounded-2xl p-6 md:p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                {/* Icon */}
                <div className="mb-6">
                  <IconComponent className="w-10 h-10 text-[#0a0a0a]" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-[#0a0a0a] mb-3">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Bottom Arrow with hover effect */}
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#0a0a0a] group-hover:translate-x-1 transition-all" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;