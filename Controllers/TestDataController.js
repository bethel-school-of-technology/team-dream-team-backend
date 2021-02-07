const mongoose = require("mongoose");
const { restart } = require("nodemon");
const Data = mongoose.model("data");
const PostMessgae = mongoose.model("posts");

//function baseRoute (needed on TestDataRoute to go to "/")
exports.baseRoute = async (req, res) => {
  res.send("Server Running");
};

// function getData (needed on TestDataRoute to show mock data)
// exports.getData = async (req, res) => {
//   const data = await Data.find(); //query the database
//   res.json(data); //send var as a json
// };

// function get all posts 
exports.getPosts = async (req, res) => {
  const data = await PostMessgae.find(); //query the database
  res.json(data); //send var as a json
};

// function to create a post
exports.createPost = async (req, res) => {
  // we use mongodb's save functionality here
  await new PostMessgae(req.body).save((err, data) => {
    if (err) {
      // if there is an error send the following response
      res.status(500).json({
        message: "Something went wrong, please try again later.",
      });
    } else {
      // if success send the following response
      res.status(200).json({
        message: "Post Created",
        data,
      });
    }
  });
};

//function to get a single post
exports.getSinglePost = async (req, res) => {
  // get id from URL by using req.params
  let postID = req.params.id;
  // we use mongodb's findById() functionality here
  await PostMessgae.findById({ _id: postID }, (err, data) => {
    if (err) {
      res.status(500).json({
        message:
          "Something went wrong, please try again later.",
      });
    } else {
      console.log(data);      
      res.status(200).json({
        message: "Post found",
        data
      });
    }
  });
};
