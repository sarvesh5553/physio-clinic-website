"use client";

import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/+919322518895"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact us on WhatsApp"
      title="Contact us on WhatsApp"
      className="
        fixed
        bottom-6
        right-6

        flex
        h-12
        w-12

        items-center
        justify-center

        rounded-full

        bg-green-500

        text-white

        shadow-lg

        transition-all
        duration-300

        hover:scale-110
        hover:shadow-xl

        z-50
      "
    >
      <FaWhatsapp
        className="
          h-6
          w-6
        "
      />
    </a>
  );
}