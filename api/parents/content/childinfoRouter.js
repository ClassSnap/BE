const express = require("express");
const router = express.Router();
const db = require("./parentModel");
const parentlock = require("./parent-middleware");

//1. Match learner to parent
//likely need review
//current logic involves parent entering child name and child name is searched through
//learner table, then post a new record to
router.post("/match", parentlock, (req, res) => {
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
            errorMessage: "Error pairing learner and parent to server"
          });
        });
    } else {
      res.status(400).json({
        message: "There is no learner with such name and birthdate"
      });
    }
  });
});

//2. Get child by parent (working)
router.get("/:id", parentlock, (req, res) => {
  const userid = req.params.id;
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

router.get("/class", (req, res) => {
  db.getClass()
    .then(sess => {
      res.status(200).json(sess);
    })
    .catch(error => {
      res.status(500).json({ errorMessage: "Error getting classes" });
    });
});

module.exports = router;
