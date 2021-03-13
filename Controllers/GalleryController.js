const mongoose = require("mongoose");
const getImgUrls = mongoose.model("firebase");
const Posts = mongoose.model("posts");
const VImage = mongoose.model("images");

// function gets all urls from firebase in monogo
exports.getImageUrl = async (req, res) => {
  const getUrls = await getImgUrls.find();
  if (!getUrls) res.status(400).send({ error: "No Urls were found" });
  res.status(200).send(getUrls);
};

// function gets urls by id
exports.getImgUrlID = async (req, res) => {
  let getUrlsID = req.params.id;
  await getImgUrls.findById({ _id: getUrlsID }, (err, data) => {
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

/* function get all posts */
exports.PostAllInputs = async (req, res) => {
  const data = await Posts.find();
  res.json(data);
};

/* function to POST gallery input */
exports.PostGalleryInput = async (req, res) => {
  console.log(req.body);
  await new Posts({
    _id: req.params.id,
    body: req.body
    }
    ).save(async (err, data) => {
    if (err) {
      console.log("err:", err);
      res.status(500).json({
        message: "Something went wrong, please try again later.",
        _id: _id
      });
    } else {
      res.status(200).json({
        message: "Post Created",
        data,
      });
    }
  });
};

/* function to GET input data by id */
exports.getGalleryInput = async (req, res) => {
  let GalInputID = req.params.id;
  await Posts.findById({ _id: GalInputID }, (err, data) => {
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
