"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/services/api";

interface Analysis {
  _id: string;
  atsScore: number;
  matchPercentage: number;
  createdAt: string;
}

export default function AnalysisListPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [analysises, setAnalyses] = useState<Analysis[]>([]);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const { data } = await API.get("/analysis/my-analysis");
        setAnalyses(data.analysises);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalysis();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        Loading your analysis...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-800">
            Analysis History
          </h1>
          <p className="text-gray-500 mt-2">
            Track all your ATS scores and resume match reports
          </p>
        </div>

        {/* Empty State */}
        {analysises.length === 0 && (
          <div className="bg-white rounded-2xl shadow p-10 text-center">
            <p className="text-gray-500 text-lg">
              No analysis found yet 🚀
            </p>
          </div>
        )}

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {analysises.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100"
            >
              <div className="flex justify-between items-start">
                
                {/* Left content */}
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    ATS Score
                    <span className="ml-2 text-blue-600">
                      {item.atsScore}%
                    </span>
                  </h2>

                  <div className="mt-3 space-y-1 text-sm text-gray-500">
                    <p>
                      Match Percentage:{" "}
                      <span className="font-semibold text-gray-700">
                        {item.matchPercentage}%
                      </span>
                    </p>

                    <p>
                      Date:{" "}
                      {new Date(item.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  {/* Badge */}
                  <div className="mt-4">
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-medium ${
                        item.atsScore >= 80
                          ? "bg-green-100 text-green-700"
                          : item.atsScore >= 50
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.atsScore >= 80
                        ? "Excellent"
                        : item.atsScore >= 50
                        ? "Good"
                        : "Needs Improvement"}
                    </span>
                  </div>
                </div>

                {/* Button */}
                <button
                  onClick={() => router.push(`/analysis/${item._id}`)}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2 rounded-xl font-medium hover:scale-105 transition-transform"
                >
                  View Report →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}