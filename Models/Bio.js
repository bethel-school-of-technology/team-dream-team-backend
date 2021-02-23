const mongoose = require("mongoose");

//create schema
const BioSchema = new mongoose.Schema({
body: String
    });

module.exports = mongoose.model("bio", BioSchema);