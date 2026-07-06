"use client";

import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Testimonial {
  _id: string;
  name: string;
  condition: string;
  review: string;
  rating: number;
  image: {
    url: string;
    publicId: string;
  };
}

export default function Testimonials() {
  const testimonialsRef = useRef<HTMLDivElement>(null);

  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedReview, setSelectedReview] = useState<{
    name: string;
    review: string;
  } | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch("/api/testimonials");

        const data = await res.json();

        if (data.success) {
          setTestimonials(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const scrollRight = () => {
    testimonialsRef.current?.scrollBy({
      left: 450,
      behavior: "smooth",
    });
  };

  const scrollLeft = () => {
    testimonialsRef.current?.scrollBy({
      left: -450,
      behavior: "smooth",
    });
  };

  return (
    <>
      <section
        id="testimonials"
        className="bg-gradient-to-b from-white to-slate-50 py-12 md:py-20"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center justify-center mb-4">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-teal-700 bg-teal-50 px-4 py-2 rounded-full">
                Patient Stories
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
              <span>What Our </span>
              <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Patients Say
              </span>
            </h2>

            <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              Real stories from patients who trusted us with their recovery and
              achieved their health goals.
            </p>
          </div>

          {loading ? (
            <div className="text-center text-slate-500 py-10">
              Loading testimonials...
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center text-slate-500 py-10">
              No testimonials available.
            </div>
          ) : (
            <div className="relative group">
              <button
                onClick={scrollLeft}
                aria-label="Scroll left"
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white text-slate-600 shadow-lg opacity-0 group-hover:opacity-100 hover:bg-teal-600 hover:text-white transition"
              >
                <FaChevronLeft className="mx-auto" />
              </button>

              <button
                onClick={scrollRight}
                aria-label="Scroll right"
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white text-slate-600 shadow-lg opacity-0 group-hover:opacity-100 hover:bg-teal-600 hover:text-white transition"
              >
                <FaChevronRight className="mx-auto" />
              </button>

              <div
                ref={testimonialsRef}
                className="flex gap-5 md:gap-6 overflow-x-auto scroll-smooth touch-pan-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-4 md:px-8"
              >
                {testimonials.map((item) => (
                  <div
                    key={item._id}
                    className="min-w-[280px] md:min-w-[300px] bg-white rounded-xl md:rounded-2xl p-5 md:p-6 shadow-[0_2px_8px_rgba(15,23,42,0.06)] border border-slate-100 hover:shadow-[0_12px_32px_rgba(13,148,136,0.12)] hover:border-teal-200 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <img
                        src={item.image.url}
                        alt={item.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-teal-100"
                      />

                      <div className="min-w-0">
                        <h3 className="font-bold text-slate-900 text-sm md:text-base truncate">
                          {item.name}
                        </h3>

                        <p className="text-xs md:text-sm text-teal-600 font-medium truncate">
                          {item.condition}
                        </p>
                      </div>
                    </div>

                    <div className="text-amber-400 text-sm mb-3">
                      {Array.from({ length: item.rating }).map((_, index) => (
                        <span key={index}>★</span>
                      ))}
                    </div>

                    <p className="text-slate-600 text-sm md:text-base leading-relaxed line-clamp-3">
                      "{item.review}"
                    </p>

                    {item.review.length > 120 && (
                      <button
                        onClick={() =>
                          setSelectedReview({
                            name: item.name,
                            review: item.review,
                          })
                        }
                        className="mt-3 text-teal-600 font-semibold text-sm hover:text-teal-700 transition"
                      >
                        Read More →
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {selectedReview && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedReview(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-xl w-full p-6 md:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-slate-900">
                {selectedReview.name}
              </h3>

              <button
                onClick={() => setSelectedReview(null)}
                className="text-slate-400 hover:text-slate-700 text-3xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="w-20 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full mb-5" />

            <p className="text-slate-600 leading-relaxed text-base">
              {selectedReview.review}
            </p>

            <button
              onClick={() => setSelectedReview(null)}
              className="mt-6 bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}