const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const mysql = require ("mysql2");
const inputCheck = require ('./utils/inputCheck');

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

//return all data in the candidates table without express
// db.query(`SELECT * FROM candidates`, (err, rows)=> {
//     console.log(rows)
// });

//return all data in candidates table with Express route
app.get('/api/candidates', (req, res)=>{
    const sql = `SELECT * FROM candidates`; 

    db.query(sql, (err, rows)=> {
        if (err){
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'SUCCESS', 
            data: rows
        });
    });
});

//GET a single candidate without Express routes
// db.query(`SELECT * FROM candidates WHERE id=1`, (err, row) => {
//     if (err){
//         console.log(err);
//     }
//     console.log(row);
// })

//Get a single candidate with Express routes
app.get('/api/candidate/:id', (req, res)=>{
    const sql = `SELECT * FROM candidates WHERE id =?`;
    const params = [req.params.id]; 

    db.query(sql, params, (err, row)=> {
        if (err){
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success', 
            data: row
        });
    });
});

//delete a candidate with Express
// db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result)=>
// {
//     if (err){
//         console.log(err)
//     }
//     console.log(result);
// });

//delete a candidate with Express route

app.delete('/api/candidate/:id', (req, res)=> {
    const sql = `DELETE FROM candidates WHERE id = ?`;
    const params = [req.params.id];

    db.query (sql, params, (err, result)=> {
        if (err){
            res.statusMessage(400).json({ error: res.message });
        } else if (!result.affectedRows) {
            res.json({
                message: 'Candidate not found'
            }); 
        } else {
            res.json ({
                message: 'deleted', 
                changes: result.affectedRows, 
                id: req.params.id
            });
        }
    });
});

//create a candidate without Express
// const sql = `INSERT INTO candidates (id, first_name, last_name, industry_related)
// VALUES(?,?,?,?)`;
// const params = [1, 'Ronald', 'Firbank', 1];

// db.query(sql, params, (err, result)=> {
//     if (err){
//         console.log(err);
//     }
//     console.log(result)
// });

//create a candidate with Express routes
app.post('/api/candidate', ({body}, res)=> {
    const err = inputCheck(body, 'first_name', 'last_name', 'industry_related');
    if (err){
        res.status(400).json({error: err})
        return;
    }
    const sql = `INSERT INTO candidates (first_name, last_name, industry_related)
                 VALUES (?,?,?)`;
    const params = [body.first_name, body.last_name, body.industry_related];

    db.query(sql, params, (err, result)=> {
        if (err){
            res.status(400).json({error: err.message });
            return;
        }
        res.json({
            message: 'success', 
            data: body
        });
    });
});

//default response for other requests (not found)
app.use((req, res)=> {
        res.status(404).end();
});

//start express server on PORT 3001 
app.listen(PORT, ()=> {
    console.log(`Server is running on PORT ${PORT}`)
});