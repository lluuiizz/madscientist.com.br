const validate = (scheme) => (req, res, next) => {
    const result = scheme.safeParse(req.body)

    if (!result.success) {
        return res.status(400).json({error: result.error.errors})
    }

    req.body = result.data
    next()
}

module.exports = validate
