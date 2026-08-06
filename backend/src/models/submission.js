const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const submissionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  problemId: {
    type: Schema.Types.ObjectId,
    ref: "Problem",
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
    enum: ['python'],
    default: 'python',
  },
  status: {
    type: String,
    enum: [
      "pending",
      "accepted",
      "wrong",
      "runtime_error",
      "time_limit_exceeded",
      "compile_error",
      "error"
    ],
    default: "pending",
  },
  runtime: {
    type: Number,  // milliseconds
    default: 0
  },
  memory: {
    type: Number,  // kB
    default: 0
  },
  errorMessage: {
    type: String,
    default: ''
  },
  testCasesPassed: {
    type: Number,
    default: 0
  },
  testCasesTotal: {  
    type: Number,
    default: 0
  }
}, { 
  timestamps: true
});

submissionSchema.index({ userId: 1, problemId: 1 });

const Submission = mongoose.model('submission', submissionSchema);

module.exports = Submission;