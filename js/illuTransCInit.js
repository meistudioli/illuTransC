var init;

init = {
	iid: '',
	warn: '',
	coolTime: 8000,
	display: function(msg) {
		var warn;
		clearTimeout(this.iid);
		this.warn.textContent = msg;
		this.warn.classList.add('act');
		warn = this.warn;
		this.iid = setTimeout(
			function() {
				warn.classList.remove('act');
			}
		, this.coolTime);
	},
	callBackA: function(action) {
		var action, msg;

		switch (action) {
			case 'blockByUploading':
				msg = 'Images uploading. Tey later please.';
				break;
			case 'blockByFull':
				msg = 'Upload images has reached the maxmun amount.';
				break;
			case 'empty':
				msg = 'Files you picked might not normal image. Try again please.';
				break;
			case 'format':
				msg = 'Some files you picked might not normal image.';
				break;
			case 'exceed':
				msg = 'Upload images exceed the maxmun amount, "' + arguments[1].acceptAmount + '" images were accepted.';
				break;
			case 'uploadFail':
				msg = 'Error occured. You can click the error images to remove them or system will auto remove after few seconds.';
				break;
		}//end switch

		//clear message
		if (['view', 'delete', 'sorting'].indexOf(action) != -1) init.warn.classList.remove('act');

		if (msg) init.display(msg);
	},
	callBackB: function() {
		console.log(arguments);
	}
};

function pageInit() {
	var illuTrans, iid, c, max;

	//init
	init.warn = document.querySelector('.warn');

	//addCallback
	illuTrans = document.querySelector('illu-trans');
	c = 0;
	max = 10000;
	iid = setInterval(
		function() {
			c += 5;
			if (c >= max) {
				clearInterval(iid);
				return;
			}//end if

			if (illuTrans.addCallback) {
				clearInterval(iid);
				illuTrans.addCallback(init.callBackA);
				illuTrans.addCallback(init.callBackA);
				illuTrans.addCallback(init.callBackB);
				illuTrans.addCallback(init.callBackB);
				illuTrans.removeCallback(init.callBackB);
			}//end if
		}
	, 5);
}
/*programed by mei(李維翰), http://www.facebook.com/mei.studio.li*/