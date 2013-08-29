/**
 * add by yubin
 * Copyright Condenast China
 * common
 * *.tpl
 */

//$_CNC Global Variable

var $_CNC_BASE = '';
var $LOAD = '';

var $_CNC = window.$_CNC ||
{
    //搜索
    loadSearch : function()
    {
        var name = '.cnc_search';
        var value = [];
        if($(name).length)
        {
            $(name).each(function(i)
            {
                value[i] = $(this).val();
                $(this).bind('focus', function()
                {
                    if(value[i] == $(this).val())
                    {
                        $(this).val('');
                    }
                    $(this).css('color', '#666');
                }).bind('blur', function()
                {
                    if($(this).val() == '')
                    {
                        $(this).val(value[i]);
                        $(this).css('color', '#bababa');
                    }
                });
                //取消按钮的绑定
                //var click = $(this).parent().children('input[type@button]');
                /*
                var next = $(this).next('input');
                var click = next.attr('click');
                if(click.indexOf('javascript:'))
                {
                    var c = click.split('javascript:');
                    click = c[1];
                }
                */
                /*
                var next = $(this).next('input');
                alert(next.attr('click'));
                next.unbind('click');
                var func = function()
                {
                    alert(1);return;
                    if($(this).val() == '' || $(this).val() == value[i])
                    {
                        $.alert('请输入搜索内容');return;
                    }
                    $(this).parent().submit();
                }
                next.bind('click',function(){func});
                */
            });
        }
    },
    //选择框
    loadSelect : function()
    {
        var name = '.cnc_select';

        if($(name).length)
        {
            $(name).each(function()
            {
                $(this).bind('mouseover', function()
                {
                    $(this).children('ul').show();
                }).bind('mouseleave', function()
                {
                    $(this).children('ul').hide();
                });
            });
        }
    },
    //选择框，浮动层
    loadSelectDiv : function()
    {
        var name = '.cnc_select_div';
        if($(name).length)
        {
            $(name).each(function()
            {
                $(this).bind('mouseover', function()
                {
                    var offset = $(this).offset();
                    $(this).html('<div class="cnc_display" style="position:absolute;top:'+(offset.top - 50)+'">'+$(this).children('ul').html()+'</div>');
                    $('.cnc_display ul').show();
                }).bind('mouseleave', function()
                {
                    $(this).children('ul').hide();
                });
            });
        }
    },
    //发送电子报订阅
    ding : function(type)
    {
        var email = $_CNC.checkEmail($("#email").val());
        if(email == '-1')
        {
            $.alert('邮箱格式错误');return;
        }
        var date = new Date();
	    $.get($_CNC_BASE + 'front_edm/operate?email='+email+'&dosub='+type+'&time='+date.getTime(), function(t){alert(t)});
    },
    dingPage : function(type)
    {
        var email = $_CNC.checkEmail($("#ding_email").val());
        if(email == '-1')
        {
            $.alert('邮箱格式错误');return;
        }
	    location.href = $_CNC_BASE + 'front_edm/?email='+email+'&dosub='+type;
    },
    //检测邮箱
    checkEmail : function(email)
    {
        var preg = /^[\w\-\.]+@[\w\-\.]+(\.\w+)+$/;
        if(!email || !email.match(preg))
        {
            return '-1';
        }
        
        return email;
    }
}

