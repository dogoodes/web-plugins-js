/**
 * jQuery Validator - Plugin v1.0.0
 *
 * @author : Alberto Cerqueira
 * @email : alberto.cerqueira1990@gmail.com
 * 
 * @author : G6 | Technology
 * @email : alberto@g6-tech.com
 */
(function($) {
    $.fn.valid = (function(type) {
        var tn = this[0].tagName;
        var v = null;
        if (tn == "DIV") {
            v = this[0].innerHTML;
        } else if (tn == "INPUT") {
        	v = this[0].value;
        } else {
        	return false;
        }
        
		if (isBlank(v)) {
			return false;
		} else if (type == 'placa') {
			var p = onlyLettersAndNumbers(v);
			
			if (!p.match(/^[a-zA-Z]{3}\d{4}$/)){
				return false;
			}
		} else if (type == 'cep' && !v.match(/^[0-9]{2}.[0-9]{3}-[0-9]{3}$/) && !v.match(/^[0-9]{5}-[0-9]{3}$/) && !v.match(/^[0-9]{8}$/)) {
			return false;
        } else if (type == 'url' && !v.match(/^(http:\/\/)?([a-z0-9\-]+\.)?[a-z0-9\-]+\.[a-z0-9]{2,4}(\.[a-z0-9]{2,4})?(\/.*)?$/i) && !v.match(/^(https:\/\/)?([a-z0-9\-]+\.)?[a-z0-9\-]+\.[a-z0-9]{2,4}(\.[a-z0-9]{2,4})?(\/.*)?$/i)) {
        	return false;
        } else if (type == 'email') {
        	if (!v.match(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/)) {
        		return false;
        	}
        	if (v.indexOf(' ') != -1 || v.indexOf('..') != -1) {
        		return false;
        	}
        } else if (type == 'cnpj') {
        	var c = onlyNumbers(v);
			
			if (c.length != 14) {
			    return false;
			}
		     
			// elimina CNPJ's inválidos conhecidos
			if (c == "00000000000000" || c == "11111111111111" || c == "22222222222222" || c == "33333333333333" || c == "44444444444444" || c == "55555555555555" || c == "66666666666666" || c == "77777777777777" || c == "88888888888888" || c == "99999999999999") {
				return false;
			}
			     
			// valida DVs
			var t = c.length - 2;
			var n = c.substring(0,t);
			var d = c.substring(t);
			var s = 0;
			var p = t - 7;
			for (var i = t; i >= 1; i--) {
				s += n.charAt(t - i) * p--;
				if (p < 2) {
					p = 9;
				}
			}
			var r = s % 11 < 2 ? 0 : 11 - s % 11;
			if (r != d.charAt(0)) {
			    return false;
			}
			     
			t = t + 1;
			n = c.substring(0,t);
			s = 0;
			p = t - 7;
			for (var i = t; i >= 1; i--) {
				s += n.charAt(t - i) * p--;
				if (p < 2) {
					p = 9;
				}
			}
			r = s % 11 < 2 ? 0 : 11 - s % 11;
			if (r != d.charAt(1)) {
				return false;
			}
        } else if (type == 'cpf') {
        	var c = onlyNumbers(v);
			
			// elimina CPF's inválidos conhecidos
			if (c.length != 11 || c == "00000000000" || c == "11111111111" || c == "22222222222" || c == "33333333333" || c == "44444444444" || c == "55555555555" || c == "66666666666" || c == "77777777777" || c == "88888888888" || c == "99999999999") {
				return false;
			}
		    var a = 0;
		    for (var i=0; i < 9; i ++) {
		    	a += parseInt(c.charAt(i)) * (10 - i);
		    }
		    var r = 11 - (a % 11);
		    if (r == 10 || r == 11) {
		    	r = 0;
		    }
		    if (r != parseInt(c.charAt(9))) {
		    	return false;
		    }
		    a = 0;
		    for (var i = 0; i < 10; i ++) {
		    	a += parseInt(c.charAt(i)) * (11 - i);
		    }
		    r = 11 - (a % 11);
		    if (r == 10 || r == 11) {
		    	r = 0;
		    }
		    if (r != parseInt(c.charAt(10))) {
		    	return false;
		    }
        }
        
		return true;
    });
    
    function onlyNumbers(value) {
		return value.replace(/[^\d]+/g, '');
	};
    
    function replaceOnlyLettersAndNumbers(v) {
    	return v.replace(/[^a-zA-Z 0-9]/g, '');
	};
    
    function isBlank (v) {
    	return v == "" || v == "null" || v == "undefined" || v == undefined || v == null || typeof(v) == "undefined";
    };
})(jQuery);