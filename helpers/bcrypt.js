const bcrypt = require('bcryptjs')



function hashing(password) {
    return  bcrypt.hashSync(password, 10)
}

function compare(password, hashedPass) {
    return  bcrypt.compareSync(password, hashedPass)
}


module.exports = {hashing, compare}