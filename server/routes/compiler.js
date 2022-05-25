const express = require("express");
const router = express.Router();

const { compiler, output } = require("../controllers/compiler");

router.post("/compile", compiler);
router.get("/output", output);

module.exports = router;