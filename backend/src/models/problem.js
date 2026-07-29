const mongoose = require("mongoose");
const { Schema } = mongoose;

const problemSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },

    topic: {
      type: String,
      enum: [
        "Python",
        "NumPy",
        "Pandas",
        "Statistics",
        "Probability",
        "Linear Algebra",
        "Machine Learning",
        "Deep Learning",
        "Computer Vision",
        "NLP",
        "LLM",
        "MLOps"
      ],
      required: true,
    },

    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],

    examples: [
      {
        input: {
          type: String,
          required: true,
        },
        output: {
          type: String,
          required: true,
        },
        explanation: {
          type: String,
        },
      },
    ],

    visibleTestCases: [
      {
        input: {
          type: String,
          required: true,
        },
        output: {
          type: String,
          required: true,
        },
        explanation: {
          type: String,
        },
      },
    ],

    hiddenTestCases: [
      {
        input: {
          type: String,
          required: true,
        },
        output: {
          type: String,
          required: true,
        },
      },
    ],

    starterCode: {
      type: String,
      required: true,
    },

    referenceSolution: {
      type: String,
      required: true,
    },

    constraints: {
      timeLimit: {
        type: Number,
        default: 2,
      },
      memoryLimit: {
        type: Number,
        default: 256,
      },
    },

    status: {
      type: String,
      enum: ["Draft", "Published"],
      default: "Draft",
    },

    problemCreator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Problem = mongoose.model("Problem", problemSchema);

module.exports = Problem;


