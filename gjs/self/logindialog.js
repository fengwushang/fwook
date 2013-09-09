/**
 * 登录对话框
 */


/* 
 * bgiframe
 * Version 2.1.3
 */
(function(b){b.fn.bgiframe=b.browser.msie&&/msie 6\.0/i.test(navigator.userAgent)?function(a){a=b.extend({top:"auto",left:"auto",width:"auto",height:"auto",opacity:true,src:"javascript:false;"},a);var d='<iframe class="bgiframe"frameborder="0"tabindex="-1"src="'+a.src+'"style="display:block;position:absolute;z-index:-1;'+(a.opacity!==false?"filter:Alpha(Opacity='0');":"")+"top:"+(a.top=="auto"?"expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+'px')":c(a.top))+";left:"+(a.left==
"auto"?"expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+'px')":c(a.left))+";width:"+(a.width=="auto"?"expression(this.parentNode.offsetWidth+'px')":c(a.width))+";height:"+(a.height=="auto"?"expression(this.parentNode.offsetHeight+'px')":c(a.height))+';"/>';return this.each(function(){b(this).children("iframe.bgiframe").length===0&&this.insertBefore(document.createElement(d),this.firstChild)})}:function(){return this};b.fn.bgIframe=b.fn.bgiframe;function c(a){return a&&
a.constructor===Number?a+"px":a}})(jQuery);

/**
 * jQuery Cookie plugin
 *
 * Copyright (c) 2010 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
(function($) {
    $.cookie = function(key, value, options) {

        // key and at least value given, set cookie...
        if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
            options = $.extend({}, options);

            if (value === null || value === undefined) {
                options.expires = -1;
            }

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }

            value = String(value);

            return (document.cookie = [
                encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path    ? '; path=' + options.path : '',
                options.domain  ? '; domain=' + options.domain : '',
                options.secure  ? '; secure' : ''
            ].join(''));
        }

        // key and possibly options given, get cookie...
        options = value || {};
        var decode = options.raw ? function(s) { return s; } : decodeURIComponent;

        var pairs = document.cookie.split('; ');
        for (var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
            if (decode(pair[0]) === key) return decode(pair[1] || ''); // IE saves cookies with empty string as "c; ", e.g. without "=" as opposed to EOMB, thus pair[1] may be undefined
        }
        return null;
    };
})(jQuery);

if(typeof SELF=="undefined" || !SELF){
	var SELF = {};
};
/**
 * @class 遮罩层类
 * @param {object} parameters {maskOpacity:(float)透明度(0.1-1)，默认为0.1,maskColor:(string)罩层颜色，默认为#000, zIndex: 9000}
 */
(function($){
  	SELF.Mask = function(config){
  		this.config = {
  			maskOpacity: 0.5,
  			maskColor: "#000",
  			zIndex: 9000
  		}
		$.extend(this.config, config);
		this.mask = null;
	}
	SELF.Mask.prototype={
		show:function(){
			var _self = this, cfg = _self.config;
    		_self.mask = $('<div class="self-dialog-mask"></div>');
    		_self.mask.appendTo("BODY");
			
			_self.mask.css({
				position: 'absolute',
				zIndex: cfg.zIndex,
				top: '0px',
				left: '0px',
				width: $(window).width(),
				height: $(document).height(),
				background: cfg.maskColor,
				opacity: cfg.maskOpacity
			});
			if(navigator.appVersion.indexOf("MSIE 6.0") != -1){
				_self.mask.bgiframe();
			}
		  	/**
			 * @inner resize事件句柄
			 */
		  	_self.winResizeHandler = function(event){
		  	 	var thisObj = event.data.obj;
				thisObj._resize();
		  	}
			$(window).bind('resize',{obj:this}, this.winResizeHandler);
	  	},
		/**
		 * 关闭罩层
		 */	  
	  	close:function(){
	  		var _self = this;		  	
			_self.mask.remove();
			$(window).unbind("resize", _self.winResizeHandler);
	  	},
	  	/**
		 * @private
		 * 窗口大小变化时重置罩层宽高
		 */
	  	_resize:function(){
	  		var _self = this;	
	  		_self.mask.css({
				width: $(window).width(),
				height: $(document).height()
			})
	  	}
	}
})(jQuery);

