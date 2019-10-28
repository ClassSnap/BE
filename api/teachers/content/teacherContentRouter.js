const express = require("express");
const router = express.Router();
const db = require("./teacherModel");

//middleware
const restricted = require("./teacher-middleware");

// 1. Get Classes by Teacher id
router.get("/:id", restricted, (req, res) => {
  const teacherId = req.params.id;
  db.getClassByTeacherId(teacherId)
    .then(classes => {
      res.status(200).json(classes);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "Error fetching class data for teachers from server",
      });
    });
});

// //1a. Add Class on Teacher Dashboard
// router.post("/addClass", restricted, (req, res) => {
//   const classInfo = req.body;
//   if (
//     !classInfo.className ||
//     !classInfo.subject ||
//     !classInfo.gradeLevel ||
//     !classInfo.classCode ||
//     !classInfo.teacherId
//   ) {
//     res.status(404).json({ message: "Missing information in class creation" });
//   } else {
//     db.addClass(classInfo)
//       .then(item => {
//         res.status(201).json({ message: "New class created", item });
//       })
//       .catch(error => {
//         res.status(500).json({ errorMessage: "Error adding class to server" });
//       });
//   }
// });

//1b. Get Class by Class Id
router.get("/class/:id", (req, res) => {
  const classId = req.params.id;
  db.getClassByTeacherId(classId)
    .then(info => {
      if (!info) {
        res
          .status(400)
          .json({ message: "There is no class associated with this Id" });
      } else {
        res.status(200).json({ info });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ errorMessage: "Error fetching class by Class Id from server" });
    });
});

//1c. Add Question

module.exports = router;
