"use client";

import { useRouter } from "next/navigation";
import {
  Users,
  Clock3,
  CheckCircle,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <div className="p-6">

      {/* Header */}

      <div className="bg-gradient-to-r from-[#0EA5A4] to-[#06B6D4] rounded-3xl px-10 py-6 shadow-md text-white">
        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <p className="mt-2 text-white/90">
          Welcome back Dr. Bhagyashree Salunke
        </p>
      </div>

      {/* Stats */}

      <div className="grid lg:grid-cols-4 gap-5 mt-5">

        <StatCard
          title="Total"
          value="1"
          icon={<Users size={30} className="text-[#0EA5A4]" />}
        />

        <StatCard
          title="Pending"
          value="1"
          icon={<Clock3 size={30} className="text-amber-500" />}
        />

        <StatCard
          title="Completed"
          value="0"
          icon={<CheckCircle size={30} className="text-green-500" />}
        />

        <StatCard
          title="Success"
          value="0%"
          icon={<TrendingUp size={30} className="text-sky-500" />}
        />

      </div>

      {/* Quick Actions */}

      <div className="grid lg:grid-cols-3 gap-5 mt-5">

        <ManagementCard
          title="Appointments"
          description="Manage patient bookings"
          route="/admin/appointments"
        />

        <ManagementCard
          title="Testimonials"
          description="Manage patient reviews"
          route="/admin/testimonials"
        />

        <ManagementCard
          title="Services"
          description="Manage clinic services"
          route="/admin/services"
        />

      </div>

      {/* Recent Appointments */}

      <div className="bg-white rounded-3xl border border-teal-50 shadow-sm mt-5 overflow-hidden">

        <div className="flex items-center justify-between px-6 py-5 border-b">

          <h2 className="text-2xl font-bold text-black">
            Recent Appointments
          </h2>

          <button
            onClick={() => router.push("/admin/appointments")}
            className="text-[#0EA5A4] font-semibold"
          >
            View All →
          </button>

        </div>

        <table className="w-full">

          <thead className="bg-[#F6FBFB]">

            <tr>

              <th className="text-left p-4 font-semibold text-black">
                Patient
              </th>

              <th className="text-left p-4 font-semibold text-black">
                Phone
              </th>

              <th className="text-left p-4 font-semibold text-black">
                Concern
              </th>

              <th className="text-left p-4 font-semibold text-black">
                Status
              </th>

              <th className="text-left p-4 font-semibold text-black">
                Date
              </th>

            </tr>

          </thead>

          <tbody>

            <tr className="border-t hover:bg-slate-50 transition">

              <td className="p-4 text-black font-medium">
                Rahul Sharma
              </td>

              <td className="p-4 text-black">
                9876543210
              </td>

              <td className="p-4 text-black">
                Back Pain
              </td>

              <td className="p-4">

                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                  Pending
                </span>

              </td>

              <td className="p-4 text-black">
                22 Jul 2025
              </td>

            </tr>

          </tbody>

        </table>

      </div>

      <div className="text-center text-slate-500 text-sm mt-8">
        © 2025 PhysioCare. All rights reserved.
      </div>

    </div>
  );
}

/* ---------- COMPONENTS ---------- */

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
    <div className="bg-white rounded-3xl border border-teal-50 shadow-sm p-4">

      <div className="flex justify-between items-center">

        <div>

          <p className="text-slate-500">
            {title}
          </p>

          <h3 className="text-2xl font-bold mt-2 text-slate-800">
            {value}
          </h3>

        </div>

        {icon}

      </div>

    </div>
  );
}

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
    <div className="bg-white rounded-3xl border border-teal-50 shadow-sm p-5 hover:shadow-md transition">

      <h3 className="text-xl font-bold text-slate-800">
        {title}
      </h3>

      <p className="text-slate-500 mt-2">
        {description}
      </p>

      <button
        onClick={() => router.push(route)}
        className="mt-5 text-[#0EA5A4] font-semibold flex items-center gap-2"
      >
        Open
        <ArrowRight size={16} />
      </button>

    </div>
  );
}