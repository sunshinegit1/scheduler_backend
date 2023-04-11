const express = require('express');
const router = express.Router();

const{ 
    getJobs,
    createJob,
    updateJob,
    createJobByAssign,
} = require('../controllers/jobs');

router.get('/getJobs', getJobs);
router.post('/createJob', createJobByAssign);
router.patch('/updateJob/:id', updateJob);
// router.post('/createJobByAssign',createJobByAssign)

module.exports = router ;