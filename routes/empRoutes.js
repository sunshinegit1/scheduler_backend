const express = require('express');
const router = express.Router();

const{ 
    getEmployees,
    createEmployee,
    updateEmployee,
} = require('../controllers/employee');

router.get('/getEmployees', getEmployees);
router.post('/createEmployee', createEmployee);
router.patch('/updateEmployee/:id', updateEmployee);

module.exports = router ;