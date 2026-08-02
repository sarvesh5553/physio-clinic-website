"use client";

import {
  Check,
  CalendarCheck,
  PhoneCall,
  Award,
  Star,
  Activity,
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
      className="relative bg-gradient-to-br from-teal-600 via-teal-650 to-cyan-600 pt-28 sm:pt-32 pb-24 sm:pb-28 overflow-hidden"
    >
      {/* ── Ambient Background Mesh Glows ── */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-300/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">

        {/* ── LEFT COLUMN: HEADLINE & CREDENTIALS ── */}
        <div className="text-left">
          {/* Top Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/25 px-4 py-1.5 rounded-full text-white text-xs sm:text-sm font-semibold mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
            <span>Trusted by 200+ Patients</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6">
            Move Better.
            <br />
            <span className="text-teal-100">Live Better.</span>
          </h1>

          {/* Hero Subtitle */}
          <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-xl mb-6 font-normal">
            Personalized physiotherapy and rehabilitation care that meets you where you
            are — relieve pain, rebuild strength, and move through life with confidence
            again.
          </p>

          {/* ── CUT-TO-CUT COMPACT GLASS DOCTOR BADGE ── */}
          <div className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-md border border-white/20 p-2 sm:p-2.5 rounded-2xl max-w-fit mb-8 shadow-inner transition-all hover:bg-white/15">
            {/* Inner "BS" Box */}
            <div className="w-9 h-9 rounded-xl bg-white/15 border border-white/25 flex items-center justify-center text-white font-extrabold text-xs flex-none shadow-sm">
              BS
            </div>

            {/* Doctor Info */}
            <div className="pr-1">
              <p className="text-white font-bold text-sm sm:text-base leading-none">
                Dr. Bhagyashri Salunke (PT)
              </p>

              <p className="text-white/80 text-[11px] sm:text-xs font-medium leading-tight mt-1">
                Bachelor of Physiotherapy
              </p>

              <p className="text-white/70 text-[10px] font-semibold leading-tight tracking-tight">
                CDCT, CDNT, CIAFMT, CKTP
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-teal-700 font-bold px-6 py-3.5 rounded-xl shadow-lg hover:bg-teal-50 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 text-sm sm:text-base"
            >
              <CalendarCheck className="w-5 h-5 text-teal-600" />
              Book Appointment
            </a>

            <a
              href="tel:+919322518895"
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white/70 text-white font-bold px-6 py-3.5 rounded-xl hover:bg-white/10 hover:border-white hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base backdrop-blur-sm"
            >
              <PhoneCall className="w-5 h-5" />
              Call Now
            </a>
          </div>
        </div>

        {/* ── RIGHT COLUMN: PROFESSIONAL PHYSIO VISUAL ── */}
        <div className="relative mb-6 sm:mb-12 lg:mb-0 flex justify-center">

          {/* Outer Glass Card Container */}
          <div className="relative rounded-3xl bg-slate-900/10 border border-white/30 shadow-2xl shadow-teal-950/30 overflow-hidden w-full max-w-md lg:max-w-xl aspect-[4/3] sm:aspect-[14/10] flex items-center justify-center group">
            
            {/* Primary High-Resolution Clinical Care Visual */}
            <img
              src="/pppp1.png"
              alt="Dr. Bhagyashri PhysioCare Treatment"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />

            {/* Subtle Gradient Overlay for Depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-black/10 pointer-events-none" />

            {/* Top Right: Recoveries Glass Pill */}
            <div className="absolute top-4 right-4 sm:top-5 sm:right-5 bg-white/90 backdrop-blur-md text-teal-900 border border-white/70 font-bold text-xs sm:text-sm px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 z-10">
              <Award className="w-4 h-4 text-teal-600" />
              <span>200+ Recoveries</span>
            </div>

            {/* Top Left Floating Indicator Badge */}
            <div className="absolute top-4 left-4 sm:top-5 sm:left-5 bg-slate-900/80 backdrop-blur-md text-white border border-white/20 font-medium text-[11px] sm:text-xs px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-2 z-10">
              <Activity className="w-3.5 h-3.5 text-lime-400 animate-pulse" />
              <span>Evidence-Based Care</span>
            </div>

            {/* Bottom Floating Rating Pill */}
            <div className="absolute bottom-12 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/80 shadow-md hidden sm:flex items-center gap-1.5 z-10">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current" />
                ))}
              </div>
              <span className="text-[11px] font-bold text-slate-800">5.0 Patient Care</span>
            </div>
          </div>

          {/* ── BOTTOM OVERLAY CHECKLIST STRIP ── */}
          <div className="absolute -bottom-8 left-2 right-2 sm:left-6 sm:right-6 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-white/80 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 sm:justify-between z-20">
            {checklist.map((item) => (
              <div key={item} className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center flex-none border border-teal-100">
                  <Check className="w-3.5 h-3.5" strokeWidth={3} />
                </span>
                <span className="text-slate-800 font-semibold text-xs sm:text-sm whitespace-nowrap">
                  {item}
                </span>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}