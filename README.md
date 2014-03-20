# Hangul Postposition

Translate proper Hangul postpositions for the Korean language.

* `을(를)` to `을` or `를`
* `이(가)` to `이` or `가`
* `은(는)` to `은` or `는`
* `과(와)` to `과` or `와`
* `(으)로` to `으로` or `로`

For examples,

* `사자은(는) 토끼을(를) 먹고 말은(는) 풀을(를) 먹는다.` is translated to `사자는 토끼를 먹고 말은 풀을 먹는다.`.
* `사람과(와) 고양이과(와) 개` is translated to `사람과 고양이와 개`
* `배이(가) 고파요. 밥이(가) 먹고 싶어요.` is translated to `배가 고파요. 밥이 먹고 싶어요.`
* `서울(으)로 안 가니?` is translated to `서울로 안 가니?`
* `기차(으)로 부산(으)로 갈 것이다.` is translated to `기차로 부산으로 갈 것이다.`

## Install
	npm install hangul-postposition

## Simple Example
	var hanp = require('hangul-postposition');
	console.log(hanp.translatePostpositions('사자은(는) 토끼을(를) 먹고 말은(는) 풀을(를) 먹는다.'));

See more examples on [test/test.js](https://github.com/peecky/hangul-postposition/blob/master/test/test.js)

## With express and jade
Require the post translate option of i18n. See [https://github.com/peecky/i18n-node](https://github.com/peecky/i18n-node)

app.js:

	var i18n = require('i18n');
	i18n.configure({
		locales: ['en', 'ko'],
		defaultLocale: 'en',
		directory: __dirname + '/locales',
		postTranslate: require('hangul-postposition').translatePostpositions
	});
	
	...
	
	app.use(i18n.init);	// should be used before the router
	app.use(app.router);

locales/ko.json:

	{
		"banana": "바나나",
		"I ate %s.": "나는 %s을(를) 먹었다."
	}

views/eat.jade:

	- var food = __('banana')
	p= __('I ate %s.', food)

These become:

	<p>나는 바나나를 먹었다.</p>
