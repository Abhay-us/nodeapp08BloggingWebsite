const express = require('express');
const userTable = require('../model/usermodel');
const usercontroller = require('../controller/usercontroller');
const postTable = require('../model/postsmodel');
const postcontroller = require('../controller/postcontroller')
const authenticationToken = require('../middleware/authMiddleware');

const router = express.Router();


// User Routes

// router.get('/user/get', authenticationToken, usercontroller.getUser);

router.get('/user/getbyid/:id', authenticationToken, usercontroller.getUserById);

router.get('/user/getuseridandname', usercontroller.getUserNameAndId);

router.post('/user/post', authenticationToken, usercontroller.postUser);

router.put('/user/put/:id', authenticationToken, usercontroller.putUser);

router.delete('/user/delete/:id', authenticationToken, usercontroller.deleteUser);

router.post('/user/getbyemail', usercontroller.getUserByEmail);

router.put('/user/updatepassword/:id', usercontroller.updatePassword);

router.post('/user/login', usercontroller.loginUser);



// posts route
router.use('/post', authenticationToken);
router.get('/post/get', postcontroller.getPost);

router.get('/post/getpostwithauthor', postcontroller.getPostWithAuthor);

router.get('/post/getbyid/:id', postcontroller.getPostById);

router.post('/post/post', postcontroller.postPost);

router.put('/post/put/:id', postcontroller.putPost);

router.delete('/post/delete/:id', postcontroller.deletePost);


module.exports = router;
