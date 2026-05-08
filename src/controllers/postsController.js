const postsService = require('../services/postsService')

exports.getPosts = async (req, res) => {
    console.log("Trying to get Posts...")
    try {
        const data = await postsService.getPosts()
        return res.status(200).json(data)
    } catch (err) {
        return res.sendStatus(404)
    }

}

exports.publishPost = async (req, res) => {
    try {
        await postsService.publishPost(req.body)
        res.sendStatus(201)
    } catch (err) {
        res.sendStatus(404)
    }
}

exports.getSpecificPost = async (req, res) => {
    try {
        const data = await postsService.getSpecificPost(req.params.slug)
        res.status(200).json(data)
    } catch (err) {
        res.sendStatus(404)
    }
}

exports.updatePost = async (req, res) => {
    try {
        await postsService.updatePost(req.params.slug, req.body)
        res.sendStatus(200)
    } catch (err) {
        res.sendStatus(404)
    }
}

exports.deletePost = async (req, res) => {
    try {
        await postsService.deletePost(req.params.slug)
        res.sendStatus(200)
    } catch (err) {
        res.sendStatus(404)
    }
}

