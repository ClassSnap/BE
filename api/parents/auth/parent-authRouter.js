const express = require("express");
const router = express.Router();
const db = require("./parent-authModel");
const bcrypt = require("bcryptjs");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//token
const genereateParentToken = require("./parent-token");

router.post("/register", async (req, res) => {
  const parentCreds = req.body;
  if (
    !parentCreds.parentName ||
    !parentCreds.parentEmail ||
    !parentCreds.parentPassword
  ) {
    res.status(404).json({
      message: "Name, Email, and Password are required for registration"
    });
  } else {
    const hashed = bcrypt.hashSync(parentCreds.parentPassword, 10);
    parentCreds.parentPassword = hashed;
    const { parentEmail } = req.body;
    const user = await db.findParentBy({ parentEmail });

    if (user.id) {
      res.status(400).json({ message: "Email is already used" });
    } else {
      db.addParent(parentCreds)
        .then(user => {
          res.status(201).json(user);
        })
        .catch(error => {
          res
            .status(500)
            .json({ errorMessage: "Error registering parent to server" });
        });
    }
  }
  // .catch(error => {
  //   res
  //     .status(500)
  //     .json({ errorMessage: "Error checking email from server" });
  // });
});

router.post("/login", (req, res) => {
  const { parentEmail, parentPassword } = req.body;
  if (!parentEmail || !parentPassword) {
    res.status(404).json({ message: "Email and password are required" });
  } else {
    db.findParentBy({ parentEmail })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(parentPassword, user.parentPassword)) {
          const parentToken = genereateParentToken(user);
          res.status(200).json({
            parentId: user.id,
            message: `Welcome ${user.parentName}`,
            language: user.language,
            parentToken
          });
        } else {
          res.status(404).json({ message: "Invalid login credentials" });
        }
      })
      .catch(error => {
        res.status(500).json({ errorMessage: "Server error in parent login" });
      });
  }
});

router.post("/check", (req, res) => {
  const { parentEmail } = req.body;
  db.findParentBy({ parentEmail })
    .then(parent => {
      if (parent.length === 0) {
        res.status(400).json({ error: "This email does not exist" });
      } else {
        res.status(200).json({ data: parent });
        email = parent[0].parentEmail;
        console.log(email);
        const msg = {
          to: { email },
          from: "classsnapllc@gmail.com",
          subject: "Password Reset on ClassSnap",
          text: "Please click the link below and reset your password",
          html: "<strong>https://class-snap.netlify.com/#/reset</strong>"
        };
        sgMail.send(msg);
      }
    })
    .catch(error => {
      res.status(500).json({ error: error });
    });
});

module.exports = router;
