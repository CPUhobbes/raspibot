"use strict";

const mongoose = require('mongoose');

const robotsSchema = mongoose.Schema({
    serial: {
        type:String,
        required: true,
        unique: true,
        dropDups: true
    },
    ip: {
        type: String,
        required: true
    }
    
});

const Robots = mongoose.model("Robots", robotsSchema);

module.exports = Robots;