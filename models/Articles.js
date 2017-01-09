"use strict";

const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    title: {
        type:String,
        required: true,
        unique: true,
        dropDups: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    url: {
        type: String,
        required: true
    },
    abstract: {
        type: String
    }
});

const Articles = mongoose.model("Articles", articleSchema);

module.exports = Articles;