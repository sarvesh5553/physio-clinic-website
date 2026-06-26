"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  MessageSquare,
  Stethoscope,
  CircleHelp,
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
    {
      label: "Services",
      href: "/admin/services",
      icon: <Stethoscope size={20} />,
    },
    {
      label: "FAQs",
      href: "/admin/faqs",
      icon: <CircleHelp size={20} />,
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-teal-100 flex flex-col">

      <div className="p-5 border-b">
        <h1 className="text-3xl font-bold text-[#0D9488]">
          PhysioCare
        </h1>

        <p className="text-slate-500">
          Admin Panel
        </p>
      </div>

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

      <nav className="flex-1 px-2 py-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-4 rounded-2xl mb-2 transition ${
              pathname === item.href
                ? "bg-gradient-to-r from-teal-50 to-cyan-50 text-[#0EA5A4]"
                : "text-slate-700 hover:bg-teal-50"
            }`}
          >
            {item.icon}

            <span className="font-medium">
              {item.label}
            </span>
          </Link>
        ))}
      </nav>

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

      </div>
    </aside>
  );
}