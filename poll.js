var telegram = require('telegram-bot-api'),
	token = require('./token').token,
	logger = require('./file_logger'),
	db = require('./mongo/mongo_schemas');

var api = new telegram({
	token: token || "<API TOKEN>",
	updates: {
		enabled: true
	}
});

var menu = "***  ربات نظر سنجی اعضای فعال باران.\n" +
	"*برای اطلاع از شیوه ارسال پاسخ های خود کلمه \"راهنما\" را ارسال کنید." + "\n" +
	"*برای دریافت سوال های نظر سنجی کلمه \"سوال\" را ارسال کنید.\n" +
	"*برای بررسی پاسخ های خود کلمه \"گزارش\" را ارسال کنید." + "\n\n" +
	"(اطلاعات شما محرمانه خواهد بود)\n" + 
	"گروه دانشجویی باران"

var q = "۱-نحوه ى عضويت شما درگروه باران به چه شکل بوده است؟\n" +
	"۲-از چه سالى فعاليت خود را در گروه آغازکرديد؟\n" +
	"۳-چه انگيزه اى باعث شده در باران فعالیت جدی تری داشته باشید؟\n" +
	"۴-اگر به شما درگروه مسئوليتى داده شود دوست داريدآن مسئوليت چه باشد؟ وايده خودرا درباره آن بگوييد.\n" +
	"۵-راهکارهاى شما براى بهبود عملگرد کارگروه پژوهش چيست؟\n" +
	"۶-آيا همکارى شما درگروه به طور مستمربوده است؟ بلى/ خير.\nاگرجواب شما خيرمى باشد دليل عدم استمرار فعاليتتان راشرح دهيد.\n" +
	"۷-انقاد؟پیشنهاد؟نظر؟\n\n" +
	"*برای اطلاع از شیوه ارسال  پاسخ های خود کلمه \"راهنما\" را ارسال کنید." + "\n" +
	"*برای بررسی پاسخ های خود کلمه \"گزارش\" را ارسال کنید." + "\n";

var help = "*** لطفا جواب هر سوال را به صورت تشریحی با شروع با عدد لاتین شماره سوال ارسال کنید.\n" +
	"مثال :\n\n" + "1- با فرم عضویت و تشویق دوستان و ...\n\n" +
	"*برای دریافت سوال های نظر سنجی کلمه \"سوال\" را ارسال کنید.\n" +
	"*برای بررسی پاسخ های خود کلمه \"گزارش\" را ارسال کنید." + "\n";

var error = "با عرض پوزش مشکل داخلی سرور لطفا بعدا تلاش کنید";

var c = 0;

api.on('message', function(message) {

	var income_text = message.text,
		chat_id = message.chat.id,
		username = message.chat.username,
		last_name = message.chat.last_name,
		first_name = message.chat.first_name,
		name = username || last_name || first_name;


	logger.file_log('#' + ++c + ' message from -> ' + name + " / text -> " + income_text);

	if (income_text == "سوال") {
		reply(chat_id, q, name);
	} else if (income_text == "راهنما") {
		reply(chat_id, help, name);
	} else if (Number(income_text.charAt(0)) == income_text.charAt(0) && income_text.length > 3) {
		db.poll.findOne({
			username: username
		}, function(err, user) {
			if (err) {
				reply(chat_id, error, name);
			} else if (user) {
				user.answers.push({
					question: Number(income_text.charAt(0)),
					text: income_text
				});
				user.save(function(err) {
					if (err) {
						console.log(err);
						reply(chat_id, error, name);
					} else {
						reply(chat_id, "با تشکر از شما، پاسخ شما با موفقیت ثبت شد", name);
					}
				});
			} else {
				new db.poll({
					username: username,
					first_name: first_name,
					last_name: last_name,
					answers: [{
						question: Number(income_text.charAt(0)),
						text: income_text
					}]
				}).save(function(err) {
					if (err) {
						console.log(err);
						reply(chat_id, error, name);
					} else {
						reply(chat_id, "با تشکر از شما، پاسخ شما با موفقیت ثبت شد", name);
					}
				})
			}
		});
	} else if (income_text == "گزارش") {
		db.poll.findOne({
			username: username
		}).lean().exec(function(err, user) {
			if (err) {
				console.log(err);
				reply(chat_id, error, name);
			} else if (user) {
				var _r = "";
				user.answers.forEach(function(answer) {
					_r += answer.text + "\n\n";
				});
				reply(chat_id, _r, name);
			} else {
				reply(chat_id, "هنوز پاسخی از شما در سیستم ثبت نشده است", name);
			}
		});
	} else {
		reply(chat_id, menu, name);
	}
});


function reply(chat_id, text, name) {
	api.sendMessage({
		chat_id: chat_id,
		text: text
	}, function(err, m) {
		logger.file_log('reply to -> ' + name);
	});
}