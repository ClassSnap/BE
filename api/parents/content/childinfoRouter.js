const express = require("express");
const router = express.Router();
const db = require("../../../data/dbConfig");

const protected = require("./parent-middleware");

//1. Match learner to parent
//likely need review
//current logic involves parent entering child name and child name is searched through
//learner table, then post a new record to
router.post("/match", (req, res) => {
  const learnercode = req.body;
  const idparent = req.headers.token.username;

  db.findByLearnerCode(learnercode).then(learner => {
    if (learner) {
      db.matchLearnertoParent(learner.id, idparent)
        .then(pair => {
          res.status(200).json({ message: "New Learner-Parent Pair added" });
        })
        .catch(error => {
          res.status(500).json({
            errorMessage: "Error pairing learner and parent to server",
          });
        });
    } else {
      res.status(400).json({
        message: "There is no learner with such name and birthdate",
      });
    }
  });
});

//2. Get child by parent
router.get("/", (req, res) => {
  const userid = req.body;
  db.getLearnerByParentId(userid)
    .then(kids => {
      res.status(200).json(kids);
    })
    .catch(error => {
      res
        .status(500)
        .json({ errorMessage: "Error getting child from parents" });
    });
});

module.exports = router;
