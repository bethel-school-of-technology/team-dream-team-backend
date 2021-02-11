// file includes all app level config, middleware, and supporting libraries

const express = require("express"); //import express
const app = express(); //initalise app with express

const bodyParser = require('body-parser');

const routes = require('./routes/DataRoutes');

// body parsers
app.use(bodyParser.json());

//middleware to import routes
app.use('/', routes)

module.exports = app;
