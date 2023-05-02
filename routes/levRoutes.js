const express = require('express');


const { createLeave, updateLeave, getLeaves, getLeavesByEmpId } = require('../controllers/leaves');

const router = express.Router();


router.get('/getLeaves',getLeaves);
router.post('/createLeave',createLeave);
router.patch('/updateLeave',updateLeave);
router.post('/getLeavesByEmpId',getLeavesByEmpId);



module.exports=router;