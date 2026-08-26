"use client";

import {
  Check,
  CalendarCheck,
  PhoneCall,
  Award,
  Star,
  Activity,
  Home,
  Monitor,
} from "lucide-react";

export default function Hero() {
  const checklist = [
    "Pain Relief",
    "Faster Recovery",
    "Personalized Treatment",
  ];

  return (
    <section
      id="home"
      className="
        relative
        overflow-hidden
        bg-gradient-to-br
        from-teal-600
        via-teal-650
        to-cyan-600
        pt-28
        pb-24
        sm:pt-32
        sm:pb-28
      "
    >
      {/* =====================================================
          BACKGROUND GLOWS
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -right-24
          -top-24
          h-96
          w-96
          rounded-full
          bg-cyan-400/20
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-24
          -left-24
          h-96
          w-96
          rounded-full
          bg-teal-300/15
          blur-3xl
        "
      />

      {/* =====================================================
          MAIN HERO
      ===================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          grid
          max-w-7xl
          items-center
          gap-12
          px-4
          sm:px-6
          md:grid-cols-2
          md:gap-16
          md:px-8
        "
      >
        {/* =====================================================
            LEFT COLUMN
        ===================================================== */}

        <div className="text-left">
          {/* =================================================
              TRUST BADGE
          ================================================ */}

          <div
            className="
              mb-6
              flex
              flex-wrap
              items-center
              gap-3
            "
          >
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-white/25
                bg-white/15
                px-4
                py-1.5
                text-xs
                font-semibold
                text-white
                shadow-sm
                backdrop-blur-md
                sm:text-sm
              "
            >
              <span
                className="
                  h-2
                  w-2
                  animate-pulse
                  rounded-full
                  bg-lime-400
                "
              />

              <span>
                Trusted by 200+ Patients
              </span>
            </div>
          </div>

          {/* =================================================
              NEW HERO HEADING
          ================================================ */}

          <div className="mb-6">
            {/* SEO EYEBROW */}

            <div
              className="
                mb-3
                flex
                items-center
                gap-3
              "
            >
              <span
                className="
                  h-[2px]
                  w-8
                  rounded-full
                  bg-teal-100
                "
              />

              <span
                className="
                  text-sm
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-teal-50
                  sm:text-base
                "
              >
                Physiotherapy in Pune
              </span>
            </div>

            {/* MAIN VISUAL HEADLINE */}

            <h1
              className="
                text-5xl
                font-black
                leading-[0.98]
                tracking-tight
                text-white
                sm:text-6xl
                md:text-7xl
              "
            >
              Move Better.
              <br />

              <span className="text-teal-100">
                Live Better.
              </span>
            </h1>
          </div>

          {/* =================================================
              DESCRIPTION
          ================================================ */}

          <p
            className="
              mb-6
              max-w-xl
              text-base
              font-normal
              leading-relaxed
              text-white/90
              sm:text-lg
            "
          >
            Personalized physiotherapy and rehabilitation
            care that meets you where you are — relieve pain,
            rebuild strength, and move through life with
            confidence again.
          </p>

          {/* =================================================
              DOCTOR BADGE
          ================================================ */}

          <div
            className="
              mb-8
              inline-flex
              max-w-fit
              items-center
              gap-2.5
              rounded-2xl
              border
              border-white/20
              bg-white/10
              p-2
              shadow-inner
              backdrop-blur-md
              transition-all
              hover:bg-white/15
              sm:p-2.5
            "
          >
            <div
              className="
                flex
                h-9
                w-9
                flex-none
                items-center
                justify-center
                rounded-xl
                border
                border-white/25
                bg-white/15
                text-xs
                font-extrabold
                text-white
                shadow-sm
              "
            >
              BS
            </div>

            <div className="pr-1">
              <p
                className="
                  text-sm
                  font-bold
                  leading-none
                  text-white
                  sm:text-base
                "
              >
                Dr. Bhagyashri Salunke (PT)
              </p>

              <p
                className="
                  mt-1
                  text-[11px]
                  font-medium
                  leading-tight
                  text-white/80
                  sm:text-xs
                "
              >
                Bachelor of Physiotherapy
              </p>

              <p
                className="
                  text-[10px]
                  font-semibold
                  leading-tight
                  tracking-tight
                  text-white/70
                "
              >
                CDCT, CDNT, CIAFMT, CKTP
              </p>
            </div>
          </div>

          {/* =================================================
              CTA BUTTONS
          ================================================ */}

          <div
            className="
              flex
              flex-wrap
              items-center
              gap-4
            "
          >
            {/* BOOK APPOINTMENT */}

            <a
              href="#contact"
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-white
                px-6
                py-3.5
                text-sm
                font-bold
                text-teal-700
                shadow-lg
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-teal-50
                hover:shadow-xl
                active:translate-y-0
                sm:text-base
              "
            >
              <CalendarCheck
                className="
                  h-5
                  w-5
                  text-teal-600
                "
              />

              Book Appointment
            </a>

            {/* CALL NOW */}

            <a
              href="tel:+919322518895"
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                border-2
                border-white/70
                bg-transparent
                px-6
                py-3.5
                text-sm
                font-bold
                text-white
                backdrop-blur-sm
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:border-white
                hover:bg-white/10
                sm:text-base
              "
            >
              <PhoneCall className="h-5 w-5" />

              Call Now
            </a>
          </div>
        </div>

        {/* =====================================================
            RIGHT COLUMN
        ===================================================== */}

        <div
          className="
            relative
            mb-6
            flex
            justify-center
            sm:mb-12
            md:mb-0
          "
        >
          <div
            className="
              w-full
              max-w-md
              sm:max-w-lg
              md:max-w-xl
            "
          >
            {/* =================================================
                SERVICES BOXES (COMPACT, MOVED HIGHER UP)
            ================================================= */}

            <div
              className="
                -mt-6
                mb-10
                flex
                flex-row
                items-center
                justify-center
                gap-3
                sm:-mt-8
                sm:gap-5
                whitespace-nowrap
              "
            >
              {/* HOME VISIT PHYSIOTHERAPY */}

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-white/30
                  bg-white/15
                  px-4
                  py-2
                  text-xs
                  font-semibold
                  text-white
                  shadow-md
                  backdrop-blur-md
                  transition-all
                  duration-300
                  hover:bg-white/25
                  sm:text-sm
                  whitespace-nowrap
                "
              >
                <Home
                  className="
                    h-4
                    w-4
                    text-teal-200
                    flex-shrink-0
                  "
                />

                <span>
                  Home Visit Physiotherapy
                </span>
              </div>

              {/* ONLINE PHYSIOTHERAPY */}

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-white/30
                  bg-white/15
                  px-4
                  py-2
                  text-xs
                  font-semibold
                  text-white
                  shadow-md
                  backdrop-blur-md
                  transition-all
                  duration-300
                  hover:bg-white/25
                  sm:text-sm
                  whitespace-nowrap
                "
              >
                <Monitor
                  className="
                    h-4
                    w-4
                    text-cyan-200
                    flex-shrink-0
                  "
                />

                <span>
                  Online Physiotherapy
                </span>
              </div>
            </div>

            {/* =================================================
                PHOTO AREA
            ================================================= */}

            <div
              className="
                relative
                w-full
              "
            >
              {/* EVIDENCE-BASED CARE */}

              <div
                className="
                  absolute
                  left-4
                  top-0
                  z-30
                  -translate-y-1/2
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-white/20
                  bg-slate-900/85
                  px-3
                  py-1.5
                  text-[11px]
                  font-medium
                  text-white
                  shadow-lg
                  backdrop-blur-md
                  sm:left-5
                  sm:text-xs
                "
              >
                <Activity
                  className="
                    h-3.5
                    w-3.5
                    animate-pulse
                    text-lime-400
                  "
                />

                <span className="whitespace-nowrap">
                  Evidence-Based Care
                </span>
              </div>

              {/* 200+ RECOVERIES */}

              <div
                className="
                  absolute
                  right-4
                  top-0
                  z-30
                  -translate-y-1/2
                  flex
                  items-center
                  gap-1.5
                  rounded-full
                  border
                  border-white/70
                  bg-white/90
                  px-3.5
                  py-1.5
                  text-xs
                  font-bold
                  text-teal-900
                  shadow-lg
                  backdrop-blur-md
                  sm:right-5
                  sm:text-sm
                "
              >
                <Award
                  className="
                    h-4
                    w-4
                    text-teal-600
                  "
                />

                <span className="whitespace-nowrap">
                  200+ Recoveries
                </span>
              </div>

              {/* PHOTO BOX */}

              <div
                className="
                  group
                  relative
                  w-full
                  overflow-hidden
                  rounded-3xl
                  border
                  border-white/30
                  bg-white
                  shadow-2xl
                  shadow-teal-950/30
                  aspect-[3/2]
                "
              >
                <img
                  src="/pppp1.png"
                  alt="Dr. Bhagyashri Salunke providing physiotherapy treatment"
                  className="
                    absolute
                    inset-0
                    h-full
                    w-full
                    object-contain
                    bg-white
                    transition-transform
                    duration-700
                    ease-out
                    group-hover:scale-[1.015]
                  "
                />

                {/* INNER BORDER */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    rounded-3xl
                    ring-1
                    ring-inset
                    ring-white/70
                  "
                />

                {/* RATING */}

                <div
                  className="
                    absolute
                    bottom-4
                    left-3
                    z-10
                    flex
                    items-center
                    gap-1.5
                    rounded-xl
                    border
                    border-white/80
                    bg-white/95
                    px-2.5
                    py-1.5
                    shadow-lg
                    backdrop-blur-md
                    sm:bottom-5
                    sm:left-4
                  "
                >
                  <div
                    className="
                      flex
                      gap-0.5
                      text-amber-400
                    "
                  >
                    {[...Array(5)].map(
                      (_, i) => (
                        <Star
                          key={i}
                          className="
                            h-2.5
                            w-2.5
                            fill-current
                            sm:h-3
                            sm:w-3
                          "
                        />
                      )
                    )}
                  </div>

                  <div
                    className="
                      flex
                      items-center
                      gap-1
                      whitespace-nowrap
                    "
                  >
                    <span
                      className="
                        text-[10px]
                        font-extrabold
                        text-slate-900
                        sm:text-[11px]
                      "
                    >
                      5.0
                    </span>

                    <span
                      className="
                        text-[8px]
                        font-semibold
                        text-slate-500
                        sm:text-[10px]
                      "
                    >
                      Patient Care
                    </span>
                  </div>
                </div>
              </div>

              {/* =================================================
                  CHECKLIST
              ================================================ */}

              <div
                className="
                  absolute
                  -bottom-8
                  left-2
                  right-2
                  z-30
                  rounded-2xl
                  border
                  border-white/80
                  bg-white/95
                  px-2
                  py-3
                  shadow-xl
                  backdrop-blur-md
                  sm:left-6
                  sm:right-6
                "
              >
                <div
                  className="
                    flex
                    w-full
                    flex-row
                    items-center
                    justify-between
                    gap-1
                  "
                >
                  {checklist.map(
                    (item) => (
                      <div
                        key={item}
                        className="
                          flex
                          min-w-0
                          flex-1
                          items-center
                          justify-center
                          gap-1
                        "
                      >
                        <span
                          className="
                            flex
                            h-5
                            w-5
                            flex-none
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-teal-100
                            bg-teal-50
                            text-teal-600
                          "
                        >
                          <Check
                            className="h-3 w-3"
                            strokeWidth={3}
                          />
                        </span>

                        <span
                          className="
                            whitespace-nowrap
                            text-[8px]
                            font-semibold
                            text-slate-800
                            sm:text-xs
                          "
                        >
                          {item}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}