const mongoose = require("mongoose");
const Image = mongoose.model("gallery");
const express = require('express');
const ImageRouter = express.Router();
const DIR = './public/';

/*  upload image in base64 format, thereby, directly storing it in mongodb datanase
    along with images uploaded using firebase storage  */    

    ImageRouter.route("/uploadbase")
    .post((req, res, next) => {
        const newImage = new Image({
            imageName: req.body.imageName,
            imageData: req.body.imageData
        });

        newImage.save()
            .then((result) => {
                res.status(200).json({
                    success: true,
                    document: result
                });
            })
            .catch((err) => next(err));
    });

/* ------------------------------------------------------------------------------  */  

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, DIR);
//     },
//     filename: (req, file, cb) => {
//         const fileName = file.originalname.toLowerCase().split(' ').join('-');
//         cb(null, fileName)
//       }
// });

// const upload = multer({
//     storage: storage,
//     limits: {
//         fileSize: 1024 * 1024 * 5
//     },
//     const: fileFilter = (req, file, cb) => {
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//         cb(null, true);
//     } else {
//         // rejects storing a file
//         cb(null, false);
//         return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
//     }
// }
// })

//     /* 
//     stores image in uploads folder using multer and creates a reference to the file
// */
//     ImageRouter.route("/uploadmulter")
//     .post(upload.single('image'), (req, res, next) => {
//         const newImage = new Image ({
//           _id: new mongoose.Types.ObjectId(),
//           name: req.body.name,
//           imageData: req.body.imageData
//         });
//         newImage.save().then(result => {
//           res.status(201).json({
//             message: "User registered successfully!",
//           })
//         })
//       })

    module.exports = ImageRouter;