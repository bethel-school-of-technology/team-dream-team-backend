const mongoose = require("mongoose");

//create schema
const BioSchema = new mongoose.Schema({
    userBio:{
        type: String
    }
    });

module.exports = mongoose.model("bios", BioSchema);