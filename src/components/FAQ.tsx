"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "How quickly can I start?",
    answer: "You can get started in minutes. No setup required. Just plug in your objectives and go. Don’t Miss the Launch!",
  },
  {
    question: "Who should use Priowise?",
    answer: "Priowise is built for founders, strategic leaders, and product teams who want better clarity and faster decisions.",
  },
  {
    question: "Can I use it for free?",
    answer: "Yes! Start with our freemium version and explore all core features with no cost.",
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. We follow GDPR standards and best practices in data privacy and encryption.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => {
      return {
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      };
    }),
  };

  return (
    <div className="bg-white py-24 sm:py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-rubik">
            Frequently Asked Questions
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Everything you need to know about getting started with Priowise.
          </p>
        </div>
        <div className="mx-auto max-w-3xl divide-y divide-gray-900/10">
          {faqs.map((faq, index) => (
            <div key={index} className="pt-6">
              <dt>
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="flex w-full items-start justify-between text-left text-gray-900 focus:outline-none"
                >
                  <span className="text-base font-semibold leading-7">{faq.question}</span>
                  <span className="ml-6 flex h-7 items-center">
                    {openIndex === index ? (
                      <ChevronUp className="h-6 w-6" aria-hidden="true" />
                    ) : (
                      <ChevronDown className="h-6 w-6" aria-hidden="true" />
                    )}
                  </span>
                </button>
              </dt>
              {openIndex === index && (
                <dd className="mt-2 pr-12 pb-6">
                  <p className="text-base leading-7 text-gray-600">{faq.answer}</p>
                </dd>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
