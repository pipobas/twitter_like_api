
const express = require('express');
const cors = require('cors'); 
const app = express();

const userRoutes = require('../src/routes/userRoutes.js');
const tweetRoutes = require('../src/routes/tweetRoutes.js');
const errorHandler = require('./middleware/errorHandler');
app.use(express.json());


app.use(cors());
app.use(express.json());

app.use('/user', userRoutes);
app.use('/tweet', tweetRoutes);
app.use(errorHandler);

module.exports = app;