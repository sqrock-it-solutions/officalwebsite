import Image from 'next/image'
import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/#services', label: 'Services' },
  { href: '/#portfolio', label: 'Portfolio' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
]

const services = [
  'Website Development',
  'Mobile App Development',
  'Custom Software',
  'Digital Marketing',
  'Cloud & DevOps',
  'Maintenance & Support',
]

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0F0F10] pb-8 pt-16 sm:pt-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_.7fr_1fr_1fr] lg:gap-10">
          <div>
            <Link href="/" aria-label="SQROCK IT Solutions home">
              <Image
                src="/logo.png"
                alt="SQROCK IT Solutions"
                width={176}
                height={44}
                className="h-auto w-[176px] brightness-0 invert"
              />
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-7 text-white/50">
              A website development agency and software company building modern digital solutions for businesses.
            </p>
            <span className="mt-7 inline-flex rounded-full border border-[#EF2B2D]/25 bg-[#EF2B2D]/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-red-200">
              Ideas. Technology. Impact.
            </span>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">Quick Links</h2>
            <ul className="mt-6 space-y-3.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/50 transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">Our Services</h2>
            <ul className="mt-6 space-y-3.5">
              {services.map((service) => (
                <li key={service}>
                  <Link href="/services" className="text-sm text-white/50 transition hover:text-white">
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">Contact</h2>
            <ul className="mt-6 space-y-4 text-sm text-white/50">
              <li>
                <a href="mailto:support@sqrock.cloud" className="flex items-start gap-3 transition hover:text-white">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#EF2B2D]" aria-hidden="true" />
                  support@sqrock.cloud
                </a>
              </li>
              <li>
                <a href="tel:+918619819400" className="flex items-start gap-3 transition hover:text-white">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#EF2B2D]" aria-hidden="true" />
                  +91 86198 19400
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#EF2B2D]" aria-hidden="true" />
                Jaipur, Rajasthan, India
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-7 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 SQROCK IT SOLUTIONS. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/privacy" className="transition hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="transition hover:text-white">Terms of Service</Link>
            <Link href="/sitemap" className="transition hover:text-white">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
