import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const projects = [
  {
    name: 'E-Commerce Website',
    type: 'E-Commerce Experience',
    image: '/assets/services/1.png',
  },
  {
    name: 'Education Platform',
    type: 'Learning Technology',
    image: '/assets/services/3.png',
  },
  {
    name: 'Business Mobile App',
    type: 'Cross-Platform Product',
    image: '/assets/services/5.png',
  },
  {
    name: 'Company Website',
    type: 'Corporate Web Design',
    image: '/assets/services/4.png',
  },
]

export default function Projects() {
  return (
    <section id="portfolio" className="bg-white py-24 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="reveal-on-scroll flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.24em] text-[#EF2B2D]">Selected Work</span>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[#0F0F10] sm:text-5xl">Featured Projects</h2>
            <p className="mt-5 text-base leading-7 text-black/55 sm:text-lg">
              A selection of digital experiences built around usability, clarity, and business goals.
            </p>
          </div>
          <Link
            href="/contact"
            className="group inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#0F0F10]"
          >
            Discuss Your Project
            <ArrowRight className="h-4 w-4 text-[#EF2B2D] transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <article key={project.name} className="group reveal-on-scroll overflow-hidden rounded-[22px] border border-black/[0.08] bg-[#F5F5F5] transition duration-300 hover:-translate-y-1.5 hover:border-black/15 hover:shadow-[0_24px_60px_rgba(15,15,16,.12)]">
              <div className="relative aspect-[16/10] overflow-hidden bg-[#242424]">
                <Image
                  src={project.image}
                  alt={`${project.name} project preview`}
                  fill
                  sizes="(max-width: 640px) 92vw, 46vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.035]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60" />
              </div>
              <div className="flex items-center justify-between gap-5 p-6 sm:p-7">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#EF2B2D]">{project.type}</p>
                  <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em] text-[#0F0F10]">{project.name}</h3>
                </div>
                <Link
                  href="/contact"
                  aria-label={`Ask about ${project.name}`}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0F0F10] text-white transition duration-300 group-hover:bg-[#EF2B2D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF2B2D] focus-visible:ring-offset-2"
                >
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
