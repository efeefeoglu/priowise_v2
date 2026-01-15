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
    answer: 'You can start using Priowise immediately after signing up. Our intuitive interface requires no training, and you can begin prioritizing your first projects within minutes.',
  },
  {
    question: 'Who should use Priowise?',
    answer: 'Priowise is designed for product teams, project managers, team leads, and executives who need to make strategic decisions about resource allocation and project priorities.',
  },
  {
    question: 'Can I use it free?',
    answer: 'Yes! We offer a free tier that allows you to explore Priowise and experience its core features. For advanced features and larger teams, we offer premium plans.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Absolutely. We use industry-standard encryption and security practices to ensure your data is protected. Your strategic information is stored securely and is never shared with third parties.',
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
