// MODULES
var express = require('express'),
	path = require('path'),
	bodyParser = require('body-parser'),
	app = express(),
	session = require('express-session');

// CUSTOM MODULES
var routes = require('./routes/index');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({secret: 'banan'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use('/', routes);

require('./routes/helpers/start')();

app.listen(3000, function(){
	console.log("Running on *3000");
});
