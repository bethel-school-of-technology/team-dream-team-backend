const express = require("express");
const router = express.Router();

//imports controller
const dataController = require('../controllers/DataController');
const userController = require('../controllers/UserController');
const BioController = require('../controllers/BioController');
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
router.get('/profile', dataController.userProfile);
router.get('/getall', dataController.getPosts);
router.get('/getPost/:id', dataController.getSinglePost);
router.put('/post/:id/update', dataController.updatePost);
router.delete('/:id/delete', dataController.deletePost);

// routes for posting bible verse image and inputs -------------------------------
router.post('/postverse', ivController.imagePost);//post image
router.post('/postimgverse', ivController.PostImgVerse); //post image and bible verse

//rouets for geting bible verse image and inputs 
router.get('/getimage/:id', ivController.getImagePost)//get image 
router.get('/getverse/:id', ivController.getBibleVersePost); //get bible verse by id
//--------------------------------------------------------------------------------


// FOR GALLERY 
router.get('/geturls/:name', galleryController.getImageUrl);
router.get('/geturls', galleryController.getImageUrl);
router.get('/geturls/:id', galleryController.getImgUrlID);
router.post('/postinput', galleryController.PostGalleryInput);
router.get('/getall', galleryController.PostAllInputs);


//For profile 
router.post('/createbio', BioController.createBio);
router.get('/displaybio/:id', BioController.displayBio); //get bible verse by id
router.get('/displaybios', BioController.displayAllBio); //get bible verse by id

module.exports = router;
