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




module.exports = router;