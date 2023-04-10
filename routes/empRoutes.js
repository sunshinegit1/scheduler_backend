const express = require('express');
const router = express.Router();

const{ 
    getEmployees,
    createEmployee,
    updateEmployee,
    createEmployeeBYassgn
} = require('../controllers/employee');

router.get('/getEmployees', getEmployees);
router.post('/createEmployee', createEmployeeBYassgn);
router.patch('/updateEmployee/:id', updateEmployee);
// router.post('/createEmployeeBYassgn',createEmployeeBYassgn);

module.exports = router ;