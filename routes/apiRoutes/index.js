const express = require ('express'); 
const router = express.Router()

router.use(require('./candidateRoute')); 
router.use(require('./partyRoute')); 

module.exports = router; 