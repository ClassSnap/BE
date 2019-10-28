const express = require("express");
const router = express.Router();
const db = require("../../../data/dbConfig");

//middleware
const restricted = require("./teacher-middleware");

//1a Get Rating By Class Id
router.get("/class/:id", (req, res) => {
  const RclassId = req.params.id;
  db.getRatingByClassId(RclassId)
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
  const RquestionId = req.params.id;
  db.getRatingByClassId(RquestionId)
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
module.exports = router;
