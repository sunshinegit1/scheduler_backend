const express = require('express');
const router = express.Router();

const{ 
    updateAssignment,
    getAssignmentsByEmp,
} = require('../controllers/assignment');

router.post('/getAssignmentByEmp', getAssignmentsByEmp);
router.patch('/updateAssignment', updateAssignment);


module.exports = router ;