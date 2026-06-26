"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Download,
  Users,
  Clock3,
  CheckCircle,
  CalendarDays,
} from "lucide-react";

interface Appointment {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  concern: string;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
  createdAt: string;
}

export default function Appointments() {
  const [search, setSearch] = useState("");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);



useEffect(() => {
  const loadAppointments = async () => {
    try {
      const response = await fetch("/api/appoint");
      const data = await response.json();

      if (data.success) {
        setAppointments(data.data);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  loadAppointments();
}, []);
  const filteredAppointments = useMemo(() => {
    return appointments.filter((item) =>
      `${item.fullName} ${item.email} ${item.phone} ${item.address} ${item.concern}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [appointments, search]);

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
      "Patient",
      "Email",
      "Phone",
      "Address",
      "Concern",
      "Booked On",
      "Status",
    ];

    const rows = appointments.map((item, index) => [
      index + 1,
      item.fullName,
      item.email,
      item.phone,
      item.address,
      item.concern,
      new Date(item.createdAt).toLocaleDateString(),
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <p className="text-slate-500 text-lg">
          Loading appointments...
        </p>
      </div>
    );
  }
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
          icon={<Users size={22} className="text-[#0EA5A4]" />}
        />

        <StatCard
          title="Pending"
          value={pending}
          icon={<Clock3 size={22} className="text-orange-500" />}
        />

        <StatCard
          title="Confirmed"
          value={confirmed}
          icon={<CalendarDays size={22} className="text-blue-500" />}
        />

        <StatCard
          title="Completed"
          value={completed}
          icon={<CheckCircle size={22} className="text-green-500" />}
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
              placeholder="Search patient, email, phone, address..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
                  Address
                </th>

                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Concern
                </th>

                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Booked On
                </th>

                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredAppointments.map((appointment, index) => (

                <tr
                  key={appointment._id}
                  className="border-t hover:bg-slate-50 transition"
                >

                  <td className="px-4 py-3">
                    {index + 1}
                  </td>

                  <td className="px-4 py-3 font-medium text-slate-800">
                    {appointment.fullName}
                  </td>

                  <td className="px-4 py-3 text-slate-600">
                    {appointment.email}
                  </td>

                  <td className="px-4 py-3 text-slate-600">
                    {appointment.phone}
                  </td>

                  <td className="px-4 py-3 text-slate-600 max-w-[220px] truncate">
                    {appointment.address}
                  </td>

                  <td className="px-4 py-3 text-slate-600">
                    {appointment.concern}
                  </td>

                  <td className="px-4 py-3 text-slate-600">
                    {new Date(
                      appointment.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-3">

                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        appointment.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : appointment.status === "Confirmed"
                          ? "bg-blue-100 text-blue-700"
                          : appointment.status === "Cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {appointment.status}
                    </span>

                  </td>

                </tr>

              ))}

              {filteredAppointments.length === 0 && (

                <tr>

                  <td
                    colSpan={8}
                    className="text-center py-10 text-slate-500"
                  >
                    No appointments found.
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
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500 font-medium">
            {title}
          </p>

          <h3 className="text-2xl font-bold text-slate-800 mt-1">
            {value}
          </h3>
        </div>

        <div className="w-11 h-11 rounded-xl bg-slate-50 flex items-center justify-center">
          {icon}
        </div>
      </div>
    </div>
  );
}