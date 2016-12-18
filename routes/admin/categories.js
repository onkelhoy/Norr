(function(){
	"user strict";
    var express = require('express');
    var construct = require('./construct');
    var admin = require('../admin');
    var filter = require('../helpers/filter');
    var sql = require('../helpers/sql');
    var routes = express.Router();

    routes.use('/', express.static('public'));

    routes.get('/c', function(req, res){
        sql.query('SELECT * FROM category', function(err, rows){
            if(err) res.status(404).send('database error');
            else res.status(200).json(rows);
        });
    }).post('/', function(req, res) {
        //add category
        construct.POST(req, res, function(data) {
            var command = "INSERT INTO `category`(`name`, `parent`, `superparent`) VALUES ('"+data.name+"','"+data.parent+"','"+data.superparent+"')";
            construct.RUN(check(data) && filter.num(data.id), command, res, 'post');
        });

    }).put('/', function(req, res) {
        //edit category
        construct.PUT(req, res, function(data) {
            var command = "UPDATE `category` SET `name`='"+data.name+"',`parent`='"+data.parent+"',`superparent`='"+data.superparent+"' WHERE id = '" + data.id + "'";
            construct.RUN(check(data) && filter.num(data.id), command, res, 'put');
        });

    }).delete('/force', function(req, res) {
        //remove category
        construct.DELETE(req, res, function(data) {
            var command = "DELETE category, product FROM category INNER JOIN product ON category.id = " + data.id + " and product.category = category.name";
            if(filter.num(data.id)){
							sql.query(command, function(err, rows){
								if(err){
									res.status(404).send('Database error');
								}
								else res.status(200).send('Category removed and all the products');
							});
						}
						else res.status(404).send('Invalid id');
        });

    }).delete('/', function(req, res) {
        //remove category
        construct.DELETE(req, res, function(data) {
					data = req.body;
            var command = "DELETE FROM `category` WHERE id = " + data.id + " and not exists(select name from product where product.category = '"+data.name+"')";
            if(filter.num(data.id)){
							sql.query(command, function(err, rows){
								if(err){
									res.status(404).send('Database error');
								}
								else {
									if(rows.affectedRows > 0) res.status(200).send('Category ' + data.name + ' removed');
									else res.status(405).send('Can\'t remove beacuse products are still connected to this category');
								}
							});
						}
						else res.status(404).send('Invalid id');
        });

    });

		routes.get('/', function(req, res) {
        //get products
        admin.check(req, res, function(sess) {

            res.render('admin', {
                username: sess.username,
                title: 'admin - '+sess.username.name,
                content: {
                    type: 'category'
                }
            });
        });
    });

    function check(data) {
        return filter.text(data.name) && filter.text(data.parent) &&
                filter.text(data.superparent);
    }


    module.exports = routes;
}());
