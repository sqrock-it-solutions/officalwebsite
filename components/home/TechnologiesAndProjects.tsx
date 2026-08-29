import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiPython,
  SiTypescript,
  SiDocker,
  SiMysql,
  SiMongodb,
} from 'react-icons/si';
import { FaAws as SiAmazonwebservices } from 'react-icons/fa';

const technologies = [
  { name: 'React', icon: SiReact },
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'Node.js', icon: SiNodedotjs },
  { name: 'Python', icon: SiPython },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'AWS', icon: SiAmazonwebservices },
  { name: 'Docker', icon: SiDocker },
  { name: 'MySQL', icon: SiMysql },
  { name: 'MongoDB', icon: SiMongodb },
];

interface Project {
  id: number;
  image: string;
  category: string;
  name: string;
  title: string;
  metric: string;
}

const projectsData: Project[] = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=85',
    category: 'Web App',
    name: 'RetailPro',
    title: 'E-commerce Platform',
    metric: 'Increased sales by 2.5x',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=85',
    category: 'Mobile App',
    name: 'TaskTrack',
    title: 'Project Management App',
    metric: 'Improved team productivity by 40%',
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85',
    category: 'Custom Software',
    name: 'HealthMate',
    title: 'Clinic Management System',
    metric: 'Reduced manual work by 70%',
  },
];

const TechnologiesAndProjects: React.FC = () => {
  return (
    <>
      {/* Technologies */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <span className="text-xs font-bold text-gray-500 tracking-wider uppercase block mb-2">
            TECHNOLOGIES WE WORK WITH
          </span>

          <h2 className="text-2xl md:text-3xl font-bold text-[#0a0a0a] mb-10">
            Built with the Best Technologies
          </h2>

          <div className="flex flex-wrap items-center justify-center md:justify-between gap-8 md:gap-12">
            {technologies.map((tech) => {
              const Icon = tech.icon;

              return (
                <div
                  key={tech.name}
                  className="group flex flex-col items-center gap-3 opacity-60 hover:opacity-100 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-xl border border-gray-200 flex items-center justify-center bg-white shadow-sm group-hover:shadow-md group-hover:-translate-y-1 transition-all duration-300">
                    <Icon
                      size={32}
                      className="text-[#111] group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  <span className="text-sm font-medium text-gray-600">
                    {tech.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Work */}
          {/* <FeatureWork /> */}
    </>
  );
};

export default TechnologiesAndProjects;

export function FeatureWork(){
  return  <section className="py-16 md:py-24 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-bold text-gray-600 tracking-wider uppercase block mb-2">
                FEATURED WORK
              </span>

              <h2 className="text-3xl md:text-4xl font-bold text-[#0a0a0a] leading-tight mb-3">
                Real Projects. Real Impact.
              </h2>

              <p className="text-gray-600 md:text-lg max-w-2xl">
                Take a look at some of our recent work and see how we've helped
                businesses grow.
              </p>
            </div>

            <Link
              href="/case-studies"
              className="font-bold text-[#0a0a0a] hover:text-gray-600 transition-colors flex items-center gap-2 flex-shrink-0"
            >
              View All Case Studies
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Projects */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projectsData.map((project) => (
              <div key={project.id} className="group">

                {/* Image */}
                <div className="bg-gray-100 rounded-2xl overflow-hidden aspect-video relative mb-6">

                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

                  {/* Category */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-gray-700 shadow-sm">
                    {project.category}
                  </div>
                </div>

                {/* Content */}
                <div>
                  <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                    {project.name}
                  </p>

                  <h3 className="text-xl font-bold text-[#0a0a0a] mt-1 mb-2">
                    {project.title}
                  </h3>

                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-[#0a0a0a]">
                      {project.metric}
                    </p>

                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#0a0a0a] group-hover:translate-x-1 transition-all" />
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>
}