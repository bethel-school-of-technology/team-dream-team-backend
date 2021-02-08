const mongoose = require("mongoose");
const { restart } = require("nodemon");
const PostMessgae = mongoose.model("posts");
const User = mongoose.model("data");

//function baseRoute (needed on TestDataRoute to go to "/")
exports.baseRoute = async (req, res) => {
  res.send("Server Running");
};

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

//test function to create user profile
exports.userInfo = async (req, res, next) => {
  console.log(req.body);
  let newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });
  await new User(req.body).save((err, data) => {
    if (err) {
      // if there is an error send the following response
      res.status(500).json({
        message: "Something went wrong, please try again later.",
      });
    } else {
      // if success send the following response
      res.status(200).json({
        message: "User Info Created",
        data,
      });
    }
  });
}
