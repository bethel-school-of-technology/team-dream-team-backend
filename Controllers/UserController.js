const mongoose = require("mongoose");

const User = mongoose.model("data");
const Token = mongoose.model("token");

var tokenService = require("../services/auth");
var passwordService = require("../services/password");

var crypto = require("crypto");
var nodemailer = require("nodemailer");


// function for login
//--------------------------------------------------------------------------------------------------
exports.UserLogin = async (req, res) => {
    // console.log(req.body);
    User.findOne({ email: req.body.email }, function (err, user) {
      if (err) {
        // console.log(err);
          if (!user)
        return res.status(401).send({
          msg:
            "The email address " +
            req.body.email +
            " is not associated with any account.",
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
          message: "Wrong email",
          status: 403,
        });
      }
            // Make sure the user has been verified
        if (!user.isVerified)
          return res.status(401).send({
            type: "not-verified",
            msg: "Your account has not been verified.",
          });
  
        // Login successful, write token, and send back user
        res.send({ token: generateToken(user), user: user.toJSON() });
    });
  };
  
  //function to register/create user profile (hash password)
  //--------------------------------------------------------------------------------------------------
   exports.userInfo = async (req, res, next) => {
    console.log(req.body);
  
  
        // Make sure this account doesn't already exist
        User.findOne({ email: req.body.email }, async (err, user) => {
          // Make sure user doesn't already exist
          if (user)
            return res
              .status(400).send({
                message:
                  "The email address you have entered is already associated with another account.",
              });
  
      // Create and save the user
      user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: passwordService.hashedPassword(req.body.password),
      });
      await user.save(function (err) {
          if (err) {
            return res.status(500).send({ msg: err.message });
          }
  
          // Create a verification token for this user
          var token = new Token({
            _userId: user._id,
            token: crypto.randomBytes(16).toString("hex"),
          });
    
          // Save the verification token
          token.save(function (err) {
            console.log('token saveed:', token)
            if (err) {
              return res.status(500).send({ msg: err.message });
            }
    
            // Send the email
            var transporter = nodemailer.createTransport({
              service: "gmail",
              host: 'smtp.gmail.com',
              port: '456',
              // ssl = true,
              auth: {
                user: 'shareverseapponline@gmail.com',
                pass: 'Tigerprince1!',
              },
            });
            var mailOptions = {
              from: "shareverseapponline@gmail.com",
              to: user.email,
              subject: "Account Verification Token",
              html:
                "Hello,\n\n" +
                "Please verify your account by clicking the link: \nhttp://" +
                req.headers.host +
                "/verify/" +
                token.token +
                ".\n",
            };
            transporter.sendMail(mailOptions, function (err) {
              if (err) {
                return res.status(500).send({ errmsg: err.message });
              }
          res
            .status(200)
            .send("A verification email has been sent to " + user.email + ".");
            });
          });
        })
      });       
    };
  
  //function to confrim the token 
  //--------------------------------------------------------------------------------------------------
  exports.confirmationPost = function (req, res, next) {
  
    // Find a matching token
    Token.findOne({ token: req.body.token }, function (err, token) {
      console.log('token status:', req.body.token);
  
      if (!token)
        return res.status(400).send({
          type: "not-verified",
          msg:
            "We were unable to find a valid token. Your token my have expired.",
        });
  
      // If we found a token, find a matching user
      User.findOne(
        { _id: token._userId, email: req.body.email },
        function (err, user) {
          if (!user)
            return res
              .status(400)
              .send({ msg: "We were unable to find a user for this token." });
          if (user.isVerified)
          // console.log('user:', user.isVerified)
            return res.status(400).send({
              type: "already-verified",
              msg: "This user has already been verified.",
            });
  
          // Verify and save the user
          user.isVerified = true;
          user.save(function (err) {
            if (err) {
              return res.status(500).send({ msg: err.message });
            }
            return res.status(200).send("The account has been verified. Please log in.");
          });
        }
      );
    });
  };

  //function to reissue confirmation tokens once token are expiried
//--------------------------------------------------------------------------------------------------
exports.resendTokenPost = function (req, res, next) {

    User.findOne({ email: req.body.email }, function (err, user) {
      if (!user)
        return res
          .status(400)
          .send({ msg: "We were unable to find a user with that email." });
      if (user.isVerified)
        return res
          .status(400)
          .send({
            msg: "This account has already been verified. Please log in.",
          });
  
      // Create a verification token, save it, and send email
      var token = new Token({
        _userId: user._id,
        token: crypto.randomBytes(16).toString("hex"),
      });
  
      // Save the token
      token.save(function (err) {
        if (err) {
          return res.status(500).send({ msg: err.message });
        }
  
        // Send the email
        var transporter = nodemailer.createTransport({
          service: "gmail",
          host: 'smtp.gmail.com',
          port: '456',
          // ssl = true,
          auth: {
            user: 'shareverseapponline@gmail.com',
            pass: 'Tigerprince1!',
          },
        });
        var mailOptions = {
          from: "shareverseapponline@gmail.com",
          to: user.email,
          subject: "Account Verification Token",
          text:
            "Hello,\n\n" +
            "Please verify your account by clicking the link: \nhttp://" +
            req.headers.host +
            "/confirmation/" +
            token.token +
            ".\n",
        };
        transporter.sendMail(mailOptions, function (err) {
          if (err) {
            return res.status(500).send({ msg: err.message });
          }
          res
            .status(200)
            .send("A verification email has been sent to " + user.email + ".");
        });
      });
    });
  };
  