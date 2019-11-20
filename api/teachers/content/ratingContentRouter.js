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
module.exports = router;
