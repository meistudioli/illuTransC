(function() {
	var pack;
	if (typeof navigator.scriptList == 'undefined') navigator.scriptList = [];

	pack = [
		'js/common.js',
		'js/ExifReader-min.js',
		'js/illuTransCClass.js'
	];

	for (var i=-1,l=pack.length;++i<l;) {
		var path = pack[i], script;
		if (navigator.scriptList.indexOf(path) != -1) continue;
		navigator.scriptList.push(path);
		script = document.createElement('script');
		document.head.appendChild(script);
		script.async = true;
		script.src = path;
	}//end for

	if (document.currentScript) {
		pack = document.currentScript;
		pack.parentNode.removeChild(pack);
	}//end if
})();
/*programed by mei(李維翰), http://www.facebook.com/mei.studio.li*/