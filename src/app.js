const express = require('express')
const session = require('express-session')
const postsRouter = require('./routes/postsRouter')
const loginRouter = require('./routes/loginRouter')
const sessionSecret = require('./config/cookies')()

const app = express()
app.use (session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24
    }
}))
app.use(express.json( {limit: '50mb'} ))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

app.set('trust proxy', 1); 
app.use('/posts', postsRouter)
app.use('/login', loginRouter)

module.exports = app
