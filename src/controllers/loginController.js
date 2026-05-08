const loginService = require('../services/loginService')

exports.logIn = async (req, res) => {
    console.log("Trying to login into the system!\n")
    try {
        const credentials_data = req.body
        const response = await loginService.login(credentials_data)
        if (response.success) {
            req.session.isLoggedIn = true
            return res.sendStatus(200)
        }
    }
    catch (err) {
        res.status(401).send("Access Denied!")
    }
}
exports.checkAuth = async (req, res) => {
    console.log("Verificando o cookie!")
    if (req.session.isLoggedIn == true){
        console.log("SIM TEM O COOKIE!!!")
        return res.sendStatus(200)

    }

    return res.sendStatus(401)
}
