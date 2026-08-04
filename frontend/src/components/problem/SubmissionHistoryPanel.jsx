import { useState, useEffect } from "react";
import { getProblemSubmissions } from "../../api/codeApi";

function SubmissionHistoryPanel({
  problemId,
  selectedSubmission,
  setSelectedSubmission,
}) {
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (!problemId) return;

    const fetchSubmissions = async () => {
      try {
        setIsLoading(true);
        const data = await getProblemSubmissions(problemId);
        setSubmissions(data || []);
      } catch (err) {
        console.error("Failed to fetch submissions:", err);
        setError("Failed to load submission history.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubmissions();
  }, [problemId]);

  const filteredSubmissions =
    filter === "all"
      ? submissions
      : submissions.filter((s) => s.status === filter);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center text-error">
        {error}
      </div>
    );
  }

  if (submissions.length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-base-content/60">
        No submissions yet.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto p-4">
      {/* Filter Buttons */}
      <div className="flex gap-2 mb-4">
        <button
          className={`btn btn-xs ${filter === "all" ? "btn-primary" : "btn-outline"}`}
          onClick={() => setFilter("all")}
        >
          All
        </button>

        <button
          className={`btn btn-xs ${
            filter === "accepted" ? "btn-success" : "btn-outline"
          }`}
          onClick={() => setFilter("accepted")}
        >
          Accepted
        </button>

        <button
          className={`btn btn-xs ${
            filter === "wrong" ? "btn-error" : "btn-outline"
          }`}
          onClick={() => setFilter("wrong")}
        >
          Wrong Answer
        </button>

        <button
          className={`btn btn-xs ${
            filter === "runtime_error" ? "btn-warning" : "btn-outline"
          }`}
          onClick={() => setFilter("runtime_error")}
        >
          Runtime
        </button>
      </div>

      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Status</th>
            <th>Runtime</th>
            <th>Testcases</th>
            <th>Language</th>
            <th>Submitted</th>
          </tr>
        </thead>

        <tbody>
          {filteredSubmissions.map((submission) => {
            const badgeClass =
              {
                accepted: "badge-success",
                wrong: "badge-error",
                compile_error: "badge-warning",
                runtime_error: "badge-warning",
                time_limit_exceeded: "badge-warning",
                pending: "badge-info",
                error: "badge-neutral",
              }[submission.status] || "badge-neutral";

            return (
              <tr
                key={submission._id}
                onClick={() => setSelectedSubmission(submission)}
                className="cursor-pointer hover:bg-base-200 transition-colors"
              >
                <td>
                  <span className={`badge ${badgeClass}`}>
                    {submission.status.replaceAll("_", " ")}
                  </span>
                </td>

                <td>
                  {submission.runtime
                    ? `${submission.runtime.toFixed(3)} s`
                    : "-"}
                </td>

                <td>
                  {submission.testCasesPassed}/
                  {submission.testCasesTotal}
                </td>

                <td className="capitalize">{submission.language}</td>

                <td>
                  {new Date(submission.createdAt).toLocaleString()}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {filteredSubmissions.length === 0 && (
        <div className="py-8 text-center text-xs text-base-content/60">
          No {filter.replaceAll("_", " ")} submissions found.
        </div>
      )}
    </div>
  );
}

export default SubmissionHistoryPanel;