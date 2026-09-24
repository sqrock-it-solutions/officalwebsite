import ComprehensiveITSolutions from '@/components/services/ComprehensiveITSolutions'
import ServicesHero from '@/components/services/hero'
import ServicesPageSections from '@/components/services/ServicesPageSections'
import React from 'react'

export default function page() {
  return (
    <div>
      <ServicesHero />
      <ComprehensiveITSolutions />
      <ServicesPageSections />
    </div>
  )
}
