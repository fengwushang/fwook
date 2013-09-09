// JavaScript Document
window.onload = function() {

	$("table tr:nth-child(even)").addClass("even"); //这个是jquery代码
};


/**
* 添加对产品的喜欢
*
*/
ajaxurl = "http://brand.self.com.cn/common/ajax/";
var like_clicked = true;
var want_clicked = true;
var used_clicked = true;

/**
* 添加我想用此产品
*
*/
function wantuse(id)
{
	if(want_clicked){
		if(id != '')
		{
			$.alert('我想用添加成功');
			var i = $("#wantnum").text();
			$("#wantnum").text(parseInt(i) + 1);
			$.ajax({
				url:ajaxurl + 'add_product_wantuse/',
				dataType:'json',
				data:{id:id},
				type:'post',
				success:function(data){
					if(data.status == 1)
					{
						//$_CNC_COMMON.creditAlert(data, '我想用添加成功');
						//$("#wantnum").text(data.wannum);
					}else{
						//$.alert('添加失败');
					}
				}
			});
		}
		want_clicked = false;
		return true;
	}else{
		$.alert('请不要重复提交。');
	}
}


/**
* 添加我用过此产品
*
*/
function haveused(id)
{
	if(used_clicked){
		if(id != '')
		{
			$.alert('我用过添加成功');
			var i = $("#usednum").text();
			$("#usednum").text(parseInt(i) + 1);
			$.ajax({
				url:ajaxurl + 'add_product_haveused/',
				dataType:'json',
				data:{id:id},
				type:'post',
				success:function(data){
					if(data.status == 1)
					{
						if(data.credit)
						{
							var arr = data.credit.split('::');
							$_CNC_COMMON.creditShow(arr[0], arr[1]);
						}
						else
						{
							//$.alert('我用过添加成功');
						}
						//$("#usednum").text(data.usnum);
					}else{
						$.alert('添加失败');
					}
				}
			});
		}
		used_clicked = false;
		return true;
	}else{
		$.alert('请不要重复提交。');
	}
}


/**
* 添加评论可用
*
*/
function comment_avail(id)
{
	if(id != '')
	{
		$.ajax({
			url:ajaxurl + 'add_comment_avail/',
			dataType:'json',
			data:{id:id},
			type:'post',
			success:function(data){
				if(data.status == 1)
				{
					$.alert('此评论可用添加成功！', function(){document.location.reload()});
					
				}else{
					$.alert('评论可用添加失败！');
				}
			}
		});
	}

}


/**
* 添加产品评论
*
*/
function pro_addcomment(parent_id, id, num)
{
	//$('#submitcomment').attr(disabled,false);
	if(SELF.LoginDialog.isLogin || $('#log_check').attr('checked') == 'checked')
	{

        $('#comment_content').focus();
		if($('#comment_content').val() == "")
		{
			$.alert('请输入评论内容！');
			$('#comment_content').focus();
			return false;
		}
		else
		{
            $.alert('评论发布中...');
			if($('#log_check').attr('checked') == 'checked')
			{
				uid = 0;
				uname = '悦己访客';
			}else{
				uid = SELF.LoginDialog.userInfo.uid;
				uname = SELF.LoginDialog.userInfo.username;
			}

			if(id != '')
			{
				var comment_val = $('#comment_content').val();
				var score = $('#score').val();

				$.ajax({
					url:ajaxurl + 'add_product_comment/',
					dataType:'json',
					data:{parent_id:parent_id,id:id,uid:uid,uname:uname,comment_content:comment_val,score:score},
					type:'post',
					success:function(data){
						if(data.status == 1)
						{
							$('#comment_content').val('');
                            $_CNC_COMMON.creditAlert(data, '评论添加成功！',function(){$.box('close');showComment(id, 'showComment', 1, 1, num);});
							var i = $("#comment_num").text();
							$("#comment_num").text(parseInt(i) + 1);
							showProductComment(id);
						}else{
							$.alert('评论添加失败！');
						}
					}
				});
			}
		}

	}
	else{

		$.alert('您还未登陆系统，请选择“不登陆匿名发布”或者登陆系统后再发表评论！');
	}

	return true;
}

/**
 * 产品底层页Ajax显示评论
 */
