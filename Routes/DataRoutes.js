const express = require("express");
const router = express.Router();

//imports controller
const dataController = require('../Controllers/DataController');

//connects to routes in controller:
//baseRoute connects to /router
//getData connects to getData router
router.get('/', dataController.baseRoute);

// post user info frm sign-up
router.post('/register', dataController.userInfo);

//create
router.post('/create', dataController.createPost);

//read all posts
router.get('/getPosts', dataController.getPosts);

//read one post
router.get('/getPost/:id', dataController.getSinglePost);

module.exports = router;