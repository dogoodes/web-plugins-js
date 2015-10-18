/**
 * jQuery String - Plugin v1.0.0
 * 
 * @author : Alberto Cerqueira
 * @email : alberto.cerqueira1990@gmail.com
 *
 * @author : G6 | Technology
 * @email : alberto@g6-tech.com
 */
(function($) {
    $.fn.isBlank = function() {
        var tagName = this[0].tagName;
        
        if (tagName == "DIV") {
            return $.isBlank(this[0].innerHTML);
        } else if (tagName == "INPUT") {
            return $.isBlank(this[0].value);
        } else {
            return true;
        }
    };
    
    $.isBlank = (function(v) {
    	return v == "" || v == "null" || v == "undefined" || v == undefined || v == null || typeof(v) == "undefined";
    });
    
    $.fn.trim = function() {
        var tagName = this[0].tagName;
        
        if (tagName == "DIV") {
            return $.trim(this[0].innerHTML);
        } else if (tagName == "INPUT") {
            return $.trim(this[0].value);
        } else {
            return true;
        }
    };
    
    $.trim = (function(v) {
    	return v.replace(/[' ']/g, "");
    });
    
    $.fn.normalize = function(isHasBlankSpace) {
        var tagName = this[0].tagName;
        
        if (tagName == "DIV") {
            return $.normalize(this[0].innerHTML, isHasBlankSpace);
        } else if (tagName == "INPUT") {
            return $.normalize(this[0].value, isHasBlankSpace);
        } else {
            return true;
        }
    };
    
    $.normalize = (function(v, isHasBlankSpace) {
	    if ($.isBlank(isHasBlankSpace)) {
	    	isHasBlankSpace = false;
	    }
	    var from  = "àáâãäåæçèéêëìíîïðñòóôõöøùúûüýþßàáâãäåæçèéêëìíîïðñòóôõöøùúûýýþÿŕŕ";
	    var to    = "aaaaaaaceeeeiiiidnoooooouuuuybsaaaaaaaceeeeiiiidnoooooouuuyybyrr";
	    var alphanumeric = /^[0-9a-zA-Z]+$/;
	    
	    for (var i = 0, x = from.length; i < x; i++) {
	        char_re = new RegExp(from.charAt(i), "gim");
	        v = v.replace(char_re, to.charAt(i));
	    }
	    
	    var str = [];
	    for (var i = 0, x = v.length; i < x; i++) {
	        if (v.charAt(i).match(alphanumeric) || (v.charAt(i) == " " && isHasBlankSpace)) {
	            str.push(v.charAt(i));
	        }
	    }
	    return str.join('');
	});
    
    $.fn.replaceOnlyLetters = function() {
    	var tagName = this[0].tagName;
        
        if (tagName == "DIV") {
            return $.onlyLetters(this[0].innerHTML);
        } else if (tagName == "INPUT") {
            return $.onlyLetters(this[0].value);
        } else {
            return true;
        }
    };
    
    $.onlyLetters = (function(v) {
		return v.replace(/[^a-zA-Z]/g, '');
	});
    
    $.fn.replaceOnlyLettersAndNumbers = function() {
    	var tagName = this[0].tagName;
        
        if (tagName == "DIV") {
            return $.replaceOnlyLettersAndNumbers(this[0].innerHTML);
        } else if (tagName == "INPUT") {
            return $.replaceOnlyLettersAndNumbers(this[0].value);
        } else {
            return true;
        }
    };
    
    $.replaceOnlyLettersAndNumbers = (function(v) {
    	return v.replace(/[^a-zA-Z 0-9]/g, '');
	});
    
    $.fn.leftPad = function(character, size) {
    	var tagName = this[0].tagName;
        
        if (tagName == "DIV") {
            return $.leftPad(this[0].innerHTML, character, size);
        } else if (tagName == "INPUT") {
            return $.leftPad(this[0].value, character, size);
        } else {
            return true;
        }
    };
    
    $.leftPad = (function(str, character, size) {
		if (str != null) {
			var delta = size - ("" + str).length;
			for (var i = 0 ; i < delta ; i++) {
				str = character + str;
			}
		}
		return str;
	});
})(jQuery);