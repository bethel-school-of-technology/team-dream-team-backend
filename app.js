// file includes all app level config, middleware, and supporting libraries

const express = require("express"); //import express
const app = express(); //initalise app with express
const cors = require("cors");
const logger = require("morgan");
const routes = require("./routes/DataRoutes");


app.use(express.json());
//body-parser handles HTTP POST requests.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//enable Cross-Origin Resource Sharing.
app.use(cors());

app.use(express.json());
// get log details of our app if needed
app.use(logger("dev"));

//middleware to import routes
app.use("/", routes);


app.use('/search', express.static('search'));

module.exports = app;


