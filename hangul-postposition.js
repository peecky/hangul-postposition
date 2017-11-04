/**
 * @link	https://github.com/peecky/hangul-postposition
 * @license	http://opensource.org/licenses/MIT
 *
 * @version	2.0.0
 */

// encoding:utf8

(function() {
	"use strict";

	var keywords1Half = {
		'을(를)': ['을', '를'],
		'이(가)': ['이', '가'],
		'은(는)': ['은', '는'],
		'과(와)': ['과', '와'],
		'아(야)': ['아', '야'],
		'이어(여)': ['이어', '여'],
		'이에(예)': ['이에', '예'],
		'이었(였)': ['이었', '였'],
		'(이)': ['이', '']
	};
	var keywords1Full = {
		'을(를)': ['을', '를'],
		'를(을)': ['을', '를'],
		'이(가)': ['이', '가'],
//		'가(이)': ['이', '가'],
		'은(는)': ['은', '는'],
		'는(은)': ['은', '는'],
		'과(와)': ['과', '와'],
		'와(과)': ['과', '와'],
		'아(야)': ['아', '야'],
		'야(아)': ['아', '야'],
		'이어(여)': ['이어', '여'],
		'여(이어)': ['이어', '여'],
		'이에(예)': ['이에', '예'],
		'예(이에)': ['이에', '예'],
		'이었(였)': ['이었', '였'],
		'였(이었)': ['이었', '였'],
		'(이)': ['이', '']
	};

	var keywords2 = {
		'(으)로': ['으로', '로']
	};

	function isHangul(chr) {
		var code = chr.charCodeAt(0);
		return code >= 0xAC00 && code <= 0xD7A3;
	}

	function isTranslatable(chr) {
		var code = chr.charCodeAt(0);
		return (code >= 0xAC00 && code <= 0xD7A3) || (code >= 48 && code <= 57);
	}

	function hasFinalConsonant(chr) {
		var code = chr.charCodeAt(0);
		return (isHangul(chr) && ((code - 0xAC00) % 28 !== 0)) ||
			code === 48 || code === 49 || code === 51 || code === 54 || code === 55 || code === 56;
	}

	function hasFinalConsonantRieul(chr) {
		var code = chr.charCodeAt(0);
		return (isHangul(chr) && ((code - 0xAC00) % 28 === 8)) ||
			code === 49 || code === 55 || code === 56;
	}

	function Hanp() {
		this._keywords1 = keywords1Half;
		this._forceTranslate = false;
	}

	Hanp.prototype._translate = function(msg, keywords, checkFunction) {
		var translatedMsg = msg;
		var keywordsKeys = Object.keys(keywords);
		for (var i = 0; i < keywordsKeys.length; i++) {
			var keyword = keywordsKeys[i];
			var msgParts = translatedMsg.split(keyword);
			if (msgParts.length < 2) continue;
			translatedMsg = '';
			for (var j = 0, l = msgParts.length-1; j < l; j++) {
				translatedMsg += msgParts[j];
				var lastChr = msgParts[j].charAt(msgParts[j].length-1);
				var postposition;
				if (isTranslatable(lastChr))
					postposition = checkFunction(lastChr) ? keywords[keyword][0] : keywords[keyword][1];
				else postposition = this._forceTranslate ? keywords[keyword][0] : keyword;
				translatedMsg += postposition;
			}
			translatedMsg += msgParts[j];
		}
		return translatedMsg;
	};

	Hanp.prototype.translatePostpositions = function(msg, properties) {
		if (properties && properties.locale && properties.locale !== 'ko') return msg;

		msg = this._translate(msg, this._keywords1, hasFinalConsonant);
		msg = this._translate(msg, keywords2, function(chr) {
			return hasFinalConsonant(chr) && !hasFinalConsonantRieul(chr);
		});
		return msg;
	};

	Hanp.prototype.options = function(options) {
		if (options) {
			if (typeof options.halfTranslate !== 'undefined') {
				this._keywords1 = options.halfTranslate ? keywords1Half : keywords1Full;
			}
            if (typeof options.forceTranslate !== 'undefined') this._forceTranslate = options.forceTranslate;
		}
	};

	Hanp.prototype.expressBind = function(app) {
		var self = this;
		app.use(function(req, res, next) {
			// override __() and __n() which come from i18n or i18n-2
			if (res.locals) {
				if (typeof res.locals.__ === 'function') {
					res.locals._old__ = res.locals.__;
					res.locals.__ = function() {
						return self.translatePostpositions(res.locals._old__.apply(this, arguments));
					};
				}
				if (typeof res.locals.__n === 'function') {
					res.locals._old__n = res.locals.__n;
					res.locals.__n = function() {
						return self.translatePostpositions(res.locals._old__n.apply(this, arguments));
					};
				}
			}
			next();
		});
	};

	var hanp = new Hanp();
	Hanp.translatePostpositions = hanp.translatePostpositions.bind(hanp);
	Hanp.options = hanp.options.bind(hanp);
	Hanp.expressBind = hanp.expressBind.bind(hanp);
	if (typeof window === 'object') {
		// web browser
		window.Hanp = Hanp;
		window.hanp = hanp;
	}
	else if (typeof module === 'object' && typeof module.exports === 'object') {
		// node.js
		module.exports = Hanp;
	}
})();
