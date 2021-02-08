const express = require("express");
const router = express.Router();

//imports controller
const dataTestController = require('../Controllers/TestDataController');

//connects to routes in controller:
//baseRoute connects to /router
//getData connects to getData router
router.get('/', dataTestController.baseRoute);

// post user info frm sign-up
router.post('/register', dataTestController.userInfo);

//create
router.post('/create', dataTestController.createPost);

//read all posts
router.get('/getPosts', dataTestController.getPosts);

//read one post
router.get('/getPost/:id', dataTestController.getSinglePost);

module.exports = router;