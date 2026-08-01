const Problem = require("../models/problem");
const User = require("../models/user");

const getDashboardStats = async (req, res) => {
  try {
    const userId = req.result._id;

    // Execute independent database queries in parallel
    const [totalProblems, user] = await Promise.all([
      Problem.countDocuments(),
      User.findById(userId).select("problemSolved"),
    ]);

    const solvedProblems = user?.problemSolved?.length || 0;

    // Placeholder values (will become dynamic after Submission module)
    const currentStreak = 0;
    const accuracy = 0;

    return res.status(200).json({
      totalProblems,
      solvedProblems,
      currentStreak,
      accuracy,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};