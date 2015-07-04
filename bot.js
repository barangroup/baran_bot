var telegram = require('telegram-bot-api'),
	token = require('./token').token,
	logger = require('./file_logger');


var api = new telegram({
	token: token || "<API TOKEN>",
	updates: {
		enabled: true
	}
});

api.on('message', function(message) {

	var income_text = message.text,
		name = message.chat.username || message.chat.last_name || message.chat.first_name,
		text = "",
		chat_id = message.chat.id;

	logger.file_log('message from -> ' + name + " / text -> " + income_text);

	if (income_text == "/fadaiian" || income_text == "fadaiian") {
		text = "نزدیک ترین اعزام، یکشنبه ساعت ۵ عصر.";
	} else {
		text = "Menu\n" + "/fadaiian -> fadaiian report";
	}

	api.sendMessage({
		chat_id: chat_id,
		text: text
	}, function(err, m) {
		logger.file_log('reply to -> ' + name + " / text -> {\n" + m.text + "\n}");
	});
});