!function e(t,o,n){function i(r,s){if(!o[r]){if(!t[r]){var c="function"==typeof require&&require;if(!s&&c)return c(r,!0);if(a)return a(r,!0);var l=new Error("Cannot find module '"+r+"'");throw l.code="MODULE_NOT_FOUND",l}var d=o[r]={exports:{}};t[r][0].call(d.exports,function(e){var o=t[r][1][e];return i(o?o:e)},d,d.exports,e,t,o,n)}return o[r].exports}for(var a="function"==typeof require&&require,r=0;r<n.length;r++)i(n[r]);return i}({1:[function(e,t,o){var n=window.location.protocol+"//"+window.location.host+"/";"w.yuema.us"===window.location.hostname&&(n=window.location.protocol+"//www.yuema.us/");var i={loginApi:n+"open-api/login",registApi:n+"open-api/simple-regist",perfectApi:n+"action/user/update",provincesListApi:n+"open-api/query/provinces-list",citiesListApi:n+"open-api/query/cities-list",addressesListApi:n+"open-api/query/addresses-list",postDatingApi:n+"action/dating/post",requestDatingApi:n+"action/dating/request",acceptDatingApi:n+"action/dating/accept",listApi:n+"open-api/query/dating/dating-list",profileApi:n+"open-api/query/home-info",myRequestApi:n+"action/query/dating/my-request-dating-list",datingDetailApi:n+"open-api/query/dating/dating-info",chatRecordsApi:n+"action/query/message/message-list",chatListApi:n+"action/query/chatting/my-chatting-list"};t.exports=i},{}],2:[function(e,t,o){var n={getUrlParam:function(e){var t=new RegExp("[?|&]"+e+"=([^&]+)"),o=location.search.match(t);return o&&o[1]},stopEventTap:function(){var e=$('<div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 99999; "></div>');$("body").append(e),setTimeout(function(){e.remove()},500)},formatDate:function(e){"string"==typeof e&&(e=this.strToDate(e));var t=e.getFullYear(),o=e.getMonth()+1,n=e.getDate();return 10>o&&(o="0"+o),10>n&&(n="0"+n),t+"-"+o+"-"+n},strToDate:function(e){var t=e.replace(/-/g,"/");return new Date(t)},hideKeyboard:function(){var e=$('<a style="width: 0;height: 0;font-size: 0;display: block"></a>');$("body").append(e),e.focus(),setTimeout(function(){e.remove()},0)},getNetworkState:function(){var e=150,t=!1;if(window.performance){var o=window.performance.timing,n=o.responseEnd-o.domainLookupStart;t=n>e?!1:!0}return t},isIOS:function(){var e=window.navigator.userAgent,t=e.match(/(iPad).*OS\s([\d_]+)/),o=e.match(/(iPod)(.*OS\s([\d_]+))?/),n=!t&&e.match(/(iPhone\sOS)\s([\d_]+)/);return t||n||o?!0:!1},isAndroid:function(){var e=window.navigator.userAgent;return e.indexOf("Android")>-1},isWeixin:function(){var e=window.navigator.userAgent;return e.indexOf("MicroMessenger")>-1},getCookie:function(e){var t=new RegExp("(^| )"+e+"=([^;]*)(;|$)"),o=document.cookie.match(t);return null!=o?decodeURI(o[2]):""},isLogin:function(){var e=this,t=e.getCookie("logined");return""!==t?!0:!1},template:function(e,t){function o(e){if(!e)return"";var t={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&apos;"};return(""+e).replace(/[&<>"']/g,function(e){return t[e]})}var n,i={"'":"'","\\":"\\","\r":"r","\n":"n","	":"t","\u2028":"u2028","\u2029":"u2029"},a=/'|\\|\r|\n|\t|\u2028|\u2029/g,r=/<%-([\s\S]+?)%>|<%=([\s\S]+?)%>|<%([\s\S]+?)%>|$/g,s=0,c="__p+='";e.replace(r,function(t,n,r,l,d){return c+=e.slice(s,d).replace(a,function(e){return"\\"+i[e]}),n&&(c+="'+\n((__t=("+n+"))==null?'':"+o.name+"(__t))+\n'"),r&&(c+="'+\n((__t=("+r+"))==null?'':__t)+\n'"),l&&(c+="';\n"+l+"\n__p+='"),s=d+t.length,t}),c+="';\n",c="with(obj||{}){\n"+c+"}\n",c=o.toString()+"var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+c+"return __p;\n";try{n=new Function("obj",c)}catch(l){throw l.source=c,l}if(t)return n(t);var d=function(e){return n(e)};return d.source="function(obj){\n"+c+"}",d}};t.exports=n},{}],3:[function(e,t,o){var n=function(e){1==e.isRedirect&&setTimeout(function(){window.location.href=e.redirectURL},2e3)};t.exports={post:function(e,t,o,i){$.ajax({url:e,data:t,type:"post",dataType:"json",success:function(e){n(e),"SUCCESS"===e.resultCode?o(e):i(e)},error:function(e){var t=(e.status||500,"对不起，服务器正在维护，请稍后再试...");switch(e.status){case 404:t="对不起，你访问的接口不存在...";break;case 403:t="对不起，你没有权限访问该接口...";break;case 500:t="对不起，正在进行服务器维护，请稍后再来...";break;case 502:t="对不起，你访问的接口程序出错...";break;case 503:t="对不起，你访问的接口后端异常...";break;default:t="对不起，服务器正在维护，请稍后再试..."}var e={isRedirect:!1,result:{},resultCode:"SERVER ERROR",resultMsg:t};i(e)}})},get:function(e,t,o,i){$.ajax({url:e,data:t,type:"get",dataType:"json",success:function(e){n(e),"SUCCESS"===e.resultCode?o(e):i(e)},error:function(e){var t=(e.status||500,"对不起，服务器正在维护，请稍后再试...");switch(e.status){case 404:t="对不起，你访问的接口不存在...";break;case 403:t="对不起，你没有权限访问该接口...";break;case 500:t="对不起，正在进行服务器维护，请稍后再来...";break;case 502:t="对不起，你访问的接口程序出错...";break;case 503:t="对不起，你访问的接口后端异常...";break;default:t="对不起，服务器正在维护，请稍后再试..."}var e={isRedirect:!1,result:{},resultCode:"ERROR",resultMsg:t};i(e)}})}}},{}],4:[function(e,t,o){t.exports={hide:function(){$(".preloader-indicator-overlay, .preloader-indicator-modal, .preloader-label").remove()},show:function(e){var t="数据加载中...";if("object"==typeof e){t=e.msg||t;var o=$(e.renderTo),n=$('<div class="preloader-label"></div>'),i=$('<span class="preloader"></span>'),a=$('<span class="msg">'+t+"</span>");i.appendTo(n),a.appendTo(n),0===o.find(".preloader-label").length&&n.appendTo(o);var r=parseInt(a.width());n.css("width",r+25+1+"px")}else{t=e||t;var s=$('<div class="preloader-indicator-overlay"></div>'),c=$('<div class="preloader-indicator-modal"></div>'),i=$('<span class="preloader preloader-white"></span>'),a=$('<span class="msg">'+t+"</span>");i.appendTo(c),a.appendTo(c),s.appendTo($("body")),c.appendTo($("body"));var r=parseInt(c.width())/2,l=parseInt(c.height())/2;i.css("marginLeft",r-25+"px"),c.css({marginLeft:"-"+r+"px",marginTop:"-"+l+"px"})}}}},{}],5:[function(e,t,o){t.exports={init:function(e){var t=this,o=$("body"),n=function(){};this.winHeight=window.innerHeight,this.moveTimer=null,this._loadingTop=!1,this._loadingBottom=!1,this._enabledTop=!0,this._enabledBottom=!0,this._scrollToBottomHandler=e.scrollToBottom?e.scrollToBottom:n,this._scrollToTopHandler=e.scrollToTop?e.scrollToTop:n,this._scrollMore10pxHandler=e.scrollEvent?e.scrollEvent:n,o.on("touchstart touchmove",function(e){switch(e.type){case"touchstart":t._startHandler(e);break;case"touchmove":t._moveHandler(e)}})},_startHandler:function(e){this._startY=e.touches[0].pageY},_moveHandler:function(e){var t=this,o=t._startY,n=o-e.touches[0].pageY;Math.abs(n)<10||t._loadingTop&&0>n||t._loadingBottom&&n>0||t.moveTimer||(t.moveTimer=setTimeout(function(){var e=document.body.scrollHeight,o=window.pageYOffset||document.body.scrollTop||document.documentElement.scrollTop,i=10;t._enabledBottom&&n>10&&i+o+t.winHeight>=e?(t._loadingBottom=!0,t._scrollToBottomHandler(),$(window).scrollTop(o+50)):t._enabledTop&&-10>n&&0>=o?(t._loadingTop=!0,t._scrollToTopHandler()):(n>10||-10>n)&&t._scrollMore10pxHandler(n),t.moveTimer=null,clearTimeout(t.moveTimer)},200))},after:function(e){"top"==e?this._loadingTop=!1:this._loadingBottom=!1},stop:function(e){"top"==e?(this._loadingTop=!1,this._enabledTop=!1):(this._loadingBottom=!1,this._enabledBottom=!1)},reopen:function(e){"undefined"==typeof e?(this._enabledTop=!0,this._enabledBottom=!0):"top"==e?this._enabledTop=!0:this._enabledBottom=!0}}},{}],6:[function(e,t,o){t.exports={_getNodata:function(){if(!$(".g-nodata").length){var e='<div class="g-nodata">';e+='<i class="iconfont icon-warn"></i><div></div>',e+="</div>",$("body").append(e)}return $(".g-nodata")},show:function(e){var t=this._getNodata();$(".g-nodata div").text(e||"还没有任何数据记录"),t.show()},hide:function(){var e=this._getNodata();e.hide()}}},{}],7:[function(e,t,o){var n=$("body"),i=$('<div class="dialog-overlay"></div>'),a=$('<div class="dialog"></div>');t.exports={_initModal:function(){i=$('<div class="dialog-overlay"></div>'),a=$('<div class="dialog dialog-no-buttons"></div>'),n.append(i),n.append(a)},_hide:function(){a.addClass("dialog-out"),i.removeClass("dialog-overlay-visible"),setTimeout(function(){i.remove(),a.remove()},200)},_show:function(){i.addClass("dialog-overlay-visible"),a.addClass("dialog-in")},_position:function(){var e=parseInt(a.height())/2;a.css("marginTop","-"+e+"px")},show:function(e){var t=this,o=$('<div class="dialog-inner"></div>');t._initModal();var n=e.text||"",i=e.title||"";msgType=e.type||"success",callback=e.callback||null,"success"===msgType&&""===i&&(i="成功"),"error"===msgType&&""===i&&(i="失败");var r=$('<div class="iconfont icon-'+msgType+'"></div>'),s=$('<div class="dialog-title">'+i+"</div>"),c=$('<div class="dialog-text">'+n+"</div>");o.append(r),o.append(s),o.append(c),a.append(o),setTimeout(function(){t._hide(),callback&&callback()},2e3),t._position(),t._show()}}},{}],8:[function(e,t,o){var n=e("../../common/utils");t.exports={init:function(){if(n.isLogin()){var e=window.localStorage;if($(".profile-lnk")[0]&&e.getItem("avatar")){var t=e.getItem("avatar");$(".profile-lnk").prepend('<div class="avatar"><img src="'+t+'_s120" alt="" /></div>'),$(".profile-lnk .icon-account").remove()}var o=n.getCookie("nick_name");$(".menu-profile .profile-lnk").attr("href","./profile.html"),$(".menu-profile .login-info").text(o)}var i=new Headroom(document.querySelector("header"),{tolerance:5,offset:205,classes:{initial:"animated",pinned:"slideDown",unpinned:"slideUp"}});i.init();var a={};a=$.jPanelMenu({menu:".menu",panel:".page-content",beforeOpen:function(){$("#header").appendTo(".jPanelMenu-panel")},afterClose:function(){$("#header").appendTo("body")}}),a.on()}}},{"../../common/utils":2}],9:[function(e,t,o){var n={};n.socket=null,n.connect=function(e){if("WebSocket"in window)n.socket=new WebSocket(e);else{if(!("MozWebSocket"in window))return void console.log("Error: WebSocket is not supported by this browser.");n.socket=new MozWebSocket(e)}n.socket.onopen=function(){console.log("Info: WebSocket connection opened.")},n.socket.onclose=function(){console.log("Info: WebSocket closed.")},n.socket.onmessage=function(e){n.render(e.data)}},n.initialize=function(){"http:"==window.location.protocol?n.connect("ws://"+window.location.host+"/websocket/message"):n.connect("wss://"+window.location.host+"/websocket/message")},n.sendMessage=function(){var e=document.getElementById("chat").value;""!=e&&(n.socket.send(e),document.getElementById("chat").value="")},n.render=function(e){if(!$(".notice-bar")[0]){var t=$('<div class="notice-bar"></div>');$("body").append(t)}$(".notice-bar").html(e).addClass("notice-in"),setTimeout(function(){$(".notice-bar").removeClass("notice-in")},3e3)},t.exports=n},{}],10:[function(e,t,o){$(function(){var t=e("../../common/utils"),o=e("../../common/apimap"),n=e("../../components/tips"),i=e("../../components/ajax"),a=e("../../components/nodata"),r=e("../../components/loading/loading"),s=e("../../mods/nav/nav"),c=(e("../../components/mscroll"),e("../../mods/notice/notice")),l={init:function(){var e=this;s.init(),r.show(),e.getData(),e.initEvent()},initEvent:function(){c.initialize()},getData:function(){var e=this,t={};i.get(o.chatListApi,t,function(t){if(r.hide(),t.result&&t.result.chatList){var o=t.result.chatList;0===o.length?a.show("暂时还没什么消息~"):e.renderData(o)}else n.show({type:"error",title:"返回的数据格式有问题"})},function(e){r.hide(),a.show(e.resultMsg)})},renderData:function(e){$.each(e,function(t,o){var n=o.sendTime||"";e[t].sendTime=n.substr(5,11)});var o=t.template($("#listTmpl").html(),{list:e});$(".list").append(o)}};l.init()})},{"../../common/apimap":1,"../../common/utils":2,"../../components/ajax":3,"../../components/loading/loading":4,"../../components/mscroll":5,"../../components/nodata":6,"../../components/tips":7,"../../mods/nav/nav":8,"../../mods/notice/notice":9}]},{},[10]);