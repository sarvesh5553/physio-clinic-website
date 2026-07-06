"use client";

import { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaClock, FaCheck, FaExclamationCircle } from "react-icons/fa";

interface ContactInfo {
  icon: React.ReactNode;
  title: string;
  content: string | React.ReactNode;
}

interface FormData {
  fullname: string;
  email: string;
  phone: string;
  address: string;
  concern: string;
}

interface FormStatus {
  type: "success" | "error" | null;
  message: string;
}

const ContactInfoCard = ({ icon, title, content }: ContactInfo) => (
  <div className="flex items-start gap-4 p-4 rounded-xl transition-all duration-300 hover:bg-slate-50">
    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 text-white flex items-center justify-center shrink-0 shadow-[0_4px_16px_-2px_rgba(13,148,136,0.35)] group-hover:shadow-lg">
      {icon}
    </div>
    <div className="flex-1">
      <h4 className="font-semibold text-slate-900 text-sm mb-1">{title}</h4>
      <div className="text-slate-600 text-sm leading-relaxed">{content}</div>
    </div>
  </div>
);

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    fullname: "",
    email: "",
    phone: "",
    address: "",
    concern: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<FormStatus>({ type: null, message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.fullname.trim()) return "Please enter your full name";
    if (!formData.email.trim()) return "Please enter your email address";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return "Please enter a valid email";
    if (!formData.phone.trim()) return "Please enter your phone number";
    if (!/^\d{10,}$/.test(formData.phone.replace(/\D/g, ""))) return "Please enter a valid phone number";
    if (!formData.address.trim())
    return "Please enter your residential address";
    if (!formData.concern.trim()) return "Please describe your concern";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const error = validateForm();
    if (error) {
      setStatus({ type: "error", message: error });
      return;
    }

    setLoading(true);
    setStatus({ type: null, message: "" });

    try {
  const response = await fetch("/api/appointments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fullName: formData.fullname,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      concern: formData.concern,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  setStatus({
    type: "success",
    message: "✓ Appointment request received! We'll contact you shortly.",
  });

  setFormData({
    fullname: "",
    email: "",
    phone: "",
    address: "",
    concern: "",
  });

  setTimeout(() => {
    setStatus({
      type: null,
      message: "",
    });
  }, 5000);
} catch (error) {
  setStatus({
    type: "error",
    message:
      error instanceof Error
        ? error.message
        : "Failed to submit appointment.",
  });
} finally {
  setLoading(false);
}
  };

  return (
    <section id="contact" className="bg-gradient-to-b from-slate-50 via-white to-slate-50 py-15">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header Section */}
        {/* Heading */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center justify-center mb-4">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-teal-700 bg-teal-50 px-4 py-2 rounded-full">
              Book Now
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            Schedule Your <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Appointment</span>
          </h2>

          <p className="text-slate-600 max-w-2xl mx-auto text-base leading-relaxed">
            Connect with our professional team and begin your personalized recovery journey. We're here to support your wellness goals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 mb-8">Get In Touch</h3>

            <div className="space-y-3">
              <ContactInfoCard
                icon={<FaPhoneAlt size={18} />}
                title="Phone"
                content={
                  <a href="tel:+919322518895" className="text-teal-600 hover:text-teal-700 font-medium transition">
                    +91 9322518895
                  </a>
                }
              />

              <ContactInfoCard
                icon={<FaEnvelope size={18} />}
                title="Email"
                content={
                  <a href="mailto:drbhagyashrisalunkept@gmail.com" className="text-teal-600 hover:text-teal-700 font-medium transition break-all">
                    drbhagyashrisalunkept@gmail.com
                  </a>
                }
              />

              <ContactInfoCard
                icon={<FaClock size={18} />}
                title="Online Consultation Hours"
                content={
                  <div>
                    <p className="font-medium text-slate-900">Mon – Sat</p>
                    <p className="text-slate-600">4:00 PM – 9:00 PM (Evening)</p>
                  </div>
                }
              />
            </div>

            {/* Trust Badge */}
            <div className="mt-8 p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl border border-teal-100">
              <p className="text-sm text-slate-700">
                <span className="font-semibold text-teal-700">✓ Professional Care</span>
                <br />
                Expert physiotherapy consultation with personalized treatment plans.
                <br />
                Trusted by patients for safe, evidence-based recovery support.
              </p>
            </div>
          </div>

          {/* Appointment Form */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 rounded-2xl blur-lg"></div>
            <div className="relative bg-white rounded-2xl p-4 md:p-6 border border-slate-100 shadow-[0_2px_8px_rgba(15,23,42,0.08)] flex flex-col">
              <form onSubmit={handleSubmit} className="space-y-2 md:space-y-2.5 flex flex-col">
                {/* Name Field */}
                <div>
                  <label htmlFor="fullname" className="block text-sm font-semibold text-slate-900 mb-2">
                    Full Name <span className="text-teal-600">*</span>
                  </label>
                  <input
                    id="fullname"
                    name="fullname"
                    type="text"
                    value={formData.fullname}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 text-sm transition-all duration-200 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                    disabled={loading}
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-2">
                    Email Address <span className="text-teal-600">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 text-sm transition-all duration-200 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                    disabled={loading}
                  />
                </div>

                {/* Phone Field */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-slate-900 mb-2">
                    Phone Number <span className="text-teal-600">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 text-sm transition-all duration-200 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                    disabled={loading}
                  />
                </div>

                {/* Address */}
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-semibold text-slate-900 mb-2">
                    Residential Address{" "}
                    <span className="text-teal-600">*</span>
                  </label>

                  <textarea
                   id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your complete residential address"
                    rows={1}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 text-sm resize-none transition-all duration-200 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                    disabled={loading}
                  />
                </div>

                {/* Concern Field */}
                <div>
                  <label htmlFor="concern" className="block text-sm font-semibold text-slate-900 mb-2">
                    Your Concern <span className="text-teal-600">*</span>
                  </label>
                  <textarea
                    id="concern"
                    name="concern"
                    value={formData.concern}
                    onChange={handleChange}
                    placeholder="Describe your health concern or reason for appointment..."
                    rows={3}
                    className="w-full px-3 py-1 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 text-xs md:text-sm resize-none transition-all duration-200 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                    disabled={loading}
                  />
                </div>

                {/* Status Messages */}
                {status.type && (
                  <div
                    className={`flex items-start gap-3 p-4 rounded-lg ${
                      status.type === "success"
                        ? "bg-green-50 border border-green-200"
                        : "bg-red-50 border border-red-200"
                    }`}
                  >
                    <div
                      className={`flex-shrink-0 mt-0.5 ${
                        status.type === "success" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {status.type === "success" ? (
                        <FaCheck size={16} />
                      ) : (
                        <FaExclamationCircle size={16} />
                      )}
                    </div>
                    <p
                      className={`text-sm font-medium ${
                        status.type === "success"
                          ? "text-green-800"
                          : "text-red-800"
                      }`}
                    >
                      {status.message}
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white py-2 md:py-2.5 px-4 rounded-lg font-semibold text-xs md:text-sm shadow-[0_8px_20px_-6px_rgba(13,148,136,0.5)] hover:shadow-[0_12px_28px_-6px_rgba(13,148,136,0.6)] transition-all duration-300 disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    "Book Appointment"
                  )}
                </button>

                <p className="text-xs text-slate-500 text-center">
                  Response within 24 hours
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
