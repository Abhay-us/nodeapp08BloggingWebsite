const express = require('express');
const userTable = require('../model/usermodel');
const usercontroller = require('../controller/usercontroller');
const router = express.Router();
const postTable = require('../model/postsmodel');
const postcontroller = require('../controller/postcontroller')



// User Routes
router.get('/user/get', usercontroller.getUser);

router.get('/user/getbyid/:id', usercontroller.getUserById);

router.post('/user/post', usercontroller.postUser);

router.put('/user/put/:id', usercontroller.putUser);

router.delete('/user/delete/:id', usercontroller.deleteUser);

router.post('/user/getbyemail', usercontroller.getUserByEmail);

router.put('/user/updatepassword', usercontroller.updatePassword);

router.post('/user/login', usercontroller.loginUser);


module.exports = router;

// posts route
router.get('/post/get', postcontroller.getPost);

router.get('/post/getbyid/:id', postcontroller.getPostById);

router.post('/post/post', postcontroller.postPost);

router.put('/post/put/:id', postcontroller.putPost);

router.delete('/post/delete/:id', postcontroller.deletePost);