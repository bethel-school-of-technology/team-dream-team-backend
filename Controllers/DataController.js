const mongoose = require("mongoose");
const { restart } = require("nodemon");
const PostMessage = mongoose.model("posts");
const User = mongoose.model("data");
const VImage = mongoose.model("images");

var tokenService = require("../services/auth");
var passwordService = require("../services/password");

//function baseRoute (needed on DataRoute to go to "/")
exports.baseRoute = async (req, res) => {
  res.send("Server Running");
};

// function for login
exports.UserLogin = async (req, res) => {
  // console.log(req.body);
  User.findOne({ username: req.body.username }, function (err, user) {
    if (err) {
      console.log(err);
      res.status(500).json({
        message: "Error Accessing Database",
      });
    }
    console.log(user);
    if (user) {
      let passwordMatch = passwordService.comparePassword(
        req.body.password,
        user.password
      );
      if (passwordMatch) {
        let token = tokenService.assignToken(user);
        res.json({
          message: "Login was successful",
          status: 200,
          token,
        });
      } else {
        console.log("Wrong Password");
        res.json({
          message: "Wrong password",
          status: 403,
        });
      }
    } else {
      res.json({
        message: "Wrong username",
        status: 403,
      });
    }
  });
};

// function for profile - test by adding header to postman
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
        username: currentUser.username,
      };
      res.json({
        message: "User Profile information loaded successfuly",
        status: 200,
        user: responseUser
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

// function to create a post
exports.createPost = async (req, res) => {
  // we use mongodb's save functionality here
  await new PostMessage(req.body).save((err, data) => {
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
await PostMessage.findByIdAndUpdate({_id: postID}, {$set : req.body}, (err,data) =>
{
  if (err) {
res.status(500).json({
  message: "Something went wrong.",
});
  } else {
    res.status(200).json({
      message: "Post Updated", data,
    });
  }
  });
}

//function to delete a single post
exports.deletePost = async (req, res) => {
  let postID = req.params.id;
await PostMessage.deleteOne({_id: postID}, (err,data) =>
{
  if (err) {
res.status(500).json({
  message: "Something went wrong.",
});
  } else {
    res.status(200).json({
      message: "This post has successfully been removed.", data,
    });
  }
  });
}

//function to create user profile
exports.userInfo = async (req, res) => {
  console.log(req.body);
  let newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    username: req.body.username,
    password: passwordService.hashedPassword(req.body.password),
  });
  await newUser.save((err, data) => {
    if (err) {
      // if there is an error send the following response
      res.status(500).json({
        message: "Something went wrong, please try again later.",
      });
    } else {
      // if success send the following response
        res.json({
          message: "User Info Created",
          status: 403,
          data
      });
    }
  });
};

exports.imagePost = async (req, res) => {
  console.log(req.body);
  let newImage = new VImage({
    newImage: req.body.newImage    
  });
  await newImage.save((err, data) => {
    if (err) {
      // if there is an error send the following response
      res.status(500).json({
        message: "Something went wrong, please try again later.",
      });
    } else {
      // if success send the following response
        res.json({
          message: "image uploaded",
          status: 200,
          data
      });
    }
  });
};

