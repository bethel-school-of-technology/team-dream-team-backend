const mongoose = require("mongoose");

//create schema
const ImagesSchema = new mongoose.Schema({
    img: { data: Buffer, contentType: String 
  }
});

module.exports = mongoose.model("images", ImagesSchema);