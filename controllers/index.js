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


    static createPost(req, res, next) {
        console.log(req.files)
        const {userId} = req.session.userInfo
        const {content} = req.body
        Post.create({
            content,
            UserId: userId
        })
        .then(newPost => {
                if(req.files && req.files.imageUrl) {
                let sampleFile;
                let uploadPath;
                sampleFile = req.files.imageUrl;
                let format = sampleFile.mimetype.split('/')[1]
                uploadPath =  `./public/uploads/${newPost.id}.${format}`
                let url = `http://localhost:3000/uploads/${newPost.id}.${format}`
                newPost.set('imageUrl', url)
                newPost.save()
                sampleFile.mv(uploadPath, function(err) {
                if (err)
                    return res.status(500).send(err);
                res.redirect(`/home/${req.session.userInfo.username}`)
            })}
        })
        .catch(err => {
            res.send(err)
        })
    }

    static userProfile(req, res) {
        const {userId, role, username} =req.session.userInfo
        User.findByPk(userId, {
            include: [Profile]
        })
        .then(user => {
            res.render('UserProfile', {user})
        })
    }

    static updateProfile(req, res) {
        let profile;
        const {userId} = req.session.userInfo
        const {fullName, phone, userAddress} = req.body
        Profile.findByPk(userId)
        .then(result => {
            profile = result
            return result.update({fullName, phone, userAddress})
        })
        .then(updatedProfile => {
            if(req.files && req.files.imageUrl) {
            let sampleFile;
            let uploadPath;
            sampleFile = req.files.imageUrl;
            let format = sampleFile.mimetype.split('/')[1]
            uploadPath =  `./public/profileImg/${updatedProfile.id}.${format}`
            let url = `http://localhost:3000/profileImg/${updatedProfile.id}.${format}`
            updatedProfile.set('imageUrl', url)
            updatedProfile.save()
            sampleFile.mv(uploadPath, function(err) {
            if (err)
                return res.status(500).send(err);
            })}
            res.redirect(`/home/${req.session.userInfo.username}/profile`)
        })
        .catch(err => res.send(err))
    }
 }


module.exports = Controller