/**
 * 
 */

if(typeof SELF=="undefined" || !SELF){
	var SELF = {};
};
SELF.getStrLength = function(val){
	var str = $.trim(val);
	str = str.replace(/[^\x00-\xff]/ig,'xx');

	return str.length;
};

SELF.photo = function(name, bottom, state,div ){
	if(!bottom)
	{
		bottom = -50;
	}

	div = div ? div : 'p';
	var lis = $("."+name+"");
	var len = lis.length/2;
	lis.find(div).hide();

	lis.each(function(i){
		var child = $(this).find(div);
		var img = $(this).find('img');
		var offset = img.offset();
		child.css('position', 'absolute').hide();
		if(!state && i<len)
		{
			$(this).hover(function(){
		   		child.css('z-index', '999').css('top',0).show();
			}, function(){
		  		child.css('z-index', '10').css('bottom',bottom).hide();
			});
		}
		else
		{
			$(this).hover(function(){
			    child.css('z-index', '999').css('bottom', 0).show();
			}, function(){
			    child.css('z-index', '10').css('bottom', bottom).hide();
			});
		}
	})
}





function funPicRockPlayer(emId){
		this.elem = $('#' + emId );
		this.pW = 142;
		this.pH = 142;
		this.pading = 8 ;
		this.Border = 2 ;
		this.pic = [];
		var _pic = this.elem.find('.pic');
		for (var i = 0; i < _pic.length; i++) {
			this.pic.push(_pic.eq(i))
		}
		this.index = 0;
		this.p = this.elem.width() / 2 - this.pW / 2;

		this.lBtn = this.elem.find('.lBtn');
		this.rBtn = this.elem.find('.rBtn');
		this.lBtn2 = this.elem.find('.lBtn2');
		this.rBtn2 = this.elem.find('.rBtn2');
		this.len = this.pic.length;
		this.time = null;
		this.local = [{
			index: 0,
			width: 110,
			height: 110,
			top: 23,
			zIndex: 2,
			opacity: 1,
			left: this.p-25
		}, {
			index: 1,
			width: this.pW,
			height: this.pH,
			top: 5,
			zIndex: 3,
			opacity: 1,
			left: this.p+20
		}, {
			index: 2,
			width: 110,
			height: 110,
			top: 23,
			zIndex: 2,
			opacity: 1,
			left: this.p+95
		},{
			index: 3,
			width: 110,
			height: 110,
			top: 23,
			zIndex: 2,
			opacity: 1,
			left: this.p+250
		},{
			index: 4,
			width: 110,
			height: 110,
			top: 23,
			zIndex: 2,
			opacity: 1,
			left: this.p+300
		}];
	}
	funPicRockPlayer.prototype = {
	constructor: funPicRockPlayer,
	init: function(){
		var that = this;
		that.lBtn.click(function(){
		that.leftBtn();
		})
		that.rBtn.click(function(){
		that.rightBtn();
		})
		that.lBtn2.click(function(){
		that.leftBtn2();
		})
		that.rBtn2.click(function(){
		that.rightBtn2();
		})
		that.play();
	},
	rightBtn: function(){
		this.index++;
		if (this.index == this.len-1) {
			this.index = -1;
		}
		
		$('.cosmetics .txts .txt').hide();
		$('.cosmetics .txts .txt').eq(this.index+1).show();
		var o = this.pic.shift();
		this.pic.push(o);
		this.play();
	},
	rightBtn2: function(){
		this.index++;
		if (this.index == this.len-1) {
			this.index = -1;
		}
		
		$('.cosmetics .txts .txt').hide();
		$('.cosmetics .txts .txt').eq(this.index+1).show();
		var o = this.pic.shift();
		this.pic.push(o);
		this.play();
	},
	leftBtn: function(){
		this.index--;
        console.log(this.index)
		if (this.index < -1) {
			this.index = 3;
		}
		$('.cosmetics .txts .txt').hide();
		$('.cosmetics .txts .txt').eq(this.index+1).show();
		var o = this.pic.pop();
		this.pic.unshift(o);
		this.play();
	},
	leftBtn2: function(){
		this.index--;
        console.log(this.index)
		if (this.index < -1) {
			this.index = 3;
		}
		$('.cosmetics .txts .txt').hide();
		$('.cosmetics .txts .txt').eq(this.index+1).show();
		var o = this.pic.pop();
		this.pic.unshift(o);
		this.play();
	},
	play: function(){
		var that = this;
		for (var i = 0; i < that.pic.length; i++) {
		that.pic[i].css({zIndex: that.local[i].zIndex}).find('span').show();
		that.pic[i].find("img").removeClass("img");
		that.pic[1].find("img").addClass("img");
		that.pic[1].find('span').hide();
		
			that.pic[i].animate({
				top: that.local[i].top,
				width: that.local[i].width + 'px',
				left: that.local[i].left + 'px',
				height: that.local[i].height + 'px'
			}, function(){
					$(this).show();
			})
	   
		}
	}
}