"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const router = useRouter();

const handleLogin = (e: React.FormEvent) => {
  e.preventDefault();



  if (password === "admin123") {

    localStorage.setItem("admin", "true");

    window.location.href = "/admin/dashboard";
  } else {
    alert("Incorrect Password");
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-slate-800 text-center mb-6">
          Admin Login
        </h1>

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-slate-300 px-4 py-3 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 mb-5"
        />

        <button
          type="submit"
          className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Login
        </button>

        <p className="text-center text-sm text-slate-500 mt-4">
          Default Password: <span className="font-semibold">admin123</span>
        </p>
      </form>
    </div>
  );
}