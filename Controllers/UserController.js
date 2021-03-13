const mongoose = require("mongoose");
const User = mongoose.model("data");
const Token = mongoose.model("token");

var tokenService = require("../services/auth");
var passwordService = require("../services/password");
var crypto = require("crypto");
var nodemailer = require("nodemailer");

// function for login
exports.UserLogin = async (req, res) => {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      return res.status(500).send({ msg: err.message });
    }
    else if (!user) {
      return res.status(402).send({
        msg:
          "The email address " +
          req.body.email +
          " is not associated with any account. please check and try again!",
      });
    }
    if (user) {
      console.log('user:',user);

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
    }
      if (!user.isVerified)
        return res.status(402).send({
          type: "not-verified",
          msg: "Your account has not been verified.",
        });
  });
};

//function to register/create user profile (hash password)
exports.userInfo = async (req, res, next) => {
  console.log(req.body);

  User.findOne({ email: req.body.email }, async (err, user) => {
    if (user)
      return res.status(500).send({
        message:
          "The email address you have entered is already associated with another account.",
      });

    user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: passwordService.hashedPassword(req.body.password),
    });
    user.save(function (err) {
      if (err) {
        return res.status(500).send({ msg: err.message });
      }

      var token = new Token({
        _userId: user._id,
        token: crypto.randomBytes(16).toString("hex"),
      });

      token.save(function (err) {
        console.log("token saveed:", token);
        if (err) {
          return res.status(500).send({ msg: err.message });
        }

        var transporter = nodemailer.createTransport({
          service: "gmail",
          host: "smtp.gmail.com",
          port: "456",
          auth: {
            user: "shareverseapponline@gmail.com",
            pass: "Tigerprince1!",
          },
        });
        var mailOptions = {
          from: "shareverseapponline@gmail.com",
          to: user.email,
          subject: "Account Verification Token",
          text:
            "Hello there!"
            req.body.name +
            "\n\n" +
            "Please verify your account by clicking the link: \nhttp://" +
            req.headers.host +
            "/verify/" +
            user.email +
            "/" +
            token.token +
            "\n\nThank You!\n",
        };
        transporter.sendMail(mailOptions, function (err) {
          if (err) {
            return res.status(500).send({
              errmsg:
                "Technical Issue!, Please click on resend for verify your Email.",
            });
          }
          res
            .status(200)
            .send(
              "A verification email has been sent to " +
                user.email +
                ". It will be expire after one day. If you not get verification Email click on resend token."
            );
        });
      });
    });
  });
};

//function to confrim the token
exports.confirmEmail = function (req, res, next) {
  Token.findOne({ token: req.params.token }, function (err, token) {
    console.log("token status:", req.params.token);

    if (!token)
      return res.status(400).send({
        type: "not-verified",
        msg:
          "We were unable to find a valid token. Your token my have expired.",
      });

    User.findOne(
      { _id: token._userId, email: req.params.email },
      function (err, user) {
        console.log("user status:", user);
        if (!user)
          return res
            .status(400)
            .send({ msg: "We were unable to find a user for this token." });
        if (user.isVerified)
          return res.status(400).send({
            type: "already-verified",
            msg: "This user has already been verified.",
          });

        user.isVerified = true;
        user.save(function (err) {
          if (err) {
            return res.status(500).send({ msg: err.message });
          }
          return res
            .status(200)
            .send("The account has been verified. Please log in.");
        });
      }
    );
  });
};
