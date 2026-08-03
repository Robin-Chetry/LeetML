const difficultyClass = {
  Easy: "badge-success",
  Medium: "badge-warning",
  Hard: "badge-error",
};

function ProblemHeader({ problem }) {
  return (
    <section>
      <h1 className="text-4xl font-bold">{problem.title}</h1>

      <div className="flex items-center gap-3 mt-3">
        <span
          className={`badge ${
            difficultyClass[problem.difficulty] || "badge-outline"
          }`}
        >
          {problem.difficulty}
        </span>
        <span className="badge badge-outline">{problem.topic}</span>
      </div>

      <p className="mt-6 leading-8 text-base-content/80">
        {problem.description}
      </p>

      <div className="flex flex-wrap gap-2 mt-4">
        {problem.tags?.map((tag) => (
          <span key={tag} className="badge badge-outline">
            {tag}
          </span>
        ))}
      </div>
    </section>
  );
}

export default ProblemHeader;