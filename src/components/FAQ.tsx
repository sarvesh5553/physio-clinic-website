"use client";

import { useState } from "react";
import { Bot, Sparkles } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] =
    useState<number | null>(null);


  const faqs = [
    {
      question:
        "Can I get an online physiotherapy session?",
      answer:
        "Yes. After you book the appointment with the doctor, as per your appointment schedule you will get an online consultation and treatment from the doctor.",
    },

    {
      question:
        "Do you provide home visit physiotherapy in Pune?",
      answer:
        "Yes. Home visit physiotherapy is available in Pune and nearby areas including Pirangut, Baner, Hinjawadi, Balewadi, Pashan, Wakad and nearby areas, subject to appointment availability.",
    },

    {
      question:
        "What physiotherapy services do you provide?",
      answer:
        "We provide services including electrotherapy, pain management, manual therapy, exercise therapy, neuro rehabilitation, sports rehabilitation, post surgical rehabilitation, posture correction, dry needling, dry and wet cupping, and kinesio taping.",
    },

    {
      question:
        "How can I book a physiotherapy appointment?",
      answer:
        "You can book a physiotherapy appointment through the website or contact us directly. Depending on your needs and availability, appointments may be provided through online consultation or home visit physiotherapy.",
    },

    {
      question:
        "How many physiotherapy sessions will I need?",
      answer:
        "The number of sessions depends on your condition, severity and recovery goals. After assessment, we create a personalized treatment plan.",
    },
  ];

  const openMainChatbot = () => {
    window.dispatchEvent(new CustomEvent("open-physiocare-chat"));
  };

  return (
    <section
      id="faq"
      className="relative overflow-visible bg-gradient-to-b from-slate-50 to-white py-12 md:py-10"
    >
      <div className="mx-auto max-w-4xl px-4 md:px-6">

        {/* =====================================================
            FAQ HEADING
        ===================================================== */}

        <div className="mb-12 text-center md:mb-16">

          <div className="mb-4 inline-flex items-center justify-center">
            <span className="rounded-full bg-teal-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-teal-700">
              Questions & Answers
            </span>
          </div>

          {/* =================================================
              HEADING + SMALL CHATBOT ICON
          ================================================= */}

          <div className="flex flex-wrap items-center justify-center gap-3">

            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">

              <span>
                Frequently Asked{" "}
              </span>

              <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Questions
              </span>

            </h2>

            {/* =================================================
                CHATBOT BUTTON
            ================================================= */}

            <div className="relative">

              <button
                type="button"
                onClick={openMainChatbot}
                aria-label="Open Dr. Bhagyashri's assistant"
                className="
                  relative
                  mt-2
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-2xl
                  bg-gradient-to-br
                  from-teal-500
                  to-cyan-600
                  text-white
                  shadow-lg
                  shadow-teal-500/20
                  md:mt-0
                "
              >

                <Bot
                  className="
                    relative
                    z-10
                    h-5
                    w-5
                  "
                />

                {/* Online indicator */}

                <span
                  className="
                    absolute
                    -right-1
                    -top-1
                    z-20
                    h-3
                    w-3
                    rounded-full
                    border-2
                    border-white
                    bg-emerald-400
                  "
                />

              </button>

            </div>

          </div>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
            Get answers to common questions about our
            physiotherapy services and treatment approach.
          </p>

          {/* Small assistant link */}

          <button
            type="button"
            onClick={openMainChatbot}
            className="
              mt-5
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-teal-100
              bg-white
              px-4
              py-2
              text-xs
              font-medium
              text-slate-600
              shadow-sm
              transition-all
              duration-300
              hover:border-teal-200
              hover:text-teal-700
              hover:shadow-md
            "
          >

            <span
              className="
                flex
                h-5
                w-5
                items-center
                justify-center
                rounded-full
                bg-teal-50
                text-teal-600
              "
            >
              <Bot className="h-3.5 w-3.5" />
            </span>

            Ask Dr. Bhagyashri's Assistant

            <Sparkles
              className="
                h-3.5
                w-3.5
                text-teal-500
              "
            />

          </button>

        </div>


        {/* =====================================================
            FAQ ACCORDION
        ===================================================== */}

        <div className="space-y-3 md:space-y-4">

          {faqs.map(
            (faq, index) => (

              <div
                key={index}
                className={`
                  overflow-hidden
                  rounded-xl
                  transition-all
                  duration-300
                  md:rounded-2xl

                  ${
                    openIndex === index
                      ? "border border-teal-200 bg-white shadow-[0_8px_24px_rgba(13,148,136,0.12)]"
                      : "border border-slate-100 bg-white shadow-[0_1px_3px_rgba(15,23,42,0.06)] hover:border-slate-200 hover:shadow-[0_4px_12px_rgba(13,148,136,0.08)]"
                  }
                `}
              >

                <button
                  type="button"
                  onClick={() =>
                    setOpenIndex(
                      openIndex === index
                        ? null
                        : index
                    )
                  }
                  aria-expanded={
                    openIndex === index
                  }
                  className="
                    flex
                    w-full
                    items-center
                    justify-between
                    px-4
                    py-3
                    text-left
                    transition-colors
                    duration-200
                    hover:bg-slate-50/50
                    md:px-6
                    md:py-4
                  "
                >

                  <span
                    className={`
                      pr-4
                      text-sm
                      font-semibold
                      transition-colors
                      duration-300
                      md:text-base

                      ${
                        openIndex === index
                          ? "text-teal-700"
                          : "text-slate-900"
                      }
                    `}
                  >
                    {faq.question}
                  </span>

                  <span
                    className="
                      flex
                      h-8
                      w-8
                      flex-shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-slate-50
                      text-teal-600
                    "
                  >

                    <svg
                      className={`
                        h-4
                        w-4
                        transition-transform
                        duration-300

                        ${
                          openIndex === index
                            ? "rotate-180"
                            : ""
                        }
                      `}
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

                  </span>

                </button>

                <div
                  className={`
                    grid
                    transition-all
                    duration-300
                    ease-in-out

                    ${
                      openIndex === index
                        ? "grid-rows-[1fr]"
                        : "grid-rows-[0fr]"
                    }
                  `}
                >

                  <div className="overflow-hidden">

                    <p
                      className="
                        border-t
                        border-slate-100
                        px-4
                        pb-4
                        pt-4
                        text-sm
                        leading-relaxed
                        text-slate-600
                        md:px-6
                        md:pb-5
                        md:text-base
                      "
                    >
                      {faq.answer}
                    </p>

                  </div>

                </div>

              </div>

            )
          )}

        </div>

      </div>
    </section>
  );
}
