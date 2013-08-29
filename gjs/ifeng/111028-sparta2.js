var ifeng = ifeng || {};
ifeng.Sparta = ifeng.Sparta || {};
ifeng.Ad = ifeng.Ad || {};
ifeng.Util = ifeng.Util || {};
(function(){
	ifeng.Ad.Cookie = {
	/**
	 * @param name cookie name
	 * @param value cookie value
	 * @param options expires-path-domain
	 * @returns
	 */
	setCookie : function (name, value, options) {
		if(!this.validateCookieName(name)){
            return;
        };
		if (this.isUndefined(value)){
			return;
		}
		options = options || {};
		var text = this._createCookieString(name, value, !options.raw, options);
		document.cookie = text;
		return text;
	},
	/**
	 *
	 * @param name cookie name
	 * @param options callback
	 * @returns
	 */

    getCookie : function (name, options) {
        if(!this.validateCookieName(name)){ return;};
        var cookies,
            cookie,
            converter;
        if (this.isFunction(options)) {
            converter = options;
            options = {};
        } else if (this.isObject(options)) {
            converter = options.converter;
        } else {
            options = {};
        }

        cookies = this._parseCookieString(document.cookie);
        cookie = cookies[name];
        if (this.isUndefined(cookie)) {
            return null;
        }
        if (!this.isFunction(converter)){
            return cookie;
        } else {
            return converter(cookie);
        }
    },
    /**
     *
     * @param name cookie name
     * @param value cookie value
     * @param encodeValue if encode
     * @param options expire-path-domain
     * @returns {String}
     */
    _createCookieString : function (name, value,encodeValue,options) {
		options = options || {};
		encodeValue = true;
		 var text  = encodeURIComponent(name) + "=" + (encodeValue ? encodeURIComponent(value) : value),
	         expires = options.expires,
	         path    = !options.path ? '/':options.path,
	         domain  = !options.domain ? location.host : options.domain;
		if (this.isObject(options)){
			if (typeof expires === 'number'){ 
				text += "; expires=" + new Date(expires).toUTCString();
			}
			if (this.isString(path) && path !== ""){
				text += "; path=" + path;
			}
			if (this.isString(domain) && domain !== ""){
				text += "; domain=" + domain;
			}
			if (options.secure === true){
				text += "; secure";
			}
		}
		return text;
	},
	/**
	 *
	 * @param text: cookie name
	 * @returns  find cookie value
	 */
    _parseCookieString : function (text) {
        var cookies = {};
        if (this.isString(text) && text.length > 0) {
            var cookieParts = text.split(/;\s/g),
                cookieName  = null,
                cookieValue = null,
                cookieNameValue = null;

            for (var i=0, len=cookieParts.length; i < len; i++){
                cookieNameValue = cookieParts[i].match(/([^=]+)=/i);
                if (cookieNameValue instanceof Array){
                    try {
                        cookieName = cookieNameValue[1];
                        cookieValue = cookieParts[i].substring(cookieNameValue[1].length+1);
                    } catch (ex){

                    }
                } else {
                    cookieName = cookieParts[i];
                    cookieValue = "";
                }
                cookies[cookieName] = decodeURIComponent(cookieValue);
            }

        }
        return cookies;
    },
    /**
     *
     * @param name:cookie name
     * @param options: set expire 0
     * @returns
     */
    remove : function (name, options) {
        this.validateCookieName(name);
        options = options || {};
        options.expires = new Date(0);
        return this.setCookie(name, "", options);
    },
	validateCookieName : function(name) {
        if (!this.isString(name) || name === ""){
            return false;
        }else{
            return name;
        }
    },
	isUndefined : function(o) {
	    return typeof o === 'undefined';
	},
	isString : function(o) {
	    return typeof o === 'string';
	},
	isFunction : function(o) {
	    return typeof o === 'function';
	},
	isObject : function(o, failfn) {
	    var t = typeof o;
	    return (o && (t === 'object' || (!failfn && (t === 'function' || this.isFunction(o))))) || false;
	}
};

ifeng.Util.getList = function(list, area) {
	var i = 0, len = list.length, result = [],
		parse = function(multi, area) {
			if(multi.indexOf('|') == -1) {
				if(multi == area) {
					return true;
				}
				return false;
			}
			var arr = multi.split('|'),
				len = arr.length, i = 0;
			for(i; i < len; i++) {
				if(arr[i] == area) {
					return true;
				}
			}
			return false;
		};
	for(i; i < len; i++) {
		var o = list[i];
		if(!o['area'] || (o['area'] && parse(o.area, area))) {
			result.push(o);
		} 
	}
	return result;
};

/**
 * ifeng.Util.merge
 * 合并对象，只支持第一级合并
 * <p>
 * 	调用：ifeng.Util.merge({ a: 1, b:2 }, { a:2, c:3 });
 * 	转出： { a: 2, b: 2 }
 * 	注意：合并的时候只可以合并source里预设的，初始化参数的时候使用
 * </p>
 * @param {Object} source 原有对象
 * @param {Object} target 目标对象
 */
ifeng.Util.merge = function(source, target) {
	if(!source) return {}; 
	if(!target) return source; 
	var r = {};
	for(var i in source) {
		r[i] = typeof target[i] == 'undefined' ? source[i] : target[i];
	}
	return r;
};
/**
 * ifeng.Util.browser
 * 判断浏览器
 * <p>
 * 	调用：ifeng.Util.browser().IE 判断是否为IE
 * 	输出：ie --> true || 非ie -- > false 
 * </p>
 * @param {String} IE|OPERA|MOZ|IE6|IE7|IE8|SAFARI|IPHONE
 */
ifeng.Util.browser = function() {
	var b = {}, a = navigator.userAgent.toLowerCase();
	b.IE = /msie/.test(a);
	b.OPERA = /opera/.test(a);
	b.MOZ = /gecko/.test(a);
	b.IE6 = /msie 6/.test(a);
	b.IE7 = /msie 7/.test(a);
	b.IE8 = /msie 8/.test(a);
	b.SAFARI = /safari/.test(a);
	b.CHROME = /chrome/.test(a);
	b.IPHONE = /iphone os/.test(a);
	return b;
};
/**
 * ifeng.Util.getById
 * 选择元素
 * @param {String} id 选择元素的ID，如果id等于body时 返回body元素
 * @returns {Element} 选中元素
 */
ifeng.Util.getById = function(id) {
	if(id == 'body') {
		return document.body;
	}else {
		return document.getElementById(id);
	}
};
/**
 * ifeng.Util.getScript
 * 加载脚本
 *	<p>
 * 	调用：ifeng.Util.getScript('http://xxx.com/xx.js', 'id', function(){ //XXX 回调操作 }) 判断是否为IE
 * </p>
 * @param {String} src 脚本地址
 * @param {String} id 脚本Id (可选)
 * @param {Function} callback 脚本加载结束回调函数 
 */
ifeng.Util.getScript = function(src, id, callback) {
	var a = document.createElement("script");
	if(typeof id == 'function') {
		callback = id;
	}else {
		id && a.setAttribute('id', id);
	}
	a.onload = a.onreadystatechange = function() {
		if (!this.readyState || this.readyState === "loaded"
				|| this.readyState === "complete") {
			callback && callback();
			a.onload = a.onreadystatechange = null;
		}
	};
	a.src = src;
	document.getElementsByTagName("head")[0].appendChild(a);
};

/**
 * ifeng.Util.bind
 * 绑定监听事件
 * <p>
 * 	调用：ifeng.Util.bind(document, 'mousewheel', function(e) { //XXX 回调操作	});
 * </p>
 * @param {Elment} target 监听元素
 * @param {String} event 事件（不带on, 如：'click'）
 * @param {Function} callback 事件回调方法含（event对象）
 * @param {Object} scope 作用域(可选)
 */
ifeng.Util.bind = function(target, event, callback, scope) {
	// 如果指定了scope，将其作为callback的this传入callback方法
	var delegate = callback;
	if (scope) {
		delegate = function(event) {
			callback.call(scope, event); 
		};
	}
	// 根据浏览器绑定事件
	if (window.addEventListener) {  // Mozilla, Chrome, Firefox
		target.addEventListener(event, delegate, false);
	} else {  // IE
		target.attachEvent("on" + event, delegate);
	}			
};

/**
 * ifeng.Util.stopEvent
 * <p>
 * 	调用：ifeng.Util.bind(document, 'mousewheel', function(e) {
 * 			....
 * 
 * 			ifeng.Util.stopEvent(e);
 * 		});
 * </p>
 * 取消默认浏览器操作，阻止事件冒泡
 * @param {Object} e 事件句柄
 */
ifeng.Util.stopEvent = function(e) {
	if (e && e.stopPropagation) {
		e.stopPropagation();
		e.preventDefault();
	} else {
		window.event.returnValue = false;
		window.event.cancelBubble = true;
	}
};
/**
 * ifeng.Util.createElement
 * 创建元素
 * <p>
 * 	snail = ifeng.Util.createElement('div', {
 *			position: 'fixed',
 *			top: '10px',
 *			width: '200px',
 *			zIndex: 100,
 *			display: 'none'
 *		}, 'click', function() {
 *			//XXX 点击操作
 *		}),
 * </p>
 * @param {String} tag 需要创建的标签名
 * @param {Object} props 样式集合,使用JSON格式
 * @param {String||Array} 监听事件，不带'on', 如果为Array,格式为[{ event: 'click', fn: fn }];
 * @param {Function} 触发事件，如果event参数为Array，此参数无效
 */
 //创建一个dom对象
ifeng.Util.createElement = function(tag, props, event, fn) {
	var t = document.createElement(tag),
		pos = props['position'],
		addListener = function() {
			if(pos && pos == 'fixed' && ifeng.Util.browser().IE6) {
				var top = typeof props['top'] == 'undefined' ? 0 : props['top'];
				if(typeof top == 'string' && top.length > 2) {
					top = Number(top.split('px')[0]);
				}else {
					top = Number(top);
				}
				props['position'] = 'absolute';
				delete props['top'];
			}
			delete props['isListen'];
		};
	!props['isListen'] ? null : addListener(); 
	for(var i in props) {
		t.style[i] = props[i];
	}
	if(!event || !fn) { return t;}
	if(event.constructor == Array) {
		for(var i = 0, len = event.length; i < len; i++) {
			(function(i){
				ifeng.Util.bind(t, event.event, event.fn);
			})(i);
		}
	}else {
		ifeng.Util.bind(t, event, fn);
	}
	return t;
};
/**
 * 用于判断图片，iframe加载完成
 */
ifeng.Util.ready = function(el, callback) {
	if (el.attachEvent){
    	el.attachEvent("onload", function(){
	        callback && callback();
	    });
	} else {
	    el.onload = function(){
	        callback && callback();
	    };
	}
};

ifeng.Util.addClass = function(el, className) {
	if(typeof el === 'string') el = document.getElementById(el);
	var names = el.className;
	el.className = names == '' ? className : names + ' ' + className;
};

ifeng.Util.paseJSON = function(str) {
	return (new Function('return ' + str))();
};
ifeng.Util.JSONToStr = function(json) {
	var arr = [], me = this,
		format = function(s) {
			if(typeof s == 'object' && s != null) {
				return ifeng.Util.JSONToStr.JSONToStr(s);
			}else {
				return /^(string|number)$/.test(typeof s) ? "'" + s + "'" : s;
			}
		};
	for (var i in json) {
		arr.push("'" + i + "':" + format(json[i]));
	}
	return '{' + arr.join(',') + '}';
};
/**
*从url取素材名称
*@param {string} 
*
*/
ifeng.Util.getFileName = function(url) {
	if(url == '' || typeof url == 'undefined') {
		return '';
	}
	var lastNode = url.lastIndexOf('/');
	return url.substring(lastNode + 1, url.lastIndexOf('.'));
}
/**
 * 频次控制
 * @param {String} time 频次设定，格式为：'2|24' 前者为次数，后者为秒，此处代表每二十四秒显示两次
 * @param {String|Number} cookieId 用于设定cookie的素材地址（通过素材的文件名和域名拼接成cookie名）
 * @param {Function} inFn 不超时操作
 * @param {Function} outFn 超时操作
 * @param {Function} fixFn 不超时补充操作，在不超时操作之后调用
 * @param {date} fixTimeout 有特殊要求的频次控制(到期时间的日期对象)
 */
ifeng.Util.frequency = function(time, cookieId, inFn, outFn, fixFn,fixTimeout) {
	if(time == '') { inFn && inFn(); fixFn && fixFn(); return; }
	var cookieName = ifeng.Util.getSecondDomain() + ifeng.Util.getFileName(cookieId),
		cookie = ifeng.Ad.Cookie.getCookie(cookieName), //取得cookie的值 {c:2,d:121}, c表示次数，d表示过期时间
		cache = time.split('|'), 
		timeout = new Date(),
		cache1 = Number(cache[1]),
		cache0 = Number(cache[0]),
		firstCall = function() {
			inFn && inFn();
			var milliscond = timeout.getTime();
			ifeng.Ad.Cookie.setCookie(cookieName, '{c:1,d:'+ milliscond +'}', { expires: milliscond });
			fixFn && fixFn();
		};
	if(fixTimeout != null && typeof fixTimeout != 'undefined') {
		
		timeout.setSeconds( timeout.getSeconds() + (fixTimeout.getTime() - timeout.getTime()) / 1000 );
	}else{
		timeout.setSeconds(timeout.getSeconds() + cache1); // 设定超时间
	}
	if(cookie == null) {
		firstCall();
	}else {
		cookie = ifeng.Util.paseJSON(cookie);
		if(new Date().getTime() - cookie.d < cache1) {
			if(cookie.c < cache0) {
				inFn && inFn();
				cookie.c += 1;
				ifeng.Ad.Cookie.setCookie(cookieName, ifeng.Util.JSONToStr(cookie), { expires: cookie.d });
				fixFn && fixFn();
			}else {
				outFn && outFn();
			}
		}else {
			firstCall();
		}
	}
};
//获得二级域名（频道域名）
ifeng.Util.getSecondDomain = function() {
		var arr_domain=document.domain.split(".");
		return arr_domain[0];
};
//控制轮播cookie名的组装 (广告类别+二级域名)
ifeng.Util.getCookieName = function(catagory) {
	var secondDomain = ifeng.Util.getSecondDomain();
	return catagory + secondDomain;
};
var Player = function(settings) {
	this.settings = ifeng.Util.merge({ url : "", width : 300, height : 225, id : "" }, settings);
	this.params = {};
	this.variables = {};
	this.flashvars = '';
};
Player.prototype = {
	addParam: function(name, value) {
		this.params[name] = value;
	},
	addVariable: function(name, value) {
		this.variables[name] = value;
	},
	getVariables: function() {
		var a = [], o = this.variables;
		for(var i in o) {
			a.push(i + "=" + o[i]);
		}
		return a.join("&");
	},
	getParamString: function(isIE) {
		var a = [], o = this.params;
		if(isIE) {
			for(var i in o) {
				a.push('<param name="' + i + '" value="' + o[i] + '">');
			}
		}else {
			for(var i in o) {
				a.push(i + "=" + o[i] + " ");
			}
		}
		return a.join("");
	},
	addFlashVars: function(str) {
		this.flashvars = str;
	},
	//与flash程序进行交互调用
	callExternal: function(movieName, method, param, mathodCallback) {
		var o = navigator.appName.indexOf("Microsoft") != -1 ? window[movieName] : document[movieName];
		o[method](param, mathodCallback);
	},
	play : function() {
		var fls = this.getVersion();
		if (!(parseInt(fls[0] + fls[1] + fls[2]) > 901)) {
			return '<a style="display:block;height:31px;width:165px;line-height:31px;font-size:12px;text-decoration:none;text-align:center;margin:10px auto;border:2px outset #999;" href="http://get.adobe.com/flashplayer/" target="_blank">请安装最新Flash播放器</a>';
		}
		var f = [];
		if (!!window.ActiveXObject) {
			f.push('<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" width="');
			f.push(this.settings.width);
			f.push('" height="');
			f.push(this.settings.height);
			f.push('" id="');
			f.push(this.settings.id);
			f.push('"><param name="movie" value="');
			f.push(this.settings.url);
			f.push('"><param name="flashvars" value="');
			f.push(!this.flashvars ? this.getVariables() : this.flashvars);
			f.push('">');
			f.push(this.getParamString(true));
			f.push("</object>");
		} else {
			f.push('<embed pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash"');
			f.push(' src="');
			f.push(this.settings.url);
			f.push('" height="');
			f.push(this.settings.height);
			f.push('" width="');
			f.push(this.settings.width);
			f.push('" flashvars="');
			f.push(!this.flashvars ? this.getVariables() : this.flashvars);
			f.push('" ');
			f.push(this.getParamString(false));
			f.push(">");
		}
		return f.join("");
	},
	getVersion : function() {
		var b = [ 0, 0, 0 ];
		if(navigator.plugins && navigator.mimeTypes.length) {
			var plugins = navigator.plugins["Shockwave Flash"];
			if(plugins && plugins.description) {
				return plugins.description.replace(/^\D+/, "").replace(/\s*r/, ".").replace(/\s*[a-z]+\d*/, ".0").split(".");
			}
		}
		if(navigator.userAgent && navigator.userAgent.indexOf("Windows CE") != -1) {
			var c = 1, f = 3;
			while (c) {
				try {
					c = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + (++f));
					return [ f, 0, 0 ];
				} catch (d) {
					c = null;
				}
			}
		}
		try {
			var c = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
		}catch (d) {
			try {
				var c = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
				b = [ 6, 0, 21 ];
				c.AllowScriptAccess = "always";
			} catch (d) {
				if (b.major == 6) return b;
			}
			try {
				c = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
			} catch (d) {
			}
		}
		if (c) {
			b = c.GetVariable("$version").split(" ")[1].split(",");
		}
		return b;
	}
};

var runs = {},
	_timerId = '',
	_ads = '',
	_instances = {}, //实例化对象存储
	_counts = '', // { 'level_0': 1, 'level_1': 2}
	_currentIndex = 0,
	_len = 0,
	_interval = 5000,
	_currentArea = '',
	clearTimeoutCookie = function(adList) {
		var prefix = 'adPosId_',
			cookies = document.cookie.split(/;\s/g),
			len = cookies.length, i = 0, j = 0,
			adLen = adList.length;
		if(len == 0 || adLen == 0) { return; };	
		for(i; i < len; i++) {
			var cookie = cookies[i],
				name = cookie.split('=')[0],
				reg = new RegExp();
			if(cookie.indexOf('adPosId_') == -1) {
				continue;			
			}	
			for(j; j < adLen; j++) {
				try{
					var posId = adList[j].posId;
					if( name == posId) { //选出广告的cookie并判断当前广告列表中是否有和cookie名一样的posId
						continue;
					}
					ifeng.Ad.Cookie.remove(name);
				}catch(e) {
					continue;
				}
			}
		}
	},
	//结束上一个广告，并开始启动下一个广告
	_end = function(adInfo) {
		var level = adInfo.level,
			freeze = adInfo.freeze;
		_counts['level_' + level] -= 1;
		if(_counts['level_' + level] == 0) {
			try {
				if(freeze != '') {
					setTimeout(function() {
						next();
					}, freeze * 1000);
				}else {
					next();
				}
			}catch(e) {
				
				next();
			}
		}
	},
	bind = function(instance, adInfo) {
		instance.__end = function(){
			//console.log(adInfo.catagory + "__end");
			_end(adInfo);
		};
		if(adInfo['isFlash'] == true) {
			instance.__getFlash = function(settings) {
				return new Player(settings);
			};
		}
	},
	//启动单个插件
	exe = function(adInfo) {
		try{
			//leyc modify start
			if(adInfo.isIfeng) {
					
				var single = '', 
					currentCookie = '',
					list = adInfo['isArea'] == true ? ifeng.Util.getList(adInfo.list, _currentArea) : adInfo.list,
					len = list.length;
				if(Number(adInfo.changeTimes) > 1 ) {	
					if(len == 0) {
						
						next();
						return;
					//}else if(len == 1) {
						
						//single = list[0];
					}else {
						//var cookieName = adInfo.posId,//by chaoning
						var cookieName = ifeng.Util.getCookieName(adInfo.catagory);
							cookie = ifeng.Ad.Cookie.getCookie(cookieName); //{i:1,d: 123123}
							
						if(cookie == null) {
							cookie = Math.floor(Math.random() * len); // 产生从0到len之间的随机数
							single = list[cookie];
							var timeoutCookie = new Date();
							timeoutCookie.setMonth(timeoutCookie.getMonth() + 1);
							var millisecond = timeoutCookie.getTime();
							ifeng.Ad.Cookie.setCookie(cookieName, '{i:' +  cookie + ',d:' + millisecond + '}', { expires: millisecond });
						}else {
							cookie = ifeng.Util.paseJSON(cookie); //{i:1,d: 123123}
							var index = Number(cookie.i);
							
							index = index > Number(adInfo.changeTimes) - 1 ? 0 : index;
							single = list[index];
							//cookie.i = index; //by chaoning
							cookie.i = index + 1;
							ifeng.Ad.Cookie.setCookie(cookieName, ifeng.Util.JSONToStr(cookie), { expires: Number(cookie.d) });
						}
					}
				}else{
					if(len == 0) {
						next();
						return;
					}else{
						single = list[0];
					}
				}
			}
			single.catagory = typeof single.catagory == 'undefined' ? adInfo.catagory : single.catagory;
			var thisSingle = typeof single == 'undefined' ? adInfo : single;
			
			//leyc modify end
			var me = this,
				//cls = (new Function('return ifeng.Ad.' + adInfo.catagory))(),//by chaoning
				
				cls  = (new Function('return ifeng.Ad.' + single.catagory))(),//by leyc
				instance = null,
				instanceId = 'ifengAdInstanceId_' + new Date().getTime(); //创建实例化对象ID
				
			if(typeof cls === 'object') {
				instance = cls;
			}else {
				
				if(adInfo.isIfeng) {
					/*by chaoning
					var single = '', 
						currentCookie = '',
						list = adInfo['isArea'] == true ? ifeng.Util.getList(adInfo.list, _currentArea) : adInfo.list,
						len = list.length;
					if(len == 0) {
						next();
						return;
					}else if(len == 1) {
						
						single = list[0];
					}else {
						//var cookieName = adInfo.posId,//by chaoning
						var cookieName = ifeng.Util.getCookieName(adInfo.catagory);
							cookie = ifeng.Ad.Cookie.getCookie(cookieName); //{i:1,d: 123123}
						if(cookie == null) {
							cookie = Math.floor(Math.random() * len); // 产生从0到len之间的随机数
							single = list[cookie];
							var timeoutCookie = new Date();
							timeoutCookie.setMonth(timeoutCookie.getMonth() + 1);
							var millisecond = timeoutCookie.getTime();
							ifeng.Ad.Cookie.setCookie(cookieName, '{i:0,d:' + millisecond + '}', { expires: millisecond });
						}else {
							cookie = ifeng.Util.paseJSON(cookie); //{i:1,d: 123123}
							var index = Number(cookie.i);
							
							index = index > len - 1 ? 0 : index;
							single = list[index];
							//cookie.i = index; //by chaoning
							cookie.i = index + 1;
							ifeng.Ad.Cookie.setCookie(cookieName, ifeng.Util.JSONToStr(cookie), { expires: Number(cookie.d) });
						}
					}
					*/
					
					instance = !adInfo.list ?  new cls() : new cls(single, instanceId);
					
				}else {
					
					instance = new cls(adInfo['list'], instanceId);
				}
				_instances[instanceId] = instance;
				bind(instance, adInfo);
				
			}
			
			instance.run(adInfo['runArgs']);
						
			if(!runs[adInfo.catagory]) {
				//runs[adInfo.catagory] = adInfo['path'];//by chaoning
				runs[adInfo.catagory] = thisSingle['path'];//by leyc
			}
			//调用计数接口
			var bingo = adInfo['bingo'];
			bingo && ifeng.Util.getScript(bingo);
		}catch(e) {
			
			//_end(adInfo.level);//by chaoning
			_end(adInfo);
			//console.log(e);
			
		}
	},
	//每跳到一个新的级别都会执行一次run方法
	run = function(list) {
		
		var i = 0, len = list.length;
		
		for(i; i < len; i++) {
			var adInfo = list[i];
			
			adInfo = ifeng.Util.merge({
				catagory: '', 
				path: '',
				list: '',
				runArgs: '',
				level: 0,
				isFlash: true,
				isArea: false,
				posId: '',
				bingo: '',
				freeze: '',
				isIfeng: true,
				changeTimes : 1
			}, adInfo);
			//add by leyc
			if(adInfo.isIfeng) {
				
				var single = '', 
					currentCookie = '',
					thisList = adInfo['isArea'] == true ? ifeng.Util.getList(adInfo.list, _currentArea) : adInfo.list,
					
					thisLen = thisList.length;
					//如果该广告轮播数大于1
				if(Number(adInfo.changeTimes) > 1 ) {	
					if(thisLen == 0) {

						continue;
					//}else if(thisLen == 1) {
						
						//single = thisList[0];
					}else {
						//var cookieName = adInfo.posId,//by chaoning
						var cookieName = ifeng.Util.getCookieName(adInfo.catagory);
							cookie = ifeng.Ad.Cookie.getCookie(cookieName); //{i:1,d: 123123}
						if(cookie == null) {
							cookie = Math.floor(Math.random() * thisLen); // 产生从0到len之间的随机数
							single = thisList[cookie];
							var timeoutCookie = new Date();
							timeoutCookie.setMonth(timeoutCookie.getMonth() + 1);
							var millisecond = timeoutCookie.getTime();
							ifeng.Ad.Cookie.setCookie(cookieName, '{i:' + cookie + ',d:' + millisecond + '}', { expires: millisecond });
						}else {
							cookie = ifeng.Util.paseJSON(cookie); //{i:1,d: 123123}
							var index = Number(cookie.i);
							
							index = index > Number(adInfo.changeTimes) - 1 ? 0 : index;
							
							single = thisList[index];
							//如果碰到空轮播，直接进行下个广告的播放
							if(typeof single == 'undefined') {
								
								ifeng.Ad.Cookie.setCookie(cookieName, '{i:' + (index + 1) + ',d:' + millisecond + '}', { expires: millisecond });
								//console.log(adInfo.catagory + "   "+ adInfo.changeTimes +"  " + index);
								_end(adInfo);
								continue;
							}
							
						}
					}
				}else{//如果小于
					if(thisLen == 0) {
						continue;
					}else {
						single = thisList[0];
					}
				}
			}
			
			var thisAdInfo = {};
			thisAdInfo = typeof single == 'undefined' ? adInfo : single;
			adInfo['path'] = thisAdInfo['path'];
			//add by leyc end 
			var	url = runs[adInfo.catagory];
			if(!url && adInfo['path']) {
				(function(adInfo) {
					//XXX 上线前去掉所有的日期后缀 + '?' + new Date().getTime()
					
					ifeng.Util.getScript(adInfo['path'] , function() {
						exe(adInfo);
					});
					
				})(adInfo);
			}else {
				exe(adInfo);
			}
		};
		_timerId = setTimeout(function() {
			
			next();
		}, _interval);
	};
	next = function() {
		if(_currentIndex < _len) {
			clearTimeout(_timerId);
			var list = _ads[_currentIndex++];
			if(!list) { next(); return; }
			run(list);
		}else {
			clearTimeoutCookie(ads);
		}
	};

	ifeng.Sparta.AdManager = function(ads, settings) {
		if(!ads || ads.constructor != Array || ads.length == 0) { return; };
		this.settings = ifeng.Util.merge({ interval: 15000 }, settings);
		var i = 0, j = 0, len = ads.length, list = [], temp=[], counts = {}, p;
		//进行同类型合并归总
		for(i; i < len; i++) {
			var o = ads[i];
			if(typeof(o) != 'undefined' && o != null) {
							
				for(j = i+1; j < len; j++) {
					p = ads[j];
					
					if((typeof(p) != 'undefined' && p!= null) && (p.catagory == o.catagory)) {
						o.list.push(p.list[0]);
						
						ads[j] = null;
					}
				}
				temp.push(o);
				
			}
		}
		ads = temp;
		len = ads.length;
		for(i = 0; i < len; i++) {

			var o = ads[i]; 
			if(!o['level']) {
				o['level'] = 0;	
			}
			if(!list[o.level]) {
				list[o.level] = [];
				counts['level_' + o.level] = 1;
			}else {
				counts['level_' + o.level] += 1;
			}
			list[o.level].push(o);
		}
		_ads = list;
		_counts = counts;
		_len = list.length;
		_interval = this.settings.interval;
		var city = ifeng.Ad.Cookie.getCookie('weather_city');
		_currentArea = city == null ? 'bj' : city;
		
	};
	ifeng.Sparta.AdManager.prototype = {
		run: function() {
			next();
		},
		getInstance: function(instanceId) {
			return instances[instanceId];
		}
	};
	ifeng.Sparta.GetInstance = function(instanceId) {
		return typeof instanceId === 'string' ? _instances[instanceId] : null;
	};
})();









