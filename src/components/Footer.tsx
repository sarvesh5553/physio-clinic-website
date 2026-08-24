"use client";

import {
  FaWhatsapp,
  FaInstagram,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

import { SiGmail } from "react-icons/si";

export default function Footer() {
  return (
    <footer
      className="
        bg-gradient-to-b
        from-slate-900
        to-slate-950
        text-white
        pt-12
        md:pt-16
        pb-5
        md:pb-6
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          px-5
          sm:px-6
          lg:px-8
        "
      >

        {/* =====================================================
            MAIN FOOTER
        ===================================================== */}

        <div
          className="
            grid
            grid-cols-2
            md:grid-cols-2
            lg:grid-cols-4
            gap-x-8
            gap-y-10
            md:gap-10
            mb-10
            md:mb-8
          "
        >

          {/* ===================================================
              CLINIC INFO
          =================================================== */}

          <div
            className="
              col-span-2
              lg:col-span-1
              lg:mr-16
            "
          >
            <h3
              className="
                text-2xl
                md:text-3xl
                font-bold
                bg-gradient-to-r
                from-teal-400
                to-cyan-400
                bg-clip-text
                text-transparent
                mb-3
                md:mb-4
              "
            >
              PhysioCare
            </h3>

            <p
              className="
                text-slate-300
                text-sm
                md:text-base
                leading-relaxed
                max-w-sm
              "
            >
              Helping patients recover from pain, injuries and movement
              limitations through evidence-based physiotherapy care.
            </p>
          </div>


          {/* ===================================================
              QUICK LINKS
          =================================================== */}

          <div>
            <h4
              className="
                font-semibold
                text-base
                md:text-xl
                mb-4
                text-slate-100
              "
            >
              Quick Links
            </h4>

            <div
              className="
                flex
                flex-col
                gap-2.5
                text-slate-300
                text-sm
                md:text-base
              "
            >
              <a
                href="#home"
                className="
                  hover:text-teal-400
                  transition-colors
                  w-fit
                "
              >
                Home
              </a>

              <a
                href="#services"
                className="
                  hover:text-teal-400
                  transition-colors
                  w-fit
                "
              >
                Services
              </a>

              <a
                href="#conditions"
                className="
                  hover:text-teal-400
                  transition-colors
                  w-fit
                "
              >
                Conditions
              </a>

              <a
                href="#faq"
                className="
                  hover:text-teal-400
                  transition-colors
                  w-fit
                "
              >
                FAQ's
              </a>

              <a
                href="#contact"
                className="
                  hover:text-teal-400
                  transition-colors
                  w-fit
                "
              >
                Contact
              </a>
            </div>
          </div>


          {/* ===================================================
              SERVICES
          =================================================== */}

          <div>
            <h4
              className="
                font-semibold
                text-base
                md:text-xl
                mb-4
                text-slate-100
              "
            >
              Services
            </h4>

            <div
              className="
                flex
                flex-col
                gap-2.5
                text-slate-300
                text-sm
                md:text-base
              "
            >
              <p
                className="
                  hover:text-teal-400
                  transition-colors
                  cursor-default
                "
              >
                Manual Therapy
              </p>

              <p
                className="
                  hover:text-teal-400
                  transition-colors
                  cursor-default
                "
              >
                Dry Needling
              </p>

              <p
                className="
                  hover:text-teal-400
                  transition-colors
                  cursor-default
                "
              >
                Cupping Therapy
              </p>

              <p
                className="
                  hover:text-teal-400
                  transition-colors
                  cursor-default
                "
              >
                Sports Rehabilitation
              </p>

              <p
                className="
                  hover:text-teal-400
                  transition-colors
                  cursor-default
                "
              >
                Neuro Rehabilitation
              </p>
            </div>
          </div>


          {/* ===================================================
              CONTACT
          =================================================== */}

          <div
            className="
              col-span-2
              lg:col-span-1
              lg:-ml-6
            "
          >

            <h4
              className="
                font-semibold
                text-base
                md:text-xl
                mb-4
                text-slate-100
              "
            >
              Contact Us
            </h4>

            <div
              className="
                space-y-3.5
                md:space-y-3
                text-slate-300
              "
            >

              {/* PHONE */}

              <div className="flex items-center gap-3">

                <FaPhoneAlt
                  className="
                    text-teal-400
                    flex-shrink-0
                  "
                  size={15}
                />

                <a
                  href="tel:+919322518895"
                  className="
                    hover:text-teal-400
                    transition-colors
                    text-sm
                    md:text-base
                  "
                >
                  +91 93225 18895
                </a>

              </div>


              {/* EMAIL */}

              <div className="flex items-start gap-3">

                <FaEnvelope
                  className="
                    text-teal-400
                    flex-shrink-0
                    mt-0.5
                  "
                  size={16}
                />

                <a
                  href="mailto:drbhagyashrisalunkept@gmail.com"
                  className="
                    hover:text-teal-400
                    transition-colors
                    text-sm
                    md:text-base
                    break-all
                    leading-relaxed
                  "
                >
                  drbhagyashrisalunkept@gmail.com
                </a>

              </div>


              {/* =================================================
                  SOCIAL MEDIA
                  TRANSPARENT / NO CIRCULAR BOXES
              ================================================= */}

              <div
                className="
                  flex
                  items-center
                  gap-5
                  pt-2
                "
              >

                {/* WHATSAPP */}

                <a
                  href="https://wa.me/919322518895"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="
                    text-slate-300
                    hover:text-green-400
                    hover:scale-110
                    transition-all
                    duration-300
                    flex
                    items-center
                    justify-center
                  "
                >
                  <FaWhatsapp size={23} />
                </a>


                {/* INSTAGRAM */}

                <a
                  href="https://www.instagram.com/drbhagyashrisphysiocare?igsh=MTRycWlocjhjcWE5Yw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="
                    text-slate-300
                    hover:text-pink-400
                    hover:scale-110
                    transition-all
                    duration-300
                    flex
                    items-center
                    justify-center
                  "
                >
                  <FaInstagram size={23} />
                </a>


                {/* YOUTUBE */}

                <a
                  href="https://youtube.com/@physiocare18?si=H9QicGVIeZN2LUwB"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="
                    text-slate-300
                    hover:text-red-500
                    hover:scale-110
                    transition-all
                    duration-300
                    flex
                    items-center
                    justify-center
                  "
                >
                  <FaYoutube size={23} />
                </a>


                {/* GMAIL */}

                <a
                  href="mailto:drbhagyashrisalunkept@gmail.com"
                  aria-label="Gmail"
                  className="
                    text-slate-300
                    hover:text-red-400
                    hover:scale-110
                    transition-all
                    duration-300
                    flex
                    items-center
                    justify-center
                  "
                >
                  <SiGmail size={23} />
                </a>

              </div>

            </div>
          </div>

        </div>


        {/* =====================================================
            BOTTOM BAR
        ===================================================== */}

        <div
          className="
            border-t
            border-slate-700/80
            pt-5
            md:pt-7
            text-center
            text-slate-400
            text-[10px]
            sm:text-xs
            md:text-sm
          "
        >
          <p className="leading-relaxed">
            © {new Date().getFullYear()} PhysioCare. All Rights Reserved
            <span className="hidden sm:inline"> | </span>

            <span className="block sm:inline">
              Professional Physiotherapy Services
            </span>
          </p>
        </div>

      </div>
    </footer>
  );
}