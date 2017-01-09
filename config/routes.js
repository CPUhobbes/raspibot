"use strict";

const express = require('express'),
    index = require('../controllers/indexController'),
    api = require('../controllers/apiController'),
    router = express.Router();
/*
 * --- Index Route ---
 */
router.get('/', index.loadIndex);

/*
 * --- API Routes ---
 */

//Get all articles
router.get('/api/saved',api.getArticles);

//Save an article
router.post('/api/saved',api.saveArticles);

//Delete an article
router.delete('/api/saved',api.deleteArticles);


module.exports = router;