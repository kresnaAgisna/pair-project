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
                if(req.files && req.files.ImageUrl) {
                let sampleFile;
                let uploadPath;
                sampleFile = req.files.ImageUrl;
                let format = sampleFile.mimetype.split('/')[1]
                uploadPath =  `./public/uploads/${newPost.id}.${format}`
                let url = `http://localhost:3000/uploads/${newPost.id}.${format}`
                newPost.set('ImageUrl', url)
                newPost.save()
                sampleFile.mv(uploadPath, function(err) {
                if (err)
                    return res.status(500).send(err);
                res.redirect('Home')
            });
        }
        })
        .catch(err => {
            res.send(err)
        })
        
    }
 }


module.exports = Controller