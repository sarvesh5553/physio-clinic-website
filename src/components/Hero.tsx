"use client";

import {
  Check,
  CalendarCheck,
  PhoneCall,
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
      className="relative bg-gradient-to-br from-teal-600 to-cyan-600 pt-28 sm:pt-32 pb-20 sm:pb-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">

        {/* Left Side */}
        <div className="text-left">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 px-4 py-2 rounded-full text-white text-sm font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
            Trusted by 200+ Patients
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6">
            Move Better.
            <br />
            Live Better.
          </h1>

          <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-xl mb-6">
            Personalized physiotherapy and rehabilitation care that meets you where you
            are — relieve pain, rebuild strength, and move through life with confidence
            again.
          </p>

          {/* Doctor Credential */}
          <div className="flex items-center gap-3 mb-9">
            <div className="w-11 h-11 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white font-bold text-sm flex-none">
              BS
            </div>

            <div>
              <p className="text-white font-bold text-sm leading-tight">
                Dr. Bhagyashree Salunke
              </p>

              <p className="text-white/70 text-xs leading-tight">
                Lead Physiotherapist
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-teal-700 font-bold px-6 py-3.5 rounded-xl shadow-lg hover:bg-teal-50 hover:scale-[1.02] transition-all duration-300"
            >
              <CalendarCheck className="w-5 h-5" />
              Book Appointment
            </a>

            <a
              href="tel:+919322518895"
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white/70 text-white font-bold px-6 py-3.5 rounded-xl hover:bg-white/10 hover:border-white transition-all duration-300"
            >
              <PhoneCall className="w-5 h-5" />
              Call Now
            </a>
          </div>
        </div>

        {/* Right Side Image Card */}
        <div className="relative mb-5 sm:mb-12 lg:mb-0 flex justify-center">

          <div className="relative rounded-3xl bg-gradient-to-br from-teal-400 to-cyan-500 border border-white/30 shadow-2xl overflow-hidden min-h-[220px] sm:min-h-[280px] md:min-h-[320px] max-w-md mx-auto flex items-center justify-center">

            <img
              src="/physiotheraphyimage.png"
              alt="Physiotherapy Treatment"
              className="w-full h-full object-cover"
            />

            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-white text-teal-700 font-bold text-xs sm:text-sm px-4 py-2 rounded-full shadow-lg z-20">
              200+ Recoveries
            </div>

          </div>

          {/* Checklist Card */}
          <div className="absolute -bottom-8 left-4 right-4 sm:left-8 sm:right-8 bg-white rounded-2xl shadow-xl border border-slate-100 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 sm:justify-between z-20">

            {checklist.map((item) => (
              <div key={item} className="flex items-center gap-2.5">

                <span className="w-5 h-5 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center flex-none">
                  <Check className="w-3.5 h-3.5" strokeWidth={3} />
                </span>

                <span className="text-slate-700 font-semibold text-sm whitespace-nowrap">
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