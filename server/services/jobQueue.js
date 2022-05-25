const Queue = require('bull');

const { executionJob } = require("../models/executionJob");
const { executeCode } = require("../services/executeFile");

const jobQueue = new Queue('job-runner-queue');

const workers = 5;
// Process a execution job
jobQueue.process(workers, async(data) => {
  // const jobId = data.id;
  // const job = await executionJob.findById(jobId);

  // if(!job) {
  //   throw Error(`can not find with id: ${jobId}`);
  // }
  // try {
  //   job.startedAt = new Date();
  //   job.output = await executeCode(job?.filePath);
  //   job.completedAt = new Date();
  //   job.status = 'success';
  //   await job.save();
  //   return true;
  // } catch(err) {
  //   job.completedAt = new Date();
  //   job.output = JSON.stringify(err);
  //   job.status = 'error';
  //   await job.save();
  //   throw Error(JSON.stringify(err));
  // }
});

jobQueue.on('failed', (err) => {
  console.error(err.data.id, err.failedReason);
});

const addJobToQueue = async(jobId) => {
  const job = await jobQueue.add('job-runner-queue', { id: jobId });
};

module.exports = { addJobToQueue };