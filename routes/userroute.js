const express = require('express');
const userTable = require('../model/usermodel');
const usercontroller = require('../controller/usercontroller');
const router = express.Router();



// User Routes
router.get('/user/get', usercontroller.getUser);
router.get('/user/getbyid/:id', usercontroller.getUserById);
router.post('/user/post', usercontroller.postUser);
router.put('/user/put/:id', usercontroller.putUser);
router.delete('/user/delete/:id', usercontroller.deleteUser);

module.exports = router;