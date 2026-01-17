"use client";

import { motion } from 'motion/react';
import { Target, Users, TrendingUp, LayoutGrid } from 'lucide-react';

const features = [
  {
    icon: Target,
    title: 'Align Founder Vision & Team Execution',
    description: 'Keep strategic intent connected to daily execution — without misalignment.',
    color: '#f8b62d',
  },
  {
    icon: Users,
    title: 'Prioritize What Matters Most',
    description: 'Cut through noise and focus on initiatives with real business impact.',
    color: '#d4a5a5',
  },
  {
    icon: TrendingUp,
    title: 'Insight-Backed Decisions, Not Gut Calls',
    description: 'Make every decision data-informed and tied to your strategic goals.',
    color: '#a7c7e7',
  },
  {
    icon: LayoutGrid,
    title: 'Always-Adaptive Prioritization',
    description: 'Refresh priorities as strategy shifts — no need to start over.',
    color: '#e8d5b5',
  },
];

export function Features() {
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
            Strategic Alignment Made Easy
          </h2>
          <p className="text-xl text-[#6a6a6a] max-w-3xl mx-auto">
            Discover how Priowise aligns your business & product strategies
            easier than ever. Built for success, made for clarity.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  {/* Accent blob */}
                  <div
                    className="absolute -top-4 -right-4 w-24 h-24 rounded-full opacity-20 blur-2xl"
                    style={{ background: feature.color }}
                  />

                  <div className="relative">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-md"
                      style={{ backgroundColor: `${feature.color}40` }}
                    >
                      <Icon className="w-8 h-8" style={{ color: feature.color }} strokeWidth={2} />
                    </div>

                    <h3 className="text-2xl mb-3 text-[#2d2d2d]">
                      {feature.title}
                    </h3>
                    <p className="text-[#6a6a6a] leading-relaxed">
                      {feature.description}
                    </p>
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
