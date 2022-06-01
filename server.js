const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const mysql = require ("mysql2");

//express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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


//default response for other requests (not found)
app.use((req, res)=> {
        res.status(404).end();
});


//start express server on PORT 3001 
app.listen(PORT, ()=> {
    console.log(`Server is running on PORT ${PORT}`)
});