const express = require('express')
const postsRouter = express.Router()
const postsController = require('../controllers/postsController')
const isLogged = require('../middleware/isLogged')

postsRouter.route('/')
    .get(postsController.getPosts)
    .post(isLogged, postsController.publishPost)

postsRouter.route('/:slug')
    .get(postsController.getSpecificPost)
    .patch(postsController.updatePost)
    .delete(postsController.deletePost)

module.exports = postsRouter

