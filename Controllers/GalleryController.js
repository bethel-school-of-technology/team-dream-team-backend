// const mongoose = require("mongoose");
// const getImage = mongoose.model("images");
// const multer = require("multer");

// const fs = require('fs');
// const storage = multer.diskStorage({
//     destination: function (req, res, cb) {
//       cb(null, "/public/images");
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + '-' +file.originalname)
//       }
//     })
    
//     const upload = multer({ storage: storage }).single('file')

//   exports.getGalleryImage = (async (req, res) => {
//     '/create'
//         upload(req, res, (err) => {
//           if (err) {
//             res.sendStatus(500);
//           }
//           res.send(req.file);
//         });
//       });
// exports.getGalleryImage = (async (req, res) => {
//     '/upload'
//     let new_img = new getImage;
//     new_img.getImage.data = fs.readFileSync(req.file.path)
//     new_img.getImage.contentType = 'image/jpeg';  // or 'image/png'
//     new_img.save();
    
// res.json({ message: 'New image added to the db!' });
// }); exports.getGalleryImage = (async (req, res) => {
//     getImage.findOne({}, 'img createdAt', function(err, img) {
//         if (err)
//             res.send(err);
//         res.contentType('json');
//         res.send(getImage);
//     }).sort({ createdAt: 'desc' });
// });
