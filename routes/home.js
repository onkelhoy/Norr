(function(){
	"user strict";
    var express = require('express');
    var jsonfile = require('jsonfile');
    var filter = require('./helpers/filter');
    var sql = require('./helpers/sql');

    var routes = express.Router();

    routes.use('/', express.static('public'));
    routes.get('/', function(req, res){


        jsonfile.readFile(__dirname + '/content/layout.json', function(err, obj){
            if(!err){
                sql.renderCategories(req, res, {
                    layout: obj,
                    type: 'home',
                    title: 'Norr'
                });
            }
            else {
                
                res.render('clean', {
                    type: 'error',
                    title: 'Error 603',
                    msg: 'Error loading layout'
                });
            }
        });

	});

    routes.get('/:cat', function(req, res){
        var category = req.params.cat;
        var sess = req.session;

        if(filter.text(category)) {
            var command = 'SELECT * FROM product WHERE product.category IN (SELECT name FROM category WHERE name = "'+category+'" OR superParent = "'+category+'" OR parent = "'+category+'")';
            sql.query(command, function(err, rows){
                if(err) {
                    res.render('clean', {
                        type: 'error',
                        title: 'Error 601', //sql error
                        msg: 'Database error, loading products'
                    });
                }
                else {
                    sql.renderCategories(req, res, {
                        type: 'products',
                        title: 'Norr',
                        products: rows,
                        heartList: sess.heartList
                    });
                }
            });
        } else {
            res.render('clean', {
                type: 'error',
                title: 'Error 605', //sql error
                msg: 'invalid parameter'
            });
        }
    });

    routes.post('/heart/:id', function(req, res){

    });
    
    module.exports = routes;
}());