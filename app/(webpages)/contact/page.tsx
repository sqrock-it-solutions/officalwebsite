import ContactDetailsForm from '@/components/contact/ContactDetailsForm'
import ContactHero from '@/components/contact/contacthero'
import FAQandCTA from '@/components/contact/FAQandCTA'
import React from 'react'

export default function page() {
  return (
    <div>
        <ContactHero />
        <ContactDetailsForm />
        <FAQandCTA />
    </div>
  )
}
