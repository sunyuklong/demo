var kuailiyu = {
	tips:function(msg, type, pos, delay){
		(!type || type == 'ok' || type == 'success') && (type = 'succeed');
		dialog = window.top.art.dialog({
			id: type,
			icon: type,
			padding: '5px 20px 5px 0',
			follow: pos||'',
			content: msg + '<a style="margin-left:10px;color:#000080;text-decoration:underline;" href="javascript:void(0)" onclick="window.top.art.dialog.list[\''+type+'\'].close()">知道了</a>',
			ok: false,
			cancel: false,
			title: false,
			lock: false,
			esc: false,
			fixed: true,
			close: function(){
				$(dialog.DOM.border[0]).removeClass("tips succeed error alert warning confirm");
			}
		}).time(delay || 3);
		$(dialog.DOM.border[0]).addClass("tips").removeClass("succeed error alert warning confirm").addClass(type);
	},
	alert:function(msg, type, delay) {
		return this.tips(msg, type || 'warning', 'center', delay || 0);
	},
	ok:function(msg, pos, delay) {
		return this.tips(msg, 'success', pos, delay);
	},
	error:function(msg, pos, delay) {
		return this.tips(msg, 'error', pos, delay);
	},
	warn:function(msg, pos, delay) {
		return this.tips(msg, 'warning', pos, delay);
	},
	confirm:function(msg, ok, cancel, pos) {
		dialog = window.top.art.dialog.confirm(msg, ok, cancel);
		$(dialog.DOM.border[0]).addClass("confirm").removeClass("success error alert warning");
	},
	validform : function(selector, callback){
		var getInfoObj=function(){
			return 	$(this).siblings('.Validform_info').size() ? $(this).siblings('.Validform_info') : $(this).parent().siblings('.Validform_info');
		}
		var _callback = function(json){
			kuailiyu.del_masker();
			if(json.code){
				kuailiyu.ok(json.msg);
			}else{
				kuailiyu.error(json.msg);
			}
			return false;
		}
		$('[datatype]').each(function(i,a){
			$(a).focusin(function(){
				if(this.timeout){clearTimeout(this.timeout);}
				var infoObj=getInfoObj.call(this);
				if(infoObj.find('.Validform_right').length!=0 || infoObj.find('.Validform_checktip').text().length == 0){
					return infoObj.hide();
				}

				var left = $(a).offset().left,
					top = $(a).offset().top,
					w = $(a).width();
				if($(a).attr('datatype') == 'editor' || $(a).attr('type') == "hidden"){
					left = $(a).parent().offset().left;
					top = $(a).parent().offset().top;
					w = 50;
				}
				infoObj.css({
					left:left+w-30,
					top:top-45,
					zIndex:9999
				}).show().animate({
					top:top-35
				},200);
			}).focusout(function(){
				var infoObj=getInfoObj.call(this);
				var that = this;
				this.timeout=setTimeout(function(){
					infoObj.siblings('.Validform_info').show() || infoObj.parent().siblings('.Validform_info').show();
					if(that.attributes['ignore'] != 'undefined' && infoObj.find('.Validform_checktip').text().length == 0 ){
						return infoObj.hide();
					} 
				},0);
				
			});
		});
		var myform = $(selector).Validform({
			tiptype:function(msg,o,cssctl){
				if(!o.obj.is('form')){//验证表单元素时o.obj为该表单元素，全部验证通过提交表单时o.obj为该表单对象;
					var objtip=o.obj.siblings('.Validform_info').find('.Validform_checktip').size() ? o.obj.siblings('.Validform_info').find('.Validform_checktip') : o.obj.parent().siblings(".Validform_info").find('.Validform_checktip');
					cssctl(objtip,o.type);
					objtip.text(msg);

					var infoObj=o.obj.siblings('.Validform_info').size() ? o.obj.siblings('.Validform_info') : o.obj.parent().siblings('.Validform_info');
					if(o.type==2){
						infoObj.fadeOut(200);
					}else{
						var left = o.obj.offset().left,
							top = o.obj.offset().top,
							w = o.obj.width();
						if(o.obj.attr('datatype') == 'editor' || o.obj.attr('type') == "hidden"){
							left = o.obj.parent().offset().left;
							top = o.obj.parent().offset().top;
							w = 50;
						}
						infoObj.css({
							left:left+w-30,
							top:top-45,
							zIndex:9999
						}).show().animate({
							top:top-35	
						},200);
					}
				}	
			},
			showAllError:true,
			ajaxPost:true,
			beforeSubmit:function(curform){
				//同步可视化编辑器内容
				if(typeof(CKEDITOR)!='undefined'){
					for ( instance in CKEDITOR.instances ){
						CKEDITOR.instances[instance].updateElement();
					}
				}else if(typeof(UE)!='undefined'){
					for ( instance in UE.instances ){
						UE.instances[instance].sync();
					}
				}
				kuailiyu.add_masker();
			},		
			callback: callback || _callback
		});
		return myform;
	},
	add_masker : function(){
		var html = '<div id="htmlmasker" class="overlay" style="position:fixed;bottom:0;right:0;width:100%;height:100%;display:block;z-index:9999;background-color:#000;opacity: 0.6;-moz-opacity:0.6;filter:alpha(opacity=60);"></div><div id="htmlloading" class="loading" style="z-index:99999;background:url(/statics/images/admin_img/loader2.gif) no-repeat 0 0;border:0;width:54px;height:54px;position:fixed;top:50%;margin:-27px 0 0 -27px;left:50%;"></div>';
		$('body').append(html);	
	
	},
	del_masker : function(){
		$('#htmlmasker,#htmlloading').remove();
	}
}

