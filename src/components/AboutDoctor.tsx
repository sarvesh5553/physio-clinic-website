export default function AboutDoctor() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-8 items-center">

          {/* Doctor Image */}
          <div className="relative flex justify-center -mt-10">

            <div className="absolute inset-0 bg-teal-500/10 blur-3xl rounded-full"></div>

            <div className="relative">

              <img
                src="/bhagyashr.png"
                alt="Dr. Bhagyashri Salunke"
                className="
                  relative
                  w-full
                  max-w-2xl
                  h-[400px]
                  object-cover
                  rounded-[28px]
                  shadow-xl
                  transition-all
                  duration-500
                  hover:scale-[1.02]
                "
              />

              {/* Floating Experience Badge */}
              <div
                className="
                  absolute
                  -bottom-5
                  -left-5
                  bg-white
                  rounded-2xl
                  shadow-xl
                  border
                  border-slate-100
                  px-4
                  py-3
                  flex
                  items-center
                  gap-3
                  hover:shadow-2xl
                  transition-all
                  duration-300
                "
              >
                <div
                  className="
                    w-11
                    h-11
                    rounded-xl
                    bg-gradient-to-br
                    from-teal-500
                    to-cyan-500
                    text-white
                    flex
                    items-center
                    justify-center
                    font-bold
                    text-base
                  "
                >
                  4+
                </div>

                <div>
                  <p className="font-semibold text-slate-800 text-sm">
                    Years Experience
                  </p>

                  <p className="text-xs text-slate-500">
                    Trusted Physiotherapy Care
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Content */}
          <div>

            <span
              className="
                inline-block
                px-4
                py-2
                rounded-full
                bg-teal-50
                text-teal-600
                text-sm
                font-semibold
                uppercase
                tracking-wider
              "
            >
              About The Physiotherapist
            </span>

            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-4">
              Dr. Bhagyashri{" "}
              <span className="text-teal-600">
                Salunke
              </span>
            </h2>

            <p className="text-lg text-teal-600 font-medium mt-2">
              Physiotherapist & Rehabilitation Specialist
            </p>

            <p className="text-slate-600 leading-7 mt-5">
              Dedicated to helping patients recover from pain,
              injuries and movement limitations through
              personalized, evidence-based physiotherapy care.
              Every treatment plan is designed to restore mobility,
              improve strength and support long-term wellness.
            </p>

            {/* Our Services */}
            <div className="mt-6">

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

                {[
                  "Manual Therapy",
                  "Dry Needling",
                  "Sports Rehab",
                  "Neuro Rehab",
                  "Cupping Therapy",
                  "Exercise Therapy",
                  "Pain Management",
                  "Posture Correction",
                ].map((service) => (
                  <div
                    key={service}
                    className="
                      flex
                      items-center
                      gap-2
                      bg-slate-50
                      border
                      border-slate-100
                      rounded-xl
                      px-3
                      py-2
                      hover:bg-teal-50
                      hover:border-teal-200
                      transition-all
                    "
                  >
                    <span className="text-teal-600 font-bold">
                      ✓
                    </span>

                    <span className="text-sm text-slate-700 font-medium">
                      {service}
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