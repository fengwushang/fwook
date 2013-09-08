/*************************************************************************************************
 *  @Author      : Pi Ke	
 *  @Date        : 2011-09-03
 *  @Description : Main JS File to define all the actions performed by the whole system
 *************************************************************************************************
 *  Version                 Date                             Comment
 *************************************************************************************************
 *  v1.0.0              2011-09-03                Initial version
 *  v1.0.1              2013-07-28                Refactor part of it       
 *************************************************************************************************/
var top=0;
var left=0;
var right=0;
var navigator_type;                                                   //Check Browser type
var browser_version;                                                  //Check the browser version
var count=0;
var session="Visitor";                                                //Session variable
var doc=document;
var host;
host=location.hostname;                                               //Get the host address name
var xmlhttp;
/************************************************************************/
/*********************JavaScript for ALL pages***************************/
/************************************************************************/
var $={
		_id:function(id){
			return document.getElementById(id);
		},
		_name:function(name){
			return document.getElementsByName(name);
		},
		_unique_name:function(name){
			return document.getElementsByName(name).item(0);
		},
		_tagname:function(tagname){
			return document.getElementsByTagName(tagname);
		},
		_unique_tagname:function(tagname){
			return document.getElementsByTagName(tagname).item(0);
		}
	};
/************************************************************************
 *@Object: EventHandler
 *@methods: addEventHandler(),getEvent(),getMouseX() etc
 *@Description: It is to define the cross browser compatible event handle 
 *		        object (BOM),it defines some methods related to client event
 *				such as addEventHandler and getEvent. All user related events
 *              such as mouse click, move, keydown, keypress can be handled 
 *              by this object. It can also tess the mouse position and event
 *              target when a particular event trggered.
 ************************************************************************/
var EventUtil={
	addEventHandler:function(element,type,handler){
		if(element!=null){
			if(element.addEventListener){
				element.addEventListener(type,handler,false);
			}else{
				if(element.attachEvent){
					element.attachEvent("on"+type,handler);
				}else{
					element["on"+type]=handler;
				}
			}
		}
	},
	removeEventHandler:function(element,type,handler){
		if(element!=null){
			if(element.removeEventListener){
				element.removeEventListener(type,handler,false);
			}else{
				if(element.detachEvent){
					element.detachEvent("on"+type,handler);
				}else{
					element["on"+type]=null;
				}
			}
		}
	},
	
	getEvent:function(event){
		return event?event:window.event;
	},
	
	getTarget:function(event){
		return event.target||event.srcElement;
	},
	
	cancelDefault:function(event){
		if(event.preventDefault)
		{
			event.preventDefault();
		}
		else
		{
			event.returnValue=false;
		}
	},
	
	getButton:function(event){
		if(document.implementation.hasFeature("MouseEvents","2.0"))
		{
			return event.button;
		}
		else
		{
			switch(event.button)
			{
				case 0:
				case 1:
				case 3:
				case 5:
				case 7:
				return 0;
				case 2:
				case 6:
				return 2;
				case 4:
				return 1;
			}
		}
	},
	
	getCharCode:function(event){
		if(typeof event.charCode=="number")
		{
			return event.charCode;
		}
		else
		{
			return event.keyCode;
		}
	},
	getMousePageX:function(event){
		var e=EventUtil.getEvent(event);
		var x=e.pageX;
		if(x===undefined){
			x=e.clientX+(document.body.scrollLeft || document.documentElement.scrollLeft);
		}
		return x;
	},
	getMousePageY:function(event){
		var e=EventUtil.getEvent(event);
		var y=e.pageX;
		if(y===undefined){
			y=e.clientY+(document.body.scrollTop || document.documentElement.scrollTop);
		}
		return y;
	},	
};
/************************************************************************
 *@Object: Broswer
 *@Description: It is to define the cross browser compatible browser 
 *		        object (BOM),it defines some properties related to browser
 *				such as browser width and height
 ************************************************************************/
