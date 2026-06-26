"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Download,
  Star,
  MessageSquare,
  CheckCircle,
  Clock3,
  Pencil,
  Trash2,
} from "lucide-react";

export default function Testimonials() {
  const [search, setSearch] = useState("");

  const testimonials = [
    {
      id: 1,
      photo: "https://i.pravatar.cc/100?img=1",
      name: "Rahul Sharma",
      problem: "Back Pain",
      rating: 5,
      date: "22 Jul 2025",
      status: "Approved",
    },
    {
      id: 2,
      photo: "https://i.pravatar.cc/100?img=2",
      name: "Priya Patil",
      problem: "Neck Pain",
      rating: 4,
      date: "23 Jul 2025",
      status: "Pending",
    },
    {
      id: 3,
      photo: "https://i.pravatar.cc/100?img=3",
      name: "Amit Singh",
      problem: "Sports Injury",
      rating: 5,
      date: "24 Jul 2025",
      status: "Approved",
    },
  ];

  const filteredTestimonials = useMemo(() => {
    return testimonials.filter((item) =>
      `${item.name} ${item.problem}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search]);

  const approved = testimonials.filter(
    (item) => item.status === "Approved"
  ).length;

  const pending = testimonials.filter(
    (item) => item.status === "Pending"
  ).length;

  const averageRating =
    testimonials.reduce(
      (acc, item) => acc + item.rating,
      0
    ) / testimonials.length;

  const downloadCSV = () => {
    const headers = [
      "Name",
      "Problem",
      "Rating",
      "Date",
      "Status",
    ];

    const rows = testimonials.map((item) => [
      item.name,
      item.problem,
      item.rating,
      item.date,
      item.status,
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "testimonials.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-5">

      {/* Header */}

      <div className="bg-gradient-to-r from-[#0EA5A4] to-[#06B6D4] rounded-2xl px-6 py-4 text-white shadow-md">
        <h1 className="text-3xl font-bold">
          Testimonials
        </h1>

        <p className="text-sm text-white/90 mt-1">
          Manage patient testimonials
        </p>
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
          title="Avg Rating"
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

        <div className="flex flex-col lg:flex-row gap-4 justify-between">

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
            className="bg-gradient-to-r from-[#0EA5A4] to-[#06B6D4] text-white px-4 py-2.5 rounded-xl font-semibold"
          >
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
                  Problem
                </th>

                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Rating
                </th>

                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Date
                </th>

                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Status
                </th>

                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredTestimonials.map(
                (item, index) => (
                  <tr
                    key={item.id}
                    className="border-t hover:bg-slate-50 transition"
                  >

                    <td className="px-4 py-3">
                      {index + 1}
                    </td>

                    <td className="px-4 py-3">

                      <img
                        src={item.photo}
                        alt={item.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />

                    </td>

                    <td className="px-4 py-3 font-medium text-slate-800">
                      {item.name}
                    </td>

                    <td className="px-4 py-3 text-slate-600">
                      {item.problem}
                    </td>

                    <td className="px-4 py-3">

                      <div className="flex gap-1">

                        {[...Array(item.rating)].map(
                          (_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className="fill-yellow-400 text-yellow-400"
                            />
                          )
                        )}

                      </div>

                    </td>

                    <td className="px-4 py-3 text-slate-600">
                      {item.date}
                    </td>

                    <td className="px-4 py-3">

                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          item.status === "Approved"
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {item.status}
                      </span>

                    </td>

                    <td className="px-4 py-3">

                      <div className="flex gap-2">

                        <button className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100">
                          <Pencil size={16} />
                        </button>

                        <button className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100">
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

      </div>

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