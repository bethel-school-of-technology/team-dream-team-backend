const mongoose = require("mongoose");

//create schema
const FireBaseSchema = new mongoose.Schema(
  {
    name: String,
    url: String,
  },
  {
    collection: "firebase",
  }
);

module.exports = mongoose.model("firebase", FireBaseSchema);
