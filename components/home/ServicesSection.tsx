import Link from 'next/link'
import {
  ArrowRight,
  CloudCog,
  Code2,
  Headset,
  Megaphone,
  PanelsTopLeft,
  Smartphone,
} from 'lucide-react'

const services = [
  {
    title: 'Website Development',
    description: 'Modern, responsive websites designed for speed, usability, and real business impact.',
    icon: Code2,
  },
  {
    title: 'Mobile App Development',
    description: 'Android and cross-platform apps built for reliable, engaging everyday experiences.',
    icon: Smartphone,
  },
  {
    title: 'Custom Software Development',
    description: 'Business-specific software that simplifies workflows and solves complex challenges.',
    icon: PanelsTopLeft,
  },
  {
    title: 'Digital Marketing',
    description: 'SEO, social media, and performance marketing that drives measurable growth.',
    icon: Megaphone,
  },
  {
    title: 'Cloud & DevOps Solutions',
    description: 'Secure infrastructure, automated deployment, and scalable cloud operations.',
    icon: CloudCog,
  },
  {
    title: 'Maintenance & Support',
    description: 'Continuous technical support that keeps every digital experience running smoothly.',
    icon: Headset,
  },
]

export default function Services() {
  return (
    <section id="services" className="bg-white py-24 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="reveal-on-scroll mx-auto max-w-3xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.24em] text-[#EF2B2D]">What We Do</span>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[#0F0F10] sm:text-5xl lg:text-6xl">Our Services</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-black/55 sm:text-lg">
            From first idea to long-term support, we build digital products that solve meaningful business problems.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon

            return (
              <Link
                key={service.title}
                href="/services"
                className="group reveal-on-scroll flex min-h-[300px] flex-col rounded-[22px] border border-black/[0.08] bg-[#F5F5F5] p-7 transition duration-300 hover:-translate-y-1.5 hover:border-[#EF2B2D]/25 hover:bg-white hover:shadow-[0_22px_55px_rgba(15,15,16,.10)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF2B2D]"
              >
                <span className="flex h-13 w-13 items-center justify-center rounded-2xl bg-[#EF2B2D] text-white shadow-[0_12px_28px_rgba(239,43,45,.2)] transition-transform duration-300 group-hover:rotate-3 group-hover:scale-105">
                  <Icon className="h-6 w-6" strokeWidth={1.8} aria-hidden="true" />
                </span>
                <h3 className="mt-8 text-xl font-semibold tracking-[-0.02em] text-[#0F0F10]">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-black/55">{service.description}</p>
                <span className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-semibold text-[#0F0F10]">
                  Learn More
                  <ArrowRight className="h-4 w-4 text-[#EF2B2D] transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
