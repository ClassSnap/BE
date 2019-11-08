const express = require("express");
const router = express.Router();
const db = require("../../../data/dbConfig");

//1. Post rating to specific question
router.post("/by/:id", (req, res) => {
  const lpid = req.params.lpid;
  const rating = req.body;
  db.addRating(rating, lpid)
    .then(student => {
      res.status(200).json(student);
    })
    .catch(error => {
      res.status(500).json({ errorMessage: "Error posting rating to server" });
    });
});

//2.Get rating from question
router.get("/:id", (req, res) => {
  const qrid = req.params.lpid;
  db.get;
});

module.exports = router;
