(function(){
	"user strict";
    var express = require('express');
    var construct = require('./construct');
    var admin = require('../admin');
    var filter = require('../helpers/filter');
    var routes = express.Router();

    routes.use('/', express.static('public'));

    routes.get('/', function(req, res) {
        //get products
        admin.check(req, res, function(sess) {
            
            res.render('admin', {
                username: sess.username,
                title: 'admin - '+sess.username.name,
                content: {
                    type: 'products'
                }
            });
        });
    });
    routes.get('/:offset/:order', function(req, res) {
        //get products
        construct.GET(req, res, function(data) {
            var command = "SELECT * FROM product ORDER BY " + data.order + " LIMIT 6 OFFSET " + data.offset;
            construct.RUN(filter.text(data.order) && filter.num(data.offset), command, res, 'get');
        });

    }).post('/', function(req, res) {
        //add product
        construct.POST(req, res, function(data) {
            var command = "INSERT INTO `product`(`name`, `category`, `price`, `images`, `info`, `stock`, `rea`) VALUES ('"+data.name+"','"+data.category+"','"+data.price+"','"+data.images+"','"+data.info+"','"+data.stock+"','"+data.rea+"')";
            construct.RUN(check(data) && filter.num(data.id), command, res, 'post');
        });

    }).put('/', function(req, res) {
        //edit product
        construct.PUT(req, res, function(data) {
            var command = "UPDATE `product` SET `name`='"+data.name+"',`category`='"+data.category+"',`price`='"+data.price+"',`info`='"+data.info+"',`stock`='"+data.stock+"',`rea`='"+data.rea+"' WHERE id = '" + data.id + "'";
            construct.RUN(check(data) && filter.num(data.id), command, res, 'put');
        });

    }).put('/img', function(req, res) {
        //edit product
        construct.PUT(req, res, function(data) {
            var command = "UPDATE `product` SET `name`='"+data.name+"',`category`='"+data.category+"',`price`='"+data.price+"',`images`='"+data.images+"',`info`='"+data.info+"',`stock`='"+data.stock+"',`rea`='"+data.rea+"' WHERE id = '" + data.id + "'";
            construct.RUN(check(data) && filter.num(data.id), command, res, 'put');
        });

    }).delete('/', function(req, res) {
        //remove product
        construct.DELETE(req, res, function(data) {
            var command = "DELETE FROM `product` WHERE id = " + data.id;
            construct.RUN(filter.num(data.id), command, res, 'delete');
        });
        
    });


    function check(data) {
        return filter.text(data.name) && filter.text(data.category) &&
                filter.link(data.images) && filter.text(data.info) && 
                filter.num(data.rea) && filter.num(data.price) &&
                filter.num(data.stock);
    }


    module.exports = routes;
}());