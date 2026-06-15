"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import API from "@/services/api";

interface Analysis {
  _id: string;
  atsScore: number;
  matchPercentage: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  missingSkills: string[];
  createdAt: string;
}

export default function AnalysisReportPage() {
  const { id } = useParams();
  const router = useRouter();
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const { data } = await API.get(`/analysis/${id}`);
        setAnalysis(data.analysis);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchAnalysis();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!analysis) return <div className="min-h-screen flex items-center justify-center">Report not found</div>;

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-4xl mx-auto space-y-6">

        <button onClick={() => router.back()} className="text-blue-600 hover:underline">
          ← Back
        </button>

        <h1 className="text-4xl font-bold">Analysis Report</h1>
        <p className="text-gray-500">{new Date(analysis.createdAt).toLocaleDateString()}</p>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <p className="text-gray-500">ATS Score</p>
            <p className="text-5xl font-bold text-blue-600">{analysis.atsScore}%</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <p className="text-gray-500">Match %</p>
            <p className="text-5xl font-bold text-green-600">{analysis.matchPercentage}%</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold text-green-600 mb-3">✅ Strengths</h2>
          <ul className="space-y-2">
            {analysis.strengths.map((s, i) => <li key={i} className="text-gray-700">• {s}</li>)}
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold text-red-500 mb-3">⚠️ Weaknesses</h2>
          <ul className="space-y-2">
            {analysis.weaknesses.map((w, i) => <li key={i} className="text-gray-700">• {w}</li>)}
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold text-blue-600 mb-3">💡 Suggestions</h2>
          <ul className="space-y-2">
            {analysis.suggestions.map((s, i) => <li key={i} className="text-gray-700">• {s}</li>)}
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold text-orange-500 mb-3">🔧 Missing Skills</h2>
          <div className="flex flex-wrap gap-2">
            {analysis.missingSkills.map((skill, i) => (
              <span key={i} className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}