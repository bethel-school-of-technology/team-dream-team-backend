const mongoose = require("mongoose");
const VImage = mongoose.model("images");


//function to post image
//--------------------------------------------------------------------------------------------------
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
  
  