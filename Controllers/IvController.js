const mongoose = require("mongoose");
const VImage = mongoose.model("images");
const Posts = mongoose.model("posts");


/* function to POST FULL bible verse-------------------------------------------------*/
exports.PostImgVerse = async (req, res) => {

  await new Posts(req.body).save( async (err, data) => {
    if (err) {
      res.status(500).json({
        message: "Something went wrong, please try again later.",
      });
    } else {
      await new VImage({
        newImage: req.body.images[0].data_url,
        refId: data._id
      }) 
      .save((error, image) => {
        if (error) {
      res.status(500).json({
        message: "Something went wrong, please try again later.",
      });
        }
        else {
          res.status(200).json({
            message: "Post Created",
            data,
            image
          });
        }
      })
    }
  });
};



/* function to GET input data by id-------------------------------------------------*/
exports.getBibleVersePost = async (req, res) => {
  let postVerseID = req.params.id;
  await Posts.findById({ _id: postVerseID }, (err, data) => {
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

/* function to POST image-----------------------------------------------------------*/
exports.imagePost = async (req, res) => {
    console.log(req.body);
    const newImage = new VImage({
      newImage: req.body.newImage    
    });
    console.log(newImage);
    await newImage.save((err, data) => {
      if (err) {
        res.status(500).json({
          message: "Something went wrong, please try again later.",
        });
      } else {
          res.json({
            message: "image uploaded",
            status: 200,
            data
        });
      }
    });
  };
  
/* function to GET image-------------------------------------------------------------*/
exports.getImagePost = async (req, res) => {
  let ImageID = req.params.id;
  await VImage.findOne({refId: ImageID}, (err, data) => {
    if (err) {
      res.status(500).json({
        message: "Something went wrong, please try again later.",
      });
    } else {
      console.log(data);
      res.status(200).json({
        message: "Image found",
        data,
      });
    }
  });
};

