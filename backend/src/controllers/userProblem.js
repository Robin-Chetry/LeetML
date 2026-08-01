const { getLanguageById } = require("../utils/problemUtility");
const { executeCode } = require("../services/codebox.service");
const Problem = require("../models/problem");
const User = require("../models/user");
const Submission = require("../models/submission");

const createProblem = async (req, res) => {
  const {
    title,
    description,
    difficulty,
    tags,
    visibleTestCases,
    hiddenTestCases,
    starterCode,
    referenceSolution
  } = req.body;

  try {
    // 1. Validate required primitive fields
    if (!title || !description || !difficulty || !referenceSolution) {
      return res.status(400).json({
        message: "Missing required fields"
      });
    }

    // 2. Validate test case inputs are arrays
    if (!Array.isArray(visibleTestCases) || !Array.isArray(hiddenTestCases)) {
      return res.status(400).json({
        message: "Test cases must be arrays"
      });
    }

    // 3. Ensure at least one visible test case exists
    if (visibleTestCases.length === 0) {
      return res.status(400).json({
        message: "At least one visible testcase is required"
      });
    }

    // 4. Validate reference solution language
    const languageId = getLanguageById("python");
    if (!languageId) {
      return res.status(400).json({
        message: "Unsupported reference solution language"
      });
    }

    // Execute test cases concurrently using Promise.allSettled
    const executionResults = await Promise.allSettled(
      visibleTestCases.map((testcase) =>
        executeCode({
          sourceCode: referenceSolution,
          languageId,
          stdin: testcase.input,
          expectedOutput: testcase.output
        })
      )
    );

    const testResults = executionResults.map((result) =>
      result.status === "fulfilled"
        ? result.value
        : {
            status: { id: 13 },
            stderr: result.reason?.message || "Execution failed"
          }
    );

    for (const test of testResults) {
      if (test.status.id !== 3) {
        return res.status(400).json({
          message: "Reference solution failed",
          error:
            test.stderr ||
            test.compile_output ||
            test.status?.description
        });
      }
    }

    // Store in DB
    const problem = await Problem.create({
      ...req.body,
      problemCreator: req.result._id
    });

    res.status(201).json({
      message: "Problem created successfully",
      problem
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Internal Server Error",
      error: err.message
    });
  }
};

const updateProblem = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    difficulty,
    topic,
    tags,
    visibleTestCases,
    hiddenTestCases,
    starterCode,
    referenceSolution
  } = req.body;

  try {
    if (!id) {
      return res.status(400).json({ message: "Missing ID Field" });
    }

    // 1. Validate required primitive fields
    if (!title || !description || !difficulty || !referenceSolution) {
      return res.status(400).json({
        message: "Missing required fields"
      });
    }

    // 2. Validate test case inputs are arrays
    if (!Array.isArray(visibleTestCases) || !Array.isArray(hiddenTestCases)) {
      return res.status(400).json({
        message: "Test cases must be arrays"
      });
    }

    // 3. Ensure at least one visible test case exists
    if (visibleTestCases.length === 0) {
      return res.status(400).json({
        message: "At least one visible testcase is required"
      });
    }

    const problem = await Problem.findById(id);
    if (!problem) {
      return res.status(404).json({ message: "ID is not present in server" });
    }

    // 4. Validate reference solution language
    const languageId = getLanguageById("python");
    if (!languageId) {
      return res.status(400).json({
        message: "Unsupported reference solution language"
      });
    }

    const executionResults = await Promise.allSettled(
      visibleTestCases.map((testcase) =>
        executeCode({
          sourceCode: referenceSolution,
          languageId,
          stdin: testcase.input,
          expectedOutput: testcase.output
        })
      )
    );

    const testResults = executionResults.map((result) =>
      result.status === "fulfilled"
        ? result.value
        : {
            status: { id: 13 },
            stderr: result.reason?.message || "Execution failed"
          }
    );

    for (const test of testResults) {
      if (test.status.id !== 3) {
        return res.status(400).json({
          message: "Reference solution failed",
          error:
            test.stderr ||
            test.compile_output ||
            test.status?.description
        });
      }
    }

    const newProblem = await Problem.findByIdAndUpdate(
      id,
      { ...req.body },
      { runValidators: true, new: true }
    );

    res.status(200).json(newProblem);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Internal Server Error",
      error: err.message
    });
  }
};

const deleteProblem = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) return res.status(400).json({ message: "ID is Missing" });

    const deletedProblem = await Problem.findByIdAndDelete(id);

    if (!deletedProblem) return res.status(404).json({ message: "Problem is Missing" });

    res.status(200).json({
      message: "Problem deleted successfully"
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Internal Server Error",
      error: err.message
    });
  }
};

const getProblemById = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) return res.status(400).json({ message: "ID is Missing" });

    const getProblem = await Problem.findById(id).select(
      '_id title description difficulty topic tags examples visibleTestCases starterCode constraints'
    );

    if (!getProblem) return res.status(404).json({ message: "Problem is Missing" });

    res.status(200).json(getProblem);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Internal Server Error",
      error: err.message
    });
  }
};

const getAllProblem = async (req, res) => {
  try {
    // 1. Read query parameters with defaults
    const {
      page = 1,
      limit = 10,
      search = "",
      difficulty,
      topic,
      sort = "_id",
    } = req.query;

    // Convert string query parameters to numbers
    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    // Validate page and limit values
    if (
      Number.isNaN(pageNumber) ||
      Number.isNaN(limitNumber) ||
      pageNumber < 1 ||
      limitNumber < 1
    ) {
      return res.status(400).json({
        message: "Invalid page or limit parameter. Values must be positive integers.",
      });
    }

    // Whitelist allowed sort fields
    const allowedSortFields = ["_id", "title", "difficulty", "topic"];
    const sortField = allowedSortFields.includes(sort) ? sort : "_id";

    // 2. Build dynamic filter object
    const filter = {};

    if (search) {
      filter.title = {
        $regex: search,
        $options: "i",
      };
    }

    if (difficulty) {
      filter.difficulty = difficulty;
    }

    if (topic) {
      filter.topic = topic;
    }

    // 3. Count total matching documents
    const totalProblems = await Problem.countDocuments(filter);

    // 4. Calculate total pages
    const totalPages = Math.max(1, Math.ceil(totalProblems / limitNumber));

    // 5. Query MongoDB (using .lean() for plain JS objects)
    const getProblem = await Problem.find(filter)
      .select("_id title difficulty topic tags")
      .sort(sortField)
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber)
      .lean();

    // 6. Return standardized paginated response
    return res.status(200).json({
      problems: getProblem,
      currentPage: pageNumber,
      totalPages,
      totalProblems,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

const getSolvedProblemsByUser = async (req, res) => {
  try {
    const userId = req.result._id;

    const user = await User.findById(userId).populate({
      path: "problemSolved",
      select: "_id title difficulty tags"
    });

    res.status(200).json(user ? user.problemSolved : []);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Internal Server Error",
      error: err.message
    });
  }
};

const submittedProblem = async (req, res) => {
  try {
    const userId = req.result._id;
    const problemId = req.params.problemId;

    const ans = await Submission.find({ userId, problemId });

    if (ans.length === 0) return res.status(200).json([]);

    res.status(200).json(ans);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Internal Server Error",
      error: err.message
    });
  }
};

module.exports = {
  createProblem,
  updateProblem,
  deleteProblem,
  getProblemById,
  getAllProblem,
  getSolvedProblemsByUser,
  submittedProblem
};