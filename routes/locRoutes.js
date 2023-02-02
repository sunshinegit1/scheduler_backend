const express = require('express');
const router = express.Router();

const{ 
    getLocations,
    createLocation,
    updateLocation,
} = require('../controllers/location');

router.get('/getLocations', getLocations);
router.post('/createLocation', createLocation);
router.patch('/updateLocation/:id', updateLocation);

module.exports = router ;