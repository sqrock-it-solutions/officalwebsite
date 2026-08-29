import React from 'react';
import Image from 'next/image';
import {
  Monitor,
  Globe,
  Smartphone,
  Settings,
  BarChart,
  Grid,
  ArrowRight,
  Check,
  LayoutGrid,
  Code,
  Database,
  Server,
  Cloud,
  Zap,
} from 'lucide-react';

// Define the structure for a service card
interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  checklist: string[];
  imageSrc: string;
  imageAlt: string;
}

// Service card component
const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
  checklist,
  imageSrc,
  imageAlt,
}) => {
  return (
    <div className="relative flex flex-col md:flex-row bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 group">
      {/* Left Content Area */}
      <div className="w-full md:w-2/3 p-6 md:p-8 flex flex-col z-10">
        {/* Icon */}
        <div className="bg-white rounded-lg p-2.5 shadow-sm inline-block w-max mb-6">
          {icon}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-[#0a0a0a] mb-3 pr-2">{title}</h3>

        {/* Description */}
        <p className="text-xs md:text-sm text-gray-600 mb-6 line-clamp-3">
          {description}
        </p>

        {/* Checklist */}
        <ul className="space-y-2 mb-8 mt-auto">
          {checklist.map((item, index) => (
            <li key={index} className="flex items-start">
              <Check className="w-4 h-4 text-[#0a0a0a] shrink-0 mr-2 mt-0.5" />
              <span className="text-xs md:text-sm text-[#0a0a0a] font-medium">
                {item}
              </span>
            </li>
          ))}
        </ul>

        {/* Learn More Button */}
        <button className="flex items-center gap-2 text-sm font-bold text-[#0a0a0a] group-hover:gap-3 transition-all self-start">
          Learn More
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Right Image Area - absolute on larger screens, relative on mobile */}
      <div className="relative w-full md:w-1/3 h-48 md:h-auto md:absolute md:right-0 md:top-0 md:bottom-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover object-left"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {/* Subtle dark gradient overlay for better readability if needed */}
        <div className="absolute inset-0 bg-gradient-to-l from-black/10 via-transparent to-transparent md:from-black/20"></div>
      </div>
    </div>
  );
};

// Main Services Section Component
const ComprehensiveITSolutions: React.FC = () => {
  // Mock data for the 6 service cards
  const services: ServiceCardProps[] = [
    {
      icon: <Monitor className="w-6 h-6 text-[#0a0a0a]" />,
      title: 'Custom Software Development',
      description:
        'Tailored software solutions built to streamline your operations, from enterprise systems to business automation tools.',
      checklist: ['Enterprise Software', 'CRM & ERP', 'Business Automation'],
      imageSrc: '/assets/services/1.png',
      imageAlt: 'Custom software development',
    },
    {
      icon: <Globe className="w-6 h-6 text-[#0a0a0a]" />,
      title: 'Web Development',
      description:
        'Modern, scalable web applications and websites designed to engage users and drive business growth.',
      checklist: ['Corporate Websites', 'E-commerce', 'Web Applications'],
      imageSrc: '/assets/services/2.png',
      imageAlt: 'Web development',
    },
    {
      icon: <Smartphone className="w-6 h-6 text-[#0a0a0a]" />,
      title: 'Mobile App Development',
      description:
        'Native and cross-platform mobile apps that deliver seamless user experiences on iOS and Android.',
      checklist: ['Android App', 'iOS App', 'Cross-platform'],
      imageSrc: '/assets/services/3.png',
      imageAlt: 'Mobile app development',
    },
    {
      icon: <Settings className="w-6 h-6 text-[#0a0a0a]" />,
      title: 'IT Consulting & Strategy',
      description:
        'Expert guidance to align your technology investments with business goals and future-proof your infrastructure.',
      checklist: ['Technology Roadmap', 'Infrastructure', 'MVP Planning'],
      imageSrc: '/assets/services/4.png',
      imageAlt: 'IT consulting and strategy',
    },
    {
      icon: <BarChart className="w-6 h-6 text-[#0a0a0a]" />,
      title: 'Digital Marketing',
      description:
        'Data-driven marketing strategies to increase your online visibility, attract leads, and boost conversions.',
      checklist: ['SEO', 'Social Media', 'Google Ads'],
      imageSrc: '/assets/services/5.png',
      imageAlt: 'Digital marketing',
    },
    {
      icon: <Grid className="w-6 h-6 text-[#0a0a0a]" />,
      title: 'Ongoing Support & Maintenance',
      description:
        'Reliable support and maintenance services to keep your systems running smoothly and securely.',
      checklist: ['24/7 Support', 'Regular Updates', 'Performance Monitoring'],
      imageSrc: '/assets/services/6.png',
      imageAlt: 'Support and maintenance',
    },
  ];

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Area */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16">
          {/* Left Side */}
          <div>
            <span className="text-xs font-bold text-gray-500 tracking-wider uppercase mb-3 block">
              OUR SERVICES
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0a0a0a] leading-tight whitespace-pre-line">
              Comprehensive IT Solutions
              {'\n'}for Your Business
            </h2>
          </div>

          {/* Right Side */}
          <div className="flex flex-col items-start lg:items-end gap-4 max-w-md">
            <p className="text-gray-600 text-sm md:text-base">
              We offer end-to-end IT services designed to solve real business
              problems. Whether you're a startup or an established enterprise,
              we have the expertise to bring your ideas to life.
            </p>
            <button className="bg-gray-100 hover:bg-gray-200 text-[#0a0a0a] font-semibold px-5 py-2.5 rounded-lg flex items-center gap-2 transition">
              Get a Free Quote
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComprehensiveITSolutions;