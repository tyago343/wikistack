'use strict'

const pg = require('pg');
const nunjucks = require('nunjucks');
const bp = require('body-parser');
const express = require('express');
const app = express();
const morgan = require('morgan')
const routes = require('./routes')
const tables = require('./models')

//templates

app.engine('html', nunjucks.render);

app.set('view engine', 'html');

nunjucks.configure('views', { noCache: true});

//logging middleware
app.use(morgan('combined'));

//parseo

app.use(bp.urlencoded({extended:true}))
app.use(bp.json());

//crea las tablas
tables.Page.sync({ force: false }).then(function(){
	return tables.User.sync({ force: false })
}).then(function(){
	
	//comienza a escuchar el servidor apenas se crean las tablas
	app.listen(1337, function(){
	console.log('listening on port 1337');
	});
})
.catch(console.error);





app.use(express.static('./public/'));

app.use('/', routes)

