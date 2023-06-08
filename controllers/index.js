const {User, Profile, Post} = require('../models')

class Controller {
    static landingPage(req, res) {
        res.render('LandingPage')
    }
    
    static Home(req, res) {
    const {userId} = req.session.userInfo
        User.findByPk(userId, {
            include: [Profile]
        })
            .then(user => {
                res.render('Home', {user})
            })
            .catch(err => res.send(err))
    }


    static createPost(req, res) {
        
        Post.create()
    }
 }


module.exports = Controller