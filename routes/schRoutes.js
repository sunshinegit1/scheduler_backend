const express = require('express');
const router = express.Router();

const{ 
    getSchedules,
    createSchedule,
    updateSchedule,
} = require('../controllers/schedule');

router.get('/getSchedules', getSchedules);
router.post('/createSchedule', createSchedule);
router.patch('/updateSchedule/:id', updateSchedule);

module.exports = router ;