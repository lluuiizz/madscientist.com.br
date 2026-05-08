const isLogged = (req, res) => {
    if (!req.session.isLoggedIn)
        return res.status(400).send("You need to be logged in to do this!")

    next()
}

module.exports = isLogged 
