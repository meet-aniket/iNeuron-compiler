const Queue = require('bull');

const { executionJob } = require("../models/executionJob");
const { executeCode } = require("../services/executeFile");

const jobQueue = new Queue('job-runner-queue', 'redis://127.0.0.1:6379');

// Process a execution job
jobQueue.process( async(job) => {
  const jobId = job?.data?.id;
  const Job = await executionJob.findById(jobId);

  try {
    Job.startedAt = new Date();
    Job.output = await executeCode(Job?.filePath);
    Job.completedAt = new Date();
    Job.status = 'success';
    await Job.save();
    return true;
  } catch(err) {
    Job.completedAt = new Date();
    Job.output = JSON.stringify(err);
    Job.status = 'error';
    await Job.save();
    throw Error(JSON.stringify(err));
  }
});

jobQueue.on('failed', (err) => {
  console.error(err.data.id, err.failedReason);
});

const addJobToQueue = async(jobId) => {
  await jobQueue.add({ id: jobId });
};

module.exports = { addJobToQueue };