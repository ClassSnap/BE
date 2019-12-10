const express = require("express");
const router = express.Router();
const db = require("./teacherModel");

//middleware
const restricted = require("./teacher-middleware");

//1a. Get all students By Teacher Id
router.get("/teacher/:teacherId", (req, res) => {
  const teacherId = req.params.teacherId;
  db.getAllStudentsByTeacherId(teacherId)
    .then(students => {
      res.status(200).json(students);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "Error getting all students by teacher id from server",
        error: error
      });
    });
});

//1b. Get one student by student id
router.get("/:id", (req, res) => {
  const studentId = req.params.id;

  db.getOneStudentByStudentId(studentId)
    .then(info => {
      console.log(info);
      res.status(200).json(info);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "Error getting student by student id from server",
      });
    });
});

//1c. Get all students
router.get("/", restricted, (req, res) => {
  db.getAllStudents()
    .then(students => {
      res.status(200).json({ message: "Working", students });
    })
    .catch(error => {
      res
        .status(500)
        .json({ errorMessage: "Error fetching all students from server" });
    });
});

//1d. Get all students by classId
router.get("/class/:classId", restricted, (req, res) => {
  const classId = req.params.classId
  db.getAllStudentsByClassId(classId)
    .then(students => {
      res.status(200).json(students)
    })
    .catch(error => {
      res.status(500).json({errorMessage: "Error fetching all students by class id from server", error: error})
    })
})

//2. add Student
router.post("/add", restricted, (req, res) => {
  const studentInfo = req.body;
  if (!studentInfo.lastName || !studentInfo.firstName) {
    res.status(404).json({ message: "Missing student info" });
  } else {
    db.addStudent(studentInfo)
      .then(student => {
        res.status(200).json({ message: "New student created", student });
      })
      .catch(error => {
        res
          .status(500)
          .json({ errorMessage: "Error adding students to server" });
      });
  }
});

//3. edit student
router.put("/:id", (req, res) => {
  const updateStudent = req.body;
  const updateStudentId = req.params.id;
  db.editStudent(updateStudent, updateStudentId)
    .then(info => {
      res.status(200).json({ message: "Student info updated" });
    })
    .catch(error => {
      res
        .status(500)
        .json({ errorMessage: "Error updating student info to server" });
    });
});

//4. Delete student
router.delete("/:id", (req, res) => {
  const deleteStudentId = req.params.id;
  db.deleteStudent(deleteStudentId)
    .then(info => {
      res.status(200).json({ message: "Student deleted" });
    })
    .catch(error => {
      res
        .status(500)
        .json({ errorMessage: "Error deleting student from server" });
    });
});

module.exports = router;
