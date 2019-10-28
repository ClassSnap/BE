const express = require("express");
const router = express.Router();
const db = require("../../../data/dbConfig");

const protected = require("./parent-middleware");

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
