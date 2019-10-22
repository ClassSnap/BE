const express = require("express");
const router = express.Router();
const db = require("./teacher-authModel");
const bcrypt = require("bcryptjs");

//New Teacher Registration
router.post("/register");

module.exports = router;
