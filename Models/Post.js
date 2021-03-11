const mongoose = require("mongoose");

//create schema
const PostSchema = new mongoose.Schema(
    {
      title: String,
      body: String,
      name: String,
      url: String,
      comment: String,
    },
    {
      collection: "posts",
    }
  );

  module.exports = mongoose.model('posts', PostSchema);