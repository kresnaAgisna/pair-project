const { ValidationError } = require('sequelize')
const {User, Profile} = require('../models')
const {compare} = require('../helpers/bcrypt') 

class UserController {
    static registrationForm(req, res) {
        let username;
        if(req.session.userInfo) {
            username = req.session.userInfo.username
        }
        const error = req.query.error
        res.render('RegistrationForm', {error, username})
    }
    
    static registerUser(req, res) {
        const {email, password, role} = req.body

            Profile.profileInit(email)
            .then(profile => {
                return  User.create({email, password, role, ProfileId : profile.id})
            })
            .then(newUser => {
               res.redirect(`/user/login?email=${newUser.email}`)
            })
            .catch(err => {
                if(err instanceof ValidationError) {
                    if(err.name === 'SequelizeValidationError') {
                        const showError = err.errors.map(e => {
                            return e.message
                        })
                        return res.redirect(`/user/register?error=${showError}`)
                    } else {
                        return res.redirect(`/user/register?error=Email sudah terdaftar`)
                    }
                }
                console.log(err)
                res.send(err)
            })
    }

    static loginPage(req, res) {
        let username;
        if(req.session.userInfo) {
            username = req.session.userInfo.username
        }
        const error = req.query.error
        const email = req.query.email
        res.render('LoginPage', {email, error, username})
    }

    static successLogin(req, res) {
        const {email, password} = req.body
        User.findOne({
            include:[Profile],
            where : {
                email
            }
        })
        .then(user => {
            if(user) {
                const correctPassword = compare(password, user.password)
                if(correctPassword) {
                    req.session.userInfo = {userId : user.id, role : user.role, username: user.Profile.username}
                    return user.role === 'admin' ?  res.redirect(`/home/admin`) : res.redirect(`/home/${user.Profile.username}`) 
                }
               return res.redirect(`/user/login?error=Invalid username/passord`)
            } else {
               return res.redirect(`/user/login?error=Invalid username/passord`)
            }
        })
        .catch(err => {
            res.send(err)
        })
    }
}



module.exports = UserController;