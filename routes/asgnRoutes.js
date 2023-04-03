const express = require('express');
const router = express.Router();

const{ 
    updateAssignment,
    getAssignmentsByEmp,
} = require('../controllers/assignment');

router.post('/getAssignmentByEmp', getAssignmentsByEmp);
router.post('/updateAssignment', updateAssignment);


module.exports = router ;