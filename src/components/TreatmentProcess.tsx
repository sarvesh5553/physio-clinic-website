"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export default function TreatmentProcess() {
  const steps = [
    {
      number: "1",
      title: "Assessment",
      description:
        "Detailed evaluation of your condition, symptoms and medical history.",
    },
    {
      number: "2",
      title: "Diagnosis",
      description:
        "Identify the root cause of pain and movement limitations.",
    },
    {
      number: "3",
      title: "Treatment Plan",
      description:
        "A personalized physiotherapy program designed for your recovery.",
    },
    {
      number: "4",
      title: "Therapy Sessions",
      description:
        "Hands-on treatment, exercises and rehabilitation techniques.",
    },
    {
      number: "5",
      title: "Recovery & Prevention",
      description:
        "Long-term strategies to prevent recurrence and improve mobility.",
    },
  ];

  const [activeStep, setActiveStep] = useState(0);

  const currentStep = steps[activeStep];

  return (
    <section className="bg-gradient-to-b from-white to-slate-50 py-12 md:py-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* =========================
            HEADING
        ========================= */}

        <div className="text-center mb-10 md:mb-16">

          <div className="inline-flex items-center justify-center mb-4">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-teal-700 bg-teal-50 px-4 py-2 rounded-full">
              The Process
            </span>
          </div>

          <h2 className="text-[27px] sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight whitespace-nowrap">
            Your Journey To{" "}
            <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Recovery
            </span>
          </h2>

          <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            A structured physiotherapy approach for effective, lasting recovery.
          </p>

        </div>


        {/* =====================================================
            MOBILE VIEW
            All 5 treatment steps visible together
            ===================================================== */}

        <div className="md:hidden">
          <div className="space-y-3">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="
                  bg-white
                  rounded-2xl
                  border border-slate-100
                  shadow-[0_5px_20px_rgba(15,23,42,0.06)]
                  overflow-hidden
                "
              >
                <div className="flex items-center gap-3 px-4 py-3.5">
                  {/* Small STEP label + number */}
                  <div className="flex-none w-11 flex flex-col items-center justify-center">
                    <span className="text-[7px] font-bold uppercase tracking-[0.16em] text-teal-600 mb-1">
                      Step
                    </span>

                    <div
                      className="
                        w-10
                        h-10
                        rounded-xl
                        bg-gradient-to-br
                        from-teal-600
                        to-cyan-600
                        text-white
                        flex
                        items-center
                        justify-center
                        text-base
                        font-black
                        shadow-[0_5px_14px_rgba(13,148,136,0.18)]
                      "
                    >
                      {step.number}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-[15px] font-bold text-slate-900 leading-tight">
                        {step.title}
                      </h3>
                    </div>

                    <p className="text-[11.5px] text-slate-600 leading-[1.45] mt-1.5">
                      {step.description}
                    </p>
                  </div>

                  {/* Progress indicator */}
                  <div className="flex-none text-[9px] font-semibold text-slate-300">
                    {index + 1}/5
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-[10px] text-slate-400 font-medium mt-4">
            A simple 5-step approach from assessment to recovery
          </p>
        </div>


        {/* =====================================================
            DESKTOP VIEW
            5 NUMBERED CARDS
        ===================================================== */}

        <div className="hidden md:grid grid-cols-5 gap-4 md:gap-5">

          {steps.map((step) => (
            <div
              key={step.number}
              className="
                group
                bg-white
                rounded-xl
                md:rounded-2xl
                p-4
                md:p-5
                shadow-[0_2px_8px_rgba(15,23,42,0.06)]
                border
                border-slate-100
                hover:shadow-[0_12px_32px_rgba(13,148,136,0.12)]
                hover:border-teal-200
                hover:-translate-y-1
                transition-all
                duration-300
              "
            >

              {/* Desktop Number */}

              <div
                className="
                  w-12
                  h-12
                  rounded-full
                  bg-gradient-to-br
                  from-teal-600
                  to-cyan-600
                  text-white
                  flex
                  items-center
                  justify-center
                  font-bold
                  text-lg
                  mb-6
                  shadow-[0_6px_16px_rgba(13,148,136,0.18)]
                  group-hover:shadow-[0_8px_20px_rgba(13,148,136,0.3)]
                  transition-all
                  duration-300
                "
              >
                {step.number}
              </div>


              {/* Desktop Title */}

              <h3 className="text-base md:text-lg font-bold text-slate-900 mb-2 leading-relaxed">
                {step.title}
              </h3>


              {/* Desktop Description */}

              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                {step.description}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}