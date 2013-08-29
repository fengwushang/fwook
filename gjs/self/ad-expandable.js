(function($){
	var CNC_AD_Expandable = {
		width: 1000,
		minHeight: 120,
		maxHeight: 500,
		duration: 800,
		state: true, //默认是大小两个广告，false为只有1000*120广告
		isFold: true,
		cookieName: "ad-supper-expandable-close",
		
		buttons: ['white', 'white'],
		buttonsBgTop: {blackOpen: 0, blackClose: -30, whiteOpen: -67, whiteClose: -97},
		imgUrl: "http://js.selfimg.com.cn/self/adjs/images/btn.png",
		smallTop: null,   //小广告按钮top定位值
		bigTop: null,    //大广告按钮top定位值
		

		init: function(){
			var self = this;
			self.adContainer = $("#ad-supper-expandable");
			self.ads = self.adContainer.find(".ad-supper-expandable-box");
			
			if( /iPad/i.test(navigator.userAgent) ){
				self.adContainer.hide();
				return ;
			}

			if(self.adContainer.attr("data-open-color")){
				self.buttons[0] = self.adContainer.attr("data-open-color");
			}
			self.openBtnPostion = "0px "+ self.buttonsBgTop[self.buttons[0] + "Open"] + "px" ;

			if(self.adContainer.attr("data-close-color")){
				self.buttons[1] = self.adContainer.attr("data-close-color");
			}
			self.closeBtnPostion = "0px "+ self.buttonsBgTop[self.buttons[1] + "Close"] + "px" ;
			
			self.adContainer.parent().show();

			self.adContainer.css({position: "relative", 
				width: self.width, 
				height: self.minHeight,
				overflow: "hidden",
				cursor: "pointer"
			});

			if(self.ads.length == 1){
				self.state = false;
			}

			self.ads.each(function(i){
				$(this).show();
				if(i>0){
					self.hide(i);
				}
				$(this).css({position: "absolute", top: "0px"});
			});

			if( self.state ){ //只有一个广告不加按钮
				self.createButton();
			}
			
			setTimeout(function(){
				if(self.calcuShowStutus()=="open"){
					self.open();
				}
			}, 1000);
		},
		createButton: function(){
			var self = this;
			self.btn = $('<div class="ad-supper-expandable-btn"></div>');
			var left, top;
			switch(self.adContainer.attr("data-location")){
				case "right-top":
					left = self.width - 55;
					top = 5;
					break ;
				case "right-bottom":
					left = self.width - 55;
					top = self.minHeight - 20;
					self.smallTop = self.minHeight - 20;
					self.bigTop = self.maxHeight - 20;
					break ;
				case "left-bottom":
					left = 5;
					top = self.minHeight - 20;
					self.smallTop = self.minHeight - 20;
					self.bigTop = self.maxHeight - 20;
					break ;
				case "left-top":
					left: 5;
					top: 5;
					break ;
				default:
					left = self.width - 55;
					top = 5;
			}
			self.btn.css("background", 'url('+ self.imgUrl +') no-repeat');
			self.btn.css({
				position: "absolute",
				left: left,
				top: top,
				cursor: "pointer",
				width: "50px",
				height: "22px",
				zIndex: 1000,
				backgroundPosition: self.openBtnPostion
			}).html("&nbsp;");

			self.btn.click(function(){
				if(self.isFold){
					self.open();
				}else{
					self.close();
				}
			})
			self.adContainer.append(self.btn);
		},
		open: function(){
			var self = this;
			self.hide(0);
			self.show(1);
			self.btn.hide();
			self.adContainer.animate({height: self.maxHeight}, self.duration, "swing", function(){
				self.btn.css("backgroundPosition", self.closeBtnPostion);
				self.btn.show();
				self.isFold = false;
				self.cookie(self.cookieName, null);
			});

			if(self.bigTop){
				self.btn.css("top", self.bigTop);
			}
		},
		close: function(){
			var self = this;
			self.btn.hide();
			self.adContainer.animate({height: self.minHeight}, self.duration, "swing", function(){
				self.hide(1);
				self.show(0);

				self.btn.css("backgroundPosition", self.openBtnPostion);
				self.btn.show();
				self.cookie(self.cookieName, "close");
			});
			self.isFold = true;
			if(self.smallTop){
				self.btn.css("top", self.smallTop);
			}
		},
		show: function(index){
			var self = this, i = index, h = self.minHeight;
			if(self.state == false){
				i = 0;
			}
			if(i == 1){
				h = self.maxHeight;
			}

			var ad = self.ads.eq(i);
			if(ad.children("embed").length){
				ad.children("embed").height(h);
				ad.children("embed").width(self.width);
			}else{
				if(ad.length > 0){
					ad.show();
				}
			}
		},
		hide: function(index){
			var self = this, h, ad = self.ads.eq(index);
			if(ad.has("embed").length){
				ad.children("embed").height("0px");
				ad.children("embed").width("0px");
			}else{
				ad.hide();
			}
		},
		calcuShowStutus: function(){
			var self = this, stutus = "close";
			self.link = location.href;
			//首页 频道首页 根据cookie判断显示状态
			var c = self.cookie(self.cookieName);
			
			if(c=="" || c==null || c!="close"){
				stutus = "open";
			}
			if(self.link.indexOf(".html")>-1 || self.link.indexOf(".shtml")>-1){
				stutus = "close";
			}
			
			return stutus;
		},
		cookie: function(name, value, options){
		    if (typeof value != 'undefined') { // name and value given, set cookie
		        options = options || {};
		        if (value === null) {
		            value = '';
		            options.expires = -1;
		        }
		        var expires = '';
		        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
		            var date;
		            if (typeof options.expires == 'number') {
		                date = new Date();
		                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
		            } else {
		                date = options.expires;
		            }
		            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
		        }
		        var path = options.path ? '; path=' + options.path : '';
		        var domain = options.domain ? '; domain=' + options.domain : '';
		        var secure = options.secure ? '; secure' : '';
		        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
		    } else { // only name given, get cookie
		        var cookieValue = null;
		        if (document.cookie && document.cookie != '') {
		            var cookies = document.cookie.split(';');
		            for (var i = 0; i < cookies.length; i++) {
		                var cookie = jQuery.trim(cookies[i]);
		                // Does this cookie string begin with the name we want?
		                if (cookie.substring(0, name.length + 1) == (name + '=')) {
		                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
		                    break;
		                }
		            }
		        }
		        return cookieValue;
		    }
		}
	}

	CNC_AD_Expandable.init();

})(jQuery);