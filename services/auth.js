const jwt = require("jsonwebtoken");
const User = require("../models/User");
// const { createSecretKey } = require("crypto");

var tokenService = {
  assignToken: function(user) {
    const token = jwt.sign(
      {
        username: user.username,
        _id: user._id,
      },
      "secretkey",
      {
        expiresIn: "1h",
      }
    )
    return token;
  },
  verifyToken: function(token) {
    try {
      let decoded = jwt.verify(token, "secretkey");
      return User.findById(decoded._id);
    } 
    catch (err) {
      return null;
    }
  },
};

module.exports = tokenService;
