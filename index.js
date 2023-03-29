const express = require('express');
const cors = require('cors');
const connection = require('./config/connection');

const empRoutes = require('./routes/empRoutes');
const locRoutes = require('./routes/locRoutes');
const schRoutes = require('./routes/schRoutes');
const logsRoutes = require('./routes/logsRoutes');
const holRoutes = require('./routes/holRoutes');


const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//table Routes
app.use('/emp', empRoutes);
app.use('/loc', locRoutes);
app.use('/sch', schRoutes);
app.use('/logs', logsRoutes);
app.use('/hol', holRoutes);


module.exports = app;

// const req = require('express/lib/request');
