var illuTransC = function(id, data) {
	var buffer, e, host, ins;
	this.id = id;
	this.Data = data;
	this.Ens = {};
	host = (typeof this.Data.wrapper == 'string') ? document.querySelector(this.Data.wrapper) : this.Data.wrapper;
	if (!this.determine() || !host) return;

	if (!host.id) host.id = 'illuTransC-' + this.id + getRand(1, 10000);
	e = {};
	this.Ens.host = host;
	this.Ens.callBacks = [];
	this.Data.max = (typeof data.max != 'undefined' && parseInt(data.max, 10) == data.max) ? data.max : this.default.max;
	this.Data.actAmt = 0;
	this.Data.iid = '';
	this.Data.iid4Remove = '';
	this.Data.sData = {};
	this.Data.isDrag = false;
	this.Data.listData = {};
	this.Data.name = data.inputName || this.default.inputName;
	this.Data.inputOriginID = 'illuTrans-' + this.id + '-inputOrigin' + getRand(1, 10000);
	this.Ens.cd = '';//current drag

	//correct
	this.correct();

	//init
	buffer = mk();

	host.Data = { ClassID:this.id };
	buffer = this.template.cloneNode(true);
	if (this.wc.ShadowDOM) {
		e.root = host[this.wc.ShadowDOM]();
		e.root.innerHTML = '<style>' + this.cssStr + '</style>';
		this.Ens.sheet = e.root.querySelector('style');
		e.root.appendChild(buffer);
		e.scope = '';
	} else {
		empty(host);
		host.appendChild(mk('', {tag:'h3', att:{innerHTML:'illuTrans'}}));
		host.appendChild(buffer);
		e.root = host;
		e.scope = '#' + host.id + ' ';
	}//end if

	//style
	if (this.Data.col != 5) createCSSClass(e.scope+'ul li', 'width:'+(100/this.Data.col)+'%;', this.Ens.sheet);

	e.ul = e.root.querySelector('ul');
	e.ul.Data = { ClassID:this.id };
	this.Ens.main = e.ul;

	ins = this;
	e.root.querySelector('.blocker').addEventListener('click',
		function() {
			if (ins.Ens.host.classList.contains('mod-upload-fail')) {
				clearTimeout(ins.Data.iid4Remove);
				ins.removeFails();
				return;
			}//end if
		}
	, false);

	//DOM
	empty(host, '.data-collect');
	e.dataCollect = mk('data-collect');
	host.appendChild(e.dataCollect);
	this.Ens.listing = e.ul;
	this.Ens.dataCollect = e.dataCollect;
	this.genLists();

	e.trigger = mk('trigger', {tag:'label'});
	this.Ens.trigger = e.trigger;
	e.trigger.htmlFor = this.Data.inputOriginID;
	e.triVanquish = mk('vanquish');
	this.Ens.triVanquish = mk('vanquish');
	e.trigger.appendChild(this.Ens.triVanquish);
	e.trigger.appendChild(mk('', {tag:'em', att:{innerHTML:'+'}}));
	this.triggerPlace();

	if (this.type == 'basic') {
		if (this.wc.ShadowDOM) {
	    	this.Ens.vanquish = mk('vanquish');
	    	e.root.appendChild(this.Ens.vanquish);
		}//end if
		e.vanquish = this.outVanquish || this.Ens.vanquish;
    	this.Data.dataTunnel = 'illuTrans-' + this.id + '-dataTunnel' + getRand(1, 10000);
    	this.Ens.funcHost = '';
    	this.Ens.callBackE = '';

		e.form = mk('', {tag:'form'});
		e.form.Data = {ClassID:this.id};
        e.form.setAttribute('method', 'post');
        e.form.setAttribute('enctype', 'multipart/form-data');
        e.vanquish.appendChild(e.form);//avoid form in form
        Object.keys(this.Data.params).forEach(
        	function(key) {
        		var value, input;
        		value = this.Data.params[key];
        		input = mk('', {tag:'input', att:{type:'hidden', name:key, value:value}});
        		e.form.appendChild(input);
        	}
        , this);
        e.form.appendChild(mk('', {tag:'input', att:{type:'submit', value:'submit'}}));
    	this.Ens.form = e.form;
    	nodeAppend(e.vanquish, '<iframe name="' + this.Data.dataTunnel +'" frameborder="0" scrolling="0"></iframe>');//avoid form in form, msie7 can't just set name attribute
	} else {
		//chamber
		e.chamber = mk('chamber');
		host.appendChild(e.chamber);
		e.chamberInput = this.trigger.cloneNode(true);
		e.chamber.appendChild(e.chamberInput);
		e.chamberInput.addEventListener('change',
			function(evt) {
				ins.eAct(evt);
			}
		, false);
		this.Ens.chamberInput = e.chamberInput;
	}//end if
	this.mkTrigger();

	//evt
	if (typeof this.anis != 'undefined') this.Ens.main.addEventListener(this.anis.eventTransition, this.tEndG, false);
	['click', this.pursuer.down].forEach(
		function(evt) {
			this.Ens.main.addEventListener(evt, this.eActG, false);
		}
	, this);

	// method bundle
	if (!this.wc.CustomElements) {
		Object.defineProperties(this.Ens.host, illuTransC.prototype.properties);
		//attrChange
		if (this.observer) {
			e.config = {
				attributes: true
			};
			this.observer.observe(host, e.config);
		}//end if		
	}//end if

	//clear
	for (var i in e) e[i] = null;
	e = null;

	//remove hidden
	host.removeAttribute('hidden');

	this.refresh();

	//isReady
	this.Data.isReady = true;

	//placeholder
	if (this.Data.placeholder) {
		this.placeholder(JSON.parse(JSON.stringify(this.Data.placeholder)));
		this.Data.placeholder = null;
	}//end if

	//i13n
	this.i13n('moduleView', 'illuTransC');
};

