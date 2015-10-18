/**
 * jQuery Generator - Plugin v1.0.0
 *
 * @author : Alberto Cerqueira
 * @email : alberto.cerqueira1990@gmail.com
 * 
 * @author : G6 | Technology
 * @email : alberto@g6-tech.com
 */
(function($){
	/*
	 * Matriz contendo em cada linha indices (inicial e final) da tabela ASCII para retornar alguns caracteres.
	 * [48, 57] = numeros;
	 * [65, 90] = letras maiusculas;
	 * [97, 122] = letras minusculas;
	 * http://www.asciitable.com/
	 */
	var asciiAlphanumeric = [[48, 57], [65, 90], [97, 122]];
	var asciiOnlyLetters = [[65, 90], [97, 122]];
	var asciiOnlyLettersCapital = [[65, 90]];
	var asciiOnlyLettersSmall = [[97, 122]];
	//var asciiOnlyNumbers = [[48, 57]];
	var asciiSpecial = [[33, 47], [58, 64], [91, 96], [123, 126]];
	//var ascii = [[33, 126]];
	
	$.fn.generatorChars = function(settings) {
		var config = {
			'max'	 : 100,
			'letter' : "small",
		    'tagName': 'input'
		};
		if (settings) {
			$.extend(config, settings);
		}
		var asciiLetters = null;
		if (config.letter == 'small') {
			asciiLetters = asciiOnlyLettersSmall;
		} else if (config.letter == 'capital') {
			asciiLetters = asciiOnlyLettersCapital;
		} else {
			asciiLetters = asciiOnlyLetters;
		}
		
		return this.each(function() {
			if (config.tagName == 'input') {
				$(this).val($.generatorChars(config.max, asciiLetters));
			} else if (config.tagName == 'div') {
				$(this).append($.generatorChars(config.max, asciiLetters));
			} else {
				$.generatorChars(config.max, asciiLetters);
			}
		});
	};
	
	$.generatorChars = function(max, asciiLetters) {
		var char = [''];
		for (var x = 0; x < max; x++) {
			var i = Math.floor(Math.random() * asciiLetters.length);
			char.push(String.fromCharCode(Math.floor(Math.random() * (asciiLetters[i][1] - asciiLetters[i][0])) + asciiLetters[i][0]));
		}
		return char.join('');
	};
	
	$.fn.generatorNumber = function(settings) {
		var config = {
			'min'	 : 1,
			'max'	 : 100,
	        'tagName': 'input'
	    };
	    if (settings) {
	    	$.extend(config, settings);
	    }

		return this.each(function() {
			if (config.tagName == 'input') {
				$(this).val($.generatorNumber(config.min, config.max));
			} else if (config.tagName == 'div') {
				$(this).append($.generatorNumber(config.min, config.max));
			} else {
				$.generatorNumber(config.min, config.max);
			}
		});
	};

	$.generatorNumber = function(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	};
	
	$.fn.generatorPassword = function(settings) {
		var config = {
			'max'	 : 8,
			'level'  : 3,
		    'tagName': 'input'
		};
		if (settings) {
			$.extend(config, settings);
		}
		
		return this.each(function() {
			if (config.tagName == 'input') {
				$(this).val($.generatorPassword(config.max, config.level));
			} else if (config.tagName == 'div') {
				$(this).append($.generatorPassword(config.max, config.level));
			} else {
				$.generatorPassword(config.max, config.level);
			}
		});
	};
	
	/**
	 * level between 1 and 7
	 */
	$.generatorPassword = (function(max, level) {
		var passowrd = [''];
		
		function replaceChar(c) {
			if (c == "a" || c == "A") {
				return "@";
			} else if (c == "e" || c == "E") {
				return "&";
			} else if (c == "i" || c == "I") {
				return "1";
			} else if (c == "s" || c == "S") {
				return "$";
			} else if (c == "x" || c == "x") {
				return "%";
			} else if (c == "b" || c == "B") {
				return "#";
			} else if (c == "o" || c == "O") {
				return "0";
			} else {
				return c;
			}
		};
		
		for (var x = 0; x < max; x++) {
			if (level == 1) { // just small letters
        		var i = Math.floor(Math.random() * asciiOnlyLettersSmall.length);
        		passowrd.push(String.fromCharCode(Math.floor(Math.random() * (asciiOnlyLettersSmall[i][1] - asciiOnlyLettersSmall[i][0])) + asciiOnlyLettersSmall[i][0]));
        	} else if (level == 2) { // just letters
        		var i = Math.floor(Math.random() * asciiOnlyLetters.length);
        		passowrd.push(String.fromCharCode(Math.floor(Math.random() * (asciiOnlyLetters[i][1] - asciiOnlyLetters[i][0])) + asciiOnlyLetters[i][0]));
        	} else if (level == 3) { // just alphanumeric
        		var i = Math.floor(Math.random() * asciiAlphanumeric.length);
        		passowrd.push(String.fromCharCode(Math.floor(Math.random() * (asciiAlphanumeric[i][1] - asciiAlphanumeric[i][0])) + asciiAlphanumeric[i][0]));
        	} else if (level == 4) { // alphanumeric and replaceChar function
        		var i = Math.floor(Math.random() * asciiAlphanumeric.length);
        		var char = String.fromCharCode(Math.floor(Math.random() * (asciiAlphanumeric[i][1] - asciiAlphanumeric[i][0])) + asciiAlphanumeric[i][0]);
        		var newChar = replaceChar(char);
        		passowrd.push(newChar);
        	} else if (level == 5) { // alphanumeric and special character every 3
        		var i = Math.floor(Math.random() * asciiAlphanumeric.length);
        		passowrd.push(String.fromCharCode(Math.floor(Math.random() * (asciiAlphanumeric[i][1] - asciiAlphanumeric[i][0])) + asciiAlphanumeric[i][0]));
                if ((x % 3 == 0) && (x < max - 1)) {
                	i = Math.floor(Math.random() * asciiSpecial.length);
	        		passowrd.push(String.fromCharCode(Math.floor(Math.random() * (asciiSpecial[i][1] - asciiSpecial[i][0])) + asciiSpecial[i][0]));
	        		x++;
                };
        	} else if (level == 6) { // alphanumeric and special character every 2
        		var i = Math.floor(Math.random() * asciiAlphanumeric.length);
        		passowrd.push(String.fromCharCode(Math.floor(Math.random() * (asciiAlphanumeric[i][1] - asciiAlphanumeric[i][0])) + asciiAlphanumeric[i][0]));
                if ((x % 2 == 0) && (x < max - 1)) {
                	i = Math.floor(Math.random() * asciiSpecial.length);
	        		passowrd.push(String.fromCharCode(Math.floor(Math.random() * (asciiSpecial[i][1] - asciiSpecial[i][0])) + asciiSpecial[i][0]));
	        		x++;
                };
        	} else if (level == 7) { // just special character
                var i = Math.floor(Math.random() * asciiSpecial.length);
        		passowrd.push(String.fromCharCode(Math.floor(Math.random() * (asciiSpecial[i][1] - asciiSpecial[i][0])) + asciiSpecial[i][0]));
        	} else {
        		passowrd.push("passowrd");
        		break;
        	};
        };
        
        return passowrd.join('');
	});
	
	$.fn.generatorCardDrive = function(settings) {
		var config = {
		    'tagName'	: 'input',
		    'codCountry': 'BR'//TODO: 
		};
		if (settings) {
			$.extend(config, settings);
		}
			
		return this.each(function() {
			if (config.tagName == 'input') {
				$(this).val($.generatorCardDrive());
			} else if (config.tagName == 'div') {
				$(this).append($.generatorCardDrive());
			} else {
				$.generatorCardDrive();
			}
		});
	};
	
	$.generatorCardDrive = (function() {
		return $.generatorChars(3, asciiOnlyLettersCapital) + "-" + $.generatorNumber(1000, 9999);
	});
})(jQuery);