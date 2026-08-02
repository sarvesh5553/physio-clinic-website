"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  Clock3,
  CheckCircle,
  TrendingUp,
  ArrowRight,
  Calendar,
  Sparkles,
} from "lucide-react";

interface Appointment {
  _id: string;
  fullName: string;
  phone: string;
  concern: string;
  status: string;
  createdAt: string;
}

interface DashboardStats {
  total: number;
  pending: number;
  completed: number;
  success: number;
}

export default function AdminDashboard() {
  const router = useRouter();

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    total: 0,
    pending: 0,
    completed: 0,
    success: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [appointmentsRes, statsRes] = await Promise.all([
          fetch("/api/appointments/recent"),
          fetch("/api/admin/dashboard"),
        ]);

        const appointmentsData = await appointmentsRes.json();
        const statsData = await statsRes.json();

        if (appointmentsData.success) {
          setAppointments(appointmentsData.data || []);
        }

        if (statsData.success) {
          setStats(
            statsData.data || { total: 0, pending: 0, completed: 0, success: 0 }
          );
        }
      } catch (error) {
        console.error("Failed to load dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className="min-h-screen w-full bg-slate-50 p-5 space-y-4">

      {/* ── HEADER BANNER ── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0EA5A4] via-[#0D9488] to-[#06B6D4] px-6 py-4 text-white shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="mt-0.5 text-xs text-white/90">
              Welcome back, <span className="font-semibold text-white">Dr. Bhagyashri Salunke</span>
            </p>
          </div>

          <div className="self-start md:self-auto bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 text-xs font-medium flex items-center gap-2">
            <Calendar size={14} />
            <span>
              {new Date().toLocaleDateString("en-IN", {
                weekday: "short",
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>

      {/* ── COMPACT DASHBOARD STATS ── */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="TOTAL APPOINTMENTS"
          value={(stats?.total ?? 0).toString()}
          icon={<Users size={18} className="text-[#0EA5A4]" />}
        />
        <StatCard
          title="PENDING"
          value={(stats?.pending ?? 0).toString()}
          icon={<Clock3 size={18} className="text-amber-500" />}
        />
        <StatCard
          title="COMPLETED"
          value={(stats?.completed ?? 0).toString()}
          icon={<CheckCircle size={18} className="text-emerald-500" />}
        />
        <StatCard
          title="SUCCESS RATE"
          value={`${stats?.success ?? 0}%`}
          icon={<TrendingUp size={18} className="text-sky-500" />}
        />
      </div>

      {/* ── QUICK MANAGEMENT ACTIONS ── */}
      <div className="grid gap-3 md:grid-cols-2">
        <ManagementCard
          title="Appointments Management"
          description="Manage patient bookings, scheduling, and request updates."
          route="/admin/appointments"
        />
        <ManagementCard
          title="Testimonials Management"
          description="Manage, reorder, and approve patient feedback and reviews."
          route="/admin/testimonials"
        />
      </div>

      {/* ── RECENT APPOINTMENTS TABLE ── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Table Header Controls */}
        <div className="flex items-center justify-between gap-3 px-5 py-3.5 border-b border-slate-200">
          <div>
            <h2 className="text-base font-bold text-slate-800">
              Recent Appointments
            </h2>
            <p className="text-xs text-slate-500">
              Latest patient booking submissions
            </p>
          </div>

          <button
            onClick={() => router.push("/admin/appointments")}
            className="inline-flex items-center gap-1 text-[#0EA5A4] font-semibold text-xs hover:text-teal-700 transition-colors group"
          >
            <span>View All</span>
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Scrollable Container for Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-xs font-bold uppercase text-slate-700">Patient</th>
                <th className="px-4 py-3 text-xs font-bold uppercase text-slate-700">Phone</th>
                <th className="px-4 py-3 text-xs font-bold uppercase text-slate-700">Concern</th>
                <th className="px-4 py-3 text-xs font-bold uppercase text-slate-700">Status</th>
                <th className="px-4 py-3 text-xs font-bold uppercase text-slate-700">Date</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-xs text-slate-500">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-3.5 h-3.5 border-2 border-[#0EA5A4] border-t-transparent rounded-full animate-spin" />
                      Loading recent appointments...
                    </div>
                  </td>
                </tr>
              ) : appointments.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-xs text-slate-500">
                    No appointments recorded in the last 24 hours.
                  </td>
                </tr>
              ) : (
                appointments.map((appointment) => (
                  <tr key={appointment._id} className="hover:bg-slate-50/80 transition">
                    <td className="px-4 py-3 font-semibold text-slate-800 text-xs">
                      {appointment.fullName}
                    </td>

                    <td className="px-4 py-3 text-slate-600 font-mono text-xs">
                      {appointment.phone}
                    </td>

                    <td className="px-4 py-3 text-slate-600 text-xs max-w-[200px] truncate">
                      {appointment.concern}
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                          appointment.status === "Completed"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : appointment.status === "Cancelled"
                            ? "bg-rose-50 text-rose-700 border-rose-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                        }`}
                      >
                        {appointment.status}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-slate-500 text-xs whitespace-nowrap">
                      {new Date(appointment.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-slate-400 text-xs py-2">
        © 2025 PhysioCare. All rights reserved.
      </div>
    </div>
  );
}

/* ── COMPACT STAT CARD COMPONENT ── */
function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
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

/* ── COMPACT MANAGEMENT CARD COMPONENT ── */
function ManagementCard({
  title,
  description,
  route,
}: {
  title: string;
  description: string;
  route: string;
}) {
  const router = useRouter();

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 hover:border-teal-300 transition-all flex items-center justify-between gap-4 group">
      <div>
        <h3 className="text-base font-bold text-slate-800">
          {title}
        </h3>
        <p className="text-slate-500 text-xs mt-0.5">
          {description}
        </p>
      </div>

      <button
        onClick={() => router.push(route)}
        className="flex items-center gap-1 text-[#0EA5A4] font-bold text-xs hover:gap-1.5 transition-all shrink-0 bg-teal-50 px-3 py-2 rounded-xl"
      >
        <span>Open</span>
        <ArrowRight size={14} />
      </button>
    </div>
  );
}