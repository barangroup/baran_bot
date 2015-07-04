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
	} else if (income_text == "/fakor" || income_text == "fakor") {
		text = "تا اطلاع بعدی اعزامی وجود ندارد.";
	} else if (income_text == "/keramat" || income_text == "keramat") {
		text = "در هفته جاری اعزامی وجود ندارد";
	} else if (income_text == "/fereshtegan" || income_text == "fereshtegan") {
		text = "نزدیک ترین اعزام، چهارشنبه عصر.";
	} else if (income_text == "/emam_raoof" || income_text == "emam_raoof") {
		text = "نزدیک ترین اعزام،دوشنبه عصر.";
	} else if (income_text == "/info" || income_text == "info") {
		text = "با استفاده از این ربات میتوانید زمان اخرین اعزام ها به مراکز بهزیستی مختلف توسط گروه باران را دنبال کنید.";
	} else {
		text = "/menu -> this help page\n" +
			"/info -> info about this bot" + "\n" +
			"/fadaiian -> fadaiian report" + "\n" +
			"/fakor -> fakor report" + "\n" +
			"/keramat -> keramat report" + "\n" +
			"/fereshtegan -> fereshtegan report" + "\n" +
			"/emam_raoof -> emam_raoof report";
	}

	api.sendMessage({
		chat_id: chat_id,
		text: text
	}, function(err, m) {
		logger.file_log('reply to -> ' + name + " / text -> {\n" + m.text + "\n}");
	});
});