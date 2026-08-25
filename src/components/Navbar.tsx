"use client";

import { useEffect, useState } from "react";
import {
  FaWhatsapp,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import {
  HiMenu,
  HiX,
  HiArrowRight,
} from "react-icons/hi";


/* =========================================================
   PROPER GMAIL LOGO
========================================================= */

function GmailIcon({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 49.4 512 399.42"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="block"
    >

      {/* Blue left */}

      <path
        fill="#4285F4"
        d="
          M34.91 448.818
          h81.454
          V251
          L0 163.727
          V413.91
          c0 19.287 15.622 34.91 34.91 34.91
          Z
        "
      />


      {/* Green right */}

      <path
        fill="#34A853"
        d="
          M395.636 448.818
          h81.455
          c19.287 0 34.909-15.622 34.909-34.909
          V163.727
          L395.636 251
          Z
        "
      />


      {/* Yellow */}

      <path
        fill="#FBBC04"
        d="
          M395.636 99.727
          V251
          L512 163.727
          V117.182
          c0-43.142-49.25-67.782-83.782-41.891
          Z
        "
      />


      {/* Red */}

      <path
        fill="#EA4335"
        d="
          M116.364 251
          V99.727
          L256 204.455
          L395.636 99.727
          V251
          L256 355.727
          Z
        "
      />


      {/* Dark red */}

      <path
        fill="#C5221F"
        d="
          M0 117.182
          v46.545
          L116.364 251
          V99.727
          L83.782 75.291
          C49.25 49.4 0 74.04 0 117.182
          Z
        "
      />

    </svg>
  );
}


export default function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);


  /* =========================================================
     NAVIGATION LINKS
  ========================================================= */

  const navLinks = [
    {
      href: "#home",
      label: "Home",
    },
    {
      href: "#about",
      label: "About",
    },
    {
      href: "#conditions",
      label: "Conditions",
    },
    {
      href: "#testimonials",
      label: "Testimonials",
    },
    {
      href: "#contact",
      label: "Contact",
    },
    {
      href: "#faq",
      label: "FAQ's",
    },
  ];


  /* =========================================================
     CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
  ========================================================= */

  useEffect(() => {

    const handleClickOutside = (e: MouseEvent) => {

      if (
        menuOpen &&
        !(e.target as HTMLElement)?.closest("nav")
      ) {
        setMenuOpen(false);
      }

    };


    document.addEventListener(
      "mousedown",
      handleClickOutside
    );


    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

    };

  }, [menuOpen]);


  /* =========================================================
     CLOSE MENU WHEN WINDOW BECOMES DESKTOP WIDTH
  ========================================================= */

  useEffect(() => {

    const handleResize = () => {

      if (window.innerWidth >= 640) {
        setMenuOpen(false);
      }

    };


    window.addEventListener(
      "resize",
      handleResize
    );


    return () => {

      window.removeEventListener(
        "resize",
        handleResize
      );

    };

  }, []);


  return (

    <nav
      className="
        fixed

        top-0
        left-0

        w-full

        z-50

        bg-white/95

        backdrop-blur-md

        shadow-[0_2px_12px_rgba(0,0,0,0.06)]
      "
    >


      {/* =====================================================
          MAIN NAVBAR
      ===================================================== */}

      <div
        className="
          max-w-7xl

          mx-auto

          px-3
          sm:px-4
          md:px-6
          lg:px-8

          h-[68px]
          sm:h-20
          md:h-24

          flex

          items-center

          justify-between

          gap-2
        "
      >


        {/* =================================================
            WEBSITE LOGO
        ================================================= */}

        <a
          href="#home"
          className="
            flex

            flex-shrink-0

            items-center

            hover:opacity-80

            transition

            duration-300
          "
        >

          <img
            src="/logo.svg"
            alt="Dr. Bhagyashri's PhysioCare"

            className="
              h-[48px]

              sm:h-[55px]

              md:h-[62px]

              lg:h-[70px]

              w-auto

              object-contain

              block

              bg-transparent
            "
          />

        </a>


        {/* =================================================
            DESKTOP NAV LINKS

            IMPORTANT:
            sm:flex means Desktop Site on mobile will
            receive the complete navbar instead of menu.
        ================================================= */}

        <div
          className="
            hidden

            sm:flex

            items-center

            gap-3

            md:gap-5

            lg:gap-7

            flex-1

            justify-center
          "
        >

          {navLinks.map(
            ({ href, label }) => (

              <a
                key={href}
                href={href}

                className="
                  text-[11px]

                  md:text-sm

                  lg:text-base

                  text-slate-700

                  hover:text-teal-600

                  transition-colors

                  duration-300

                  font-medium

                  relative

                  group

                  whitespace-nowrap
                "
              >

                {label}


                {/* Underline */}

                <span
                  className="
                    absolute

                    -bottom-1

                    left-0

                    w-0

                    h-0.5

                    rounded-full

                    bg-gradient-to-r

                    from-teal-600

                    to-cyan-600

                    group-hover:w-full

                    transition-all

                    duration-300
                  "
                />

              </a>

            )
          )}

        </div>


        {/* =================================================
            RIGHT SIDE
        ================================================= */}

        <div
          className="
            flex

            items-center

            gap-1.5

            sm:gap-2

            md:gap-3

            lg:gap-4

            flex-shrink-0
          "
        >


          {/* =================================================
              SOCIAL ICONS
          ================================================= */}

          <div
            className="
              flex

              items-center

              gap-1.5

              sm:gap-2

              md:gap-2.5

              lg:gap-3
            "
          >


            {/* =================================================
                WHATSAPP
            ================================================= */}

            <a
              href="https://wa.me/+919322518895"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"

              className="
                w-5
                h-5

                sm:w-6
                sm:h-6

                flex

                items-center
                justify-center

                text-green-500

                opacity-90

                hover:opacity-100

                hover:scale-110

                transition-all

                duration-300
              "
            >

              <FaWhatsapp
                className="
                  w-4
                  h-4

                  sm:w-5
                  sm:h-5
                "
              />

            </a>


            {/* =================================================
                INSTAGRAM
            ================================================= */}

            <a
              href="https://www.instagram.com/drbhagyashrisphysiocare?igsh=MTRycWlocjhjcWE5Yw=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"

              className="
                w-5
                h-5

                sm:w-6
                sm:h-6

                flex

                items-center
                justify-center

                text-pink-500

                opacity-90

                hover:opacity-100

                hover:scale-110

                transition-all

                duration-300
              "
            >

              <FaInstagram
                className="
                  w-4
                  h-4

                  sm:w-5
                  sm:h-5
                "
              />

            </a>


            {/* =================================================
                GMAIL
            ================================================= */}

            <a
              href="mailto:drbhagyashrisalunkept@gmail.com"
              aria-label="Gmail"

              className="
                w-5
                h-5

                sm:w-6
                sm:h-6

                flex

                items-center
                justify-center

                opacity-90

                hover:opacity-100

                hover:scale-110

                transition-all

                duration-300
              "
            >

              <GmailIcon
                size={19}
              />

            </a>


            {/* =================================================
                YOUTUBE
                RIGHT OF GMAIL
            ================================================= */}

            <a
              href="https://youtube.com/@physiocare18?si=H9QicGVIeZN2LUwB"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"

              className="
                w-5
                h-5

                sm:w-6
                sm:h-6

                flex

                items-center
                justify-center

                text-red-500

                opacity-90

                hover:opacity-100

                hover:scale-110

                transition-all

                duration-300
              "
            >

              <FaYoutube
                className="
                  w-4
                  h-4

                  sm:w-5
                  sm:h-5
                "
              />

            </a>

          </div>


          {/* =================================================
              DIVIDER
          ================================================= */}

          <div
            className="
              hidden

              sm:block

              h-7

              w-px

              bg-slate-200

              ml-0.5
            "
          />


          {/* =================================================
              BOOK NOW

              Visible in Desktop Site mode.
          ================================================= */}

          <a
            href="#contact"

            className="
              hidden

              sm:inline-flex

              items-center
              justify-center

              gap-1.5

              bg-gradient-to-r

              from-teal-600

              to-cyan-600

              text-white

              px-3

              md:px-4

              lg:px-6

              py-2.5

              md:py-3

              rounded-xl

              text-[11px]

              md:text-sm

              lg:text-base

              font-bold

              shadow-[0_5px_15px_rgba(13,148,136,0.18)]

              hover:shadow-[0_9px_22px_rgba(13,148,136,0.28)]

              hover:-translate-y-0.5

              active:translate-y-0

              transition-all

              duration-300

              whitespace-nowrap
            "
          >

            <span>
              Book Now
            </span>


            <HiArrowRight
              className="
                w-3.5
                h-3.5

                md:w-4
                md:h-4

                transition-transform

                duration-300
              "
            />

          </a>


          {/* =================================================
              MOBILE MENU BUTTON

              Only appears on genuinely small mobile widths.
          ================================================= */}

          <button
            type="button"

            onClick={() =>
              setMenuOpen(
                (prev) => !prev
              )
            }

            aria-label={
              menuOpen
                ? "Close menu"
                : "Open menu"
            }

            className="
              sm:hidden

              w-9
              h-9

              flex

              items-center
              justify-center

              rounded-lg

              text-slate-700

              hover:text-teal-600

              hover:bg-teal-50

              transition
            "
          >

            {menuOpen ? (
              <HiX size={25} />
            ) : (
              <HiMenu size={25} />
            )}

          </button>

        </div>

      </div>


      {/* =====================================================
          MOBILE MENU

          Only for small mobile screens.
      ===================================================== */}

      <div
        className={`
          sm:hidden

          overflow-hidden

          transition-all

          duration-300

          ease-in-out

          ${
            menuOpen
              ? "max-h-[500px] opacity-100"
              : "max-h-0 opacity-0"
          }

          bg-white

          border-t

          border-slate-100/50
        `}
      >

        <div
          className="
            px-4

            pb-5

            pt-3

            flex

            flex-col

            gap-1
          "
        >


          {/* MOBILE NAVIGATION LINKS */}

          {navLinks.map(
            ({ href, label }) => (

              <a
                key={href}

                href={href}

                onClick={() =>
                  setMenuOpen(false)
                }

                className="
                  text-slate-700

                  hover:text-teal-600

                  hover:bg-teal-50

                  py-2.5

                  px-3

                  rounded-lg

                  text-base

                  font-medium

                  transition-colors
                "
              >

                {label}

              </a>

            )
          )}


          {/* DIVIDER */}

          <div
            className="
              border-t

              border-slate-100

              my-2.5
            "
          />


          {/* MOBILE BOOK NOW */}

          <a
            href="#contact"

            onClick={() =>
              setMenuOpen(false)
            }

            className="
              mt-2

              w-full

              flex

              items-center
              justify-center

              gap-2

              bg-gradient-to-r

              from-teal-600

              to-cyan-600

              text-white

              py-3

              rounded-lg

              text-base

              font-semibold

              shadow-sm

              hover:shadow-md

              transition-all

              duration-300
            "
          >

            <span>
              Book Now
            </span>

            <HiArrowRight
              className="
                w-5
                h-5
              "
            />

          </a>

        </div>

      </div>

    </nav>
  );
}