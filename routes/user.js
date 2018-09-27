const express = require('express');
const router = express.Router();
const models = require('../models');
const Page = models.Page; 
const User = models.User; 

module.exports = router;

router.get('/', function(req, res, next){
	var users = User.findAll({})
	.then(function(users){
		res.render('users', {users:users})
	})
})
router.get('/:id', function(req, res, next){
	var usuario = User.findById(req.params.id);
	var pages = Page.findAll({
		where : { authorId : req.params.id}
	})
	Promise.all([usuario, pages])
	.then(function(valores){
		var user = valores[0];
		var pages = valores[1];
    	res.render('singleuser', { user: user, pages: pages });
  	})
  	.catch(next);
});