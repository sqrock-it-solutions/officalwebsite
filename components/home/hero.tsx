import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Check, Sparkles } from 'lucide-react'
import type { HeroDataWithBlog } from '@/actions/home/hero'

interface HeroProps {
  initialData: HeroDataWithBlog
}

const trustPoints = [
  'Modern Technology',
  'On-Time Delivery',
  'Dedicated Support',
  'Client Focused',
]

export default function Hero({ initialData }: HeroProps) {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-[#0F0F10] pb-24 pt-20 sm:pb-28 sm:pt-24 lg:min-h-[820px] lg:pb-32 lg:pt-28"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 opacity-25"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'linear-gradient(to bottom, black, transparent 88%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -left-40 top-16 -z-10 h-[520px] w-[520px] rounded-full bg-[#EF2B2D]/20 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="absolute -right-40 bottom-0 -z-10 h-[600px] w-[600px] rounded-full bg-red-900/30 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-44 bg-gradient-to-t from-[#EF2B2D]/20 to-transparent"
        style={{
          clipPath:
            'polygon(0 100%, 0 74%, 12% 48%, 24% 72%, 38% 32%, 52% 68%, 66% 40%, 79% 72%, 91% 44%, 100% 64%, 100% 100%)',
        }}
      />

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-[1.04fr_.96fr] lg:gap-14 lg:px-10">
        <div className="relative z-10 max-w-2xl">
          <div className="reveal-up inline-flex items-center gap-2 rounded-full border border-[#EF2B2D]/30 bg-[#EF2B2D]/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-red-100 sm:text-xs">
            <Sparkles className="h-3.5 w-3.5 text-[#EF2B2D]" aria-hidden="true" />
            We Build Digital Solutions
          </div>

          <h1 className="reveal-up reveal-delay-1 mt-7 text-[clamp(3.1rem,7vw,6.4rem)] font-semibold leading-[0.94] tracking-[-0.055em] text-white">
            <span className="block">Your Ideas</span>
            <span className="block text-[#EF2B2D]">Our Technology</span>
            <span className="block">Real Impact</span>
          </h1>

          <p className="reveal-up reveal-delay-2 mt-8 max-w-xl text-base leading-8 text-white/65 sm:text-lg">
            A website development agency and software company building modern
            digital solutions for businesses.
          </p>

          <div className="reveal-up reveal-delay-3 mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#contact"
              className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-[#EF2B2D] px-6 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(239,43,45,.24)] transition duration-300 hover:-translate-y-1 hover:bg-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF2B2D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F0F10]"
            >
              Get a Free Quote
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <Link
              href="#services"
              className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white/[0.04] px-6 text-sm font-semibold text-white transition duration-300 hover:-translate-y-1 hover:border-white/40 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              Our Services
              <ArrowRight className="h-4 w-4 text-white/50 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>

          <div className="reveal-up reveal-delay-4 mt-10 grid grid-cols-2 gap-x-5 gap-y-4 border-t border-white/10 pt-7 sm:flex sm:flex-wrap sm:gap-x-7">
            {trustPoints.map((point) => (
              <div key={point} className="flex items-center gap-2.5 text-xs font-medium text-white/65 sm:text-sm">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#EF2B2D]/15 text-[#EF2B2D]">
                  <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                </span>
                {point}
              </div>
            ))}
          </div>
        </div>

        <div className="reveal-up reveal-delay-2 relative mx-auto w-full max-w-2xl lg:mx-0">
          <div className="absolute -inset-6 -z-10 rounded-[36px] bg-[#EF2B2D]/15 blur-3xl" />
          <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] border border-white/15 bg-white/5 p-2 shadow-[0_40px_100px_rgba(0,0,0,.55)] sm:rounded-[30px] sm:p-3">
            <div className="relative h-full overflow-hidden rounded-[18px] sm:rounded-[22px]">
              <Image
                src={initialData.heroImage || '/heroimg.png'}
                alt="SQROCK digital product development workspace"
                fill
                preload
                sizes="(max-width: 1024px) 92vw, 48vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F10]/60 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-7">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/55">Built for what&apos;s next</p>
                  <p className="mt-2 text-lg font-semibold text-white sm:text-xl">Ideas become useful products.</p>
                </div>
                <span className="hidden h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white backdrop-blur-md sm:flex">
                  <Sparkles className="h-5 w-5 text-[#EF2B2D]" aria-hidden="true" />
                </span>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-7 -left-3 rounded-2xl border border-white/15 bg-[#242424]/90 p-4 shadow-2xl backdrop-blur-xl sm:-left-8 sm:p-5">
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-white">
              <span className="h-2 w-2 rounded-full bg-[#EF2B2D] shadow-[0_0_16px_#EF2B2D]" />
              Strategy to launch
            </div>
            <div className="flex items-center gap-2 text-[10px] font-medium text-white/50 sm:text-xs">
              <span>Plan</span>
              <ArrowRight className="h-3 w-3" aria-hidden="true" />
              <span>Build</span>
              <ArrowRight className="h-3 w-3" aria-hidden="true" />
              <span>Scale</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
