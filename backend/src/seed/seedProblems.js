require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Problem = require("../models/problem");

const ADMIN_ID = "6a65e50085ecfed87cef822a";

// Default template code for placeholder problems
const defaultStarterCode = `def solve():
    # Write your solution here
    pass

solve()`;

const defaultReferenceSolution = `def solve():
    pass

solve()`;

// 1. Original 10 Placeholder Problems (with duplicate titles tagged as Templates)
const oldProblems = [
  {
    title: "Matrix Addition (Template)",
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
    title: "Dot Product (Template)",
    description: "Compute the dot product of two vectors.",
    difficulty: "Easy",
    topic: "Linear Algebra",
    tags: ["vector", "dot-product"],
  },
  {
    title: "Mean of Dataset (Template)",
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
  starterCode: defaultStarterCode,
  referenceSolution: defaultReferenceSolution,
  constraints: {
    timeLimit: 2,
    memoryLimit: 256,
  },
  status: "Published",
  problemCreator: ADMIN_ID,
}));

// 2. Fully Detailed Real Problems
const realProblems = [
  {
    title: "Matrix Addition",
    description:
      "Given two matrices of the same dimensions, print their element-wise sum.",
    difficulty: "Easy",
    topic: "Linear Algebra",
    tags: ["matrix", "addition"],
    starterCode: `def solve():
    n, m = map(int, input().split())

    A = [list(map(int, input().split())) for _ in range(n)]
    B = [list(map(int, input().split())) for _ in range(n)]

    # Write your solution here

solve()`,
    referenceSolution: `def solve():
    n, m = map(int, input().split())

    A = [list(map(int, input().split())) for _ in range(n)]
    B = [list(map(int, input().split())) for _ in range(n)]

    for i in range(n):
        print(*[A[i][j] + B[i][j] for j in range(m)])

solve()`,
    examples: [
      {
        input: `2 2\n1 2\n3 4\n5 6\n7 8`,
        output: `6 8\n10 12`,
        explanation: "Element-wise sum of matrices A and B.",
      },
    ],
    visibleTestCases: [
      {
        input: `2 2\n1 2\n3 4\n5 6\n7 8`,
        output: `6 8\n10 12`,
        explanation: "Sample testcase",
      },
    ],
    hiddenTestCases: [
      {
        input: `2 3\n1 2 3\n4 5 6\n6 5 4\n3 2 1`,
        output: `7 7 7\n7 7 7`,
      },
    ],
    constraints: {
      timeLimit: 2,
      memoryLimit: 256,
    },
    status: "Published",
    problemCreator: ADMIN_ID,
  },
  {
    title: "Dot Product",
    description:
      "Given two vectors of length N, compute and print their dot product.",
    difficulty: "Easy",
    topic: "Linear Algebra",
    tags: ["vector", "dot-product"],
    starterCode: `def solve():
    n = int(input())

    a = list(map(int, input().split()))
    b = list(map(int, input().split()))

    # Write your solution here

solve()`,
    referenceSolution: `def solve():
    n = int(input())

    a = list(map(int, input().split()))
    b = list(map(int, input().split()))

    print(sum(x*y for x,y in zip(a,b)))

solve()`,
    examples: [
      {
        input: `3\n1 2 3\n4 5 6`,
        output: `32`,
        explanation: "1*4 + 2*5 + 3*6 = 4 + 10 + 18 = 32.",
      },
    ],
    visibleTestCases: [
      {
        input: `3\n1 2 3\n4 5 6`,
        output: `32`,
        explanation: "Sample testcase",
      },
    ],
    hiddenTestCases: [
      {
        input: `5\n2 3 4 5 6\n1 2 3 4 5`,
        output: `70`,
      },
    ],
    constraints: {
      timeLimit: 2,
      memoryLimit: 256,
    },
    status: "Published",
    problemCreator: ADMIN_ID,
  },
  {
    title: "Mean of Dataset",
    description:
      "Given N numbers, print their arithmetic mean as a floating-point number.",
    difficulty: "Easy",
    topic: "Statistics",
    tags: ["statistics", "mean"],
    starterCode: `def solve():
    n = int(input())
    arr = list(map(float, input().split()))

    # Write your solution here

solve()`,
    referenceSolution: `def solve():
    n = int(input())
    arr = list(map(float, input().split()))

    print(sum(arr)/n)

solve()`,
    examples: [
      {
        input: `5\n1 2 3 4 5`,
        output: `3.0`,
        explanation: "Sum of elements is 15.0 divided by 5 = 3.0.",
      },
    ],
    visibleTestCases: [
      {
        input: `5\n1 2 3 4 5`,
        output: `3.0`,
        explanation: "Sample testcase",
      },
    ],
    hiddenTestCases: [
      {
        input: `4\n10 20 30 40`,
        output: `25.0`,
      },
    ],
    constraints: {
      timeLimit: 2,
      memoryLimit: 256,
    },
    status: "Published",
    problemCreator: ADMIN_ID,
  },
];

// 3. Combined Collection (13 Total Problems)
const problems = [...oldProblems, ...realProblems];

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