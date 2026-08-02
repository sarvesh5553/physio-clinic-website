"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  MessageSquare,
  Globe,
  LogOut,
} from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("admin");
    router.push("/admin-login");
  };

  const menuItems = [
    {
      label: "Dashboard",
      href: "/admin/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      label: "Appointments",
      href: "/admin/appointments",
      icon: <Calendar size={20} />,
    },
    {
      label: "Testimonials",
      href: "/admin/testimonials",
      icon: <MessageSquare size={20} />,
    },
  ];

  return (
    // ── FIXED & LOCKED SIDEBAR (Stays on screen while page scrolls) ──
    <aside className="sticky top-0 h-screen w-64 shrink-0 bg-white border-r border-teal-100 flex flex-col justify-between z-30">
      
      {/* Top Header & User Card Container */}
      <div className="flex flex-col">
        <div className="p-5 border-b border-teal-50">
          <h1 className="text-3xl font-bold text-[#0D9488]">PhysioCare</h1>
          <p className="text-sm text-slate-500 font-medium">Admin Panel</p>
        </div>

        <div className="p-3">
          <div className="rounded-3xl bg-gradient-to-r from-[#0EA5A4] to-[#06B6D4] text-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-wider opacity-80 font-medium">
              Logged In As
            </p>
            <h3 className="font-bold text-lg mt-1 leading-snug">
              Dr. Bhagyashri Salunke
            </h3>
          </div>
        </div>

        {/* Scrollable Nav Items if Screen is Short */}
        <nav className="px-3 py-2 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition font-medium text-sm ${
                  isActive
                    ? "bg-gradient-to-r from-teal-50 to-cyan-50 text-[#0EA5A4] font-semibold"
                    : "text-slate-700 hover:bg-teal-50/60"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Action Buttons */}
      <div className="p-3 border-t border-teal-50 bg-white space-y-2.5">
        <button
          onClick={() => router.push("/")}
          className="w-full bg-gradient-to-r from-[#0EA5A4] to-[#06B6D4] text-white py-2.5 rounded-2xl font-semibold flex items-center justify-center gap-2 text-sm shadow-xs transition hover:opacity-95"
        >
          <Globe size={18} />
          Go To Website
        </button>

        <button
          onClick={logout}
          className="w-full bg-gradient-to-r from-red-500 to-rose-500 text-white py-2.5 rounded-2xl font-semibold flex items-center justify-center gap-2 text-sm shadow-xs transition hover:opacity-95"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

    </aside>
  );
}