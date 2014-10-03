// encoding: utf8

var assert, hanp;

if (typeof window === 'object') {
	// web browser
	assert = {
		strictEqual: function(arg1, arg2) {
			if (arg1 !== arg2) throw new Error('Test fail!');
		}
	};
	hanp = window.hanp;
}
else if (typeof require === 'function') {
	// node.js
	assert = require('assert');
	hanp = require("../hangul-postposition");
}

//hanp.options({halfTranslate: true});
assert.strictEqual(hanp.translatePostpositions(''), '');	// empty string
assert.strictEqual(hanp.translatePostpositions('Hello World!'), 'Hello World!');	// non-hangul string
assert.strictEqual(hanp.translatePostpositions('사자은(는) 토끼을(를) 먹고 말은(는) 풀을(를) 먹는다.'), '사자는 토끼를 먹고 말은 풀을 먹는다.');
assert.strictEqual(hanp.translatePostpositions('사람과(와) 고양이과(와) 개'), '사람과 고양이와 개');
assert.strictEqual(hanp.translatePostpositions('배이(가) 고파요. 밥이(가) 먹고 싶어요.'), '배가 고파요. 밥이 먹고 싶어요.');
assert.strictEqual(hanp.translatePostpositions('둘리아(야)! 희동아(야)!'), '둘리야! 희동아!');
assert.strictEqual(hanp.translatePostpositions('종이이어(여)서 찢어졌다. 비닐이어(여)서 늘어났다.'), '종이여서 찢어졌다. 비닐이어서 늘어났다.');
assert.strictEqual(hanp.translatePostpositions('저 사람 김태균이에(예)요? 아니요. 하나카나이에(예)요.'), '저 사람 김태균이에요? 아니요. 하나카나예요.');
assert.strictEqual(hanp.translatePostpositions('그는 곰이었(였)으며, 동시에 호랑이이었(였)다.'), '그는 곰이었으며, 동시에 호랑이였다.');
assert.strictEqual(hanp.translatePostpositions('불(이)야! 소방차(이)야!'), '불이야! 소방차야!');
assert.strictEqual(hanp.translatePostpositions('비(이)다. 아니다. 눈(이)다.'), '비다. 아니다. 눈이다.');
assert.strictEqual(hanp.translatePostpositions('서울(으)로 안 가니?'), '서울로 안 가니?');
assert.strictEqual(hanp.translatePostpositions('기차(으)로 부산(으)로 갈 것이다.'), '기차로 부산으로 갈 것이다.');
assert.strictEqual(hanp.translatePostpositions('4과(와) 7을(를) 더하면 11(이)다.'), '4와 7을 더하면 11이다.');

assert.strictEqual(hanp.translatePostpositions('1(으)로 1을(를) 7(으)로 7을(를) 8(으)로 8을(를)'), '1로 1을 7로 7을 8로 8을');
assert.strictEqual(hanp.translatePostpositions('3(으)로 3을(를) 6(으)로 6을(를) 0(으)로 0을(를)'), '3으로 3을 6으로 6을 0으로 0을');
assert.strictEqual(hanp.translatePostpositions('2(으)로 2을(를) 4(으)로 4을(를) 5(으)로 5을(를) 9(으)로 9을(를)'), '2로 2를 4로 4를 5로 5를 9로 9를');

hanp.options({halfTranslate: false});
assert.strictEqual(hanp.translatePostpositions(''), '');	// empty string
assert.strictEqual(hanp.translatePostpositions('Hello World!'), 'Hello World!');	// non-hangul string
assert.strictEqual(hanp.translatePostpositions('사자은(는) 토끼을(를) 먹고 말은(는) 풀을(를) 먹는다.'), '사자는 토끼를 먹고 말은 풀을 먹는다.');
assert.strictEqual(hanp.translatePostpositions('사자는(은) 토끼를(을) 먹고 말는(은) 풀를(을) 먹는다.'), '사자는 토끼를 먹고 말은 풀을 먹는다.');
assert.strictEqual(hanp.translatePostpositions('사람과(와) 고양이과(와) 개'), '사람과 고양이와 개');
assert.strictEqual(hanp.translatePostpositions('사람와(과) 고양이와(과) 개'), '사람과 고양이와 개');
assert.strictEqual(hanp.translatePostpositions('배이(가) 고파요. 밥이(가) 먹고 싶어요.'), '배가 고파요. 밥이 먹고 싶어요.');
// '가(이)' is not supported anymore because it conflicts with '(이)'
//assert.strictEqual(hanp.translatePostpositions('배가(이) 고파요. 밥가(이) 먹고 싶어요.'), '배가 고파요. 밥이 먹고 싶어요.');
assert.strictEqual(hanp.translatePostpositions('둘리아(야)! 희동아(야)!'), '둘리야! 희동아!');
assert.strictEqual(hanp.translatePostpositions('둘리야(아)! 희동야(아)!'), '둘리야! 희동아!');
assert.strictEqual(hanp.translatePostpositions('종이이어(여)서 찢어졌다. 비닐이어(여)서 늘어났다.'), '종이여서 찢어졌다. 비닐이어서 늘어났다.');
assert.strictEqual(hanp.translatePostpositions('종이여(이어)서 찢어졌다. 비닐여(이어)서 늘어났다.'), '종이여서 찢어졌다. 비닐이어서 늘어났다.');
assert.strictEqual(hanp.translatePostpositions('저 사람 김태균이에(예)요? 아니요. 하나카나이에(예)요.'), '저 사람 김태균이에요? 아니요. 하나카나예요.');
assert.strictEqual(hanp.translatePostpositions('저 사람 김태균예(이에)요? 아니요. 하나카나예(이에)요.'), '저 사람 김태균이에요? 아니요. 하나카나예요.');
assert.strictEqual(hanp.translatePostpositions('그는 곰이었(였)으며, 동시에 호랑이이었(였)다.'), '그는 곰이었으며, 동시에 호랑이였다.');
assert.strictEqual(hanp.translatePostpositions('그는 곰였(이었)으며, 동시에 호랑이였(이었)다.'), '그는 곰이었으며, 동시에 호랑이였다.');
assert.strictEqual(hanp.translatePostpositions('불(이)야! 소방차(이)야!'), '불이야! 소방차야!');
assert.strictEqual(hanp.translatePostpositions('비(이)다. 아니다. 눈(이)다.'), '비다. 아니다. 눈이다.');
assert.strictEqual(hanp.translatePostpositions('서울(으)로 안 가니?'), '서울로 안 가니?');
assert.strictEqual(hanp.translatePostpositions('기차(으)로 부산(으)로 갈 것이다.'), '기차로 부산으로 갈 것이다.');
assert.strictEqual(hanp.translatePostpositions('4과(와) 7을(를) 더하면 11(이)다.'), '4와 7을 더하면 11이다.');
assert.strictEqual(hanp.translatePostpositions('4와(과) 7를(을) 더하면 11(이)다.'), '4와 7을 더하면 11이다.');

console.log('Test completed. No errors.');
