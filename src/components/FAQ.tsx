"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import {
  Bot,
  Send,
  User,
  Sparkles,
  MessageCircle,
  X,
  Clock3,
  MapPin,
  Stethoscope,
} from "lucide-react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] =
    useState<number | null>(null);

  const [question, setQuestion] =
    useState("");

  const [messages, setMessages] =
    useState<ChatMessage[]>([]);

  const [isSending, setIsSending] =
    useState(false);

  const [isChatOpen, setIsChatOpen] =
    useState(false);

  const messagesEndRef =
    useRef<HTMLDivElement | null>(null);

  const faqs = [
    {
      question:
        "Can I get an online physiotherapy session?",
      answer:
        "Yes. After you book the appointment with the doctor, as per your appointment schedule you will get an online consultation and treatment from the doctor.",
    },

    {
      question:
        "Do you provide home visit physiotherapy in Pune?",
      answer:
        "Yes. Home visit physiotherapy is available in Pune and nearby areas including Pirangut, Baner, Hinjawadi, Balewadi, Pashan, Wakad and nearby areas, subject to appointment availability.",
    },

    {
      question:
        "What physiotherapy services do you provide?",
      answer:
        "We provide services including electrotherapy, pain management, manual therapy, exercise therapy, neuro rehabilitation, sports rehabilitation, post surgical rehabilitation, posture correction, dry needling, dry and wet cupping, and kinesio taping.",
    },

    {
      question:
        "How can I book a physiotherapy appointment?",
      answer:
        "You can book a physiotherapy appointment through the website or contact us directly. Depending on your needs and availability, appointments may be provided through online consultation or home visit physiotherapy.",
    },

    {
      question:
        "How many physiotherapy sessions will I need?",
      answer:
        "The number of sessions depends on your condition, severity and recovery goals. After assessment, we create a personalized treatment plan.",
    },
  ];

  /*
  ============================================================
  CHATBOT
  ============================================================
  */

  const sendQuestion = async (
    e?: FormEvent<HTMLFormElement>,
    customQuestion?: string
  ) => {
    e?.preventDefault();

    const trimmedQuestion = (
      customQuestion ?? question
    ).trim();

    if (!trimmedQuestion || isSending) {
      return;
    }

    const userMessage: ChatMessage = {
      role: "user",
      content: trimmedQuestion,
    };

    setMessages((previousMessages) => [
      ...previousMessages,
      userMessage,
    ]);

    setQuestion("");
    setIsSending(true);

    try {
      const response = await fetch(
        "/api/chat",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            message: trimmedQuestion,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Unable to get a response."
        );
      }

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          role: "assistant",
          content:
            data?.answer ||
            "Sorry, I could not find an answer to that question.",
        },
      ]);
    } catch (error) {
      console.error(
        "Chatbot error:",
        error
      );

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          role: "assistant",
          content:
            "I'm currently unable to answer. Please contact Dr. Bhagyashri directly at +91 9322518895 for information about physiotherapy services, appointments, home visits or online consultations.",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  /*
  ============================================================
  SUGGESTED QUESTIONS
  ============================================================
  */

  const useSuggestedQuestion = (
    suggestedQuestion: string
  ) => {
    setQuestion(suggestedQuestion);
  };

  /*
  ============================================================
  CLEAR CHAT
  ============================================================
  */

  const clearChat = () => {
    setMessages([]);
    setQuestion("");
  };

  /*
  ============================================================
  AUTO SCROLL CHAT
  ============================================================
  */

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isSending]);

  return (
    <section
      id="faq"
      className="relative overflow-visible bg-gradient-to-b from-slate-50 to-white py-12 md:py-10"
    >
      <div className="mx-auto max-w-4xl px-4 md:px-6">

        {/* =====================================================
            FAQ HEADING
        ===================================================== */}

        <div className="mb-12 text-center md:mb-16">

          <div className="mb-4 inline-flex items-center justify-center">
            <span className="rounded-full bg-teal-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-teal-700">
              Questions & Answers
            </span>
          </div>

          {/* =================================================
              HEADING + SMALL CHATBOT ICON
          ================================================= */}

          <div className="flex flex-wrap items-center justify-center gap-3">

            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">

              <span>
                Frequently Asked{" "}
              </span>

              <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Questions
              </span>

            </h2>

            {/* =================================================
                CHATBOT BUTTON
            ================================================= */}

            <div className="relative">

              <button
                type="button"
                onClick={() =>
                  setIsChatOpen(
                    !isChatOpen
                  )
                }
                aria-label="Open Dr. Bhagyashri's assistant"
                className="
                  relative
                  mt-2
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-2xl
                  bg-gradient-to-br
                  from-teal-500
                  to-cyan-600
                  text-white
                  shadow-lg
                  shadow-teal-500/20
                  md:mt-0
                "
              >

                <Bot
                  className="
                    relative
                    z-10
                    h-5
                    w-5
                  "
                />

                {/* Online indicator */}

                <span
                  className="
                    absolute
                    -right-1
                    -top-1
                    z-20
                    h-3
                    w-3
                    rounded-full
                    border-2
                    border-white
                    bg-emerald-400
                  "
                />

              </button>

            </div>

          </div>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
            Get answers to common questions about our
            physiotherapy services and treatment approach.
          </p>

          {/* Small assistant link */}

          <button
            type="button"
            onClick={() =>
              setIsChatOpen(true)
            }
            className="
              mt-5
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-teal-100
              bg-white
              px-4
              py-2
              text-xs
              font-medium
              text-slate-600
              shadow-sm
              transition-all
              duration-300
              hover:border-teal-200
              hover:text-teal-700
              hover:shadow-md
            "
          >

            <span
              className="
                flex
                h-5
                w-5
                items-center
                justify-center
                rounded-full
                bg-teal-50
                text-teal-600
              "
            >
              <Bot className="h-3.5 w-3.5" />
            </span>

            Ask Dr. Bhagyashri's Assistant

            <Sparkles
              className="
                h-3.5
                w-3.5
                text-teal-500
              "
            />

          </button>

        </div>


        {/* =====================================================
            FAQ ACCORDION
        ===================================================== */}

        <div className="space-y-3 md:space-y-4">

          {faqs.map(
            (faq, index) => (

              <div
                key={index}
                className={`
                  overflow-hidden
                  rounded-xl
                  transition-all
                  duration-300
                  md:rounded-2xl

                  ${
                    openIndex === index
                      ? "border border-teal-200 bg-white shadow-[0_8px_24px_rgba(13,148,136,0.12)]"
                      : "border border-slate-100 bg-white shadow-[0_1px_3px_rgba(15,23,42,0.06)] hover:border-slate-200 hover:shadow-[0_4px_12px_rgba(13,148,136,0.08)]"
                  }
                `}
              >

                <button
                  type="button"
                  onClick={() =>
                    setOpenIndex(
                      openIndex === index
                        ? null
                        : index
                    )
                  }
                  aria-expanded={
                    openIndex === index
                  }
                  className="
                    flex
                    w-full
                    items-center
                    justify-between
                    px-4
                    py-3
                    text-left
                    transition-colors
                    duration-200
                    hover:bg-slate-50/50
                    md:px-6
                    md:py-4
                  "
                >

                  <span
                    className={`
                      pr-4
                      text-sm
                      font-semibold
                      transition-colors
                      duration-300
                      md:text-base

                      ${
                        openIndex === index
                          ? "text-teal-700"
                          : "text-slate-900"
                      }
                    `}
                  >
                    {faq.question}
                  </span>

                  <span
                    className="
                      flex
                      h-8
                      w-8
                      flex-shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-slate-50
                      text-teal-600
                    "
                  >

                    <svg
                      className={`
                        h-4
                        w-4
                        transition-transform
                        duration-300

                        ${
                          openIndex === index
                            ? "rotate-180"
                            : ""
                        }
                      `}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>

                  </span>

                </button>

                <div
                  className={`
                    grid
                    transition-all
                    duration-300
                    ease-in-out

                    ${
                      openIndex === index
                        ? "grid-rows-[1fr]"
                        : "grid-rows-[0fr]"
                    }
                  `}
                >

                  <div className="overflow-hidden">

                    <p
                      className="
                        border-t
                        border-slate-100
                        px-4
                        pb-4
                        pt-4
                        text-sm
                        leading-relaxed
                        text-slate-600
                        md:px-6
                        md:pb-5
                        md:text-base
                      "
                    >
                      {faq.answer}
                    </p>

                  </div>

                </div>

              </div>

            )
          )}

        </div>


        {/* =====================================================
            CHATBOT POPUP — SAME WINDOW AS THE MAIN FLOATING CHATBOT
        ===================================================== */}

        {isChatOpen && (
          <div
            className="
              fixed

              right-6
              bottom-6

              z-[70]

              w-[calc(100vw-2rem)]
              max-w-[320px]

              overflow-hidden

              rounded-[22px]

              border
              border-slate-200

              bg-white

              shadow-[0_14px_45px_rgba(15,23,42,0.16)]

              sm:right-6
              sm:bottom-6
            "
          >
            <div
              className="
                flex
                h-[min(440px,calc(100dvh-90px))]
                max-h-[440px]

                flex-col

                overflow-hidden

                sm:h-[440px]
              "
            >
              {/* =================================================
                  CHAT HEADER
              ================================================= */}

              <div
                className="
                  flex-shrink-0

                  bg-gradient-to-br
                  from-white
                  via-teal-50
                  to-cyan-50
                  border-b
                  border-teal-100

                  px-4
                  py-3
                "
              >
                {/* Header top */}

                <div
                  className="
                    flex
                    items-center
                    justify-between
                  "
                >
                  <div
                    className="
                      flex
                      min-w-0
                      items-center
                      gap-3
                    "
                  >
                    {/* Bot logo */}

                    <div
                      className="
                        relative

                        flex
                        h-10
                        w-10

                        flex-shrink-0

                        items-center
                        justify-center

                        rounded-2xl

                        bg-gradient-to-br
                        from-teal-400
                        to-cyan-500

                        text-white

                        shadow-lg
                      "
                    >
                      <Bot className="h-6 w-6" />

                      <span
                        className="
                          absolute

                          right-[-2px]
                          top-[-2px]

                          h-4
                          w-4

                          rounded-full

                          border-2
                          border-white

                          bg-emerald-400
                        "
                      />
                    </div>

                    {/* Title */}

                    <div className="min-w-0">
                      <div
                        className="
                          flex
                          items-center
                          gap-2
                        "
                      >
                        <h3
                          className="
                            truncate

                            text-base
                            font-bold

                            text-slate-900
                          "
                        >
                          PhysioCare Assistant
                        </h3>

                        <Sparkles
                          className="
                            h-4
                            w-4

                            flex-shrink-0

                            text-teal-500
                          "
                        />
                      </div>

                      <p
                        className="
                          mt-1

                          text-xs

                          text-slate-300
                        "
                      >
                        Ask about Dr. Bhagyashri's
                        services
                      </p>
                    </div>
                  </div>

                  {/* Close */}

                  <button
                    type="button"
                    onClick={() =>
                      setIsChatOpen(false)
                    }
                    aria-label="Close chatbot"
                    className="
                      ml-3

                      flex
                      h-9
                      w-9

                      flex-shrink-0

                      items-center
                      justify-center

                      rounded-xl

                      text-slate-400

                      hover:bg-white/10
                      hover:text-teal-700
                    "
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Header description */}

                <p
                  className="
                    mt-4

                    text-xs
                    leading-relaxed

                    text-slate-300
                  "
                >
                  Physiotherapy services • Conditions
                  • Timings • Home visits • Online
                  consultations
                </p>
              </div>

              {/* =================================================
                  CHAT CONTENT
              ================================================= */}

              <div
                className="
                  min-h-0
                  flex-1

                  overflow-y-auto

                  overscroll-contain

                  bg-white

                  p-4
                "
              >
                {/* =================================================
                    EMPTY STATE
                ================================================= */}

                {messages.length === 0 && (
                  <div>
                    {/* Welcome */}

                    <div
                      className="
                        mb-6

                        flex
                        items-start
                        gap-3
                      "
                    >
                      <div
                        className="
                          flex
                          h-8
                          w-8

                          flex-shrink-0

                          items-center
                          justify-center

                          rounded-full

                          bg-teal-50

                          text-teal-600
                        "
                      >
                        <Bot className="h-4 w-4" />
                      </div>

                      <div
                        className="
                          rounded-2xl
                          rounded-tl-md

                          border
                          border-slate-100

                          bg-slate-50

                          px-4
                          py-3
                        "
                      >
                        <p
                          className="
                            mb-1

                            text-sm
                            font-semibold

                            text-slate-800
                          "
                        >
                          How can I help you?
                        </p>

                        <p
                          className="
                            text-sm
                            leading-relaxed

                            text-slate-500
                          "
                        >
                          Ask about Dr. Bhagyashri's
                          physiotherapy services,
                          conditions, timings,
                          home visits or online
                          consultations.
                        </p>
                      </div>
                    </div>

                    {/* Popular questions */}

                    <p
                      className="
                        mb-3

                        text-xs
                        font-bold
                        uppercase
                        tracking-wider

                        text-slate-400
                      "
                    >
                      Popular questions
                    </p>

                    <div
                      className="
                        grid
                        grid-cols-1
                        gap-2

                        sm:grid-cols-2
                      "
                    >
                      {[
                        "Do you provide home visits in Pune?",
                        "What conditions does the doctor treat?",
                        "What physiotherapy services are available?",
                        "Can patients outside Pune get online physiotherapy?",
                      ].map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() =>
                            chooseQuestion(item)
                          }
                          className="
                            flex
                            min-h-[58px]

                            items-center
                            gap-3

                            rounded-2xl

                            border
                            border-slate-200

                            bg-white

                            px-4
                            py-3

                            text-left

                            text-sm
                            font-medium

                            leading-relaxed

                            text-slate-700

                            hover:border-teal-200
                            hover:bg-teal-50
                            hover:text-teal-700
                          "
                        >
                          <MessageCircle
                            className="
                              h-4
                              w-4

                              flex-shrink-0

                              text-teal-500
                            "
                          />

                          <span>
                            {item}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* =================================================
                    MESSAGES
                ================================================= */}

                {messages.length > 0 && (
                  <div
                    className="
                      space-y-4
                    "
                  >
                    {messages.map(
                      (message, index) => (
                        <div
                          key={index}
                          className={`
                            flex
                            gap-2

                            ${
                              message.role ===
                              "user"
                                ? "justify-end"
                                : "justify-start"
                            }
                          `}
                        >
                          {/* Assistant icon */}

                          {message.role ===
                            "assistant" && (
                            <div
                              className="
                                flex
                                h-8
                                w-8

                                flex-shrink-0

                                items-center
                                justify-center

                                rounded-full

                                bg-teal-50

                                text-teal-600
                              "
                            >
                              <Bot className="h-4 w-4" />
                            </div>
                          )}

                          {/* Message */}

                          <div
                            className={`
                              max-w-[82%]

                              rounded-2xl

                              px-4
                              py-3

                              text-sm
                              leading-relaxed

                              ${
                                message.role ===
                                "user"
                                  ? `
                                    rounded-br-md
                                    bg-gradient-to-r
                                    from-teal-600
                                    to-cyan-600
                                    text-white
                                  `
                                  : `
                                    rounded-bl-md
                                    border
                                    border-slate-100
                                    bg-slate-50
                                    text-slate-700
                                  `
                              }
                            `}
                          >
                            {message.content
                              .split("\n")
                              .map(
                                (
                                  line,
                                  lineIndex
                                ) => (
                                  <span
                                    key={
                                      lineIndex
                                    }
                                  >
                                    {line}

                                    {lineIndex <
                                      message.content.split(
                                        "\n"
                                      ).length -
                                        1 && (
                                      <br />
                                    )}
                                  </span>
                                )
                              )}
                          </div>

                          {/* User icon */}

                          {message.role ===
                            "user" && (
                            <div
                              className="
                                flex
                                h-8
                                w-8

                                flex-shrink-0

                                items-center
                                justify-center

                                rounded-full

                                bg-slate-900

                                text-white
                              "
                            >
                              <User className="h-4 w-4" />
                            </div>
                          )}
                        </div>
                      )
                    )}

                    {/* Typing */}

                    {isSending && (
                      <div
                        className="
                          flex
                          items-center
                          gap-2
                        "
                      >
                        <div
                          className="
                            flex
                            h-8
                            w-8

                            items-center
                            justify-center

                            rounded-full

                            bg-teal-50

                            text-teal-600
                          "
                        >
                          <Bot className="h-4 w-4" />
                        </div>

                        <div
                          className="
                            rounded-2xl
                            rounded-bl-md

                            bg-slate-50

                            px-4
                            py-3
                          "
                        >
                          <div
                            className="
                              flex
                              gap-1
                            "
                          >
                            <span
                              className="
                                h-1.5
                                w-1.5

                                rounded-full

                                bg-teal-400
                              "
                            />

                            <span
                              className="
                                h-1.5
                                w-1.5

                                rounded-full

                                bg-teal-400

                                [animation-delay:100ms]
                              "
                            />

                            <span
                              className="
                                h-1.5
                                w-1.5

                                rounded-full

                                bg-teal-400

                                [animation-delay:200ms]
                              "
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* =================================================
                  INPUT
              ================================================= */}

              <div
                className="
                  flex-shrink-0

                  border-t
                  border-slate-100

                  bg-white

                  px-4
                  pb-3
                  pt-3
                "
              >
                <form
                  onSubmit={sendQuestion}
                  className="relative"
                >
                  <input
                    type="text"
                    value={question}
                    onChange={(e) =>
                      setQuestion(
                        e.target.value
                      )
                    }
                    disabled={isSending}
                    placeholder="Ask about physiotherapy..."
                    aria-label="Ask about physiotherapy"
                    className="
                      w-full

                      rounded-xl

                      border
                      border-slate-200

                      bg-slate-50

                      py-3
                      pl-4
                      pr-12

                      text-sm

                      text-slate-800

                      outline-none

                      placeholder:text-slate-400

                      focus:border-teal-400
                      focus:bg-white
                      focus:ring-4
                      focus:ring-teal-50
                    "
                  />

                  <button
                    type="submit"
                    disabled={
                      !question.trim() ||
                      isSending
                    }
                    aria-label="Send question"
                    className="
                      absolute

                      right-1.5
                      top-1/2

                      flex
                      h-9
                      w-9

                      -translate-y-1/2

                      items-center
                      justify-center

                      rounded-lg

                      bg-gradient-to-r
                      from-teal-600
                      to-cyan-600

                      text-white

                      disabled:cursor-not-allowed
                      disabled:opacity-30
                    "
                  >
                    {isSending ? (
                      <div
                        className="
                          h-4
                          w-4

                          rounded-full

                          border-2
                          border-white/30
                          border-t-white
                        "
                      />
                    ) : (
                      <Send
                        className="
                          h-4
                          w-4
                        "
                      />
                    )}
                  </button>
                </form>

                <p
                  className="
                    mt-2

                    text-center

                    text-[9px]

                    leading-relaxed

                    text-slate-400
                  "
                >
                  General information only. For
                  diagnosis or treatment decisions,
                  please consult a qualified
                  healthcare professional.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}