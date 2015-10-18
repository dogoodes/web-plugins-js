var script = document.createElement('script');
script.src = 'http://www.google.com/jsapi';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

function loadJSversion(version) {
	//google.load("jquery", "1.2.6");
	google.load("jquery", version);
}