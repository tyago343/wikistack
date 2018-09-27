const express = require('express');
const router = express.Router();
const models = require('../models');
const Page = models.Page; 
const User = models.User; 

module.exports = router;
router.get('/', function(req, res, next) {
  	
  res.redirect('/')
});

router.post('/', function(req, res, next) {
  User.findOrCreate({
    where: {
    name: req.body.author_name,
    email: req.body.author_email
    }
  })
  .then(function (values) {
    var user = values[0];
    var page = Page.build({
    title: req.body.title,
    content: req.body.content
  });
    return page.save().then(function (page) {
    return page.setAuthor(user);
  });
})
.then(function (page) {
  res.redirect(page.urlTitle);
})
.catch(next);
});

router.get('/add', function(req, res, next) {
  res.render('addpage');
});

router.get('/:urlTitle', function(req, res, next){
    
   var results;
  Page.findAll({
    where: {
    urlTitle: req.params.urlTitle
  }})
  .then(function(page){
    results = page[0].dataValues
    return User.findById(results.authorId)
  })
  .then(function(autor){
     results.autor = autor.dataValues
     console.log(results)
       res.render('wikipage', { results : results })
  })
.catch(next) 








})

/* var results;
  Page.findAll({
    where: {
    urlTitle: req.params.urlTitle
  }})
  .then(function(page){
    results = page[0].dataValues
    return User.findById(results.authorId)
  })
  .then(function(autor){
     results.autor = autor.dataValues
     console.log(results)
     res.render('wikipage', { results : results })
  })
.catch(next) */