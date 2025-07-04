
const express = require('express');
const app = express();
const userRoutes = require('../src/routes/userRoutes.js');
const tweetRoutes = require('../src/routes/tweetRoutes.js');
const errorHandler = require('./middleware/errorHandler');
app.use(express.json());



app.use(express.json());
app.use('/user', userRoutes);
app.use('/tweet', tweetRoutes);
app.use(errorHandler);

// Export the app to be used by the server
module.exports = app;