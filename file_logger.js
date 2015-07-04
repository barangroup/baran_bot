var fs = require('fs');

module.exports = (function(argument) {
	return {
		file_log: function(log) {
			log = log.replace(/\n/g, ' ');
			console.log(log);
			fs.appendFile("./server.log", log + '\n', function(err) {
				if (err) return console.log(err);
			})
		}
	}
})();