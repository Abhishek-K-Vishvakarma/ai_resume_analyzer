"use client";

import { useState, useRef } from "react";
import API from "@/services/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import AnalyzingScreen from "@/components/AnalyzingScreen";

export default function ResumePage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [resumeId, setResumeId] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) { toast.warning("Please select a resume"); return; }
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("resume", file);
      const { data } = await API.post("/resume/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResumeId(data.resume._id);
      toast.success("Resume uploaded successfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyze = async () => {
    try {
      setAnalyzing(true);
      const { data } = await API.post(`/analysis/${resumeId}`);
      router.push(`/analysis/${data.analysis._id}`);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Analysis Failed");
    } finally {
      setAnalyzing(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped?.type === "application/pdf") setFile(dropped);
    else toast.error("Only PDF files are accepted");
  };

  return (
    <>
      {analyzing && <AnalyzingScreen />}

      <div
        className="min-h-screen flex items-center justify-center px-4 py-8 relative overflow-hidden"
        style={{ background: "#ffffff" }}
      >
        {/* Grid bg */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "linear-gradient(rgba(99,102,241,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.06) 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }} />

        {/* Orbs */}
        <div className="absolute top-[-60px] right-[-60px] w-72 h-72 rounded-full pointer-events-none"
          style={{ background: "rgba(99,102,241,0.08)", filter: "blur(60px)" }} />
        <div className="absolute bottom-[-40px] left-[-40px] w-52 h-52 rounded-full pointer-events-none"
          style={{ background: "rgba(6,182,212,0.06)", filter: "blur(60px)" }} />

        <div className="w-full max-w-md relative z-10">
          <div className="rounded-2xl p-8" style={{
            background: "#ffffff",
            border: "1px solid rgba(99,102,241,0.2)",
            boxShadow: "0 8px 40px rgba(99,102,241,0.08)",
          }}>

            {/* Header */}
            <div className="text-center mb-7">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-3 text-xs"
                style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)", color: "#534AB7" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                AI powered
              </div>
              <h1 className="text-xl font-semibold mb-1.5" style={{ color: "#0f0f13" }}>
                Upload your resume
              </h1>
              <p className="text-sm" style={{ color: "#6b7280" }}>
                Get instant ATS score & AI feedback
              </p>
            </div>

            {/* Selected file chip */}
            {file && (
              <div className="flex items-center gap-3 p-3 rounded-xl mb-4"
                style={{ background: "rgba(99,102,241,0.04)", border: "1px solid rgba(99,102,241,0.15)" }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(99,102,241,0.1)" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate" style={{ color: "#0f0f13" }}>{file.name}</p>
                  <p className="text-xs" style={{ color: "#9ca3af" }}>{(file.size / 1024).toFixed(0)} KB</p>
                </div>
                <button onClick={() => setFile(null)} className="text-xs px-2 py-1 rounded-md"
                  style={{ background: "rgba(0,0,0,0.06)", color: "#6b7280", border: "none", cursor: "pointer" }}>
                  ✕
                </button>
              </div>
            )}

            {/* Success bar */}
            {resumeId && (
              <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl mb-4"
                style={{ background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.2)" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-xs" style={{ color: "#065f46" }}>
                  Resume uploaded — ready to analyze!
                </span>
              </div>
            )}

            {/* Drop zone */}
            <form onSubmit={handleUpload}>
              <div
                onClick={() => inputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                className="rounded-2xl p-9 text-center cursor-pointer mb-4 transition-all"
                style={{
                  border: `1.5px dashed ${dragging ? "#6366f1" : "rgba(99,102,241,0.35)"}`,
                  background: dragging ? "rgba(99,102,241,0.05)" : "rgba(99,102,241,0.02)",
                  opacity: file ? 0.5 : 1,
                }}
              >
                <input
                  ref={inputRef}
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                  style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.15)" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                </div>
                <p className="text-sm font-medium mb-1" style={{ color: "#0f0f13" }}>Drop your PDF here</p>
                <p className="text-xs mb-2.5" style={{ color: "#9ca3af" }}>or click to browse files</p>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs"
                  style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)", color: "#534AB7" }}>
                  PDF only · Max 5MB
                </span>
              </div>

              <button type="submit" disabled={loading}
                className="w-full py-3 rounded-xl text-sm font-medium text-white transition-opacity"
                style={{ background: "linear-gradient(135deg,#6366f1,#06b6d4)", opacity: loading ? 0.7 : 1, fontFamily: "inherit", border: "none", cursor: loading ? "not-allowed" : "pointer" }}>
                {loading ? "Uploading..." : "Upload resume"}
              </button>
            </form>

            {/* Analyze button */}
            {resumeId && (
              <button onClick={handleAnalyze} disabled={analyzing}
                className="w-full mt-3 py-3 rounded-xl text-sm font-medium text-white transition-opacity"
                style={{ background: "linear-gradient(135deg,#a855f7,#6366f1)", opacity: analyzing ? 0.7 : 1, fontFamily: "inherit", border: "none", cursor: analyzing ? "not-allowed" : "pointer" }}>
                {analyzing ? "Analyzing..." : "✦  Analyze with AI"}
              </button>
            )}

            {/* Tips */}
            <div className="flex items-center gap-2.5 mt-5 mb-4">
              <div className="flex-1 h-px" style={{ background: "rgba(0,0,0,0.08)" }} />
              <span className="text-xs" style={{ color: "#9ca3af" }}>what you get</span>
              <div className="flex-1 h-px" style={{ background: "rgba(0,0,0,0.08)" }} />
            </div>
            <div className="flex flex-col gap-2.5">
              {[
                { color: "#6366f1", label: "ATS compatibility score out of 100" },
                { color: "#06b6d4", label: "Section-by-section AI feedback" },
                { color: "#a855f7", label: "Keyword & skill gap suggestions" },
              ].map((t, i) => (
                <div key={i} className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl"
                  style={{ background: "rgba(99,102,241,0.03)", border: "1px solid rgba(99,102,241,0.08)" }}>
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: t.color }} />
                  <span className="text-xs" style={{ color: "#6b7280" }}>{t.label}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}