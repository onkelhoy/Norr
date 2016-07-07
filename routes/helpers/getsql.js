var mysql = require('mysql');

exports.getConnection = function(){
	var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : '',
	  database : 'norr'
	});
	 
	connection.connect(function(err){
		if(err){
			connection.error = err;
		}
	});
	return connection;
}