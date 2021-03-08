// file contains all server config, DB connnection, port settings etc

const mongoose = require("mongoose");

//allows access to models throughout the application
require('./models/User');
require('./models/Post');
require('./models/Token');
require('./models/Images');
require('./models/Bio');
require('./models/FireBase');

//require app.js
const app = require("./app");

// MongoDB database URI path
const mongoURI =
  "mongodb+srv://Julianne:Shareverse1234@svcluster.hlmba.mongodb.net/svs_data?retryWrites=true&w=majority";

// connects backend to database
const conn = mongoose.createConnection(mongoURI);

mongoose.connect(
  mongoURI, { useNewUrlParser: true }, 
            { useUnifiedTopology: true });

//allows gf to find specific file from db collection

conn.once('open', () => {
  console.log('Connection Successful')
})

// checks if connection with the database is successful
conn.on("error", console.error.bind(console, "MongoDB connection error:"));

//starts server on port
const server = app.listen(5000, () => {
  console.log(`Express running PORT ${server.address().port}`);
});
