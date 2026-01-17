import { Target, Users, BarChart3, Shield, BrainCircuit, RefreshCw } from "lucide-react";

const features = [
  {
    name: "Align Founder Vision & Team Execution",
    description: "Keep strategic intent connected to daily execution — without misalignment.",
    icon: Users,
  },
  {
    name: "Prioritize What Matters Most",
    description: "Cut through noise and focus on initiatives with real business impact.",
    icon: Target,
  },
  {
    name: "Insight-Backed Decisions, Not Gut Calls",
    description: "Make every decision data-informed and tied to your strategic goals.",
    icon: BrainCircuit,
  },
  {
    name: "Always-Adaptive Prioritization",
    description: "Refresh priorities as strategy shifts — no need to start over.",
    icon: RefreshCw,
  },
];

const benefits = [
  {
    title: "Clarity for Everyone",
    description: "From stakeholders to developers, everyone knows what's being built and why.",
    icon: Users,
  },
  {
    title: "Data-Driven Insights",
    description: "Visualize impact vs. effort to identify low-hanging fruit and strategic bets.",
    icon: BarChart3,
  },
  {
    title: "Enterprise Security",
    description: "Bank-grade encryption and SSO support for teams of all sizes.",
    icon: Shield,
  },
];

export function Features() {
  return (
    <div className="bg-gray-50 py-24 sm:py-32" id="features">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Strategic Alignment Section */}
        <div className="mx-auto max-w-2xl lg:text-center mb-20">
          <h2 className="text-base font-semibold leading-7 text-yellow-600 uppercase tracking-wide">Features</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-rubik">
            Strategic Alignment Made Easy
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Discover how Priowise aligns your business & product strategies easier than ever. Built for success, made for clarity.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col items-start bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="rounded-lg bg-brand-yellow/20 p-3 ring-1 ring-brand-yellow/50 mb-6">
                  <feature.icon className="h-6 w-6 text-black" aria-hidden="true" />
                </div>
                <dt className="text-xl font-semibold leading-7 text-gray-900 font-rubik">
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Why Teams Love Priowise */}
        <div className="mt-32">
           <div className="mx-auto max-w-2xl lg:text-center mb-16">
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-rubik">
                Why Teams Love Priowise
              </p>
           </div>
           <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900 font-rubik">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-black">
                      <benefit.icon className="h-6 w-6 text-brand-yellow" aria-hidden="true" />
                    </div>
                    {benefit.title}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">
                    {benefit.description}
                  </dd>
                </div>
              ))}
           </div>
        </div>

      </div>
    </div>
  );
}
