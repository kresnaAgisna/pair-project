const express = require('express');
const UserController = require('../controllers/userController');
const router = express.Router()


router.get('/register', UserController.registrationForm)
router.post('/register', UserController.registerUser)
router.get('/login', UserController.loginPage)
router.post('/login', UserController.successLogin)





module.exports = router;