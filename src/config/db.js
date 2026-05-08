const { Pool } = require('pg')
const fs = require('fs')

function getDatabasePassword() {
    try {
        return fs.readFileSync('/run/secrets/db_password', 'utf8').trim()
    } catch(err) {
        return process.env.DB_PASSWORD || 'dev_password'
    }
}

const pool = new Pool({
    host: process.env.DB_HOST || 'db',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'madscientist_database',
    user: process.env.DB_USER || 'dev_admin',
    password: getDatabasePassword(),
})


module.exports = pool

