const express = require("express");
const router = express.Router();

//imports controller
const dataController = require('../controllers/DataController');
const userController = require('../controllers/UserController');

//connects to routes in controller:
//baseRoute connects to /router
router.get('/', dataController.baseRoute);

//user sign up 
router.post('/register', userController.userInfo);

//user login
router.post('/login', userController.UserLogin);

//userProfile
router.get('/profile', dataController.userProfile);

//create bible verse
router.post('/create', dataController.createPost);

//read all bible verses
router.get('/getPosts', dataController.getPosts);

//read one bible verse
router.get('/getPost/:id', dataController.getSinglePost);

//edit one post
router.put('/post/:id/update', dataController.updatePost);

//delete one post
router.delete('/:id/delete', dataController.deletePost);

//routes used for token confirmation
router.get('/verify/:email/:token', userController.confirmEmail);
// router.post('/resend', dataController.resendTokenPost);

//image upload
router.post('/postverse', dataController.imagePost)

module.exports = router;