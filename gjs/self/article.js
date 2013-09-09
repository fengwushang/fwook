//动态显示POST
function Ajax_show(block,purl,pdata)
{			
	if(purl.indexOf('?')>-1){    			  
	  var geturl = purl+'&callback=?'; 
	}
	else {
	  var geturl = purl+'?callback=?'; 
	}		
	$.getJSON(geturl ,{msg:pdata},function(result){    
        if(document.getElementById(block)){
            if(purl.indexOf('http://www.self.com.cn/front_ajax/selftest/')>-1||purl.indexOf('http://www.self.com.cn/front_ajax/selftestresult/')>-1){
                if(result.msg == 'locationhref'){
                    document.location.href=result.id;
                }
                else {
                    document.getElementById(block).innerHTML = result.msg;
                }
            }
            else {
                document.getElementById(block).innerHTML = result.msg;
            }
        }
        else{		    		    
            if(purl.indexOf('/addcomment/')>-1){//发表新闻评论    					
                var errmsg = result.msg;
                var newsid = result.id;
                if( errmsg=='success' ) {
                    alert('发布成功！');
                    loadnewscomment(newsid,1);
                }
                nowsay = true;
            }	
            if(purl.indexOf('/showcollect/')>-1){//显示收藏
                var errmsg = result.msg;
                var newsid = result.id;
                if( errmsg == 'login') {
                    //弹出登陆框
                    alert("您还没有登录，请先登录");
                    SELF.LoginDialog.show();
                    SELF.LoginDialog.bindAfterLogin(function(){   
                        addcollect(newsid,'');	
                    });   
                }
                else if( errmsg == 'show') {
                    //提交收藏
                    addcollect(newsid,'');
                }
                else{
                    alert(errmsg);
                }
                nowsay = true;
            }
            if(purl.indexOf('/addcollect/')>-1){//提交收藏
                var errmsg = result.msg;
                var newsid = result.id;
                if( errmsg== 'login') {
                    //弹出登陆框
                    SELF.LoginDialog.show();   
                }
                else {
                    alert(errmsg);	    
                }
                nowsay = true;				  
            }
        }	
    });
}


//重复提交检查
var nowsay = true;
var nowsay1 = true;
function loadnewscomment(nid,pg)
{
	var param = '';
	document.getElementById('commentTextarea').focus();
	Ajax_show('commentsBox','http://www.self.com.cn/front_ajax/comment/'+nid+'/'+pg+'?'+Math.random(),param);
}
function addnewscomment(nid,cid,msg)
{
    //alert('评论发布中...');
	if( nowsay ) {    
	  if(msg == '请输入评论内容.')
    	{
    	  alert('请输入评论内容！');  
    	}else{	  
    		nowsay = false;
    		var newmsg = msg.replace("+", "::or::");
    	 	newmsg = newmsg.replace("&", "::and::");
    		var param = newmsg;
     	    
      	Ajax_show('none','http://www.self.com.cn/front_ajax/addcomment/'+nid+'/'+cid+'?'+Math.random(),param);
      }
	}
	else {
		alert('不能重复提交！');
	}
}
function replycomment(nid,cid,uname)
{
	document.getElementById('reply_cid').value = cid;
	document.getElementById('commentTextarea').value = '回复 '+uname+' 的留言：';
	document.getElementById('commentTextarea').focus();
}

