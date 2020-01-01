const express = require("express");
const router = express.Router();
const db = require("./teacherModel");

//middleware
const restricted = require("./teacher-middleware");

// //1a. Get all students By Teacher Id
// router.get("/teacher/:id", (req, res) => {
//   const teacherId = req.params.id;
//   db.getAllStudentsByTeacherId(teacherId)
//     .then(info => {
//       res.status(200).json(info);
//     })
//     .catch(error => {
//       res.status(500).json({
//         errorMessage: "Error getting all students by teacher id from server",
//       });
//     });
// });

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
        errorMessage: "Error getting student by student id from server"
      });
    });
});

//2. add Student to learner database
router.post("/", restricted, (req, res) => {
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
          .json({ errorMessage: "Error adding students to server", error });
      });
  }
});

//3. edit student on learner database table
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

router.get("/classparents/:id", restricted, (req, res) => {
  const classId = req.params.id;

  db.getLearnersParentsByClassId(classId)
    .then(info => {
      res.status(200).json(info);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "Error getting learnerParent by ClassId",
        error
      });
    });
});

//4. Connect learner with class at learner_class table
router.post("/class/", restricted, (req, res) => {
  const classLearner = req.body;
  if (!classLearner.learnerId || !classLearner.classId) {
    res.status(404).json({ message: "Learner ID and Class ID required" });
  } else {
    db.addStudenttoClass(classLearner)
      .then(student => {
        res
          .status(200)
          .json({ message: "Connected student to class", student });
      })
      .catch(error => {
        res
          .status(500)
          .json({ errorMessage: "Error connecting student with class", error });
      });
  }
});

//Get all students in a class by Class Id
router.get("/class/:id", restricted, (req, res) => {
  const classId = req.params.id;
  db.getLearnersByClassId(classId)
    .then(allStudents => {
      res
        .status(200)
        .json({ message: "Get students by Class Id", allStudents });
    })
    .catch(error => {
      res
        .status(500)
        .json({ errorMessage: "Error getting students by classId", error });
    });
});

//Delete student in a class
router.delete("/classlearner/:id", restricted, (req, res) => {
  const deleteLearnerId = req.params.id;
  db.deleteStudentfromClass(deleteLearnerId)
    .then(student => {
      res.status(200).json({ message: "Class-learner pair deleted", student });
    })
    .catch(error => {
      res
        .status(500)
        .json({ errorMessage: "Error deleting class-learner pair", error });
    });
});

module.exports = router;
