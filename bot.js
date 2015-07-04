var telegram = require('telegram-bot-api');
var token = require('./token').token;

var api = new telegram({
	token: token || "< API TOKEN >",
	updates: {
		enabled: true
	}
});

api.on('message', function(message) {

	var income_text = message.text,
		text = "",
		chat_id = message.chat.id;

	if (income_text == "/fadaiian" || income_text == "fadaiian") {
		text = "نزدیک ترین اعزام، یکشنبه ساعت ۵ عصر.";
	} else {
		text = "Menu\n" + "/fadaiian -> fadaiian report";
	}

	api.sendMessage({
		chat_id: chat_id,
		text: text
	}, function(err, message) {
		console.log(message);
	});
});