"use client";

import AddEditTestimonialModal from "./AddEditTestimonialModal";
import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Download,
  Star,
  MessageSquare,
  CheckCircle,
  Clock3,
  Pencil,
  Trash2,
  Plus,
} from "lucide-react";

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
  isPublished: boolean;
  createdAt: string;
}

export default function Testimonials() {
  const [search, setSearch] = useState("");

 const [loading, setLoading] = useState(true);

const [openModal, setOpenModal] = useState(false);

const [selectedTestimonial, setSelectedTestimonial] =
  useState<Testimonial | null>(null);

const [testimonials, setTestimonials] = useState<
  Testimonial[]
>([]);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "/api/admin/testimonial"
      );

      const data = await response.json();

      if (data.success) {
        setTestimonials(data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = confirm(
      "Delete this testimonial?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `/api/admin/testimonial/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (data.success) {
        fetchTestimonials();
      } else {
        alert(data.message);
      }
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

  const approved = testimonials.filter(
    (item) => item.isPublished
  ).length;

  const pending = testimonials.filter(
    (item) => !item.isPublished
  ).length;

  const averageRating =
    testimonials.length > 0
      ? testimonials.reduce(
          (acc, item) => acc + item.rating,
          0
        ) / testimonials.length
      : 0;

  const downloadCSV = () => {
    const headers = [
      "Name",
      "Condition",
      "Rating",
      "Created",
      "Status",
    ];

    const rows = testimonials.map((item) => [
      item.name,
      item.condition,
      item.rating,
      new Date(
        item.createdAt
      ).toLocaleDateString(),
      item.isPublished
        ? "Approved"
        : "Pending",
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url =
      window.URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;
    link.download = "testimonials.csv";
    link.click();

    URL.revokeObjectURL(url);
  };
    return (
    <div className="p-5">
      {/* Header */}

      <div className="bg-gradient-to-r from-[#0EA5A4] to-[#06B6D4] rounded-2xl px-6 py-5 text-white shadow-md">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>

            <h1 className="text-3xl font-bold">
              Testimonials
            </h1>

            <p className="text-sm text-white/90 mt-1">
              Manage patient testimonials
            </p>

          </div>

         <button
  onClick={() => {
    setSelectedTestimonial(null);
    setOpenModal(true);
  }}
  className="flex items-center justify-center gap-2 bg-white text-[#0EA5A4] px-5 py-2.5 rounded-xl font-semibold hover:bg-slate-100 transition"
>
  <Plus size={18} />
  Add Testimonial
</button>

        </div>

      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mt-5">

        <StatCard
          title="Total"
          value={testimonials.length}
          icon={
            <MessageSquare
              size={22}
              className="text-[#0EA5A4]"
            />
          }
        />

        <StatCard
          title="Approved"
          value={approved}
          icon={
            <CheckCircle
              size={22}
              className="text-green-500"
            />
          }
        />

        <StatCard
          title="Pending"
          value={pending}
          icon={
            <Clock3
              size={22}
              className="text-orange-500"
            />
          }
        />

        <StatCard
          title="Average Rating"
          value={averageRating.toFixed(1)}
          icon={
            <Star
              size={22}
              className="text-yellow-500"
            />
          }
        />

      </div>

      {/* Search */}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 mt-5">

        <div className="flex flex-col lg:flex-row justify-between gap-4">

          <div className="relative w-full lg:max-w-lg">

            <Search
              size={18}
              className="absolute left-4 top-3 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search testimonials..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full border border-slate-200 rounded-xl pl-12 pr-4 py-2.5 outline-none focus:border-[#0EA5A4]"
            />

          </div>

          <button
            onClick={downloadCSV}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#0EA5A4] to-[#06B6D4] text-white px-5 py-2.5 rounded-xl font-semibold"
          >
            <Download size={18} />
            Download CSV
          </button>

        </div>

      </div>

      {/* Table */}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mt-5">

        <div className="px-5 py-4 border-b">

          <h2 className="text-xl font-bold text-slate-800">
            All Testimonials
          </h2>

        </div>

        {loading ? (

          <div className="py-16 text-center text-slate-500">

            Loading testimonials...

          </div>

        ) : filteredTestimonials.length === 0 ? (

          <div className="py-16 text-center text-slate-500">

            No testimonials found.

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-slate-50">

                <tr>

                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    #
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Photo
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Patient
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Condition
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Rating
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Created
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Status
                  </th>

                  <th className="px-4 py-3 text-center text-sm font-semibold">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>
                {filteredTestimonials.map(
                (item, index) => (
                  <tr
                    key={item._id}
                    className="border-t hover:bg-slate-50 transition"
                  >
                    <td className="px-4 py-3">
                      {index + 1}
                    </td>

                    <td className="px-4 py-3">
                      <img
                        src={item.image.url}
                        alt={item.name}
                        className="w-10 h-10 rounded-full object-cover border"
                      />
                    </td>

                    <td className="px-4 py-3">
                      <div>
                        <p className="font-semibold text-slate-800">
                          {item.name}
                        </p>

                        <p className="text-xs text-slate-500 line-clamp-1">
                          {item.review}
                        </p>
                      </div>
                    </td>

                    <td className="px-4 py-3 text-slate-600">
                      {item.condition}
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        {Array.from({
                          length: item.rating,
                        }).map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className="fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                    </td>

                    <td className="px-4 py-3 text-slate-600">
                      {new Date(
                        item.createdAt
                      ).toLocaleDateString()}
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          item.isPublished
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {item.isPublished
                          ? "Approved"
                          : "Pending"}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex justify-center gap-2">

                      <button
  onClick={() => {
    setSelectedTestimonial(item);
    setOpenModal(true);
  }}
  className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
>
  <Pencil size={16} />
</button>

                        <button
                          onClick={() =>
                            handleDelete(item._id)
                          }
                          className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                        >
                          <Trash2 size={16} />
                        </button>

                      </div>
                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

      )}

      </div>
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
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">

      <div className="flex justify-between items-center">

        <div>

          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h3 className="text-2xl font-bold mt-1 text-slate-800">
            {value}
          </h3>

        </div>

        {icon}

      </div>

    </div>
  );
}