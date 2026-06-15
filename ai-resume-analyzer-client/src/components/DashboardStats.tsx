interface DashboardStatsProps {
  totalResumes: number;
  totalAnalysis: number;
  averageATS: number;
}

export default function DashboardStats({
  totalResumes,
  totalAnalysis,
  averageATS,
}: DashboardStatsProps) {
  const stats = [
    {
      label: "Total Resumes",
      value: totalResumes,
      color: "#6366f1",
      bg: "rgba(99,102,241,0.08)",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      ),
    },
    {
      label: "Average ATS",
      value: `${averageATS}%`,
      color: "#06b6d4",
      bg: "rgba(6,182,212,0.08)",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      ),
    },
    {
      label: "Total Analysis",
      value: totalAnalysis,
      color: "#a855f7",
      bg: "rgba(168,85,247,0.08)",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
      {stats.map((s, i) => (
        <div
          key={i}
          className="rounded-2xl p-5 sm:p-6"
          style={{
            background: "#fff",
            border: "1px solid rgba(99,102,241,0.15)",
            boxShadow: "0 2px 16px rgba(99,102,241,0.05)",
          }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
            style={{ background: s.bg }}
          >
            {s.icon}
          </div>
          <p className="text-xs mb-1" style={{ color: "#9ca3af", letterSpacing: "0.04em" }}>
            {s.label.toUpperCase()}
          </p>
          <p
            className="text-3xl font-semibold"
            style={{ color: s.color, letterSpacing: "-0.03em" }}
          >
            {s.value}
          </p>
        </div>
      ))}
    </div>
  );
}