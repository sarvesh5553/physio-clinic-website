"use client";

import {
  CheckCircle2,
  Award,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

export default function AboutDoctor() {
  const certifications = [
    "Certified Diversified Needling Therapist",
    "Certified Diversified Cupping Therapist",
    "Certified IAFM Therapist",
    "Therapeutic Taping Practitioner",
  ];

  return (
    <section
      id="about"
      className="relative bg-gradient-to-b from-slate-50/60 via-white to-slate-50/30 py-16 md:py-24 scroll-mt-20 overflow-hidden"
    >
      {/* Subtle Ambient Background Mesh */}

      <div className="absolute top-1/4 -left-32 w-80 h-80 bg-teal-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="absolute bottom-10 right-0 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* =====================================================
            TOP SECTION HEADING
        ===================================================== */}

        <div className="text-center mb-10 md:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-bold uppercase tracking-wider shadow-sm">

            <Sparkles className="w-3.5 h-3.5 text-teal-600" />

            <span>
              About The Physiotherapist
            </span>

          </div>
        </div>


        {/* =====================================================
            MAIN CONTENT
        ===================================================== */}

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">


          {/* =================================================
              LEFT: DOCTOR IMAGE
              HIDDEN ON MOBILE
          ================================================= */}

          <div className="hidden lg:flex lg:col-span-5 relative justify-center">

            <div className="relative w-full max-w-[380px]">

              {/* Image Backdrop Glow */}

              <div className="absolute -inset-2 bg-gradient-to-tr from-teal-500/20 to-cyan-400/20 rounded-[32px] blur-xl opacity-70" />


              {/* Main Photo Card */}

              <div className="relative rounded-[28px] overflow-hidden border border-slate-200/80 shadow-2xl bg-white group">

                <img
                  src="/bhagyashri1.png"
                  alt="Dr. Bhagyashri Salunke (PT)"
                  className="
                    w-full
                    h-[360px]
                    sm:h-[390px]
                    object-cover
                    object-top
                    transition-transform
                    duration-700
                    ease-out
                    group-hover:scale-105
                  "
                />

                {/* Vignette Gradient Overlay */}

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent opacity-60 pointer-events-none" />

              </div>


              {/* =================================================
                  Floating Experience Badge
              ================================================= */}

              <div className="absolute -bottom-6 -left-2 sm:-left-6 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-100 p-3.5 sm:p-4 flex items-center gap-3.5 z-20 hover:scale-105 transition-transform duration-300">

                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 text-white flex items-center justify-center font-black text-lg shadow-md shadow-teal-500/20">
                  2+
                </div>

                <div>

                  <p className="font-bold text-slate-800 text-sm leading-tight flex items-center gap-1">

                    Years Experience

                    <Award className="w-4 h-4 text-amber-500" />

                  </p>

                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Trusted Physiotherapy Care
                  </p>

                </div>

              </div>

            </div>

          </div>


          {/* =================================================
              RIGHT: DOCTOR BIO & CERTIFICATIONS
          ================================================= */}

          <div className="lg:col-span-7 pt-0 lg:pt-4">


            {/* =================================================
                MOBILE ONLY:
                SLIGHTLY LARGER DOCTOR PHOTO + NAME
            ================================================= */}

            <div className="lg:hidden flex items-center gap-4 mb-6">

              {/* Small Doctor Photo */}

              <div
                className="
                  relative
                  w-[94px]
                  h-[94px]
                  flex-none
                  rounded-2xl
                  overflow-hidden
                  border
                  border-white
                  shadow-lg
                  bg-slate-100
                "
              >

                <img
                  src="/bhagyashri1.png"
                  alt="Dr. Bhagyashri Salunke (PT)"
                  className="w-full h-full object-cover object-top"
                />

              </div>


              {/* Mobile Name & Title */}

              <div className="min-w-0 flex-1">

                <h2
                  className="
                    text-[22px]
                    sm:text-2xl
                    font-black
                    text-slate-900
                    tracking-tight
                    leading-[1.15]
                  "
                >
                  Dr. Bhagyashri{" "}

                  <span className="text-teal-600">
                    Salunke (PT)
                  </span>

                </h2>

                <p
                  className="
                    text-sm
                    sm:text-base
                    text-teal-700
                    font-semibold
                    mt-1.5
                    leading-snug
                  "
                >
                  Physiotherapist &
                  Rehabilitation Specialist
                </p>

              </div>

            </div>


            {/* =================================================
                DESKTOP ONLY:
                DOCTOR NAME
            ================================================= */}

            <h2
              className="
                hidden
                lg:block
                text-2xl
                sm:text-3xl
                lg:text-4xl
                font-black
                text-slate-900
                tracking-tight
                leading-tight
                whitespace-nowrap
              "
            >
              Dr. Bhagyashri{" "}

              <span className="text-teal-600">
                Salunke (PT)
              </span>

            </h2>


            {/* Desktop Professional Title */}

            <p
              className="
                hidden
                lg:block
                text-base
                sm:text-lg
                text-teal-700
                font-semibold
                mt-1
              "
            >
              Physiotherapist & Rehabilitation Specialist
            </p>


            {/* =================================================
                BIO PARAGRAPH
                ALIGNED PROPERLY ON MOBILE + DESKTOP
            ================================================= */}

            <p
              className="
                text-slate-600
                text-sm
                sm:text-base
                leading-relaxed
                mt-4
                font-normal
                w-full
                max-w-2xl
                text-left
              "
            >
              Dedicated to helping patients recover from pain, injuries, and
              movement limitations through personalized, evidence-based
              physiotherapy care. Every treatment plan is tailored to restore
              mobility, build strength, and foster long-term physical health.
            </p>


            {/* =================================================
                CERTIFICATIONS
            ================================================= */}

            <div className="mt-8">

              {/* Certification Heading */}

              <h3
                className="
                  text-xs
                  font-bold
                  text-slate-400
                  uppercase
                  tracking-widest
                  mb-6
                  flex
                  items-center
                  gap-1.5
                "
              >

                <ShieldCheck className="w-4 h-4 text-teal-600" />

                <span>
                  Professional Certifications
                </span>

              </h3>


              {/* Certification Cards */}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">

                {certifications.map((cert) => (

                  <div
                    key={cert}
                    className="
                      flex
                      items-center
                      gap-2.5
                      bg-white
                      border
                      border-slate-200/80
                      rounded-xl
                      px-3.5
                      py-2.5
                      shadow-sm
                      hover:border-teal-500
                      hover:shadow-md
                      hover:-translate-y-0.5
                      transition-all
                      duration-300
                      group
                    "
                  >

                    <CheckCircle2
                      className="
                        w-4
                        h-4
                        text-teal-500
                        flex-none
                        group-hover:text-teal-600
                        transition-colors
                      "
                    />

                    <span
                      className="
                        text-xs
                        sm:text-sm
                        text-slate-700
                        font-semibold
                        leading-snug
                      "
                    >
                      {cert}
                    </span>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}