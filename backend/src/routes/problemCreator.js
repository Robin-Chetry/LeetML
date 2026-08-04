const express = require("express");

const problemRouter = express.Router();

const adminMiddleware = require("../middleware/adminMiddleware");
const userMiddleware = require("../middleware/userMiddleware");

const {
    createProblem,
    updateProblem,
    deleteProblem,
    getProblemById,
    getAllProblem,
    getSolvedProblemsByUser,
    submittedProblem,
} = require("../controllers/userProblem");
// ==========================
// Admin Routes
// ==========================

// Create a new problem
problemRouter.post("/create", adminMiddleware, createProblem);

// Update an existing problem
problemRouter.put("/update/:id", adminMiddleware, updateProblem);

// Delete a problem
problemRouter.delete("/delete/:id", adminMiddleware, deleteProblem);

// ==========================
// User Routes
// ==========================

// Get all problems
problemRouter.get("/", userMiddleware, getAllProblem);



// Get all solved problems of the logged-in user
problemRouter.get(
    "/problemSolvedByUser",
    userMiddleware,
    getSolvedProblemsByUser
);

// Get submitted solution(s) of the logged-in user for a specific problem
problemRouter.get(
    "/submittedProblem/:problemId",
    userMiddleware,
    submittedProblem
);

// Get a specific problem
problemRouter.get("/:id", userMiddleware, getProblemById); //keeping this at the last

module.exports = problemRouter;