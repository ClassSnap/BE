const express = require("express");
const router = express.Router();
const db = require("../../../data/dbConfig");

//1. Get child's classes by child's id
router.get("/:id", (req, res) => {
  const learnerId = req.params.id;
  db.getClassByLearnerId(learnerId)
    .then(classes => {
      res.status(200).json(classes);
    })
    .catch(error => {
      res
        .status(500)
        .json({ errorMessage: "Error fetching classes by learner id" });
    });
});

//2. Get questions by class id
router.get("/questions/:id", (req, res) => {
  const classId = req.params.id;
  db.getQuestionByClassId(classId)
    .then(questions => {
      res.status(200).json(questions);
    })
    .catch(error => {
      res
        .status(500)
        .json({ errorMessage: "Error fetching questions by class Id" });
    });
});

//3. Get questions by question id
router.get("/q/:id", (req, res) => {
  const questionId = req.params.id;
  db.getQuestionByQuestionId(questionId)
    .then(question => {
      res.status(200).json(question);
    })
    .catch(error => {
      res
        .status(500)
        .json({ errorMessage: "Error getting question by question id" });
    });
});
module.exports = router;