(function($){
	SELF.LoginDialog = {
		actionUrl: "undefined" == typeof BBS_DOMAIN ? "http://bbs.self.com.cn/handler.php" : BBS_DOMAIN,
		isLogin: false, 
		loginCallbackList: [],
		logoutCallbackList: [],
		userInfo: {username: "", uid: ""},
		markup:'<div class="login-dialog">\
			        <div class="dialog-header"><span class="close">关闭</span></div>\
			        <div class="dialog-body">\
			            <div class="main-login clearfix">\
			                <p class="error"></p>\
			                <p class="name"><label>用户名 :</label><input class="input" type="text" id="ld-name" /></p>\
			                <p class="pwd"><label>密码 :</label><input class="input" type="password" id="ld-pwd" /></p>\
			                <p class="auto-login"><input type="checkbox" id="ld-auto-login" name="auto-login" /><label for="ld-auto-login">下次自动登陆</label><a href="http://bbs.self.com.cn/member.php?mod=logging&action=login&viewlostpw=1">忘记密码?</a></p>\
			                <p class="login-btn"><span id="ld-loginBtn">登陆</span></p>\
			            </div>\
			            <div class="side-login">\
			                <div class="register"> 还没有账号？<a href="http://bbs.self.com.cn/member.php?mod=register">马上注册！</a></div>\
			                <div class="fast-login">\
			                    <p>快捷登陆 :</p>\
			                    <a href="http://bbs.self.com.cn/connect.php?mod=login&op=init&referer='+ window.location.href +'&statfrom=login_simple" class="qq"></a>\
			                    <a href="http://bbs.self.com.cn/xwb.php?m=xwbAuth.login" class="sina"></a>\
			                </div>\
			            </div>\
			        </div>\
			    </div>',
		styles:'<style>\
				.login-dialog {display:none;position:absolute; z-index:9999;width:700px; height:380px; -moz-box-shadow:2px 2px 5px #333; -webkit-box-shadow:2px 2px 5px #333; box-shadow:2px 2px 5px #333; background-color: #fff;}\
				.dialog-header { height:70px; }\
				.dialog-header .close { display: block; float:right; background:url(http://css.selfimg.com.cn/self/www/images/login-bg.png) 0 0 no-repeat; width:20px; height:20px; margin:15px 15px 0 0; text-indent:-9999px; cursor: pointer;}\
				.main-login { width:330px; float: left; }\
				.main-login .input { width:198px; height:20px; line-height: 20px; padding: 4px 0 4px 3px; border:1px solid #b0b1b1; }\
				.main-login p { text-align:right;}\
				.main-login .error { text-align:left;padding-left:130px; margin:20px 0 5px; color: #f00; height:18px;}\
				.main-login label { padding-right:16px; font-size:14px; color: #404040;}\
				.main-login .name { margin-bottom:20px;}\
				.main-login .pwd { margin-bottom:10px;}\
				.auto-login label { padding:0 39px 0 10px; color: #808080;}\
				.auto-login a { color: #808080;}\
				.auto-login input { vertical-align:middle; }\
				.login-btn span { display: block; width:80px; height:50px; background:url(http://css.selfimg.com.cn/self/www/images/login-bg.png) 0 -36px no-repeat; margin:20px 0 0 130px; cursor: pointer;}\
				.side-login { float: left; width:370px;  background:url(http://css.selfimg.com.cn/self/www/images/login-bg.png)  55px -90px no-repeat; height:250px;}\
				.register { padding:30px 0 20px 132px; }\
				.fast-login { padding-left:132px;}\
				.fast-login a{ display:block;width:124px; height:24px;  background:url(http://css.selfimg.com.cn/self/www/images/login-bg.png) 0 -423px no-repeat; margin-top:20px;}\
				.fast-login a.sina {background-position:0 -456px; margin-top:5px;}\
				.register a {display: block; padding-top:5px;}</style>',
		init: function(){
			var _self = this; 
			if( $.trim( $.cookie('etAq_9739_self_uid') ) != ""){
				_self.isLogin = true;
				_self.userInfo.username = $.trim( $.cookie('etAq_9739_self_uname') );
				_self.userInfo.uid = $.trim( $.cookie('etAq_9739_self_uid') );
			}
			
			$('head').append(this.styles);
			$('body').append(this.markup);

			_self.dialogDiv = $(".login-dialog");
			_self.nameInput = _self.dialogDiv.find("#ld-name");
			_self.pwdInput = _self.dialogDiv.find("#ld-pwd");
			_self.autoLogin = _self.dialogDiv.find("#ld-autoLogin");
			
			_self.errorconter = _self.dialogDiv.find('.error');			
			_self.bindEvent(); 
		}, 
		bindEvent: function(){
			var _self=this;
			_self.dialogDiv.find('.close').bind('click',function(){
				_self.close();
			});
			_self.dialogDiv.find('.login-btn').bind('click',function(){
				_self.checkForm();
			});
			_self.pwdInput.bind('keydown',function(event){
			    var key=event.which;
			    if(key==27){
			    	_self.close();
			    }
			    if(key==13){
			    	_self.checkForm();
			    }
			})

			$(window).bind("scroll", function(){
				_self.adjustPosi();
			}).bind("resize", function(){
				_self.adjustPosi();
			});
		},
		checkForm: function(){
			var _self=this;
			var name = _self.nameInput.val();
			var pwd = _self.pwdInput.val();
			var check = 0;
			if(name==''){
				_self.errorconter.html('用户名不能为空');
			}else if(pwd==''){
				_self.errorconter.html('密码不能为空');
			}else{ 
				if( _self.autoLogin.is(":checked") ){
					check = 1;
				}
				var data='&username='+name+'&password='+pwd+'&check='+check;
				_self.ajaxLogin(data);
			}
		},
		show: function(){
			var _self=this;
			_self.mask = new SELF.Mask();
			_self.mask.show();
			_self.dialogDiv.show();
			_self.adjustPosi();
		},
		adjustPosi:function(){
			var _self = this;
			var top=($(window).height() - $('.login-dialog').height())/2 + $(window).scrollTop();
			var left=($(window).width() - $('.login-dialog').width())/2;
			_self.dialogDiv.css('top', top);
			_self.dialogDiv.css('left', left);
		},
		close: function(){
			var _self = this;
			_self.dialogDiv.hide(); 
			if(_self.mask){
				_self.mask.close();
			}
		},
		ajaxLogin: function(mydata, fnPrompt){
			var _self = this, loginUrl = _self.actionUrl + '?mod=user&act=login'+mydata+'&callback=?';

			var errorPrompt = function(content){
				if(typeof fnPrompt == "undefined"){
					_self.errorconter.html(content);
				}else{
					fnPrompt(content);
				}
			}
			$.getJSON(loginUrl,function(data){
				_self.userInfo = data;
				if( data.uid > 0 ){
					_self.isLogin = true;
					_self.close();
					for(var i = 0;i<_self.loginCallbackList.length;i++){
						_self.loginCallbackList[i]( _self.userInfo );
					}
					//触发loginsuccess事件
					//$(_self).trigger("loginsuccess", [_self.userInfo]);
				} else if(data.uid == "-1"){
					errorPrompt('用户不存在,或者被删除');
					//触发loginerror事件
					//$(_self).trigger("loginerror", [_self.userInfo.state]); 
				} else if(data.uid == "-2"){
					errorPrompt('密码错误或者用户名不存在');
				}else{
					errorPrompt('登陆失败，请重新尝试');
				}
			});
		},
		logout:function(){
			var _self = this, loginout = _self.actionUrl + '?mod=user&act=logout&callback=?';
			$.getJSON(loginout,function(data){	
				_self.isLogin=false;
				_self.userInfo.username='';
				_self.userInfo.uid='';
				
				for(var i=0;i<_self.logoutCallbackList.length;i++){
					_self.logoutCallbackList[i]( _self.userInfo );
				}
			});
		},
		/**
		 * 绑定登录后执行的回调函数
		 * @param {function} fnObj 回调方法
		 */
		bindAfterLogin: function( fnObj ){
			var _self = this;
			if( _self.isLogin ){
				fnObj( _self.userInfo );
			}
			_self.loginCallbackList.push( fnObj );
		},
		/**
		 * 绑定退出后执行的回调函数
		 * @param {function} fnObj 回调方法
		 */
		bindAfterLogout: function( fnObj ){
			var _self = this;
			_self.logoutCallbackList.push( fnObj );
		}
	}
})(jQuery);

$(function(){
	SELF.LoginDialog.init();
})
