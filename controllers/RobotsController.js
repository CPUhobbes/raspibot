'use strict';

const Robots = require('../models/Robots');

//this is the function that is called in the index router that will load the page
let controllers = {
    
    //Get all saved articles from DB
    getRobotIP: (req, res) => {
        Robots.findOne({'serial' :req.query.serial}).exec(function (err, doc){ 

           //console.log(doc);
           res.json(doc);
        });
       
    }
}
module.exports = controllers;