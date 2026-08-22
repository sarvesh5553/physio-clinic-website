"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminAuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("admin");

    if (isLoggedIn === "true") {
      setAuthorized(true);
    } else {
      router.replace("/admin-login");
    }
  }, [router]);

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Checking authentication...
      </div>
    );
  }

  return <>{children}</>;
}