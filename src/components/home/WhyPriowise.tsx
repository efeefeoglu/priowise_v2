"use client";

import { motion } from 'motion/react';
import { Clock, Puzzle, Zap, Brain, Rocket, Target } from 'lucide-react';

const benefits = [
  {
    icon: Clock,
    title: 'Fast Prioritization',
    description: 'Turn complex trade-offs into clear decisions—always, instantly, without the guesswork.',
  },
  {
    icon: Puzzle,
    title: 'Leadership-Product Alignment',
    description: 'Bridge leadership vision, product strategy and execution. Ensure transparency and product teams are always aligned.',
  },
  {
    icon: Zap,
    title: 'Strategy Clarity',
    description: 'Turn complex objectives into clear, prioritized plans—effortlessly prioritize what matters.',
  },
  {
    icon: Brain,
    title: 'AI-Driven Accuracy',
    description: 'Leverage AI to objectively assess, compare and score across impactful variables and factors.',
  },
  {
    icon: Rocket,
    title: 'Easy to Start',
    description: 'Priowise seamlessly occurs into your existing workflow—quick to adopt, built to add value from Day 1.',
  },
  {
    icon: Target,
    title: 'Real Impact → Strategic Decisions',
    description: 'Start from scratch for exclusive real-time insights and existing roadmaps strategize and team allocation transparency at its core.',
  },
];

export function WhyPriowise() {
  return (
    <section className="relative z-10 py-24">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl mb-4 text-[#2d2d2d]">
            Why Teams Love Priowise
          </h2>
          <p className="text-xl text-[#6a6a6a] max-w-3xl mx-auto">
            From leadership to product teams, Priowise is built for clarity, simplicity, and execution—fast. Powered by AI. Built for clarity.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 h-full border border-white/40 shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#f8b62d]/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-[#f8b62d]" strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="text-lg mb-2 text-[#2d2d2d]">
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-[#6a6a6a] leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
