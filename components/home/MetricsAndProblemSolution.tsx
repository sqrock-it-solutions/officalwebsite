import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Handshake, MessageSquareText, Target } from 'lucide-react'

const values = [
  {
    title: 'Result Driven Approach',
    description: 'Every decision connects back to a clear business outcome.',
    icon: Target,
  },
  {
    title: 'Transparent Communication',
    description: 'Clear updates and honest guidance at every stage.',
    icon: MessageSquareText,
  },
  {
    title: 'Long Term Partnership',
    description: 'Solutions that keep working as your business grows.',
    icon: Handshake,
  },
]

export default function AboutSection() {
  return (
    <section id="about" className="bg-[#F5F5F5] py-24 sm:py-28 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:gap-20 lg:px-10">
        <div className="reveal-on-scroll">
          <span className="text-xs font-bold uppercase tracking-[0.24em] text-[#EF2B2D]">Why SQROCK</span>
          <h2 className="mt-4 text-4xl font-semibold uppercase leading-[1.04] tracking-[-0.04em] text-[#0F0F10] sm:text-5xl">
            Why Businesses<br className="hidden sm:block" /> Choose SQROCK
          </h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-black/55 sm:text-lg">
            We combine strategy, engineering, and hands-on collaboration to create dependable digital products. The focus stays simple: understand the challenge, build the right solution, and make it easier for your business to move forward.
          </p>

          <Link
            href="/about"
            className="group mt-8 inline-flex items-center gap-3 rounded-xl border border-[#0F0F10] px-5 py-3 text-sm font-semibold text-[#0F0F10] transition duration-300 hover:bg-[#0F0F10] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF2B2D]"
          >
            Learn More About Us
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </Link>

          <div className="mt-10 grid gap-3">
            {values.map((value) => {
              const Icon = value.icon

              return (
                <div key={value.title} className="group flex items-start gap-4 rounded-2xl border border-black/[0.07] bg-white p-4 transition duration-300 hover:border-[#EF2B2D]/25 hover:shadow-lg">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#EF2B2D]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-[#0F0F10]">{value.title}</h3>
                    <p className="mt-1 text-xs leading-5 text-black/50">{value.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="reveal-on-scroll relative">
          <div className="absolute -inset-5 rounded-[32px] bg-[#EF2B2D]/10 blur-2xl" />
          <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] border border-black/10 bg-white shadow-[0_30px_80px_rgba(15,15,16,.16)]">
            <Image
              src="/abouthero.png"
              alt="SQROCK IT Solutions modern office"
              fill
              sizes="(max-width: 1024px) 92vw, 52vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </div>

          <div className="absolute -bottom-7 left-5 right-5 rounded-[20px] border border-white/15 bg-[#242424]/95 p-5 text-white shadow-2xl backdrop-blur-xl sm:-left-8 sm:right-auto sm:max-w-sm sm:p-6">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#EF2B2D] shadow-[0_0_30px_rgba(239,43,45,.35)]">
              <Target className="h-5 w-5" aria-hidden="true" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#EF2B2D]">Our Mission</span>
            <p className="mt-3 text-lg font-semibold leading-7">Build technology that makes business progress feel clear, practical, and possible.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
