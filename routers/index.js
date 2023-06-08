const express = require('express');
const Controller = require('../controllers');
const userRouters = require('./userRouters');
const { Session } = require('express-session');
const router = express.Router()

const isAdmin = (req, res, next) => {
    if(req.session.userInfo.role !== 'admin') {
        res.send('Eiitttttttttsssssssssssssss coba-coba lu ye ')
    } else {
        next()
    }
}

const isUser = (req, res, next) => {
    if(req.session.userInfo.role === 'admin') {
        res.send('Hayo MAU NGAPAIN LU HAH?')
    } else {
        next()
    }
}

router.get('/', Controller.landingPage )
router.use('/user', userRouters)

router.use((req, res, next) => {
    if(!req.session.userInfo) {
        res.redirect('/user/login')
    } else {
        next()
    }
})



router.get('/home/admin', isAdmin, Controller.adminPage)
router.get('/home/delete/:postId', isAdmin, Controller.destroyById)
router.get('/home/:username', isUser, Controller.Home) 
router.post('/home/:username', isUser, Controller.createPost) 
router.get('/home/:username/profile', isUser, Controller.userProfile) 
router.post('/home/:username/profile', isUser, Controller.updateProfile) 
router.get('/home/:username/logout', Controller.userLogout) 




module.exports = router;