var Browser={
	width:function(){
		var windowWidth=window.innerWidth;
	
		if(typeof windowWidth!="number")
		{
			if(document.compatMode=="CSS1Compat")
			{
				windowWidth=document.documentElement.clientWidth;
			}
			else
			{
				windowWidth=document.body.clientWidth;
			}
		}
		return windowWidth;
	},
	height:function(){
		var windowHeight=window.innerHeight;
	
		if(typeof windowHeight!="number")
		{
			if(document.compatMode=="CSS1Compat")
			{
				windowHeight=document.documentElement.clientHeight;
			}
			else
			{
				windowHeight=document.body.clientHeight;
			}
		}
		return windowHeight;
	},
	getWidth:function(){
		var windowWidth=window.innerWidth;
		if(typeof windowWidth!="number")
		{
			if(document.documentElement)
				windowWidth=document.documentElement.clientWidth;
			else
				windowWidth=document.body.clientWidth;
		}
		return windowWidth;
	},
	getHeight:function(){
		var windowHeight=window.innerHeight;
		
		if(typeof windowHeight!="number")
		{
			if(document.documentElement)
				windowHeight=document.documentElement.clientHeight;
			else
				windowHeight=document.body.clientHeight;
		}
		return windowHeight;
	},
	getScrollTop:function(){
		var scrollTop;
		
		if(window.scrollY)
			scrollTop=window.scrollY;
		else if(document.documentElement)
			scrollTop=document.documentElement.scrollTop;	
		else
			scrollTop=document.body.scrollTop;
		return scrollTop;
	},
	getScrollLeft:function(){
		var scrollLeft;
		if(window.scrollX)
			scrollLeft=window.scrollX;
		else if(document.documentElement)
			scrollLeft=document.documentElement.scrollLeft;	
		else
			scrollLeft=document.body.scrollLeft;
		return scrollLeft;
	},
	getMouseX:function(event){
		var mouseX;
		if(window.event)
			mouseX=window.event.clientX;
		else
			mouseX=event.clientX;
		
		return mouseX;
	},
	getMouseY:function(event){
		var mouseY;
		if(window.event)
			mouseY=window.event.clientY;
		else
			mouseY=event.clientY;
		
		return mouseY;
	},
	getBrowserType:function(){
		var agent=navigator.userAgent;

		if(agent.indexOf("MSIE 8.0")>0)
			return "IE8";
		else
		{
			if(agent.indexOf("MSIE 7.0")>0)
				return "IE7";
			else
			{
				if(agent.indexOf("Firefox")>0)
					return "Firefox";
				else
				{
					if(agent.indexOf("Chrome")>0)
						return "Chrome";
					else
					{
						if(agent.indexOf("Safari")>0)
							return "Chrome";
						else
							return "Unknown";
					}
				}
			}
		}						   
	}
};
/************************************************************************
 *@Object: System
 *@methods: show(0,hide() etc
 *@Description: System functions like show element and hide element
 ************************************************************************/
