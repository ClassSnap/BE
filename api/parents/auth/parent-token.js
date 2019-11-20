const jwt = require("jsonwebtoken");

function generateParentToken(user) {
  const payload = {
    subject: user.id,
    type: "parent"
  };
  const options = {
    expiresIn: "1d"
  };
  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

module.exports = generateParentToken;
