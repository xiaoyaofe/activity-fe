export default class Pixel {
	private ga: string;
	private fb: string;

	constructor(ga:string,fb:string) {
		this.ga = ga;
		this.fb= fb;
		this.init();
	}

	private init() {
		if (this.fb) initFB(this.fb);
		if (this.ga) initGa(this.ga);
	}

	private facebook = (name: string, param?: any) => {
		param && param.fb ? window.fbq('track', name, param.fb) : window.fbq('track', name);
		console.info(`"${name}" has pixeled - facebook`, param);
	}

	private google = (name: string, param?: any) => {
		param && param.ga ? window.gtag('event', name, param.ga) : window.gtag('event', name);
		console.info(`"${name}" has pixeled - google`, param);
	}

	public pixel(name: string, param?: Params): void {
		console.info('pixel------------------------------');
		if (this.ga) this.google(name, param);
		if (this.fb) this.facebook(name, param);
	}
}

interface Params {
	ga: object;
	fb: object;
}
function initGa(ga) {
	(function (f, b, e, v, n, t?: any, s?: any) {
		t = b.createElement(e); t.async = !0;
		t.src = v; t.async = true; s = b.getElementsByTagName(e)[0];
		s.parentNode.insertBefore(t, s);
	})(window, document, 'script',
		`https://www.googletagmanager.com/gtag/js?id=${ga}`);
	window.dataLayer = window.dataLayer || [];
	window.gtag = function () { window.dataLayer.push(arguments); }
	window.gtag('js', new Date());
	window.gtag('config', ga)
}
function initFB(fb) {
	(function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
		if (f.fbq) return; n = f.fbq = function () {
			n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
		};
		if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
		n.queue = []; t = b.createElement(e); t.async = !0;
		t.src = v; s = b.getElementsByTagName(e)[0];
		s.parentNode.insertBefore(t, s);
		const noscript = document.createElement('noscript')
		noscript.innerHTML = `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${fb}&ev=PageView&noscript=1" />`;
		document.body.appendChild(noscript);
	})(window, document, 'script',
		'https://connect.facebook.net/en_US/fbevents.js');
	window.fbq('init', fb);
	window.fbq('track', 'PageView');
}