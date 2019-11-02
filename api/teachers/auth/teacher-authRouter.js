const express = require("express");
const router = express.Router();
const db = require("./teacher-authModel");
const bcrypt = require("bcryptjs");

//token
const generateTeacherToken = require("./teacher-token");

//New Teacher Registration
router.post("/register", (req, res) => {
  const teacherCreds = req.body;
  if (
    !teacherCreds.prefix ||
    !teacherCreds.teacherFirstName ||
    !teacherCreds.teacherLastName ||
    !teacherCreds.teacherEmail ||
    !teacherCreds.teacherPassword ||
    !teacherCreds.schoolName ||
    !teacherCreds.city
  ) {
    res.status(404).json({
      message: "Required information for teacher registration missing",
    });
  } else {
    const hash = bcrypt.hashSync(teacherCreds.teacherPassword, 10);
    teacherCreds.teacherPassword = hash;
    console.log(teacherCreds);
    db.addTeacher(teacherCreds)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(error => {
        res.status(500).json({
          errorMessage: "Error registering teacher account to server",
        });
      });
  }
});

router.post("/login", (req, res) => {
  const { teacherEmail, teacherPassword } = req.body;
  if (!teacherEmail || !teacherPassword) {
    res.status(404).json({ message: "Email and password are required" });
  } else {
    db.findTeacherBy({ teacherEmail })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(teacherPassword, user.teacherPassword)) {
          const token = generateTeacherToken(user);
          res.status(200).json({
            id: user.id,
            message: `Welcome ${user.teacherFirstName}`,
            token: token,
          });
        } else {
          res.status(401).json({ message: "Invalid User Credentials" });
        }
      })
      .catch(error => {
        res.status(500).json({ errorMessage: "Server error in teacher login" });
      });
  }
});

module.exports = router;
