import { getActiveHeroContent } from '@/actions/home/hero'
import BlogSection from '@/components/home/BlogSection'
import CTA from '@/components/home/CTASection'
import Footer from '@/components/home/Footer'
import Hero from '@/components/home/hero'
import MetricsAndProblemSolution from '@/components/home/MetricsAndProblemSolution'
import Navbar from '@/components/home/navbar'
import Process from '@/components/home/ProcessSection'
import ProjectsSection from '@/components/home/ProjectsSection'
import Services from '@/components/home/ServicesSection'
import StatsBar from '@/components/home/StatsBar'
import TechnologiesAndProjects from '@/components/home/TechnologiesAndProjects'
import TestimonialsAndProcess from '@/components/home/TestimonialsAndProcess'
import Testimonials from '@/components/home/TestimonialsSection'
import WhySqrockSection from '@/components/home/WhySqrockSection'
import React from 'react'

export default async function page() {

  const heroData = await getActiveHeroContent()
  return (
    <div>
      <Hero initialData={heroData} />
      <MetricsAndProblemSolution />
      <Services />
      <TechnologiesAndProjects />
      {/* <Testimonials /> */}
      <Process />
      {/* <TestimonialsAndProcess /> */}
      <CTA />

      {/* <div className='relative'>
        <StatsBar />
      </div>
      <WhySqrockSection />
      <ProcessSection />
      <ProjectsSection />
      <TestimonialsSection />
      <BlogSection /> */}
    </div>
  )
}
