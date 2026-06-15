interface AnalysisCardProps {
  title: string;
  items: string[];
  color:
    | "green"
    | "red"
    | "yellow"
    | "blue";
}

export default function AnalysisCard({
  title,
  items,
  color,
}: AnalysisCardProps) {
  const colors = {
    green: "border-green-500 text-green-700",
    red: "border-red-500 text-red-700",
    yellow: "border-yellow-500 text-yellow-700",
    blue: "border-blue-500 text-blue-700",
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2
        className={`text-2xl font-bold mb-4 ${colors[color]}`}
      >
        {title}
      </h2>

      <ul className="space-y-3">
        {items?.map((item, index) => (
          <li
            key={index}
            className={`border-l-4 pl-3 ${colors[color]}`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}