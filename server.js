const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

//express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//default response for other requests (not found)
app.use((req, res)=> {
        res.status(404).end();
});


//start express server on PORT 3001 
app.listen(PORT, ()=> {
    console.log(`Server is running on Port ${PORT}`)
});