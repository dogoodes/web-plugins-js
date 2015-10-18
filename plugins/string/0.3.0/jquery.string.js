/**
 * jQuery String - Plugin v0.3.0
 *
 * @author : Alberto Cerqueira
 * @email : alberto.cerqueira1990@gmail.com
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
})(jQuery);