(function(){
    var ChannelDetector = function(){
        this.channelMapper = {
            homePage: {n:'homePage'},
	        fashion: {n:'fashion',sub:{'self_love':{n:'self_love'},'fashion_dodont':{n:'fashion_dodont'},'best_buy':{n:'best_buy'},'street_chic':{n:'street_chic'},'feature':{n:'feature'},'party':{n:'party'},'fashion_news':{n:'fashion_news'}}},	beauty:{n:'beauty',sub:{'hot_tips':{n:'hot_tips'},'beauty_dodont':{n:'beauty_dodont'},'makeup':{n:'makeup'},'skincare':{n:'skincare'},'hair':{n:'hair'},'trial_report':{n:'trial_report'},'qa':{n:'qa'},'beauty_info':{n:'beauty_info'},'perfume':{n:'perfume'}}},
	        life:{n:'life',sub:{'art':{n:'art'},'travel':{n:'travel'},'casa':{n:'casa'},'food':{n:'food'},'book_movie':{n:'book_movie'},'music':{n:'music'}}},
	        mememe:{n:'mememe',sub:{'love':{n:'love'},'career':{n:'career'},'money':{n:'money'}}},
	        men:{n:'men'},
	        bodywise:{n:'bodywise',sub:{'health':{n:'health'},'inner_voice':{n:'inner_voice'},'fun':{n:'fun'}}},
	        celebrity:{n:'celebrity'},
	        fashion_expo:{n:'fashion_expo'},
	        selfstuff:{n:'selfstuff'},
	        fortune:{n:'fortune'},
	        pro:{n:'pro'},
	        content:{n:'content',sub:{'letters':{n:'letters'},'contactus.html':{n:'contactus'}}}
        };
        this.mtkReferers = ["www.114la.com", "bjdns.cncmax.cn:8080", "www.haokan123.com", "www.wo114.com", "www.520.com",
            "t.sina.com.cn","t.qq.com", "www.9911.com", "selfwebsite.blog.163.com", "www.kaixin001.com", "hao.360.cn", "hao123.com",
            "www.2345.com", "hao.qq.com", "123.ie.sogou.com", "www.pptv.com", "123.sogou.com", "www.726.com", "dianxin.cn", 
            "tao123.com", "the123.com", "3567.com", "3929.cn", "www.520.net", "155.com", "8644.com", "670.cn"];
    }
    ChannelDetector.prototype.getChannel = function(uri, obj, ret) {
        if(uri) {
		    if(obj[uri]) {
			    ret.push(obj[uri].n);
			    return true;
		    } else {
			    for(var i in obj) {
				    if(obj[i]['sub']) { 
					    if(this.getChannel(uri, obj[i]['sub'], ret)) {
					        ret.push(obj[i]['n']);
						    return true;
					    }
				    }
			    }
		    }
	    }
	    return false;
    }
    ChannelDetector.prototype.detectChannel = function(pageTracker) {
	    var lc = location.href;
	    var p1 = /[\/\/]([.a-zA-z-0-9]+?)\/([\S]*)/;
	    var testRet = lc.match(p1);
	    //filter out the promotion url
	    if(testRet) {
		     var url = testRet[2];
		     var spos = url.lastIndexOf('/');
		     if(spos >0) {
			     url = url.substring(spos + 1);
		     }
		     if(url && (/id=00[0-9]+/.test(url) || /index[0-9]+.html/.test(url))) {
			     //it's a promotion url, do nothing
			     //return;
		     }
	    }
	    var p3 = /[\/\/]([.a-zA-Z-0-9]+?)\/([^\/]*)\//;
	    var p4 = /[\/\/]([.a-zA-z-0-9]+?)\/([^\/]*)/;	
	    var ret = lc.match(p4);
	    if(p3.test(lc)) {
		    ret = lc.match(p3);
	    }
	    if(ret) {
		    var domainName = ret[1];
		    //if uri start with 'index.' or it's '', it's homepage
		    var uri = ret[2] ? ret[2] : 'homePage';
		    if(uri.length > 5 && uri.substring(0,5) == 'index') {
			    uri = 'homePage';
		    }
		    if(domainName != 'www.self.com.cn') {
			    pageTracker._setCustomVar(1, 'SelfChannel', domainName, 1);
		    } else {
			    var chain = [];
			    this.getChannel(uri, this.channelMapper, chain);
			    var k = 1;
			    for(var i=chain.length-1; i>=0; i--) {
				    if(i == chain.length-1) {
					    pageTracker._setCustomVar(chain.length-i, 'SelfChannel', chain[i], 1);
				    } else {
					    pageTracker._setCustomVar(chain.length-i, 'SelfChannel-'+ (k++), chain[i], 1);
				    }
			    }
		    }
	    }
    }
    
    ChannelDetector.prototype.getDomainUri = function(url) {        
	    var p3 = /[\/\/]([.a-zA-Z-0-9:]+?)\/([^\/]*)\//;
	    var p4 = /[\/\/]([.a-zA-z-0-9:]+?)\/([^\/]*)/;
	    var ret = url.match(p4);
	    if(p3.test(url)) {
		    ret = url.match(p3);
	    }
        return ret;
    }

    ChannelDetector.prototype.isMktSource = function() {
        var mtkKey = "__s__s__";
        var mtkValue = "mtk"
        var cookieDomain = "self.com.cn";
        if(cookies.get(mtkKey) == mtkValue) {
            return true;
        }
        var lc = location.href;	
	    var p1 = /[\/\/]([.a-zA-z-0-9]+?)\/([\S]*)/;
	    var testRet = lc.match(p1);
	    //filter out the promotion url
	    if(testRet) {
		     var url = testRet[2];
		     var spos = url.lastIndexOf('/');
		     if(spos >0) {
			     url = url.substring(spos + 1);
		     }
		     if(url && (/id=00[0-9]+/.test(url) || /index[0-9]+.html/.test(url))) {
			     //it's a promotion url, log it in cookie
                 cookies.put(mtkKey, mtkValue, cookieDomain);
			     return true;
		     }
	    }
        var ret = this.getDomainUri(lc);
        if(ret) {
            var subDomain = ret[1];
            var subs = ret[1].match(/([^\.]+)\.self\.com\.cn/);
            if(subs) {
                subDomain = subs[1].toLowerCase();
            }
            if("vote".indexOf(subDomain) != -1) {
                cookies.put(mtkKey, mtkValue, cookieDomain);
                return true;
            }
        }
        //EDM
        if(lc.indexOf("utm_source=")!=-1 && lc.indexOf("utm_medium") !=-1) {
            cookies.put(mtkKey, mtkValue, cookieDomain);
            return true;
        }
        ret = this.getDomainUri(document.referrer)
        if(ret) {
            domainName = ret[1];
            if(this.mtkReferers.join("/").indexOf(domainName) != -1) {
                cookies.put(mtkKey, mtkValue, cookieDomain);
                return true;
            }
        }
        return false;
    }

    var cookies = {};
    cookies.get = function(a) {
        a = a + "=";
        for (var b = document.cookie.split(";"), c = 0; c < b.length; c++) {
            for (var f = b[c]; f.charAt(0) == " ";) f = f.substring(1, f.length);
            if (f.indexOf(a) == 0) return f.substring(a.length, f.length)
        }
        return null
    };

    cookies.put = function(a, b, c) {
        document.cookie = a + "=" + b + "; path=/; domain="+c
    };

    window._s_c_d_ = window._s_c_d_ ? window._s_c_d_ : (new ChannelDetector)
    window.detectChannel = function(tracker){
    	_s_c_d_.detectChannel(tracker);
    }
})();
