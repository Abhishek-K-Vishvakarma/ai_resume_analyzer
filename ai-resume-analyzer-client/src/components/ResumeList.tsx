"use client";

import { useRouter } from "next/navigation";

interface Resume {
  _id: string;
  fileName: string;
  atsScore: number;
  status: string;
  createdAt: string;
}

interface ResumeListProps {
  resumes: Resume[];
}

export default function ResumeList({
  resumes,
}: ResumeListProps) {
  const router = useRouter();

  if (!resumes.length) {
    return (
      <div className="bg-white rounded-xl shadow p-6">
        <p className="text-gray-500">
          No resumes uploaded yet.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">
                Resume
              </th>

              <th className="p-4 text-left">
                ATS Score
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Upload Date
              </th>

              <th className="p-4 text-left">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {resumes.map((resume) => (
              <tr
                key={resume._id}
                className="border-t"
              >
                <td className="p-4">
                  {resume.fileName}
                </td>

                <td className="p-4 font-semibold text-green-600">
                  {resume.atsScore}%
                </td>

                <td className="p-4">
                  {resume.status}
                </td>

                <td className="p-4">
                  {new Date(
                    resume.createdAt
                  ).toLocaleDateString()}
                </td>

                <td className="p-4">
                  <button
                    onClick={() =>
                      router.push(
                        `/analysis/${resume._id}`
                      )
                    }
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}