var $_CNC_LOAD = window.$_CNC_LOAD ||
{
    //首页js
    home : function()
    {
        //首页焦点图
        //imgShow();
        //首页潮流服饰
        /*
        $('.title .more a:not(.last)').mouseover(function()
        {
            $('.title .more a').removeClass('cur');
            $(this).addClass('cur').css('text-decoration','none');
        });
        */


        //首页切换，滑动
        /*
        $('#indexA .num ul li').mouseover(function()
        {
            var index = $('#indexA .num ul li').index($(this));
            //$('#indexA .pics ul li').find('.shade').removeClass('cur');
            //$('#indexA .pics ul li').eq(index).find('.shade').addClass('cur');
            $('#indexA .num ul li').removeClass('now');
            $('#indexA .pics ul li').find('img').css('border', '0px');
            $('#indexA .pics ul li').eq(index).find('img').css('border', '1px solid #E00022');
            $(this).addClass('now');
        });

        //首页切换，滑动
        $('#indexA .pics ul li').mouseover(function()
        {
            var index = $('#indexA .pics ul li').index($(this));
            //$('#indexA .pics ul li').find('.shade').removeClass('cur');
            //$('#indexA .pics ul li').eq(index).find('.shade').addClass('cur');
            $('#indexA .num ul li').removeClass('now');
            $('#indexA .pics ul li').find('img').css('border', '0px');
            $(this).find('img').css('border', '1px solid #E00022');
            $('#indexA .num ul li').eq(index).addClass('now');
        });
        */

        $('#indexA .num ul li').each(function(i)
        {
            var pic = $('#indexA .pics ul li').eq(i).find('img');
            var m = $(this);
            m.mouseover(function()
            {
                $('#indexA .num ul li').removeClass('now');
                $('#indexA .pics ul li').find('img').css('border', '1px solid #bababa');

                pic.css('border', '1px solid #E00022');
                m.addClass('now');
            });
            pic.mouseover(function()
            {
                $('#indexA .num ul li').removeClass('now');
                $('#indexA .pics ul li').find('img').css('border', '1px solid #bababa');

                pic.css('border', '1px solid #E00022');
                m.addClass('now');
            });
        });
        /*
        $('#indexA .num ul li').each(function()
        {
            var a = $(this).children('a');
            a.removeClass('cur');
            a.each(function(){});
        })
        */


        //滚动
        $_CNC_COMMON.up('index-scroll01');

        //美容
        /*
        var lis = $(".meirong li");
        lis.hover(function(){
            els = $(this);
            els.find("span").stop().animate({'bottom':0}, 300);
        },function(){
            els = $(this);
            els.find("span").stop().animate({'bottom': -50}, 300);
        });
        */
        $_CNC_COMMON.photo('meirong li', -50);

        //
        $('#indexH .rd .title ul li').mouseover(function(){
            var index = $('.rd-wrapper .title ul li').index($(this));
            $('#indexH .rd .text').find('.item').hide().eq(index).show();
            $('#indexH .rd .title ul li').removeClass('cur');
            $(this).addClass('cur');
        });

        var $pho = $('#indexI .pho li');
        $pho.find('.tag').hide();
        $pho.mouseover(function(){
        $(this).css('z-index','99').find('.tag').css('cursor', 'pointer').show();
        });
        $pho.mouseout(function(){
        $(this).css('z-index','1').find('.tag').hide();
        });

        //选择框
        /*old
        $('.select').mouseover(function(){
            $(this).find('ul').show();
        });
        $('.select').mouseout(function(){
            $(this).find('ul').hide();
        });
        */
    },

    //潮流服饰
    cat_trend : function()
    {
        //切换
        $('#fs_indexB .num ul li').mouseover(function(){
            var index = $('#fs_indexB .num ul li').index($(this));
            $('#fs_indexB .pics ul li').hide();
            $('#fs_indexB .pics ul li').eq(index).show();
            $('#fs_indexB .num ul li').removeClass('now');
            $(this).addClass('now');
        });

        //有奖讨论
        var $pho = $('#s_big ul li');
        $pho.mouseover(function(){
            var num = $pho.index($(this));
            
            $(this).addClass('focus b'+num+'');
        });
        $pho.mouseout(function(){
            var num = $pho.index($(this));
            $(this).removeClass('focus b'+num+'');
        });

        //滚动
        $_CNC_COMMON.up('fs_scroll01');
    },
    //名流派对
    cat_party : function()
    {
        $_CNC_COMMON.photo('xx-photo li', -80);

        
        $('#rw_scroll .pic-small ul li').mouseover(function(){
            var index = $('#rw_scroll .pic-small ul li').index($(this));
            $('#rw_scroll .pic-big ul li').hide().eq(index).show();
            $('#rw_scroll .pic-info ul li').hide().eq(index).show();
            $('#rw_scroll .pic-small ul li').removeClass('cur');
            $(this).addClass('cur');
        });
    },
    //珠宝腕表
    cat_jewelry : function()
    {
        //滚动
        $_CNC_COMMON.up('zb_scroll01');

        //加入控制google的代码 2011-11-18
        if($("#google_ads_div_vogue_Jewelry_Skyscraper1_300x600_ad_container").length)
        {
            $("#google_ads_div_vogue_Jewelry_Skyscraper1_300x600_ad_container").attr('style', '');
        }
    },
    //鞋包
    cat_shoes : function()
    {
        //滚动
        $_CNC_COMMON.up('xb_scroll01');
    },
    //妆容
    cat_beauty : function()
    {
        //滚动
        $_CNC_COMMON.up('mr_scroll01');
        $_CNC_COMMON.up('mr_scroll02');

        $_CNC_COMMON.photo('meirong li', -50);
    },
    //杂志
    cat_magazine : function()
    {
        $_CNC_COMMON.photo('vc-photo li', -150);
    },
    //时装发布
    cat_clothing : function()
    {
        //人气超模
        $(".superMPic li").each(function(i)
        {
            if(i == 0)
            {
                $(this).find('img').css('border', '1px solid #E00022');
            }
            $(this).hover(function()
            {
                $(".bigPic").hide();
                $(".cnc_bigPic_" + i).show();

                $(".cnc_superMPic").hide();
                $(".cnc_superMPic_" + i).show();
                $(".superMPic li").find('img').css('border', '1px solid #bababa');
                $(this).find('img').css('border', '1px solid #E00022');
            }, 
            function()
            {
                //$(".bigPic").html(bigPic);
                //$(".cnc_superMPic").hide();
                //$(".cnc_superMPic_0").show();
                //$(this).find('img').css('border', '1px solid #bababa');
            });
        })
    },
    //v趣味
    cat_vinterest : function()
    {
        $_CNC_COMMON.photo('ret .img', 0, '.info');
        $_CNC_COMMON.up('vq-scroll01');
        
        var func = function(e)
		{
			var index = $('#xz-scroll .xz-ystitle li').index(e);
            $('#xz-scroll .xz-yslistbox ul').hide().eq(index).show();
            $('#xz-scroll .xz-ystitle li').removeClass('cur');
            e.addClass('cur');
		}
		
		$('#xz-scroll .xz-ystitle li').mouseover(function(){
            func($(this));
        }).click(function(){funct($(this))});
    }
}


