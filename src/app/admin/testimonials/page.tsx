"use client";

import AddEditTestimonialModal from "./AddEditTestimonialModal";
import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Star,
  MessageSquare,
  CheckCircle,
  Clock3,
  Pencil,
  Trash2,
  Plus,
  Eye,
  X,
} from "lucide-react";

interface Testimonial {
  _id: string;
  name: string;
  condition: string;
  review: string;
  rating: number;
  order?: number;
  image: {
    url: string;
    publicId: string;
  };
  isPublished: boolean;
  createdAt: string;
}

export default function AdminTestimonialsPage() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [previewTestimonial, setPreviewTestimonial] = useState<Testimonial | null>(null);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/testimonial");
      const data = await response.json();

      if (data.success) {
        const sorted = (data.data as Testimonial[]).sort(
          (a, b) => (a.order ?? 0) - (b.order ?? 0)
        );
        setTestimonials(sorted);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const togglePublishStatus = async (item: Testimonial) => {
    try {
      const response = await fetch(`/api/admin/testimonial/${item._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: !item.isPublished }),
      });
      const data = await response.json();
      if (data.success) fetchTestimonials();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      const response = await fetch(`/api/admin/testimonial/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) fetchTestimonials();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredTestimonials = useMemo(() => {
    return testimonials.filter((item) =>
      `${item.name} ${item.condition} ${item.review}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search, testimonials]);

  const approved = testimonials.filter((item) => item.isPublished).length;
  const pending = testimonials.filter((item) => !item.isPublished).length;
  const averageRating =
    testimonials.length > 0
      ? testimonials.reduce((acc, item) => acc + item.rating, 0) / testimonials.length
      : 0;

  return (
    <div className="min-h-screen w-full bg-slate-50 p-5 space-y-4">

      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-[#0EA5A4] to-[#06B6D4] px-6 py-4 text-white shadow-md">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold">Testimonials Management</h1>
            <p className="mt-0.5 text-xs text-white/90">
              Manage and review patient feedback for the website.
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedTestimonial(null);
              setOpenModal(true);
            }}
            className="flex items-center justify-center gap-1.5 bg-white text-[#0EA5A4] px-4 py-2 rounded-xl font-semibold hover:bg-slate-50 transition text-xs shadow-xs"
          >
            <Plus size={16} />
            Add Testimonial
          </button>
        </div>
      </div>

      {/* ── 1. COMPACT DASHBOARD STATS ── */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="TOTAL FEEDBACK"
          value={testimonials.length}
          icon={<MessageSquare size={18} className="text-[#0EA5A4]" />}
        />
        <StatCard
          title="PUBLISHED"
          value={approved}
          icon={<CheckCircle size={18} className="text-emerald-500" />}
        />
        <StatCard
          title="PENDING"
          value={pending}
          icon={<Clock3 size={18} className="text-amber-500" />}
        />
        <StatCard
          title="AVERAGE RATING"
          value={averageRating.toFixed(1)}
          icon={<Star size={18} className="text-yellow-500" />}
        />
      </div>

      {/* ── 2. COMPACT SEARCH BAR ── */}
<div className="rounded-2xl border border-slate-200 bg-white p-2.5 shadow-xs">
  <div className="relative w-full">
    <Search size={15} className="absolute left-3.5 top-2.5 text-slate-400" />
    <input
      type="text"
      placeholder="Search by patient name, condition, or review..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      /* Added 'text-slate-900' for dark input text */
      className="w-full rounded-xl border border-slate-200 py-1.5 pl-9 pr-3 text-xs text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-[#0EA5A4]"
    />
  </div>
</div>

      {/* LIST / TABLE VIEW */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-xs text-slate-500">
          Loading testimonials...
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[850px]">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 text-xs font-bold uppercase text-slate-700">Order</th>
                  <th className="px-4 py-3 text-xs font-bold uppercase text-slate-700">Photo</th>
                  <th className="px-4 py-3 text-xs font-bold uppercase text-slate-700">Patient</th>
                  <th className="px-4 py-3 text-xs font-bold uppercase text-slate-700">Condition</th>
                  <th className="px-4 py-3 text-xs font-bold uppercase text-slate-700">Rating</th>
                  <th className="px-4 py-3 text-xs font-bold uppercase text-slate-700">Status</th>
                  <th className="px-4 py-3 text-xs font-bold uppercase text-slate-700 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTestimonials.map((item, index) => (
                  <tr key={item._id} className="hover:bg-slate-50/80 transition">
                    <td className="px-4 py-3 text-xs font-bold text-slate-500">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3">
                      <img
                        src={item.image?.url || "/patients/default.png"}
                        alt={item.name}
                        className="w-9 h-9 rounded-full object-cover border border-slate-200"
                      />
                    </td>
                    <td className="px-4 py-3 font-semibold text-slate-800 text-xs">{item.name}</td>
                    <td className="px-4 py-3 text-slate-600 text-xs">{item.condition}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-0.5">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} size={11} className="fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => togglePublishStatus(item)}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                          item.isPublished
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                        }`}
                      >
                        {item.isPublished ? "Published" : "Hidden"}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center items-center gap-1.5">
                        <button onClick={() => setPreviewTestimonial(item)} className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition">
                          <Eye size={14} />
                        </button>
                        <button onClick={() => { setSelectedTestimonial(item); setOpenModal(true); }} className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition">
                          <Pencil size={14} />
                        </button>
                        <button onClick={() => handleDelete(item._id)} className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* FULL PREVIEW MODAL */}
      {previewTestimonial && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-center items-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 shadow-xl relative">
            <button onClick={() => setPreviewTestimonial(null)} className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600">
              <X size={18} />
            </button>
            <div className="flex items-center gap-3.5 mb-3">
              <img src={previewTestimonial.image?.url} alt={previewTestimonial.name} className="w-14 h-14 rounded-full object-cover border-2 border-teal-500" />
              <div>
                <h3 className="text-lg font-bold text-slate-900">{previewTestimonial.name}</h3>
                <p className="text-xs font-semibold text-teal-600">{previewTestimonial.condition}</p>
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl text-slate-700 text-xs leading-relaxed my-2">
              "{previewTestimonial.review}"
            </div>
          </div>
        </div>
      )}

      {/* ADD / EDIT MODAL */}
      <AddEditTestimonialModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedTestimonial(null);
        }}
        onSuccess={fetchTestimonials}
        testimonial={selectedTestimonial}
      />
    </div>
  );
}

// ── COMPACT STAT CARD COMPONENT ──
function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-xs">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold text-slate-400 tracking-wider">
            {title}
          </p>
          <h3 className="mt-0.5 text-xl font-bold text-slate-800">
            {value}
          </h3>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50 border border-slate-100">
          {icon}
        </div>
      </div>
    </div>
  );
}