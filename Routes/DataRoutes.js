const express = require("express");
const router = express.Router();
const dataController = require('../controllers/DataController');
const userController = require('../controllers/UserController');
const BioController = require('../controllers/BioController');
const galleryController = require('../controllers/GalleryController');

router.get('/', dataController.baseRoute); 
router.post('/register', userController.userInfo);
router.post('/', userController.UserLogin);
router.get('/verify/:email/:token', userController.confirmEmail);

router.get('/profile', dataController.userProfile);
router.get('/getall', dataController.getPosts);
router.get('/getPost/:id', dataController.getSinglePost);
router.get('/geturls/:name', galleryController.getImageUrl);
router.get('/geturls', galleryController.getImageUrl);
router.get('/geturls/:id', galleryController.getImgUrlID);
router.post('/postinput', galleryController.PostGalleryInput);
router.post('/savecomment', galleryController.SaveComment);
router.get('/getall', galleryController.PostAllInputs);
router.post('/createbio', BioController.createBio);
router.get('/displaybio/:id', BioController.displayBio); 
router.get('/displaybios', BioController.displayAllBio); 

module.exports = router;
