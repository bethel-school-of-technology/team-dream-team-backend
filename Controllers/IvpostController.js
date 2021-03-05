const mongoose = require("mongoose");
const VImage = mongoose.model("images");
const PostBibleVerse = mongoose.model("posts");


/* function to POST FULL bible verse-------------------------------------------------*/
exports.createBibleVerse = async (req, res) => {
  // we use mongodb's save functionality here
  // console.log(req.body)
  // res.send("recieved");
  await new PostBibleVerse(req.body).save( async (err, data) => {
    if (err) {
      // if there is an error send the following response
      res.status(500).json({
        message: "Something went wrong, please try again later.",
      });
    } else {
      // if success send the following response
      await new VImage({
        newImage: req.body.images[0].data_url,
        refId: data._id
      }) 
      .save((error, image) => {
        if (error) {
      // if there is an error send the following response
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



/* function to GET a input data by id-------------------------------------------------*/
exports.getBibleVersePost = async (req, res) => {
  // get id from URL by using req.params
  let postVerseID = req.params.id;
  // we use mongodb's findById() functionality here
  await PostBibleVerse.findById({ _id: postVerseID }, (err, data) => {
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
  
/* function to GET image-------------------------------------------------------------*/
exports.getImagePost = async (req, res) => {
  // get id from URL by using req.params
  let ImageID = req.params.id;
  // we use mongodb's findById() functionality here
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





/* FOR GALLERY 
function to GET text and image from  -------------------------------------------------*/
exports.createGalleryVerse = async (req, res) => {
  // we use mongodb's save functionality here
  console.log(req.body)
  // res.send("recieved");
  await new PostBibleVerse(req.body).save( async (err, data) => {
    if (err) {
      // if there is an error send the following response
      res.status(500).json({
        message: "Something went wrong, please try again later.",
      });
    } 
    // else {
    //   // if success send the following response
    //   await new VImage({
    //     imgUrl: req.body.data_url,
    //   }) 
    //   .save((error, image) => {
    //     if (error) {
    //   // if there is an error send the following response
    //   res.status(500).json({
    //     message: "Something went wrong, please try again later.",
    //   });
    //    }
       else {
        res.status(200).json({
          message: "Post Created",
          data
        });
      }
    //  })
    // }
  });
};
  