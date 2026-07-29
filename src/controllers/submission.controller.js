const Problem = require("../models/problem");
const Submission = require("../models/submission");
const { executeCode } = require("../services/codebox.service");
const { getLanguageById } = require("../utils/problemUtility");

const submitCode = async (req, res) => {
  try {
    const userId = req.result._id;
    const problemId = req.params.id;

    let { code, language } = req.body;

    if (!userId || !code || !problemId || !language)
      return res.status(400).send("Some field missing");

    if (language === 'cpp')
      language = 'c++';

    // Fetch the problem from database and check existence
    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    // Store submission in database first
    const submittedResult = await Submission.create({
      userId,
      problemId,
      code,
      language,
      status: 'pending',
      testCasesTotal: problem.hiddenTestCases.length
    });

    // Execute code concurrently for all hidden testcases
    const languageId = getLanguageById(language);
    const executionResults = await Promise.allSettled(
      problem.hiddenTestCases.map((testcase) =>
        executeCode({
          sourceCode: code,
          languageId,
          stdin: testcase.input,
          expectedOutput: testcase.output
        })
      )
    );

    const testResult = executionResults.map((result) => {
      if (result.status === "fulfilled") {
        return result.value;
      }

      return {
        status: {
          id: 13,
          description: "Internal Error"
        },
        stderr: result.reason?.message || "Execution failed",
        time: 0,
        memory: 0
      };
    });

    // Process submission result
    let testCasesPassed = 0;
    let runtime = 0;
    let memory = 0;
    let status = "accepted";
    let errorMessage = null;

    for (const test of testResult) {
      if (test.status.id === 3) {
        testCasesPassed++;

        runtime = Math.max(
          runtime,
          parseFloat(test.time || 0)
        );

        memory = Math.max(
          memory,
          test.memory || 0
        );

        continue;
      }

      switch (test.status.id) {
        case 4:
          status = "wrong";
          break;

        case 5:
          status = "time_limit_exceeded";
          break;

        case 6:
          status = "compile_error";
          break;

        case 11:
          status = "runtime_error";
          break;

        default:
          status = "error";
          break;
      }

      if (!errorMessage) {
        errorMessage =
          test.stderr ||
          test.compile_output ||
          test.message ||
          test.status?.description;
      }
    }

    // Update Submission record in database
    submittedResult.status = status;
    submittedResult.testCasesPassed = testCasesPassed;
    submittedResult.errorMessage = errorMessage;
    submittedResult.runtime = runtime;
    submittedResult.memory = memory;

    await submittedResult.save();

    // Insert problemId into user's problemSolved list ONLY if status is 'accepted'
    if (status === "accepted" && !req.result.problemSolved.includes(problemId)) {
      req.result.problemSolved.push(problemId);
      await req.result.save();
    }

    const accepted = (status === "accepted");
    res.status(200).json({
      accepted,
      status,
      totalTestCases: submittedResult.testCasesTotal,
      passedTestCases: testCasesPassed,
      runtime,
      memory,
      errorMessage
    });

  } catch (err) {
    res.status(500).send("Internal Server Error " + err);
  }
};

const runCode = async (req, res) => {
  try {
    const userId = req.result._id;
    const problemId = req.params.id;

    let { code, language } = req.body;

    if (!userId || !code || !problemId || !language)
      return res.status(400).send("Some field missing");

    // Fetch the problem from database and check existence
    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    if (language === 'cpp')
      language = 'c++';

    // Execute code concurrently for all visible testcases
    const languageId = getLanguageById(language);
    const executionResults = await Promise.allSettled(
      problem.visibleTestCases.map((testcase) =>
        executeCode({
          sourceCode: code,
          languageId,
          stdin: testcase.input,
          expectedOutput: testcase.output
        })
      )
    );

    const testResult = executionResults.map((result) => {
      if (result.status === "fulfilled") {
        return result.value;
      }

      return {
        status: {
          id: 13,
          description: "Internal Error"
        },
        stderr: result.reason?.message || "Execution failed",
        time: 0,
        memory: 0
      };
    });

    let testCasesPassed = 0;
    let runtime = 0;
    let memory = 0;
    let status = true;
    let errorMessage = null;

    for (const test of testResult) {
      if (test.status.id === 3) {
        testCasesPassed++;

        runtime = Math.max(
          runtime,
          parseFloat(test.time || 0)
        );

        memory = Math.max(
          memory,
          test.memory || 0
        );

        continue;
      }

      status = false;

      if (!errorMessage) {
        errorMessage =
          test.stderr ||
          test.compile_output ||
          test.message ||
          test.status?.description;
      }
    }

    res.status(200).json({
      success: status,
      testCases: testResult,
      runtime,
      memory,
      errorMessage
    });

  } catch (err) {
    res.status(500).send("Internal Server Error " + err);
  }
};

module.exports = { submitCode, runCode };