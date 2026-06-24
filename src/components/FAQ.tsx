"use client";

import { useState } from "react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Can I get an online physiotheraphy session?",
      answer:
        "Yes. After you book the appointment with the doctor then as per your appointment schedule you will get an online consultation and treatment from the doctor. ",
    },
    {
      question: "How many physiotherapy sessions will I need?",
      answer:
        "The number of sessions depends on your condition, severity and recovery goals. After assessment, we create a personalized treatment plan.",
    },
    {
      question: "Do I need a doctor's referral?",
      answer:
        "No. You can book a physiotherapy consultation directly without a referral.",
    },
    {
      question: "What should I wear to my appointment?",
      answer:
        "Wear comfortable clothing that allows easy movement and access to the affected area.",
    },
    {
      question: "Do you treat sports injuries?",
      answer:
        "Yes. We provide specialized sports rehabilitation programs for athletes and active individuals.",
    },
    {
      question: "Can physiotherapy help avoid surgery?",
      answer:
        "In many cases physiotherapy can reduce pain and improve function enough to delay or avoid surgery.",
    },
    {
      question: "Do you offer post-surgery rehabilitation?",
      answer:
        "Yes. We provide structured rehabilitation programs to support recovery after surgery.",
    },
  ];

  return (
    <section
      id="faq"
      className="bg-gradient-to-b from-slate-50 to-white py-12 md:py-10"
    >
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        {/* Heading */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center justify-center mb-4">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-teal-700 bg-teal-50 px-4 py-2 rounded-full">
              Questions & Answers
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            <span>Frequently Asked </span>
            <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Questions</span>
          </h2>

          <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Get answers to common questions about our physiotherapy services and treatment approach.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3 md:space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`rounded-xl md:rounded-2xl overflow-hidden transition-all duration-300 ${
                openIndex === index
                  ? "bg-white border border-teal-200 shadow-[0_8px_24px_rgba(13,148,136,0.12)]"
                  : "bg-white border border-slate-100 shadow-[0_1px_3px_rgba(15,23,42,0.06)] hover:shadow-[0_4px_12px_rgba(13,148,136,0.08)] hover:border-slate-200"
              }`}
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full px-4 md:px-6 py-3 md:py-4 flex items-center justify-between text-left hover:bg-slate-50/50 transition-colors duration-200"
              >
                <span
                  className={`font-semibold transition-colors duration-300 text-sm md:text-base ${
                    openIndex === index
                      ? "text-teal-700"
                      : "text-slate-900"
                  }`}
                >
                  {faq.question}
                </span>

                <svg
                  className={`w-5 h-5 text-teal-600 transition-transform duration-300 flex-shrink-0 ml-4 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? "grid-rows-[1fr]"
                    : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-4 md:px-6 pb-4 md:pb-5 text-slate-600 text-sm md:text-base leading-relaxed border-t border-slate-100 pt-4">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}