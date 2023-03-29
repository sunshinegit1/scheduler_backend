const express = require('express');
const router = express.Router();

const{ 
    getHolidays,
    createHoliday
    
} = require('../controllers/holidays');

router.get('/getHolidays', getHolidays);
router.post('/createHoliday', createHoliday);

module.exports = router ;