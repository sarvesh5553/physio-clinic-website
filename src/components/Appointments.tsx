"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Download,
  Users,
  Clock3,
  CheckCircle,
  CalendarDays,
} from "lucide-react";

export default function Appointments() {
  const [search, setSearch] = useState("");

  const appointments = [
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      phone: "9876543210",
      concern: "Back Pain",
      date: "22 Jul 2025",
      status: "Pending",
    },
    {
      id: 2,
      name: "Priya Patil",
      email: "priya@gmail.com",
      phone: "9988776655",
      concern: "Neck Pain",
      date: "23 Jul 2025",
      status: "Confirmed",
    },
    {
      id: 3,
      name: "Amit Singh",
      email: "amit@gmail.com",
      phone: "9870011223",
      concern: "Sports Injury",
      date: "24 Jul 2025",
      status: "Completed",
    },
    {
      id: 4,
      name: "Sneha Joshi",
      email: "sneha@gmail.com",
      phone: "9988221144",
      concern: "Shoulder Pain",
      date: "25 Jul 2025",
      status: "Pending",
    },
  ];

  const filteredAppointments = useMemo(() => {
    return appointments.filter((item) =>
      `${item.name} ${item.email} ${item.phone} ${item.concern}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search]);

  const total = appointments.length;

  const pending = appointments.filter(
    (item) => item.status === "Pending"
  ).length;

  const confirmed = appointments.filter(
    (item) => item.status === "Confirmed"
  ).length;

  const completed = appointments.filter(
    (item) => item.status === "Completed"
  ).length;

  const downloadCSV = () => {
    const headers = [
      "Serial No",
      "Name",
      "Email",
      "Phone",
      "Concern",
      "Date",
      "Status",
    ];

    const rows = appointments.map((item, index) => [
      index + 1,
      item.name,
      item.email,
      item.phone,
      item.concern,
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
    link.download = "appointments.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-5">
      {/* Header */}

      <div className="bg-gradient-to-r from-[#0EA5A4] to-[#06B6D4] rounded-2xl px-6 py-4 text-white shadow-md">
        <h1 className="text-3xl font-bold">
          Appointments
        </h1>

        <p className="text-sm text-white/90 mt-1">
          Manage all patient bookings
        </p>
      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mt-5">
        <StatCard
          title="Total"
          value={total}
          icon={
            <Users
              size={22}
              className="text-[#0EA5A4]"
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
          title="Confirmed"
          value={confirmed}
          icon={
            <CalendarDays
              size={22}
              className="text-blue-500"
            />
          }
        />

        <StatCard
          title="Completed"
          value={completed}
          icon={
            <CheckCircle
              size={22}
              className="text-green-500"
            />
          }
        />
      </div>

      {/* Search & Download */}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 mt-5">
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <div className="relative w-full lg:max-w-lg">
            <Search
              size={18}
              className="absolute left-4 top-3 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search patient, email, phone..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full border border-slate-200 rounded-xl pl-12 pr-4 py-2.5 outline-none focus:border-[#0EA5A4]"
            />
          </div>

          <button
            onClick={downloadCSV}
            className="bg-gradient-to-r from-[#0EA5A4] to-[#06B6D4] text-white px-4 py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2"
          >
            <Download size={16} />
            Download CSV
          </button>
        </div>
      </div>

      {/* Table */}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mt-5">
        <div className="px-5 py-4 border-b">
          <h2 className="text-xl font-bold text-slate-800">
            All Appointments
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
                  Patient
                </th>

                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Email
                </th>

                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Phone
                </th>

                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Concern
                </th>

                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Date
                </th>

                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredAppointments.map(
                (appointment, index) => (
                  <tr
                    key={appointment.id}
                    className="border-t hover:bg-slate-50 transition"
                  >
                    <td className="px-4 py-3 font-medium">
                      {index + 1}
                    </td>

                    <td className="px-4 py-3 font-medium text-slate-800">
                      {appointment.name}
                    </td>

                    <td className="px-4 py-3 text-slate-600">
                      {appointment.email}
                    </td>

                    <td className="px-4 py-3 text-slate-600">
                      {appointment.phone}
                    </td>

                    <td className="px-4 py-3 text-slate-600">
                      {appointment.concern}
                    </td>

                    <td className="px-4 py-3 text-slate-600">
                      {appointment.date}
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          appointment.status ===
                          "Completed"
                            ? "bg-green-100 text-green-700"
                            : appointment.status ===
                              "Confirmed"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {appointment.status}
                      </span>
                    </td>
                  </tr>
                )
              )}

              {filteredAppointments.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-10 text-slate-500"
                  >
                    No appointments found
                  </td>
                </tr>
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
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h3 className="text-2xl font-bold text-slate-800 mt-1">
            {value}
          </h3>
        </div>

        {icon}
      </div>
    </div>
  );
}