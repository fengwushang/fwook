/**
 * 
 */
if(typeof SELF=="undefined" || !SELF){
	var SELF = {};
};
SELF.Brand = {}

SELF.Brand.PicShow = function(id_lbtn, id_rbtn, big_pic, thumnail_box, vertical){
    var bigPic = $(big_pic), thumnailsBox = $(thumnail_box), currentIndex = 0;
    var thumnails = thumnailsBox.children();
    var btnL = $(id_lbtn), btnR = $(id_rbtn);
    
    var count = thumnails.length;
    if (vertical) {
        var itemH = thumnails.eq(0).outerHeight(), marginBtm = parseInt(thumnails.eq(0).css('marginBottom'));
        var wholeHeight = (itemH + marginBtm) * count;
        var slideH = (itemH + marginBtm) * 3;
        
        thumnailsBox.css({
            'height': wholeHeight,
            'position': 'absolute'
        });
    }
    else {
        var itemW = thumnails.eq(0).outerWidth();
        var marginR = parseInt(thumnails.eq(0).css('marginRight'));
        
        var wholeWidth = (itemW + marginR) * count;
        var slideW = (itemW + marginR) * 3;
        //itembox.parent().css('position','relative');
        thumnailsBox.css({
            'width': wholeWidth,
            'position': 'absolute'
        });
    }
    
    var position = 0, currentIndex = 0;
    
    btnL.bind('click', function(e){
        e.preventDefault();
        
        if (position >= 0) {
            return;
        }
        
        if (vertical) {
            position += slideH;
            thumnailsBox.animate({
                'top': position
            });
        }
        else {
            position += slideW;
            thumnailsBox.animate({
                'left': position
            });
        }
        
    });
    
    btnR.bind('click', function(e){
        e.preventDefault();
        
        if (vertical) {
            if (position <= -(wholeHeight - slideH)) {
                return;
            }
            position -= slideH;
            thumnailsBox.animate({
                'top': position
            });
        }
        else {
            if (position <= -(wholeWidth - slideW)) {
                return;
            }
            position -= slideW;
            thumnailsBox.animate({
                'left': position
            });
        }
        
    });
    
    thumnails.click(function(){
        thumnails.removeClass("cur");
        $(this).addClass("cur");
        bigPic.attr("src", $(this).attr("data-bigpic"));
    });
}

SELF.Brand.expand = function(btnId, containerId,initialHeight){
    var container = $(containerId), closed = true;

	if(typeof initialHeight==='number'){
		container.css('height',initialHeight);
	}
    container.css('overflow','hidden');
	
    $(btnId).bind('click', function(e){
        e.preventDefault();       
        if (closed) {
            closed = false;
            $(this).text('关闭');
            container.css({
                'overflow-x': 'hidden',
                'overflow-y': 'auto'
            });
        }
        else {
            closed = true;
            $(this).text('展开');
            container.css({
                'overflow-y': 'hidden'
            });
            container.scrollTop(0);
        }
    });
}
