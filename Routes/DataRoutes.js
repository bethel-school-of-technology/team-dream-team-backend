const express = require("express");
const router = express.Router();

//imports controller
const dataController = require('../controllers/DataController');
const userController = require('../controllers/UserController');
const bioController = require('../controllers/BioController');
const ivController = require('../controllers/IvController');
const galleryController = require('../controllers/GalleryController');


// regisrer/login routes---------------------------------------------------------
router.get('/', dataController.baseRoute); // shows server runing
router.post('/register', userController.userInfo);
router.post('/', userController.UserLogin);
router.get('/verify/:email/:token', userController.confirmEmail);
// router.post('/resend', dataController.resendTokenPost);
//--------------------------------------------------------------------------------

// router.put('/bio', BioController.updateBio);
router.post('/createbio', bioController.createBio);
router.get('/displaybio/:id', bioController.displayBio);

router.get('/profile', dataController.userProfile);
router.get('/getall', dataController.getPosts);
router.get('/getPost/:id', dataController.getSinglePost);
router.put('/post/:id/update', dataController.updatePost);
router.delete('/:id/delete', dataController.deletePost);

// routes for posting bible verse image and inputs -------------------------------
router.post('/postverse', ivController.imagePost);//post image
router.post('/postimgverse', ivController.PostImgVerse); //post image and bible verse
//--------------------------------------------------------------------------------

//rouets for geting bible verse image and inputs 
router.get('/getimage/:id', ivController.getImagePost)//get image 
router.get('/getverse/:id', ivController.getBibleVersePost); //get bible verse by id

// routes to post inputs from Firebase
router.post('/getinput', galleryController.PostGalleryInput);

// routes to get FireBase Image Urls
router.get('/geturls', galleryController.getImageUrl);
router.get('/getinputwaterfall/:id', galleryController.getGalleryInput);
router.get('/getinputcross/:id', galleryController.getGalleryInput);
router.get('/getinputfreedom/:id', galleryController.getGalleryInput);

router.get('/geturls/:name', galleryController.getImageUrl);


// FOR GALLERY 
router.post('/waterfall', ivController.getBibleVersePost); //get bible verse by id
router.post('/greenmount', ivController.getBibleVersePost); //get bible verse by id

module.exports = router;