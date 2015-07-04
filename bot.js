var telegram = require('telegram-bot-api');


var api = new telegram({
	token: '<teken>',
	updates: {
		enabled: true
	}
});

api.on('message', function(message) {
	var text = "";
	var chat_id = message.chat.id;
	console.log(message);

	if (message.text == "فداییان" || message.text == "فدائیان") {
		text = "نزدیک ترین اعزام، یکشنبه ساعت ۵ عصر.";
	} else {
		text = "سلام" + " " + message.from.username;
	}

	api.sendMessage({
		chat_id: message.chat.id,
		text: text
	}, function(err, message) {
		console.log(message);
	});
});