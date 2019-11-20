const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "Bad token!" });
      } else {
        if (decodedToken.type === "teacher") {
          req.username = decodedToken.username;
          next();
        } else {
          res.status(400).json({ messaghe: "Wrong user type!" });
        }
      }
    });
  } else {
    res.status(400).json({ message: "There is no token, so you can't pass" });
  }
};
