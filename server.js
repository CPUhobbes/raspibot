"use strict";

//Dependencies
const express = require('express'),
    UserAccount = require('./models/UserAccount.js'),
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
Mongoose.connect("mongodb://heroku_wm0zb9qc:45gok196pn30n8aiercjv0s7fr@ds033259.mlab.com:33259/heroku_wm0zb9qc");
//Mongoose.connect("mongodb://localhost/raspibot");
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