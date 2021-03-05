const express = require("express");
const router = express.Router();

//imports controller
const dataController = require('../controllers/DataController');
const userController = require('../controllers/UserController');
const bioController = require('../controllers/BioController');
const ivpostController = require('../controllers/IvpostController');


// regisrer/login routes---------------------------------------------------------
router.get('/', dataController.baseRoute); // shows server runing
router.post('/register', userController.userInfo);
router.post('/', userController.UserLogin);
router.get('/verify/:email/:token', userController.confirmEmail);
// router.post('/resend', dataController.resendTokenPost);
//--------------------------------------------------------------------------------

// router.put('/bio', BioController.updateBio);
router.post('/createbio', bioController.createBio);

router.get('/profile', dataController.userProfile);
router.get('/getall', dataController.getPosts);
router.get('/getPost/:id', dataController.getSinglePost);
router.put('/post/:id/update', dataController.updatePost);
router.delete('/:id/delete', dataController.deletePost);

// routes for posting bible verse image and inputs -------------------------------
router.post('/postverse', ivpostController.imagePost);//post image
router.post('/createpostverse', ivpostController.createBibleVerse); //post bible verse
//--------------------------------------------------------------------------------

//rouets for geting bible verse image and inputs 
router.get('/getimage/:id', ivpostController.getImagePost)//get image 
router.get('/getverse/:id', ivpostController.getBibleVersePost); //get bible verse by id


// FOR GALLERY 
router.post('/waterfall', ivpostController.getImagePost); //get gallery post from imga.js
router.post('/greenmount', ivpostController.createGalleryVerse); //get gallery post from imgb.js

module.exports = router;