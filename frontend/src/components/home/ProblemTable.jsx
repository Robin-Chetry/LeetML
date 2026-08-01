import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function ProblemTable() {
  const { problems, loading, error } = useSelector(
    (state) => state.problem
  );

  // 1. Loading State
  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // 2. Error State
  if (error) {
    return (
      <div className="alert alert-error mt-8">
        <span>{error}</span>
      </div>
    );
  }

  // 3. Empty Results State
  if (!problems || problems.length === 0) {
    return (
      <div className="alert mt-8">
        <span>No problems found.</span>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto mt-8 rounded-lg border border-base-300 shadow-sm">
      <table className="table table-zebra w-full">
        {/* Table Header */}
        <thead>
          <tr className="bg-base-200">
            <th>#</th>
            <th>Title</th>
            <th>Difficulty</th>
            <th>Topic</th>
            <th>Status</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {problems.map((problem, index) => (
            <tr key={problem._id} className="hover">
              <th>{index + 1}</th>

              <td>
                <Link
                  to={`/problem/${problem._id}`}
                  className="font-medium hover:text-primary hover:underline transition-colors"
                >
                  {problem.title}
                </Link>
              </td>

              {/* Difficulty Badge */}
              <td>
                <span
                  className={`badge ${
                    problem.difficulty === "Easy"
                      ? "badge-success text-white"
                      : problem.difficulty === "Medium"
                      ? "badge-warning"
                      : "badge-error text-white"
                  }`}
                >
                  {problem.difficulty}
                </span>
              </td>

              {/* Topic */}
              <td>{problem.topic}</td>

              {/* Status Badge Placeholder */}
              <td>
                <span className="badge badge-ghost opacity-60">
                  --
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProblemTable;