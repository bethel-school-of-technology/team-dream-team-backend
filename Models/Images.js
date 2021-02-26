const mongoose = require("mongoose");

//create schema
const ImagesSchema = new mongoose.Schema({
  newImage: { 
    type: String, 
    // contentType: String
  },
  refId: {
    type: mongoose.Types.ObjectId
  }

});

module.exports = mongoose.model("images", ImagesSchema);
