# Hangul Postposition

(This library is for both node.js and Web Browsers.)

Translate proper Hangul postpositions for the Korean language.

* `'을(를)'` to `'을'` or `'를'`
* `'이(가)'` to `'이'` or `'가'`
* `'은(는)'` to `'은'` or `'는'`
* `'과(와)'` to `'과'` or `'와'`
* `'아(야)'` to `'아'` or `'야'`
* `'이어(여)'` to `'이어'` or `'여'`
* `'이에(예)'` to `'이에'` or `'예'`
* `'이었(였)'` to `'이었'` or `'였'`
* `'(이)'` to `'이'` or `''`
* `'(으)로'` to `'으로'` or `'로'`

For examples,

* `'사자은(는) 토끼을(를) 먹고 말은(는) 풀을(를) 먹는다.'` is translated to `'사자는 토끼를 먹고 말은 풀을 먹는다.'`.
* `'사람과(와) 고양이과(와) 개'` is translated to `'사람과 고양이와 개'`.
* `'배이(가) 고파요. 밥이(가) 먹고 싶어요.'` is translated to `'배가 고파요. 밥이 먹고 싶어요.'`.
* `'둘리아(야)! 희동아(야)!'` is translated to `'둘리야! 희동아!'`.
* `'종이이어(여)서 찢어졌다. 비닐이어(여)서 늘어났다.'` is translated to `'종이여서 찢어졌다. 비닐이어서 늘어났다.'`.
* `'저 사람 김태균이에(예)요? 아니요. 하나카나이에(예)요.'` is translated to `'저 사람 김태균이에요? 아니요. 하나카나예요.'`.
* `'그는 곰이었(였)으며, 동시에 호랑이이었(였)다.'` is translated to `'그는 곰이었으며, 동시에 호랑이였다.'`.
* `'불(이)야! 소방차(이)야!'` is translated to `'불이야! 소방차야!'`.
* `'비(이)다. 아니다. 눈(이)다.'` is translated to `'비다. 아니다. 눈이다.'`.
* `'서울(으)로 안 가니?'` is translated to `'서울로 안 가니?'`
* `'기차(으)로 부산(으)로 갈 것이다.'` is translated to `'기차로 부산으로 갈 것이다.'`
* `'4과(와) 7을(를) 더하면 11(이)다.'` is translated to `'4와 7을 더하면 11이다.'`

## Install
	npm install hangul-postposition

## Simple Example

for Node.js:

	var hanp = require('hangul-postposition');
	console.log(hanp.translatePostpositions('사자은(는) 토끼을(를) 먹고 말은(는) 풀을(를) 먹는다.'));

for Web Browsers:

	<script src="hangul-postposition.js"></script>
	<script>
	alert(hanp.translatePostpositions('사자은(는) 토끼을(를) 먹고 말은(는) 풀을(를) 먹는다.'));
	</script>

See more examples on [test/test.js](https://github.com/peecky/hangul-postposition/blob/master/test/test.js)

## With express and i18n
You can use [i18n](https://github.com/mashpie/i18n-node) or [i18n-2](https://github.com/jeresig/i18n-node-2).

app.js:

	var hanp = require('hangul-postposition');
	var i18n = require('i18n');
	i18n.configure({
		locales: ['en', 'ko'],
		defaultLocale: 'en',
		directory: __dirname + '/locales'
	});
	
	...
	
	app.use(i18n.init);	// should be used before the router
	hanp.expressBind(app);
	
	...
	
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

If you use [i18n-2](https://github.com/jeresig/i18n-node-2), call the hanp.expressBind() function after calling the [I18n.expressBind()](https://github.com/jeresig/i18n-node-2#i18nexpressbindapp-options) function.
