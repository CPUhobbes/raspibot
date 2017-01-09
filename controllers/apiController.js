'use strict';

const Articles = require('../models/Articles');

//this is the function that is called in the index router that will load the page
let controllers = {
    
    //Get all saved articles from DB
    getArticles: (req, res) => {
        Articles.find({}).exec(function (err, doc){ 

            res.json(doc);
        });
       
    },

    //Save an article to the DB
    saveArticles: (req, res) => {
      
      //console.log("Title - "+ req.query.title);
    	Articles.findOneAndUpdate({title:req.query.title}, {title: req.query.title, abstract: req.query.abstract, url: req.query.url },
    	{safe: true, upsert: true, new : true},
      	function(err, model) {
          	if(err){
            	console.log(err);
        	}
          
        	Articles.find({}).exec(function (err, doc){ 
            	res.json(doc);
        	});
        });
    },

    //Delete an article from DB
    deleteArticles: (req, res) => {
        Articles.findByIdAndRemove(req.query._id).exec(function (err, doc){ 
          	
        	//Return all saved articles minus the deleted article
          	Articles.find({}).exec(function (err, doc){ 
             	res.json(doc);
          	});
        });
    }
}

module.exports = controllers;