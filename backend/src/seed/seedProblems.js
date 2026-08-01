require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Problem = require("../models/problem");

const ADMIN_ID = "6a65e50085ecfed87cef822a";

const starterCode = `def solve():
    # Write your solution here
    pass`;

const referenceSolution = `def solve():
    pass`;

const problems = [
  {
    title: "Matrix Addition",
    description: "Given two matrices of equal dimensions, return their sum.",
    difficulty: "Easy",
    topic: "Linear Algebra",
    tags: ["matrix", "addition"],
  },
  {
    title: "Matrix Multiplication",
    description: "Multiply two compatible matrices.",
    difficulty: "Medium",
    topic: "Linear Algebra",
    tags: ["matrix", "multiplication"],
  },
  {
    title: "Dot Product",
    description: "Compute the dot product of two vectors.",
    difficulty: "Easy",
    topic: "Linear Algebra",
    tags: ["vector", "dot-product"],
  },
  {
    title: "Mean of Dataset",
    description: "Calculate the arithmetic mean of a list.",
    difficulty: "Easy",
    topic: "Statistics",
    tags: ["statistics", "mean"],
  },
  {
    title: "Standard Deviation",
    description: "Calculate population standard deviation.",
    difficulty: "Medium",
    topic: "Statistics",
    tags: ["statistics", "std"],
  },
  {
    title: "Train Test Split",
    description: "Split a dataset according to a given ratio.",
    difficulty: "Easy",
    topic: "Machine Learning",
    tags: ["dataset", "split"],
  },
  {
    title: "Gradient Descent",
    description: "Implement one iteration of Gradient Descent.",
    difficulty: "Medium",
    topic: "Machine Learning",
    tags: ["gradient", "optimization"],
  },
  {
    title: "PCA Implementation",
    description: "Perform Principal Component Analysis.",
    difficulty: "Hard",
    topic: "Machine Learning",
    tags: ["pca", "dimensionality-reduction"],
  },
  {
    title: "Convolution Operation",
    description: "Perform a 2D convolution.",
    difficulty: "Hard",
    topic: "Computer Vision",
    tags: ["cnn", "convolution"],
  },
  {
    title: "Softmax Function",
    description: "Implement the softmax activation.",
    difficulty: "Medium",
    topic: "Deep Learning",
    tags: ["softmax", "activation"],
  },
].map((problem) => ({
  ...problem,

  examples: [
    {
      input: "[[1,2],[3,4]]",
      output: "[[2,4],[6,8]]",
      explanation: "Example only",
    },
  ],

  visibleTestCases: [
    {
      input: "1 2 3",
      output: "6",
      explanation: "Sample testcase",
    },
  ],

  hiddenTestCases: [
    {
      input: "5 6 7",
      output: "18",
    },
  ],

  starterCode,

  referenceSolution,

  constraints: {
    timeLimit: 2,
    memoryLimit: 256,
  },

  status: "Published",

  problemCreator: ADMIN_ID,
}));

async function seed() {
  try {
    await connectDB();

    await Problem.deleteMany();

    await Problem.insertMany(problems);

    console.log(`${problems.length} problems inserted successfully.`);

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();