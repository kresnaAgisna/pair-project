const express = require('express');
const Controller = require('../controllers');
const userRouters = require('./userRouters');
const { Session } = require('express-session');
const router = express.Router()


router.get('/', Controller.landingPage )
router.use('/user', userRouters)

router.use((req, res, next) => {
    if(!req.session.userInfo) {
        res.redirect('/user/login')
    } else {
        next()
    }
})
router.get('/home/admin')
router.get('/home/:username', Controller.Home) 
router.post('/home/:username', Controller.createPost) 
router.get('/home/:username/profile', Controller.userProfile) 
router.post('/home/:username/profile', Controller.updateProfile) 




module.exports = router;