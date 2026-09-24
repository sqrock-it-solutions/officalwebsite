import { ArrowDown, ArrowRight, Code2, FileText, MessageSquareText, Rocket } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'Understand goals and requirements',
    icon: MessageSquareText,
  },
  {
    number: '02',
    title: 'Planning',
    description: 'Strategy and project roadmap',
    icon: FileText,
  },
  {
    number: '03',
    title: 'Development',
    description: 'Design, development, and testing',
    icon: Code2,
  },
  {
    number: '04',
    title: 'Delivery & Support',
    description: 'Launch and ongoing support',
    icon: Rocket,
  },
]

export default function Process() {
  return (
    <section id="process" className="relative overflow-hidden bg-[#0F0F10] py-24 sm:py-28 lg:py-32">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#EF2B2D]/10 blur-[120px]"
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="reveal-on-scroll mx-auto max-w-3xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.24em] text-[#EF2B2D]">Our Process</span>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">How We Work</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/55 sm:text-lg">
            A clear path from the first conversation to a supported digital product.
          </p>
        </div>

        <div className="relative mt-16 grid gap-8 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] lg:items-start lg:gap-5">
          <div aria-hidden="true" className="absolute left-[10%] right-[10%] top-7 hidden border-t border-dashed border-white/15 lg:block" />
          {steps.map((step, index) => {
            const Icon = step.icon

            return (
              <div key={step.number} className="contents">
                <article className="reveal-on-scroll relative rounded-[20px] border border-white/10 bg-white/[0.04] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#EF2B2D]/35 hover:bg-white/[0.07] sm:p-7">
                  <div className="relative z-10 mb-8 flex h-14 w-14 items-center justify-center rounded-full border border-[#EF2B2D]/40 bg-[#0F0F10] text-white shadow-[0_0_30px_rgba(239,43,45,.28)]">
                    <span className="absolute inset-0 rounded-full bg-[#EF2B2D]/10 blur-md" />
                    <Icon className="relative h-6 w-6" aria-hidden="true" />
                  </div>
                  <span className="text-xs font-bold tracking-[0.2em] text-[#EF2B2D]">{step.number}</span>
                  <h3 className="mt-3 text-xl font-semibold text-white">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/50">{step.description}</p>
                </article>

                {index < steps.length - 1 && (
                  <div className="flex items-center justify-center" aria-hidden="true">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#242424] text-[#EF2B2D] lg:translate-y-8">
                      <ArrowDown className="h-4 w-4 lg:hidden" />
                      <ArrowRight className="hidden h-4 w-4 lg:block" />
                    </span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
