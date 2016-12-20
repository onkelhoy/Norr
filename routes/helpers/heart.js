(function(){
	"user strict";
    var express = require('express');
    var filter = require('./filter');

    var routes = express.Router();

    routes.use('/', express.static('public'));
    routes.post('/:id', function(req, res){
      if(filter.num(req.params.id)){
        if(req.session.heartList == undefined) {
					req.session.heartList = [];
				}
				var index = getIndex(req.session.heartList, req.params.id);
				if(index == -1) {
					req.session.heartList.push(req.params.id);
					res.status(200).send('added');
				}
				else res.status(404).send('value already added');
      } else res.status(404).send('inalid id');
    }).delete('/:id', function(req, res){
        if(filter.num(req.params.id)) {
	        if(req.session.heartList == undefined) res.status(404).send('no list detected');
	        else {
						var index = getIndex(req.session.heartList, req.params.id);
	          if(index != -1) {
							req.session.heartList.splice(index, 1);
	            res.status(200).send('removed');
	          }
						else res.status(404).send('not found');
	        }
	      } else res.status(404).send('inalid id');
    }).get('/', function(req, res){
      res.status(200).json(req.session.heartList);
    });


		function getIndex(arr, value){
			for(var i = 0; i < arr.length; i++){
				if(arr[i] == value) return i;
			}

			return -1;
		}

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
