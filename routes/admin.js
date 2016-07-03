(function(){
	"user strict";
    var express = require('express');
    var routes = express.Router();

    routes.get('/', function(req, res){
    	var sess = req.session;
    	if(sess.admin == 1){
			res.send('hej admin');
    	}
    	else res.redirect('/home');
	});

    module.exports = routes;
}());