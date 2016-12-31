(function(){
	"user strict";
    var express = require('express');
    var jsonfile = require('jsonfile');
    var filter = require('./helpers/filter');
    var sql = require('./helpers/sql');

    var routes = express.Router();

    routes.use('/', express.static('public'));
		routes.use('/heart', require('./helpers/heart'));

    routes.get('/', function(req, res){
        jsonfile.readFile(__dirname + '/content/layout.json', function(err, obj){ //readFileSync
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
                    title: 'Error 500',
                    msg: 'Error loading layout'
                });
            }
        });
	}).post('/search', function(req, res){
		var value = req.body.value;

		if(filter.text(value)){
			var command = 'select * from product where name like "%'+value+'%" OR category = "' + value+'"';
			sql.query(command, function(err, rows){
				if(err) res.status(404).send('database error');
				else res.status(200).json(rows);
			})
		} else res.status(404).send('Invalid charactures');
	}).get('*', function(req, res){
		res.render('clean', {
			type: 'bad',
			title: '404 - page not found'
		});
	});


    module.exports = routes;
}());




/**
routes.post('/heart/:id', function(req, res){
	if(filter.num(req.params.id)){
		if(req.session.heartList == undefined) req.session.heartList = [];
		req.session.heartList.push(req.params.id);
		res.status(200).send('added');
	} else res.status(404).send('inalid id');
}).delete('/heart/:id', function(req, res){
	if(filter.num(req.params.id)){
		if(req.session.heartList == undefined) res.status(404).send('no list detected');
		else {
			var found = false;
			for(var i = 0; i < req.session.heartList.length; i++){
				if(req.session.heartList[i] == req.params.id) {
					found = true;
					break;
				}
			}

			if(found) res.status(200).send('removed');
			else res.status(404).send('not found');
		}
	} else res.status(404).send('inalid id');
}).get('/heartlist', function(req, res){
	res.status(200).json(req.session.heartList);
});

*/
