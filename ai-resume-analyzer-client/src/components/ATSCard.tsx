interface ATSCardProps {
  score: number;
}

export default function ATSCard({
  score,
}: ATSCardProps) {
  const getStatus = () => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    return "Needs Improvement";
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 text-center">
      <h2 className="text-xl font-semibold mb-4">
        ATS Score
      </h2>

      <div className="text-6xl font-bold text-green-600">
        {score}%
      </div>

      <p className="mt-3 text-gray-600">
        {getStatus()}
      </p>
    </div>
  );
}