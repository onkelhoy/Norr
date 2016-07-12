(function(){
	"user strict";
    var express = require('express');
    var routes = express.Router();


	routes.use('/home', require('./home'));
	routes.use('/admin', require('./admin'));
	routes.use('/product', require('./product'));
	routes.use('/login', require('./login'));


	routes.get('/logout', function(req, res){
		req.session.destroy(function(err){
			if(!err) res.redirect('/');
		});
	});
	routes.get('/sqlerror', function(req, res){
		res.send('we are having some problems with database right now');
	});

	routes.get('/', function(req, res){
		res.redirect('/home');
	});
	routes.get('*', function(req, res){
		res.render('clean', {
			type: 'bad',
			title: '404 - page not found'
		});
	});

    module.exports = routes;
}());