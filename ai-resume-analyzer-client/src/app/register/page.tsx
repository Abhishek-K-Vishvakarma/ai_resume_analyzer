"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import API from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await API.post("/auth/register", formData);
      login(data.token, data.user);
      toast.success("Account created! Welcome 🎉");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-8 relative overflow-hidden"
      style={{ background: "#ffffff" }}
    >
      {/* Grid bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(99,102,241,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.06) 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Orbs */}
      <div
        className="absolute top-[-60px] right-[-60px] w-72 h-72 rounded-full pointer-events-none"
        style={{ background: "rgba(99,102,241,0.08)", filter: "blur(60px)" }}
      />
      <div
        className="absolute bottom-[-40px] left-[-40px] w-52 h-52 rounded-full pointer-events-none"
        style={{ background: "rgba(6,182,212,0.06)", filter: "blur(60px)" }}
      />

      <div className="flex flex-col lg:flex-row items-center gap-12 w-full max-w-4xl relative z-10">

        {/* Left — AI visual (same as login) */}
        <div className="flex flex-col items-center flex-1">
          <div className="relative w-44 h-44 flex items-center justify-center mb-6">
            {[0, 12, 24].map((inset, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  inset,
                  border: `${1.5 - i * 0.5}px dashed rgba(${
                    i === 0
                      ? "99,102,241"
                      : i === 1
                      ? "6,182,212"
                      : "168,85,247"
                  },${0.4 - i * 0.1})`,
                  animation: `${i % 2 === 0 ? "spin" : "spinRev"} ${
                    12 - i * 3
                  }s linear infinite`,
                }}
              />
            ))}

            <div
              className="absolute rounded-full"
              style={{
                inset: 36,
                border: "2px solid rgba(99,102,241,0.5)",
                animation: "pulseRing 2.5s ease-in-out infinite",
              }}
            />

            {[
              { color: "#6366f1", delay: "0s" },
              { color: "#06b6d4", delay: "-1.5s" },
              { color: "#a855f7", delay: "-3s" },
            ].map((d, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: d.color,
                  top: "50%",
                  left: "50%",
                  marginTop: -4,
                  marginLeft: -4,
                  animation: `orbit${i + 1} ${3 + i}s linear infinite ${d.delay}`,
                  transformOrigin: `${-62 + i * 6}px ${-62 + i * 6}px`,
                }}
              />
            ))}

            <div
              className="relative z-10 w-20 h-20 rounded-full flex items-center justify-center"
              style={{
                background: "#0f0f1a",
                border: "2px solid #6366f1",
                animation: "float 4s ease-in-out infinite, rgbBorder 4s linear infinite",
              }}
            >
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#6366f1"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
                <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
              </svg>
            </div>
          </div>

          <h1
            className="text-2xl font-semibold mb-2"
            style={{ color: "#0f0f13", letterSpacing: "-0.02em" }}
          >
            AI{" "}
            <span
              style={{
                background: "linear-gradient(90deg,#6366f1,#06b6d4,#a855f7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Resume
            </span>{" "}
            Analyzer
          </h1>

          <p
            className="text-sm text-center max-w-48 mb-6"
            style={{ color: "#6b7280", lineHeight: 1.6 }}
          >
            Powered by Gemini AI to boost your career
          </p>

          <div className="flex flex-col gap-2.5 w-full max-w-52">
            {[
              { color: "#6366f1", label: "ATS score analysis" },
              { color: "#06b6d4", label: "Instant AI feedback" },
              { color: "#a855f7", label: "Smart suggestions" },
            ].map((f, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl"
                style={{
                  background: "rgba(99,102,241,0.04)",
                  border: "1px solid rgba(99,102,241,0.1)",
                }}
              >
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: f.color }}
                />
                <span className="text-xs" style={{ color: "#374151" }}>
                  {f.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Register card */}
        <div className="w-full max-w-sm flex-shrink-0">
          <div
            className="rounded-2xl p-8"
            style={{
              background: "#ffffff",
              border: "1px solid rgba(99,102,241,0.2)",
              boxShadow: "0 8px 40px rgba(99,102,241,0.08)",
            }}
          >
            <div className="text-center mb-7">
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-3 text-xs"
                style={{
                  background: "rgba(99,102,241,0.08)",
                  border: "1px solid rgba(99,102,241,0.2)",
                  color: "#534AB7",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                AI powered
              </div>
              <h2
                className="text-xl font-semibold mb-1.5"
                style={{ color: "#0f0f13" }}
              >
                Create account
              </h2>
              <p className="text-sm" style={{ color: "#6b7280" }}>
                Start your AI-powered journey
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  className="block text-xs mb-1.5"
                  style={{ color: "#374151" }}
                >
                  Full name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl px-3.5 py-3 text-sm outline-none transition-all"
                  style={{
                    background: "#f8f8ff",
                    border: "1px solid rgba(99,102,241,0.2)",
                    color: "#0f0f13",
                    fontFamily: "inherit",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#6366f1")}
                  onBlur={(e) =>
                    (e.target.style.borderColor = "rgba(99,102,241,0.2)")
                  }
                />
              </div>
              <div>
                <label
                  className="block text-xs mb-1.5"
                  style={{ color: "#374151" }}
                >
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl px-3.5 py-3 text-sm outline-none transition-all"
                  style={{
                    background: "#f8f8ff",
                    border: "1px solid rgba(99,102,241,0.2)",
                    color: "#0f0f13",
                    fontFamily: "inherit",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#6366f1")}
                  onBlur={(e) =>
                    (e.target.style.borderColor = "rgba(99,102,241,0.2)")
                  }
                />
              </div>
              <div>
  <label className="block text-xs mb-1.5" style={{ color: "#374151" }}>Password</label>
  <div className="relative">
    <input
      type={showPassword ? "text" : "password"}
      name="password"
      placeholder="••••••••"
      value={formData.password}
      onChange={handleChange}
      required
      className="w-full rounded-xl px-3.5 py-3 text-sm outline-none transition-all"
      style={{
        background: "#ffffff",
        border: "1px solid rgba(99,102,241,0.2)",
        color: "#0f0f13",
        fontFamily: "inherit",
        paddingRight: "42px",
      }}
      onFocus={(e) => (e.target.style.borderColor = "#6366f1")}
      onBlur={(e) => (e.target.style.borderColor = "rgba(99,102,241,0.2)")}
    />
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-1/2 -translate-y-1/2"
      style={{ background: "none", border: "none", cursor: "pointer", padding: 0, color: "#9ca3af", display: "flex" }}
    >
      {showPassword ? (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
          <line x1="1" y1="1" x2="23" y2="23"/>
        </svg>
      ) : (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      )}
    </button>
  </div>
</div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl text-sm font-medium text-white transition-opacity mt-1"
                style={{
                  background: "linear-gradient(135deg,#6366f1,#06b6d4)",
                  opacity: loading ? 0.7 : 1,
                  fontFamily: "inherit",
                }}
              >
                {loading ? "Creating account..." : "Create account"}
              </button>
            </form>

            <div className="flex items-center gap-2.5 my-5">
              <div className="flex-1 h-px" style={{ background: "rgba(0,0,0,0.08)" }} />
              <span className="text-xs" style={{ color: "#9ca3af" }}>or</span>
              <div className="flex-1 h-px" style={{ background: "rgba(0,0,0,0.08)" }} />
            </div>

            <p className="text-center text-sm" style={{ color: "#6b7280" }}>
              Already have an account?{" "}
              <Link href="/login" style={{ color: "#6366f1", textDecoration: "none" }}>
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes spinRev{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}
        @keyframes pulseRing{0%,100%{transform:scale(1);opacity:.6}50%{transform:scale(1.1);opacity:.2}}
        @keyframes rgbBorder{0%{border-color:#6366f1}33%{border-color:#06b6d4}66%{border-color:#a855f7}100%{border-color:#6366f1}}
        @keyframes orbit1{from{transform:rotate(0deg) translateX(74px)}to{transform:rotate(360deg) translateX(74px)}}
        @keyframes orbit2{from{transform:rotate(120deg) translateX(74px)}to{transform:rotate(480deg) translateX(74px)}}
        @keyframes orbit3{from{transform:rotate(240deg) translateX(74px)}to{transform:rotate(600deg) translateX(74px)}}
      `}</style>
    </div>
  );
}