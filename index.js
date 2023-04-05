const express = require('express');
const cors = require('cors');
const connection = require('./config/connection');

const empRoutes = require('./routes/empRoutes');
const jobRoutes = require('./routes/jobRoutes');
const schRoutes = require('./routes/schRoutes');
const logsRoutes = require('./routes/logsRoutes');
const holRoutes = require('./routes/holRoutes');
const asgnRoutes = require('./routes/asgnRoutes');
const setRoutes=require('./routes/setRoutes');

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//table Routes
app.use('/emp', empRoutes);
app.use('/job', jobRoutes);
app.use('/sch', schRoutes);
app.use('/logs', logsRoutes);
app.use('/hol', holRoutes);
app.use('/asgn',asgnRoutes);
app.use('/set',setRoutes);


module.exports = app;


