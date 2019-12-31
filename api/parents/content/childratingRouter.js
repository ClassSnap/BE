const express = require("express");
const router = express.Router();

const db = require("../../parents/content/parentModel");
const parentlock = require("./parent-middleware");

//1. Post rating to specific question
router.post("/by/:id", parentlock, (req, res) => {
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

router.get("/question/:id", parentlock, (req, res) => {
  const qrid = req.params.id;
  db.getRatingByQuestionId(qrid)
    .then(info => {
      res.status(200).json(info);
    })
    .catch(error => {
      res
        .status(500)
        .json({ errorMessage: "Error getting rating by question ID" });
    });
});

//Get Rating by Rating Id
router.get("/:id", parentlock, (req, res) => {
  const ratingId = req.params.id;
  db.getRatingByRatingId(ratingId)
    .then(info => {
      res.status(200).json(info);
    })
    .catch(error => {
      res
        .status(500)
        .json({ errorMessage: "Error getting rating by Rating ID" });
    });
});

// Get ratings by leaner_parent id
router.get("/learnerParent/:id", parentlock, (req, res) => {
  const lpid = req.params.id;
  db.getRatingByLearnerParentId(lpid)
    .then(ratings => res.status(200).json(ratings))
    .catch(error =>
      res.status(500).json({
        errorMessage: "Error getting ratings",
        error: error
      })
    );
});

//Get ratings by Parent ID
router.get("/parent/:id", parentlock, (req, res) => {
  const parentId = req.params.id;
  db.getRatingByParentId(parentId)
    .then(ratings => res.status(200).json(ratings))
    .catch(error =>
      res
        .status(500)
        .json({ errorMessage: "Error getting ratings from parent ID", error })
    );
});

//Update rating (a.k.a Parents posting rating since teacher creates the blank form)
// router.put("/:id", parentlock, (req, res) => {
//   const score = req.body;
//   const ratingId = req.params.id;
//   db.getRatingByRatingId(ratingId)
//     .then(newRating => {
//       if (newRating.length === 0) {
//         res.status(404).json({ errorMessage: "Rating Id does not exist" });
//       } else {
//         db.editRatingByRatingId(ratingId, score)
//           .then(newRating =>
//             res.status(200).json({ message: "New Rating posted", rating })
//           )
//           .catch(error => {
//             res
//               .status(500)
//               .json({ errorMessage: "Error posting/updating rating", error });
//           });
//       }
//     })
//     .catch(error => {
//       res
//         .status(500)
//         .json({ errorMessage: "Error geting rating by rating id", error });
//     });
// });

router.put("/:id", (req, res) => {
  const score = req.body;
  const ratingId = req.params.id;
  db.getRatingByRatingId(ratingId)
    .then(singleRating => {
      if (singleRating.length === 0) {
        res
          .status(404)
          .json({ errorMessage: "No rating associated to this ID", error });
      } else {
        db.editRatingByRatingId(ratingId, score)
          .then(rating => {
            res.status(200).json({ message: "Rating updated", rating });
          })
          .catch(error => {
            res
              .status(500)
              .json({ errorMessage: "Error editing rating", error });
          });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ errorMessage: "Error geting rating by rating id", error });
    });
});

module.exports = router;
