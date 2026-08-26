"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  Bot,
  Send,
  User,
  Sparkles,
  MessageCircle,
  X,
} from "lucide-react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isSending, setIsSending] = useState(false);

  /* =========================================================
     WELCOME HINT
  ========================================================= */

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowHint(false);
    }, 7000);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  /* =========================================================
     OPEN CHAT FROM FAQ / OTHER COMPONENTS
  ========================================================= */

  useEffect(() => {
    const openChat = () => {
      setIsOpen(true);
      setShowHint(false);
    };

    window.addEventListener(
      "open-physiocare-chat",
      openChat
    );

    return () => {
      window.removeEventListener(
        "open-physiocare-chat",
        openChat
      );
    };
  }, []);

  /* =========================================================
     SEND QUESTION
  ========================================================= */

  const sendQuestion = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const trimmedQuestion = question.trim();

    if (!trimmedQuestion || isSending) {
      return;
    }

    setMessages((previous) => [
      ...previous,
      {
        role: "user",
        content: trimmedQuestion,
      },
    ]);

    setQuestion("");
    setIsSending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          message: trimmedQuestion,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Unable to get a response."
        );
      }

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content:
            data?.answer ||
            "Sorry, I could not find an answer to that question.",
        },
      ]);
    } catch (error) {
      console.error(
        "PhysioCare chatbot error:",
        error
      );

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content:
            "I'm currently unable to answer. Please contact Dr. Bhagyashri directly for assistance with appointments, physiotherapy services, home visits or online consultations.",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  /* =========================================================
     QUICK QUESTION
  ========================================================= */

  const chooseQuestion = (value: string) => {
    setQuestion(value);
  };

  return (
    <>
      {/* =====================================================
          FLOATING CHATBOT AREA
      ===================================================== */}

      <div
        className="
          fixed
          right-6
          bottom-[5.25rem]
          z-[60]
        "
      >
        {/* ===================================================
            WELCOME HINT
        =================================================== */}

        {showHint && !isOpen && (
          <div
            className="
              absolute
              right-0
              bottom-[62px]

              w-[235px]

              rounded-2xl
              border
              border-slate-200

              bg-white

              px-4
              py-3

              shadow-[0_10px_35px_rgba(15,23,42,0.14)]
            "
          >
            <button
              type="button"
              onClick={() => setShowHint(false)}
              aria-label="Close chatbot hint"
              className="
                absolute
                right-2
                top-2

                flex
                h-5
                w-5

                items-center
                justify-center

                rounded-full

                text-slate-400

                hover:bg-slate-100
                hover:text-slate-600
              "
            >
              <X className="h-3 w-3" />
            </button>

            <div
              className="
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

                  rounded-xl

                  bg-gradient-to-br
                  from-teal-500
                  to-cyan-600

                  text-white
                "
              >
                <Bot className="h-4 w-4" />
              </div>

              <div className="pr-2">
                <p
                  className="
                    text-xs
                    font-bold
                    text-slate-900
                  "
                >
                  Need help?
                </p>

                <p
                  className="
                    mt-1
                    text-[11px]
                    leading-relaxed
                    text-slate-500
                  "
                >
                  Ask our PhysioCare Assistant
                  about services, conditions,
                  timings or home visits.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================
            FLOATING BOT BUTTON
        =================================================== */}

        {!isOpen && (
          <button
            type="button"
            onClick={() => {
              setIsOpen(true);
              setShowHint(false);
            }}
            aria-label="Open PhysioCare Assistant"
            title="Ask PhysioCare Assistant"
            className="
              group
              relative

              flex
              h-12
              w-12

              items-center
              justify-center

              rounded-xl

              bg-gradient-to-br
              from-teal-500
              to-cyan-600

              text-white

              shadow-[0_8px_24px_rgba(13,148,136,0.25)]

              transition-all
              duration-300

              hover:-translate-y-1
              hover:scale-105

              hover:shadow-[0_12px_28px_rgba(13,148,136,0.32)]
            "
          >
            {/* Subtle pulse */}

            

            {/* Bot */}

            <Bot
              className="
                relative
                z-10

                h-5
                w-5

                transition-transform
                duration-300

                group-hover:scale-110
              "
            />

            {/* Online indicator */}

            <span
              className="
                absolute
                right-[-2px]
                top-[-2px]

                z-20

                h-3.5
                w-3.5

                rounded-full

                border-2
                border-white

                bg-emerald-400
              "
            />
          </button>
        )}

        {/* ===================================================
            CHAT WINDOW
        =================================================== */}

        {isOpen && (
          <div
            className="
              fixed

              right-6
              bottom-6

              z-[70]

              w-[calc(100vw-3rem)]
              max-w-[400px]

              overflow-hidden

              rounded-[28px]

              border
              border-slate-200

              bg-white

              shadow-[0_25px_80px_rgba(15,23,42,0.25)]

              sm:right-6
              sm:bottom-6
            "
          >
            <div
              className="
                flex
                h-[calc(100dvh-48px)]
                max-h-[760px]

                flex-col

                overflow-hidden

                sm:h-[680px]
              "
            >
              {/* =================================================
                  CHAT HEADER
              ================================================= */}

              <div
                className="
                  flex-shrink-0

                  bg-gradient-to-br
                  from-slate-950
                  via-slate-900
                  to-teal-950

                  px-5
                  py-4
                "
              >
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
                        h-12
                        w-12

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
                          border-slate-900

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

                            text-white
                          "
                        >
                          PhysioCare Assistant
                        </h3>

                        <Sparkles
                          className="
                            h-4
                            w-4

                            flex-shrink-0

                            text-teal-300
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
                      setIsOpen(false)
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

                      transition

                      hover:bg-white/10
                      hover:text-white
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

                            transition

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

                    {/* Typing indicator */}

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

                                animate-bounce

                                rounded-full

                                bg-teal-400
                              "
                            />

                            <span
                              className="
                                h-1.5
                                w-1.5

                                animate-bounce

                                rounded-full

                                bg-teal-400

                                [animation-delay:100ms]
                              "
                            />

                            <span
                              className="
                                h-1.5
                                w-1.5

                                animate-bounce

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

                          animate-spin

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
    </>
  );
}