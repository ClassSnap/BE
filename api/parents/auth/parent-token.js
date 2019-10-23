const jwt = require("jsonwebtoken");
const secret = require("../../../Secrets/secret");

function generateParentToken(user) {
  const payload = {
    subject: user.id,
    type: "parent",
  };
  const options = {
    expiresIn: "1d",
  };
  return jwt.sign(payload, secret.jwtSecret, options);
}

module.exports = generateParentToken;
