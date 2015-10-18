/**
 * jQuery String - Plugin v0.1.0
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
})(jQuery);