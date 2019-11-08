const jwt = require("jsonwebtoken");
const secret = require("../../../Secrets/secret");

function generateTeacherToken(user) {
  const payload = {
    subject: user.id,
    type: "teacher",
  };
  const options = {
    expiresIn: "1d",
  };
  return jwt.sign(payload, secret.jwtSecret, options);
}

module.exports = generateTeacherToken;
