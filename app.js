// file includes all app level config, middleware, and supporting libraries

const express = require("express"); //import express
const app = express(); //initalise app with express
var router = express.Router();
var nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const routes = require("./routes/DataRoutes");


app.use(bodyParser.json());
//body-parser handles HTTP POST requests.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//enable Cross-Origin Resource Sharing.
app.use(cors());

app.use(express.json());
// get log details of our app if needed
app.use(logger("dev"));

//middleware to import routes
app.use("/", routes);

module.exports = app;
