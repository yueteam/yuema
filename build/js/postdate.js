!function e(t,n,o){function i(s,r){if(!n[s]){if(!t[s]){var d="function"==typeof require&&require;if(!r&&d)return d(s,!0);if(a)return a(s,!0);var c=new Error("Cannot find module '"+s+"'");throw c.code="MODULE_NOT_FOUND",c}var l=n[s]={exports:{}};t[s][0].call(l.exports,function(e){var n=t[s][1][e];return i(n?n:e)},l,l.exports,e,t,n,o)}return n[s].exports}for(var a="function"==typeof require&&require,s=0;s<o.length;s++)i(o[s]);return i}({1:[function(e,t,n){var o={getUrlParam:function(e){var t=new RegExp("[?|&]"+e+"=([^&]+)"),n=location.search.match(t);return n&&n[1]},stopEventTap:function(){var e=$('<div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 99999; "></div>');$("body").append(e),setTimeout(function(){e.remove()},500)},formatDate:function(e){"string"==typeof e&&(e=this.strToDate(e));var t=e.getFullYear(),n=e.getMonth()+1,o=e.getDate();return 10>n&&(n="0"+n),10>o&&(o="0"+o),t+"-"+n+"-"+o},strToDate:function(e){var t=e.replace(/-/g,"/");return new Date(t)},hideKeyboard:function(){var e=$('<a style="width: 0;height: 0;font-size: 0;display: block"></a>');$("body").append(e),e.focus(),setTimeout(function(){e.remove()},0)},isIOS:function(){var e=ua.match(/(iPad).*OS\s([\d_]+)/),t=ua.match(/(iPod)(.*OS\s([\d_]+))?/),n=!e&&ua.match(/(iPhone\sOS)\s([\d_]+)/);return e||n||t?!0:!1},isAndroid:function(){return ua.indexOf("Android")>-1},isWeixin:function(){return ua.indexOf("MicroMessenger")>-1},template:function(e,t){function n(e){if(!e)return"";var t={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&apos;"};return(""+e).replace(/[&<>"']/g,function(e){return t[e]})}var o,i={"'":"'","\\":"\\","\r":"r","\n":"n","	":"t","\u2028":"u2028","\u2029":"u2029"},a=/'|\\|\r|\n|\t|\u2028|\u2029/g,s=/<%-([\s\S]+?)%>|<%=([\s\S]+?)%>|<%([\s\S]+?)%>|$/g,r=0,d="__p+='";e.replace(s,function(t,o,s,c,l){return d+=e.slice(r,l).replace(a,function(e){return"\\"+i[e]}),o&&(d+="'+\n((__t=("+o+"))==null?'':"+n.name+"(__t))+\n'"),s&&(d+="'+\n((__t=("+s+"))==null?'':__t)+\n'"),c&&(d+="';\n"+c+"\n__p+='"),r=l+t.length,t}),d+="';\n",d="with(obj||{}){\n"+d+"}\n",d=n.toString()+"var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+d+"return __p;\n";try{o=new Function("obj",d)}catch(c){throw c.source=d,c}if(t)return o(t);var l=function(e){return o(e)};return l.source="function(obj){\n"+d+"}",l}};t.exports=o},{}],2:[function(e,t,n){var o=function(e){1==e.isRedirect&&setTimeout(function(){window.location.href=e.redirectURL},2e3)};t.exports={post:function(e,t,n,i){$.ajax({url:e,data:t,type:"post",dataType:"json",success:function(e){o(e),"SUCCESS"===e.resultCode?n(e):i(e)},error:function(e){var t=(e.status||500,"对不起，服务器正在维护，请稍后再试...");switch(e.status){case 404:t="对不起，你访问的接口不存在...";break;case 403:t="对不起，你没有权限访问该接口...";break;case 500:t="对不起，正在进行服务器维护，请稍后再来...";break;case 502:t="对不起，你访问的接口程序出错...";break;case 503:t="对不起，你访问的接口后端异常...";break;default:t="对不起，服务器正在维护，请稍后再试..."}var e={isRedirect:!1,result:{},resultCode:"SERVER ERROR",resultMsg:t};i(e)}})},get:function(e,t,n,i){$.ajax({url:e,data:t,type:"get",dataType:"json",success:function(e){o(e),"SUCCESS"===e.resultCode?n(e):i(e)},error:function(e){var t=(e.status||500,"对不起，服务器正在维护，请稍后再试...");switch(e.status){case 404:t="对不起，你访问的接口不存在...";break;case 403:t="对不起，你没有权限访问该接口...";break;case 500:t="对不起，正在进行服务器维护，请稍后再来...";break;case 502:t="对不起，你访问的接口程序出错...";break;case 503:t="对不起，你访问的接口后端异常...";break;default:t="对不起，服务器正在维护，请稍后再试..."}var e={isRedirect:!1,result:{},resultCode:"ERROR",resultMsg:t};i(e)}})}}},{}],3:[function(e,t,n){var o=$("body"),i=$('<div class="dialog-overlay"></div>'),a=$('<div class="dialog"></div>');t.exports={_stopEventTap:function(){var e=$('<div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 99999; "></div>');$("body").append(e),setTimeout(function(){e.remove()},350)},_initModal:function(){i=$('<div class="dialog-overlay"></div>'),a=$('<div class="dialog"></div>'),o.append(i),o.append(a)},_initEvent:function(){var e=this;$(".dialog-overlay").one("touchend",function(t){t.preventDefault(),e._stopEventTap(),e.hide()})},hide:function(){a.addClass("dialog-out"),i.removeClass("dialog-overlay-visible"),setTimeout(function(){i.remove(),a.remove()},200)},show:function(){i.addClass("dialog-overlay-visible"),a.addClass("dialog-in")},_position:function(){var e=parseInt(a.height())/2;a.css("marginTop","-"+e+"px")},alert:function(e,t){var n=this,o=$('<div class="dialog-inner"></div>');n._initModal();var i=e,s="温馨提示";"object"==typeof e&&e.title&&(i=e.body||"",s=e.title);var r=$('<div class="dialog-title">'+s+"</div>"),d=$('<div class="dialog-text">'+i+"</div>");o.append(r),o.append(d),a.append(o);var c=$('<div class="dialog-buttons"></div>'),l=$('<span class="dialog-button">确定</span>');c.append(l),a.append(c),l.on("click",function(){n.hide(),t&&t()}),n._position(),n.show()},confirm:function(e,t,n){var o=this,i=$('<div class="dialog-inner"></div>');o._initModal(),o._initEvent();var s={title:"温馨提示",body:"object"==typeof e?"":e,okText:"确定",cancelText:"取消"};"object"==typeof e&&(s=$.extend(s,e));var r=$('<div class="dialog-title">'+s.title+"</div>"),d=$('<div class="dialog-text">'+s.body+"</div>");i.append(r),i.append(d),a.append(i);var c=$('<div class="dialog-buttons"></div>'),l=$('<span class="dialog-button">'+s.cancelText+"</span>");$close=$('<span class="dialog-button">'+s.okText+"</span>"),c.append(l),c.append($close),a.append(c),l.on("click",function(){n&&n(),o.hide()}),$close.on("click",function(){t&&t(),o.hide()}),o._position(),o.show()}}},{}],4:[function(e,t,n){t.exports={hide:function(){$(".preloader-indicator-overlay, .preloader-indicator-modal, .preloader-label").remove()},show:function(e){var t="数据加载中...";if("object"==typeof e){t=e.msg||t;var n=$(e.renderTo),o=$('<div class="preloader-label"></div>'),i=$('<span class="preloader"></span>'),a=$('<span class="msg">'+t+"</span>");i.appendTo(o),a.appendTo(o),0===n.find(".preloader-label").length&&o.appendTo(n);var s=parseInt(a.width());o.css("width",s+25+1+"px")}else{t=e||t;var r=$('<div class="preloader-indicator-overlay"></div>'),d=$('<div class="preloader-indicator-modal"></div>'),i=$('<span class="preloader preloader-white"></span>'),a=$('<span class="msg">'+t+"</span>");i.appendTo(d),a.appendTo(d),r.appendTo($("body")),d.appendTo($("body"));var s=parseInt(d.width())/2,c=parseInt(d.height())/2;i.css("marginLeft",s-25+"px"),d.css({marginLeft:"-"+s+"px",marginTop:"-"+c+"px"})}}}},{}],5:[function(e,t,n){var o=$("body"),i=$('<div class="dialog-overlay"></div>'),a=$('<div class="dialog"></div>');t.exports={_initModal:function(){i=$('<div class="dialog-overlay"></div>'),a=$('<div class="dialog dialog-no-buttons"></div>'),o.append(i),o.append(a)},_hide:function(){a.addClass("dialog-out"),i.removeClass("dialog-overlay-visible"),setTimeout(function(){i.remove(),a.remove()},200)},_show:function(){i.addClass("dialog-overlay-visible"),a.addClass("dialog-in")},_position:function(){var e=parseInt(a.height())/2;a.css("marginTop","-"+e+"px")},show:function(e){var t=this,n=$('<div class="dialog-inner"></div>');t._initModal();var o=e.text||"",i=e.title||"";msgType=e.type||"success",callback=e.callback||null,"success"===msgType&&""===i&&(i="成功"),"error"===msgType&&""===i&&(i="失败");var s=$('<div class="iconfont icon-'+msgType+'"></div>'),r=$('<div class="dialog-title">'+i+"</div>"),d=$('<div class="dialog-text">'+o+"</div>");n.append(s),n.append(r),n.append(d),a.append(n),setTimeout(function(){t._hide(),callback&&callback()},2e3),t._position(),t._show()}}},{}],6:[function(e,t,n){$(function(){var t=(e("../../common/utils"),e("../../components/tips")),n=(e("../../components/dialog/dialog"),e("../../components/loading/loading")),o=e("../../components/ajax"),i={init:function(){$("#dateDesc").focus();var e=$(window).height()-300;$(".opt-panel").height(e),this.initEvent()},initEvent:function(){$(document).on("focus","textarea",function(){}),$(document).on("tap",".opt-item",function(){var e=$(this),t=e.data("opt");return e.hasClass("active")?!1:($(".post-option .active").removeClass("active"),e.addClass("active"),$(".opt-panel.open").removeClass("open"),void $("."+t+"-block").addClass("open"))})},doSubmit:function(){n.show(),o.post("http://test.yuema.us/open-api/regist",{method:"regist",userInfo:JSON.stringify(submitData)},function(e){n.hide(),t.show({type:"success",title:"保存成功"})},function(e){n.hide(),t.show({type:"error",title:e.resultMsg})})}};i.init()})},{"../../common/utils":1,"../../components/ajax":2,"../../components/dialog/dialog":3,"../../components/loading/loading":4,"../../components/tips":5}]},{},[6]);