(function(){
	"user strict";
    var express = require('express');
    var layout = require('./content/layout.js');
    var routes = express.Router();

    routes.get('/', function(req, res){
    	console.log(layout);
		res.render('home', {
			layout: layout

		});
	});
    
    module.exports = routes;
}());