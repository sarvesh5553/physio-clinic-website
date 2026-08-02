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
} from "lucide-react";

export default function ConditionsServices() {
  const conditionsScrollRef = useRef<HTMLDivElement>(null);
  const servicesScrollRef = useRef<HTMLDivElement>(null);

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
      icon: <Zap className="w-4 h-4" />,
      title: "Electrotherapy",
      description: "Advanced technological modalities used to suppress pain and accelerate cellular repair.",
    },
    {
      icon: <HeartPulse className="w-4 h-4" />,
      title: "Pain Management",
      description: "Evidence-based clinical approaches for acute and chronic pain relief.",
    },
    {
      icon: <Activity className="w-4 h-4" />,
      title: "Manual Therapy",
      description: "Hands-on techniques to reduce pain, improve mobility and restore function.",
    },
    {
      icon: <CheckCircle2 className="w-4 h-4" />,
      title: "Exercise Therapy",
      description: "Customized exercise programs to strengthen muscles and improve movement.",
    },
    {
      icon: <Brain className="w-4 h-4" />,
      title: "Neuro Rehabilitation",
      description: "Specialized recovery framework designed for neurological conditions.",
    },
    {
      icon: <Dumbbell className="w-4 h-4" />,
      title: "Sports Rehabilitation",
      description: "Helping athletes recover safely and return to peak performance.",
    },
    {
      icon: <Building2 className="w-4 h-4" />,
      title: "Post Surgical Rehab",
      description: "Structured recovery programs after orthopedic and joint surgeries.",
    },
    {
      icon: <CheckCircle2 className="w-4 h-4" />,
      title: "Posture Correction",
      description: "Assessment and correction of posture-related structural dysfunctions.",
    },
    {
      icon: <Syringe className="w-4 h-4" />,
      title: "Dry Needling",
      description: "Targets trigger points and muscle tightness for targeted pain relief.",
    },
    {
      icon: <Layers className="w-4 h-4" />,
      title: "Dry & Wet Cupping",
      description: "Improves local circulation and helps relieve deep muscular tension.",
    },
    {
      icon: <BriefcaseMedical className="w-4 h-4" />,
      title: "Kinesio Taping",
      description: "Supports structural joints and muscles while promoting active recovery.",
    },
  ];

  const scrollVertical = (ref: React.RefObject<HTMLDivElement | null>, direction: "up" | "down") => {
    if (ref.current) {
      const scrollAmount = direction === "up" ? -220 : 220;
      ref.current.scrollBy({ top: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-white via-slate-50/60 to-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center justify-center mb-3">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-teal-700 bg-teal-50 px-4 py-1.5 rounded-full">
              Conditions & Services
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-3 tracking-tight">
            <span>Conditions we treat & </span>
            <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Services we provide
            </span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Evidence-based physiotherapy relieves pain, restores movement, and improves life quality.
          </p>
        </div>

        {/* ── DUAL COLUMN LAYOUT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-start">

          {/* ── LEFT HALF: CONDITIONS WE TREAT (UP TO ANKLE SPRAIN ROW) ── */}
          <div id="conditions" className="relative bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-sm scroll-mt-24">
            <div className="flex items-center justify-between mb-4 pb-2.5 border-b border-slate-100">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 pl-2.5 border-l-4 border-teal-500">
                Conditions We Treat
              </h3>
              <span className="text-xs font-semibold text-teal-700 bg-teal-50 border border-teal-100 px-2.5 py-0.5 rounded-full">
                {conditions.length} Conditions
              </span>
            </div>

            {/* Glass Navigation Controls */}
            <div className="absolute right-6 top-[68px] z-10 flex flex-col gap-1">
              <button
                type="button"
                onClick={() => scrollVertical(conditionsScrollRef, "up")}
                aria-label="Scroll conditions up"
                className="w-7 h-7 rounded-full bg-white/80 backdrop-blur-md border border-slate-200 text-slate-600 shadow-sm hover:bg-teal-600 hover:text-white hover:border-teal-600 flex items-center justify-center transition-all"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollVertical(conditionsScrollRef, "down")}
                aria-label="Scroll conditions down"
                className="w-7 h-7 rounded-full bg-white/80 backdrop-blur-md border border-slate-200 text-slate-600 shadow-sm hover:bg-teal-600 hover:text-white hover:border-teal-600 flex items-center justify-center transition-all"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Locked to exactly 3 rows (Ends precisely after Ankle Sprain) */}
            <div
              ref={conditionsScrollRef}
              className="h-[345px] overflow-y-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pt-1 pb-1"
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {conditions.map((condition) => (
                  <div
                    key={condition.title}
                    className="group bg-white border border-slate-100 rounded-lg p-2 flex flex-col items-center justify-center text-center transition-all duration-300 hover:border-teal-300 hover:shadow-[0_8px_16px_-6px_rgba(13,148,136,0.18)] hover:-translate-y-0.5"
                  >
                    <div className="w-full h-14 rounded-md bg-slate-50 border border-slate-100/50 flex items-center justify-center p-1.5 transition-all duration-300 group-hover:scale-105 group-hover:bg-gradient-to-br group-hover:from-teal-50 group-hover:to-cyan-50 group-hover:border-teal-100">
                      <img
                        src={condition.image}
                        alt={condition.title}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <span className="font-bold text-slate-800 text-[11px] tracking-tight mt-1.5 group-hover:text-teal-950 transition-colors line-clamp-2 px-0.5 leading-tight">
                      {condition.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT HALF: OUR SERVICES (UP TO EXERCISE THERAPY) ── */}
          <div id="services" className="relative bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-sm scroll-mt-24">
            <div className="flex items-center justify-between mb-4 pb-2.5 border-b border-slate-100">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 pl-2.5 border-l-4 border-cyan-500">
                Our Services
              </h3>
              <span className="text-xs font-semibold text-cyan-700 bg-cyan-50 border border-cyan-100 px-2.5 py-0.5 rounded-full">
                {services.length} Services
              </span>
            </div>

            {/* Glass Navigation Controls */}
            <div className="absolute right-6 top-[68px] z-10 flex flex-col gap-1">
              <button
                type="button"
                onClick={() => scrollVertical(servicesScrollRef, "up")}
                aria-label="Scroll services up"
                className="w-7 h-7 rounded-full bg-white/80 backdrop-blur-md border border-slate-200 text-slate-600 shadow-sm hover:bg-cyan-600 hover:text-white hover:border-cyan-600 flex items-center justify-center transition-all"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollVertical(servicesScrollRef, "down")}
                aria-label="Scroll services down"
                className="w-7 h-7 rounded-full bg-white/80 backdrop-blur-md border border-slate-200 text-slate-600 shadow-sm hover:bg-cyan-600 hover:text-white hover:border-cyan-600 flex items-center justify-center transition-all"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Locked to exactly 4 items (Ends precisely after Exercise Therapy) */}
            <div
              ref={servicesScrollRef}
              className="h-[345px] overflow-y-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pt-1 pb-1"
            >
              <div className="flex flex-col gap-2.5">
                {services.map((service) => (
                  <div
                    key={service.title}
                    className="group bg-white border border-slate-200/70 rounded-lg p-3 transition-all duration-300 hover:border-cyan-200 hover:shadow-[0_8px_16px_-6px_rgba(6,182,212,0.12)] hover:-translate-y-0.5 flex items-start gap-3"
                  >
                    <div className="w-8 h-8 shrink-0 rounded-md bg-cyan-50 text-cyan-600 border border-cyan-100/70 flex items-center justify-center transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-cyan-500 group-hover:to-teal-600 group-hover:text-white">
                      {service.icon}
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-900 text-sm mb-0.5 tracking-tight group-hover:text-cyan-950 transition-colors">
                        {service.title}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-normal">
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