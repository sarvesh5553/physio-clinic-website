import {
  FaWhatsapp,
  FaInstagram,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-white pt-12 md:pt-16 pb-6">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-10 mb-8">
          {/* Clinic Info */}
          <div className="lg:mr-16">
            <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent mb-4">
              PhysioCare
            </h3>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Helping patients recover from pain, injuries and movement limitations through evidence-based physiotherapy care.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg md:text-xl mb-4 text-slate-100">
              Quick Links
            </h4>

            <div className="flex flex-col gap-2.5 text-slate-300">
              <a href="#home" className="hover:text-teal-400 transition-colors">
                Home
              </a>
              <a href="#services" className="hover:text-teal-400 transition-colors">
                Services
              </a>
              <a href="#conditions" className="hover:text-teal-400 transition-colors">
                Conditions
              </a>
              <a href="#faq" className="hover:text-teal-400 transition-colors">
                FAQ's
              </a>
              <a href="#contact" className="hover:text-teal-400 transition-colors">
                Contact
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg md:text-xl mb-4 text-slate-100">
              Services
            </h4>

            <div className="flex flex-col gap-2.5 text-slate-300 text-sm md:text-base">
              <p className="hover:text-teal-400 transition-colors cursor-default">Manual Therapy</p>
              <p className="hover:text-teal-400 transition-colors cursor-default">Dry Needling</p>
              <p className="hover:text-teal-400 transition-colors cursor-default">Cupping Therapy</p>
              <p className="hover:text-teal-400 transition-colors cursor-default">Sports Rehabilitation</p>
              <p className="hover:text-teal-400 transition-colors cursor-default">Neuro Rehabilitation</p>
            </div>
          </div>

          {/* Contact */}
          <div className="lg:-ml-6">
            <h4 className="font-semibold text-lg md:text-xl mb-4 text-slate-100">
              Contact Us
            </h4>

            <div className="space-y-3 text-slate-300">
              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-teal-400 flex-shrink-4" size={16} />
                <a
                  href="tel:+919322518895"
                  className="hover:text-teal-400 transition-colors text-sm md:text-base">
                  +91 93225 18895
                </a>
              </div>

              <div className="flex items-start gap-3">
                <FaEnvelope className="text-teal-400 flex-shrink-0 mt-0.5" size={16} />
                <a
                  href="mailto:drbhagyashrisalunkept@gmail.com"
                  className="hover:text-teal-400 transition-colors text-sm md:text-base break-all">
                  drbhagyashrisalunkept@gmail.com
                </a>
              </div>

              <div className="flex gap-4 pt-2">
                <a
                  href="https://wa.me/919322518895"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-green-400 transition-colors hover:scale-110 duration-300"
                >
                  <FaWhatsapp size={22} />
                </a>

                <a
                  href="https://instagram.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-pink-400 transition-colors hover:scale-110 duration-300"
                >
                  <FaInstagram size={22} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700 pt-6 md:pt-8 text-center text-slate-400 text-xs md:text-sm">
          <p>© {new Date().getFullYear()} PhysioCare. All Rights Reserved | Professional Physiotherapy Services</p>
        </div>
      </div>
    </footer>
  );
}