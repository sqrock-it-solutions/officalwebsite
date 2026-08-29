// AboutValuesTeam.tsx
import React from 'react';
import Link from 'next/link';
import { 
  Lightbulb, 
  Users, 
  Star, 
  Heart, 
  ArrowRight,
  Mail
} from 'lucide-react';

import { SlSocialLinkedin as Linkedin, SlSocialGithub as Github } from 'react-icons/sl';

interface ValueCard {
  id: number;
  icon: React.ElementType;
  title: string;
  description: string;
}

interface TeamMember {
  id: number;
  name: string;
  role: string;
  linkedin?: string;
  github?: string;
  email?: string;
}

const valuesData: ValueCard[] = [
  {
    id: 1,
    icon: Lightbulb,
    title: 'Innovation',
    description: 'We embrace new ideas and better ways.'
  },
  {
    id: 2,
    icon: Users,
    title: 'Integrity',
    description: 'We believe in transparency and honesty.'
  },
  {
    id: 3,
    icon: Star,
    title: 'Excellence',
    description: 'We are committed to delivering the best.'
  },
  {
    id: 4,
    icon: Heart,
    title: 'Client Success',
    description: 'Your growth is our success.'
  }
];

const teamData: TeamMember[] = [
  {
    id: 1,
    name: 'Rohit Verma',
    role: 'Founder ',
    linkedin: '#',
    github: '#',
    email: '#'
  },
  {
    id: 2,
    name: 'SANIYA KHAN',
    role: 'CEO',
    linkedin: '#',
    github: '#',
    email: '#'
  },
  {
    id: 3,
    name: 'ASHISH KUMAR',
    role: 'HUMAN RESOURCE MANAGER',
    linkedin: '#',
    github: '#',
    email: '#'
  },
//   {
//     id: 4,
//     name: 'Neha Gupta',
//     role: 'UX/UI Designer',
//     linkedin: '#',
//     github: '#',
//     email: '#'
//   }
];

const AboutValuesTeam: React.FC = () => {
  return (
    <>
      {/* Section 1: Our Values */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
            <div>
              <span className="text-xs font-bold text-gray-500 tracking-wider uppercase block mb-2">
                OUR VALUES
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0a0a0a] leading-tight max-w-sm">
                The Principles That Drive Us
              </h2>
            </div>
            <div className="text-right">
              <p className="text-gray-600 max-w-md mb-4 md:mb-0">
                Our values define who we are and how we work with our clients, teams, and community.
              </p>
              <Link 
                href="/culture" 
                className="font-bold text-[#0a0a0a] flex items-center gap-2 hover:text-gray-600 transition-colors justify-end"
              >
                More About Our Culture
                <ArrowRight size={18} className="inline-block" />
              </Link>
            </div>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {valuesData.map((value) => {
              const IconComponent = value.icon;
              return (
                <div 
                  key={value.id}
                  className="bg-gray-50/50 border border-gray-100 p-8 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300"
                >
                  <div className="bg-gray-100 p-3 rounded-xl inline-block mb-6">
                    <IconComponent size={24} className="text-[#0a0a0a]" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-[#0a0a0a]">
                    {value.title}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 2: Meet Our Team */}
      <section className="py-16 md:py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-12">
            <div>
              <span className="text-xs font-bold text-gray-500 tracking-wider uppercase block mb-2">
                MEET OUR TEAM
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0a0a0a]">
                The People Behind SQROCK
              </h2>
            </div>
            <div className="text-right">
              <p className="text-gray-600 max-w-md mb-4 md:mb-0">
                A passionate team of developers, designers, strategists, and problem solvers.
              </p>
              <Link 
                href="/team" 
                className="font-bold text-[#0a0a0a] flex items-center gap-2 hover:text-gray-600 transition-colors justify-end"
              >
                View All Team Members
                <ArrowRight size={18} className="inline-block" />
              </Link>
            </div>
          </div>

          {/* Team Grid - Without Images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamData.map((member) => (
              <div 
                key={member.id} 
                className="bg-gray-50/50 border border-gray-100 rounded-2xl p-6 hover:bg-white hover:shadow-lg transition-all duration-300"
              >
                {/* Avatar Placeholder */}
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mb-4 mx-auto">
                  <Users size={32} className="text-gray-400" />
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="text-lg font-bold text-[#0a0a0a]">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {member.role}
                  </p>
                  
                  {/* Social Links */}
                  <div className="flex gap-4 text-gray-400 justify-center">
                    {member.linkedin && (
                      <a 
                        href={member.linkedin} 
                        className="hover:text-[#0a0a0a] transition-colors"
                        aria-label={`${member.name}'s LinkedIn`}
                      >
                        <Linkedin size={18} />
                      </a>
                    )}
                    {member.github && (
                      <a 
                        href={member.github} 
                        className="hover:text-[#0a0a0a] transition-colors"
                        aria-label={`${member.name}'s GitHub`}
                      >
                        <Github size={18} />
                      </a>
                    )}
                    {member.email && (
                      <a 
                        href={`mailto:${member.email}`} 
                        className="hover:text-[#0a0a0a] transition-colors"
                        aria-label={`Email ${member.name}`}
                      >
                        <Mail size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutValuesTeam;