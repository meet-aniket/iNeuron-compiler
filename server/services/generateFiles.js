const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const { codeDirectory, outputDirectory } = require("../services/generateDirs");

const codeFile = async(content, format) => {
  const jobId = uuid();
  const fileName = jobId +'.'+ format;
  const filePath = path.join(codeDirectory, fileName);

  await fs.writeFileSync(filePath, content);
  return filePath;
}

const outputFile = async(codeFilePath) => {
  const jobId = path.basename(codeFilePath).split('.')[0];
  const filePath = path.join(outputDirectory, `${jobId}.out`);
  return filePath;
}

module.exports = { codeFile, outputFile };