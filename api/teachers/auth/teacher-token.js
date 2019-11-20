const jwt = require("jsonwebtoken");

function generateTeacherToken(user) {
  const payload = {
    subject: user.id,
    type: "teacher"
  };
  const options = {
    expiresIn: "1d"
  };
  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

module.exports = generateTeacherToken;
