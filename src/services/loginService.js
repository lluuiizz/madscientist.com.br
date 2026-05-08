const pool = require('../config/db')
const bcrypt = require('bcrypt')

async function login(credentials) {
    const client = await pool.connect()

    try {
        const query = {
            text: 'SELECT * FROM users WHERE username = $1',
            values: [credentials.user]
        }
        
        const response = await client.query(query)

        if (response.rows.length == 0) {
            throw new Error("User was not found!")
        }
        const db_pass = response.rows[0].pass

        const match = await bcrypt.compare(credentials.pass, db_pass)

        if (!match)
            throw new Error("Password didn't match!")

        return {success : true}
    } catch(err) {
        throw err

    } finally {
        client.release()
    }

}

module.exports = {login}
