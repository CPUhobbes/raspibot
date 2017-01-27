"use strict";

const express = require('express'),
    Index = require('../controllers/IndexController'),
    Robots = require('../controllers/RobotsController'),
    UserAccount = require('../controllers/UserAccountController'),
    Router = express.Router();
/*
 * --- Index Route ---
 */
Router.get('/', Index.loadIndex);

/*
 * --- API Routes ---
 */

//Bot API routes
Router.get('/api/bot/getBotIP',Robots.getRobotIP);

//User API routes
Router.get('/api/user/validateUser',UserAccount.validateUser);
Router.post('/api/user/createUser',UserAccount.createUser);
Router.post('/api/user/addBot',UserAccount.addBot);
Router.get('/api/user/removeBot',UserAccount.removeBot);

module.exports = Router;