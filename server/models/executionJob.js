const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
  language: {
    type: String,
    required: true,
    enum: ['cpp', 'java', 'py']
  },
  filePath: {
    type: String,
    required: true
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  startedAt: {
    type: Date
  },
  completedAt: {
    type: Date
  },
  status: {
    type: String,
    default: 'pending',
    enum: ['error', 'pending', 'success']
  },
  output: {
    type: String
  }
});

const executionJob = mongoose.model("executionJob", jobSchema);
module.exports = { executionJob };