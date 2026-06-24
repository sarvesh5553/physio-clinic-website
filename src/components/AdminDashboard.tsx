"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  MessageSquare,
  Stethoscope,
  CircleHelp,
  Globe,
  LogOut,
  Users,
  Clock3,
  CheckCircle,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("dashboard");

  const logout = () => {
    localStorage.removeItem("admin");
    router.push("/admin/login");
  };

  const menuItems = [
    {
      name: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "appointments",
      label: "Appointments",
      icon: <Calendar size={20} />,
    },
    {
      name: "testimonials",
      label: "Testimonials",
      icon: <MessageSquare size={20} />,
    },
    {
      name: "services",
      label: "Services",
      icon: <Stethoscope size={20} />,
    },
    {
      name: "faqs",
      label: "Faqs",
      icon: <CircleHelp size={20} />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F4F8F8] flex">
      {/* Sidebar */}
      <aside className="w-60 bg-white border-r border-teal-100 flex flex-col">
        <div className="p-5 border-b">
          <h1 className="text-3xl font-bold text-[#0D9488]">
            PhysioCare
          </h1>

          <p className="text-slate-500">
            Admin Panel
          </p>
        </div>

        {/* Doctor */}
        <div className="p-3">
          <div className="rounded-3xl bg-gradient-to-r from-[#0EA5A4] to-[#06B6D4] text-white p-4">
            <p className="text-sm opacity-90">
              Logged In As
            </p>

            <h3 className="font-bold text-xl mt-2">
              Dr. Bhagyashree Salunke
            </h3>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-2 py-2">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`w-full flex items-center gap-3 px-4 py-4 rounded-2xl mb-2 transition ${
                activeTab === item.name
                  ? "bg-gradient-to-r from-teal-50 to-cyan-50 text-[#0EA5A4]"
                  : "text-slate-700 hover:bg-teal-50"
              }`}
            >
              {item.icon}
              <span className="font-medium">
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        {/* Footer Buttons */}
        <div className="p-3 border-t">
          <button
            onClick={() => router.push("/")}
            className="w-full bg-gradient-to-r from-[#0EA5A4] to-[#06B6D4] text-white py-3 rounded-2xl font-semibold flex items-center justify-center gap-2"
          >
            <Globe size={18} />
            Go To Website
          </button>

          <button
            onClick={logout}
            className="w-full bg-gradient-to-r from-red-500 to-rose-500 text-white py-3 rounded-2xl font-semibold flex items-center justify-center gap-2 mt-3"
          >
            <LogOut size={18} />
            Logout
          </button>

          <p className="text-center text-xs text-slate-400 mt-4">
            © 2025 PhysioCare
          </p>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 overflow-auto">
        {activeTab === "dashboard" && (
          <>
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

            {/* Cards */}
            <div className="grid lg:grid-cols-3 gap-5 mt-5">
              <ManagementCard
                title="Appointments"
                description="Manage patient bookings"
              />

              <ManagementCard
                title="Testimonials"
                description="Manage patient reviews"
              />

              <ManagementCard
                title="Services"
                description="Manage clinic services"
              />
            </div>

            {/* Table */}
            <div className="bg-white rounded-3xl border border-teal-50 shadow-sm mt-5 overflow-hidden">
  <div className="flex items-center justify-between px-6 py-5 border-b">
    <h2 className="text-2xl font-bold text-black">
      Recent Appointments
    </h2>

    <button className="text-[#0EA5A4] font-semibold">
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
          Test
        </td>

        <td className="p-4 text-black">
          1234567890
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
          17 May 2025
        </td>
      </tr>
    </tbody>
  </table>
</div>

            <div className="text-center text-slate-500 text-sm mt-8">
              © 2025 PhysioCare. All rights reserved.
            </div>
          </>
        )}

        {activeTab !== "dashboard" && (
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-teal-50">
            <h2 className="text-3xl font-bold text-slate-800 capitalize">
              {activeTab}
            </h2>

            <p className="mt-3 text-slate-500">
              Manage {activeTab} from here.
            </p>
          </div>
        )}
      </main>
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
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-3xl border border-teal-50 shadow-sm p-5 hover:shadow-md transition">
      <h3 className="text-xl font-bold text-slate-800">
        {title}
      </h3>

      <p className="text-slate-500 mt-2">
        {description}
      </p>

      <button className="mt-5 text-[#0EA5A4] font-semibold flex items-center gap-2">
        Open <ArrowRight size={16} />
      </button>
    </div>
  );
}