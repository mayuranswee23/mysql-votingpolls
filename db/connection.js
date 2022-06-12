const mysql = require('mysql2'); 

//connect to a database
const db = mysql.createConnection(
    {
        host: 'localhost', 
        //mySQL username, 
        user: 'root', 
        //mysql password
        password: 'CoderBootcamp1!', 
        database: 'election'
    }, 
    console.log('Connected to the Election Database')
)

module.exports = db; 