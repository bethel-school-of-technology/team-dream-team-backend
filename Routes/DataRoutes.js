const express = require("express");
const router = express.Router();

//imports controller
const dataController = require('../controllers/DataController');

//connects to routes in controller:
//baseRoute connects to /router
//getData connects to getData router
router.get('/', dataController.baseRoute);

// post user info frm sign-up
router.post('/register', dataController.userInfo);

//login
router.post('/login', dataController.UserLogin);

//userProfile
router.get('/profile', dataController.userProfile);

//create
router.post('/create', dataController.createPost);

//read all posts
router.get('/getPosts', dataController.getPosts);

//read one post
router.get('/getPost/:id', dataController.getSinglePost);

//edit one post
router.put('/post/:id/update', dataController.updatePost);

//delete one post
router.delete('/:id/delete', dataController.deletePost);

module.exports = router;