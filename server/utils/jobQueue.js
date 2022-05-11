const Queue = require('bull');

const Job = require("../models/executionJob");
const { executeCode } = require("../utils/executeFile");

const jobQueue = new Queue('jobRunnerQueue');

// jobQueue.process(async (data) => {

// })