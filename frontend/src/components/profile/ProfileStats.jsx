import { useSelector } from "react-redux";

function ProfileStats() {
  const dashboard = useSelector((state) => state.dashboard);

  return (
    <div className="card bg-base-100 border border-base-300 shadow-sm">
      <div className="card-body">

        <h2 className="card-title mb-4">
          Statistics
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div>
            <p className="text-sm opacity-60">Problems Solved</p>
            <p className="text-3xl font-bold text-success">
              {dashboard.solvedProblems}
            </p>
          </div>

          <div>
            <p className="text-sm opacity-60">Accuracy</p>
            <p className="text-3xl font-bold">
              {dashboard.accuracy}%
            </p>
          </div>

          <div>
            <p className="text-sm opacity-60">Current Streak</p>
            <p className="text-3xl font-bold">
              {dashboard.currentStreak} 🔥
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default ProfileStats;