import { 
  GraduationCap, 
  Target, 
  Users, 
  TrendingUp,
  LucideIcon 
} from "lucide-react";

interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

const benefits: Benefit[] = [
  {
    icon: GraduationCap,
    title: "Learn & Grow",
    description:
      "Work with the latest technologies and level up your skills every single day.",
  },
  {
    icon: Target,
    title: "Real Impact",
    description:
      "Your work will be used by real businesses and make a meaningful difference.",
  },
  {
    icon: Users,
    title: "Flexible Culture",
    description:
      "We believe in flexibility, trust and a healthy work-life balance.",
  },
  {
    icon: TrendingUp,
    title: "Career Growth",
    description:
      "Clear growth paths, mentorship and endless opportunities to grow.",
  },
];

export function CareerBenefits() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            WHY JOIN SQROCK?
          </span>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:gap-12">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="group rounded-2xl border border-gray-100 bg-white p-6 transition-shadow hover:shadow-md md:p-8"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-black transition-colors group-hover:bg-black group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-black">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
