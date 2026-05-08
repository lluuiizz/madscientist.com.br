const router = require('express').Router()
const loginController = require('../controllers/loginController')


router.route('/')
    .post(loginController.logIn)

router.route('/check-auth')
    .get(loginController.checkAuth)

module.exports = router
