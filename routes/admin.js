(function(){
	"user strict";
    var express = require('express');
    var routes = express.Router();

    routes.use('/', express.static('public'));
    routes.get('/', function(req, res){
        check(req, res, function(sess){
            res.render('admin', {
                username: sess.username,
                title: 'admin - '+sess.username.name
            });
        });
	});
    routes.get('/orders', function(req, res){
        check(req, res, function(sess){
            res.render('admin', {
                username: sess.username,
                title: 'admin - orders',
                type: 'orders'
            });
        });
    });
    routes.get('/homepage', function(req, res){
        check(req, res, function(sess){
            res.render('admin', {
                username: sess.username,
                title: 'admin - homepage',
                type: 'homepage'
            });
        });
    });
    routes.get('/products', function(req, res){
        check(req, res, function(sess){
            res.render('admin', {
                username: sess.username,
                title: 'admin - products',
                type: 'products'
            });
        });
    });
    routes.get('/users', function(req, res){
        check(req, res, function(sess){
            res.render('admin', {
                username: sess.username,
                title: 'admin - users',
                type: 'users'
            });
        });
    });

    function check(req, res, callback) {
        var sess = req.session;
        if(sess.username && sess.username.admin == 1){
            callback(sess);
        }
        else res.redirect('/home');
    }

    module.exports = routes;
}());