const mongoose = require("mongoose");
const PostMessage = mongoose.model("posts");

var tokenService = require("../services/auth");

//function baseRoute 
exports.baseRoute = async (req, res) => {
  res.send("Server Running");
};

// function for profile - test by adding header to postman (verifies token)
exports.userProfile = async (req, res) => {
  console.log(req.headers);
  let myToken = req.headers.authorization;
  console.log(myToken);

  if (myToken) {
    let currentUser = await tokenService.verifyToken(myToken);
    console.log(currentUser);

    if (currentUser) {
      let responseUser = {
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        userBio: currentUser.userBio
      };
      res.json({
        message: "User Profile information loaded successfuly",
        status: 200,
        user: responseUser,
      });
    } else {
      res.json({
        message: "Token was invaild or expired",
        status: 403,
      });
    }
  } else {
    res.json({
      message: "No token received",
      status: 403,
    });
  }
};

// function get all posts
exports.getPosts = async (req, res) => {
  const data = await PostMessage.find(); //query the database
  res.json(data); //send var as a json
};


//function to get a single post
exports.getSinglePost = async (req, res) => {
  // get id from URL by using req.params
  let postID = req.params.id;
  // we use mongodb's findById() functionality here
  await PostMessage.findById({ _id: postID }, (err, data) => {
    if (err) {
      res.status(500).json({
        message: "Something went wrong, please try again later.",
      });
    } else {
      console.log(data);
      res.status(200).json({
        message: "Post found",
        data,
      });
    }
  });
};

//function to update a single post
exports.updatePost = async (req, res) => {
  let postID = req.params.id;
  await PostMessage.findByIdAndUpdate(
    { _id: postID },
    { $set: req.body },
    (err, data) => {
      if (err) {
        res.status(500).json({
          message: "Something went wrong.",
        });
      } else {
        res.status(200).json({
          message: "Post Updated",
          data,
        });
      }
    }
  );
};

//function to delete a single post
exports.deletePost = async (req, res) => {
  let postID = req.params.id;
  await PostMessage.deleteOne({ _id: postID }, (err, data) => {
    if (err) {
      res.status(500).json({
        message: "Something went wrong.",
      });
    } else {
      res.status(200).json({
        message: "This post has successfully been removed.",
        data,
      });
    }
  });
};
