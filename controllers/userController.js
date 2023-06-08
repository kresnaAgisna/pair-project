const { ValidationError } = require('sequelize')
const {User, Profile} = require('../models')
const bcrypt = require('bcryptjs') 

class UserController {
    static registrationForm(req, res) {
        const error = req.query.error
        res.render('RegistrationForm', {error})
    }
    
    static registerUser(req, res) {
        const {email, password, role} = req.body

        Profile.create({
            username: email
        })
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
                res.send(err)
            })
    }

    static loginPage(req, res) {
        const error = req.query.error
        const email = req.query.email
        res.render('LoginPage', {email, error})
    }

    static successLogin(req, res) {
        const {email, password} = req.body
        User.findOne({
            where : {
                email
            }
        })
        .then(user => {
            if(user) {
                const correctPassword = bcrypt.compareSync(password, user.password)
                if(correctPassword) {
                    req.session.userInfo = {userId : user.id, role : user.role}
                    return user.role === 'admin' ?  res.redirect(`/home/admin`) : res.redirect(`/home/${user.role}${user.id}`) 
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