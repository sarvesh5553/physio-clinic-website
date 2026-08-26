"use client";

import { useState } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaCheck,
  FaExclamationCircle,
  FaLock,
  FaCreditCard,
  FaHeadset,
} from "react-icons/fa";

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

/* ============================================================
   COMPACT CONTACT INFO CARD
   ============================================================ */

const ContactInfoCard = ({
  icon,
  title,
  content,
}: ContactInfo) => (
  <div
    className="
      flex
      items-center
      gap-3
      rounded-xl
      p-2.5
      transition-all
      duration-300
      hover:bg-slate-50
      sm:gap-4
      sm:p-4
    "
  >
    <div
      className="
        flex
        h-10
        w-10
        shrink-0
        items-center
        justify-center
        rounded-lg
        bg-gradient-to-br
        from-teal-500
        to-cyan-600
        text-white
        shadow-[0_4px_14px_-3px_rgba(13,148,136,0.3)]
        sm:h-12
        sm:w-12
        sm:rounded-xl
      "
    >
      {icon}
    </div>

    <div className="min-w-0 flex-1">
      <h4
        className="
          mb-0.5
          text-xs
          font-semibold
          text-slate-900
          sm:mb-1
          sm:text-sm
        "
      >
        {title}
      </h4>

      <div
        className="
          text-xs
          leading-snug
          text-slate-600
          sm:text-sm
          sm:leading-relaxed
        "
      >
        {content}
      </div>
    </div>
  </div>
);

/* ============================================================
   CONTACT COMPONENT
   ============================================================ */

