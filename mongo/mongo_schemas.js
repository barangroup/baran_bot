var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// making schemas for inserting data in mongo

var poll_schema = Schema({
    poll_number: Number,
    user_id: Number,
    username: String,
    first_name: String,
    last_name: String,
    answers: [{
        question: Number,
        text: String
    }]
});

module.exports = (function() {
    var _return = {};

    _return.poll = mongoose.model('poll', poll_schema);

    return _return;
})();