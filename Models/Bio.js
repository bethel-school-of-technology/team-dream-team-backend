const mongoose = require("mongoose");

//create schema
const BioSchema = new mongoose.Schema({
Userbio:{body: String}
    });

module.exports = mongoose.model("bios", BioSchema);