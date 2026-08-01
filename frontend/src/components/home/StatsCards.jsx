import { useSelector } from "react-redux";

function StatsCards() {
  // Extract dynamic metric state from dashboard slice
  const {
    totalProblems,
    solvedProblems,
    currentStreak,
    accuracy,
  } = useSelector((state) => state.dashboard);

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mt-10">
      {/* Total Problems */}
      <div className="card bg-base-100 border border-base-300 shadow-sm">
        <div className="card-body">
          <p className="text-sm opacity-60">Total Problems</p>
          <h2 className="text-3xl font-bold">{totalProblems ?? 0}</h2>
        </div>
      </div>

      {/* Problems Solved */}
      <div className="card bg-base-100 border border-base-300 shadow-sm">
        <div className="card-body">
          <p className="text-sm opacity-60">Problems Solved</p>
          <h2 className="text-3xl font-bold text-success">
            {solvedProblems ?? 0}
          </h2>
        </div>
      </div>

      {/* Current Streak */}
      <div className="card bg-base-100 border border-base-300 shadow-sm">
        <div className="card-body">
          <p className="text-sm opacity-60">Current Streak</p>
          <h2 className="text-3xl font-bold">{currentStreak ?? 0} 🔥</h2>
        </div>
      </div>

      {/* Accuracy */}
      <div className="card bg-base-100 border border-base-300 shadow-sm">
        <div className="card-body">
          <p className="text-sm opacity-60">Accuracy</p>
          <h2 className="text-3xl font-bold">
            {accuracy !== undefined && accuracy !== null ? `${accuracy}%` : "--"}
          </h2>
        </div>
      </div>
    </section>
  );
}

export default StatsCards;