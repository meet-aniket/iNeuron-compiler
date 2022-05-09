const { codeFile } = require("../utils/generateFiles");
const { executeCode } = require("../utils/executeFile");
const { executionJob } = require("../models/executionJob");

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
  
  // Execute code file
  try{
    const result =  await executeCode(codeFilePath);
    return res.status(200).json({
      output: result
    })
  } catch(err) {
    console.error(err);
  } 
}