//一些公用函数，我整理到一起了。
var $_CNC_COMMON = window.$_CNC_COMMON ||
{
    //滚动
    up : function(name)
    {
        var time = 5000;
        var wPic = $('#'+name+' .part').width();
        var nPic = $('#'+name+' .part').length;	
        var scrollNum = 1;
        var scrollWidth = scrollNum*wPic;
        
        $('#'+name+' .parts div.part:last').prependTo('#'+name+' .parts');
        $('#'+name+' .parts').css('left',-wPic);
        var lScroll = function(){
            $('#'+name+' .parts').animate({
                left: -scrollWidth*scrollNum*2},300,
                function(){
                    $('#'+name+' .parts div.part:first').appendTo('#'+name+' .parts');
                    $('#'+name+' .parts').css('left',-wPic);				
                }
            );
        }
        
        var rScroll = function(){
            $('#'+name+' .parts').animate({
                left: 0},300,
                function(){
                    $('#'+name+' .parts div.part:last').prependTo('#'+name+' .parts');
                    $('#'+name+' .parts').css('left',-wPic);				
                }
            );
        }
        
        var autoScroll = setInterval(lScroll, time);
    
        $('#'+name+' .down').click(function(){
            clearInterval(autoScroll);
            lScroll();
        });
        $('#'+name+' .up').click(function(){
            clearInterval(autoScroll);
            rScroll();
        });
        
        $('#'+name+' .parts').hover(function(){
            clearInterval(autoScroll);
        },function(){
            autoScroll = setInterval(lScroll, time);
        });
    },
    //图片描述
    photo : function(name, bottom, div)
    {
        if(!bottom)
        {
            bottom = -50;
        }
        div = div ? div : 'span';
        var lis = $("."+name+"");
        var len = lis.length/2;
        lis.find(div).hide();
        lis.each(function(i)
        {
            var child = $(this).find(div);
            var img = $(this).find('img');
            var offset = img.offset();
            child.css('position', 'absolute').hide();
            if(name == 'vc-photo li')
            {
                child.css('width', img.width() - 48);
                len = 0;
            }
            if(name == 'xx-photo li')
            {
                child.css('height', img.height()/25);
            }
            if(i<len)
            {
                $(this).hover(function()
                {
                    child.css('z-index', '999').css('top',0).show();
                }, function()
                {
                    child.css('z-index', '10').css('bottom',bottom).hide();
                });
            }
            else
            {
                $(this).hover(function()
                {
                    child.css('z-index', '999').css('bottom', 0).show();
                }, function()
                {
                    child.css('z-index', '10').css('bottom', bottom).hide();
                });
            }
            
        })
        /*
        lis.hover(function(){
            els = $(this);
            els.find("span").css('z-index','999').stop().animate({'bottom':0}, 300).show();
            //els.find("span").css('z-index','999').show();
        },function(){
            els = $(this);
            els.find("span").css('z-index','10').stop().animate({'bottom': bottom}, 300).hide();
            //els.find("span").css('z-index','10').hide();
        });
        */
    },
    //文字轮滑
    txt : function()
    {
        if($('.title .more').length)
        {
            $('.title .more a').removeClass('cur');
            $('.title .more').each(function()
            {
                if($(this).parent().parent().attr('class') != 'section people-part')
                {
                    var c = $(this).children('a');
                    c.css('cursor', 'pointer');
                    var l = c.length - 2;
                    c.eq(l).addClass('cur');
                    $(this).children('a:not(.last)').mouseover(function()
                    {
                        c.removeClass('cur');
                        $(this).addClass('cur').css('text-decoration','none');
                    }).mouseout(function()
                    {
                        $(this).removeClass('cur');
                        c.eq(l).addClass('cur');
                    })
                }
            });
        }
    },
    //积分操作之后的页面
    creditShow : function(type, credit, func)
    {
        var id = type + 'ShowBox';
        var creditHtml = '';
        var string = $_CNC_COMMON.creditReturn(type);
        var creditArray = $_CNC_COMMON.creditConver(credit);
        for(var a in creditArray)
        {
            creditHtml += creditArray[a][1] + '<span> +'+creditArray[a][0]+' </span>';
        }

        var html = '<p class="share-sucess">'+string.title+'</p><p class="share-jybox">'+creditHtml+' </p>'+string.content+'<p class="login-btnbox"><input  type="button" value="确定" class="login-rbtn" id="btn_'+id+'" style="margin-left:170px;" /></p>';
        $_CNC_COMMON.creditPage(id, html,func);
    },
    creditPage : function(id, html,func)
    {
        $('#shareFloatBox').hide();
        $.overlay({opacity:0.6});
        if($('.login-box').length) $('.login-box').remove();
        $('body').append('<div id="'+id+'" class="login-box" style="position:absolute;overflow:hidden;z-index:9999;"></div>');
        var box  = $('.login-box');
        box.center();
        $(window).bind('scroll', function()
        {
            for (var i = 0; i < box.length; i++) {
                box.css('left', parseInt(document.documentElement.scrollLeft) + (parseInt(document.documentElement.clientWidth) - box.width()) / 2 + 'px');
                box.css('top', parseInt(document.documentElement.scrollTop||document.body.scrollTop) + (parseInt(document.documentElement.clientHeight) - box.height()) / 2 + 'px');
            }
        });
        box.html(html).show();
        $('#btn_'+id).click(function(){$_CNC_COMMON.creditHide(id);if(func){func.call()}});
        return;
    },
    //提示
    creditAlert : function(data, msg, func)
    {
        if(data.credit)
        {
            var arr = data.credit.split('::');
            $_CNC_COMMON.creditShow(arr[0], arr[1], func);
        }
        else
        {
            $.alert(msg, func);
        }
    },
    //积分转换
    creditConver : function(credit)
    {
        var res = [];
        var arr = credit.split('||');
        for(var a in arr)
        {
            var val = arr[a];
            var ret = val.split('|');
            if(ret[0] != 'groupname')
            {
                res[a] = [];
                res[a][0] = ret[1];
                res[a][1] = ret[2];
            }
        }
        return res;
    },
    //返回一些配置好的数据
    creditReturn : function(type)
    {
        var result = {};
        var space_url = 'http://space.self.com.cn/home.php';
        switch(type)
        {
            //收藏
            case 'collect':
                result.title = '收藏成功';
                result.content = '<p class="share-kjsc">您的添加喜欢已完成，如您需要查看或者管理喜欢列表，请点击<a href="'+space_url+'" target="_blank" title="">"个人空间"</a> <a href="'+space_url+'?mod=space&do=favorite" target="_blank" title="">"喜欢"</a></p>';
                break;
            //评论
            case 'comment':
                result.title = '评论成功';
                result.content = '<p class="share-kjsc">您的评论已完成。如您需要查看您的评论。请点击<a href="'+space_url+'" target="_blank" title="">"个人空间"</a> <a href="'+space_url+'?mod=space&do=home&view=me" target="_blank" title="">"动态"</a></p>';
                break;
            //关注
            case 'focus':
                result.title = '关注成功';
                result.content = '<p class="share-kjsc">您的关注已完成。如您需要查看您的关注列表。请点击<a href="'+space_url+'" target="_blank" title="">"个人空间"</a> <a href="'+space_url+'?mod=space&do=home&view=me" target="_blank" title="">"动态"</a></p>';
                break;
            //喜欢
            case 'like':
                result.title = '操作成功';
                result.content = '<p class="share-kjsc">您的操作已完成。如您需要查看您的喜欢列表。<br /><br />请点击<a href="'+space_url+'" target="_blank" title="">"个人空间"</a> <a href="'+space_url+'?mod=space&do=home&view=me" target="_blank" title="">"动态"</a></p>';
                break;
            //转发
            case 'forward':
                result.title = '转发成功';
                result.content = '<p class="share-kjsc">您的转发已完成。如您需要查看您的转发列表。<br /><br />请点击<a href="'+space_url+'" target="_blank" title="">"个人空间"</a> <a href="'+space_url+'?mod=space&do=home&view=me" target="_blank" title="">"动态"</a></p>';
                break;
        }

        return result;
    },
    //关闭提示页面
    creditHide : function(id)
    {
        $.box('close');
        $('#' + id).hide();
    },
    // 登录之后的信息获取
    login : function()
    {
        //获取用户一些信息
        var date = new Date();
        $.getJSON($_CNC_BASE + 'front_login/loginStatus?callback=?'+'&time='+date.getTime() , function(t)
        {
            var sina = qq = false;
            for(var a in t)
            {
                t[a] = parseInt(t[a]);
                if(a == 'sina' && t[a] != 1)
                {
                    sina = true;
                    $("#login_" + a).show();
                }
                else if(a == 'qq' && t[a] != 1)
                {
                    qq = true;
                    $("#login_" + a).show();
                }
                else if(a == 'msg' && t[a] >= 1)
                {
                    $("#login_" + a).html('消息('+t[a]+')');
                }
                else if(a == 'notice' && t[a] >= 1)
                {
                    $("#login_" + a).html('提醒('+t[a]+')');
                }
            }
            if(sina == true && qq == true)
            {
                //$("#login_bind").show();
            }
        });
    },
    //喜欢 跨域
    like : function(id)
    {
        $.alert('正在为您发送请求...请稍候');
        var $_BRAND_BASE = 'http://brand.self.com.cn/';
        var date = new Date();
        $.getJSON($_BRAND_BASE + 'common/ajax/add_product_like/?id='+id+'&from=www&callback=?'+'&time='+date.getTime(), function(t)
        {
            if(t.status == 1)
            {
                $_CNC_COMMON.creditAlert(t, '您已经成功的对'+t.product_cname+'产品表示了喜欢，欢迎继续浏览。');
            }
            else
            {
                $.alert('添加失败');
            }
        });
    },
    //产品库
    product : function(type, tags)
    {
        $("#cnc_" + type).html('载入中...');
        var date = new Date();
        if(!tags)
        {
            $("#cnc_" + type).html('');
        }
        url = $_CNC_COMMON.getUrl(type);
        $.getJSON(url + tags + '&from=www&callback=?'+'&time='+date.getTime(), function(t)
        {
            var h = $_CNC_COMMON.getHtml(t, type);
            $("#cnc_" + type).html(h);
        });
    },
    getHtml : function(html, type)
    {
        if(type == 'brand')
        {
            var j = 1;
        }

        if(type == 'product')
        {
            var j = 2;
        }

        var u = 'http://brand.vogue.com.cn/';
        var h = '';
        var i = 0;

        if(j == 1 && (!html || html.length < 1))
        {
            $("#cnc_brand").parent().parent().hide().remove();
            $("#cnc_product").parent().parent().hide().remove();
        }
        else
        {
            for(var a in html)
            {
                url = u + html[a]['brand_url_name'] + '/';
                if(html[a]['product_id']) url += html[a]['model_url_name'] + '/' + html[a]['product_id'] + '.html';
                if(i < j)
                {
                    h += '<li><a href="'+url+'" target="_blank" title=""><img src="'+html[a][type + '_logo']+'" /></a><a href="'+url+'" class="art-barndname">'+html[a][type + '_cname']+'</a></li>';
                }
                else if(i == j)
                {
                    h += '<li style="margin-right:0px;"><a href="'+url+'" target="_blank" title=""><img src="'+html[a][type + '_logo']+'" /></a><a href="'+url+'" class="art-barndname">'+html[a][type + '_cname']+'</a></li>';
                }
                i++;
            }
        }

        h += '';

        return h;
    },
    getUrl : function(type)
    {
        var url;
        var base = 'http://pbg.gq.com.cn/index.php/interface/';
        switch(type)
        {
            case 'brand':
                url = 'brand/interface_for_cms/?webtype=self&tags=';
                break;
            case 'product':
                url = 'product/interface_for_cms/?webtype=self&tags=';
                break;
        }
        return base + url;
    }
}

