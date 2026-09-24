import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Apply",
    description: "Send your resume and tell us about you.",
  },
  {
    number: "02",
    title: "Shortlist",
    description: "We review your profile and shortlist the best fits.",
  },
  {
    number: "03",
    title: "Interview",
    description: "Let's connect and learn from each other.",
  },
  {
    number: "04",
    title: "Offer",
    description: "If it's a mutual match, we'll make it official!",
  },
];

export function HiringProcess() {
  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            OUR HIRING PROCESS
          </span>
          <h2 className="mt-2 text-3xl font-bold text-black md:text-4xl">
            Simple. Transparent. People First.
          </h2>
        </div>

        <div className="mt-12">
          <div className="hidden lg:flex lg:items-center lg:justify-between">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black text-xl font-bold text-white">
                    {step.number}
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-black">
                    {step.title}
                  </h3>
                  <p className="mt-1 max-w-[180px] text-center text-sm text-gray-600">
                    {step.description}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <ArrowRight className="mx-6 h-6 w-6 text-gray-300" />
                )}
              </div>
            ))}
          </div>

          {/* Mobile Stacked Layout */}
          <div className="space-y-8 lg:hidden">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-black text-lg font-bold text-white">
                  {step.number}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-black">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}