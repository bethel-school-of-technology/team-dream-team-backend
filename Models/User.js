const mongoose = require("mongoose");

//create schema
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  passwordResetToken: {
    type: String
  },
  passwordResetExpires: {
    type: Date}
    ,
  isVerified: { 
    type: Boolean, 
    default: false 
  }
});

module.exports = mongoose.model("data", UserSchema);
