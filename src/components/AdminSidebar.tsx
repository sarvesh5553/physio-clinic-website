"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  MessageSquare,
  FileText,
  Globe,
  LogOut,
  Menu,
  X,
} from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      label: "Invoices",
      href: "/admin/invoices",
      icon: <FileText size={20} />,
    },
    {
      label: "Testimonials",
      href: "/admin/testimonials",
      icon: <MessageSquare size={20} />,
    },
  ];

  return (
    <>
      {/* ── MOBILE TOP NAVBAR (Hidden during printing) ── */}
      <div className="lg:hidden w-full bg-white border-b border-teal-100 sticky top-0 z-50 shadow-xs flex items-center justify-between px-4 py-3 print:hidden">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-[#0D9488]">PhysioCare</h1>
          <span className="text-[10px] bg-teal-50 text-[#0EA5A4] px-2 py-0.5 rounded-full font-bold border border-teal-100">
            ADMIN
          </span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2.5 rounded-xl bg-slate-50 text-slate-700 hover:bg-teal-50 hover:text-[#0EA5A4] transition border border-slate-200 flex items-center justify-center"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* ── BACKDROP DIMMER OVERLAY ── */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden print:hidden"
        />
      )}

      {/* ── SIDEBAR (Hidden during printing) ── */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 shrink-0 bg-white border-r border-teal-100 flex flex-col justify-between transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen print:hidden ${
          isMobileMenuOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        
        {/* Top Header & User Card Container */}
        <div className="flex flex-col">
          <div className="p-5 border-b border-teal-50 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#0D9488]">PhysioCare</h1>
              <p className="text-sm text-slate-500 font-medium">Admin Panel</p>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:bg-slate-100"
            >
              <X size={20} />
            </button>
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

          {/* Scrollable Nav Items */}
          <nav className="px-3 py-2 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
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
            onClick={() => {
              setIsMobileMenuOpen(false);
              router.push("/");
            }}
            className="w-full bg-gradient-to-r from-[#0EA5A4] to-[#06B6D4] text-white py-2.5 rounded-2xl font-semibold flex items-center justify-center gap-2 text-sm shadow-xs transition hover:opacity-95"
          >
            <Globe size={18} />
            <span>Go To Website</span>
          </button>

          <button
            onClick={logout}
            className="w-full bg-gradient-to-r from-red-500 to-rose-500 text-white py-2.5 rounded-2xl font-semibold flex items-center justify-center gap-2 text-sm shadow-xs transition hover:opacity-95"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>

      </aside>
    </>
  );
}