function showProductComment(id) {
	if (!id) {
		return false;
	}
	$.get(ajaxurl + 'showProductComment/',{id: id}, function(result){
  		if (result) {
			var con = '';
			if (typeof(JSON) == 'undefined'){
	  			data =  eval("(" + result + ")");
	  		} else {
	  			data = JSON.parse(result);
	  		}
			var last = data.length;
			$.each(data,function(key, value) {
				if (last == key+1) {
					lastitem = ' itemlist';
				} else {
					lastitem = '';
				}
				con = con + '<li class="item'+lastitem+'">\
					<div class="pic"><a target="_blank" title="'+ value.username+'" href="'+ value.user_link+'"><img width="80" height="80" src="'+ value.user_img +'"/></a></div>\
					<div class="info">\
					<h3 class="general"><span class="date">'+ value.add_time+'</span><a href="'+ value.user_link+'" target="_blank" title="'+ value.username+'">'+ value.username+'</a></h3>\
					<p>'+ value.content+'</p>\
					</div>\
					</li>';
			});
			$('#showComment').html(con);
		}
	});
}

/**
 * Ajax显示评论
 */
var $p = 1;
var $e = 'showComment';
var $s = 1;
function showComment(i,e,p,s,num)
{
    if(!p)
    {
        p = $p;
    }
    $p = p;

    if(!s)
    {
        s = $s;
    }
    $s = s;

    if(!e)
    {
        e = $e;
    }
    $e = e;
	if(!num)
    {
        num = 5;
    }
    $.get(ajaxurl + 'show_comment/?id=' + i +'&page=' + p + '&sort='+s + '&num='+num, function(t)
    {
        $("#" + e).html(t);
    });
}

/**
* 添加产品评论的回复
*
*/
function replycomment(url,replyuid)
{
	//window.location.href=url;
    location.href = '#username_load';
	$('#comment_content').val('回复'+replyuid+': ');
}



/**
* 判断品牌、产品是否收藏
*
*/

var collection_save=function(id,type){
	var box=$('#shareFloatBox');
	var box2=$('#shareOkBox');
	var box3=$('#shareOverBox');

	if(type == 'brand')
	{
		tyname = '此品牌';
	}else
	{
		tyname = '此产品';
	}

	$('#loginPortId_03').bind('click',function(e){
		e.preventDefault();
        collection_save_state = 2;
		if(SELF.LoginDialog.isLogin){
			var self=$(this),pos=self.offset();
			$.ajax({
				url:ajaxurl + 'add_processiong_bp_collection/',
				dataType:'json',
				data:{id:id,uid:SELF.LoginDialog.userInfo.uid, type:type},
				type:'post',
				success:function(data){

                    collection_save_state = 1;
					if(data.status == 1)
					{
                        add_collection(id,type);
					}
					else if(data.status == 2)
					{
                        var string = $_CNC_COMMON.creditReturn('collect');
                        $.alert(string.content);
					}
					else{
						$.alert('系统错误，请重试！');
					}
				}
			});
		}
		else
		{
			if(type == 'product')
			{
				if(like_clicked)
				{
					$.ajax({
						url: ajaxurl + 'add_product_like/',
						dataType:'json',
						data:{id:id},
						type:'get',
						success:function(data){					
							if(data.status == 1)
							{
								$.alert('您已经成功的对该产品表示了喜欢，欢迎继续浏览。');
								//$("#loginPortId_03").html('已喜欢');
								$("#likenum").text(data.likenum);
								like_clicked = false;
							}else{
								$.alert('添加喜欢失败');
							}
						}
					});
					
					return true;
				}
				else
				{
					$.alert('请不要重复提交。');
				}
				return;
			}
			else
			{
				$('#top-login-btn').click();
			}
			
		}
	});
}


