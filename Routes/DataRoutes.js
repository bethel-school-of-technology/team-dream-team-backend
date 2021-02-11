const express = require("express");
const router = express.Router();

//imports controller
const dataController = require('../controllers/DataController');

//connects to routes in controller:
//baseRoute connects to /router
router.get('/', dataController.baseRoute);

//user sign up 
router.post('/register', dataController.userInfo);

//user login
router.post('/login', dataController.UserLogin);

//userProfile
router.get('/profile', dataController.userProfile);

//create bible verse
router.post('/create', dataController.createPost);

//read all bible verses
router.get('/getPosts', dataController.getPosts);

//read one bible verse
router.get('/getPost/:id', dataController.getSinglePost);

module.exports = router;