function showcollect(nid)
{
	if( nowsay ) {
        showcollect_state = 2;
		nowsay = false;
		var param = '';
		Ajax_show('none','http://www.self.com.cn/front_ajax/showcollect/'+nid,param);
	}
	else {
		alert('不能重复提交！');
	}
}
function addcollect(nid,msg)
{
	var newmsg = msg.replace("+", "::or::");
 	newmsg = newmsg.replace("&", "::and::");
	var param = newmsg;
	Ajax_show('none','http://www.self.com.cn/front_ajax/addcollect/'+nid+'?'+Math.random(),param);
  
}
function addgood(nid)
{
	if( nowsay1 ) {
		nowsay1 = false;
	    var param = '';
	    Ajax_show('newsgood_'+nid,'http://www.self.com.cn/front_ajax/goodnews/'+nid+'?'+Math.random(),param);
	}
	else {
		alert('您已点评！');
	}
}
function viewnews(nid)
{
	var param = '';
	//Ajax_show('none','http://www.self.com.cn/front_ajax/viewnews/'+nid+'?'+Math.random(),param);
}
var test_num = 0;
function testnews(nid,result)
{
	var param = result;
	//追加统计
	var baseUrl = window.location.href;
    window.location.href = (baseUrl.split('#')[0] + '#id=' + test_num);
    _trackPageview(window.location.href);
    test_num++;
	Ajax_show('testinfo','http://www.self.com.cn/front_ajax/selftest/'+nid+'?'+Math.random(),param);
}
function testnewsok(nid,result)
{
	var param = result;
	//追加统计
	var baseUrl = window.location.href;
    window.location.href = (baseUrl.split('#')[0] + '#id=' + test_num);
    _trackPageview(window.location.href);
    test_num++;
	Ajax_show('testinfo','http://www.self.com.cn/front_ajax/selftestresult/'+nid+'?'+Math.random(),param);
}


//产品库
function product(type, tags)
{    
    $("#cnc_" + type).html('载入中...');
    var date = new Date();
    if(!tags)
    {
        $("#cnc_" + type).html('');
    }
    url =getUrl(type);
    $.getJSON(url + tags + '&from=www&callback=?'+'&time='+date.getTime(), function(t)
    {
        var h =getHtml(t, type);
        $("#cnc_" + type).html(h);
    });
}
function getHtml(html, type)
{
    if(type == 'brand')
    {
        var j = 1;
    }

    if(type == 'product')
    {
        var j = 2;
    }

    var u = 'http://brand.self.com.cn/';
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
                h += '<li><a href="'+url+'" target="_blank" title=""><img src="'+html[a][type + '_logo']+'" /></a><a href="'+url+'" class="text">'+html[a][type + '_cname']+'</a></li>';
            }
            else if(i == j)
            {
                h += '<li class="last"><a href="'+url+'" target="_blank" title=""><img src="'+html[a][type + '_logo']+'" /></a><a href="'+url+'" class="text">'+html[a][type + '_cname']+'</a></li>';
            }
            i++;
        }
    }

    h += '';

    return h;
}
function getUrl(type)
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

//美容365
function product365(type, tags)
{    
    $("#cnc_" + type).html('载入中...');
    var date = new Date();
    if(!tags)
    {
        //$("#cnc_" + type).html('');
    }
    url =getUrl365(type);
    $.getJSON(url + tags + '&from=www&callback=?'+'&time='+date.getTime(), function(t)
    {
        var h =getHtml365(t, type);
        $("#cnc_" + type).html(h);
    });
}
function getHtml365(html, type)
{
    if(type == 'brand')
    {
        var j = 1;
    }

    if(type == 'product')
    {
        var j = 2;
    }

    var u = 'http://brand.self.com.cn/';
    var h = '';
    var i = 0;

    if((!html || html.length < 1))
    {
        $("#cnc_product").parent().hide().remove();
    }
    else
    {
        for(var a in html)
        {
            url = u + html[a]['brand_url_name'] + '/';
            if(html[a]['product_id']) url += html[a]['model_url_name'] + '/' + html[a]['product_id'] + '.html';
            h += '<div class="item">';
            h += '<div class="pic"><a href="'+url+'" target="_blank" title=""><img src="'+html[a][type + '_logo']+'" width="120" height="120" /></a><p><a href="'+url+'" target="_blank">'+html[a][type + '_cname']+'</a></p></div>';
            h += '<div class="detail">';
            h += '<p><span>所属分类：</span>' + html[a]['product_category'] + '</p>';
            h += '<p><span>产品功效：</span>' + html[a]['product_function'] + '</p>';
            h += '<p><span>参考价格：</span>' + html[a]['product_price'] + '</p>';
            h += '<p><span>产品描述：</span>' + html[a]['product_info'] + '</p>';
            h += '</div>';
            h += '</div>';
            i++;
        }
    }

    h += '';
    return h;
}
function getUrl365(type)
{
    var url;
    var base = 'http://pbg.gq.com.cn/index.php/interface/';
    switch(type)
    {
        case 'product':
            url = 'product/interface_for_cms_self365?tags=';
            break;
    }
    return base + url;
}

