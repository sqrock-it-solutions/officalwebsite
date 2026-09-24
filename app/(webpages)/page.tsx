import { getActiveHeroContent } from '@/actions/home/hero'
import CTA from '@/components/home/CTASection'
import Hero from '@/components/home/hero'
import AboutSection from '@/components/home/MetricsAndProblemSolution'
import Process from '@/components/home/ProcessSection'
import Projects from '@/components/home/TechnologiesAndProjects'
import Services from '@/components/home/ServicesSection'

export default async function Page() {
  const heroData = await getActiveHeroContent()

  return (
    <main>
      <Hero initialData={heroData} />
      <Services />
      <AboutSection />
      <Projects />
      <Process />
      <CTA />
    </main>
  )
}
