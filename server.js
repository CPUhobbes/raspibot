"use strict";

//Dependencies
const express = require('express'),
    Articles = require('./models/Articles.js'),
    Routes = require ('./config/routes.js'),
    BodyParser = require('body-parser'),
    Mongoose = require("mongoose"),
    Promise = require("bluebird"),
    Path = require('path'),
    
//Express    
app = express();

//Mongoose promise
Mongoose.Promise = Promise;

//Mongoose
//mongoose.connect("mongodb://heroku_fb0c0r33:ev7f7ms18p5bt4nvrilok3b9ap@ds111788.mlab.com:11788/heroku_fb0c0r33");
Mongoose.connect("mongodb://localhost/scraperlocal");
const db = Mongoose.connection;

//Mongoose Error
db.on("error", function(error) {
    console.log("Mongoose Error: ", error);
});

//Mongoose Connect
db.once("open", function() {
    console.log("Mongoose connection successful.");
});

//Add Body Parser
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: false }));

//Add static content directory (img, css, js, etc)
app.use(express.static(Path.join(__dirname, 'public')));

//Routes
app.use('/', Routes);
 
// Listen on port 3000
app.listen(process.env.PORT || 3000, () => {
    console.log("App running on port 3000!");
});

module.exports = app;