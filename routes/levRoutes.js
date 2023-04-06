const express = require('express');


const { createLeave, updateLeave, getLeaves } = require('../controllers/leaves');

const router = express.Router();


router.get('/getLeaves',getLeaves);
router.post('/createLeave',createLeave);
router.patch('/updateLeave',updateLeave);



module.exports=router;