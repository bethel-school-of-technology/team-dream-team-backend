const mongoose = require("mongoose");
const CreateBio = mongoose.model("bios");


// gets all bios in array
exports.displayAllBio = async (req, res) => {
  const getBios = await CreateBio.find()
  if(!getBios) res.status(400).send({error : "No Urls were found"})
  res.status(200).send(getBios)
}

//create bio
  exports.createBio = async (req, res) => {
    console.log(req.body);
  const userBio = new CreateBio({
    userBio: req.body.userBio
  });
  console.log('userBio:', userBio);
    await userBio.save((err, data) => {
      if (err) {
        // if there is an error send the following response
        res.status(500).json({
          message: "Something went wrong, please try again later.",
        });
      } else {
        // if success send the following response
        res.status(200).json({
          message: "Bio Created",
          data,
        });
      }
    });
  };

//display bio
  exports.displayBio = async (req, res) => {
    // get id from URL by using req.params
    let userBioID = req.params.id;
    console.log(userBioID);
    // we use mongodb's findById() functionality here
    await CreateBio.findById({ _id: userBioID }, (err, data) => {
      if (err) {
        console.log(err)
        res.status(500).json({
          message: "Something went wrong, please try again later.",
        });
      } else {
        console.log(data);
        res.status(200).json({
          message: "bio found",
          data,
        });
      }
    });
  };
