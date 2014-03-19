// encoding: utf8

function assert(mustBeTrue) {
	if (!mustBeTrue) throw "Test Fail!";
}

var hanp = require("../hangul-postposition");
assert(hanp.translatePostpositions('') === '');	// empty string
assert(hanp.translatePostpositions('Hello World!') === 'Hello World!');	// non-hangul string
assert(hanp.translatePostpositions('사자은(는) 토끼을(를) 먹고 말은(는) 풀을(를) 먹는다.') === '사자는 토끼를 먹고 말은 풀을 먹는다.');
assert(hanp.translatePostpositions('사자는(은) 토끼를(을) 먹고 말는(은) 풀를(을) 먹는다.') === '사자는 토끼를 먹고 말은 풀을 먹는다.');
assert(hanp.translatePostpositions('사람과(와) 고양이과(와) 개') === '사람과 고양이와 개');
assert(hanp.translatePostpositions('사람와(과) 고양이와(과) 개') === '사람과 고양이와 개');
assert(hanp.translatePostpositions('배이(가) 고파요. 밥이(가) 먹고 싶어요.') === '배가 고파요. 밥이 먹고 싶어요.');
assert(hanp.translatePostpositions('배가(이) 고파요. 밥가(이) 먹고 싶어요.') === '배가 고파요. 밥이 먹고 싶어요.');
assert(hanp.translatePostpositions('서울(으)로 안 가니?') === '서울로 안 가니?');
assert(hanp.translatePostpositions('기차(으)로 부산(으)로 갈 것이다.') === '기차로 부산으로 갈 것이다.');

hanp.options({halfTranslate: true});
assert(hanp.translatePostpositions('') === '');	// empty string
assert(hanp.translatePostpositions('Hello World!') === 'Hello World!');	// non-hangul string
assert(hanp.translatePostpositions('사자은(는) 토끼을(를) 먹고 말은(는) 풀을(를) 먹는다.') === '사자는 토끼를 먹고 말은 풀을 먹는다.');
assert(hanp.translatePostpositions('사람과(와) 고양이과(와) 개') === '사람과 고양이와 개');
assert(hanp.translatePostpositions('배이(가) 고파요. 밥이(가) 먹고 싶어요.') === '배가 고파요. 밥이 먹고 싶어요.');
assert(hanp.translatePostpositions('서울(으)로 안 가니?') === '서울로 안 가니?');
assert(hanp.translatePostpositions('기차(으)로 부산(으)로 갈 것이다.') === '기차로 부산으로 갈 것이다.');
