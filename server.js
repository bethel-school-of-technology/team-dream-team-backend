const mongoose = require("mongoose");

require('./models/User');
require('./models/Post');
require('./models/Token');
require('./models/Images');
require('./models/Bio');
require('./models/FireBase');

const app = require("./app");

const mongoURI =
  "mongodb+srv://Julianne:Shareverse1234@svcluster.hlmba.mongodb.net/svs_data?retryWrites=true&w=majority";

const conn = mongoose.createConnection(mongoURI);

mongoose.connect(
  mongoURI, { useNewUrlParser: true }, 
            { useUnifiedTopology: true });

conn.once('open', () => {
  console.log('Connection Successful')
})

conn.on("error", console.error.bind(console, "MongoDB connection error:"));

const server = app.listen(5000, () => {
  console.log(`Express running PORT ${server.address().port}`);
});
