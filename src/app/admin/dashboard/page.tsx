"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminDashboard from "@/components/AdminDashboard";

export default function DashboardPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const isAdmin = localStorage.getItem("admin");

    if (isAdmin === "true") {
      setAuthorized(true);
    } else {
      router.replace("/admin/login");
    }
  }, [router]);

  if (!authorized) {
    return null;
  }

  return <AdminDashboard />;
}