var weiboShow = window.weiboShow ||
{

	bindOver : function()
	{
		weiboShow.bindLeave();
		weiboShow.show(1);
        weiboShow.show(2);
	},
    show : function(i)
    {
        var tb = "#tb" + i;
        var box = $(tb);
        $("#showUi" + i + ' li').each(function()
        {
            var current = $(this);

            $(this).mouseover(function()
            {
                var offset = current.position();
                var parent = current.parent();
                var x = offset.left;
                var y = offset.top;

                if(box.width() + x - parent.position().left > parent.width())
				{
				   x = x - box.width()-58;
				}
				
				//这里开始赋值

				$(tb + " .wb-link").each(function()
				{
					//这个是对所有链接进行赋值
					$(this).attr('href', current.children('a').attr('href'));
				})
				//这个是对名字进行赋值
				$(tb + " .wb-bgname").html(current.attr('bgname'));
				//$("#wb-bjzw").html(current.attr('bjzw'));
				$(tb + " .wb-content").html(current.attr('content'));
				$(tb + " .wb-bjbigpot").attr('src', current.children('a').children('img').attr('src'));

				$(tb + " .wb-bjbtn").click(function(){window.open(current.children('a').attr('href'));});

				box.css('position', 'absolute').css('left', (x + 58)).css('top', y).css('z-index', 99999999).show();
                box.mouseleave(function(){weiboShow.hide(i)});
            })
        });
    },
	hide : function(i)
	{
		$('#tb' + i).hide();
	},
	bindLeave : function()
	{
        $('#showUi1').mouseleave(function(){weiboShow.hide(1)});
        $('#showUi2').mouseleave(function(){weiboShow.hide(2)});
	}
}

