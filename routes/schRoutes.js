const express = require('express');
const router = express.Router();

const{ 
    getSchedules,
    createSchedule,
    updateSchedule,
    getSchedulesByEmpId,
    getTimelines
} = require('../controllers/schedule');

router.get('/getSchedules', getSchedules);
router.post('/createSchedule', createSchedule);
router.patch('/updateSchedule/:id', updateSchedule);
router.get('/getSchedulesByEmpId/:id', getSchedulesByEmpId);
router.get('/getTimelines', getTimelines);

module.exports = router ;