const express = require('express');
const session = require('express-session')
const fileUpload = require('express-fileupload');
const router = require('./routers');

const app = express()
const port = 3000
app.use(fileUpload());
app.use(express.static('public'))

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}))
app.use(session({
  secret: 'testing',
  resave: false,
  saveUninitialized: false,
  cookie : {
    secure: false,
    sameSite: true
  }
}))

app.use(router)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})