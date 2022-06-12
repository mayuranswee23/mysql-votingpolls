const express = require ('express'); 
const router = express.Router()

router.use(require('./candidateRoute')); 
router.use(require('./partyRoute')); 
router.use(require('./voterRoute'));
router.use(require('./voteRoute'));

module.exports = router; 