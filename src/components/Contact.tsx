"use client";

import { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaClock, FaCheck, FaExclamationCircle, FaLock, FaCreditCard, FaHeadset } from "react-icons/fa";

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
  
  // Payment states - updated default amount to 510
  const [isPaid, setIsPaid] = useState(false);
  const [paying, setPaying] = useState(false);
  const [paidAmount, setPaidAmount] = useState<number>(510);

  // Professional Modal states - updated initial input to "510"
  const [showFeeModal, setShowFeeModal] = useState(false);
  const [customFeeInput, setCustomFeeInput] = useState("510");

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
    if (!formData.address.trim()) return "Please enter your residential address";
    if (!formData.concern.trim()) return "Please describe your concern";
    return null;
  };

  // Load Razorpay checkout script dynamically
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Triggered when user clicks the main payment trigger button
  const handleOpenFeeModal = () => {
    const error = validateForm();
    if (error) {
      setStatus({ type: "error", message: error });
      return;
    }
    setStatus({ type: null, message: "" });
    setShowFeeModal(true);
  };

  // Executed after confirming custom fee from the modal
  const handleProceedToPayment = async () => {
    const parsedAmount = Number(customFeeInput);
    
    // Enforce strict minimum check of ₹510
    if (isNaN(parsedAmount) || parsedAmount < 510) {
      setStatus({ type: "error", message: "The minimum consultation fee is ₹510. You can increase it if you wish." });
      return;
    }

    setShowFeeModal(false);
    setPaying(true);
    setStatus({ type: null, message: "" });

    try {
      const res = await loadRazorpayScript();
      if (!res) {
        setStatus({ type: "error", message: "Razorpay SDK failed to load. Check your connection." });
        setPaying(false);
        return;
      }

      // 1. Call your backend route to create the order securely
      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: parsedAmount }),
      });

      const responseText = await response.text();
      let data;
      try {
        data = responseText ? JSON.parse(responseText) : {};
      } catch (e) {
        throw new Error(`Server returned invalid response: ${responseText.substring(0, 100)}`);
      }

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to initiate payment order.");
      }

      const { order } = data;

      // 2. Setup Razorpay checkout options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Physiotherapy Consultation",
        description: `Consultation fee for ${formData.fullname}`,
        order_id: order.id,
        handler: async function (response: any) {
          // 3. Send payment details to verify-payment route for backend signature check
          try {
            const verifyRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              setIsPaid(true);
              setPaidAmount(parsedAmount);
              setStatus({
                type: "success",
                message: `✓ Payment of ₹${parsedAmount} verified successfully! You can now book your appointment.`,
              });
            } else {
              setStatus({ type: "error", message: "Payment verification failed. Security signature mismatch." });
            }
          } catch (err) {
            setStatus({ type: "error", message: "Error verifying payment signature." });
          } finally {
            setPaying(false);
          }
        },
        modal: {
          ondismiss: function () {
            setPaying(false);
          },
        },
        prefill: {
          name: formData.fullname,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#0d9488",
        },
      };

      const paymentWindow = new (window as any).Razorpay(options);
      paymentWindow.open();

      paymentWindow.on("payment.failed", function () {
        setPaying(false);
        setStatus({ type: "error", message: "Payment failed or was cancelled. Please try again." });
      });

    } catch (err) {
      setPaying(false);
      setStatus({
        type: "error",
        message: err instanceof Error ? err.message : "Payment initialization failed.",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!isPaid) {
      setStatus({ type: "error", message: "Please complete and verify the payment first." });
      return;
    }

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
          amountPaid: paidAmount,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setStatus({
        type: "success",
        message: "✓ Appointment booked successfully! We'll contact you shortly.",
      });

      setFormData({
        fullname: "",
        email: "",
        phone: "",
        address: "",
        concern: "",
      });
      setIsPaid(false);
      setPaidAmount(510);
      setCustomFeeInput("510");

      setTimeout(() => {
        setStatus({ type: null, message: "" });
      }, 5000);
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Failed to submit appointment.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="bg-gradient-to-b from-slate-50 via-white to-slate-50 py-15">
      <div className="max-w-6xl mx-auto px-6">
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
                title="Consultation Hours (Online / Offline)"
                content={
                  <div>
                    <p className="font-medium text-slate-900">Mon – Sat</p>
                    <p className="text-slate-600">10:00 AM – 08:00 PM  (On OPD basis) </p>
                  </div>
                }
              />

              <div className="flex items-start gap-4 p-4 rounded-xl transition-all duration-300 hover:bg-slate-50">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 text-white flex items-center justify-center shrink-0 shadow-[0_4px_16px_-2px_rgba(13,148,136,0.35)] group-hover:shadow-lg">
                  <FaHeadset size={18} />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-900 text-sm mb-1">Have More Questions?</h4>
                  <div className="text-slate-600 text-sm leading-relaxed">
                    For further enquiries or custom support, feel free to contact us anytime via phone or email.
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl border border-teal-100">
              <p className="text-sm text-slate-700">
                <span className="font-semibold text-teal-700">✓ Professional Care</span>
                <br />
                Expert physiotherapy consultation with personalized treatment plans.
                <br />
                Trusted by patients for safe, evidence-based recovery support.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 rounded-2xl blur-lg"></div>
            <div className="relative bg-white rounded-2xl p-4 md:p-6 border border-slate-100 shadow-[0_2px_8px_rgba(15,23,42,0.08)] flex flex-col">
              <form onSubmit={handleSubmit} className="space-y-2 md:space-y-2.5 flex flex-col">
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
                    disabled={loading || isPaid}
                  />
                </div>

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
                    disabled={loading || isPaid}
                  />
                </div>

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
                    disabled={loading || isPaid}
                  />
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-semibold text-slate-900 mb-2">
                    Residential Address <span className="text-teal-600">*</span>
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your complete residential address"
                    rows={1}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 text-sm resize-none transition-all duration-200 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                    disabled={loading || isPaid}
                  />
                </div>

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
                    disabled={loading || isPaid}
                  />
                </div>

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
                      {status.type === "success" ? <FaCheck size={16} /> : <FaExclamationCircle size={16} />}
                    </div>
                    <p
                      className={`text-sm font-medium ${
                        status.type === "success" ? "text-green-800" : "text-red-800"
                      }`}
                    >
                      {status.message}
                    </p>
                  </div>
                )}

                {!isPaid ? (
                  <button
                    type="button"
                    onClick={handleOpenFeeModal}
                    disabled={paying}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white py-2 md:py-2.5 px-4 rounded-lg font-semibold text-xs md:text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-md cursor-pointer"
                  >
                    {paying ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Connecting to Payment Gateway...
                      </span>
                    ) : (
                      <>
                        <FaCreditCard size={15} /> Pay Consultation Fee & Verify
                      </>
                    )}
                  </button>
                ) : (
                  <div className="w-full bg-teal-50 border border-teal-200 text-teal-800 py-2 px-3 rounded-lg text-xs font-medium text-center flex items-center justify-center gap-2">
                    <FaCheck size={14} className="text-teal-600" /> Payment of ₹{paidAmount} Verified Successfully
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || !isPaid}
                  className={`w-full py-2 md:py-2.5 px-4 rounded-lg font-semibold text-xs md:text-sm transition-all duration-300 ${
                    isPaid
                      ? "bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white shadow-[0_8px_20px_-6px_rgba(13,148,136,0.5)] hover:shadow-[0_12px_28px_-6px_rgba(13,148,136,0.6)] cursor-pointer"
                      : "bg-slate-200 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Submitting...
                    </span>
                  ) : isPaid ? (
                    "Book Appointment"
                  ) : (
                    <span className="flex items-center justify-center gap-1.5">
                      <FaLock size={12} /> Complete Payment to Unlock Booking
                    </span>
                  )}
                </button>

                <p className="text-xs text-slate-500 text-center">Response within 24 hours</p>
              </form>
            </div>
          </div>
        </div>

        {/* Professional Custom Fee Modal */}
        {showFeeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl transition-all border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-1">Enter Consultation Fee</h3>
              <p className="text-sm text-slate-500 mb-4">Minimum consultation fee is ₹510. You can increase the amount if you wish:</p>
              
              <input
                type="number"
                min="510"
                value={customFeeInput}
                onChange={(e) => setCustomFeeInput(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 text-lg font-medium focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                autoFocus
              />

              {Number(customFeeInput) < 510 && (
                <p className="text-xs text-red-500 font-medium mt-1">Amount cannot be less than ₹510.</p>
              )}

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowFeeModal(false)}
                  className="rounded-lg px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={Number(customFeeInput) < 510}
                  onClick={handleProceedToPayment}
                  className="rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-700 shadow-md transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue to Payment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}