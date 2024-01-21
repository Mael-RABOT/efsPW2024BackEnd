const mysql = require("mysql2")

const connection = mysql.createConnection({
    host: process.env.DB_HOSTNAME,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD
})

connection.connect(function (err) {
    if (err) {
        console.log(`Error connecting: ${err.stack}`)
        throw new Error()
    } console.log(`Connected as ${connection.threadId}`)
})

module.exports = connection
