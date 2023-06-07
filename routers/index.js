const express = require('express');
const Controller = require('../controllers');
const userRouters = require('./userRouters')
const router = express.Router()


router.get('/', Controller.landingPage )
router.use('/user', userRouters)




module.exports = router;