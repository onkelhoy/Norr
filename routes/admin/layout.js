(function(){
	"user strict";
    var express = require('express');
    var sql = require('../helpers/sql');
    var filter = require('../helpers/filter');
    var routes = express.Router();

    routes.use('/', express.static('public'));

    routes.get('/', function(req, res){
        res.render('admin', {
            username: sess.username,
            title: 'admin - '+sess.username.name,
            content: {
                type: 'layout'
            }
        });
    });

    module.exports = routes;
}());