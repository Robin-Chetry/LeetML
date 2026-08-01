function ProblemFilters({ filters, setFilters }) {
  return (
    <div className="card bg-base-100 border border-base-300 mt-8 shadow-sm">
      <div className="card-body p-4 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          {/* Search */}
          <input
            type="text"
            placeholder="Search problems..."
            className="input input-bordered w-full"
            value={filters.search}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                search: e.target.value,
                page: 1, // Reset page on query change
              }))
            }
          />

          {/* Difficulty */}
          <select
            className="select select-bordered w-full"
            value={filters.difficulty}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                difficulty: e.target.value,
                page: 1, // Reset page on filter change
              }))
            }
          >
            <option value="">All Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          {/* Topic */}
          <select
            className="select select-bordered w-full"
            value={filters.topic}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                topic: e.target.value,
                page: 1, // Reset page on filter change
              }))
            }
          >
            <option value="">All Topics</option>
            <option value="Machine Learning">Machine Learning</option>
            <option value="Linear Algebra">Linear Algebra</option>
          </select>

          {/* Sort */}
          <select
            className="select select-bordered w-full"
            value={filters.sort}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                sort: e.target.value,
              }))
            }
          >
            <option value="_id">Sort by ID</option>
            <option value="title">Sort by Title</option>
            <option value="difficulty">Sort by Difficulty</option>
            <option value="topic">Sort by Topic</option>
          </select>

        </div>
      </div>
    </div>
  );
}

export default ProblemFilters;