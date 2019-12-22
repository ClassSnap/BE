const express = require("express");
const router = express.Router();
const db = require("./teacherModel");

//middleware
const restricted = require("./teacher-middleware");

//1a Get Rating By Class Id
router.get("/class/:id", (req, res) => {
  const rClassId = req.params.id;
  db.getRatingByClassId(rClassId)
    .then(rating => {
      res.status(200).json(rating);
    })
    .catch(error => {
      res
        .status(500)
        .json({ errorMessage: "Error fetching rating from class Id" });
    });
});

// 1b. Get Rating By Question Id
router.get("/question/:id", (req, res) => {
  const rQuestionId = req.params.id;
  db.getRatingByQuestionId(rQuestionId)
    .then(rating => {
      res.status(200).json(rating);
    })
    .catch(error => {
      res
        .status(500)
        .json({ errorMessage: "Error fetching rating from question Id" });
    });
});

//** */1c Get Rating By Student amd class id (For rating from specific class for specific student)
//   router.get("/student/:id", (req,res) => {
//       const RstudentId = req.params.id
//       const RclassId = req.body
//     })

router.get("/", (req, res) => {
  db.getAllRating()
    .then(rating => {
      res.status(200).json(rating);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

//Post blank rating
router.post("/", restricted, (req, res) => {
  const blankForm = req.body;
  if (
    !blankForm.questionId ||
    !blankForm.learnerParentId ||
    !blankForm.classId
  ) {
    res.status(404).json({ errorMessage: "Missing IDs" });
  } else {
    db.addRatingtoNewQuestion(blankForm)
      .then(info => {
        res.status(200).json(info);
      })
      .catch(error => {
        res
          .status(500)
          .json({ errorMessage: "Error creating blank form", error });
      });
  }
});

//Delete Rating By Question Id
router.delete("/:id", restricted, (req, res) => {
  const deleteQuestionId = req.params.id;
  db.deleteRatingbyQuestionId(deleteQuestionId)
    .then(info => {
      res.status(200).json({
        message: `Ratings of question ID ${deleteQuestionId} deleted`,
        info
      });
    })
    .catch(error => {
      res
        .status(500)
        .json({ errorMessage: "Error deleting ratings by question Id", error });
    });
});

module.exports = router;
