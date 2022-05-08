const path = require("path");
const { exec } = require("child_process");
const { outputFile } = require("../utils/generateFiles");
const { outputDirectory } = require("../utils/generateDirs");

const executeCode = async (codeFilePath) => {
  const codeLanguage = codeFilePath.split('.')[1];

  return new Promise( async (resolve, reject) => {
    if(codeLanguage === 'cpp') {
      const codeFileName = path.basename(codeFilePath).split(".")[0];
      const outputFilePath = await outputFile(codeFilePath);
      exec(
        `g++ ${codeFilePath} -o ${outputFilePath} && cd ${outputDirectory} && ./${codeFileName}.out`,
        (err, stdout, stderr) => {
          err && reject({ err, stderr });
          stderr && reject(stderr);
          resolve(stdout);
        }
      );
    } else if(codeLanguage === 'py') {
      exec(
        `python3 ${codeFilePath}`,
        (err, stdout, stderr) => {
          err && reject({ err, stderr });
          stderr && reject(stderr);
          resolve(stdout);
        }
      );
    }
  });
}

module.exports = { executeCode };