$(function(){
	//返回顶部
	scrollTop();
	
	//活动日历
	var cache=[];
	var onhover = function (){
		$('#calendar tbody td a').parent('td').hover(function(){
			var m=$(this).attr('day');
			var url='/api.php?op=calendar&do=daylist&m='+m;
			var t=$(this).offset().top;
			var l=$(this).offset().left;
			var that=$(this);
			var position=function(html){
				$(that).append(html);
				$('#event_pop').show().css({
					'top':(t+28)+'px',
					'left':(l-100)+'px'
				})
			}
					
			if(cache[m]){
				return position(cache[m]);
			}else{
				$.get(url,function(html){
					cache[m]=html
					position(html);
				});
			}
		},function(){
			$('#event_pop').remove();
		});
	}
	
	//上下月日历
	$('#prev_month,#next_month').live('click',function(){
		var m=$(this).attr('m');
		var url='/api.php?op=calendar&do=tr&m='+m;
		$.get(url, function(json){
			$('.the_month').text(json.month);
			$('#calendar tbody').html(json.tr);
			$('#prev_month').attr('m', json.prevmonth);
			$('#next_month').attr('m', json.nextmonth);
			onhover();
		},'json');
	});
	
	//shared
	$('.bds_more').click(function(event){
		$(this).next().toggleClass('show');
		$(document).one('click',function(){
			$('.sharelist').removeClass('show');
		})
	event.stopPropagation();
	});
	
	
	//kuailiyu_new
	$('#hot_new_ul li').mouseover(function(){
		  var index=$(this).index()
	      $(this).addClass('current_new').siblings().removeClass('current_new')
		  $('.paihang div').eq(index).show().siblings().hide()
	})
	
	
	checkCookie();
	
	$('input[type=text]').each(function(i, a){
		var inputvalue = a.value;
		a.style.color = "#b5b5b5";
		$(a).focus(function(){
			var content = this.value;
			if(content == inputvalue){
				this.value = "";
			}
		}).blur(function(){
			var content = this.value;
			if(content == "" || content == inputvalue){
				this.value = inputvalue;
			}
		})
	});
	
	if($('#hot')){
		$('#hot').hover(function(){
			$('#hotleft, #hotright').show();
		},function(){
			$('#hotleft, #hotright').hide();
		})
	}
});

	//返回顶部
function scrollTop(){
	var $backToTopTxt = '<span>顶部</span>', $backToTopEle = $('<div class="backToTop"></div>').appendTo($("body"))
		.html($backToTopTxt).attr('title','返回顶部').click(function() {
			$("html, body").animate({ scrollTop: 0 }, 120);
	}), $backToTopFun = function() {
		var st = $(document).scrollTop(), winh = $(window).height();
		(st > 0)? $backToTopEle.show(): $backToTopEle.hide();
		//IE6下的定位
		if (!window.XMLHttpRequest) {
			$backToTopEle.css("top", st + winh - 166);
		}
	};
	$(window).bind("scroll", $backToTopFun);
	$(function() { $backToTopFun(); });
}


function jspage(page){
    try{
        if(page > max_page) page = max_page;
	    if(page <= 1){
			var baseUrl = jsurl_index.match(/^http:\/\/.+/)!=null ? '' : '/'+document.location.hostname+'/';
		    url = baseUrl + jsurl_index;
		}else{
			var baseUrl = jsurl_page.match(/^http:\/\/.+/)!=null ? '' : '/'+document.location.hostname+'/';
		    url = baseUrl + jsurl_page.replace('{$page}', page);
	    }
	    document.location.href=url;
	    return true;
	}catch(e){
		alert("sorry:"+e);
	}
	return false;
}


