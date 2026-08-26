"use client";

import { useRef } from "react";
import {
  Activity,
  Dumbbell,
  Building2,
  Syringe,
  CheckCircle2,
  Layers,
  Brain,
  HeartPulse,
  Zap,
  BriefcaseMedical,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function ConditionsServices() {
  const conditionsScrollRef = useRef<HTMLDivElement>(null);
  const servicesScrollRef = useRef<HTMLDivElement>(null);

  const conditions = [
    { title: "Back Pain", image: "/Conditions/backpain.png" },
    { title: "Neck Pain", image: "/Conditions/neck-pain.png" },
    { title: "Sciatica", image: "/Conditions/sciatica.png" },
    {
      title: "Frozen Shoulder",
      image: "/Conditions/frozen-shoulder.png",
    },
    { title: "Arthritis", image: "/Conditions/arthritis.png" },
    { title: "Knee Pain", image: "/Conditions/knee-pain.png" },
    {
      title: "Shoulder Pain",
      image: "/Conditions/shoulder-pain.png",
    },
    {
      title: "Tennis Elbow",
      image: "/Conditions/tenniselbow.png",
    },
    { title: "Slip Disc", image: "/Conditions/slip-disc.png" },
    {
      title: "Sports Injury",
      image: "/Conditions/sports-injury.png",
    },
    { title: "Hip Pain", image: "/Conditions/hip-pain.png" },
    {
      title: "Ankle Sprain",
      image: "/Conditions/ankle-sprain.png",
    },
    {
      title: "Muscle Strain",
      image: "/Conditions/muscle-strain.png",
    },
    {
      title: "Joint Stiffness",
      image: "/Conditions/joint-stiffness.png",
    },
    {
      title: "Postural Problems",
      image: "/Conditions/postural-problems.png",
    },
    {
      title: "Ligament Injury",
      image: "/Conditions/ligament-injury.png",
    },
    {
      title: "Plantar Fasciitis",
      image: "/Conditions/plantar-fasciitis.png",
    },
    {
      title: "Chronic Pain",
      image: "/Conditions/chronic-pain.png",
    },
  ];

  const services = [
    {
      icon: <Zap className="w-4 h-4" />,
      title: "Electrotherapy",
      description:
        "Physiotherapy electrotherapy modalities used where appropriate to support pain management, recovery, and tissue healing.",
    },
    {
      icon: <HeartPulse className="w-4 h-4" />,
      title: "Pain Management",
      description:
        "Evidence-based physiotherapy approaches for managing acute and chronic pain while improving movement and daily function.",
    },
    {
      icon: <Activity className="w-4 h-4" />,
      title: "Manual Therapy",
      description:
        "Hands-on physiotherapy techniques to reduce pain, improve mobility, and restore functional movement.",
    },
    {
      icon: <CheckCircle2 className="w-4 h-4" />,
      title: "Exercise Therapy",
      description:
        "Customized physiotherapy exercise programs designed to improve strength, flexibility, balance, mobility, and movement.",
    },
    {
      icon: <Brain className="w-4 h-4" />,
      title: "Neuro Rehabilitation",
      description:
        "Specialized physiotherapy rehabilitation support for neurological conditions, movement difficulties, and functional recovery.",
    },
    {
      icon: <Dumbbell className="w-4 h-4" />,
      title: "Sports Rehabilitation",
      description:
        "Sports physiotherapy and rehabilitation to help athletes recover safely from injuries and return to activity.",
    },
    {
      icon: <Building2 className="w-4 h-4" />,
      title: "Post Surgical Rehab",
      description:
        "Structured physiotherapy rehabilitation programs following appropriate orthopedic and joint surgeries.",
    },
    {
      icon: <CheckCircle2 className="w-4 h-4" />,
      title: "Posture Correction",
      description:
        "Physiotherapy assessment and exercise-based strategies to improve posture, movement patterns, and related discomfort.",
    },
    {
      icon: <Syringe className="w-4 h-4" />,
      title: "Dry Needling",
      description:
        "Physiotherapy dry needling targeting appropriate trigger points and muscle tightness as part of a personalized treatment plan.",
    },
    {
      icon: <Layers className="w-4 h-4" />,
      title: "Dry & Wet Cupping",
      description:
        "Cupping therapy techniques used where appropriate to help address muscular tension and support a broader physiotherapy plan.",
    },
    {
      icon: <BriefcaseMedical className="w-4 h-4" />,
      title: "Kinesio Taping",
      description:
        "Kinesio taping techniques used to support selected muscles and joints while complementing active physiotherapy rehabilitation.",
    },
  ];

  const scrollVertical = (
    ref: React.RefObject<HTMLDivElement | null>,
    direction: "up" | "down"
  ) => {
    if (ref.current) {
      const scrollAmount = direction === "up" ? -220 : 220;

      ref.current.scrollBy({
        top: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      className="
        py-12
        md:py-16
        bg-gradient-to-b
        from-white
        via-slate-50/60
        to-white
        overflow-hidden
      "
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* =====================================================
            SECTION HEADER
        ===================================================== */}

        <div className="text-center mb-8 md:mb-12">

          <div className="inline-flex items-center justify-center mb-3">
            <span
              className="
                text-xs
                font-bold
                tracking-[0.2em]
                uppercase
                text-teal-700
                bg-teal-50
                px-4
                py-1.5
                rounded-full
              "
            >
              Conditions & Services
            </span>
          </div>

          <h2
            className="
              text-3xl
              sm:text-4xl
              md:text-5xl
              font-bold
              text-slate-900
              mb-3
              tracking-tight
            "
          >
            <span>
              Conditions &{" "}
            </span>

            <span
              className="
                bg-gradient-to-r
                from-teal-600
                to-cyan-600
                bg-clip-text
                text-transparent
              "
            >
              Services
            </span>
          </h2>

          <p
            className="
              text-slate-600
              max-w-2xl
              mx-auto
              text-sm
              md:text-base
              leading-relaxed
              px-2
            "
          >
            Evidence-based physiotherapy for pain relief, mobility,
            rehabilitation, and better quality of life in Pune,
            with personalized treatment plans for individual needs.
          </p>

        </div>


        {/* =====================================================
            MOBILE ONLY VERSION
            DESKTOP VERSION BELOW IS LEFT UNCHANGED
        ===================================================== */}

        <div className="md:hidden">

          {/* =================================================
              MOBILE CONDITIONS
          ================================================= */}

          <div
            id="conditions"
            className="
              relative
              bg-white
              border
              border-slate-200/80
              rounded-2xl
              p-4
              shadow-sm
              scroll-mt-24
            "
          >

            {/* Header */}

            <div
              className="
                flex
                items-center
                justify-between
                mb-4
                pb-2.5
                border-b
                border-slate-100
              "
            >

              <h3
                className="
                  text-base
                  font-bold
                  text-slate-900
                  pl-2.5
                  border-l-4
                  border-teal-500
                "
              >
                Conditions We Treat
              </h3>

              <span
                className="
                  text-[11px]
                  font-semibold
                  text-teal-700
                  bg-teal-50
                  border
                  border-teal-100
                  px-2.5
                  py-1
                  rounded-full
                  whitespace-nowrap
                "
              >
                {conditions.length} Conditions
              </span>

            </div>


            {/* =================================================
                MOBILE CONDITIONS HORIZONTAL SLIDER

                4 cards per slide
                2 columns × 2 rows
            ================================================= */}

            <div
              className="
                flex
                overflow-x-auto
                snap-x
                snap-mandatory
                gap-3
                pb-2
                overscroll-x-contain
                [scrollbar-width:none]
                [&::-webkit-scrollbar]:hidden
              "
            >

              {Array.from(
                {
                  length: Math.ceil(conditions.length / 4),
                },
                (_, slideIndex) => {

                  const slideConditions = conditions.slice(
                    slideIndex * 4,
                    slideIndex * 4 + 4
                  );

                  return (
                    <div
                      key={slideIndex}
                      className="
                        min-w-full
                        w-full
                        snap-center
                        grid
                        grid-cols-2
                        gap-2.5
                        shrink-0
                      "
                    >

                      {slideConditions.map((condition) => (

                        <div
                          key={condition.title}
                          className="
                            group
                            bg-white
                            border
                            border-slate-100
                            rounded-xl
                            p-2
                            h-[128px]
                            flex
                            flex-col
                            items-center
                            justify-center
                            text-center
                            shadow-sm
                          "
                        >

                          <div
                            className="
                              w-full
                              h-[70px]
                              rounded-lg
                              bg-slate-50
                              border
                              border-slate-100
                              flex
                              items-center
                              justify-center
                              p-1.5
                            "
                          >

                            <img
                              src={condition.image}
                              alt={`${condition.title} physiotherapy treatment in Pune`}
                              loading="lazy"
                              className="
                                w-full
                                h-full
                                object-contain
                              "
                            />

                          </div>

                          <span
                            className="
                              font-bold
                              text-slate-800
                              text-[11px]
                              tracking-tight
                              mt-2
                              leading-tight
                              line-clamp-2
                            "
                          >
                            {condition.title}
                          </span>

                        </div>

                      ))}

                    </div>
                  );
                }
              )}

            </div>


            {/* Swipe indicator */}

            <div
              className="
                mt-3
                flex
                items-center
                justify-center
                gap-1.5
                text-[10px]
                font-semibold
                text-slate-400
              "
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              Swipe left or right for more
              <ChevronRight className="w-3.5 h-3.5" />
            </div>

          </div>


          {/* =================================================
              MOBILE SERVICES
          ================================================= */}

          <div
            id="services"
            className="
              relative
              mt-4
              bg-white
              border
              border-slate-200/80
              rounded-2xl
              p-4
              shadow-sm
              scroll-mt-24
            "
          >

            {/* Header */}

            <div
              className="
                flex
                items-center
                justify-between
                mb-4
                pb-2.5
                border-b
                border-slate-100
              "
            >

              <h3
                className="
                  text-base
                  font-bold
                  text-slate-900
                  pl-2.5
                  border-l-4
                  border-cyan-500
                "
              >
                Our Services
              </h3>

              <span
                className="
                  text-[11px]
                  font-semibold
                  text-cyan-700
                  bg-cyan-50
                  border
                  border-cyan-100
                  px-2.5
                  py-1
                  rounded-full
                  whitespace-nowrap
                "
              >
                {services.length} Services
              </span>

            </div>


            {/* =================================================
                MOBILE SERVICES HORIZONTAL SLIDER

                2 service cards per slide
                Cards remain readable
            ================================================= */}

            <div
              className="
                flex
                overflow-x-auto
                snap-x
                snap-mandatory
                gap-3
                pb-2
                overscroll-x-contain
                [scrollbar-width:none]
                [&::-webkit-scrollbar]:hidden
              "
            >

              {Array.from(
                {
                  length: Math.ceil(services.length / 2),
                },
                (_, slideIndex) => {

                  const slideServices = services.slice(
                    slideIndex * 2,
                    slideIndex * 2 + 2
                  );

                  return (
                    <div
                      key={slideIndex}
                      className="
                        min-w-full
                        w-full
                        snap-center
                        grid
                        grid-cols-1
                        gap-2.5
                        shrink-0
                      "
                    >

                      {slideServices.map((service) => (

                        <div
                          key={service.title}
                          className="
                            group
                            bg-white
                            border
                            border-slate-200/70
                            rounded-xl
                            p-3
                            min-h-[122px]
                            flex
                            items-start
                            gap-3
                            shadow-sm
                          "
                        >

                          {/* Service Icon */}

                          <div
                            className="
                              w-9
                              h-9
                              shrink-0
                              rounded-lg
                              bg-cyan-50
                              text-cyan-600
                              border
                              border-cyan-100/70
                              flex
                              items-center
                              justify-center
                            "
                          >
                            {service.icon}
                          </div>


                          {/* Service Content */}

                          <div className="min-w-0">

                            <h4
                              className="
                                font-bold
                                text-slate-900
                                text-sm
                                mb-1
                                tracking-tight
                              "
                            >
                              {service.title}
                            </h4>

                            <p
                              className="
                                text-[11px]
                                text-slate-500
                                leading-[1.55]
                                font-normal
                              "
                            >
                              {service.description}
                            </p>

                          </div>

                        </div>

                      ))}

                    </div>
                  );
                }
              )}

            </div>


            {/* Swipe indicator */}

            <div
              className="
                mt-3
                flex
                items-center
                justify-center
                gap-1.5
                text-[10px]
                font-semibold
                text-slate-400
              "
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              Swipe left or right for more
              <ChevronRight className="w-3.5 h-3.5" />
            </div>

          </div>

        </div>


        {/* =====================================================
            DESKTOP VERSION
            THIS IS YOUR ORIGINAL DESKTOP CODE
            DO NOT CHANGE
        ===================================================== */}

        <div
          className="
            hidden
            md:grid
            grid-cols-1
            lg:grid-cols-2
            gap-4
            lg:gap-6
            items-start
          "
        >

          {/* =================================================
              LEFT: CONDITIONS
          ================================================= */}

          <div
            id="conditions-desktop"
            className="
              relative
              bg-white
              border
              border-slate-200/80
              rounded-2xl
              p-4
              sm:p-5
              shadow-sm
              scroll-mt-24
            "
          >

            {/* Header */}

            <div
              className="
                flex
                items-center
                justify-between
                mb-4
                pb-2.5
                border-b
                border-slate-100
              "
            >

              <h3
                className="
                  text-base
                  sm:text-lg
                  font-bold
                  text-slate-900
                  pl-2.5
                  border-l-4
                  border-teal-500
                "
              >
                Conditions We Treat
              </h3>

              <span
                className="
                  text-xs
                  font-semibold
                  text-teal-700
                  bg-teal-50
                  border
                  border-teal-100
                  px-2.5
                  py-0.5
                  rounded-full
                "
              >
                {conditions.length} Conditions
              </span>

            </div>


            {/* FIXED NAVIGATION CONTROLS */}

            <button
              type="button"
              onClick={() =>
                scrollVertical(conditionsScrollRef, "up")
              }
              aria-label="Scroll conditions up"
              className="
                absolute
                top-[78px]
                right-6
                z-30

                w-9
                h-9

                rounded-full

                bg-white/55
                backdrop-blur-xl

                border
                border-white/80

                text-teal-700

                shadow-[0_6px_20px_rgba(13,148,136,0.12)]

                ring-1
                ring-teal-100/60

                flex
                items-center
                justify-center

                hover:bg-teal-50/80
                hover:text-teal-600
                hover:shadow-[0_8px_25px_rgba(13,148,136,0.2)]

                active:scale-95

                transition-all
                duration-300
              "
            >
              <ChevronUp
                className="w-4 h-4"
                strokeWidth={2.5}
              />
            </button>


            <button
              type="button"
              onClick={() =>
                scrollVertical(conditionsScrollRef, "down")
              }
              aria-label="Scroll conditions down"
              className="
                absolute
                bottom-6
                right-6
                z-30

                w-9
                h-9

                rounded-full

                bg-white/55
                backdrop-blur-xl

                border
                border-white/80

                text-teal-700

                shadow-[0_6px_20px_rgba(13,148,136,0.12)]

                ring-1
                ring-teal-100/60

                flex
                items-center
                justify-center

                hover:bg-teal-50/80
                hover:text-teal-600
                hover:shadow-[0_8px_25px_rgba(13,148,136,0.2)]

                active:scale-95

                transition-all
                duration-300
              "
            >
              <ChevronDown
                className="w-4 h-4"
                strokeWidth={2.5}
              />
            </button>


            {/* SCROLLING CONTENT */}

            <div
              ref={conditionsScrollRef}
              className="
                h-[345px]
                overflow-y-auto
                scroll-smooth

                [scrollbar-width:none]
                [&::-webkit-scrollbar]:hidden

                pt-1
                pb-1
              "
            >

              <div
                className="
                  grid
                  grid-cols-2
                  sm:grid-cols-4
                  gap-2.5
                  pr-1
                "
              >

                {conditions.map((condition) => (

                  <div
                    key={condition.title}
                    className="
                      group

                      bg-white

                      border
                      border-slate-100

                      rounded-lg

                      p-2

                      flex
                      flex-col
                      items-center
                      justify-center
                      text-center

                      transition-all
                      duration-300

                      hover:border-teal-300

                      hover:shadow-[0_8px_16px_-6px_rgba(13,148,136,0.18)]

                      hover:-translate-y-0.5
                    "
                  >

                    <div
                      className="
                        w-full
                        h-14

                        rounded-md

                        bg-slate-50

                        border
                        border-slate-100/50

                        flex
                        items-center
                        justify-center

                        p-1.5

                        transition-all
                        duration-300

                        group-hover:scale-105
                        group-hover:bg-gradient-to-br
                        group-hover:from-teal-50
                        group-hover:to-cyan-50
                        group-hover:border-teal-100
                      "
                    >

                      <img
                        src={condition.image}
                        alt={`${condition.title} physiotherapy treatment in Pune`}
                        loading="lazy"
                        className="
                          w-full
                          h-full
                          object-contain
                        "
                      />

                    </div>


                    <span
                      className="
                        font-bold
                        text-slate-800
                        text-[11px]

                        tracking-tight

                        mt-1.5

                        group-hover:text-teal-950

                        transition-colors

                        line-clamp-2

                        px-0.5

                        leading-tight
                      "
                    >
                      {condition.title}
                    </span>

                  </div>

                ))}

              </div>

            </div>

          </div>


          {/* =================================================
              RIGHT: SERVICES
          ================================================= */}

          <div
            id="services-desktop"
            className="
              relative
              bg-white
              border
              border-slate-200/80
              rounded-2xl
              p-4
              sm:p-5
              shadow-sm
              scroll-mt-24
            "
          >

            {/* Header */}

            <div
              className="
                flex
                items-center
                justify-between
                mb-4
                pb-2.5
                border-b
                border-slate-100
              "
            >

              <h3
                className="
                  text-base
                  sm:text-lg
                  font-bold
                  text-slate-900
                  pl-2.5
                  border-l-4
                  border-cyan-500
                "
              >
                Our Services
              </h3>

              <span
                className="
                  text-xs
                  font-semibold
                  text-cyan-700
                  bg-cyan-50
                  border
                  border-cyan-100
                  px-2.5
                  py-0.5
                  rounded-full
                "
              >
                {services.length} Services
              </span>

            </div>


            {/* FIXED SERVICES ARROWS */}

            <button
              type="button"
              onClick={() =>
                scrollVertical(servicesScrollRef, "up")
              }
              aria-label="Scroll services up"
              className="
                absolute
                top-[78px]
                right-6
                z-30

                w-9
                h-9

                rounded-full

                bg-white/55
                backdrop-blur-xl

                border
                border-white/80

                text-cyan-700

                shadow-[0_6px_20px_rgba(6,182,212,0.12)]

                ring-1
                ring-cyan-100/60

                flex
                items-center
                justify-center

                hover:bg-cyan-50/80
                hover:text-cyan-600
                hover:shadow-[0_8px_25px_rgba(6,182,212,0.2)]

                active:scale-95

                transition-all
                duration-300
              "
            >
              <ChevronUp
                className="w-4 h-4"
                strokeWidth={2.5}
              />
            </button>


            <button
              type="button"
              onClick={() =>
                scrollVertical(servicesScrollRef, "down")
              }
              aria-label="Scroll services down"
              className="
                absolute
                bottom-6
                right-6
                z-30

                w-9
                h-9

                rounded-full

                bg-white/55
                backdrop-blur-xl

                border
                border-white/80

                text-cyan-700

                shadow-[0_6px_20px_rgba(6,182,212,0.12)]

                ring-1
                ring-cyan-100/60

                flex
                items-center
                justify-center

                hover:bg-cyan-50/80
                hover:text-cyan-600
                hover:shadow-[0_8px_25px_rgba(6,182,212,0.2)]

                active:scale-95

                transition-all
                duration-300
              "
            >
              <ChevronDown
                className="w-4 h-4"
                strokeWidth={2.5}
              />
            </button>


            {/* SCROLLING SERVICES */}

            <div
              ref={servicesScrollRef}
              className="
                h-[345px]
                overflow-y-auto
                scroll-smooth

                [scrollbar-width:none]
                [&::-webkit-scrollbar]:hidden

                pt-1
                pb-1
              "
            >

              <div
                className="
                  flex
                  flex-col
                  gap-2.5
                  pr-1
                "
              >

                {services.map((service) => (

                  <div
                    key={service.title}
                    className="
                      group

                      bg-white

                      border
                      border-slate-200/70

                      rounded-lg

                      p-3

                      transition-all
                      duration-300

                      hover:border-cyan-200

                      hover:shadow-[0_8px_16px_-6px_rgba(6,182,212,0.12)]

                      hover:-translate-y-0.5

                      flex
                      items-start
                      gap-3
                    "
                  >

                    {/* SERVICE ICON */}

                    <div
                      className="
                        w-8
                        h-8
                        shrink-0

                        rounded-md

                        bg-cyan-50

                        text-cyan-600

                        border
                        border-cyan-100/70

                        flex
                        items-center
                        justify-center

                        transition-all
                        duration-300

                        group-hover:bg-gradient-to-br
                        group-hover:from-cyan-500
                        group-hover:to-teal-600

                        group-hover:text-white
                      "
                    >
                      {service.icon}
                    </div>


                    {/* SERVICE CONTENT */}

                    <div>

                      <h4
                        className="
                          font-bold
                          text-slate-900
                          text-sm
                          mb-0.5
                          tracking-tight

                          group-hover:text-cyan-950

                          transition-colors
                        "
                      >
                        {service.title}
                      </h4>


                      <p
                        className="
                          text-xs
                          text-slate-500
                          leading-relaxed
                          font-normal
                        "
                      >
                        {service.description}
                      </p>

                    </div>

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