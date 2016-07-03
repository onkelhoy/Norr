(function(){
	"user strict";
    var express = require('express');
    var routes = express.Router();

    var home = require('./home');
    var admin = require('./admin');
    var login = require('./login');
	
	routes.use('/home', home);
	routes.use('/admin', admin);


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
		res.render('defualt', {
			type: 'bad',
			title: '404 - page not found'
		});
	});

    module.exports = routes;
}());