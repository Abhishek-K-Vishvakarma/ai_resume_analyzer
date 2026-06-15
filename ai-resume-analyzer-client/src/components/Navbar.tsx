"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    router.push("/login");
    setMenuOpen(false);
  };

  const initials = user?.name ? user.name.slice(0, 2).toUpperCase() : "A";

  const navLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/resume", label: "Upload Resume" },
    { href: "/analysis", label: "Analysis" },
  ];

  return (
     <>
      {/* NAVBAR */}
      <nav className="h-16 flex items-center justify-between px-4 md:px-10 bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">

  {/* Logo */}
  <Link
    href="/dashboard"
    className="flex items-center gap-2 font-semibold text-gray-900"
  >
    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center text-white shadow-md">
      AI
    </div>
    <span className="text-gray-900 font-semibold">
      AI Resume Analyzer
    </span>
  </Link>

  {/* Desktop Menu */}
  <div className="hidden md:flex items-center gap-3 text-sm">

    {navLinks.map((link) => {
      const isActive = pathname === link.href;

      return (
        <Link
          key={link.href}
          href={link.href}
          className={`px-4 py-2 rounded-lg border transition-all duration-200
            ${
              isActive
                ? "bg-indigo-50 border-indigo-400 text-indigo-600 font-medium shadow-sm"
                : "border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-400 hover:bg-gray-50"
            }`}
        >
          {link.label}
        </Link>
      );
    })}

    {/* Divider */}
    <div className="h-6 w-px bg-gray-200 mx-2" />

    {/* User */}
    <div className="flex items-center gap-2 px-3 py-1 rounded-lg border border-gray-200 bg-gray-50">
      <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xs">
        {initials}
      </div>
      <span className="text-gray-700 text-sm font-medium">
        {user?.name}
      </span>
    </div>

    {/* Logout */}
    <button
      onClick={handleLogout}
      className="px-4 py-2 text-sm rounded-lg border border-red-200 text-red-500 bg-red-50 hover:bg-red-100 hover:border-red-300 transition cursor-pointer text-center"
    >
      Logout
    </button>
  </div>

  {/* Mobile Button */}
  <button
    onClick={() => setMenuOpen(!menuOpen)}
    className="md:hidden p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition"
  >
    {menuOpen ? "✕" : "☰"}
  </button>
</nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3 space-y-2">

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block px-3 py-2 rounded-lg text-sm ${
                pathname === link.href
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="border-t pt-3 mt-2">

            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 rounded-lg text-red-500 bg-red-50 cursor-pointer hover:bg-red-100 text-center"
            >
              Logout
            </button>

          </div>
        </div>
      )}
    </>
  );
}