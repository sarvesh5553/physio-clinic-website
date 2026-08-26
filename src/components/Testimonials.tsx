"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Star,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Testimonial {
  _id: string;
  name: string;
  condition: string;
  review: string;
  rating: number;
  image?: {
    url?: string;
    publicId?: string;
  };
  isPublished?: boolean;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  const [expandedIds, setExpandedIds] = useState<
    Record<string, boolean>
  >({});

  const viewportRef = useRef<HTMLDivElement | null>(null);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);

  /* =========================================================
     FETCH TESTIMONIALS
  ========================================================= */

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch(
          `/api/testimonials?t=${Date.now()}`,
          {
            cache: "no-store",
          }
        );

        const data = await res.json();

        if (data.success && Array.isArray(data.data)) {
          setTestimonials(data.data);
        } else if (Array.isArray(data)) {
          setTestimonials(data);
        }
      } catch (error) {
        console.error(
          "Failed to load testimonials:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  /* =========================================================
     READ MORE / SHOW LESS
  ========================================================= */

  const toggleReadMore = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  /* =========================================================
     HORIZONTAL MOUSE / TOUCH DRAG
  ========================================================= */

  const handlePointerDown = (
    e: React.PointerEvent<HTMLDivElement>
  ) => {
    const target = e.target as HTMLElement;

    /*
      Don't start horizontal dragging when the user
      clicks Read More / Show Less.
    */

    if (target.closest("button")) {
      return;
    }

    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    isDragging.current = true;

    startX.current = e.clientX;

    startScrollLeft.current =
      viewport.scrollLeft;

    try {
      viewport.setPointerCapture(
        e.pointerId
      );
    } catch {
      // Ignore pointer capture errors
    }

    viewport.style.cursor = "grabbing";
  };

  const handlePointerMove = (
    e: React.PointerEvent<HTMLDivElement>
  ) => {
    const viewport = viewportRef.current;

    if (
      !viewport ||
      !isDragging.current
    ) {
      return;
    }

    const distance =
      e.clientX - startX.current;

    viewport.scrollLeft =
      startScrollLeft.current - distance;
  };

  const handlePointerUp = (
    e: React.PointerEvent<HTMLDivElement>
  ) => {
    const viewport = viewportRef.current;

    isDragging.current = false;

    if (viewport) {
      viewport.style.cursor = "grab";

      try {
        viewport.releasePointerCapture(
          e.pointerId
        );
      } catch {
        // Ignore pointer release errors
      }
    }
  };

  const handlePointerCancel = () => {
    isDragging.current = false;

    if (viewportRef.current) {
      viewportRef.current.style.cursor =
        "grab";
    }
  };

  /* =========================================================
     LEFT / RIGHT ARROWS
  ========================================================= */

  const scrollCards = (
    direction: "left" | "right"
  ) => {
    const viewport =
      viewportRef.current;

    if (!viewport) {
      return;
    }

    const isMobile =
      window.innerWidth < 768;

    const amount = isMobile
      ? 170
      : 320;

    viewport.scrollBy({
      left:
        direction === "right"
          ? amount
          : -amount,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="testimonials"
      className="
        bg-slate-50/50
        py-16
        md:py-16
        overflow-hidden
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          lg:px-8
        "
      >

        {/* =====================================================
            HEADING
        ===================================================== */}

        <div
          className="
            text-center
            mb-10
            md:mb-14
          "
        >

          <div
            className="
              inline-flex
              items-center
              justify-center
              mb-4
            "
          >
            <span
              className="
                text-xs
                font-bold
                tracking-[0.2em]
                uppercase
                text-teal-700
                bg-teal-50
                px-4
                py-2
                rounded-full
              "
            >
              Patient Reviews
            </span>
          </div>


          <h2
            className="
              text-3xl
              sm:text-4xl
              md:text-5xl
              font-bold
              text-slate-900
              mb-4
              tracking-tight
            "
          >
            <span>
              What our{" "}
            </span>

            <span
              className="
                bg-gradient-to-r
                from-teal-600
                to-cyan-600
                bg-clip-text
                text-transparent
              "
            >
              Patients Say
            </span>
          </h2>


          <p
            className="
              text-slate-600
              max-w-xl
              mx-auto
              text-sm
              md:text-base
              leading-relaxed
            "
          >
            Real patient experiences and recovery stories.
          </p>

        </div>


        {/* =====================================================
            LOADING
        ===================================================== */}

        {loading ? (

          <div className="text-center py-12">
            <p
              className="
                text-sm
                text-slate-500
                font-medium
              "
            >
              Loading testimonials...
            </p>
          </div>

        ) : testimonials.length === 0 ? (

          <div className="text-center py-12">
            <p
              className="
                text-sm
                text-slate-500
                font-medium
              "
            >
              No testimonials available right now.
            </p>
          </div>

        ) : (

          <div className="relative">

            {/* =================================================
                LEFT ARROW
            ================================================= */}

            {testimonials.length > 1 && (
              <button
                type="button"
                onClick={() =>
                  scrollCards("left")
                }
                aria-label="Previous patient reviews"
                className="
                  absolute
                  left-2
                  md:left-1

                  bottom-2
                  md:top-1/2
                  md:bottom-auto
                  md:-translate-y-1/2

                  z-40

                  w-8
                  h-8
                  md:w-10
                  md:h-10

                  rounded-full

                  bg-white/45
                  backdrop-blur-xl

                  border
                  border-white/80

                  text-teal-700

                  shadow-[0_6px_20px_rgba(13,148,136,0.14)]
                  ring-1
                  ring-teal-100/60

                  flex
                  items-center
                  justify-center

                  hover:bg-white/70
                  hover:text-teal-600

                  active:scale-90

                  transition-all
                  duration-300
                "
              >
                <ChevronLeft
                  className="w-4 h-4 md:w-5 md:h-5"
                  strokeWidth={2.5}
                />
              </button>
            )}


            {/* =================================================
                RIGHT ARROW
            ================================================= */}

            {testimonials.length > 1 && (
              <button
                type="button"
                onClick={() =>
                  scrollCards("right")
                }
                aria-label="Next patient reviews"
                className="
                  absolute
                  right-2
                  md:right-1

                  bottom-2
                  md:top-1/2
                  md:bottom-auto
                  md:-translate-y-1/2

                  z-40

                  w-8
                  h-8
                  md:w-10
                  md:h-10

                  rounded-full

                  bg-white/45
                  backdrop-blur-xl

                  border
                  border-white/80

                  text-teal-700

                  shadow-[0_6px_20px_rgba(13,148,136,0.14)]
                  ring-1
                  ring-teal-100/60

                  flex
                  items-center
                  justify-center

                  hover:bg-white/70
                  hover:text-teal-600

                  active:scale-90

                  transition-all
                  duration-300
                "
              >
                <ChevronRight
                  className="w-4 h-4 md:w-5 md:h-5"
                  strokeWidth={2.5}
                />
              </button>
            )}


            {/* =================================================
                HORIZONTAL TESTIMONIAL SCROLLER
            ================================================= */}

            <div
              ref={viewportRef}

              onPointerDown={
                handlePointerDown
              }

              onPointerMove={
                handlePointerMove
              }

              onPointerUp={
                handlePointerUp
              }

              onPointerCancel={
                handlePointerCancel
              }

              onPointerLeave={
                handlePointerCancel
              }

              className="
                overflow-x-auto
                overflow-y-visible

                mx-0
                md:mx-7

                pt-2
                pb-4
                px-1
                md:px-0

                cursor-grab

                select-none

                touch-pan-x

                [-ms-overflow-style:none]
                [scrollbar-width:none]
                [&::-webkit-scrollbar]:hidden
              "
            >

              <div
                className="
                  flex
                  gap-3
                  md:gap-5
                "
              >

                {testimonials.map(
                  (testimonial) => {

                    const isExpanded =
                      !!expandedIds[
                        testimonial._id
                      ];

                    const isLongText =
                      (
                        testimonial.review
                          ?.length || 0
                      ) > 100;

                    const imageUrl =
                      testimonial.image?.url &&
                      testimonial.image.url.trim() !== ""
                        ? testimonial.image.url
                        : "/patients/default.png";

                    return (

                      <div
                        key={
                          testimonial._id
                        }

                        /*
                          IMPORTANT:
                          EXACT SAME CARD SIZE
                        */

                        className="
                          flex-none

                          w-[150px]
                          h-[235px]

                          md:w-[calc((100%-60px)/4)]
                          md:h-[300px]

                          px-3
                          py-3.5

                          md:p-5

                          rounded-xl
                          md:rounded-2xl

                          bg-white

                          border
                          border-slate-100

                          shadow-[0_3px_12px_rgba(15,23,42,0.06)]

                          hover:border-teal-200

                          hover:shadow-[0_10px_28px_rgba(13,148,136,0.10)]

                          transition-all
                          duration-300

                          flex
                          flex-col
                        "
                      >

                        {/* =====================================
                            PROFILE HEADER
                        ===================================== */}

                        <div
                          className="
                            flex
                            items-center

                            gap-2.5
                            md:gap-3

                            min-w-0

                            flex-shrink-0
                          "
                        >

                          <div
                            className="
                              relative

                              w-10
                              h-10

                              md:w-10
                              md:h-10

                              rounded-full

                              overflow-hidden

                              flex-shrink-0

                              bg-slate-100

                              border
                              border-slate-100
                            "
                          >
                            <Image
                              src={imageUrl}
                              alt={`${testimonial.name} patient review for physiotherapy`}
                              fill
                              unoptimized
                              draggable={false}
                              className="
                                object-cover
                              "
                            />
                          </div>


                          <div
                            className="
                              overflow-hidden

                              min-w-0
                              flex-1
                            "
                          >

                            <h3
                              className="
                                text-xs
                                md:text-sm

                                font-bold

                                text-slate-900

                                truncate

                                leading-tight
                              "
                            >
                              {
                                testimonial.name
                              }
                            </h3>

                            <p
                              className="
                                text-[10px]
                                md:text-[11px]

                                text-slate-400

                                font-medium

                                truncate

                                leading-tight

                                mt-0.5
                              "
                            >
                              {
                                testimonial.condition
                              }
                            </p>

                          </div>

                        </div>


                        {/* =====================================
                            STARS
                        ===================================== */}

                        <div
                          className="
                            flex
                            gap-0.5

                            mt-3
                            mb-2.5

                            flex-shrink-0
                          "
                        >

                          {[
                            ...Array(5),
                          ].map(
                            (_, index) => (

                              <Star
                                key={index}

                                size={14}

                                className={
                                  index <
                                  (
                                    testimonial.rating ||
                                    5
                                  )
                                    ? "fill-amber-400 text-amber-400"
                                    : "fill-slate-200 text-slate-200"
                                }
                              />

                            )
                          )}

                        </div>


                        {/* =====================================
                            FEEDBACK TEXT BOX

                            CARD HEIGHT DOES NOT CHANGE
                        ===================================== */}

                        <div
                          className={`
                            flex-1
                            min-h-0

                            mb-1

                            ${
                              isExpanded
                                ? `
                                  overflow-y-auto

                                  pr-1

                                  touch-pan-y

                                  overscroll-contain

                                  scrollbar-thin

                                  scrollbar-thumb-slate-300

                                  scrollbar-track-transparent
                                `
                                : `
                                  overflow-hidden
                                `
                            }
                          `}
                        >

                          <p
                            className={`
                              text-slate-600

                              text-[12px]

                              md:text-[13px]

                              leading-[1.55]

                              break-words

                              [word-break:break-word]

                              ${
                                !isExpanded
                                  ? "line-clamp-5"
                                  : ""
                              }
                            `}
                          >
                            "{testimonial.review}"
                          </p>

                        </div>


                        {/* =====================================
                            READ MORE BUTTON
                        ===================================== */}

                        <div
                          className="
                            flex-shrink-0

                            mt-auto

                            pt-2

                            min-h-[28px]

                            flex
                            items-center
                          "
                          onPointerDown={(
                            e
                          ) => {
                            e.stopPropagation();
                          }}
                          onPointerMove={(
                            e
                          ) => {
                            e.stopPropagation();
                          }}
                        >

                          {isLongText ? (

                            <button
                              type="button"

                              onPointerDown={(
                                e
                              ) => {
                                e.stopPropagation();
                              }}

                              onPointerUp={(
                                e
                              ) => {
                                e.stopPropagation();
                              }}

                              onClick={(
                                e
                              ) => {
                                e.preventDefault();
                                e.stopPropagation();

                                toggleReadMore(
                                  testimonial._id
                                );
                              }}

                              aria-expanded={
                                isExpanded
                              }

                              className="
                                relative
                                z-50

                                text-[#0f969c]

                                hover:text-[#0b7276]

                                text-xs

                                font-semibold

                                flex
                                items-center

                                gap-1

                                cursor-pointer

                                select-none

                                transition-colors

                                focus:outline-none
                              "
                            >

                              <span>
                                {isExpanded
                                  ? "Show less"
                                  : "Read more"}
                              </span>

                              {isExpanded ? (

                                <ChevronUp
                                  size={13}
                                />

                              ) : (

                                <ChevronDown
                                  size={13}
                                />

                              )}

                            </button>

                          ) : (

                            <div
                              className="
                                h-4
                              "
                            />

                          )}

                        </div>

                      </div>
                    );
                  }
                )}

              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
}