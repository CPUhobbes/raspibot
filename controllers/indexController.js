'use strict';

//Index router that will load the main page
let controllers = {
    
    loadIndex: (req, res) => {
        
        res.send('index.html');
    }
}

module.exports = controllers;