"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
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

const statusStyles = {
  Pending:
    "bg-orange-100 text-orange-700 border-orange-300",

  Confirmed:
    "bg-blue-100 text-blue-700 border-blue-300",

  Completed:
    "bg-green-100 text-green-700 border-green-300",

  Cancelled:
    "bg-red-100 text-red-700 border-red-300",
};

export default function Appointments() {
  const [search, setSearch] = useState("");

  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const [loading, setLoading] = useState(true);

  const [updatingId, setUpdatingId] = useState("");

  /**
   * Load all appointments
   */
  const loadAppointments = useCallback(async () => {
    try {
      const response = await fetch("/api/appointments");

      if (!response.ok) {
        throw new Error("Failed to fetch appointments");
      }

      const data = await response.json();

      if (data.success) {
        setAppointments(data.data);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Update Appointment Status
   */
  const updateStatus = async (
    id: string,
    status: Appointment["status"]
  ) => {
    try {
      setUpdatingId(id);

      const response = await fetch(
        `/api/appointments/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Unable to update appointment."
        );
      }

      // Reload latest data from DB
      await loadAppointments();
    } catch (error) {
      console.error(
        "Status Update Error:",
        error
      );

      alert("Failed to update status.");
    } finally {
      setUpdatingId("");
    }
  };

  /**
   * Initial Load
   */
  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

  /**
   * Search Filter
   */
  const filteredAppointments = useMemo(() => {
    return appointments.filter((item) =>
      `${item.fullName}
       ${item.email}
       ${item.phone}
       ${item.address}
       ${item.concern}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [appointments, search]);

  /**
   * Statistics
   */
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

  /**
   * Export CSV
   */
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

    const rows = appointments.map(
      (item, index) => [
        index + 1,
        item.fullName,
        item.email,
        item.phone,
        item.address,
        item.concern,
        new Date(
          item.createdAt
        ).toLocaleDateString(),
        item.status,
      ]
    );

    const csv = [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      "appointments.csv";

    link.click();

    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <p className="text-lg text-slate-500">
          Loading appointments...
        </p>
      </div>
    );
  }

  return (
  <div className="p-5">

    {/* Header */}

    <div className="rounded-2xl bg-gradient-to-r from-[#0EA5A4] to-[#06B6D4] px-6 py-5 text-white shadow-md">

      <h1 className="text-3xl font-bold">
        Appointments
      </h1>

      <p className="mt-1 text-sm text-white/90">
        Manage patient bookings and update their treatment status.
      </p>

    </div>

    {/* Dashboard Stats */}

    <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">

      <StatCard
        title="Total Appointments"
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

    {/* Search + Download */}

    <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div className="relative w-full lg:max-w-lg">

          <Search
            size={18}
            className="absolute left-4 top-3.5 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search patient, email, phone, address..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 outline-none transition focus:border-[#0EA5A4]"
          />

        </div>

        <button
          onClick={downloadCSV}
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0EA5A4] to-[#06B6D4] px-5 py-3 font-semibold text-white transition hover:opacity-90"
        >

          <Download size={18} />

          Download CSV

        </button>

      </div>

    </div>

    {/* Appointment Table */}

    <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      <div className="border-b px-6 py-4">

        <h2 className="text-xl font-bold text-slate-800">
          All Appointments
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {filteredAppointments.length} appointment(s) found
        </p>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="border-b bg-slate-50">

            <tr>

              <th className="px-4 py-4 text-left text-sm font-semibold text-slate-700">
                #
              </th>

              <th className="px-4 py-4 text-left text-sm font-semibold text-slate-700">
                Patient
              </th>

              <th className="px-4 py-4 text-left text-sm font-semibold text-slate-700">
                Email
              </th>

              <th className="px-4 py-4 text-left text-sm font-semibold text-slate-700">
                Phone
              </th>

              <th className="px-4 py-4 text-left text-sm font-semibold text-slate-700">
                Address
              </th>

              <th className="px-4 py-4 text-left text-sm font-semibold text-slate-700">
                Concern
              </th>

              <th className="px-4 py-4 text-left text-sm font-semibold text-slate-700">
                Booked On
              </th>

              <th className="px-4 py-4 text-left text-sm font-semibold text-slate-700">
                Status
              </th>

            </tr>

          </thead>

          <tbody>
  {filteredAppointments.map((appointment, index) => (
    <tr
      key={appointment._id}
      className="border-b transition hover:bg-slate-50"
    >
      <td className="px-4 py-4 text-slate-700">
        {index + 1}
      </td>

      <td className="px-4 py-4 font-semibold text-slate-800">
        {appointment.fullName}
      </td>

      <td className="px-4 py-4 text-slate-600">
        {appointment.email}
      </td>

      <td className="px-4 py-4 text-slate-600">
        {appointment.phone}
      </td>

      <td className="max-w-[220px] truncate px-4 py-4 text-slate-600">
        {appointment.address}
      </td>

      <td className="px-4 py-4 text-slate-600">
        {appointment.concern}
      </td>

      <td className="px-4 py-4 text-slate-600">
        {new Date(
          appointment.createdAt
        ).toLocaleDateString()}
      </td>

      <td className="px-4 py-4">

        <select
          value={appointment.status}
          disabled={updatingId === appointment._id}
          onChange={(e) =>
            updateStatus(
              appointment._id,
              e.target.value as Appointment["status"]
            )
          }
          className={`min-w-[140px] rounded-lg border px-3 py-2 text-sm font-semibold outline-none transition ${
            statusStyles[appointment.status]
          } ${
            updatingId === appointment._id
              ? "cursor-not-allowed opacity-60"
              : ""
          }`}
        >
          <option value="Pending">
            Pending
          </option>

          <option value="Confirmed">
            Confirmed
          </option>

          <option value="Completed">
            Completed
          </option>

          <option value="Cancelled">
            Cancelled
          </option>

        </select>

      </td>
    </tr>
  ))}

  {filteredAppointments.length === 0 && (
    <tr>
      <td
        colSpan={8}
        className="py-16 text-center text-slate-500"
      >
        <div className="flex flex-col items-center gap-2">

          <Users
            size={40}
            className="text-slate-300"
          />

          <p className="text-lg font-medium">
            No appointments found
          </p>

          <p className="text-sm">
            Try searching with another keyword.
          </p>

        </div>
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
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h3 className="mt-2 text-3xl font-bold text-slate-800">
            {value}
          </h3>

        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
          {icon}
        </div>

      </div>

    </div>
  );
}