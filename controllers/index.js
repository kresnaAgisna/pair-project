const {User, Profile, Post} = require('../models')

class Controller {
    static landingPage(req, res) {
        res.render('LandingPage')
    }
    
    static Home(req, res) {
    let user;
    const {userId} = req.session.userInfo
        User.findByPk(userId, {
            include: [Profile]
        })
            .then(result => {
                user = result
                return Post.findAll({
                    include:[{
                        model : User,
                        include: [Profile]
                    }]
                })
            })
            .then(posts => {
                // res.send(posts)
                res.render('Home', {user, posts})
            })
            .catch(err => res.send(err))
    }


    static createPost(req, res) {
        const {userId} = req.session.userInfo
        const {content} = req.body
        
        Post.create({
            content,
            UserId: userId
        })
        .then(newPost => {
            res.redirect('Home')
        })
        .catch(err => {
            res.send(err)
        })
        
    }
 }


module.exports = Controller