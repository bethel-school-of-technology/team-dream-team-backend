const express = require("express"); 
const app = express(); 
const cors = require("cors");
const logger = require("morgan");
const routes = require("./routes/DataRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.json());
app.use(logger("dev"));
app.use("/", routes);
app.use('/search', express.static('search'));

module.exports = app;


