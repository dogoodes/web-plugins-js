/**
 * jQuery Generator - Plugin v0.1.0
 *
 * @author : Alberto Cerqueira
 * @email : alberto.cerqueira1990@gmail.com
 */
(function($){
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
})(jQuery);