"use client";

import { motion } from 'motion/react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
    {
        question: 'How quickly can I start?',
        answer: 'You can get started in minutes. No setup required. Just plug in your objectives and go.',
    },
    {
        question: 'Who should use Priowise?',
        answer: 'Priowise is built for founders, strategic leaders, and product teams who want better clarity and faster decisions.',
    },
    {
        question: 'Can I use it for free?',
        answer: 'Yes! We offer a free tier that allows you to explore Priowise and experience its core features. For advanced features and larger teams, we offer premium plans.',
    },
    {
        question: 'Is my data secure?',
        answer: 'Absolutely. We follow GDPR standards and use industry-standard encryption and security practices to ensure data privacy and encryption.',
    },
    {
        question: 'What makes Priowise different from strategy tools or AI assistants?',
        answer: 'Priowise isn&apos;t just another task planner or AI chatbot. It&apos;s a purpose-built platform that turns your business strategy into a dynamic product execution plan — with impact-based prioritization, roadmap scoring, and AI-powered guidance that keeps teams focused and aligned.',
    },
    {
        question: 'How does AI support the decision-making process?',
        answer: 'Our AI doesn’t replace your thinking — it accelerates it. From roadmap scoring to identifying alignment gaps, Priowise uses AI to surface strategic insights, automate repetitive analysis, and guide you toward what matters most.',
    },
    {
        question: 'Can I align my roadmap with business objectives?',
        answer: 'Yes — that&apos;s exactly what Priowise is built for. You define your objectives, and we help you generate, evaluate, and prioritize product initiatives that move the needle. We also offer reassessment tools to keep you on track as priorities evolve.',
    },
    {
        question: 'What happens when my strategy changes?',
        answer: 'Strategies shift — and your roadmap should too. Priowise helps you run regular re-assessments and adjust your prioritization based on real-world signals and internal changes. Stay aligned without starting from scratch.',
    },
    {
        question: 'Is Priowise suitable for early-stage startups?',
        answer: 'Absolutely. Whether you’re defining your MVP or scaling toward product-market fit, Priowise gives you a clear, structured way to prioritize, plan, and align your efforts — even with a small team and limited resources.',
    },
];

export function FAQ() {
  return (
    <section className="relative z-10 py-24">
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-5xl mb-4 text-[#2d2d2d]">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-[#6a6a6a]">
              Questions? We've Got You.
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/40 shadow-lg">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-b border-gray-200/50 last:border-b-0"
                >
                  <AccordionTrigger className="text-left text-lg text-[#2d2d2d] hover:text-[#f8b62d] transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#6a6a6a] leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
