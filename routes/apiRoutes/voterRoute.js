const express = require ('express'); 
const router = express.Router(); 
const db = require('../../db/connection'); 
const inputCheck = require('../../utils/inputCheck'); 

router.get('/voters', (req, res)=>{
    const sql = `SELECT * FROM voters ORDER BY last_name`; 

    db.query(sql, (err, rows)=>{
        if (err){
            res.status(500).json( {error: err.message});
        }
        res.json({
            message: 'success', 
            data: rows,
        })
    })
})

router.get('/voters/:id', (req, res)=> {
    const sql = `SELECT * FROM voters WHERE id = ?`
    const params = [req.params.id]; 

    db.query(sql, params, (err, rows)=> {
        if (err){
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success', 
            data: rows
        })
    })
})

router.post('/voters', ({ body }, res)=> {
    const sql = `INSERT INTO voters (first_name, last_name, email)
                VALUES (?, ?, ?)`; 
    //data validation
    const errors = inputCheck(body, 'first_name', 'last_name', 'email');
    if (errors){
        res.status(400).json({ error: errors });
        return;
    }
    const params = [body.first_name, body.last_name, body.email]; 

    db.query(sql, params, (err, result)=> {
        if (err){
            res.status(400).json({ error: err.message}); 
            return; 
        }
    res.json({
        message: 'success', 
        data: body
    }) 
    })
})

router.put('/voters/:id', (req, res)=> {
    //data validation
    const errors = inputCheck(req.body, 'email');
    if (errors){
        res.status(400).json({ error: errors });
        return;
    }

    const sql = `UPDATE voters SET email = ? WHERE id = ?`; 
    const params = [req.body.email, req.params.id]; 

    db.query(sql, params, (err, result) => {
        if (err){
            res.status(400).json({ error: err.message })
        } else if (!result.affectedRows){
            res.json({
                message: 'voter not found'
            })
        } else {
            res.json({
                message: 'success', 
                data: req.body, 
                changes: result.affectedRows 
            })
        }
    })
})

router.delete('/voters/:id', (req, res)=> {
    const sql = `DELETE FROM voters WHERE id=?`;
    // const params = req.params.id
    db.query(sql, req.params.id, (err, result)=> {
        if (err){
            res.status(400).json({ error: res.message }); 
        } else if (!result.affectedRows){
            res.json({
                message: 'Voter not found'
            });
        } else {
            res.json({
                message: 'DELETED', 
                changes: result.affectedRows, 
                id: req.params.id
            })
        }
    })
})

module.exports = router; 