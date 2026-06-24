"use client";

import { useRef } from "react";
import {
  Activity,
  Sparkles,
  Dumbbell,
  Building2,
  Syringe,
  CheckCircle2,
  Layers,
  Brain,
  HeartPulse,
  Zap,
  BriefcaseMedical,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function ConditionsServices() {
  const conditionsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  const conditions = [
    { title: "Back Pain", image: "/Conditions/backpain.png" },
    { title: "Neck Pain", image: "/Conditions/neck-pain.png" },
    { title: "Sciatica", image: "/Conditions/sciatica.png" },
    { title: "Frozen Shoulder", image: "/Conditions/frozen-shoulder.png" },
    { title: "Arthritis", image: "/Conditions/arthritis.png" },
    { title: "Knee Pain", image: "/Conditions/knee-pain.png" },
    { title: "Shoulder Pain", image: "/Conditions/shoulder-pain.png" },
    { title: "Tennis Elbow", image: "/Conditions/tenniselbow.png" },
    { title: "Slip Disc", image: "/Conditions/slip-disc.png" },
    { title: "Sports Injury", image: "/Conditions/sports-injury.png" },
    { title: "Hip Pain", image: "/Conditions/hip-pain.png" },
    { title: "Ankle Sprain", image: "/Conditions/ankle-sprain.png" },
    { title: "Muscle Strain", image: "/Conditions/muscle-strain.png" },
    { title: "Joint Stiffness", image: "/Conditions/joint-stiffness.png" },
    { title: "Postural Problems", image: "/Conditions/postural-problems.png" },
    { title: "Ligament Injury", image: "/Conditions/ligament-injury.png" },
    { title: "Plantar Fasciitis", image: "/Conditions/plantar-fasciitis.png" },
    { title: "Chronic Pain", image: "/Conditions/chronic-pain.png" },
  ];

  const services = [
    {
      icon: <Activity className="w-5 h-5" />,
      title: "Manual Therapy",
      description: "Hands-on techniques to reduce pain, improve mobility and restore function.",
    },
    {
      icon: <CheckCircle2 className="w-5 h-5" />,
      title: "Exercise Therapy",
      description: "Customized exercise programs to strengthen muscles and improve movement.",
    },
    {
      icon: <Dumbbell className="w-5 h-5" />,
      title: "Sports Rehabilitation",
      description: "Helping athletes recover safely and return to peak performance.",
    },
    {
      icon: <Building2 className="w-5 h-5" />,
      title: "Post Surgical Rehab",
      description: "Structured recovery programs after orthopedic and joint surgeries.",
    },
    {
      icon: <Syringe className="w-5 h-5" />,
      title: "Dry Needling",
      description: "Targets trigger points and muscle tightness for targeted pain relief.",
    },
    {
      icon: <CheckCircle2 className="w-5 h-5" />,
      title: "Posture Correction",
      description: "Assessment and correction of posture-related structural dysfunctions.",
    },
    {
      icon: <Layers className="w-5 h-5" />,
      title: "Dry & Wet Cupping",
      description: "Improves local circulation and helps relieve deep muscular tension.",
    },
    {
      icon: <BriefcaseMedical className="w-5 h-5" />,
      title: "Kinesio Taping",
      description: "Supports structural joints and muscles while promoting active recovery.",
    },
    {
      icon: <Brain className="w-5 h-5" />,
      title: "Neuro Rehabilitation",
      description: "Specialized recovery framework designed for neurological conditions.",
    },
    {
      icon: <HeartPulse className="w-5 h-5" />,
      title: "Pain Management",
      description: "Evidence-based clinical approaches for acute and chronic pain relief.",
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Electrotherapy",
      description: "Advanced technological modalities used to suppress pain and accelerate cellular repair.",
    },
  ];

  const scrollRight = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollBy({ left: 320, behavior: "smooth" });
  };

  const scrollLeft = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollBy({ left: -320, behavior: "smooth" });
  };

  return (
    <section className="py-14 md:py-16 bg-gradient-to-b from-white via-slate-50/60 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <div className="text-center max-w-5xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-100/80 px-4 py-1.5 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span className="text-xs font-semibold tracking-wider uppercase text-teal-800">
              Our Expertise &amp; Services
            </span>
          </div>

          {/* Fluid clamp() sizing keeps this on one line at every viewport width
              instead of jumping between fixed breakpoint sizes */}
          <h2
            className="font-black text-slate-900 tracking-tight mb-3 whitespace-nowrap"
            style={{ fontSize: "clamp(1.1rem, 4.1vw, 2.5rem)" }}
          >
            Conditions We Treat &amp;{" "}
            <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Services We Provide
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Evidence-based physiotherapy treatments designed to relieve pain, restore movement and improve your quality of life.
          </p>
        </div>

        {/* ── CONDITIONS SECTION ── */}
        <div className="relative mb-12">
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 pl-3 border-l-4 border-teal-500">
              Conditions We Treat
            </h3>
            <span className="hidden sm:inline-block text-xs font-semibold text-teal-700 bg-teal-50 border border-teal-100 px-3 py-1 rounded-full">
              {conditions.length} Conditions
            </span>
            <span className="sm:hidden text-[11px] font-medium text-slate-400">
              Swipe to explore →
            </span>
          </div>

          <div className="relative">
            {/* Edge fade cues — hint that more content sits off-screen */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-14 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-14 bg-gradient-to-l from-white to-transparent z-10" />

            {/* Arrows: always visible at sm+ (not hover-dependent, so they also work on touch laptops/tablets) */}
            <button
              type="button"
              onClick={() => scrollLeft(conditionsRef)}
              aria-label="Scroll left"
              className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white text-slate-700 shadow-md border border-slate-100 hover:bg-teal-600 hover:text-white items-center justify-center transition-all duration-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => scrollRight(conditionsRef)}
              aria-label="Scroll right"
              className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white text-slate-700 shadow-md border border-slate-100 hover:bg-teal-600 hover:text-white items-center justify-center transition-all duration-200"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Scroll track */}
            <div
              ref={conditionsRef}
              className="flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-1 py-3"
            >
              {conditions.map((condition) => (
                <div
                  key={condition.title}
                  className="snap-start group flex-none w-[115px] sm:w-[130px] bg-white border border-slate-100 rounded-xl p-2.5 flex flex-col items-center justify-center text-center transition-all duration-300 hover:border-teal-300 hover:shadow-[0_10px_20px_-8px_rgba(13,148,136,0.18)] hover:-translate-y-0.5"
                >
                  <div className="w-full aspect-square rounded-lg bg-slate-50 border border-slate-100/50 flex items-center justify-center p-1.5 transition-all duration-300 group-hover:scale-105 group-hover:bg-gradient-to-br group-hover:from-teal-50 group-hover:to-cyan-50 group-hover:border-teal-100">
                    <img
                      src={condition.image}
                      alt={condition.title}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <span className="font-bold text-slate-800 text-[11px] sm:text-xs tracking-tight mt-2.5 group-hover:text-teal-950 transition-colors line-clamp-2 px-0.5">
                    {condition.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── SERVICES SECTION ── */}
        <div className="relative">
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 pl-3 border-l-4 border-cyan-500">
              Our Services
            </h3>
            <span className="hidden sm:inline-block text-xs font-semibold text-cyan-700 bg-cyan-50 border border-cyan-100 px-3 py-1 rounded-full">
              {services.length} Services
            </span>
            <span className="sm:hidden text-[11px] font-medium text-slate-400">
              Swipe to explore →
            </span>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-14 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-14 bg-gradient-to-l from-white to-transparent z-10" />

            <button
              type="button"
              onClick={() => scrollLeft(servicesRef)}
              aria-label="Scroll left"
              className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white text-slate-700 shadow-md border border-slate-100 hover:bg-cyan-600 hover:text-white items-center justify-center transition-all duration-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => scrollRight(servicesRef)}
              aria-label="Scroll right"
              className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white text-slate-700 shadow-md border border-slate-100 hover:bg-cyan-600 hover:text-white items-center justify-center transition-all duration-200"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div
              ref={servicesRef}
              className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-1 py-3"
            >
              {services.map((service) => (
                <div
                  key={service.title}
                  className="snap-start group flex-none w-[265px] sm:w-[300px] bg-white border border-slate-200/70 rounded-xl p-5 transition-all duration-300 hover:border-cyan-200 hover:shadow-[0_12px_24px_-10px_rgba(6,182,212,0.12)] hover:-translate-y-0.5 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-9 h-9 rounded-lg bg-cyan-50 text-cyan-600 border border-cyan-100/70 flex items-center justify-center transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-cyan-500 group-hover:to-teal-600 group-hover:text-white">
                      {service.icon}
                    </div>

                    <h4 className="font-bold text-slate-900 text-base mt-4 mb-1.5 tracking-tight group-hover:text-cyan-950 transition-colors">
                      {service.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal line-clamp-3">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
