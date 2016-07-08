var dump = require('mysqldump');
var fs = require('fs');

module.exports = function() {
	setInterval(function(){
		downloadDB(true);

	}, 43200000);
}

exports.downloadDB = function(){
	downloadDB(true);
}
// 43200000 12 timmar
function downloadDB(ok){
	dump({
		host: 'localhost',
		user: 'root',
		password: '',
		database: 'norr',
		dest:'./database.sql' // destination file 
	},function(error){
		// create data.sql file; 

		if(error){
			if(ok) {
				fs.writeFile('./database.sql', '', function(err) {
				    if(err) {
				        return console.log(err);
				    } else {
						console.log('database file was created: '+Date());
					}
				}); 
				downloadDB(false);
			} else {
				console.log('there was an error downloading database: ' + Date());
			}
		}
		else {
			console.log('database was downloaded: '+Date());
		}
	});
}