/**
* 添加品牌、产品收藏
*
*/
function add_collection(id,type)
{
	$.ajax({
		url:ajaxurl + 'add_bp_collection/',
		dataType:'json',
		data:{id:id,uid:SELF.LoginDialog.userInfo.uid, type:type, collction:""},
		type:'post',
		success:function(data){
			if(data.status == 1)
			{
				if(type == "brand")
				{
					$("#loginPortId_03").addClass('selected');
				}else{
					$("#loginPortId_03").html('喜欢');
					$("#likenum").text(data.likenum);
				}
				var box=$('#shareFloatBox');
				box.hide();
				var box2=$('#shareOkBox');
				$.overlay();
                box2.center();
                $_CNC_COMMON.creditAlert(data, '添加喜欢成功');
			}
			else{
				$.alert('添加喜欢失败！');
				var box=$('#shareFloatBox');
				box.hide();
			}
		}
	});

	return true;
}
/**
* 获取产品统计数据，如喜欢，评论，想用，用过等
*/
function get_product_count(id)
{
	if(id >0)
	{
		$.ajax({
			url:ajaxurl + 'get_product_count/',
			dataType:'json',
			data:{id:id},
			type:'post',
			success:function(data){
				if(data)
				{
					$("#likenum").text(data.like_num);
					//$("#comment_num").text(data.comment_num);
					$("#wantnum").text(data.want_num);
					$("#usednum").text(data.used_num);
				}
			}
		});
	}
}
/**
* 登陆后回调品牌、产品收藏显示
*
*/
function callback_show_collection(id, type)
{
	$.ajax({
		url:ajaxurl + 'add_callback_show_collection/',
		dataType:'json',
		data:{id:id, type:type},
		type:'post',
		success:function(data){
			if(data.status == 1)
			{
				if(type == 'brand')
					$("#loginPortId_03").addClass('selected');
				//else
					//$("#loginPortId_03").html('已喜欢');
			}
			else{
				$("#loginPortId_03").html('我喜欢');
			}
		}
	});

	return true;
}


/**
* 登陆后回调品牌关注显示
*
*/
function callback_show_brand_attation(id, type)
{
	$.ajax({
		url:ajaxurl + 'add_callback_show_brand_attation/',
		dataType:'json',
		data:{id:id, type:type},
		type:'post',
		success:function(data){
			if(data.status == 1)
			{
				$("#loginPortId_04").addClass('selected');
			}
			else{
				$("#loginPortId_04").html('关注');
			}
		}
	});

	return true;
}

/**
* 添加品牌关注
*
*/
function add_attation(id, fans)
{
    add_attation_state = 2;
	if(SELF.LoginDialog.isLogin)
	{
		if(fans == 1)
		{
			ftype = '您已经成为该品牌的粉丝';
			ftype1 = '您已经成为该品牌的粉丝';
		}
		else
		{
			ftype = '您已成功关注该品牌！';
			ftype1 = '您已经关注过该品牌！';
		}

		$.ajax({
			url:ajaxurl + 'add_brand_attation/',
			dataType:'json',
			data:{id:id,uid: SELF.LoginDialog.userInfo.uid},
			type:'post',
			success:function(data){
				if(data.status == 1)
				{
                    $_CNC_COMMON.creditAlert(data, ftype);
					$("#loginPortId_04").addClass('selected');
					$("#addfans").hide();
				}else if(data.status == 2)
				{
					$.alert(ftype1);
				}
				else{
					$.alert('关注添加失败！');
				}
			}
		});
	}
    else
    {
        $('#top-login-btn').click();
    }
	return true;
}

/**
* 添加品牌、产品转发
*
*/
function product_forwarding(id, ptype)
{
    product_save_state = 2;
	if(SELF.LoginDialog.isLogin)
	{
		if(id != '')
		{
			$.ajax({
				url:ajaxurl + 'add_product_forwarding/',
				dataType:'json',
				data:{id:id,uid:SELF.LoginDialog.userInfo.uid,ptype:ptype},
				type:'post',
				success:function(data){
					if(data.status == 1)
					{
                        $.alert('转发成功');
					}else{
						$.alert('转发失败');
					}
				}
			});
		}
	}
    else
    {
         $('#top-login-btn').click();
    }

	return true;
}


function appraise(containerId,scoreId){

	var container=$(containerId);
	var items=container.children(),len=items.length;
	var score=0,scoreElem=$(scoreId);
	container.delegate('li','click',function(e){
		e.preventDefault();
		var self=$(this);
		var index=self.index();
		if(self.hasClass('starleft_checked')||self.hasClass('starright_checked')){
			for(var i=index;i<len;i++){
				if(i%2===0){
					items.eq(i).removeClass('starleft_checked');
				}else{
					items.eq(i).removeClass('starright_checked');
				}
			}
			score=index;
		}else{
			for(var i=0;i<=index;i++){
				if(i%2===0){
					items.eq(i).addClass('starleft_checked');
				}else{
					items.eq(i).addClass('starright_checked');
				}
			}
			score=index+1;
		}
		scoreElem.attr('value',score);
		
	});
}

function initalAppraise(containerId,score){
	var container=$(containerId);
	var items=container.children(),len=items.length;
	if(score>len||score<0){
		return;
	}
	
	for(var i=0;i<score;i++){
				if(i%2===0){
					items.eq(i).addClass('starleft_checked');
				}else{
					items.eq(i).addClass('starright_checked');
				}
			}

}
