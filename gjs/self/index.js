$(document).ready(function(){
	SELF.FocusImg.init("#focus",{});

	new SELF.PlaceHolder("#product-search", {focusClass: "product-search-focus"});

	$(".img-lazyload").lazyload({ threshold: 400 });

	
	$(".bbs-gallery img").imgInnerBorder({border: "1px solid #0f8bb1"});
	addBorder(".picbig img");
    addBorder(".picsmall li");
	
	$(".select-wrapper").dropDownList();

	var giftsScroll = $('#gifts-scroll');
	var gsLeftBtn = giftsScroll.find('.scroll-left-btn');
	var gsRightBtn = giftsScroll.find('.scroll-right-btn');

	gsScrollApi = giftsScroll.switchable({
	    triggers: null,
	    putTriggers: 'insertBefore',
	    panels: 'li',
	    easing: 'ease-in-out',
	    effect: 'scrollLeft',
	    delay: 1,
	    steps: 1,    //步长
	    visible: 1,  //可视Li
	    end2end: true,
	    prev: gsLeftBtn,
	    next: gsRightBtn,
	    autoplay: true,
	    api: true
	});
	gsLeftBtn.mouseenter(function(){
		gsScrollApi.pause();
	});
	gsRightBtn.mouseenter(function(){
		gsScrollApi.pause();
	});
	gsLeftBtn.mouseleave(function(){
		gsScrollApi.play();
	});
	gsRightBtn.mouseleave(function(){
		gsScrollApi.play();
	});

	var productScroll = $('#product-scroll');
	var psLeftBtn = productScroll.find('.scroll-left-btn');
	var psRightBtn = productScroll.find('.scroll-right-btn');

	var pScrollApi = productScroll.switchable({
	    triggers: null,
	    putTriggers: 'insertBefore',
	    panels: 'li',
	    easing: 'ease-in-out',
	    effect: 'scrollLeft',
	    delay: 1,
	    duration: 1,
	    steps: 4,    //步长
	    visible: 4,  //可视Li
	    end2end: true,
	    prev: psLeftBtn,
	    next: psRightBtn,
	    autoplay: true,
	    api: true
	});
	psLeftBtn.mouseenter(function(){
		pScrollApi.pause();
	});
	psRightBtn.mouseenter(function(){
		pScrollApi.pause();
	});
	psLeftBtn.mouseleave(function(){
		pScrollApi.play();
	});
	psRightBtn.mouseleave(function(){
		pScrollApi.play();
	});
	
	var psScroll = $('#ps-scroll');
	var psSLeftBtn = psScroll.find('.scroll-left-btn');
	var psSRightBtn = psScroll.find('.scroll-right-btn');

	var psScrollApi = psScroll.switchable({
	    triggers: null,
	    putTriggers: 'insertBefore',
	    panels: 'li',
	    easing: 'ease-in-out',
	    effect: 'scrollLeft',
	    delay: 1,
	    duration: 1,
	    steps: 3,    //步长
	    visible: 3,  //可视Li
	    end2end: true,
	    prev: psSLeftBtn,
	    next: psSRightBtn,
	    autoplay: true,
	    api: true
	});
	psSLeftBtn.mouseenter(function(){
		psScrollApi.pause();
	});
	psSRightBtn.mouseenter(function(){
		psScrollApi.pause();
	});
	psSLeftBtn.mouseleave(function(){
		psScrollApi.play();
	});
	psSRightBtn.mouseleave(function(){
		psScrollApi.play();
	});

	var bbsTab = $('#bbs-top10');
	bbsTab.switchable({
	    triggers: bbsTab.find('.tab-triggers a'),
	    panels: bbsTab.find(".tab-container")
	});

	var livingTab = $('#living-top10');
	livingTab.switchable({
	    triggers: livingTab.find('.tab-triggers a'),
	    panels: livingTab.find(".tab-container")
	});

	var bbsStarsTab = $('#bbs-stars');
	bbsStarsTab.switchable({
	    triggers: bbsStarsTab.find('.tab-triggers a'),
	    panels: bbsStarsTab.find(".tab-container")
	});
	
	var bbsTab = $('#trialcenter-item');
	bbsTab.switchable({
	    triggers: bbsTab.find('.tab-triggers a'),
	    panels: bbsTab.find(".tab-container")
	});
	//
	var gallery = {
	    init: function(){
	        var self = this;
	        self.galleryItems = $(".showtxt li");
	        self.galleryItems.mouseenter(function(){
	            var t = this;
	            gallery.timer = setTimeout(function(){
	                var p = $(t).find("p"), h = p.height();
	                p.show();
	                p.css("bottom", -h);
	                $(t).find("p").animate({bottom: 0}, 200);
	            }, 200);
	        });
	        self.galleryItems.mouseleave(function(){
	            clearTimeout(gallery.timer);
	            var p = $(this).find("p"), h = p.height() + 20;
	            $(this).find("p").animate({bottom: "-" + h }, 200);
	        });
	    }
	}

	//gallery.init();









})
