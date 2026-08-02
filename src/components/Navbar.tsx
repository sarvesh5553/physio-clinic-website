"use client";

import { useEffect, useState } from "react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 50) {
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY) {
        setShowNavbar(false);
        setMenuOpen(false); // Close menu on scroll down
      } else {
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuOpen && !(e.target as HTMLElement)?.closest("nav")) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#conditions", label: "Conditions" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#contact", label: "Contact" },
    { href: "#faq", label: "FAQ's" },
  ];

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-50
        bg-white/95 backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.06)]
        transition-transform duration-300
        ${showNavbar ? "translate-y-0" : "-translate-y-full"}
      `}
    >
      {/* ── Top Bar ── */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex-shrink-0 hover:opacity-80 transition">
          <img
            src="/logo.svg"
            alt="PhysioCare"
            className="h-12 sm:h-14 lg:h-16 w-auto object-contain"
          />
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-sm lg:text-base text-slate-700 hover:text-teal-600 transition-colors font-medium relative group"
            >
              {label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-600 to-cyan-600 group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
        </div>

        {/* Right Side — Social + CTA */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Social Icons — hidden on very small screens */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="https://wa.me/+919322518895"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="text-green-500 hover:scale-110 transition-all duration-300 hover:drop-shadow-lg"
            >
              <FaWhatsapp size={20} />
            </a>

            <a
              href="https://instagram.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-pink-500 hover:scale-110 transition-all duration-300 hover:drop-shadow-lg"
            >
              <FaInstagram size={20} />
            </a>

            <a
              href="mailto:drbhagyashrisalunkept@gmail.com"
              aria-label="Gmail"
              className="opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-300 flex items-center justify-center hover:drop-shadow-lg"
            >
              <img
                src="/gmail-logo.png"
                alt="Gmail"
                className="w-5 h-5 object-contain"
              />
            </a>
          </div>

          {/* Book Now — hidden on mobile, shown on sm+ */}
          <a
            href="#contact"
            className="hidden sm:inline-flex bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-4 lg:px-6 py-2.5 rounded-lg text-sm lg:text-base hover:shadow-[0_8px_16px_rgba(13,148,136,0.3)] hover:-translate-y-0.5 transition-all duration-300 font-semibold"
          >
            Book Now
          </a>
          
          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="md:hidden text-slate-700 hover:text-teal-600 transition p-1.5"
          >
            {menuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Dropdown Menu ── */}
      <div
        className={`
          md:hidden overflow-hidden transition-all duration-300 ease-in-out
          ${menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}
          bg-white border-t border-slate-100/50
        `}
      >
        <div className="px-4 pb-5 pt-3 flex flex-col gap-1">
          {/* Nav Links */}
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="text-slate-700 hover:text-teal-600 hover:bg-teal-50 py-2.5 px-3 rounded-lg text-base font-medium transition-colors"
            >
              {label}
            </a>
          ))}

          {/* Divider */}
          <div className="border-t border-slate-100 my-2.5" />

          {/* Social Icons Row */}
          <div className="flex items-center gap-3 px-3 py-2">
            <a
              href="https://wa.me/+919322518895"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="text-green-500 hover:scale-110 transition-all duration-300 hover:drop-shadow-lg"
            >
              <FaWhatsapp size={20} />
            </a>
            <a
              href="https://instagram.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-pink-500 hover:scale-110 transition-all duration-300 hover:drop-shadow-lg"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="mailto:drbhagyashrisalunkept@gmail.com"
              aria-label="Gmail"
              className="opacity-70 hover:opacity-100 transition-all duration-300 flex items-center hover:drop-shadow-lg"
            >
              <img
                src="/gmail-logo.png"
                alt="Gmail"
                className="w-5 h-5 object-contain"
              />
            </a>
          </div>

          {/* Book Now CTA */}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-3 rounded-lg text-center text-base font-semibold hover:shadow-[0_8px_16px_rgba(13,148,136,0.3)] hover:-translate-y-0.5 transition-all duration-300"
          >
            Book Now
          </a>

          <a
          href="/admin/login"
          onClick={() => setMenuOpen(false)}
          className="text-center text-sm text-slate-500 hover:text-teal-600 py-2"
          >
          Admin Panel
          </a>
        </div>
      </div>
    </nav>
  );
}