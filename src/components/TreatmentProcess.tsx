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

  return (
    <section className="bg-gradient-to-b from-white to-slate-50 py-12 md:py-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Heading */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center justify-center mb-4">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-teal-700 bg-teal-50 px-4 py-2 rounded-full">
              The Process
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            <span>Your Journey To </span>
            <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Recovery</span>
          </h2>

          <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Our structured physiotherapy approach ensures the best possible outcome for every patient.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">
          {steps.map((step) => (
            <div
              key={step.number}
              className="group bg-white rounded-xl md:rounded-2xl p-4 md:p-5 shadow-[0_2px_8px_rgba(15,23,42,0.06)] border border-slate-100 hover:shadow-[0_12px_32px_rgba(13,148,136,0.12)] hover:border-teal-200 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-teal-600 to-cyan-600 text-white flex items-center justify-center font-bold text-base md:text-lg mb-4 group-hover:shadow-[0_8px_16px_rgba(13,148,136,0.3)] transition-all duration-300">
                {step.number}
              </div>

              <h3 className="text-base md:text-lg font-bold text-slate-900 mb-2">
                {step.title}
              </h3>

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
