const mongoose = require("mongoose");
const getImgUrls = mongoose.model("firebase");
const Posts = mongoose.model("posts");


// function gets all urls from firebase in monogo
exports.getImageUrl = async (req, res) => {
    const getUrls = await getImgUrls.find()
    if(!getUrls) res.status(400).send({error : "No Urls were found"})
    res.status(200).send(getUrls)
    // console.log('from backend:', getUrls)
}

// function gets urls by id
exports.getImgUrlID = async (req, res) => {
  let getUrlsID = req.params.id;
  // we use mongodb's findById() functionality here
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

// function get all posts

exports.PostAllInputs = async (req, res) => {
  const data = await Posts.find(); //query the database
  res.json(data); //send var as a json
};

/* function to POST gallery input-------------------------------------------------------------*/
exports.PostGalleryInput = async (req, res) => {
    console.log(req.body)
    // res.send("recieved");
    await new Posts(req.body).save( async (err, data) => {
      if (err) {
        console.log('err:', err);
        // if there is an error send the following response
        res.status(500).json({
          message: "Something went wrong, please try again later.",
        });
      } else {
            res.status(200).json({
              message: "Post Created",
              data
            });
         }
    });
  };
  
  /* function to GET input data by id-------------------------------------------------*/
exports.getGalleryInput = async (req, res) => {
    // get id from URL by using req.params
    let GalInputID = req.params.id;
    // we use mongodb's findById() functionality here
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