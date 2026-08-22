"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Star, ChevronDown, ChevronUp } from "lucide-react";

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
  
  // Track expanded cards by ID
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const toggleReadMore = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch(`/api/testimonials?t=${Date.now()}`, {
          cache: "no-store",
        });
        const data = await res.json();

        if (data.success && Array.isArray(data.data)) {
          setTestimonials(data.data);
        } else if (Array.isArray(data)) {
          setTestimonials(data);
        }
      } catch (error) {
        console.error("Failed to load testimonials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <section id="testimonials" className="bg-slate-50/50 py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading Section */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center justify-center mb-4">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-teal-700 bg-teal-50 px-4 py-2 rounded-full">
              Feedback & Reviews
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            <span>What our </span>
            <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Patients Say</span>
          </h2>

          <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Real stories from patients who trusted us with their recovery and achieved their health goals.
          </p>
        </div>

        {/* Loading / Empty / Content States */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-sm text-slate-500 font-medium">Loading testimonials...</p>
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-sm text-slate-500 font-medium">No testimonials available right now.</p>
          </div>
        ) : (
          <div className="flex gap-4 md:gap-5 overflow-x-auto pb-6 pt-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {testimonials.map((testimonial) => {
              const isExpanded = !!expandedIds[testimonial._id];
              const isLongText = (testimonial.review?.length || 0) > 130;
              const imageUrl = testimonial.image?.url && testimonial.image.url.trim() !== "" 
                ? testimonial.image.url 
                : "/patients/default.png";

              return (
                <div
                  key={testimonial._id}
                  className="bg-white rounded-xl md:rounded-2xl p-4 md:p-5 shadow-[0_2px_8px_rgba(15,23,42,0.06)] border border-slate-100 hover:shadow-[0_12px_32px_rgba(13,148,136,0.12)] hover:border-teal-200 hover:scale-[1.03] transition-all duration-300 h-[260px] min-w-[280px] max-w-[280px] flex-shrink-0 flex flex-col justify-between cursor-pointer"
                >
                  <div className="w-full min-w-0 flex-1 flex flex-col overflow-hidden">
                    {/* Profile Header */}
                    <div className="flex items-center gap-3 mb-2.5 min-w-0 flex-shrink-0">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-slate-100 border border-slate-100">
                        <Image
                          src={imageUrl}
                          alt={testimonial.name}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      </div>

                      <div className="overflow-hidden min-w-0 flex-1">
                        <h3 className="text-sm font-bold text-slate-900 truncate leading-tight">
                          {testimonial.name}
                        </h3>
                        <p className="text-[11px] text-slate-400 font-medium truncate leading-tight mt-0.5">
                          {testimonial.condition}
                        </p>
                      </div>
                    </div>

                    {/* Stars Rating */}
                    <div className="flex gap-0.5 mb-2.5 flex-shrink-0">
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          size={13}
                          className={
                            index < (testimonial.rating || 5)
                              ? "fill-amber-400 text-amber-400"
                              : "fill-slate-200 text-slate-200"
                          }
                        />
                      ))}
                    </div>

                    {/* Review Text Area */}
                    <div className="flex-1 overflow-hidden">
                      <p
                        className={`text-slate-600 text-[11.5px] leading-relaxed break-words [word-break:break-word] ${
                          !isExpanded
                            ? "line-clamp-4"
                            : "h-full overflow-y-auto pr-1 scrollbar-thin"
                        }`}
                      >
                        "{testimonial.review}"
                      </p>
                    </div>
                  </div>

                  {/* Fixed Read More / Show Less Button Container */}
                  <div className="flex-shrink-0 pt-1.5">
                    {isLongText ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleReadMore(testimonial._id);
                        }}
                        className="text-[#0f969c] hover:text-[#0b7276] text-xs font-semibold flex items-center gap-1 transition-colors focus:outline-none"
                      >
                        <span>{isExpanded ? "Show less" : "Read more"}</span>
                        {isExpanded ? (
                          <ChevronUp size={13} />
                        ) : (
                          <ChevronDown size={13} />
                        )}
                      </button>
                    ) : (
                      <div className="h-4" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}