var browserEvent = function (obj, url, title) {
    var e = window.event || arguments.callee.caller.arguments[0];
    var B = {
        IE : /MSIE/.test(window.navigator.userAgent) && !window.opera,
        FF : /Firefox/.test(window.navigator.userAgent),
        OP : !!window.opera
    };
    obj.onmousedown = null;
    if (B.IE) {
		var url = '/?utm_source=shoucangjia&utm_medium=lefAD';
        obj.attachEvent("onmouseup", function () {
            try {
                window.external.AddFavorite(url, title);
                window.event.returnValue = false;
            } catch (exp) {}
        });
    } else {
        if (B.FF || obj.nodeName.toLowerCase() == "a") {
			if (window.sidebar) { 
            	obj.setAttribute("rel", "sidebar"), obj.title = title, obj.href = url;
			} else {
				alert ('请用快捷键 Ctrl+D 加入收藏.');
			}
        } else if (B.OP) {
            var a = document.createElement("a");
            a.rel = "sidebar", a.title = title, a.href = url;
            obj.parentNode.insertBefore(a, obj);
            a.appendChild(obj);
            a = null;
        }
    }
}

function createBookmark(sURL,sTitle) {
	if (document.all && window.external) {
		var sUrl = '/?utm_source=shoucangjia&utm_medium=lefAD';
		window.external.AddFavorite (sURL,sTitle);
	} else if (window.sidebar) { 
		window.sidebar.addPanel(sTitle,sURL,'');
	} else {
		alert ('请用快捷键 Ctrl+D 加入收藏.');
	}
}
//set home page
function setHomepage(){  
	if (document.all){  
		document.body.style.behavior='url(#default#homepage)';  
		document.body.setHomePage(document.location.href);
	}else if (window.sidebar){  
		if(window.netscape){  
			try{
				netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");  
			}  
			catch(e){  
				alert("抱歉！您的浏览器不支持直接设为首页。请在浏览器地址栏输入“about:config”并回车然后将[signed.applets.codebase_principal_support]设置为“true”，点击“加入收藏”后忽略安全提示，即可设置成功。");
			}
		}
	}else{
		alert('抱歉！您的浏览器不支持自动设置首页，请使用浏览器菜单手动设置！')
	}
}

function getCookie(c_name){
	if (document.cookie.length>0){
		c_start=document.cookie.indexOf(c_name + "=")
		if (c_start!=-1){ 
			c_start=c_start + c_name.length+1 
			c_end=document.cookie.indexOf(";",c_start)
			if (c_end==-1) c_end=document.cookie.length
				return unescape(document.cookie.substring(c_start,c_end))
		} 
	}
	return ""
};

function setCookie(c_name,value,expiredays){
	var exdate=new Date()
	exdate.setDate(exdate.getDate()+expiredays)
	document.cookie=c_name+ "=" +escape(value)+
	((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}

function checkCookie(){
		username=getCookie('username');
		if (username!=null && username!=""){$('#kuai_weixin').remove();}
		else {
			$('#close_new').click(function(){
				$('#kuai_weixin').hide();
			})
			username = 'close';
			if (username!=null && username!=""){
				setCookie('username',username,7)
			}
		}
	}

// jQuery.autoIMG.js - 2010-04-02 - Tang Bin - /planeArt.cn/ - MIT Licensed
(function(A){var _="maxWidth"in document.documentElement.style,$=!-[1,]&&!("prototype"in Image)&&_;A.fn.autoIMG=function(){var $=this.width();return this.find("img").each(function(D,A){if(_)return A.style.maxWidth=$+"px";var C=A.src;A.style.display="none";A.removeAttribute("src");B(C,function(B,_){if(B>$){_=$/B*_,B=$;A.style.width=B+"px";A.style.height=_+"px"}A.style.display="";A.setAttribute("src",C)})})};$&&(function(A,$,_){_=$.createElement("style");$.getElementsByTagName("head")[0].appendChild(_);_.styleSheet&&(_.styleSheet.cssText+=A)||_.appendChild($.createTextNode(A))})("img {-ms-interpolation-mode:bicubic}",document);var B=(function(){var B=[],A=null,_=function(){var _=0;for(;_<B.length;_++)B[_].end?B.splice(_--,1):B[_]();!B.length&&$()},$=function(){clearInterval(A);A=null};return function(K,J,I,E){var D,F,C,H,$,G=new Image();G.src=K;if(G.complete){J(G.width,G.height);I&&I(G.width,G.height);return}F=G.width;C=G.height;D=function(){H=G.width;$=G.height;if(H!==F||$!==C||H*$>1024){J(H,$);D.end=true}};D();G.onerror=function(){E&&E();D.end=true;G=G.onload=G.onerror=null};G.onload=function(){I&&I(G.width,G.height);!D.end&&D();G=G.onload=G.onerror=null};if(!D.end){B.push(D);if(A===null)A=setInterval(_,40)}}})()})(jQuery)