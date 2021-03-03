const mongoose = require("mongoose");

//create schema
const ImagesSchema = new mongoose.Schema({
  imageName: {
    type: String,
    default: "none",
    required: true
  },
  imageData: {
    // type: mongoose.Types.ObjectId,
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("gallery", ImagesSchema);
