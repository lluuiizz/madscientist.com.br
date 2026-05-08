const express = require('express')
const postsRouter = require('./routes/postsRouter')

const app = express()

app.use(express.json( {limit: '50mb'} ))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

app.use('/posts', postsRouter)

module.exports = app
