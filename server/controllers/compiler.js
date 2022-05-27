const { codeFile } = require("../services/generateFiles");
const { executionJob } = require("../models/executionJob");
const { addJobToQueue } = require("../services/jobQueue");

exports.compiler = async (req, res) => {
  // CPP is used as default programming language
  const { language = "cpp", code } = req.body;

  if(!code || code === undefined) {
    return res.status(400).json({
      success: false,
      error: "empty code body!"
    });
  }

  // Generate code file
  const codeFilePath = await codeFile(code, language);

  // Write execution-job into database and schedule it as job in queue
  const { _id: jobId } = new executionJob({ language, codeFilePath })
  addJobToQueue(jobId);
  
  res.status(201).json({ jobId });
}

exports.output = async (req, res) => {
  const jobId = req.query.id;
  if(!jobId) {
    return res.status(400).json({
      success: false,
      error: "missing _id query param!"
    });
  }

  const job = await executionJob.findById(jobId);
  if(!job) {
    return res.status(400).json({
      success: false,
      error: "could not find job!"
    });
  }

  return res.status(200).json({
    success: true,
    job
  });
}