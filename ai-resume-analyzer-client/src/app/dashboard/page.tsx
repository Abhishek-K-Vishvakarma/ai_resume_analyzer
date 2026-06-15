"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import ATSCard from "@/components/ATSCard";
import DashboardStats from "@/components/DashboardStats";
import API from "@/services/api";

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [totalResumes, setTotalResumes] = useState(0);
  const [totalAnalysis, setTotalAnalysis] = useState(0);
  const [averageATS, setAverageATS] = useState(0);
  const [latestATS, setLatestATS] = useState(0);
  const [planeKey, setPlaneKey] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [resumeRes, analysisRes] = await Promise.all([
          API.get("/resume/my-resumes"),
          API.get("/analysis/my-analysis"),
        ]);
        const resumes = resumeRes.data.resumes || [];
        const analyses = analysisRes.data.analysises || [];
        setTotalResumes(resumes.length);
        setTotalAnalysis(analyses.length);
        if (analyses.length > 0) {
          const avg =
            analyses.reduce((sum: number, a: any) => sum + a.atsScore, 0) /
            analyses.length;
          setAverageATS(Math.round(avg));
          setLatestATS(analyses[0].atsScore);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchStats();
  }, []);

  useEffect(() => {
    const id = setInterval(() => setPlaneKey((k) => k + 1), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <ProtectedRoute>
      <div
        className="min-h-screen relative overflow-x-hidden"
        style={{ background: "#ffffff" }}
      >
        {/* Grid bg */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(99,102,241,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.05) 1px,transparent 1px)",
            backgroundSize: "40px 40px",
            zIndex: 0,
          }}
        />
        {/* Orbs */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: -60, right: -60, width: 300, height: 300,
            borderRadius: "50%", background: "rgba(99,102,241,0.08)",
            filter: "blur(70px)", zIndex: 0,
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: 40, left: -40, width: 220, height: 220,
            borderRadius: "50%", background: "rgba(6,182,212,0.06)",
            filter: "blur(60px)", zIndex: 0,
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            top: "40%", left: "40%", width: 180, height: 180,
            borderRadius: "50%", background: "rgba(168,85,247,0.04)",
            filter: "blur(60px)", zIndex: 0,
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

          {/* ── Hero card with plane ── */}
          <div
            className="rounded-2xl p-6 sm:p-8 mb-5 overflow-hidden relative"
            style={{
              background: "#fff",
              border: "1px solid rgba(99,102,241,0.18)",
              boxShadow: "0 4px 32px rgba(99,102,241,0.08)",
              minHeight: 210,
            }}
          >
            {/* Inner grid */}
            <div
              className="absolute inset-0 pointer-events-none rounded-2xl"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(99,102,241,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.04) 1px,transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />

            {/* Plane track */}
            <div
              className="absolute inset-0 overflow-hidden pointer-events-none"
              style={{ zIndex: 1 }}
            >
              {/* Dotted path */}
              <div
                style={{
                  position: "absolute",
                  top: "52%",
                  left: 0,
                  right: 0,
                  height: 1,
                  backgroundImage:
                    "repeating-linear-gradient(90deg,rgba(99,102,241,0.18) 0,rgba(99,102,241,0.18) 6px,transparent 6px,transparent 14px)",
                  transform: "translateY(-50%)",
                }}
              />
              {/* Trail */}
              <div
                key={`trail-${planeKey}`}
                style={{
                  position: "absolute",
                  top: "52%",
                  left: 0,
                  height: 2,
                  borderRadius: 2,
                  background:
                    "linear-gradient(90deg,transparent,rgba(99,102,241,0.5),rgba(6,182,212,0.6),rgba(168,85,247,0.3),transparent)",
                  transform: "translateY(-50%)",
                  animation: "trailGrow 4.5s ease-out forwards",
                }}
              />
              {/* Sparkles */}
              {[20, 35, 50, 65, 80].map((pct, i) => (
                <div
                  key={`sp-${planeKey}-${i}`}
                  style={{
                    position: "absolute",
                    top: `${44 + (i % 3) * 5}%`,
                    left: `${pct}%`,
                    width: i % 2 === 0 ? 4 : 3,
                    height: i % 2 === 0 ? 4 : 3,
                    borderRadius: "50%",
                    background: ["#6366f1","#06b6d4","#a855f7","#6366f1","#06b6d4"][i],
                    opacity: 0,
                    animation: `sparkle 4.5s ${0.4 + i * 0.5}s forwards`,
                  }}
                />
              ))}
              {/* Plane */}
              <div
                key={`plane-${planeKey}`}
                style={{
                  position: "absolute",
                  top: "40%",
                  transform: "translateY(-52%)",
                  animation: "flyAcross 4.5s cubic-bezier(0.3,0,0.7,1) forwards",
                }}
              >
                <div style={{ animation: "floatPlane 1.8s ease-in-out infinite" }}>
                  <svg
                    width="64" height="64" viewBox="0 0 64 64"
                    style={{ filter: "drop-shadow(0 3px 10px rgba(99,102,241,0.35))" }}
                  >
                    <circle cx="32" cy="32" r="28" fill="rgba(99,102,241,0.07)" stroke="rgba(99,102,241,0.18)" strokeWidth="1" />
                    <ellipse cx="32" cy="32" rx="16" ry="6" fill="#6366f1" transform="rotate(-20,32,32)" />
                    <ellipse cx="45" cy="26" rx="5" ry="3" fill="#4f46e5" transform="rotate(-20,45,26)" />
                    <ellipse cx="43" cy="27" rx="2.5" ry="1.5" fill="rgba(255,255,255,0.85)" transform="rotate(-20,43,27)" />
                    <path d="M28 26 L42 18 L38 26 Z" fill="#06b6d4" opacity="0.9" />
                    <path d="M28 38 L42 46 L38 38 Z" fill="#a855f7" opacity="0.9" />
                    <path d="M18 28 L14 20 L22 26 Z" fill="#818cf8" opacity="0.85" />
                    <path d="M18 36 L14 44 L22 38 Z" fill="#818cf8" opacity="0.85" />
                    <circle cx="36" cy="32" r="3" fill="rgba(255,255,255,0.3)" />
                    <circle cx="50" cy="22" r="1.5" fill="#06b6d4" opacity="0.7" />
                    <circle cx="54" cy="28" r="1" fill="#a855f7" opacity="0.6" />
                    <circle cx="52" cy="18" r="1" fill="#6366f1" opacity="0.5" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Welcome text */}
            <div className="relative" style={{ zIndex: 2 }}>
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-4 text-xs"
                style={{
                  background: "rgba(99,102,241,0.08)",
                  border: "1px solid rgba(99,102,241,0.2)",
                  color: "#534AB7",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                Dashboard
              </div>
              <h1
                className="text-2xl sm:text-3xl font-semibold mb-2"
                style={{ color: "#0f0f13", letterSpacing: "-0.02em" }}
              >
                Welcome back,{" "}
                <span
                  style={{
                    background: "linear-gradient(90deg,#6366f1,#06b6d4,#a855f7)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {user?.name}
                </span>{" "}
                👋
              </h1>
              <p className="text-sm" style={{ color: "#6b7280" }}>
                {user?.email}&nbsp;·&nbsp;Your AI-powered career analysis is ready
              </p>
            </div>
          </div>

          {/* ── Stats component ── */}
          <DashboardStats
            totalResumes={totalResumes}
            totalAnalysis={totalAnalysis}
            averageATS={averageATS}
          />

          {/* ── ATS Card + Quick Actions ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
            <ATSCard score={latestATS} />

            {/* Quick actions */}
            <div
              className="rounded-2xl p-5 sm:p-6 flex flex-col gap-3"
              style={{
                background: "#fff",
                border: "1px solid rgba(99,102,241,0.15)",
                boxShadow: "0 2px 16px rgba(99,102,241,0.05)",
              }}
            >
              <p
                className="text-xs mb-1"
                style={{ color: "#9ca3af", letterSpacing: "0.04em" }}
              >
                QUICK ACTIONS
              </p>

              {[
                {
                  label: "Upload resume",
                  sub: "Add a new PDF",
                  color: "#6366f1",
                  bg: "rgba(99,102,241,0.08)",
                  route: "/resume",
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                  ),
                },
                {
                  label: "View analysis",
                  sub: "See all results",
                  color: "#06b6d4",
                  bg: "rgba(6,182,212,0.08)",
                  route: "/analysis",
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                    </svg>
                  ),
                },
              ].map((a, i) => (
                <button
                  key={i}
                  onClick={() => router.push(a.route)}
                  className="flex items-center gap-3 p-3 sm:p-4 rounded-xl w-full text-left transition-all"
                  style={{
                    border: "1px solid rgba(99,102,241,0.12)",
                    background: "#fff",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(99,102,241,0.03)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: a.bg }}
                  >
                    {a.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium" style={{ color: "#0f0f13" }}>
                      {a.label}
                    </p>
                    <p className="text-xs" style={{ color: "#9ca3af" }}>
                      {a.sub}
                    </p>
                  </div>
                  <span style={{ color: "#c4b5fd", fontSize: 20 }}>›</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          @keyframes flyAcross {
            0%   { left: -80px; opacity: 0; }
            6%   { opacity: 1; }
            88%  { opacity: 1; }
            100% { left: calc(100% + 30px); opacity: 0; }
          }
          @keyframes trailGrow {
            0%   { width: 0; opacity: 0; }
            8%   { opacity: 1; }
            75%  { width: 75%; opacity: 0.7; }
            100% { width: 82%; opacity: 0; }
          }
          @keyframes floatPlane {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50%       { transform: translateY(-6px) rotate(2deg); }
          }
          @keyframes sparkle {
            0%   { opacity: 0; transform: scale(0); }
            30%  { opacity: 1; transform: scale(1.4); }
            70%  { opacity: 0.6; transform: scale(1); }
            100% { opacity: 0; transform: translateY(-10px) scale(0.5); }
          }
        `}</style>
      </div>
    </ProtectedRoute>
  );
}