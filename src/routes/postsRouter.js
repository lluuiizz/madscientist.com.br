const express = require('express')
const postsRouter = express.Router()
const postsController = require('../controllers/postsController')

postsRouter.route('/')
    .get(postsController.getPosts)
    .post(postsController.publishPost)

postsRouter.route('/:slug')
    .get(postsController.getSpecificPost)
    .patch(postsController.updatePost)
    .delete(postsController.deletePost)

module.exports = postsRouter

