const express = require('express');
const router = express.Router();

const{ 
    getLogs,
    createLogs,
    updateLogs,
} = require('../controllers/logs');

router.get('/getLogs', getLogs);
router.post('/createLogs', createLogs);
router.patch('/updateLogs/:id', updateLogs);

module.exports = router ;