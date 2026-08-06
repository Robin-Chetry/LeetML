import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function SubmissionTable({ onSelectSubmission }) {
  const { submissions } = useSelector((state) => state.submission);

  const getStatusBadge = (status) => {
    switch (status) {
      case "accepted":
        return <span className="badge badge-success badge-md">Accepted</span>;

      case "wrong":
        return <span className="badge badge-error badge-md">Wrong Answer</span>;

      case "pending":
        return <span className="badge badge-warning badge-md">Pending</span>;

      case "runtime_error":
        return <span className="badge badge-error badge-md">Runtime Error</span>;

      case "compile_error":
        return <span className="badge badge-info badge-md">Compile Error</span>;

      case "time_limit_exceeded":
        return <span className="badge badge-secondary badge-md">Time Limit</span>;

      default:
        return <span className="badge badge-md">{status}</span>;
    }
  };

  const getDifficultyBadge = (difficulty) => {
    if (!difficulty) return null;
    const diffLower = difficulty.toLowerCase();

    let badgeClass = "badge-ghost";
    if (diffLower === "easy") badgeClass = "badge-success";
    if (diffLower === "medium") badgeClass = "badge-warning";
    if (diffLower === "hard") badgeClass = "badge-error";

    return (
      <span className={`badge ${badgeClass} badge-xs font-semibold capitalize`}>
        {difficulty}
      </span>
    );
  };

  const formatRuntime = (runtime) => {
    if (!runtime) return "—";
    return `${Math.round(runtime * 1000)} ms`;
  };

  const formatDate = (date) => {
    if (!date) return "—";
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="card bg-base-100 border border-base-300 shadow-sm">
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Problem</th>
              <th className="text-center">Status</th>
              <th className="text-center">Language</th>
              <th className="text-center">Runtime</th>
              <th className="text-center">Date</th>
            </tr>
          </thead>

          <tbody>
            {submissions.map((submission) => (
              <tr
                key={submission._id}
                onClick={() => onSelectSubmission(submission)}
                className="cursor-pointer hover:bg-base-200 transition-colors duration-200"
              >
                <td>
                  <div>
                    <Link
                      to={`/problem/${submission.problemId?._id}?submission=${submission._id}`}
                      className="link link-hover link-primary font-semibold"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {submission.problemId?.title}
                    </Link>

                    {submission.problemId?.difficulty && (
                      <div className="mt-1">
                        {getDifficultyBadge(submission.problemId.difficulty)}
                      </div>
                    )}
                  </div>
                </td>

                <td className="text-center">
                  {getStatusBadge(submission.status)}
                </td>

                <td className="text-center">
                  <span className="badge badge-outline capitalize">
                    {submission.language}
                  </span>
                </td>

                <td className="text-center">
                  {formatRuntime(submission.runtime)}
                </td>

                <td className="text-center">
                  {formatDate(submission.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SubmissionTable;