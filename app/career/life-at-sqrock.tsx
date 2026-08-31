import { Users, Heart, Sparkles, Star } from "lucide-react";

const highlights = [
  {
    icon: Users,
    title: "Collaborative",
    description: "Team First",
  },
  {
    icon: Heart,
    title: "Health & Wellness",
    description: "Stay Healthy",
  },
  {
    icon: Sparkles,
    title: "Fun & Events",
    description: "Work Hard, Play Hard",
  },
  {
    icon: Star,
    title: "Great Work Culture",
    description: "Grow Together",
  },
];

export function LifeAtSQROCK() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Image */}
          <div className="order-2 lg:order-1">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100">
              <div className="flex h-full w-full items-center justify-center bg-gray-200">
                <span className="text-gray-400">Workplace Image</span>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="order-1 flex flex-col justify-center lg:order-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              LIFE AT SQROCK
            </span>
            <h2 className="mt-2 text-3xl font-bold text-black md:text-4xl">
              A Place to Do Your Best Work
            </h2>
            <p className="mt-4 text-base text-gray-600 md:text-lg">
              We are a team of innovators, dreamers and doers. At SQROCK, you'll
              find a friendly environment, exciting challenges and people who've
              got your back.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4">
              {highlights.map((highlight, index) => {
                const Icon = highlight.icon;
                return (
                  <div
                    key={index}
                    className="rounded-xl border border-gray-100 p-4 transition-shadow hover:shadow-sm"
                  >
                    <Icon className="mb-1 h-5 w-5 text-gray-600" />
                    <h4 className="font-semibold text-black">
                      {highlight.title}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {highlight.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}