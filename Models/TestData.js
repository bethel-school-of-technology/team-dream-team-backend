const mongoose = require("mongoose");

//create schema
const DataSchema = new mongoose.Schema(
    {
      email: String,
      password: String,
    },
    {
      collection: "data",
    }
  );

  module.exports = mongoose.model('data', DataSchema);