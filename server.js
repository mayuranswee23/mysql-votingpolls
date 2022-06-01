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

//return all data in the candidates table
// db.query(`SELECT * FROM candidates`, (err, rows)=> {
//     console.log(rows)
// });

//GET a single candidate
db.query(`SELECT * FROM candidates WHERE id=1`, (err, row) => {
    if (err){
        console.log(err);
    }
    console.log(row);
})

//delete a candidate
// db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result)=>
// {
//     if (err){
//         console.log(err)
//     }
//     console.log(result);
// });

//create a candidate
const sql = `INSERT INTO candidates (id, first_name, last_name, industry_related)
VALUES(?,?,?,?)`;
const params = [1, 'Ronald', 'Firbank', 1];

db.query(sql, params, (err, result)=> {
    if (err){
        console.log(err);
    }
    console.log(result)
});

//default response for other requests (not found)
app.use((req, res)=> {
        res.status(404).end();
});


//start express server on PORT 3001 
app.listen(PORT, ()=> {
    console.log(`Server is running on PORT ${PORT}`)
});