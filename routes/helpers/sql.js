var conn = require('./getsql');

// export functions
exports.query = function(command, callback) {
	query(command, callback);
}
exports.getCategories = function(callback){
	getCategories(callback);
}
exports.renderCategories = function(res, data){
	getCategories(
		function(err, categories){
			if(!err) {
				data.categories = categories;
                res.render('defualt', data);
			} else {
                res.render('clean', {
	                type: 'error',
	                title: 'Error 600', //sql error
	            	msg: 'Database error, loading categories'
	        	});
			}
	});
}





// functions
function query(command, callback) {
	var sql = conn.getConnection();
	if(sql.error) {
		callback(sql.error, null);
	}
	else {
		sql.query(command, function(err, rows){
			if(err) callback(err, null);
			else callback(null, rows);
		});
		sql.end();
	}
}

function getCategories(callback){
	var command = "SELECT `name` FROM `category` WHERE `parent` IS NULL";
	query(command, function(err, rows){
	    if(err && callback !== undefined) callback(err, null);
	    else {
	    	callback(null, rows);
	    }
    });
}