var System={
	getXmlHttpRequest:function(){	
		if(window.ActiveXObject)
			return (new ActiveXObject("Microsoft.XMLHTTP"));
		else
			return new XMLHttpRequest();
	},
	out:{
		println:function(str){
			document.write(str+"<br />");
		}
	},
	trim:function(str){
		return str.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,'').replace(/\s+/g,' ');
	},
    showItem:function(id){
    	var obj=null;
		if(typeof id=="string"){
			obj=$._id(id);
		}else{
			obj=id;
		}
		obj.style.visibility="visible";
		obj.style.display="block";
	},
    hideItem:function(id){
		var obj=null;
		if(typeof id=="string"){
			obj=$._id(id);
		}else{
			obj=id;
		}
		obj.style.visibility="hidden";
		obj.style.display="none";
	},
	toggleItem:function(id){
		var obj=null;
		if(typeof id=="string"){
			obj=$._id(id);
		}else{
			obj=id;
		}
		if(obj.style.visibility=="hidden"){
			this.showItem(obj);
		}else{
			this.hideItem(obj);
		}
	},
	scrollObject:function(obj,dir,start,mode,step){
		if(mode!="undefined"&&mode=="auto"){
			if(obj.style.top==""||obj.style.top==null){
				obj.style.top=0+"px";
			}

			switch(dir){
			case "top":obj.style.top=parseInt(start)+parseInt(step)+"px";break;
			case "left":obj.style.left=parseInt(start)+parseInt(step)+"px";break;
			case "right":obj.style.right=parseInt(start)+parseInt(step)+"px";break;
			case "bottom":obj.style.bottom=parseInt(start)+parseInt(step)+"px";break;
			default:alert("Undefined scroll direction");break;
			}
		}else{
			var amount=0;
			if(document.documentElement&&Browser.getBrowserType()!="Chrome"){
				switch(dir){
				case "top":amount=document.documentElement.scrollTop;break;
				case "left":amount=document.documentElement.scrollLeft;break;
				case "right":amount=document.documentElement.scrollRight;break;
				case "bottom":amount=document.documentElement.scrollBottom;break;
				default:alert("Undefined scroll direction");break;
				}
			}else if(document.body){
				switch(dir){
				case "top":amount=document.body.scrollTop;break;
				case "left":amount=document.body.scrollLeft;break;
				case "right":amount=document.body.scrollRight;break;
				case "bottom":amount=document.body.scrollBottom;break;
				default:alert("Undefined scroll direction");break;
				}
			}else{
				alert("Scroll is not supported");
			}
			this.scrollObject(obj,dir,start,"auto",amount);
		}
	}
};
var Checker={
	isEmpty:function(field){
		if(typeof field=="object"){
			if(field.value==""){
				return true;
			}
		}else{
			if(field==""){
				return true;
			}
		}
		return false;
	},
	isEmail:function(email){
		var email_reg=/[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
		return email_reg.test(email);
	},
	isPhone:function(phone){
		var phone_reg=/^(\+[0-9]{2}\s*)*[0-9]+$/;
		return phone_reg.test(phone);
	},
	isZipCode:function(zipcode){
		var zip_reg=/^[0-9]+$/;
		return zip_reg.test(zipcode);
	},
	isEqual:function(value1,value2){
		return (value1==value2);
	},
	isInLength:function(value,min_len,max_len){
		return (value.length>=min_len&&value.length<=max_len);
	}
};
function XHR(method,url,async,handler){
	this.method=method;
	this.url=url;
	this.async=async;
	this.handler=handler;
	this.xhr=null;
	this.responseText="ajaxaja";
}
XHR.prototype={
	create:function(){
		if(typeof XMLHttpRequest!="undefined"){
			this.xhr=new XMLHttpRequest();
			return this.xhr;
		}else if(typeof ActiveXObject!="undefined"){
			if(typeof arguments.callee.activeXString!="string"){
				var versions=["Microsoft.XMLHTTP","MSXML2.XMLHttp.6.0","MSXML2.XMLHttp.3.0","MSXML2.XMLHttp"];
				for(var i=0;i<versions.length;i++)
				{
					try{
						var xhr=new ActiveXObject(versions[i]);
						//arguments.callee.activeXString=version[i];
						this.xhr=xhr;
						return xhr;
					}catch(ex){
						alert("Sorry cannot create XHR");
					}
				}
				//this.xhr=new ActiveXObject(arguments.callee.activeXString);
				return this.xhr;
			}else{
				throw new Error("NO XHR Object available");
			}
		}
	},
	connect:function(){
		if(this.xhr!=null){
			var xhrObj=this.xhr;
			xhrObj.handler=this.handler;
			this.xhr.onreadystatechange=function(){
				if(xhrObj.readyState==4&&xhrObj.status==200){	
					if(xhrObj.handler!=null){
						xhrObj.handler.call(null,xhrObj.responseText);
					}
				}
			};
		}
	},
	send:function(query){
		if(this.method.toLowerCase()=="get"){
			this.xhr.open(this.method,this.url+"?"+query+"&rnd="+Math.random(),this.async);
			this.xhr.send(null);
		}else{
			this.xhr.open(this.method,this.url,this.async);
			this.xhr.setRequestHeader("Content-Type","Application/x-www-form-urlencoded");   
			this.xhr.setRequestHeader("Cache-Control","no-cache");
			this.xhr.send(query+"&rnd="+Math.random());
		}
	},
	getResponseText:function(){
		//while(this.responseText=="ajaxaja"){}
		return this.responseText;
	}
};
function getOperatingSystem()
{
	if(navigator.userAgent.indexOf("MSIE")>0)
	{
		return "MSIE";
	}
	if(navigator.userAgent.indexOf("Firefox")>0)
	{
		return "Firefox";
	}
	if(navigator.userAgent.indexOf("Chrome")>0)                       
	{
		return "Chrome"
	}
	else
	{
	    if(navigator.userAgent.indexOf("Safari")>0)
	    {
		    return "Safari";
	    }
	}
	if(navigator.userAgent.indexOf("Camino")>0)
	{
		return "Camino";
	}
	if(navigator.userAgent.indexOf("Gecko/")>0)
	{
		return "Gecko";
	}
}
function createXmlHttpRequest()
{
	if(window.ActiveXObject)
	{
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	else
	{
		xmlhttp=new XMLHttpRequest();
	}
}
function loadSession()
{
	createXmlHttpRequest();
	
	xmlhttp.onreadystatechange=loadS;
	xmlhttp.open("Get","../component/SessionRetriever.asp?rnd="+Math.random(),false);
	xmlhttp.send(null);
}
function loadS()
{
	if(xmlhttp.ReadyState==4&&((xmlhttp.Status>=200&&xmlhttp.Status<300)||xmlhttp.Status==304))
	{
		session=unescape(xmlhttp.responseText);
		if(session=="")
		{
			session="Guest";
		}
		if(doc.getElementById("session_username"))
		{
			doc.getElementById("session_username").innerHTML=session;
		}
	}
}
function toggle_menu()
{
	var event=EventUtil.getEvent();
	var target=EventUtil.getTarget(event);
    
	var tags=target.getElementsByTagName("ul");
	if(tags.length>0)
	{
		for(var i=0;i<tags.length;i++)
		{
			if(tags[i].style.display=="none")
			{
				tags[i].style.display="block";
			}
			else
			{
				tags[i].style.display="none";
			}
		}
	}
}
//Toggle list of file_generator.php page
function toggle_list(id)
{
	var visibility=document.getElementById(id).style.visibility;
	var display=document.getElementById(id).style.display;
	
	if(visibility=="hidden")
	{
		document.getElementById(id).style.visibility="visible";
		document.getElementById(id).style.display="block";
	}
	else
	{
		document.getElementById(id).style.visibility="hidden";
		document.getElementById(id).style.display="none";
	}	
	document.getElementById("sp").value=document.getElementById(id).getAttribute("path");
	document.getElementById("save_path").value=document.getElementById(id).getAttribute("path");
}
//Toggle list of file_generator.php page
function explorer_toggle_list(id)
{
	var visibility=document.getElementById(id).style.visibility;
	var display=document.getElementById(id).style.display;
	
	if(visibility=="hidden")
	{
		document.getElementById(id).style.visibility="visible";
		document.getElementById(id).style.display="block";
	}
	else
	{
		document.getElementById(id).style.visibility="hidden";
		document.getElementById(id).style.display="none";
	}	
	//document.getElementById("sp").value=document.getElementById(id).getAttribute("path");
	//document.getElementById("save_path").value=document.getElementById(id).getAttribute("path");
}
function toggle_item(id)
{
	var Item=document.getElementById(id);

	if(Item.style.visibility=="hidden")
	{
		Item.style.visibility="visible";
		Item.style.display="block";
	}
	else
	{
		Item.style.visibility="hidden";
		Item.style.display="none";
	}
}
function show_item(id)
{
	var Item=document.getElementById(id);
	Item.style.visibility="visible";
	Item.style.display="block";
}
function hide_item(id)
{
	var Item=document.getElementById(id);
	Item.style.visibility="hidden";
	Item.style.display="none";
}
function GetUrl(){
	var href=window.location;                                                  //Get url form the browser address bar
	var tags_td=document.getElementById("header_main_table").getElementsByTagName("td");  //Get all <td> elemnts in header table
	var href_pattern=/\/$/;	                                                   //Regular expression to test whether the page is homepage or not
	
	//Get the host path base
	var pathbase=href.pathname;
	if(pathbase!="/"){
		for(var i=0;i<tags_td.length;i++){
			var tags_a=tags_td[i].getElementsByTagName("a");
			
			//Set background color for the selected page tag
			if(tags_a[0]!=undefined&&tags_a[0].href.toLowerCase().indexOf(pathbase.toLowerCase())>=0){
				tags_td[i].className+=" active-btn";
				break;
			}
		}
	}
}
function reloadCCode(obj){
	obj.src="backstage/ccode.php?rnd="+Math.random();
}
function load_news(){
	createXmlHttpRequest();
	
	if(xmlhttp!=null){
		xmlhttp.onreadystatechange=loadN;
		xmlhttp.open("get","../backstage/news_processor.php?cmd=show&rnd="+Math.random(),true);
		xmlhttp.send(null);
	}
}
function loadN(){
	if(xmlhttp.readyState==4&&xmlhttp.status==200){
		var json=eval("("+xmlhttp.responseText+")");
		var html="";
		if(json!=null)
		{
			for(var i=0;i<json.news.length;i++)
			{
				html+="<table class='news_item "+((i%2)?"news_item_odd":"news_item_even")+"' cellpadding='0' cellspacing='0' title='"+json.news[i].content+"' onmouseover='this.style.cursor=\"pointer\";'>";
				html+="<tr><td>"+json.news[i].title+"</td></tr>";
				html+="<tr><td>Date :"+json.news[i].time+"</td></tr>";
				html+="</table>";
			}
		}
		document.getElementById("index_news_panel").innerHTML=html;
	}
}
function panel_scroll(id,direction,interval,amount)
{
	var panel=document.getElementById(id);
	//table_scroll(id,direction,100,amount/20,0)
	setTimeout("table_scroll('"+id+"','"+direction+"',40,"+amount/50+",0);",5000);
	if(panel.scrollTop>=(panel.scrollHeight-200)){
		panel.scrollTop=0;
	}
}
function table_scroll(id,direction,interval,amount,scrolled_amount)
{
	var panel=document.getElementById(id);
	if(direction=="up"){
		panel.scrollTop+=amount;
	}else{
		panel.scrollTop+=-amount;
	}
	scrolled_amount+=amount;
	if(scrolled_amount<50){
		setTimeout("table_scroll('"+id+"','"+direction+"',"+interval+","+amount+","+scrolled_amount+")",interval);
	}else{
		setTimeout("panel_scroll('"+id+"','"+direction+"',"+3000+","+50+")",2000);
	}
}
function checkRegistration(){
	var username=$._unique_name("user_id").value;
	var psd1=$._unique_name("psd1").value;
	var psd2=$._unique_name("psd2").value;
	var email=$._unique_name("email").value;
	
	if(!$._unique_name("agree").checked){
		alert("Error #1: Sorry, you must agree the terms of condition to continue.");
		return false;
	}
	
	if(Checker.isEmpty(username)||Checker.isEmpty(psd1)||Checker.isEmpty(psd2)||Checker.isEmpty(email)){
		alert("Error #2: Field with * cannot be empty. Please check it again!");
		return false;
	}
	
	if(!Checker.isEmail(email)){
		alert("Error #3: Email format is not correct. Please use a correct email!");
		return false;
	}
	
	if(!Checker.isEqual(psd1,psd2)){
		alert("Error #4: Two passwords are not the same. Please verify your password!");
		return false;
	}
	
	$._unique_name("submit").disabled="true";
	
	return true;
}
function verify_comment(){
	var nickname=$._unique_name("nickname").value;
	var email=$._unique_name("email").value;
	var comment=$._unique_name("comment").value;
	
	if(Checker.isEmpty(nickname)||Checker.isEmpty(nickname)||Checker.isEmpty(nickname)){
		alert("Error #1: Some field is empty.");
		return false;
	}
	
	if(!Checker.isEmail(email)){
		alert("Error #2: Email format is incorrect. Please use a correct email");
		return false;
	}
	
	return true;
}
function verify_question(){
	var nickname=$._unique_name("nickname").value;
	var email=$._unique_name("email").value;
	
	if(Checker.isEmpty(nickname)||Checker.isEmpty(nickname)||Checker.isEmpty(nickname)){
		alert("Error #1: Nickname cannot be empty.");
		return false;
	}
	
	if(!Checker.isEmail(email)){
		alert("Error #2: Email format is incorrect. Please use a correct email");
		return false;
	}
	
	return true;
}
function verify_ad(){
	var name=$._unique_name("name").value;
	var email=$._unique_name("email").value;
	var phone=$._unique_name("contact_no").value;
	
	if(Checker.isEmpty(name)||Checker.isEmpty(email)){
		alert("Error #1: Some fields cannot be empty.");
		return false;
	}
	
	if(!Checker.isEmail(email)){
		alert("Error #2: Email format is incorrect. Please use a correct email");
		return false;
	}
	
	if(!Checker.isEmpty(phone)&&!Checker.isPhone(phone)){
		alert("Error #3: Contact number format is wrong");
		return false;
	}
	
	return true;
}
//Verify bug report page
function PostBug(){
	var bugURL=$._unique_name("bug_url").value;
	var email=$._unique_name("email").value;

	if(!Checker.isEmpty(email)){
		if(!Checker.isEmail(email)){
			alert("Please enter a correct email");
			return false;
		}
	}
	
	if(Checker.isEmpty(bugURL)){
		alert("Bug URL cannot be empty");
		return false;
	}
	
	return true;
}
//Close the system ad window
function closeSystemAd(event){
	EventUtil.removeEventHandler($._id("closeBtn"),"click",closeSystemAd);
	EventUtil.removeEventHandler(window,"scroll",scrollSystemAd);
	System.hideItem("system_ad");
}
function scrollSystemAd(event){
	var win=$._id("system_ad");
	System.scrollObject(win,"top",80);
}
function clickEventTrack(event){
	var e=EventUtil.getEvent(event);
	var pageX=EventUtil.getMousePageX(e);
	var pageY=EventUtil.getMousePageY(e);
	var target=EventUtil.getTarget(e).tagName;
	var url=location.href;
	var type=e.type;
	
	var query="cmd=save&type="+encodeURIComponent(type)+"&target="+encodeURIComponent(target)+"&url="+encodeURIComponent(url)+"&x="+pageX+"&y="+pageY+"&rnd="+Math.random();
	var xhr=new XHR("POST","../backstage/event_tracker.php",true,null);
	xhr.create();
	xhr.connect();
	xhr.send(query);
}
var HeaderMenuManager=(function(){
	return {
		handleHeaderMenuSelect:function(event){
			var e=EventUtil.getEvent(event);
			var target=EventUtil.getTarget(e);
			
			if(target.className.indexOf("header_menu")!=-1){
				target.className+=" active-btn";
				var subMenuId=target.getAttribute("submenu");
				EventUtil.addEventHandler(document.getElementById(subMenuId),"mouseover",function(){target.className+=" active-btn";System.showItem(subMenuId);});
				EventUtil.addEventHandler(document.getElementById(subMenuId),"mouseout",function(){target.className=target.className.replace(" active-btn","");System.hideItem(subMenuId);});
				System.showItem(document.getElementById(target.getAttribute("submenu")));
			}
		},
		handleHeaderMenuDeselect:function(event){
			var e=EventUtil.getEvent(event);
			var target=EventUtil.getTarget(e);
			
			if(target.className.indexOf("header_menu")!=-1){
				target.className=target.className.replace(" active-btn","");
				System.hideItem(document.getElementById(target.getAttribute("submenu")));
			}
		}
	};
})();
function init(){
	GetUrl();
	EventUtil.addEventHandler(document,"click",clickEventTrack);
}
window.onload=init;