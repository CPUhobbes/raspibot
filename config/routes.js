"use strict";

const express = require('express'),
    index = require('../controllers/indexController'),
    robots = require('../controllers/robotsController'),
    router = express.Router();
/*
 * --- Index Route ---
 */
router.get('/', index.loadIndex);

/*
 * --- API Routes ---
 */

//Get all articles
router.get('/api/getBotID',robots.getRobotIP);


module.exports = router;