export default function Contact() {
  const [formData, setFormData] =
    useState<FormData>({
      fullname: "",
      email: "",
      phone: "",
      address: "",
      concern: "",
    });

  const [loading, setLoading] =
    useState(false);

  const [status, setStatus] =
    useState<FormStatus>({
      type: null,
      message: "",
    });

  /* ==========================================================
     PAYMENT STATES
     ========================================================== */

  const [isPaid, setIsPaid] =
    useState(false);

  const [paying, setPaying] =
    useState(false);

  const [paidAmount, setPaidAmount] =
    useState<number>(510);

  /* ==========================================================
     FEE MODAL
     ========================================================== */

  const [showFeeModal, setShowFeeModal] =
    useState(false);

  const [customFeeInput, setCustomFeeInput] =
    useState("510");

  /* ==========================================================
     FORM CHANGE
     ========================================================== */

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const {
      name,
      value,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ==========================================================
     FORM VALIDATION
     ========================================================== */

  const validateForm = () => {
    if (!formData.fullname.trim()) {
      return "Please enter your full name";
    }

    if (!formData.email.trim()) {
      return "Please enter your email address";
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email
      )
    ) {
      return "Please enter a valid email";
    }

    if (!formData.phone.trim()) {
      return "Please enter your phone number";
    }

    if (
      !/^\d{10,}$/.test(
        formData.phone.replace(/\D/g, "")
      )
    ) {
      return "Please enter a valid phone number";
    }

    if (!formData.address.trim()) {
      return "Please enter your residential address";
    }

    if (!formData.concern.trim()) {
      return "Please describe your concern";
    }

    return null;
  };

  /* ==========================================================
     LOAD RAZORPAY
     ========================================================== */

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script =
        document.createElement("script");

      script.src =
        "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () =>
        resolve(true);

      script.onerror = () =>
        resolve(false);

      document.body.appendChild(script);
    });
  };

  /* ==========================================================
     OPEN FEE MODAL
     ========================================================== */

  const handleOpenFeeModal = () => {
    const error = validateForm();

    if (error) {
      setStatus({
        type: "error",
        message: error,
      });

      return;
    }

    setStatus({
      type: null,
      message: "",
    });

    setShowFeeModal(true);
  };

  /* ==========================================================
     PROCEED TO PAYMENT
     ========================================================== */

  const handleProceedToPayment =
    async () => {
      const parsedAmount =
        Number(customFeeInput);

      if (
        isNaN(parsedAmount) ||
        parsedAmount < 510
      ) {
        setStatus({
          type: "error",
          message:
            "The minimum consultation fee is ₹510. You can increase it if you wish.",
        });

        return;
      }

      setShowFeeModal(false);
      setPaying(true);

      setStatus({
        type: null,
        message: "",
      });

      try {
        const res =
          await loadRazorpayScript();

        if (!res) {
          setStatus({
            type: "error",
            message:
              "Razorpay SDK failed to load. Check your connection.",
          });

          setPaying(false);
          return;
        }

        /* ====================================================
           CREATE PAYMENT ORDER
           ==================================================== */

        const response =
          await fetch(
            "/api/create-order",
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify({
                amount: parsedAmount,
              }),
            }
          );

        const responseText =
          await response.text();

        let data;

        try {
          data = responseText
            ? JSON.parse(responseText)
            : {};
        } catch {
          throw new Error(
            `Server returned invalid response: ${responseText.substring(
              0,
              100
            )}`
          );
        }

        if (
          !response.ok ||
          !data.success
        ) {
          throw new Error(
            data.message ||
              "Failed to initiate payment order."
          );
        }

        const { order } = data;

        /* ====================================================
           RAZORPAY OPTIONS
           ==================================================== */

        const options = {
          key:
            process.env
              .NEXT_PUBLIC_RAZORPAY_KEY_ID,

          amount:
            order.amount,

          currency:
            order.currency,

          name:
            "Physiotherapy Consultation",

          description:
            `Consultation fee for ${formData.fullname}`,

          order_id:
            order.id,

          handler:
            async function (
              response: any
            ) {
              try {
                const verifyRes =
                  await fetch(
                    "/api/verify-payment",
                    {
                      method: "POST",
                      headers: {
                        "Content-Type":
                          "application/json",
                      },
                      body: JSON.stringify({
                        razorpay_order_id:
                          response.razorpay_order_id,

                        razorpay_payment_id:
                          response.razorpay_payment_id,

                        razorpay_signature:
                          response.razorpay_signature,
                      }),
                    }
                  );

                const verifyData =
                  await verifyRes.json();

                if (
                  verifyData.success
                ) {
                  setIsPaid(true);

                  setPaidAmount(
                    parsedAmount
                  );

                  setStatus({
                    type: "success",
                    message: `✓ Payment of ₹${parsedAmount} verified successfully! You can now book your appointment.`,
                  });
                } else {
                  setStatus({
                    type: "error",
                    message:
                      "Payment verification failed. Security signature mismatch.",
                  });
                }
              } catch {
                setStatus({
                  type: "error",
                  message:
                    "Error verifying payment signature.",
                });
              } finally {
                setPaying(false);
              }
            },

          modal: {
            ondismiss:
              function () {
                setPaying(false);
              },
          },

          prefill: {
            name:
              formData.fullname,

            email:
              formData.email,

            contact:
              formData.phone,
          },

          theme: {
            color: "#0d9488",
          },
        };

        const paymentWindow =
          new (window as any).Razorpay(
            options
          );

        paymentWindow.open();

        paymentWindow.on(
          "payment.failed",
          function () {
            setPaying(false);

            setStatus({
              type: "error",
              message:
                "Payment failed or was cancelled. Please try again.",
            });
          }
        );
      } catch (err) {
        setPaying(false);

        setStatus({
          type: "error",
          message:
            err instanceof Error
              ? err.message
              : "Payment initialization failed.",
        });
      }
    };

  /* ==========================================================
     SUBMIT APPOINTMENT
     ========================================================== */

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!isPaid) {
      setStatus({
        type: "error",
        message:
          "Please complete and verify the payment first.",
      });

      return;
    }

    const error =
      validateForm();

    if (error) {
      setStatus({
        type: "error",
        message: error,
      });

      return;
    }

    setLoading(true);

    setStatus({
      type: null,
      message: "",
    });

    try {
      const response =
        await fetch(
          "/api/appointments",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              fullName:
                formData.fullname,

              email:
                formData.email,

              phone:
                formData.phone,

              address:
                formData.address,

              concern:
                formData.concern,

              amountPaid:
                paidAmount,
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Something went wrong"
        );
      }

      setStatus({
        type: "success",
        message:
          "✓ Appointment booked successfully! We'll contact you shortly.",
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

  /* ==========================================================
     UI
     ========================================================== */

  return (
    <section
      id="contact"
      className="
        bg-gradient-to-b
        from-slate-50
        via-white
        to-slate-50

        py-8
        sm:py-12
        md:py-16
      "
    >
      <div
        className="
          mx-auto
          max-w-6xl
          px-4
          sm:px-6
        "
      >

        {/* =====================================================
            HEADER
            ===================================================== */}

        <div
          className="
            mb-7
            text-center
            sm:mb-10
            md:mb-14
          "
        >
          <div
            className="
              mb-2
              inline-flex
              items-center
              justify-center
              sm:mb-4
            "
          >
            <span
              className="
                rounded-full
                bg-teal-50
                px-3
                py-1.5
                text-[10px]
                font-bold
                uppercase
                tracking-[0.2em]
                text-teal-700
                sm:px-4
                sm:py-2
                sm:text-xs
              "
            >
              Book Now
            </span>
          </div>

          <h2
            className="
              text-3xl
              font-bold
              tracking-tight
              text-slate-900
              sm:text-4xl
              md:text-5xl
            "
          >
            Schedule Your{" "}

            <span
              className="
                bg-gradient-to-r
                from-teal-600
                to-cyan-600
                bg-clip-text
                text-transparent
              "
            >
              Appointment
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-2
              max-w-2xl
              text-sm
              leading-relaxed
              text-slate-600
              sm:mt-4
              sm:text-base
            "
          >
            Begin your healing experience
            with us today!
          </p>
        </div>

        {/* =====================================================
            MAIN CONTACT GRID
            ===================================================== */}

        <div
          className="
            mx-auto
            grid
            max-w-5xl
            gap-5
            md:grid-cols-2
            md:gap-8
          "
        >

          {/* ===================================================
              LEFT SIDE
              =================================================== */}

          <div
            className="
              space-y-1
              sm:space-y-2
            "
          >
            <h3
              className="
                mb-3
                text-lg
                font-bold
                text-slate-900
                sm:mb-6
                sm:text-xl
              "
            >
              Get In Touch
            </h3>

            <div
              className="
                rounded-2xl
                border
                border-slate-100
                bg-white
                p-2
                shadow-[0_2px_10px_rgba(15,23,42,0.05)]
                sm:border-0
                sm:bg-transparent
                sm:p-0
                sm:shadow-none
              "
            >

              {/* PHONE */}

              <ContactInfoCard
                icon={
                  <FaPhoneAlt
                    size={16}
                  />
                }
                title="Phone"
                content={
                  <a
                    href="tel:+919322518895"
                    className="
                      font-medium
                      text-teal-600
                      hover:text-teal-700
                    "
                  >
                    +91 9322518895
                  </a>
                }
              />

              {/* EMAIL */}

              <ContactInfoCard
                icon={
                  <FaEnvelope
                    size={16}
                  />
                }
                title="Email"
                content={
                  <a
                    href="mailto:drbhagyashrisalunkept@gmail.com"
                    className="
                      break-all
                      font-medium
                      text-teal-600
                      hover:text-teal-700
                    "
                  >
                    drbhagyashrisalunkept@gmail.com
                  </a>
                }
              />

              {/* HOURS */}

              <ContactInfoCard
                icon={
                  <FaClock
                    size={16}
                  />
                }
                title="Consultation Hours"
                content={
                  <div>
                    <span className="font-medium text-slate-800">
                      Mon – Sat
                    </span>

                    <span className="ml-2 text-slate-600">
                      10:00 AM – 08:00 PM
                    </span>
                  </div>
                }
              />

              {/* QUESTIONS */}

              <div
                className="
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  p-2.5
                  sm:gap-4
                  sm:p-4
                "
              >
                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-gradient-to-br
                    from-teal-500
                    to-cyan-600
                    text-white
                    shadow-[0_4px_14px_-3px_rgba(13,148,136,0.3)]
                    sm:h-12
                    sm:w-12
                    sm:rounded-xl
                  "
                >
                  <FaHeadset
                    size={16}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h4
                    className="
                      text-xs
                      font-semibold
                      text-slate-900
                      sm:text-sm
                    "
                  >
                    Have More Questions?
                  </h4>

                  <p
                    className="
                      mt-0.5
                      text-xs
                      leading-snug
                      text-slate-600
                      sm:text-sm
                    "
                  >
                    Contact us anytime via
                    phone or email.
                  </p>
                </div>
              </div>
            </div>

            {/* =================================================
                PROFESSIONAL CARE BOX
                ================================================= */}

            <div
              className="
                mt-2
                rounded-xl
                border
                border-teal-100
                bg-gradient-to-r
                from-teal-50
                to-cyan-50
                px-3
                py-2.5
                sm:mt-5
                sm:rounded-xl
                sm:p-4
              "
            >
              <p
                className="
                  text-xs
                  leading-relaxed
                  text-slate-700
                  sm:text-sm
                "
              >
                <span
                  className="
                    font-semibold
                    text-teal-700
                  "
                >
                  ✓ Professional Care
                </span>

                <span className="mx-1">
                  —
                </span>

                Expert physiotherapy consultation
                with personalized treatment plans.
              </p>
            </div>
          </div>

          {/* ===================================================
              RIGHT SIDE — BOOKING FORM
              =================================================== */}

          <div className="relative">

            <div
              className="
                absolute
                -inset-1
                rounded-2xl
                bg-gradient-to-r
                from-teal-500/10
                to-cyan-500/10
                blur-lg
              "
            />

            <div
              className="
                relative
                rounded-2xl
                border
                border-slate-100
                bg-white

                p-3
                shadow-[0_2px_8px_rgba(15,23,42,0.08)]

                sm:p-5
                md:p-6
              "
            >

              <form
                onSubmit={handleSubmit}
                className="
                  space-y-2
                  sm:space-y-2.5
                "
              >

                {/* =================================================
                    FULL NAME
                    ================================================= */}

                <div>
                  <label
                    htmlFor="fullname"
                    className="
                      mb-1
                      block
                      text-xs
                      font-semibold
                      text-slate-900
                      sm:mb-2
                      sm:text-sm
                    "
                  >
                    Full Name{" "}

                    <span className="text-teal-600">
                      *
                    </span>
                  </label>

                  <input
                    id="fullname"
                    name="fullname"
                    type="text"
                    value={
                      formData.fullname
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="John Doe"
                    className="
                      w-full
                      rounded-lg
                      border
                      border-slate-200
                      bg-white
                      px-3
                      py-2.5
                      text-xs
                      text-slate-900
                      placeholder-slate-400
                      outline-none
                      transition-all
                      focus:border-teal-500
                      focus:ring-2
                      focus:ring-teal-100
                      sm:px-4
                      sm:py-3
                      sm:text-sm
                    "
                    disabled={
                      loading ||
                      isPaid
                    }
                  />
                </div>

                {/* =================================================
                    EMAIL
                    ================================================= */}

                <div>
                  <label
                    htmlFor="email"
                    className="
                      mb-1
                      block
                      text-xs
                      font-semibold
                      text-slate-900
                      sm:mb-2
                      sm:text-sm
                    "
                  >
                    Email Address{" "}

                    <span className="text-teal-600">
                      *
                    </span>
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={
                      formData.email
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="john@example.com"
                    className="
                      w-full
                      rounded-lg
                      border
                      border-slate-200
                      bg-white
                      px-3
                      py-2.5
                      text-xs
                      text-slate-900
                      placeholder-slate-400
                      outline-none
                      transition-all
                      focus:border-teal-500
                      focus:ring-2
                      focus:ring-teal-100
                      sm:px-4
                      sm:py-3
                      sm:text-sm
                    "
                    disabled={
                      loading ||
                      isPaid
                    }
                  />
                </div>

                {/* =================================================
                    PHONE
                    ================================================= */}

                <div>
                  <label
                    htmlFor="phone"
                    className="
                      mb-1
                      block
                      text-xs
                      font-semibold
                      text-slate-900
                      sm:mb-2
                      sm:text-sm
                    "
                  >
                    Phone Number{" "}

                    <span className="text-teal-600">
                      *
                    </span>
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={
                      formData.phone
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="+91 98765 43210"
                    className="
                      w-full
                      rounded-lg
                      border
                      border-slate-200
                      bg-white
                      px-3
                      py-2.5
                      text-xs
                      text-slate-900
                      placeholder-slate-400
                      outline-none
                      transition-all
                      focus:border-teal-500
                      focus:ring-2
                      focus:ring-teal-100
                      sm:px-4
                      sm:py-3
                      sm:text-sm
                    "
                    disabled={
                      loading ||
                      isPaid
                    }
                  />
                </div>

                {/* =================================================
                    ADDRESS
                    ================================================= */}

                <div>
                  <label
                    htmlFor="address"
                    className="
                      mb-1
                      block
                      text-xs
                      font-semibold
                      text-slate-900
                      sm:mb-2
                      sm:text-sm
                    "
                  >
                    Residential Address{" "}

                    <span className="text-teal-600">
                      *
                    </span>
                  </label>

                  <textarea
                    id="address"
                    name="address"
                    value={
                      formData.address
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Enter your complete residential address"
                    rows={1}
                    className="
                      min-h-[44px]
                      w-full
                      resize-none
                      rounded-lg
                      border
                      border-slate-200
                      bg-white
                      px-3
                      py-2.5
                      text-xs
                      text-slate-900
                      placeholder-slate-400
                      outline-none
                      transition-all
                      focus:border-teal-500
                      focus:ring-2
                      focus:ring-teal-100
                      sm:px-4
                      sm:py-3
                      sm:text-sm
                    "
                    disabled={
                      loading ||
                      isPaid
                    }
                  />
                </div>

                {/* =================================================
                    CONCERN
                    ================================================= */}

                <div>
                  <label
                    htmlFor="concern"
                    className="
                      mb-1
                      block
                      text-xs
                      font-semibold
                      text-slate-900
                      sm:mb-2
                      sm:text-sm
                    "
                  >
                    Your Concern{" "}

                    <span className="text-teal-600">
                      *
                    </span>
                  </label>

                  <textarea
                    id="concern"
                    name="concern"
                    value={
                      formData.concern
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Describe your health concern or reason for appointment..."
                    rows={2}
                    className="
                      w-full
                      resize-none
                      rounded-lg
                      border
                      border-slate-200
                      bg-white
                      px-3
                      py-2
                      text-xs
                      text-slate-900
                      placeholder-slate-400
                      outline-none
                      transition-all
                      focus:border-teal-500
                      focus:ring-2
                      focus:ring-teal-100
                      sm:px-4
                      sm:py-3
                      sm:text-sm
                    "
                    disabled={
                      loading ||
                      isPaid
                    }
                  />
                </div>

                {/* =================================================
                    STATUS
                    ================================================= */}

                {status.type && (
                  <div
                    className={`
                      flex
                      items-start
                      gap-2
                      rounded-lg
                      p-2.5
                      ${
                        status.type ===
                        "success"
                          ? "border border-green-200 bg-green-50"
                          : "border border-red-200 bg-red-50"
                      }
                    `}
                  >
                    <div
                      className={`
                        mt-0.5
                        shrink-0
                        ${
                          status.type ===
                          "success"
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      `}
                    >
                      {status.type ===
                      "success" ? (
                        <FaCheck
                          size={13}
                        />
                      ) : (
                        <FaExclamationCircle
                          size={13}
                        />
                      )}
                    </div>

                    <p
                      className={`
                        text-[11px]
                        font-medium
                        leading-relaxed
                        ${
                          status.type ===
                          "success"
                            ? "text-green-800"
                            : "text-red-800"
                        }
                      `}
                    >
                      {status.message}
                    </p>
                  </div>
                )}

                {/* =================================================
                    PAYMENT BUTTON
                    ================================================= */}

                {!isPaid ? (
                  <button
                    type="button"
                    onClick={
                      handleOpenFeeModal
                    }
                    disabled={paying}
                    className="
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-lg
                      bg-slate-900
                      px-3
                      py-2.5
                      text-xs
                      font-semibold
                      text-white
                      shadow-md
                      transition-all
                      duration-300
                      hover:bg-slate-800
                      disabled:opacity-70
                      sm:py-3
                      sm:text-sm
                    "
                  >
                    {paying ? (
                      <span
                        className="
                          flex
                          items-center
                          justify-center
                          gap-2
                        "
                      >
                        <svg
                          className="
                            h-3.5
                            w-3.5
                            animate-spin
                          "
                          viewBox="0 0 24 24"
                        >
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

                        Connecting to Payment Gateway...
                      </span>
                    ) : (
                      <>
                        <FaCreditCard
                          size={13}
                        />

                        Pay Consultation Fee & Verify
                      </>
                    )}
                  </button>
                ) : (
                  <div
                    className="
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-lg
                      border
                      border-teal-200
                      bg-teal-50
                      px-3
                      py-2.5
                      text-[11px]
                      font-medium
                      text-teal-800
                    "
                  >
                    <FaCheck
                      size={12}
                      className="text-teal-600"
                    />

                    Payment of ₹
                    {paidAmount} Verified Successfully
                  </div>
                )}

                {/* =================================================
                    BOOK BUTTON
                    ================================================= */}

                <button
                  type="submit"
                  disabled={
                    loading ||
                    !isPaid
                  }
                  className={`
                    w-full
                    rounded-lg
                    px-3
                    py-2.5
                    text-xs
                    font-semibold
                    transition-all
                    duration-300
                    sm:py-3
                    sm:text-sm

                    ${
                      isPaid
                        ? "cursor-pointer bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-[0_8px_20px_-6px_rgba(13,148,136,0.5)] hover:from-teal-700 hover:to-cyan-700"
                        : "cursor-not-allowed bg-slate-200 text-slate-400"
                    }
                  `}
                >
                  {loading ? (
                    <span
                      className="
                        flex
                        items-center
                        justify-center
                        gap-2
                      "
                    >
                      <svg
                        className="
                          h-3.5
                          w-3.5
                          animate-spin
                        "
                        viewBox="0 0 24 24"
                      >
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
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l-2.647-2.647z"
                        />
                      </svg>

                      Submitting...
                    </span>
                  ) : isPaid ? (
                    "Book Appointment"
                  ) : (
                    <span
                      className="
                        flex
                        items-center
                        justify-center
                        gap-1.5
                      "
                    >
                      <FaLock
                        size={11}
                      />

                      Complete Payment to Unlock Booking
                    </span>
                  )}
                </button>

                {/* =================================================
                    RESPONSE TIME
                    ================================================= */}

                <p
                  className="
                    text-center
                    text-[10px]
                    text-slate-500
                    sm:text-xs
                  "
                >
                  Response within 24 hours
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* =====================================================
            FEE MODAL
            ===================================================== */}

        {showFeeModal && (
          <div
            className="
              fixed
              inset-0
              z-50
              flex
              items-center
              justify-center
              bg-black/50
              p-4
              backdrop-blur-sm
            "
          >
            <div
              className="
                w-full
                max-w-md
                rounded-2xl
                border
                border-slate-100
                bg-white
                p-5
                shadow-2xl
                sm:p-6
              "
            >
              <h3
                className="
                  mb-1
                  text-lg
                  font-bold
                  text-slate-900
                  sm:text-xl
                "
              >
                Enter Consultation Fee
              </h3>

              <p
                className="
                  mb-4
                  text-xs
                  leading-relaxed
                  text-slate-500
                  sm:text-sm
                "
              >
                Minimum consultation fee is ₹510.
                You can increase the amount if you
                wish:
              </p>

              <input
                type="number"
                min="510"
                value={
                  customFeeInput
                }
                onChange={(e) =>
                  setCustomFeeInput(
                    e.target.value
                  )
                }
                className="
                  w-full
                  rounded-lg
                  border
                  border-slate-300
                  bg-white
                  px-4
                  py-3
                  text-lg
                  font-medium
                  text-slate-900
                  outline-none
                  focus:border-teal-500
                  focus:ring-2
                  focus:ring-teal-100
                "
                autoFocus
              />

              {Number(
                customFeeInput
              ) < 510 && (
                <p
                  className="
                    mt-1
                    text-xs
                    font-medium
                    text-red-500
                  "
                >
                  Amount cannot be less than ₹510.
                </p>
              )}

              <div
                className="
                  mt-5
                  flex
                  justify-end
                  gap-2
                  sm:mt-6
                  sm:gap-3
                "
              >
                <button
                  type="button"
                  onClick={() =>
                    setShowFeeModal(
                      false
                    )
                  }
                  className="
                    rounded-lg
                    px-4
                    py-2.5
                    text-sm
                    font-medium
                    text-slate-600
                    transition-colors
                    hover:bg-slate-100
                  "
                >
                  Cancel
                </button>

                <button
                  type="button"
                  disabled={
                    Number(
                      customFeeInput
                    ) < 510
                  }
                  onClick={
                    handleProceedToPayment
                  }
                  className="
                    rounded-lg
                    bg-teal-600
                    px-5
                    py-2.5
                    text-sm
                    font-semibold
                    text-white
                    shadow-md
                    transition-colors
                    hover:bg-teal-700
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
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