//时尚橱窗
function productlook(type, tags)
{    
    $("#cnc_" + type).html('载入中...');
    var date = new Date();
    if(!tags)
    {
        //$("#cnc_" + type).html('');
    }
    url =getUrllook(type);
    $.getJSON(url + tags + '&from=www&callback=?'+'&time='+date.getTime(), function(t)
    {
        var h =getHtmllook(t, type);
        $("#cnc_" + type).html(h);
    });
}
function getHtmllook(html, type)
{
    if(type == 'brand')
    {
        var j = 1;
    }

    if(type == 'product')
    {
        var j = 2;
    }

    var u = 'http://brand.self.com.cn/';
    var h = '';
    var i = 0;

    if((!html || html.length < 1))
    {
        $("#cnc_product").parent().hide().remove();
    }
    else
    {
        for(var a in html)
        {
            url = u + html[a]['brand_url_name'] + '/';
            if(html[a]['product_id']) url += html[a]['model_url_name'] + '/' + html[a]['product_id'] + '.html';
            if(i < j)
            {
                h += '<li><a class="pic" href="'+url+'" target="_blank" title="'+html[a][type + '_cname']+'"><img src="'+html[a][type + '_logo']+'" /></a><a class="title" href="'+url+'" target="_blank">'+html[a][type + '_cname']+'</a></li>';
            }
            else if(i == j)
            {
                h += '<li class="last"><a class="pic" href="'+url+'" target="_blank" title="'+html[a][type + '_cname']+'"><img src="'+html[a][type + '_logo']+'" /></a><a class="title" href="'+url+'" target="_blank">'+html[a][type + '_cname']+'</a></li>';
            }
            i++;
        }
    }

    h += '';
    return h;
}
function getUrllook(type)
{
    var url;
    var base = 'http://pbg.gq.com.cn/index.php/interface/';
    switch(type)
    {
        case 'product':
            url = 'product/interface_for_cms/?webtype=self&tags=';
            break;
    }
    return base + url;
}

//文字变大小
	(function($) {       
		SELF.fontSize = function() {
			var zoomIn = $('#zoomIn');
			var zoomOut = $('#zoomOut');
			var container = $('.art-body');
			
			
			zoomIn.click(function(){
				zoomOut.removeClass('on');
				zoomIn.addClass('on');
				container.css('fontSize', '14px');
				container.css('lineHeight', '26px');
			})
			
			zoomOut.click(function(){
				zoomOut.addClass('on');
				zoomIn.removeClass('on');
				container.css('fontSize', '15px');
				container.css('lineHeight', '28px');
			})
		};     
	})(jQuery);
	
//登陆后回调
 function logsucc()
    {
        $('#loginPortId_02').hide();
        $('#password_txt01').show();
        $('#password_txt01').text(SELF.LoginDialog.userInfo.username);
        $('#password_txt01').attr('href','http://bbs.self.com.cn/space-uid-'+SELF.LoginDialog.userInfo.uid+'.html');
        //$('#password_txt01').html('<a href="http://bbs.self.com.cn/space-uid-'+SELF.LoginDialog.userInfo.uid+'.html"  target="_blank">'+SELF.LoginDialog.userInfo.username+'</a>');
    }	
//退出后回调
function logoutsucc()
{
	$('#password_txt01').hide();
	$('#loginPortId_02').show();
}
//ajax 动态获取投票百分比
function showvote(newsid){
	var geturl ="http://www.self.com.cn/front_ajax/GetVoteNum/?"+Math.random()+"&callback=?";
	$.getJSON(geturl ,{newsid:newsid},function(result){
		var result = result.result;
		for(var i in result){
			for(var j in result[i].voteinfo){
				$("#sultitle"+result[i].torder+" li:eq("+parseInt(j)+") em").html(result[i].voteinfo[j].per+'%');
			}
			$("#ultitle"+result[i].torder).css('display','none');
            $("#sultitle"+result[i].torder).css('display','inline');
		}
		
	})
	
}	