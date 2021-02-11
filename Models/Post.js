const mongoose = require("mongoose");

//create schema
const PostSchema = new mongoose.Schema(
    {
      title: String,
      body: String,
    },
    {
      collection: "posts",
    }
  );

  module.exports = mongoose.model('posts', PostSchema);