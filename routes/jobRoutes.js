const express = require('express');
const router = express.Router();

const{ 
    getJobs,
    createJob,
    updateJob,
} = require('../controllers/jobs');

router.get('/getJobs', getJobs);
router.post('/createJob', createJob);
router.patch('/updateJob/:id', updateJob);

module.exports = router ;