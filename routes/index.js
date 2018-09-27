'use strict'

const express = require('express');
const router = express.Router();
const wikiR = require('./wiki')
const userR = require('./user')
const models = require('../models');
const Page = models.Page; 
const User = models.User; 
module.exports = router;

router.use('/wiki', wikiR);

router.use('/users', userR)

router.get('/', function(req, res, next){
	Page.findAll().then(function(page){
		res.render('index', {pages : page})
	}).catch(next)
	
})