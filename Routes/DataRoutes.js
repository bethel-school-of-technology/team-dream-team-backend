const express = require("express");
const router = express.Router();

//imports controller
const dataController = require('../controllers/DataController');
const userController = require('../controllers/UserController');
const bioController = require('../controllers/BioController');
const ivpostController = require('../controllers/IvpostController');

//connects to routes in controller:
//baseRoute connects to /router
router.get('/', dataController.baseRoute);

//user sign up 
router.post('/register', userController.userInfo);
//user login
router.post('/', userController.UserLogin);
//routes used for token confirmation
router.get('/verify/:email/:token', userController.confirmEmail);
// router.post('/resend', dataController.resendTokenPost);

//userProfile
router.get('/profile', dataController.userProfile);

//read all bible verses
router.get('/getMs', dataController.getPosts);

//read one bible verse
router.get('/getPost/:id', dataController.getSinglePost);

//edit one post
router.put('/post/:id/update', dataController.updatePost);

//delete one post
router.delete('/:id/delete', dataController.deletePost);

//post image
router.post('/postverse', ivpostController.imagePost);
//get image 
router.get('./getimage/:id', ivpostController.getImagePost)
//post bible verse
router.post('/create', ivpostController.createBibleVerse);
//get bible verse
router.get('/getverse/:id', ivpostController.getBibleVersePost);

//router.put('/bio', BioController.updateBio);
router.post('/createbio', bioController.createBio);

module.exports = router;