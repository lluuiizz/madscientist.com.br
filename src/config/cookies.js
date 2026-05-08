const fs = require('fs')

function getCookiesSecret() {
    try {
        return fs.readFileSync('/run/secrets/cookies_secret', 'utf8').trim()
    } catch(err) {
        return 'really_cool_cookie_secret'
    }
}

module.exports = getCookiesSecret
