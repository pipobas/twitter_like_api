
const express = require('express');
const app = express();
const userRoutes = require('../src/routes/userRoutes.js');
app.use(express.json());



app.use(express.json());
app.use('/user', userRoutes);

// Export the app to be used by the server
module.exports = app;