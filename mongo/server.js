var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/' + 'baran');
var db = mongoose.connection;

// this line is the original one
//db.on('error', console.error.bind(console, 'connection error:'));

db.on('error', function (err) {
    console.log('Error : Mongo connection error'.red);
//    console.log(err);
});

db.once('open', function () {
   // console.log("connected to mongo");
	require('../poll');
});