$(document).ready(loading);

function loading()
{
    $_CNC.loadSearch();
    $_CNC.loadSelect();
    $_CNC_COMMON.txt();

    switch($LOAD)
    {
        case 'home' :
            //首页部分
            $_CNC_LOAD.home();
            break;
        case 'cat_trend' :
            //潮流服饰
            $_CNC_LOAD.cat_trend();
            break;
        case 'cat_clothing' :
            //时装发布
            $_CNC_LOAD.cat_clothing();
            break;
        case 'cat_party' :
            //名流派对
            $_CNC_LOAD.cat_party();
            break;
        case 'cat_jewelry' :
            //珠宝腕表
            $_CNC_LOAD.cat_jewelry();
            break;
        case 'cat_shoes' :
            //鞋包
            $_CNC_LOAD.cat_shoes();
            break;
        case 'cat_beauty' :
            //美妆
            $_CNC_LOAD.cat_beauty();
            break;
        case 'cat_magazine' :
            //杂志
            $_CNC_LOAD.cat_magazine();
            break;
        case 'cat_weibo' :
            //围脖
            weiboShow.bindOver();
            break;
        case 'cat_vinterest' :
            //v趣味
            $_CNC_LOAD.cat_vinterest();
            break;
    }
}

function loadPic(e)
{
	e.onload = function(){};
    
	var o = e.src;
    var p = e.getAttribute('rel');
	var img = new Image();
	var w = 308;
	img.src = p;
	img.onload = function()
	{
		e.src = img.src;
	}
	img.onerror=function()
	{
		e.src = o;
	};
	var ow = img.width;
	var oh = img.height;

    var n = e.parentNode;
    var l = n.getAttribute('href');
    n.setAttribute('href', 'javascript:;');
    n.setAttribute('target', '_self');
    n.onclick = function()
    {
        if(e.src == l)
        {
            e.src = p;
			e.width=ow;
			e.height=oh;
        }
        else
        {
            e.src = l;

			img.src = e.src;
            e.width=w;
            e.height=(img.height*w)/img.width;
        }
    };
}
function loadPics(e)
{
	e.onload = function(){};
    var p = e.getAttribute('rel');

    var xmlHttp;
	
	if(window.ActiveXObject)
	{
		xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	else if(window.XMLHttpRequest)
	{
		xmlHttp = new XMLHttpRequest();
	}
	else
	{
		$.alert("Ajax error");
		xmlHttp = null;
	}

	xmlHttp.open("GET", p);
	xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlHttp.onreadystatechange = function() 
	{
		if(xmlHttp.readyState == 4)
		{
			e.setAttribute('src',p);
		}
	}
	xmlHttp.send(null);
}