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

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
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
        ===================================================== */}

        <div className="md:hidden">

          {/* Progress Navigation */}

          <div className="relative mb-8">

            {/* Background Line */}

            <div className="absolute left-5 right-5 top-5 h-[2px] bg-slate-200" />

            {/* Active Line */}

            <div
              className="absolute left-5 top-5 h-[2px] bg-gradient-to-r from-teal-500 to-cyan-500 transition-all duration-500"
              style={{
                width:
                  activeStep === 0
                    ? "0%"
                    : `${(activeStep / 4) * 87}%`,
              }}
            />

            {/* Number Buttons */}

            <div className="relative flex justify-between">

              {steps.map((step, index) => {

                const active = index === activeStep;
                const completed = index < activeStep;

                return (
                  <button
                    key={step.number}
                    type="button"
                    onClick={() => setActiveStep(index)}
                    aria-label={`Go to ${step.title}`}
                    className="relative z-10"
                  >
                    <span
                      className={`
                        flex
                        items-center
                        justify-center

                        w-10
                        h-10

                        rounded-full

                        border-4
                        border-white

                        text-xs
                        font-bold

                        shadow-sm

                        transition-all
                        duration-300

                        ${
                          active
                            ? "bg-gradient-to-br from-teal-600 to-cyan-600 text-white scale-110 shadow-lg"
                            : completed
                            ? "bg-teal-500 text-white"
                            : "bg-white text-slate-400 border-slate-200"
                        }
                      `}
                    >
                      {completed ? (
                        <Check className="w-4 h-4" strokeWidth={3} />
                      ) : (
                        step.number
                      )}
                    </span>
                  </button>
                );
              })}

            </div>
          </div>


          {/* =====================================================
              MOBILE ACTIVE CARD
          ===================================================== */}

          <div
            className="
              relative
              bg-white
              rounded-3xl
              border
              border-slate-100
              shadow-[0_12px_40px_rgba(15,23,42,0.08)]
              overflow-hidden
            "
          >

            {/* Top Gradient */}

            <div className="h-1.5 bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-400" />

            <div className="p-6">

              {/* Step Information */}

              <div className="flex items-center justify-between mb-6">

                <span
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.15em]
                    text-teal-700
                    bg-teal-50
                    px-3
                    py-1.5
                    rounded-full
                  "
                >
                  Step {currentStep.number}
                </span>

                <span className="text-xs font-medium text-slate-400">
                  {activeStep + 1} / 5
                </span>

              </div>


              {/* Number + Title */}

              <div className="flex items-center gap-4">

                <div
                  className="
                    flex-none
                    w-14
                    h-14
                    rounded-2xl
                    bg-gradient-to-br
                    from-teal-600
                    to-cyan-600
                    text-white
                    flex
                    items-center
                    justify-center
                    text-xl
                    font-black
                    shadow-[0_8px_20px_rgba(13,148,136,0.22)]
                  "
                >
                  {currentStep.number}
                </div>

                <h3 className="text-xl font-bold text-slate-900 leading-tight">
                  {currentStep.title}
                </h3>

              </div>


              {/* Description */}

              <p className="text-sm text-slate-600 leading-7 mt-5">
                {currentStep.description}
              </p>


              {/* Bottom Navigation */}

              <div className="mt-7 pt-5 border-t border-slate-100 flex items-center justify-between">

                {/* Previous */}

                <button
                  type="button"
                  disabled={activeStep === 0}
                  onClick={() =>
                    setActiveStep((value) =>
                      value > 0 ? value - 1 : 0
                    )
                  }
                  className="
                    text-xs
                    font-bold
                    text-slate-400
                    disabled:opacity-30
                    hover:text-teal-600
                    transition-colors
                  "
                >
                  ← Previous
                </button>


                {/* Next / Final */}

                {activeStep === 4 ? (
                  <span
                    className="
                      inline-flex
                      items-center
                      justify-center
                      text-xs
                      font-bold
                      text-teal-700
                      bg-teal-50
                      border
                      border-teal-100
                      px-4
                      py-2.5
                      rounded-xl
                    "
                  >
                    Final Step
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      setActiveStep((value) =>
                        value < 4 ? value + 1 : 4
                      )
                    }
                    className="
                      inline-flex
                      items-center
                      gap-2
                      text-xs
                      font-bold
                      text-white
                      bg-gradient-to-r
                      from-teal-600
                      to-cyan-600
                      px-4
                      py-2.5
                      rounded-xl
                      shadow-md
                      shadow-teal-500/20
                      hover:-translate-y-0.5
                      transition-all
                    "
                  >
                    Next Step
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}

              </div>

            </div>
          </div>


          {/* Mobile Hint */}

          <p className="text-center text-[10px] text-slate-400 font-medium mt-4">
            Tap a number above to explore your recovery journey
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