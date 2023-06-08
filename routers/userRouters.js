const express = require('express');
const UserController = require('../controllers/userController');
const router = express.Router()

router.use((req, res, next) => {
    if(req.session.userInfo) {
        let {role, username} = req.session.userInfo
       role === 'admin' ?  res.redirect(`/home/admin`) : res.redirect(`/home/${username}`) 
    } else {
        next()
    }
})

router.get('/register', UserController.registrationForm)
router.post('/register', UserController.registerUser)
router.get('/login', UserController.loginPage)
router.post('/login', UserController.successLogin)






module.exports = router;