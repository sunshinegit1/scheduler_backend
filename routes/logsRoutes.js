const express = require('express');
const router = express.Router();

const{ 
    getLogs,
    createLogs,
    updateLogs,
    getLogsByEmpId,
    getLogsBySchId,
    getFilterLogs,
    getLoginDetails,
    getLogoutDetails,
    getLatestLogs,
    getWorkedLogs
} = require('../controllers/logs');

router.get('/getLogs', getLogs);
router.post('/createLogs', createLogs);
router.patch('/updateLogs/:id', updateLogs);
router.get('/getLogsByEmpId/:id', getLogsByEmpId);
router.get('/getLogsBySchId/:id', getLogsBySchId);
router.get('/getLoginDetails',getLoginDetails);
router.get('/getLogoutDetails',getLogoutDetails);
router.post('/getFilterLogs',getFilterLogs);
router.get('/getLatestLogs',getLatestLogs);
router.get('/getWorkedLogs',getWorkedLogs)

module.exports = router ;