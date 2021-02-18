// file contains all server config, DB connnection, port settings etc

const mongoose = require("mongoose");

// MongoDB database
const dbRoute =
  "mongodb+srv://Julianne:Shareverse1234@svcluster.hlmba.mongodb.net/svs_data?retryWrites=true&w=majority";

// connects our back end code with the database
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true },
  { useUnifiedTopology: true }
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

//allows access to models throughout the application
require('./models/User');
require('./models/Post');
require('./models/Images');

//require app.js
const app = require("./app");

//starts server on port
const server = app.listen(5000, () => {
  console.log(`Express running PORT ${server.address().port}`);
});
