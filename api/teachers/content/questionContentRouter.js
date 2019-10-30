const express = require("express");
const router = express.Router();
const db = require("./teacherModel");

//middleware
const restricted = require("./teacher-middleware");

//1. Get question by Class Id
router.get("/class/:id", restricted, (req, res) => {
  const classId = req.params.id;
  db.getQuestionByClassId(classId)
    .then(questions => {
      res.status(200).json(questions);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "Error getting questions by Class id from server",
      });
    });
});

//1a. Get Question by Question Id
router.get("/:id", restricted, (req, res) => {
  const questionId = req.params.id;
  db.getQuestionByQuestionId(questionId)
    .then(question => {
      res.status(200).json(question);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "Error getting questions by Question id from server",
      });
    });
});

//2. Add Question
router.post("/add", restricted, (req, res) => {
  const questions = req.body;
  if (!questions.question || !questions.date || !questions.classId) {
    res.status(404).json({ message: "Missing question info" });
  } else {
    db.addQuestion(questions)
      .then(question => {
        res.status(200).json({ message: "New question created", question });
      })
      .catch(error => {
        res
          .status(500)
          .json({ errorMessage: "Error adding question to server" });
      });
  }
});

//3. Edit Question
router.put("/:id", restricted, (req, res) => {
  const updateQuestion = req.body;
  const updateQuestionId = req.params.id;
  db.getQuestionByQuestionId(updateQuestionId).then(info => {
    console.log(info);
    if (info.length === 0) {
      res
        .status(404)
        .json({ message: "There is no question associated with this id" });
    } else {
      db.editQuestion(updateQuestion, updateQuestionId)
        .then(info => {
          res.status(200).json({ message: "Question updated" });
        })
        .catch(error => {
          res
            .status(500)
            .json({ errorMessage: "Error updating question to server" });
        });
    }
  });
});

//4. Delete Question
router.delete("/:id", restricted, (req, res) => {
  const deleteQuestionId = req.params.id;
  db.deleteQuestion(deleteQuestionId)
    .then(info => {
      res.status(200).json({ message: "Question deleted" });
    })
    .catch(error => {
      res
        .status(500)
        .json({ errorMessage: "Error deleting question from server" });
    });
});

module.exports = router;