illuTransC.prototype = {
	tagname: 'illu-trans',
	dependencies: [
		'createCSSClass',
		'ExifReader'
	],
	conf: {
		transparent: 'data:gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
		error: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSczMicgaGVpZ2h0PSczMicgdmlld0JveD0nMCAwIDMyIDMyJz48cGF0aCBmaWxsPScjZWQzNzI5JyBkPSdNMTYgMi45bDEzLjQxIDI2LjcyNUgyLjU5TDE2IDIuOXpNMTYgMGMtLjY5IDAtMS4zOC40NjUtMS45MDMgMS4zOTVMLjQzNyAyOC42MTdDLS42MDcgMzAuNDc3LjI4MyAzMiAyLjQxOCAzMkgyOS41OGMyLjEzNCAwIDMuMDI1LTEuNTIyIDEuOTc4LTMuMzgzTDE3LjkgMS4zOTVDMTcuMzguNDY1IDE2LjY5IDAgMTYgMHonLz48cGF0aCBmaWxsPScjZWQzNzI5JyBkPSdNMTggMjZjMCAxLjEwNS0uODk1IDItMiAycy0yLS44OTUtMi0yIC44OTUtMiAyLTIgMiAuODk1IDIgMnpNMTYgMjJjLTEuMTA1IDAtMi0uODk1LTItMnYtNmMwLTEuMTA1Ljg5NS0yIDItMnMyIC44OTUgMiAydjZjMCAxLjEwNS0uODk1IDItMiAyeicvPjwvc3ZnPg==',
		add: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSczMicgaGVpZ2h0PSczMicgdmlld0JveD0nMCAwIDMyIDMyJz48cGF0aCBmaWxsPScjNDg5Y2I5JyBkPSdNMTYgMjlDOC44MiAyOSAzIDIzLjE4IDMgMTZTOC44MiAzIDE2IDNzMTMgNS44MiAxMyAxMy01LjgyIDEzLTEzIDEzem0wLTIzQzEwLjQ3OCA2IDYgMTAuNDc3IDYgMTZjMCA1LjUyMiA0LjQ3OCAxMCAxMCAxMCA1LjUyMyAwIDEwLTQuNDc4IDEwLTEwIDAtNS41MjMtNC40NzctMTAtMTAtMTB6bTMuOTg4IDExaC0zdjNjMCAuNTUzLS40NDggMS0xIDEtLjU1MyAwLTEtLjQ0Ny0xLTF2LTNoLTNjLS41NTMgMC0xLS40NDgtMS0xcy40NDctMSAxLTFoM3YtM2MwLS41NTMuNDQ3LTEgMS0xIC41NTIgMCAxIC40NDcgMSAxdjNoM2MuNTUyIDAgMSAuNDQ4IDEgMXMtLjQ0OCAxLTEgMXonLz48L3N2Zz4=',
		view: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxNicgaGVpZ2h0PScxNicgdmlld0JveD0nMCAwIDE2IDE2Jz48cGF0aCBmaWxsPScjNDg5Y2I5JyBkPSdNMTUuNTYgMTUuNTZjLS41ODcuNTg3LTEuNTM4LjU4Ny0yLjEyNSAwbC0yLjY1Mi0yLjY1MmMtMS4wOS43LTIuMzggMS4xMTYtMy43NyAxLjExNkMzLjE0IDE0LjAyNCAwIDEwLjg4NCAwIDcuMDEyUzMuMTQgMCA3LjAxMiAwYzMuODczIDAgNy4wMTIgMy4xNCA3LjAxMiA3LjAxMiAwIDEuMzktLjQxNyAyLjY4LTEuMTE2IDMuNzdsMi42NTIgMi42NTNjLjU4Ny41ODcuNTg3IDEuNTM4IDAgMi4xMjV6TTcuMDEyIDIuMDAzYy0yLjc2NiAwLTUuMDEgMi4yNDItNS4wMSA1LjAxczIuMjQ0IDUuMDA4IDUuMDEgNS4wMDhjMi43NjYgMCA1LjAxLTIuMjQgNS4wMS01LjAwOHMtMi4yNDMtNS4wMS01LjAxLTUuMDF6Jy8+PC9zdmc+',
		viewHover: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxNicgaGVpZ2h0PScxNicgdmlld0JveD0nMCAwIDE2IDE2Jz48cGF0aCBmaWxsPScjZmZmJyBkPSdNMTUuNTYgMTUuNTZjLS41ODcuNTg3LTEuNTM4LjU4Ny0yLjEyNSAwbC0yLjY1Mi0yLjY1MmMtMS4wOS43LTIuMzggMS4xMTYtMy43NyAxLjExNkMzLjE0IDE0LjAyNCAwIDEwLjg4NCAwIDcuMDEyUzMuMTQgMCA3LjAxMiAwYzMuODczIDAgNy4wMTIgMy4xNCA3LjAxMiA3LjAxMiAwIDEuMzktLjQxNyAyLjY4LTEuMTE2IDMuNzdsMi42NTIgMi42NTNjLjU4Ny41ODcuNTg3IDEuNTM4IDAgMi4xMjV6TTcuMDEyIDIuMDAzYy0yLjc2NiAwLTUuMDEgMi4yNDItNS4wMSA1LjAxczIuMjQ0IDUuMDA4IDUuMDEgNS4wMDhjMi43NjYgMCA1LjAxLTIuMjQgNS4wMS01LjAwOHMtMi4yNDMtNS4wMS01LjAxLTUuMDF6Jy8+PC9zdmc+',
		delete: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSczMicgaGVpZ2h0PSczMicgdmlld0JveD0nMCAwIDMyIDMyJz48cGF0aCBmaWxsPScjNDg5Y2I5JyBkPSdNMzEuMzY0LjY2OGMtLjg5LS44OS0yLjMzMi0uODktMy4yMjIgMEwxNi4wMyAxMi43OCAzLjkxOC42NjhjLS44OS0uODktMi4zMzMtLjg5LTMuMjIyIDAtLjg5Ljg5LS44OSAyLjMzMiAwIDMuMjIyTDEyLjgwOCAxNiAuNjk2IDI4LjExNWMtLjg5Ljg5LS44OSAyLjMzMiAwIDMuMjIyLjQ0NS40NDUgMS4wMjguNjY4IDEuNjEuNjY4czEuMTY2LS4yMjIgMS42MTItLjY2OEwxNi4wMyAxOS4yMjNsMTIuMTEyIDEyLjExM2MuNDQ1LjQ0NSAxLjAyOC42NjggMS42MS42NjhzMS4xNjYtLjIyMiAxLjYxMi0uNjY4Yy44OS0uODkuODktMi4zMzIgMC0zLjIyMkwxOS4yNTIgMTYgMzEuMzY0IDMuODljLjg5LS44OS44OS0yLjMzMiAwLTMuMjIyeicvPjwvc3ZnPg==',
		deleteHover: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSczMicgaGVpZ2h0PSczMicgdmlld0JveD0nMCAwIDMyIDMyJz48cGF0aCBmaWxsPScjZmZmJyBkPSdNMzEuMzY0LjY2OGMtLjg5LS44OS0yLjMzMi0uODktMy4yMjIgMEwxNi4wMyAxMi43OCAzLjkxOC42NjhjLS44OS0uODktMi4zMzMtLjg5LTMuMjIyIDAtLjg5Ljg5LS44OSAyLjMzMiAwIDMuMjIyTDEyLjgwOCAxNiAuNjk2IDI4LjExNWMtLjg5Ljg5LS44OSAyLjMzMiAwIDMuMjIyLjQ0NS40NDUgMS4wMjguNjY4IDEuNjEuNjY4czEuMTY2LS4yMjIgMS42MTItLjY2OEwxNi4wMyAxOS4yMjNsMTIuMTEyIDEyLjExM2MuNDQ1LjQ0NSAxLjAyOC42NjggMS42MS42NjhzMS4xNjYtLjIyMiAxLjYxMi0uNjY4Yy44OS0uODkuODktMi4zMzIgMC0zLjIyMkwxOS4yNTIgMTYgMzEuMzY0IDMuODljLjg5LS44OS44OS0yLjMzMiAwLTMuMjIyeicvPjwvc3ZnPg==',
		blank: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScyMDAnIGhlaWdodD0nMjAwJyB2aWV3Qm94PScwIDAgMjAwIDIwMCc+PHBhdGggZmlsbD0nI0YxRjFGMScgZD0nTTAgMGgyMDB2MjAwSDB6Jy8+PGcgZmlsbD0nIzQ1NDU0NSc+PHBhdGggZD0nTTEyNi44MjYgNzdjMCAuMDAyLjAwNC4wMDQuMDA4LjAwOHY0NS45ODdjLS4wMDQuMDAyLS4wMDYuMDA0LS4wMDguMDA4SDczLjE3MmMtLjAwMi0uMDA0LS4wMDYtLjAwNC0uMDA4LS4wMDhWNzcuMDA3Yy4wMDItLjAwMi4wMDQtLjAwNi4wMDgtLjAwOGg1My42NTR6bS4wMDgtMy44MzRINzMuMTY2Yy0yLjExIDAtMy44MzMgMS43MjYtMy44MzMgMy44MzR2NDZjMCAyLjEwOCAxLjcyNCAzLjgzNSAzLjgzMyAzLjgzNWg1My42NjhjMi4xMDcgMCAzLjgzMi0xLjcyNyAzLjgzMi0zLjgzNlY3N2MwLTIuMTEtMS43MjUtMy44MzQtMy44MzItMy44MzR6Jy8+PHBhdGggZD0nTTExOS4xNjYgODYuNTgzYzAgMy4xNzctMi41NzQgNS43NS01Ljc1IDUuNzVzLTUuNzUtMi41NzMtNS43NS01Ljc1YzAtMy4xNzYgMi41NzQtNS43NSA1Ljc1LTUuNzVzNS43NSAyLjU3NCA1Ljc1IDUuNzV6TTEyMi45OTggMTE5LjE2Nkg3N1YxMTEuNWwxMy40MTYtMjMgMTUuMzMyIDE5LjE2N2gzLjgzNmwxMy40MTQtMTEuNXYyM3onLz48L2c+PC9zdmc+'
	},
	default: {
		max: 5,
		legal: ['png', 'jpeg', 'gif'],
		limitSize: 10485760, //1024*1024*10, 10M
		col: 5,
		inputName: 'FieldData',
		stripWidth: 150, //px
		stripAmount: 10,
		uri: '',
		withCredentials: true,
		useLightbox: true,
		coolTime: 3000, //ms
		params: {}
	},
	determine: function() {
		if (typeof illuTransC.prototype.isSupport == 'undefined') {
			var anis = isAniSupport(), css = [], e = {};

			illuTransC.prototype.tagP = new RegExp(this.tagname, 'i');//tagName pattern
			illuTransC.prototype.anis = anis;
			illuTransC.prototype.wc = supportsWebComponents();
			illuTransC.prototype.pursuer = pursuer();
			illuTransC.prototype.ddSupport = (isEventSupported('drop')) ? true : false;
			illuTransC.prototype.isIE = (/.*msie.*/i.test(detectMSB())) ? true : false;
			//type (html5 || basic)
			illuTransC.prototype.type = ('multiple' in mk('', {tag:'input', att:{type:'file'}})) ? 'html5' : 'basic';
			illuTransC.prototype.snaps = [];
			illuTransC.prototype.URL = isAPISupport('URL');
			illuTransC.prototype.isiDevice = (typeof navigator.platform != 'undefined' && ['iphone', 'ipad', 'ipod'].indexOf(navigator.platform.toLowerCase()) != -1) ? true : false; 

			illuTransC.prototype.isSupport = true;
			illuTransC.prototype.observer = '';
			illuTransC.prototype.properties = {};

			if (typeof FileReader == 'undefined' || this.type == 'basic') illuTransC.prototype.URL = '';
			if (this.type == 'basic') illuTransC.prototype.wc = {};

			//animation
			if (typeof anis != 'undefined') {
				e.aniProgress = anis.transition + ':width 200ms ease-in,height 100ms ease-in;will-change:width,height;'
				e.aniPerspective = anis.perspective + ':500px;' + anis.transform + ':translate3d(0,0,0);';
				e.aniImg = anis.transform + '-style:preserve-3d;';
				e.aniBtn = anis.transform + ':translate3d(0,0,0) scale(.001);';
				e.aniPreview = anis.transform + ':scale(.001);';
				e.canvas = anis.transform + ':translateY(-100%);';
				e.lightBoxImg = anis.transform + ':scale(1);';
				e.lightBoxClose = anis.transform + ':scale(1);';
				e.trigger = 'will-change:opacity;' + anis.transition + ':opacity 200ms ease-in;'
				
				css.push({k:'.active a', v:'will-change:'+anis.transform+';'});
				css.push({k:'.active img', v:'will-change:'+anis.transform+';'});
				css.push({k:'.active .view', v:anis.transition + ':' + anis.transform +' 200ms 1200ms cubic-bezier(.17,.67,.5,1.7);' + anis.transform + ':translate3d(0,0,1px) scale(1);'});
				css.push({k:'.active .delete', v:anis.transition + ':' + anis.transform +' 200ms 1400ms cubic-bezier(.17,.67,.5,1.7);' + anis.transform + ':translate3d(0,0,1px) scale(1);'});
				css.push({k:'.active img', v:anis.transition + ':' + anis.transform + ' 1200ms cubic-bezier(.42,.42,.08,1.3);' + anis.transform + ':rotateY(720deg);'});
				css.push({k:'.trigger:active', v:anis.transform + ':translate(2px, 2px);'});
				css.push({k:'.erase', v:anis.transition + ':' + anis.transform + ' 400ms cubic-bezier(.91,-0.3,.43,.98);' + anis.transform + ':scale(.001);'+'will-change:'+anis.transform+';'});

				//sorting animation
				if (this.URL) {
					css.push({k:'.strips canvas:nth-child(1)', v:anis.transform+':translateY(0%);'+anis.animation+':none;filter:grayscale(100%);-moz-filter:grayscale(100%);-webkit-filter:grayscale(100%);'});
					css.push({k:'.fail .strips', v:'filter:grayscale(100%);-moz-filter:grayscale(100%);-webkit-filter:grayscale(100%);opacity:.3;visibility:visible;'});
					e.animation = '60% {' + anis.transform + ':translateY(0%);' + anis.aniTimeFunc + ':ease-in;} 70% {' + anis.transform + ':translateY(-10%);' + anis.aniTimeFunc + ':ease-out;} 80% {' + anis.transform + ':translateY(0%);' + anis.aniTimeFunc + ':ease-in;} 90% {' + anis.transform + ':translateY(-5%);' + anis.aniTimeFunc + ':ease-out;} 100% {' + anis.transform + ':translateY(0%);}';
				}//end if

				//lightBox
				e.lightBoxEffect0 = 'will-change:background;background:rgba(0,0,0,0);' + anis.transition + ':background 350ms cubic-bezier(.17,.67,.5,1.7);';
				e.lightBoxEffect1 = 'will-change:' + anis.transform + ';' + anis.transition + ':' + anis.transform + ' 350ms cubic-bezier(.17,.67,.5,1.7);' + anis.transform + ':scale(.001);';
				e.lightBoxEffect2 = 'will-change:' + anis.transform + ';' + anis.transition + ':' + anis.transform + ' 250ms 300ms cubic-bezier(.17,.67,.5,1.7);' + anis.transform + ':scale(.001);';
			} else {
				e.aniProgress = '';
				e.aniPerspective = '';
				e.aniImg = '';
				e.aniBtn = '';
				e.aniPreview = '';
				e.canvas = '';
				e.animation = '';
				e.lightBoxImg = '';
				e.lightBoxClose = '';
				e.lightBoxEffect0 = '';
				e.lightBoxEffect1 = '';
				e.lightBoxEffect2 = '';
				e.trigger = '';
			}//end if

			//css
			e.scope = (this.wc.ShadowDOM) ? '' : this.tagname + ' ';
			createCSSClass(this.tagname, 'position:relative;width:100%;display:block;user-select:none;-ms-user-select:none;-moz-user-select:none;-webkit-user-select:none;');
			createCSSClass(this.tagname+' .chamber', 'position:relative;width:0;height:0;padding:0;margin:0;background:transparent;border:0 none;box-shadow:none;overflow:hidden;');
			createCSSClass('#illuTransStand', 'position:absolute;background:#fff;border:1px solid #dedede;box-shadow:0 0 14px 2px rgba(0,0,0,.5);user-select:none;-ms-user-select:none;-moz-user-select:none;-webkit-user-select:none;filter:alpha(opacity=70);opacity:.7;z-index:2;');
			createCSSClass('#illuTransStand img', 'width:90%;height:auto;margin:5%;display:block;');
			createCSSClass('.illuTrans-tunnels', 'width:100%;height:0;padding:0;margin:0;background:transparent;border:0 none;box-shadow:none;overflow:hidden;');
			createCSSClass('.illuTrans-tunnels input', 'outline:0 none');
			createCSSClass('.vanquish', 'width:100%;height:0;padding:0;margin:0;background:transparent;border:0 none;box-shadow:none;overflow:hidden;');
			createCSSClass('#illuTransVessel', 'position:relative;width:0;height:0;overflow:hidden;display:none;');

			//lightBox
			createCSSClass('#illuTransLightBox', 'position:fixed;left:0;top:0;width:100%;height:0;background-color:rgba(0,0,0,.8);overflow:hidden;'+e.lightBoxEffect0);
			createCSSClass('#illuTransLightBox img', 'max-width:80%;max-height:80%;margin:auto;position:absolute;left:0;right:0;top:0;bottom:0;'+e.lightBoxEffect1);
			createCSSClass('#illuTransLightBox .close', 'position:absolute;right:0;top:0;width:8vmin;height:8vmin;background-size:50%;background-position:center;background-repeat:no-repeat;display:block;z-index:5;opacity:.7;text-indent:100%;white-space:nowrap;overflow:hidden;background-image:url(\'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSczMicgaGVpZ2h0PSczMicgdmlld0JveD0nMCAwIDMyIDMyJz48cGF0aCBmaWxsPScjRkZGJyBkPSdNMzEuMzYzLjY2OGMtLjg5LS44OS0yLjMzLS44OS0zLjIyIDBMMTYuMDMgMTIuNzggMy45MTguNjY4Yy0uODktLjg5LTIuMzMzLS44OS0zLjIyMiAwLS44OS44OS0uODkgMi4zMzIgMCAzLjIyMkwxMi44MDggMTYgLjY5NiAyOC4xMTVjLS44OS44OS0uODkgMi4zMyAwIDMuMjIyLjQ0NS40NDUgMS4wMjguNjY4IDEuNjEuNjY4czEuMTY2LS4yMjIgMS42MTItLjY2OEwxNi4wMyAxOS4yMjNsMTIuMTEzIDEyLjExM2MuNDQ0LjQ0NSAxLjAyNy42NjggMS42MS42NjhzMS4xNjUtLjIyMiAxLjYxLS42NjhjLjg5LS44OS44OS0yLjMzMiAwLTMuMjIyTDE5LjI1MyAxNmwxMi4xMS0xMi4xMWMuODktLjg5Ljg5LTIuMzMyIDAtMy4yMjJ6Jy8+PC9zdmc+\');'+e.lightBoxEffect2);
			createCSSClass('#illuTransLightBox.act', 'height:100%;background:rgba(0,0,0,.7);');
			createCSSClass('#illuTransLightBox.act img', 'border:0 none;'+e.lightBoxImg);
			createCSSClass('#illuTransLightBox.act .close', 'text-decoration:none;'+e.lightBoxClose);

			css.push({k:'h3', v:'display:none;'});
			css.push({k:'ul', v:'letter-spacing:-0.31em;*letter-spacing:normal;*word-spacing:-0.43em;text-rendering:optimizespeed;padding:0px;margin:0px;'});
			css.push({k:'li', v:'width:20%;display:inline-block;word-spacing:normal;letter-spacing:normal;vertical-align:top;zoom:1;*display:inline;text-rendering:auto;'});
			css.push({k:'.data-collect', v:'width:100%;height:0;padding:0;margin:0;overflow:hidden;visibility:hidden;'});
			css.push({k:'li div', v:'position:relative;margin:2.5%;background:#fff;border:1px dashed #bce5f9;overflow:hidden;'+e.aniPerspective});
			css.push({k:'.active', v:'cursor:move;'});
			css.push({k:'.active div', v:'border-color:#dedede;border-style:solid;'});
			css.push({k:'.active a', v:'visibility:visible;z-index:1;'});
			css.push({k:'li img', v:'width:90%;height:auto;margin:5%;background:#ecf7fc;display:block;pointer-events:none;background-image:repeating-linear-gradient(60deg,#fff,#fff 4px,#ecf7fc 4px,#ecf7fc 7px);background-image:-webkit-repeating-linear-gradient(60deg,#fff,#fff 4px,#ecf7fc 4px,#ecf7fc 7px);background-image:-moz-repeating-linear-gradient(60deg,#fff,#fff 4px,#ecf7fc 4px,#ecf7fc 7px);background-image:-ms-linear-gradient(60deg,#fff,#fff 4px,#ecf7fc 4px,#ecf7fc 7px);'+e.aniImg});

			css.push({k:'li a', v:'position:absolute;right:8%;top:8%;color:#1a9dbc;width:12%;height:12%;background:transparent;visibility:hidden;z-index:-1;'+e.aniImg+e.aniBtn});
			css.push({k:'li a em', v:'width:100%;height:100%;background-color:#fff;background-position:center;background-repeat:no-repeat;background-size:64%;border-radius:50%;text-indent:100%;*text-indent:-9999px;overflow:hidden;white-space:nowrap;display:block;cursor:pointer;'});
			css.push({k:'li a:hover em', v:'background-color:#57a4bf;'});
			css.push({k:'li .view', v:'left:8%;right:auto;'});
			css.push({k:'li .view em', v:'background-image:url('+this.conf.view+');'});
			css.push({k:'li .view:hover em', v:'background-image:url('+this.conf.viewHover+');'});
			css.push({k:'li .delete em', v:'background-image:url('+this.conf.delete+');background-size:56%;'});
			css.push({k:'li .delete:hover em', v:'background-image:url('+this.conf.deleteHover+');'});
			css.push({k:'li a:active em', v:'margin-left:2px;margin-top:2px;'});

			css.push({k:'.blank', v:'visibility:hidden;'});
			css.push({k:'.blank.active a', v:'display:none;'});
			css.push({k:'li .vanquish', v:'width:100%;height:0px;padding:0;margin:0;background:transparent;border:0 none;box-shadow:none;overflow:hidden;margin-top:-1px;'});
			css.push({k:'.vanquish input', v:'outline:0 none;'});

			css.push({k:'.trigger', v:'position:absolute;left:0;top:0;background:url('+this.conf.transparent+');width:100%;height:100%;margin:0;padding:0;border:0 none;cursor:pointer;display:block;'+e.trigger});
			css.push({k:'.trigger em', v:'position:absolute;left:50%;top:50%;width:36%;height:36%;margin-left:-18%;margin-top:-18%;border-radius:50%;background:url('+this.conf.add+') center no-repeat;background-origin:content-box;background-size:100%;text-indent:100%;overflow:hidden;white-space:nowrap;'});
			css.push({k:'.trigger.hide', v:'top:-100%;'});

			css.push({k:'.trigger .tunnel-wrap', v:'position:absolute;width:100%;height:100%;'});
			css.push({k:'.progress', v:'position:absolute;left:0;top:0;width:100%;height:100%;background:transparent;margin:0;padding:0;border:0 none;overflow:hidden;visibility:hidden;z-index:-1;'});
			css.push({k:'.progress p', v:'position:absolute;left:0;top:50%;font-family:Helvetica;font-size:125%;color:#489cb9;width:100%;text-align:center;margin-top:-20px;text-shadow:0 2px 2px rgba(0,0,0,.2);'});
			css.push({k:'.progress p em', v:'font-size:200%;'});
			css.push({k:'.progress .decoration', v:'position:absolute;width:0;height:0;background:transparent;box-shadow:none;border:2px solid #489cb9;text-indent:100%;white-space:nowrap;overflow:hidden;'+e.aniProgress});
			css.push({k:'div .progress .corner-lb', v:'left:0;bottom:0;border-top:0 none;border-right:0 none;'});
			css.push({k:'div .progress .corner-rt', v:'right:0;top:0;border-bottom:0 none;border-left:0 none;'});
			css.push({k:'.strips', v:'position:absolute;left:0;top:0;width:90%;height:90%;background:transparent;border:0 none;margin:5%;overflow:hidden;visibility:hidden;z-index:-1;'});
			css.push({k:'.strips canvas', v:'position:absolute;left:0;top:0;width:100%;height:100%;'+e.canvas});
			css.push({k:'.upload>div', v:'border-style:solid;'});
			css.push({k:'.upload .progress', v:'visibility:visible;z-index:1;'});
			css.push({k:'.upload .strips', v:'visibility:visible;z-index:1;'});
			css.push({k:'.upload img', v:'background:#ffe3f1;background-image:repeating-linear-gradient(60deg,#fff,#fff 4px,#ffe3f1 4px,#ffe3f1 7px);background-image:-webkit-repeating-linear-gradient(60deg,#fff,#fff 4px,#ffe3f1 4px,#ffe3f1 7px);background-image:-moz-repeating-linear-gradient(60deg,#fff,#fff 4px,#ffe3f1 4px,#ffe3f1 7px);background-image:-ms-linear-gradient(60deg,#fff,#fff 4px,#ffe3f1 4px,#ffe3f1 7px);'});

			/*fail*/
			css.push({k:'.fail>div', v:'border-style:solid;'});
			css.push({k:'.fail .progress .decoration', v:'border-color:#ed3729;'});
			css.push({k:'.fail .progress p', v:'color:#ed3729;display:none;'});
			css.push({k:'.fail .progress span', v:'display:block;'});
			css.push({k:'.fail .progress', v:'background-size:13%;background-position:92% 92%;background-repeat:no-repeat;background-image:url('+this.conf.error+');visibility:visible;z-index:2;opacity:.8;'});
			css.push({k:'.fail img', v:'background:transparent;'});

			css.push({k:'.blocker', v:'position:absolute;left:0;top:0;width:100%;height:100%;background:url('+this.conf.transparent+');z-index:2;display:none;'});
			css.push({k:'.blocker p', v:'position:absolute;left:0;top:50%;font-family:"futura-pt-1",Helvetica;font-size:300%;color:#ff0084;width:100%;text-align:center;margin-top:-24px;text-shadow:0 2px 2px rgba(0,0,0,.2);display:none;'});
			css.push({k:'.active.current-drag', v:'visibility:hidden;z-index:2;'});
			css.push({k:'.active.current-drag a', v:'visibility:hidden;'});

			if (!this.wc.ShadowDOM) {
				css = css.map(
					function(unit) {
						return {k:e.scope+unit.k, v:unit.v};
					}
				);

				css.push({k:this.tagname+'[disabled] .active', v:'cursor:not-allowed;'});
				css.push({k:this.tagname+'[disabled] .active a em', v:'cursor:not-allowed;'});
				css.push({k:this.tagname+'[disabled] .trigger', v:'opacity:0;pointer-events:none;'});
				css.push({k:this.tagname+'.mod-sorting ul li', v:'position:absolute;'});
				css.push({k:this.tagname+'.mod-sorting ul .active', v:'position:absolute;'+anis.transition+':'+anis.transform+' 100ms ease;z-index:1;'});
				css.push({k:this.tagname+'[class|="mod"] ul li .trigger', v:'top:-100%;'});
				
				css.push({k:this.tagname+'[class|="mod"] ul+.blocker', v:'display:block;'});
				css.push({k:this.tagname+'.mod-dropplace ul+.blocker', v:'width:calc(100% - 6px);height:calc(100% - 6px);background:rgba(255,255,255,.7);border:3px dashed #489cb9;'});
				css.push({k:this.tagname+'.mod-dropplace ul+.blocker p', v:'display:block;'});

				if (e.animation) createCSSClass('@'+anis.keyframes+' stripDrop', e.animation);
			} else {
				css.push({k:':host([disabled]) .active', v:'cursor:not-allowed;'});
				css.push({k:':host([disabled]) .active a em', v:'cursor:not-allowed;'});
				css.push({k:':host([disabled]) .trigger', v:'opacity:0;pointer-events:none;'});
				css.push({k:':host(.mod-sorting) ul li', v:'position:absolute;'});
				css.push({k:':host(.mod-sorting) ul .active', v:'position:absolute;'+anis.transition+':'+anis.transform+' 100ms ease;z-index:1;'});
				css.push({k:':host([class|="mod"]) ul li .trigger', v:'top:-100%;'});
				
				css.push({k:':host([class|="mod"]) ul+.blocker', v:'display:block;'});
				css.push({k:':host(.mod-dropplace) ul+.blocker', v:'width:calc(100% - 6px);height:calc(100% - 6px);background:rgba(255,255,255,.7);border:3px dashed #489cb9;'});
				css.push({k:':host(.mod-dropplace) ul+.blocker p', v:'display:block;'});

				if (e.animation) css.push({k:'@'+anis.keyframes+' stripDrop', v:'60% {'+anis.transform+':translateY(0%);'+anis.aniTimeFunc+':ease-in;} 70% {'+anis.transform+':translateY(-10%);'+anis.aniTimeFunc+':ease-out;} 80% {'+anis.transform+':translateY(0%);'+anis.aniTimeFunc+':ease-in;} 90% {'+anis.transform+':translateY(-5%);'+anis.aniTimeFunc+':ease-out;} 100% {'+anis.transform+':translateY(0%);}'});
			}//end if

			//template
			e.buffer = mk();
			illuTransC.prototype.template = e.buffer;
			e.ul = mk('', {tag:'ul'});
			e.buffer.appendChild(e.ul);
			e.blocker = mk('blocker');
			e.buffer.appendChild(e.blocker);
			e.p = mk('', {tag:'p', att:{textContent:'Drop Images here.'}});
			e.blocker.appendChild(e.p);
			e.unit = mk();
			illuTransC.prototype.templateUnit = e.unit;
			e.li = mk('', {tag:'li'});
			e.unit.appendChild(e.li);
			e.div = mk('');
			e.li.appendChild(e.div);
			e.img = mk('', {tag:'img'});
			e.img.src = this.conf.transparent;
			e.div.appendChild(e.img);
			e.view = mk('view', {tag:'a'});
			e.div.appendChild(e.view);
			e.em = mk('', {tag:'em', att:{textContent:'view'}});
			e.view.appendChild(e.em);
			e.del = mk('delete', {tag:'a'});
			e.div.appendChild(e.del);
			e.em = mk('', {tag:'em', att:{textContent:'delete'}});
			e.del.appendChild(e.em);
			e.progress = mk('progress');
			e.div.appendChild(e.progress);
			e.p = mk('', {tag:'p'});
			e.progress.appendChild(e.p);
			e.decorationL = mk('corner-lb decoration', {tag:'span', att:{textContent:'decoration'}});
			e.progress.appendChild(e.decorationL);
			e.decorationR = mk('corner-rt decoration', {tag:'span', att:{textContent:'decoration'}});
			e.progress.appendChild(e.decorationR);
			if (this.URL) {
				e.blank = mk('', {tag:'img'});
				e.blank.src = this.conf.blank;
				illuTransC.prototype.blank = e.blank;
				e.strips = mk('strips');
				e.div.appendChild(e.strips);
			}//end if

			//stand
			empty(document.body, '#illuTransStand');
			e.stand = mk('', {tag:'aside', att:{id:'illuTransStand'}});
			document.body.appendChild(e.stand);
			e.standImg = mk('', {tag:'img'});
			e.stand.appendChild(e.standImg);
			illuTransC.prototype.stand = e.stand;
			illuTransC.prototype.standEns = e.standImg;
			e.sets = [];
			for (var i in e.stand) if (/^id$|^classname$/i.test(i)) e.sets.push(i.toLowerCase());
			illuTransC.prototype.cssRuleMode = (e.sets[0] == 'id' || isCSSSupport('-moz-appearance')) ? 'id' : 'css';//id first || classname first
			illuTransC.prototype.maneuver = (this.cssRuleMode == 'id') ? '#illuTransStand.maneuver' : '.maneuver#illuTransStand';

			//vessel
			empty(document.body, '#illuTransVessel');
			e.vessel = mk('', {att:{id:'illuTransVessel'}});
			document.body.appendChild(e.vessel);
			illuTransC.prototype.vessel = e.vessel;

			//lightBox
			empty(document.body, '#illuTransLightBox');
			e.lightbox = mk('', {att:{id:'illuTransLightBox'}});
			e.lImg = mk('', {tag:'img'});
			e.lightbox.appendChild(e.lImg);
			e.close = mk('close', {tag:'a'});
			e.lightbox.appendChild(e.close);
			e.close.href = '#close';
			e.close.textContent = "close";
			e.close.title = "turn off lightbox";
			document.body.appendChild(e.lightbox);
			illuTransC.prototype.lightBox = e.lightbox;
			illuTransC.prototype.lightBoxImg = e.lImg;

			//input[type=file]
			if (this.type == 'html5') {
				illuTransC.prototype.trigger = mk('', {tag:'input', att:{type:'file', multiple:true}});
				if (this.URL) {
					css.push({k:'.progress p', v:'display:none;'});
				}//end if
			} else if (this.type == 'basic') {
				e.vanquish = mk('vanquish');
				document.body.appendChild(e.vanquish);
				nodeAppend(e.vanquish, '<input type="file" name="Filedata">');
				illuTransC.prototype.trigger = e.vanquish.firstChild;
				document.body.removeChild(e.vanquish);
				if (!this.wc.ShadowDOM) {
					illuTransC.prototype.outVanquish = mk('illuTrans-tunnels');
					document.body.appendChild(illuTransC.prototype.outVanquish);//avoid form in form
				}//end if
			}//end if

			//evt
			if (this.type == 'html5' && this.ddSupport) {
				//drag & drop for upload
				e.sets = ['dragenter', 'dragover', 'dragleave', 'drop'];
				['dragenter', 'dragover', 'dragleave', 'drop'].forEach(
					function(act) {
						document.body.addEventListener(act, this.ddActG, false);
					}
				, this);
			}//end if
			window.addEventListener('resize', this.rActG, false);
			e.close.addEventListener('click',
				function(evt) {
					var lightBox;
					stopEvents(evt);
					lightBox = this.parentNode;
					lightBox.classList.remove('act');
					lightBox.querySelector('img').removeAttribute('src');
				}
			, false);
			document.body.addEventListener('keyup',
				function(evt) {
					var lightBox;
					lightBox = illuTransC.prototype.lightBox;
					if (evt.keyCode == 27 && lightBox.classList.contains('act')) lightBox.querySelector('.close').click();
				}
			, false);

			if (!this.wc.CustomElements && typeof MutationObserver != 'undefined') {
				illuTransC.prototype.observer = new MutationObserver(
					function(mutations) {
						mutations.forEach(function(mutation) {
							illuTransC.prototype.mutate(mutation);
						});
					}
				);
			}//end if

			//properties
			illuTransC.prototype.properties = {
				set: {
					configurable: false,
					value: illuTransC.prototype.set
				},
				get: {
					configurable: false,
					value: illuTransC.prototype.get
				},
				value: {
					configurable: false,
					get: function() {
						var ins = getIns(this, 'illuTransC');
						return ins.value();
					},
					set: function(data) {
						var ins = getIns(this, 'illuTransC');
						ins.placeholder(data);
					}
				},
				addCallback: {
					configurable: false,
					value: illuTransC.prototype.addCallback
				},
				removeCallback: {
					configurable: false,
					value: illuTransC.prototype.removeCallback
				},
				refresh: {
					configurable: false,
					value: illuTransC.prototype.refreshG
				},
				disabled: {
					configurable: false,
					get: function() {
						return this.hasAttribute('disabled');
					},
					set: function(flag) {
						if (flag) {
							if (!this.hasAttribute('disabled')) this.setAttribute('disabled', 'disabled');
						} else {
							if (this.hasAttribute('disabled')) this.removeAttribute('disabled');
						}//end if
					}
				},
				removeFails: {
					configurable: false,
					value: function() {
						var ins = getIns(this, 'illuTransC');
						clearTimeout(ins.Data.iid4Remove);
						ins.removeFails();
					}
				}
			};

			//excute css
			if (this.wc.ShadowDOM) {
				e.cssStr = 'h3,div,ul,li{display:block;margin:0;padding:0;}img{border:0}a{text-decoration:none}a:hover{text-decoration:underline;}ul{list-style:none;}';
				while (css.length) {
					var c = css.shift();
					e.cssStr += c.k + '{' + c.v + '}';
				}//end while
				illuTransC.prototype.cssStr = e.cssStr;
			} else {
				while (css.length) {
					var c = css.shift();
					createCSSClass(c.k, c.v);
				}//end while
			}//end if

			//clear
			css = null;
			for (var i in e) e[i] = null;
			e = null;

			//custom element
			this.activeCustomElement();
		}//end if
		return illuTransC.prototype.isSupport;
	},
	activeCustomElement: function() {
		if (illuTransC.prototype.activeCE) return;
		var b = ['', 'webkit', 'moz', 'o', 'ms'], api = 'registerElement', ce = '', prototype, observer;
		illuTransC.prototype.activeCE = true;
		for (var i=-1,l=b.length;++i<l;) {
			var s = b[i], cApi = api;
			cApi = (s.length) ? api.replace(/^[a-z]{1}/,function($1){return $1.toLocaleUpperCase()}) : api;
			s += cApi;
			if (document[s]) { ce = s; break; }
		}//end for

		if (typeof OilluTransC == 'undefined') OilluTransC = {};
		if (!ce) {
			//attachedCallback
			if (typeof MutationObserver != 'undefined') {
				observer = new MutationObserver(
					function(mutations) {
						mutations.forEach(function(mutation) {
							if (mutation.type != 'childList') return;
							[].slice.call(mutation.addedNodes).forEach(
								function(node) {
									if (node.childNodes.length) {
										[].slice.call(node.querySelectorAll(illuTransC.prototype.tagname)).forEach(
											function(target) {
												illuTransC.prototype.attachedCallback(target);
											}
										);
									} else if (illuTransC.prototype.tagP.test(node.tagName)) {
										illuTransC.prototype.attachedCallback(node);
									}//end if
								}
							);
						});
					}
				);
				observer.observe(document.body, {childList:true, subtree:true});
			}//end if

			//none custom element support
			[].slice.call(document.querySelectorAll(illuTransC.prototype.tagname)).forEach(
				function(node) {
					illuTransC.prototype.attachedCallback(node);
				}
			);
		} else {
			prototype = Object.create(HTMLElement.prototype, illuTransC.prototype.properties);
			prototype.attachedCallback = illuTransC.prototype.attachedCallback;
			prototype.attributeChangedCallback = illuTransC.prototype.attrChange;
			document[ce](illuTransC.prototype.tagname, {prototype: prototype});
		}//end if
	},
	attachedCallback: function(node) {
		var conf, mid, tmp, target;
		if (typeof node != 'undefined') {
			//none custom element support
			if (!illuTransC.prototype.tagP.test(node.tagName) || (typeof node.Data != 'undefined' && node.Data.isReady)) return;
			target = node;
		} else {
			target = this;
		}//end if
		if (typeof target.isReady != 'undefined') return;

		mid = 'M' + getRand(1, 10000) + getRand(1, 10000);
		target.mid = mid;
		conf = JSON.parse(JSON.stringify(illuTransC.prototype.default));
		conf.wrapper = target;

		if (target.hasAttribute('data-conf')) {
			try { tmp = JSON.parse(target.getAttribute('data-conf')); } catch (err) { tmp = {}; }
			for (var j in tmp) {
				conf[j] = tmp[j];
				tmp[j] = null;
			}//end ofr
			tmp = null;
			target.removeAttribute('data-conf');
		}//end if
		//illuTransC
		OilluTransC['illuTransC'+mid] = new illuTransC(mid, conf);
	},
	attrChange: function(attrName, oldVal, newVal, target) {
		var ins;

		if (['disabled'].indexOf(attrName) == -1) return;
		ins = getIns(target || this, 'illuTransC');
		if (!ins) return;
		switch (attrName) {
			case 'disabled':
				//do nothing
				break;
		}//end switch
	},
	mutate: function(mutation) {
		var attrName, oldVal, newVal;
		if (mutation.type != 'attributes') return;

		attrName = mutation.attributeName;
		oldVal = mutation.oldValue;
		newVal = mutation.target.getAttribute(attrName);
		illuTransC.prototype.attrChange(attrName, oldVal, newVal, mutation.target);
	},
	correct: function() {
		var legal;

		legal = [];
		['max', 'limitSize', 'col', 'stripWidth', 'stripAmount', 'coolTime'].forEach(
			function(key) {
				if (parseInt(this.Data[key], 10) != this.Data[key]) this.Data[key] = this.default[key];
				if (typeof this.Data[key] == 'string') this.Data[key] = parseInt(this.Data[key], 10);
			}
		, this);
		this.Data.stripUnit = this.Data.stripWidth / this.Data.stripAmount;
		if (typeof this.Data.withCredentials != 'boolean') this.Data.withCredentials = this.default.withCredentials;
		if (typeof this.Data.useLightbox != 'boolean') this.Data.useLightbox = this.default.useLightbox;
		if (this.Data.max < 0)  this.Data.max = this.default.max;
		if (this.Data.col < 0)  this.Data.col = this.default.col;
		if (this.Data.coolTime < 3000) this.Data.coolTime = this.default.coolTime;

		//legal
		legal = [];
		this.Data.legal = this.Data.legal.map(
			function (value) {
				return value.toLowerCase().replace('jpg', 'jpeg');
			}
		);
		this.Data.legal.forEach(
			function(value) {
				if (legal.indexOf(value) == -1) legal.push(value);
			}
		);
		this.Data.legal = legal;
		this.Data.accept = this.Data.legal.map(
			function(value) {
				return 'image/' + value;
			}
		).join();
	},
	set: function(key, value) {
		var ins, scope;
		ins = (typeof this.tagName != 'undefined') ? getIns(this, 'illuTransC') : this;
		if (!ins || ins.default[key] == 'undefined') return;

		value = JSON.parse(JSON.stringify(value));
		if (typeof ins.Data[key] != 'undefined') ins.Data[key] = value;
		ins.correct();

		if (['stripAmount', 'max'].indexOf(key) != -1) key = 'regenList';
		switch (key) {
			case 'stripWidth':
				ins.Ens.lists.forEach(
					function(host) {
						var stripWidth;
						stripWidth = this.Data.stripWidth;
						[].slice.call(host.querySelectorAll('canvas')).forEach(
							function(canvas) {
								canvas.setAttribute('width', stripWidth);
								canvas.setAttribute('height', stripWidth);
							}
						);
					}
				, ins);
				break;
			case 'regenList':
				ins.unset();
				ins.genLists();
				ins.triggerPlace();
				ins.refresh();
				break;
			case 'legal':
				ins.mkTrigger();
				break;
			case 'col':
				scope = (illuTransC.prototype.wc.ShadowDOM) ? '' : ('#' + ins.Ens.host.id + ' ');
				createCSSClass(scope+'ul li', 'width:'+(100/ins.Data.col)+'%;', ins.Ens.sheet);
				ins.refresh();
				break;
			case 'inputName':
				ins.Data.name = value || ins.default.inputName;
				ins.buildData();
				break;
		}//end switch
	},
	get: function(key) {
		var ins, res;
		ins = (typeof this.tagName != 'undefined') ? getIns(this, 'illuTransC') : this;
		if (!ins) return;

		if (ins.Data[key]) res = ins.Data[key];
		else {
			switch (key) {
				case 'activeAmount':
					res = ins.Data.actAmt;
					break;
				case 'stat':
					res = (ins.Ens.main.querySelectorAll('.upload').length) ? 'upload' : 'normal'; 
					break;
				case 'value':
					res = ins.value();
					break;
			}//end switch
		}//end if
		if (res) res = JSON.parse(JSON.stringify(res));

		return res;
	},
	value: function() {
		var ins, res;
		ins = (typeof this.tagName != 'undefined') ? getIns(this, 'illuTransC') : this;
		if (!ins) return;

		res = [];
		ins.Ens.lists.forEach(
			function(host, idx) {
				var id, data;
				if (!host.classList.contains('active')) return;
				id = host.id;
				if (!this.Data.listData[id]) return;

				res.push(this.Data.listData[id]); 
			}
		, ins);
		return JSON.parse(JSON.stringify(res));
	},
	addCallback: function(fn) {
		var ins;
		ins = (typeof this.tagName != 'undefined') ? getIns(this, 'illuTransC') : this;
		if (!ins || typeof fn != 'function' || ins.Ens.callBacks.indexOf(fn) != -1) return;
		ins.Ens.callBacks.push(fn);
	},
	removeCallback: function(fn) {
		var ins;
		ins = (typeof this.tagName != 'undefined') ? getIns(this, 'illuTransC') : this;
		if (!ins || typeof fn != 'function' || ins.Ens.callBacks.indexOf(fn) == -1) return;
		ins.Ens.callBacks.splice(ins.Ens.callBacks.indexOf(fn), 1);
	},
	unset: function() {
		var ins, res;
		ins = (typeof this.tagName != 'undefined') ? getIns(this, 'illuTransC') : this;
		if (!ins) return;

		ins.Ens.lists.forEach(
			function(host) {
				if (!host.classList.contains('active')) return;
				this.resetUnit(host);
			}
		, ins);
	},
	refreshG: function() {
		var ins, res;
		ins = (typeof this.tagName != 'undefined') ? getIns(this, 'illuTransC') : this;
		if (!ins) return;

		ins.refresh();
	},
	placeholder: function(data) {
		var ins, placeholder, host;
		ins = (typeof this.tagName != 'undefined') ? getIns(this, 'illuTransC') : this;
		if (!ins) return;

		ins.unset();
		if (data && Array.isArray(data)) {
			placeholder = data.slice(0, ins.Data.max).filter(
				function(unit) {
					return unit.icon && unit.preview;
				}
			);
			if (placeholder.length) {
				// ins.unset();
				host = ins.Ens.host;

				ins.Ens.host.classList.add('mod-upload');
				ins.Ens.lists.forEach(
					function(host, idx) {
						if (!placeholder[idx]) return;

						this.Data.listData[host.id] = placeholder[idx];
						setTimeout(
							function() {
								ins.imgLoader(host);
							}
						, getRand(50, 500));
					}
				, ins);
			}//end if
		}//end if
	},
	genLists: function() {
		var e;

		e = {};
		e.scope = (this.wc.ShadowDOM) ? '' : '#' + this.Ens.host.id + ' ';
		if (this.URL && typeof this.anis != 'undefined') {
			e.canvasWrap = mk();
			for (var i=-1,l=this.Data.stripAmount+1;++i<l;) {
				var canvas;
				createCSSClass(e.scope+'.strips.strip-drop'+(i+1)+' canvas:nth-child(-n+'+(i+2)+')', this.anis.animation+':stripDrop 250ms 100ms both;', this.Ens.sheet);
				canvas = mk('', {tag:'canvas'});
				canvas.width = this.Data.stripWidth;
				canvas.height = this.Data.stripWidth;
				e.canvasWrap.appendChild(canvas);
			}//end for
		}//end if

		empty(this.Ens.main);
		this.Ens.lists = [];
		for (var i=-1,l=this.Data.max;++i<l;) {
			var li, id;
			li = this.templateUnit.cloneNode(true);
			id = this.Ens.host.id + '-unit-' + i;
			if (e.canvasWrap) li.querySelector('.strips').appendChild(e.canvasWrap.cloneNode(true));
			this.Ens.main.appendChild(li);

			li = this.Ens.main.lastChild;
			li.id = id;
			this.Ens.lists.push(li);
		}//end for
	},
	triggerPlace: function() {
		var serial, e;
		serial = this.Data.actAmt;
		if (this.Data.actAmt == this.Data.max) {
			serial = 0;
			this.Ens.trigger.classList.add('hide');
		} else this.Ens.trigger.classList.remove('hide');
		this.Ens.lists[serial].querySelector('div').appendChild(this.Ens.trigger);
	},
	mkTrigger: function() {
		if (this.Ens.input) {
			this.Ens.input.removeEventListener('change', this.eActG, false);
			this.Ens.input.parentNode.removeChild(this.Ens.input);
		}//end if
		this.Ens.input = this.trigger.cloneNode(true);
		this.Ens.input.setAttribute('id', this.Data.inputOriginID);
		if (this.type != 'basic') {
			this.Ens.input.setAttribute('accept', this.Data.accept);
			this.Ens.chamberInput.setAttribute('accept', this.Data.accept);
		}//end if
		this.Ens.triVanquish.appendChild(this.Ens.input);
		this.Ens.input.addEventListener('change', this.eActG, false);
	},
	pointer: function(e) {
		var res, docElement, body, pos;
		
		res = {};
		docElement = document.documentElement;

		//pointerX
		body = document.body || { scrollLeft: 0 };
		res.x = e.pageX || (e.clientX + (docElement.scrollLeft || body.scrollLeft) - (docElement.clientLeft || 0));

		//pointerY
		body = document.body || { scrollTop: 0 };
		res.y = e.pageY || (e.clientY + (docElement.scrollTop || body.scrollTop) - (docElement.clientTop || 0));

		return res;
	},
	eActG: function(e) {
		var obj = tNa(e, 'form'), ins;
		if (!obj.t) obj = tNa(e, 'ul');
		ins = getIns(obj.t, 'illuTransC');
		if (!ins) return;
		ins.eAct(e);
	},
	eAct: function(e) {
		var obj, mStatus, info, pointer, isUpload;

		if (this.Ens.host.hasAttribute('disabled')) return;

		obj = tNa(e);
		if (/.*(start|down).*/i.test(obj.a)) obj.a = 'down';
		isUpload = (this.Ens.main.querySelectorAll('.upload').length) ? true : false;
		switch (obj.a) {
			case 'down':
				if (this.Data.isDrag || isUpload || obj.t.tagName.toLowerCase() == 'em' || obj.t.tagName.toLowerCase() == 'a') return;
				obj = eTrack(obj.t, 'li');
				if (!obj || !obj.classList.contains('active')) return;
				stopEvents(e);
				if (window.event && window.event.srcElement) mStatus = window.event.button;
				else if (e && e.target) mStatus = e.button;
				if (e.touches || mStatus == 0 || mStatus == 1) {
					if (!e.touches && window.navigator.msPointerEnabled == 'undefined' && this.isIE && mStatus != 1) return;//msie7 ~ msie9 mStatus:1, others:0
					info = {
						p: getPosition(obj),
						s: getSize(obj.querySelector('div'))
					};
					pointer = this.pointer(e);
					this.Data.DamiDist = [info.p[0]-pointer.x, info.p[1]-pointer.y];
					this.Data.isDrag = true;
					this.Data.cdInfo = info;//current drag info
					SelectionSwitch('Disable');
					this.Ens.cd = obj;
					this.Ens.host.classList.add('mod-sorting');
					obj.classList.add('current-drag');

					//stand
					this.stand.classList.add('maneuver');
					this.standEns.src = this.Data.listData[obj.id].icon;
					this.cdVary(pointer.x, pointer.y);

					//toggleSortEvts
					this.toggleSortEvts(true);
				}//end if
				break;
			case 'click':
				obj = eTrack(obj.t, 'a');
				if (!obj) return;
				stopEvents(e);

				info = obj.className.trim();
				switch (info) {
					case 'delete':
						obj = eTrack(obj, 'li');
						(typeof this.anis != 'undefined') ? obj.classList.add('erase') : this.resetUnit(obj);
						break;
					case 'view':
						obj = eTrack(obj, 'li');

						//lightbox
						if (this.Data.useLightbox) {
							this.lightBox.classList.add('act');
							this.lightBoxImg.src = this.Data.listData[obj.id].preview;
						}//end if

						this.executeCallBack('view', JSON.parse(JSON.stringify(this.Data.listData[obj.id])));
						break;
				}//end switch
				this.i13n('illuTransCAct', info);//i13n
				break;
			case 'change':
				if (this.type == 'basic') this.fHandler([obj.t.value]);
				else {
					this.fHandler(obj.t.files);
					this.mkTrigger();
				}//end if
				obj.t.value = '';
				break;
		}//end switch
	},
	cdVary: function(pointerX, pointerY) {
		var ins;
		
		ins = this;
		if (typeof requestAnimationFrame != 'undefined') {
			ins = this;
			requestAnimationFrame(
				function() {
					createCSSClass(ins.maneuver, 'display:block;width:'+(ins.Data.cdInfo.s[0]-2)+'px;left:'+(pointerX+ins.Data.DamiDist[0]+4)+'px;top:'+(pointerY+ins.Data.DamiDist[1]+4)+'px;');
				}
			);
		} else {
			createCSSClass(this.maneuver, 'display:block;width:'+(this.Data.cdInfo.s[0]-2)+'px;left:'+(pointerX+this.Data.DamiDist[0]+4)+'px;top:'+(pointerY+this.Data.DamiDist[1]+4)+'px;');
		}//end if
	},
	toggleSortEvts: function(mode) {
		var flag, evts, html;

		flag = (typeof mode != 'boolean') ? false : true;
		evts = [this.pursuer.move, this.pursuer.up];
		html = document.querySelector('html');
		if (flag) {
			evts.forEach(
				function(evt) {
					html.addEventListener(evt, this.sortActG, false);
				}
			, this);
		} else {
			evts.forEach(
				function(evt) {
					html.removeEventListener(evt, this.sortActG, false);
				}
			, this);
			this.i13n('illuTransCAct', 'sorting');//i13n
			this.executeCallBack('sorting');
		}//end if
	},
	rActG: function(e) {
		for (var i in OilluTransC) OilluTransC[i].rAct(e);
	},
	rAct: function(e) {
		this.refresh();
	},
	sortActG: function(e) {
		for (var i in OilluTransC) OilluTransC[i].sortAct(e);
	},
	sortAct: function(e) {
		var obj, o, p, col, row, d, ins;

		if (!this.Data.isDrag) return;
		obj = tNa(e),
		obj.a = (/.*move.*/i.test(obj.a)) ? 'move' : 'up';
		o = 0;
		
		if (typeof(arguments[1]) != 'undefined') obj.a = 'up';
		switch (obj.a) {
			case 'move':
				stopEvents(e);
				p = this.pointer(e);
				d = this.Data.sData;
				this.cdVary(p.x, p.y);

				//col
				if (p.x < d.x) col = 0;
				else if (p.x > d.mX) col = this.Data.col - 1;
				else col = Math.ceil((p.x - d.x) / d.w) - 1;

				//row
				if (p.y < d.y) row = 0;
				else if (p.y > d.mY) row = d.rowAmt - 1;
				else row = Math.ceil((p.y - d.y) / d.h) - 1;

				//fix
				if (row * this.Data.col + col >= this.Data.actAmt) col = this.Data.actAmt % this.Data.col - 1;

				o = row * this.Data.col + col;
				this.Ens.main.removeChild(this.Ens.cd);
				d = [].slice.call(this.Ens.main.querySelectorAll('li'));
				if (d[o]) this.Ens.main.insertBefore(this.Ens.cd, d[o]);
				else this.Ens.main.appendChild(this.Ens.cd);

				if (typeof this.anis != 'undefined') {
					ins = this;
					[].slice.call(this.Ens.main.querySelectorAll('li.active')).forEach(
						function(host, idx) {
							var x, y, col, row, className;
							if (idx == o) return;
							col = idx % this.Data.col;
							row = Math.floor(idx / this.Data.col);
							x = (host.data.col - col) * 100 * -1;
							y = (host.data.row - row) * 100 * -1;

							className = (this.cssRuleMode == 'id') ? '#'+host.id+'.shift' : '.shift#'+host.id;
							if (typeof requestAnimationFrame != 'undefined') {
								requestAnimationFrame(
									function() {
										createCSSClass(className, ins.anis.transform+':translate('+x+'%,'+y+'%);', ins.Ens.sheet);
									}
								);
							} else {
								createCSSClass(className, this.anis.transform+':translate('+x+'%,'+y+'%);', this.Ens.sheet);
							}//end if
							host.classList.add('shift');
						}
					, this);
				}//end if
				break;
			case 'up':
				this.toggleSortEvts();

				this.Data.isDrag = false;
				SelectionSwitch();
				this.stand.classList.remove('maneuver');
				this.standEns.src = this.conf.transparent;

				this.Ens.host.classList.remove('mod-sorting');
				this.Ens.cd.classList.remove('current-drag');

				this.Ens.lists = [];
				[].slice.call(this.Ens.main.querySelectorAll('li')).forEach(
					function(host) {
						host.classList.remove('shift');
						this.Ens.lists.push(host);
					}
				, this);

				this.resetLists();
				this.buildData();
				break;
		}//end switch
	},
	fHandler: function(files) {
		var err, checkPNG;

		//empty
		if (!files.length) return;

		if (this.Ens.main.querySelectorAll('.upload').length) err = 'blockByUploading';
		else if (this.Data.actAmt == this.Data.max) err = 'blockByFull';

		if (!err) {
			this.Ens.queue = [];
			checkPNG = this.Data.legal.indexOf('png') != -1;
			if (!Array.isArray(files)) files = [].slice.call(files);

			this.Ens.queue = files.filter(
				function(file) {
					var flag, ext;
					flag = false;
					if (typeof file == 'string') {
						//basic
						ext = file.replace(/().*\.(.*)/, '$2').toLowerCase().replace('jpg', 'jpeg');
						flag = this.Data.legal.indexOf(ext) != -1;
					} else {
						if (file.size <= this.Data.limitSize) {
							if (file.type && /image/.test(file.type)) {
								flag = this.Data.legal.indexOf(file.type.replace(/(.*)\/(.*)/, '$2')) != -1;
							} else if (checkPNG) {
								flag = /\.png/i.test(file.name.toLowerCase());
							}//edn if
						}//end if
					}//end if
					return flag;
				}
			, this);
			if (this.Ens.queue.length != files.length) {
				if (!this.Ens.queue.length) err = 'empty';
				else if (this.Ens.queue.length != files.length) {
					this.executeCallBack('formatError',
						{
							originalAmount: files.length,
							acceptAmount: this.Ens.queue.length 
						}
					);
				}//end if
			} else if (this.Ens.queue.length + this.Data.actAmt > this.Data.max) {
				this.executeCallBack('exceed',
					{
						originalAmount: this.Ens.queue.length,
						acceptAmount: this.Data.max - this.Data.actAmt
					}
				);
				this.Ens.queue = this.Ens.queue.slice(0, this.Data.max - this.Data.actAmt);
			}//end if
		}//end if

		if (err) {
			this.executeCallBack(err);
			return;
		}//end if

		//i13n
		this.i13n('illuTransCAct', 'pick');

		this.executeCallBack('pick');

		//upload
		(this.URL && this.type == 'html5') ? this.stripPre() : this.upload();
	},
	executeCallBack: function(action) {
		var args;
		if (!this.Ens.callBacks.length) return;

		//action:
		//view, sorting, exceed, blockByUploading, blockByFull, empty, formatError, pick, upload, uploadFail, uploadSuccess, delete, drop
		
		args = [].slice.call(arguments);
		args.push(this.Ens.host);//put host in the end

		//view
		this.Ens.callBacks.forEach(
			function(fn) {
				fn.apply(null, args);
			}
		);
	},
	stripPre: function() {
		var evts;
		this.Ens.host.classList.add('mod-upload');

		evts = ['error', 'load'];
		this.Ens.queue.forEach(
			function(file, idx) {
				var reader = new FileReader();
				reader.Data = {
					ClassID: this.id,
					serial: idx
				};
				evts.forEach(
					function(evt) {
						reader.addEventListener(evt, this.frHandle);
					}
				, this);
				reader.readAsArrayBuffer(file);
			}
		, this);
	},
	frHandle: function(e) {
		var obj, ins, orientation, EXIF;

		obj = tNa(e);
		ins = getIns(obj.t, 'illuTransC');
		orientation = 1;
		if (ins) {
			if (obj.a == 'load') {
				EXIF = new ExifReader();
				try {
					EXIF.load(obj.t.result);
					tags = EXIF.getAllTags();
					if (tags.Orientation) orientation = tags.Orientation.value;
				} catch (err) {}
			}//end if
			ins.drawsPre(obj.t.Data.serial, orientation);
		}//end if
		//clear
		for (var i in obj.t.Data) obj.t.Data[i] = null;
		obj.t.Data = null;
	},
	drawsPre: function(serial, orientation) {
		var img;

		img = new Image();
		['error', 'load'].forEach(
			function(evt) {
				img.addEventListener(evt, this.URLHandler, false);
			}
		, this);
		img.Data = {
			ClassID: this.id,
			serial: serial,
			orientation: orientation
		};
		img.src = this.URL.createObjectURL(this.Ens.queue[serial]);
	},
	URLHandler: function(e) {
		var obj, ins, d;
		obj = tNa(e);
		ins = getIns(obj.t, 'illuTransC');
		if (ins) ins.draws({img:obj.t, evt:obj.a, serial:obj.t.Data.serial, orientation:obj.t.Data.orientation});
		else {
			//clear
			for (var i in obj.t.Data) obj.t.Data[i] = null;
			obj.t.Data = null;
		}//end if
		ins.URL.revokeObjectURL(obj.t.src);
	},
	detectSubsampling: function(img) {
		var iw = img.naturalWidth, ih = img.naturalHeight, canvas, ctx, isSubsampling = false;
	    if (iw * ih > 1024 * 1024) { // subsampling may happen over megapixel image
			canvas = mk('', {tag:'canvas'});
			canvas.width = canvas.height = 1;
			ctx = canvas.getContext('2d');
			ctx.drawImage(img, -iw + 1, 0);
			// subsampled image becomes half smaller in rendering size.
			// check alpha channel value to confirm image is covering edge pixel or not.
			// if alpha value is 0 image is not covering, hence subsampled.
			isSubsampling = ctx.getImageData(0, 0, 1, 1).data[3] === 0;
	    }//end if
	    return isSubsampling;
	},
	draws: function(data) {
		var host, size, neoSize, img, ins, negative, ctx, temData;
		
		neoSize = {};
		img = data.img;
		
		//clear
		for (var i in img.Data) img.Data[i] = null;
		img.Data = null;

		if (data.evt == 'error') img = this.blank;
		else if (this.detectSubsampling(img)) {
			//detectSubsampling
			size = {w:img.width, h:img.height};
			if (size.w < size.h) {
				neoSize.w = this.Data.stripWidth;
				neoSize.h = (size.h * this.Data.stripWidth) / size.w;
				neoSize.x = 0;
				neoSize.y = (neoSize.h - this.Data.stripWidth) / 2 * -1;
			} else {
				neoSize.w = (size.w * this.Data.stripWidth) / size.h;
				neoSize.h = this.Data.stripWidth;
				neoSize.x = (neoSize.w - this.Data.stripWidth) / 2 * -1;
				neoSize.y = 0;
			}//end if
			neoSize.ratio = neoSize.w / size.w;
			if (this.isiDevice) neoSize.ratio *= 2;

			negative = {};
			tmpData = {
				iwh: 1024,
				iwhr: 1024*neoSize.ratio,
				iw: img.width,
				ih: img.height,
				sx: 0,
				sy: 0,
				dx: 0,
				dy: 0
			};
			negative.tmpCanvas = mk('', {tag:'canvas'});
			negative.tmpCanvas.width = negative.tmpCanvas.height = tmpData.iwh;
			negative.tmpCtx = negative.tmpCanvas.getContext('2d');
			negative.canvas = mk('', {tag:'canvas'});
			negative.canvas.width = neoSize.w;
			negative.canvas.height = neoSize.h;
			negative.ctx = negative.canvas.getContext('2d');
			while (tmpData.sy < tmpData.ih) {
				tmpData.sx = 0;
				tmpData.dx = 0;
				while (tmpData.sx < tmpData.iw) {
			        negative.tmpCtx.clearRect(0, 0, tmpData.iwh, tmpData.iwh);
			        negative.tmpCtx.drawImage(img, -tmpData.sx, -tmpData.sy);
			        negative.ctx.drawImage(negative.tmpCanvas, tmpData.dx*neoSize.ratio, tmpData.dy*neoSize.ratio, tmpData.iwhr, tmpData.iwhr);

			        tmpData.sx += tmpData.iwh;
			        tmpData.dx += tmpData.iwh;
				}//end while
				tmpData.sy += tmpData.iwh;
				tmpData.dy += tmpData.iwh;
			}//end while
			img = negative.canvas;
			for (var i in negative) negative[i] = null;
			negative = {};
			neoSize.ratio = null;
		}//end if

		host = this.Ens.lists[this.Data.actAmt + data.serial];
		size = (data.orientation < 5) ? {w:img.width, h:img.height} : {w:img.height, h:img.width};
		if (size.w < size.h) {
			neoSize.w = this.Data.stripWidth;
			neoSize.h = (size.h * this.Data.stripWidth) / size.w;
			neoSize.x = 0;
			neoSize.y = (neoSize.h - this.Data.stripWidth) / 2 * -1;
		} else {
			neoSize.w = (size.w * this.Data.stripWidth) / size.h;
			neoSize.h = this.Data.stripWidth;
			neoSize.x = (neoSize.w - this.Data.stripWidth) / 2 * -1;
			neoSize.y = 0;
		}//end if

		//negative
		negative = mk('', {tag:'canvas'});
		negative.width = neoSize.w;
		negative.height = neoSize.h;
		ctx = negative.getContext('2d');
		switch (data.orientation) {
			case 2:
				ctx.translate(neoSize.w, 0);
				ctx.scale(-1, 1);
				break;
			case 3:
				ctx.translate(neoSize.w, neoSize.h);
				ctx.rotate(180 * Math.PI/180);
				break;
			case 4:
				ctx.translate(0, neoSize.h);
				ctx.scale(1, -1);
				break;
			case 5:
				ctx.translate(0, 0);
				ctx.scale(1, -1);
				ctx.rotate(270 * Math.PI/180);
				break;
			case 6:
				ctx.translate(neoSize.w, 0);
				ctx.rotate(90 * Math.PI/180);
				break;
			case 7:
				ctx.translate(neoSize.w, neoSize.h);
				ctx.scale(1, -1);
				ctx.rotate(90 * Math.PI/180);
				break;
			case 8:
				ctx.translate(0, neoSize.h);
				ctx.rotate(-90 * Math.PI/180);
				break;
		}//end switch
		(data.orientation < 5) ? ctx.drawImage(img, 0, 0, neoSize.w, neoSize.h) : ctx.drawImage(img, 0, 0, neoSize.h, neoSize.w);

		[].slice.call(host.querySelectorAll('canvas')).forEach(
			function(canvas, idx) {
				var ctx;
				ctx = canvas.getContext('2d');
				ctx.clearRect(0, 0, this.Data.stripWidth, this.Data.stripWidth);
				if (idx == 0) {
					ctx.globalAlpha = 0.6;
					ctx.drawImage(negative, neoSize.x, neoSize.y, neoSize.w, neoSize.h);
				} else {
					ctx.drawImage(negative, neoSize.x, neoSize.y, neoSize.w, neoSize.h);
					//clear - left
					ctx.clearRect(0, 0, (idx-1)*this.Data.stripUnit-1, this.Data.stripWidth);
					//clear-right
					ctx.clearRect(idx*this.Data.stripUnit, 0, this.Data.stripWidth - idx*this.Data.stripUnit, this.Data.stripWidth);
				}//end if
			}
		, this);

		ins = this;
		host.classList.add('upload');
		setTimeout(
			function(){ 
				ins.fireXHR(data.serial);
			}
		, 500);
	},
	fireXHR: function(serial) {
		var xhr, fd, evts, sid, host;

		xhr = new XMLHttpRequest();
		fd = new FormData();
		evts = ['progress', 'load'];

		//formData
		fd.append(this.Data.inputName, this.Ens.queue[serial]);
        Object.keys(this.Data.params).forEach(
        	function(key) {
        		fd.append(key, this.Data.params[key]);
        	}
        , this);

		sid = this.Data.actAmt + serial;
		host = this.Ens.lists[sid];
		host.classList.add('upload');
		this.progress(host, 0);

		xhr.upload.cid = this.id;
		xhr.upload.host = host;
		evts.forEach(
			function(evt) {
				xhr.upload.addEventListener(evt, this.xhrHandle, false);
			}
		, this);
		evts = ['abort', 'error', 'readystatechange'];
		evts.forEach(
			function(evt) {
				xhr.addEventListener(evt, this.xhrHandle, false);
			}
		, this);

		xhr.withCredentials = this.Data.withCredentials;
		xhr.cid = this.id;
		xhr.host = host;
		xhr.callBack = this.qd;
		xhr.open('POST', this.Data.uri, true);
		xhr.send(fd);

		//i13n
		this.i13n('illuTransCAct', 'upload');
		this.executeCallBack('upload');
	},
	xhrHandle: function(e) {
		var obj, ins, percentage;
		obj = tNa(e);
		switch (obj.a) {
			case 'progress':
				if (e.lengthComputable) {
					ins = getIns(eTrack(this.host, 'ul'), 'illuTransC');
					percentage = Math.round((e.loaded * 100) / e.total);
					ins.progress(this.host, percentage);
				}//end if
				break;
			case 'load':
				ins = getIns(eTrack(this.host, 'ul'), 'illuTransC');
				ins.progress(this.host, 100);
				break;
			case 'readystatechange':
				if (this.readyState == 4) this.callBack(this);
				break;
			default:
				// trace(obj.a);
		}//end switch
	},
	progress: function(host, percentage) {
		var serial, ins;
		host.querySelector('p').textContent = percentage;
		if (typeof percentage == 'string') percentage = 100;
		if (this.URL) {
			 serial = (this.Data.stripAmount * percentage) / 100;
			 host.querySelector('.strips').className = 'strips strip-drop' + Math.floor(serial);
		}//end if

		//animation
		if (typeof requestAnimationFrame != 'undefined') {
			ins = this;
			requestAnimationFrame(
				function() {
					createCSSClass('#'+host.id+' .decoration', 'width:'+percentage+'%;height:'+percentage+'%;', ins.Ens.sheet);
				}
			);
		} else {
			createCSSClass('#'+host.id+' .decoration', 'width:'+percentage+'%;height:'+percentage+'%;', this.Ens.sheet);
		}//end if
	},
	qdCallBack: function(o) {
        var ResultObj = o;
        ResultObj.host = this.Ens.funcHost;
        this.upDonePre(ResultObj);
        this.resetBasic();
	},
	qd: function(o) {
		var ResultObj, ins;

		ResultObj = { info:'fail' };
		if (o.status == 200) {
			try { ResultObj = JSON.parse(o.responseText.replace(/\)\]\}',\n/, '')); } catch(e) {}
		}//end if
		ResultObj.host = o.host;
		ins = getIns(eTrack(o.host, 'ul'), 'illuTransC');
		ins.upDonePre(ResultObj);
	},
	upDonePre: function(res) {
		var data, host, timer, ins, info;
		host = res.host;
		timer = 500;
		if (res.info != 'success') {
			host.classList.remove('upload');
			host.classList.add('fail');
			host.querySelector('p').textContent = 'fail';
			this.upDone();
			info = 'uploadFail';
		} else {
			data = res.data[0];
			this.Data.listData[host.id] = data;
			ins = this;
			setTimeout(function() { ins.imgLoader(host); }, timer);
			info = 'uploadSuccess';
		}//end if
		this.executeCallBack(info);
	},
	imgLoader: function(host) {
		var evts, img, data;

		data = this.Data.listData[host.id];
		if (this.snaps.indexOf(data.icon) != -1) this.activeList(host);
		else {
			evts = ['error', 'load'];
			img = new Image();
			evts.forEach(
				function(evt) {
					img.addEventListener(evt, this.imgHandler, false);
				}
			, this);
			img.Data = {
				ClassID: this.id,
				host: host
			};
			img.src = data.icon;
		}//end if
	},
	imgHandler: function(e) {
		var obj, ins, data;

		obj = tNa(e);
		ins = getIns(obj.t, 'illuTransC');
		if (ins) {
			data = ins.Data.listData[obj.t.Data.host.id];
			if (illuTransC.prototype.snaps.indexOf(data.icon) == -1) illuTransC.prototype.snaps.push(data.icon);
			ins.activeList(obj.t.Data.host);
		}//end if

		//clear
		for (var i in obj.t.Data) obj.t.Data[i] = null;
		obj.t.Data = null;
	},
	activeList: function(host) {
		var data, ins;

		data = this.Data.listData[host.id];
		host.classList.remove('upload');
		host.querySelector('img').src = data.icon;
		host.classList.add('active');
		if (host.querySelector('strips')) host.querySelector('strips').className = 'strips';//reset className
		if (typeof this.anis == 'undefined') {
			ins = this;
			setTimeout(
				function() {
					ins.upDone();
				}
			, 300);
		}//end if
	},
	upDone: function() {
		var ins;
		if (this.Ens.main.querySelectorAll('.upload').length) return;

		this.Data.actAmt = this.Ens.main.querySelectorAll('.active').length;
		this.triggerPlace();
		this.refresh();
		this.buildData();

		this.Ens.host.classList.remove('mod-upload');
		
		//error
		if (this.Ens.main.querySelectorAll('.fail').length) {
			this.Ens.host.classList.add('mod-upload-fail');

			ins = this;
			clearTimeout(this.Data.iid4Remove);
			this.Data.iid4Remove = setTimeout(
				function() {
					ins.removeFails();
				}
			, this.Data.coolTime);
		}//end if
	},
	removeFails: function() {
		var flag;

		flag = typeof this.anis != 'undefined';
		[].slice.call(this.Ens.main.querySelectorAll('.fail')).forEach(
			function(host) {
				if (flag) {
					setTimeout(function(){host.classList.add('erase');}, getRand(50, 500));
				} else {
					this.resetUnit(host);
				}//end if
			}
		, this);
	},
	resetUnit: function(host) {
		host.className = '';
		host.querySelector('img').src = this.conf.transparent;
		this.Ens.main.appendChild(host);
		this.progress(host, 0);
		this.Data.listData[host.id] = null;

		this.Ens.lists = [];
		[].slice.call(this.Ens.main.querySelectorAll('li')).forEach(
			function(host) {
				this.Ens.lists.push(host);
			}
		, this);

		this.Data.actAmt = this.Ens.main.querySelectorAll('.active').length;
		this.triggerPlace();
		this.refresh();

		if (!this.Ens.main.querySelectorAll('.fail').length) {
			this.Ens.host.classList.remove('mod-upload-fail');
			this.buildData();
		}//end if

		this.executeCallBack('delete');
	},
	refresh: function() {
		var w, p, e;
		if (isEmptyObject(this.Ens)) return;
		e = this.Ens.lists[0];
		w = getSize(e);
		p = getPosition(e);
		this.Data.sData = {};
		this.Data.sData.w = w[0];
		if (!this.Data.sData.w) this.Data.sData.w = w[1];
		this.Data.sData.h = w[1];
		this.Data.sData.x = p[0];
		this.Data.sData.y = p[1];
		this.Data.sData.rowAmt = Math.ceil(this.Data.actAmt / this.Data.col);
		this.Data.sData.mX = this.Data.sData.x + this.Data.sData.w * this.Data.col;
		this.Data.sData.mY = this.Data.sData.y + this.Data.sData.h * this.Data.sData.rowAmt;
		this.Data.sData.rows = Math.ceil(this.Data.max / this.Data.col);

		//sorting animation
		if (typeof this.anis != 'undefined') {
			if (this.wc.ShadowDOM) {
				e = ':host(.mod-sorting) ul';
			} else {
				e = (this.cssRuleMode == 'id') ? '#'+this.Ens.host.id+'.mod-sorting ul' : '.mod-sorting#'+this.Ens.host.id+' ul';
			}//end if
			createCSSClass(e, 'width:'+(this.Data.sData.w * this.Data.col)+'px;height:'+(this.Data.sData.h * this.Data.sData.rows)+'px;', this.Ens.sheet);
			this.resetLists();
		}//end if
	},
	resetBasic: function() {
        try{ this.Ens.callBackE.remove(); } catch(e) {}
        this.Ens.form.removeAttribute('action');
        this.Ens.form.removeAttribute('target');
        this.mkTrigger();
	},
	resetLists: function() {
		var h , col, row;
		h = 100 / this.Data.sData.rows;
		if (typeof this.anis != 'undefined') {
			for (var i=-1,l=this.Ens.lists.length;++i<l;) {
				var host = this.Ens.lists[i], x, y;
				col = i % this.Data.col;
				row = Math.floor(i / this.Data.col);
				x = col * (100/this.Data.col);
				y = row * h;
				host.data = {
					col: col,
					row: row,
					x: x,
					y: y
				};
				createCSSClass('#'+host.id, 'left:'+x+'%;top:'+y+'%', this.Ens.sheet);
			}//end for
		}//end if
	},
	buildData: function() {
		if (!this.Ens.dataCollect) return;
		
		empty(this.Ens.dataCollect);
		this.Ens.lists.forEach(
			function(host, idx) {
				var id, data;
				if (!host.classList.contains('active')) return;
				id = host.id;
				if (!this.Data.listData[id]) return;

				data = this.Data.listData[id];
				Object.keys(data).forEach(
					function(key) {
						var input;
						input = mk('', {tag:'input', att:{type:'hidden'}});
						input.name = this.Data.name + '[' + idx.toString() + '][' + key + ']';
						input.value = data[key];
						this.Ens.dataCollect.appendChild(input);
					}
				, this);
			}
		, this);
	},
	tEndG: function(e) {
		var obj, ins;

		obj = tNa(e, 'ul');
		ins = getIns(obj.t, 'illuTransC');
		if (!ins) return;
		ins.tEnd(e);
	},
	tEnd: function(e) {
		var obj, ins;

		obj = tNa(e);
		if (obj.t.classList.contains('erase')) {
			//delete
			this.resetUnit(obj.t);
			return;
		}//end if

		if (!obj.t.classList.contains('delete')) return;

		//all animation done
		ins = this;
		clearTimeout(this.Data.iid);
		this.Data.iid = setTimeout(function(){ins.upDone();}, 300);
	},
	upload: function() {
		var host;
		this.Ens.host.classList.add('mod-upload');
		this.executeCallBack('upload');

        host = this.Ens.lists[this.Data.actAmt];
        this.Ens.funcHost = host;
        host.classList.add('upload');
        this.progress(host, 'upload');
        this.Ens.form.setAttribute('action', this.Data.uri);
        this.Ens.form.setAttribute('target', this.Data.dataTunnel);

        this.Ens.callBackE = mk('', {tag:'input', att:{type:'hidden', name:'callBack', value:'OilluTransC.illuTransC'+this.id+'.qdCallBack'}});
        this.Ens.form.appendChild(this.Ens.callBackE);
        this.Ens.form.appendChild(this.Ens.input);
        this.Ens.form.submit();
	},
	ddActG: function(e) {
		var obj, ins, dt, vessel, html, files, amt, imageData;

		stopEvents(e);
		obj = tNa(e);
		switch (obj.a) {
			case 'drop':
				for (var i in OilluTransC) OilluTransC[i].ddPlace('off');
				ins = getIns(eTrack(obj.t, 'illu-trans'), 'illuTransC');
				if (!ins || ins.Ens.host.hasAttribute('disabled')) return;

				try {
					html = e.dataTransfer.getData('text/html');
				} catch(err) {}

				if (html) {
					vessel = illuTransC.prototype.vessel;
					vessel.innerHTML = html;
					files = [];
					[].slice.call(vessel.querySelectorAll('img')).forEach(
						function(img) {
							if (img.src) files.push(img.src);
						}
					);
					empty(vessel);
					if (!files.length) return;

					amt = files.length;
					imageData = [];
					files.forEach(
						function(source) {
							var image;
							image = new Image();
							image.crossOrigin = 'anonymous';
							image.onload = image.onerror = function(evt) {
								var canvas, ctx, dataURL;
								if (evt.type == 'error') amt--;
								else {
									canvas = document.createElement('canvas');
									canvas.width = this.width;
									canvas.height = this.height;

									ctx = canvas.getContext('2d');
									ctx.drawImage(this, 0, 0);

									try {
										dataURL = canvas.toDataURL('image/png');
										imageData.push(ins.dataURItoBlob(dataURL));
									} catch(err) { amt--; }
								}//end if
								if (imageData.length == amt) ins.fHandler(imageData);
							};
							image.src = source;
						}
					);
				} else if (typeof e.dataTransfer.files != 'undefined' && e.dataTransfer.files.length) {
					ins.fHandler(e.dataTransfer.files);
				}//end if

				//i13n
				ins.i13n('illuTransCAct', 'drop');
				ins.executeCallBack('drop');
				break;
			case 'dragenter':
				for (var i in OilluTransC) {
					var ins;
					ins = OilluTransC[i];
					if (ins.Ens.host.hasAttribute('disabled')) continue;
					ins.ddPlace('on');
				}//end for
				break;
			case 'dragleave':
				ins = getIns(eTrack(obj.t, 'illu-trans'), 'illuTransC');
				for (var i in OilluTransC) {
					if (OilluTransC[i] == ins) continue;
					OilluTransC[i].ddPlace('off');
				}//end for
				break;
		}//end switch
	},
	ddPlace: function(mode) {
		this.Ens.host.classList[(mode == 'on') ? 'add' : 'remove']('mod-dropplace');
	},
	dataURItoBlob: function(dataURI) {
	    // convert base64 to raw binary data held in a string
		// http://stackoverflow.com/questions/4998908/convert-data-uri-to-file-then-append-to-formdata
		// https://github.com/blueimp/JavaScript-Canvas-to-Blob/blob/master/canvas-to-blob.js
	    var byteString = (dataURI.split(',')[0].indexOf('base64') != -1) ? atob(dataURI.split(',')[1]) : decodeURIComponent(dataURI.split(',')[1]),
			mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0],
			ab = new ArrayBuffer(byteString.length),
			ia = new Uint8Array(ab),
			bb;
		for (var i=-1,l=byteString.length;++i<l;) ia[i] = byteString.charCodeAt(i);
		if (window.Blob) bb = new Blob([ia], {type: mimeString});
		else {
			bb = new (window.MozBlobBuilder || window.WebKitBlobBuilder || window.BlobBuilder);
			bb.append(ab);
			bb = bb.getBlob(mimeString);
		}//end if
		return bb;
	},
	i13n: function(action, label) {
		var data;
		if (typeof gaExt == 'undefined') return;

		data = {
			action: action
		};
		data.label = label || 'none';
		gaExt.doEventBeacon(this.Ens.host, data);
	}
};

/*auto-registration*/
(function() {
	var dependencies, c = 0, max = 10000;//10 seconds
	if (typeof navigator.oRegists == 'undefined') navigator.oRegists = {};
	dependencies = illuTransC.prototype.dependencies;
	navigator.oRegists.illuTransC = setInterval(
		function() {
			var isReady = true;
			c += 5;
			if (c >= max) {
				clearInterval(navigator.oRegists.illuTransC);
				return;
			}//end if
			for (var i=-1,l=dependencies.length;++i<l;) {
				var root = window, d = dependencies[i].split('.');
				while (d.length) {
					var prop = d.shift();
					if (!root[prop]) {
						root = null;
						break;
					} else root = root[prop];
				}//end while
				isReady &= (root != null);
			}//end for
			if (isReady && document.body) {
				clearInterval(navigator.oRegists.illuTransC);
				navigator.oRegists.illuTransC = null;
				illuTransC.prototype.determine();
			}//end if
		}
	, 5);
})();
/*programed by mei(李維翰), http://www.facebook.com/mei.studio.li*/