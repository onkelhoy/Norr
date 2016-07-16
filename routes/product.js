(function(){
	"user strict";
    var express = require('express'),
    	filter = require('./helpers/filter'),
    	sql = require('./helpers/sql');

    var routes = express.Router();
    routes.use('/', express.static('public'));

    routes.get('/:id', function(req, res){
    	var sess = req.session,
			id = req.params.id;

		if(filter.num(id)){
            var command = "SELECT * FROM `product` WHERE `id` = '"+id+"'";
            sql.query(command, function(err, rows){
                if(!err) {
					sql.renderCategories(req, res, {
			            type: 'product',
			            title: 'Norr',
			            product: rows,
			        	heartList: sess.heartList
					});
				} else {
                	console.log(err);
					res.render('clean', {
		                type: 'error',
		                title: 'Error 601', //sql error
		            	msg: 'Database error, loading product'
					});
				}
			});
		} else {
			// id is wrong!
            res.render('clean', {
                type: 'error',
                title: 'Error 605', //sql error
                msg: 'invalid parameter'
            });
		}

	});
    
    module.exports = routes;
}());