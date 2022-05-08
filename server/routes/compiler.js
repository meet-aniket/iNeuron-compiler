const express = require("express");
const router = express.Router();

const { compiler } = require("../controllers/compiler");

router.post("/compile", compiler);

module.exports = router;