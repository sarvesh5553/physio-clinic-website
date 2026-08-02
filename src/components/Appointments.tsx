"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Clock3,
  CalendarCheck,
  CheckCircle2,
  Search,
  Download,
  Calendar,
  User,
  FileSpreadsheet,
  X,
  Filter,
  Trash2,
} from "lucide-react";

interface Appointment {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  concern: string;
  status: string;
  createdAt: string;
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // CSV Modal State
  const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
  const [exportType, setExportType] = useState<"all" | "patient" | "date">("all");
  const [patientSearch, setPatientSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await fetch("/api/appointments");
      const data = await res.json();
      if (data.success) {
        setAppointments(data.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  // ── STATUS CHANGE HANDLER ──
  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();

      if (data.success) {
        setAppointments((prev) =>
          prev.map((item) => (item._id === id ? { ...item, status: newStatus } : item))
        );
      } else {
        alert(data.message || "Failed to update status.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Something went wrong while updating the status.");
    }
  };

  // ── DELETE HANDLER ──
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this appointment?")) return;

    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        setAppointments((prev) => prev.filter((item) => item._id !== id));
      } else {
        alert(data.message || "Failed to delete appointment.");
      }
    } catch (error) {
      console.error("Error deleting appointment:", error);
      alert("Something went wrong while deleting.");
    }
  };

  // ── CSV EXPORT HANDLER ──
  const handleExportCSV = () => {
    let filtered = [...appointments];

    if (exportType === "patient") {
      filtered = filtered.filter((item) =>
        item.fullName.toLowerCase().includes(patientSearch.toLowerCase().trim())
      );
    } else if (exportType === "date") {
      if (startDate) {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        filtered = filtered.filter((item) => new Date(item.createdAt) >= start);
      }
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        filtered = filtered.filter((item) => new Date(item.createdAt) <= end);
      }
    }

    if (filtered.length === 0) {
      alert("No appointments match the selected export criteria.");
      return;
    }

    const headers = [
      "Sr No",
      "Patient Name",
      "Email",
      "Phone",
      "Address",
      "Concern",
      "Status",
      "Booking Date",
    ];

    const rows = filtered.map((item, index) => [
      index + 1,
      `"${item.fullName.replace(/"/g, '""')}"`,
      `"${item.email || ""}"`,
      `"${item.phone}"`,
      `"${(item.address || "").replace(/"/g, '""')}"`,
      `"${(item.concern || "").replace(/"/g, '""')}"`,
      `"${item.status}"`,
      `"${new Date(item.createdAt).toLocaleDateString("en-IN")}"`,
    ]);

    const csvContent =
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = "data:text/csv;charset=utf-8," + encodeURIComponent(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `Appointments_Export_${exportType}_${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setIsCsvModalOpen(false);
  };

  // Search Filter for On-screen Table
  const filteredAppointments = appointments.filter((app) =>
    app.fullName.toLowerCase().includes(search.toLowerCase()) ||
    app.phone.includes(search) ||
    app.concern.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full bg-slate-50 p-5 space-y-4">
      
      {/* HEADER BANNER */}
      <div className="rounded-2xl bg-[#0EA5A4] px-6 py-4 text-white shadow-md">
        <h1 className="text-2xl font-bold">Appointments</h1>
        <p className="mt-0.5 text-xs text-white/90">
          Manage patient bookings and track treatment status.
        </p>
      </div>

      {/* STAT CARDS */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-xs flex justify-between items-center">
          <div>
            <p className="text-[10px] font-bold text-slate-400 tracking-wider">TOTAL APPOINTMENTS</p>
            <h3 className="text-xl font-bold text-slate-800">{appointments.length}</h3>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 border border-teal-100 text-[#0EA5A4]">
            <Users size={18} />
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-xs flex justify-between items-center">
          <div>
            <p className="text-[10px] font-bold text-slate-400 tracking-wider">PENDING</p>
            <h3 className="text-xl font-bold text-slate-800">
              {appointments.filter((a) => a.status === "Pending").length}
            </h3>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 border border-amber-100 text-amber-500">
            <Clock3 size={18} />
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-xs flex justify-between items-center">
          <div>
            <p className="text-[10px] font-bold text-slate-400 tracking-wider">CONFIRMED</p>
            <h3 className="text-xl font-bold text-slate-800">
              {appointments.filter((a) => a.status === "Confirmed").length}
            </h3>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-50 border border-sky-100 text-sky-500">
            <CalendarCheck size={18} />
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-xs flex justify-between items-center">
          <div>
            <p className="text-[10px] font-bold text-slate-400 tracking-wider">COMPLETED</p>
            <h3 className="text-xl font-bold text-slate-800">
              {appointments.filter((a) => a.status === "Completed").length}
            </h3>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-500">
            <CheckCircle2 size={18} />
          </div>
        </div>
      </div>

      {/* SEARCH BAR & DOWNLOAD CSV ACTION */}
      <div className="rounded-2xl border border-slate-200 bg-white p-2.5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search size={15} className="absolute left-3.5 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 py-1.5 pl-9 pr-3 text-xs text-slate-900 placeholder:text-slate-400 outline-none focus:border-[#0EA5A4]"
          />
        </div>

        <button
          onClick={() => setIsCsvModalOpen(true)}
          className="flex items-center gap-2 bg-[#0EA5A4] text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-teal-700 transition shadow-xs w-full sm:w-auto justify-center"
        >
          <Download size={15} />
          <span>Download CSV</span>
        </button>
      </div>

      {/* APPOINTMENTS TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col">
        <div className="px-5 py-3.5 border-b border-slate-200 flex-shrink-0">
          <h2 className="text-base font-bold text-slate-800">All Appointments</h2>
          <p className="text-xs text-slate-500">{filteredAppointments.length} appointment(s) found</p>
        </div>

        <div className="max-h-[400px] overflow-y-auto">
          <table className="w-full text-left border-collapse min-w-[950px]">
            <thead className="bg-slate-50 border-b border-slate-200 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 text-xs font-bold uppercase text-slate-700">NO</th>
                <th className="px-4 py-3 text-xs font-bold uppercase text-slate-700">PATIENT</th>
                <th className="px-4 py-3 text-xs font-bold uppercase text-slate-700">EMAIL</th>
                <th className="px-4 py-3 text-xs font-bold uppercase text-slate-700">PHONE</th>
                <th className="px-4 py-3 text-xs font-bold uppercase text-slate-700">ADDRESS</th>
                <th className="px-4 py-3 text-xs font-bold uppercase text-slate-700 min-w-[200px]">CONCERN</th>
                <th className="px-4 py-3 text-xs font-bold uppercase text-slate-700">STATUS</th>
                <th className="px-4 py-3 text-xs font-bold uppercase text-slate-700">DATE</th>
                <th className="px-4 py-3 text-xs font-bold uppercase text-slate-700 text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={9} className="text-center py-8 text-xs text-slate-500">
                    Loading appointments...
                  </td>
                </tr>
              ) : filteredAppointments.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-8 text-xs text-slate-500">
                    No appointments found.
                  </td>
                </tr>
              ) : (
                filteredAppointments.map((item, idx) => (
                  <tr key={item._id} className="hover:bg-slate-50/80 transition text-xs align-top">
                    <td className="px-4 py-3 font-medium text-slate-500">{idx + 1}</td>
                    <td className="px-4 py-3 font-bold text-slate-800 whitespace-nowrap">{item.fullName}</td>
                    <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{item.email}</td>
                    <td className="px-4 py-3 text-slate-600 font-mono whitespace-nowrap">{item.phone}</td>
                    <td className="px-4 py-3 text-slate-600">{item.address}</td>
                    <td className="px-4 py-3 text-slate-600 min-w-[200px] whitespace-normal break-words leading-relaxed">
                      {item.concern}
                    </td>
                    <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
                      <select
                        aria-label="Update appointment status"
                        value={item.status || "Pending"}
                        onChange={(e) => handleStatusChange(item._id, e.target.value)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold outline-none cursor-pointer transition ${
                          item.status === 'Confirmed' ? 'bg-sky-50 text-sky-600 border border-sky-200' :
                          item.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' :
                          'bg-amber-50 text-amber-600 border border-amber-200'
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
                      {item.createdAt ? new Date(item.createdAt).toLocaleDateString("en-IN") : "-"}
                    </td>
                    <td className="px-4 py-3 text-slate-600 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          aria-label="Delete appointment"
                          onClick={() => handleDelete(item._id)}
                          className="p-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── CUSTOM CSV EXPORT MODAL ── */}
      {isCsvModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-5 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-2 text-slate-800">
                <FileSpreadsheet size={18} className="text-[#0EA5A4]" />
                <h3 className="text-base font-bold">Export CSV Options</h3>
              </div>
              <button
                aria-label="Close export modal"
                onClick={() => setIsCsvModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Select Export Filter
              </label>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setExportType("all")}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-xs font-semibold transition ${
                    exportType === "all"
                      ? "border-[#0EA5A4] bg-teal-50 text-[#0EA5A4]"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Filter size={16} />
                  <span>Whole CSV</span>
                </button>

                <button
                  type="button"
                  onClick={() => setExportType("patient")}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-xs font-semibold transition ${
                    exportType === "patient"
                      ? "border-[#0EA5A4] bg-teal-50 text-[#0EA5A4]"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <User size={16} />
                  <span>By Patient</span>
                </button>

                <button
                  type="button"
                  onClick={() => setExportType("date")}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-xs font-semibold transition ${
                    exportType === "date"
                      ? "border-[#0EA5A4] bg-teal-50 text-[#0EA5A4]"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Calendar size={16} />
                  <span>Datewise</span>
                </button>
              </div>

              {exportType === "patient" && (
                <div className="pt-2">
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Patient Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter patient name..."
                    value={patientSearch}
                    onChange={(e) => setPatientSearch(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 py-2 px-3 text-xs text-slate-900 placeholder:text-slate-400 outline-none focus:border-[#0EA5A4]"
                  />
                </div>
              )}

              {exportType === "date" && (
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      From Date
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 py-1.5 px-3 text-xs text-slate-900 outline-none focus:border-[#0EA5A4]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      To Date
                    </label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 py-1.5 px-3 text-xs text-slate-900 outline-none focus:border-[#0EA5A4]"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 mt-6 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsCsvModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleExportCSV}
                className="flex items-center gap-1.5 bg-[#0EA5A4] text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-teal-700 transition"
              >
                <Download size={14} />
                <span>Export Now</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}