(function(){
	"user strict";
    var express = require('express');
    var routes = express.Router();

    routes.get('/', function(req, res){
		res.send('logga in');
	});
    
    module.exports = routes;
}());