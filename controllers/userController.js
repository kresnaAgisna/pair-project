const { ValidationError } = require('sequelize')
const {User} = require('../models')
const bcrypt = require('bcryptjs') 

class UserController {
    static registrationForm(req, res) {
        const error = req.query.error
        res.render('RegistrationForm', {error})
    }
    
    static registerUser(req, res) {
        const {email, password, role} = req.body
        User.create({email, password, role})
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
                correctPassword ? res.redirect('/home') : res.redirect(`/user/login?error=Invalid username/passord`)
            } else {
                res.redirect(`/user/login?error=Invalid username/passord`)
            }
        })
        .catch(err => {
            res.send(err)
        })

    }

}



module.exports = UserController;