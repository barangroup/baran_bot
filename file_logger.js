var fs = require('fs');

module.exports = (function(argument) {
	return {
		file_log: function(log) {
			console.log(log);
			fs.appendFile("./server.log", log + '\n', function(err) {
				if (err) return console.log(err);
			})
		}
	}
})();