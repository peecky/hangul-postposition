// encoding:utf8

var keywords1;
var keywords1Half = {
	'을(를)': ['을', '를'],
	'이(가)': ['이', '가'],
	'은(는)': ['은', '는'],
	'과(와)': ['과', '와']
};
var keywords1Full = {
	'을(를)': ['을', '를'],
	'를(을)': ['을', '를'],
	'이(가)': ['이', '가'],
	'가(이)': ['이', '가'],
	'은(는)': ['은', '는'],
	'는(은)': ['은', '는'],
	'과(와)': ['과', '와'],
	'와(과)': ['과', '와']
};
keywords1 = keywords1Full;

var keywords2 = {
	'(으)로': ['으로', '로']
};

function isHangul(chr) {
	var code = chr.charCodeAt(0);
	return code >= 0xAC00 && code <= 0xD7A3;
}

function hasConsonant(chr) {
	var code = chr.charCodeAt(0);
	return (code - 0xAC00) % 28 != 0
}

function hasConsonantRieul(chr) {
	var code = chr.charCodeAt(0);
	return (code - 0xAC00) % 28 == 8;
}

function translate(msg, keywords, checkFunction) {
	var i, l;
	var translatedMsg = msg;
	var keyword;
	for (keyword in keywords) {
		var msgParts = translatedMsg.split(keyword);
		if (msgParts.length < 2) continue;
		translatedMsg = '';
		for (i = 0, l = msgParts.length-1; i < l; i++) {
			translatedMsg += msgParts[i];
			var lastChr = msgParts[i].charAt(msgParts[i].length-1);
			var postposition;
			if (isHangul(lastChr))
				postposition = checkFunction(lastChr) ? keywords[keyword][0] : keywords[keyword][1];
			else postposition = keyword;
			translatedMsg += postposition;
		}
		translatedMsg += msgParts[i];
	}
	return translatedMsg;
}

exports.translatePostpositions = function(msg, properties) {
	if (properties && properties.locale && properties.locale !== 'ko') return msg;

	msg = translate(msg, keywords1, hasConsonant);
	msg = translate(msg, keywords2, function(chr) {
		return hasConsonant(chr) && !hasConsonantRieul(chr);
	});
	return msg;
};

exports.options = function(options) {
	if (options) {
		if (typeof options.halfTranslate !== 'undefined') {
			keywords1 = options.halfTranslate ? keywords1Half : keywords1Full;
		}
	}
};
