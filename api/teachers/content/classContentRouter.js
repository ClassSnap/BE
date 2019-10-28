const express = require("express");
const router = express.Router();
const db = require("../../../data/dbConfig");

//middleware
const restricted = require("./teacher-middleware");

//1a. Add Class on Teacher Dashboard
router.post("/add", restricted, (req, res) => {
  const classInfo = req.body;
  if (
    !classInfo.className ||
    !classInfo.subject ||
    !classInfo.gradeLevel ||
    !classInfo.classCode ||
    !classInfo.teacherId
  ) {
    res.status(404).json({ message: "Missing information in class creation" });
  } else {
    db.addClass(classInfo)
      .then(item => {
        res.status(201).json({ message: "New class created", item });
      })
      .catch(error => {
        res.status(500).json({ errorMessage: "Error adding class to server" });
      });
  }
});

//1b. Get Class by Class Id
router.get("/:id", (req, res) => {
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

//1c. Update Class Info
router.put("/:id", (req, res) => {
  const updateClassId = req.params.id;
  const updateBody = req.body;
  db.updateClass(updateBopdy, updateClassId).then(update => {
    res.status(200).json({ message: "Class Updated" });
  });
});

//1d. Delete a class
router.delete("/:id", (req, res) => {
  const deleteClassId = req.params.id;
  db.deleteClass(deleteClassId)
    .then(info => {
      res.status(200).json({ message: "Class deleted" });
    })
    .catch(error => {
      res
        .status(500)
        .json({ errorMessage: "Error deleting class from server" });
    });
});

module.exports = router;
