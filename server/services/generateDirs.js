const fs = require("fs");
const path = require("path");

const codeDirectory = path.join(__dirname, "../codes");
if(!fs.existsSync(codeDirectory)) {
  fs.mkdirSync(codeDirectory, { recursive: true });
}

const outputDirectory = path.join(__dirname, "../output");
if(!fs.existsSync(outputDirectory)) {
  fs.mkdirSync(outputDirectory, { recursive: true });
}

module.exports = { codeDirectory, outputDirectory };