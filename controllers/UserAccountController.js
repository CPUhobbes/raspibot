'use strict';

const UserAccount = require('../models/UserAccount');

//this is the function that is called in the index router that will load the page
const controllers = {

    createUser: (req, res) =>{
        let request = {user:req.body.user, pass:req.body.pass, bots:[]};
        let newUser = new UserAccount(request);

        newUser.save((error, doc)=>{
            if(error){
                return res.send(false);
            }
            return res.send(true);
        })
    },

    validateUser: (req, res) =>{
        UserAccount.findOne({user:req.query.user}, (error, doc)=>{
            return res.send(doc);
        });



    },

    addBot: (req, res) =>{
        let user = req.body.params.user;
        let bot = req.body.params.bot;
        console.log(user, bot);
        UserAccount.findOneAndUpdate({"user": user}, {$push:{"bots": bot}}, { upsert: true }, function(err, data){
            if(err){
                console.log(err);
            }
        });
        res.send(true)


    },
    
    removeBot: (req, res) =>{



    }



    
    //Get all saved articles from DB
    // getArticles: (req, res) => {
    //     UserAccount.find({}).exec(function (err, doc){ 

    //         res.json(doc);
    //     });
       
    // },

    //Save an article to the DB
    // saveArticles: (req, res) => {
      
    //   //console.log("Title - "+ req.query.title);
    // 	UserAccount.findOneAndUpdate({title:req.query.title}, {title: req.query.title, abstract: req.query.abstract, url: req.query.url },
    // 	{safe: true, upsert: true, new : true},
    //   	function(err, model) {
    //       	if(err){
    //         	console.log(err);
    //     	}
          
    //     	UserAccount.find({}).exec(function (err, doc){ 
    //         	res.json(doc);
    //     	});
    //     });
    // },

    //Delete an article from DB
    // deleteArticles: (req, res) => {
    //     UserAccount.findByIdAndRemove(req.query._id).exec(function (err, doc){ 
          	
    //     	//Return all saved articles minus the deleted article
    //       	UserAccount.find({}).exec(function (err, doc){ 
    //          	res.json(doc);
    //       	});
    //     });
    // }
}

module.exports = controllers;