!function t(e,n,o){function i(r,s){if(!n[r]){if(!e[r]){var c="function"==typeof require&&require;if(!s&&c)return c(r,!0);if(a)return a(r,!0);var d=new Error("Cannot find module '"+r+"'");throw d.code="MODULE_NOT_FOUND",d}var u=n[r]={exports:{}};e[r][0].call(u.exports,function(t){var n=e[r][1][t];return i(n?n:t)},u,u.exports,t,e,n,o)}return n[r].exports}for(var a="function"==typeof require&&require,r=0;r<o.length;r++)i(o[r]);return i}({1:[function(t,e,n){var o=window.location.protocol+"//"+window.location.host+"/";"w.yuema.us"===window.location.hostname&&(o=window.location.protocol+"//www.yuema.us/");var i={loginApi:o+"open-api/login",registApi:o+"open-api/simple-regist",perfectApi:o+"action/user/update",provincesListApi:o+"open-api/query/provinces-list",citiesListApi:o+"open-api/query/cities-list",addressesListApi:o+"open-api/query/addresses-list",postDatingApi:o+"action/dating/post",requestDatingApi:o+"action/dating/request",acceptDatingApi:o+"action/dating/accept",listApi:o+"open-api/query/dating/dating-list",profileApi:o+"open-api/query/home-info"};e.exports=i},{}],2:[function(t,e,n){var o={getUrlParam:function(t){var e=new RegExp("[?|&]"+t+"=([^&]+)"),n=location.search.match(e);return n&&n[1]},stopEventTap:function(){var t=$('<div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 99999; "></div>');$("body").append(t),setTimeout(function(){t.remove()},500)},formatDate:function(t){"string"==typeof t&&(t=this.strToDate(t));var e=t.getFullYear(),n=t.getMonth()+1,o=t.getDate();return 10>n&&(n="0"+n),10>o&&(o="0"+o),e+"-"+n+"-"+o},strToDate:function(t){var e=t.replace(/-/g,"/");return new Date(e)},hideKeyboard:function(){var t=$('<a style="width: 0;height: 0;font-size: 0;display: block"></a>');$("body").append(t),t.focus(),setTimeout(function(){t.remove()},0)},getNetworkState:function(){var t=150,e=!1;if(window.performance){var n=window.performance.timing,o=n.responseEnd-n.domainLookupStart;e=o>t?!1:!0}return e},isIOS:function(){var t=ua.match(/(iPad).*OS\s([\d_]+)/),e=ua.match(/(iPod)(.*OS\s([\d_]+))?/),n=!t&&ua.match(/(iPhone\sOS)\s([\d_]+)/);return t||n||e?!0:!1},isAndroid:function(){return ua.indexOf("Android")>-1},isWeixin:function(){return ua.indexOf("MicroMessenger")>-1},getCookie:function(t){var e=new RegExp("(^| )"+t+"=([^;]*)(;|$)"),n=document.cookie.match(e);return null!=n?decodeURI(n[2]):""},isLogin:function(){var t=this,e=t.getCookie("logined");return""!==e?!0:!1},template:function(t,e){function n(t){if(!t)return"";var e={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&apos;"};return(""+t).replace(/[&<>"']/g,function(t){return e[t]})}var o,i={"'":"'","\\":"\\","\r":"r","\n":"n","	":"t","\u2028":"u2028","\u2029":"u2029"},a=/'|\\|\r|\n|\t|\u2028|\u2029/g,r=/<%-([\s\S]+?)%>|<%=([\s\S]+?)%>|<%([\s\S]+?)%>|$/g,s=0,c="__p+='";t.replace(r,function(e,o,r,d,u){return c+=t.slice(s,u).replace(a,function(t){return"\\"+i[t]}),o&&(c+="'+\n((__t=("+o+"))==null?'':"+n.name+"(__t))+\n'"),r&&(c+="'+\n((__t=("+r+"))==null?'':__t)+\n'"),d&&(c+="';\n"+d+"\n__p+='"),s=u+e.length,e}),c+="';\n",c="with(obj||{}){\n"+c+"}\n",c=n.toString()+"var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+c+"return __p;\n";try{o=new Function("obj",c)}catch(d){throw d.source=c,d}if(e)return o(e);var u=function(t){return o(t)};return u.source="function(obj){\n"+c+"}",u}};e.exports=o},{}],3:[function(t,e,n){var o=function(t){1==t.isRedirect&&setTimeout(function(){window.location.href=t.redirectURL},2e3)};e.exports={post:function(t,e,n,i){$.ajax({url:t,data:e,type:"post",dataType:"json",success:function(t){o(t),"SUCCESS"===t.resultCode?n(t):i(t)},error:function(t){var e=(t.status||500,"对不起，服务器正在维护，请稍后再试...");switch(t.status){case 404:e="对不起，你访问的接口不存在...";break;case 403:e="对不起，你没有权限访问该接口...";break;case 500:e="对不起，正在进行服务器维护，请稍后再来...";break;case 502:e="对不起，你访问的接口程序出错...";break;case 503:e="对不起，你访问的接口后端异常...";break;default:e="对不起，服务器正在维护，请稍后再试..."}var t={isRedirect:!1,result:{},resultCode:"SERVER ERROR",resultMsg:e};i(t)}})},get:function(t,e,n,i){$.ajax({url:t,data:e,type:"get",dataType:"json",success:function(t){o(t),"SUCCESS"===t.resultCode?n(t):i(t)},error:function(t){var e=(t.status||500,"对不起，服务器正在维护，请稍后再试...");switch(t.status){case 404:e="对不起，你访问的接口不存在...";break;case 403:e="对不起，你没有权限访问该接口...";break;case 500:e="对不起，正在进行服务器维护，请稍后再来...";break;case 502:e="对不起，你访问的接口程序出错...";break;case 503:e="对不起，你访问的接口后端异常...";break;default:e="对不起，服务器正在维护，请稍后再试..."}var t={isRedirect:!1,result:{},resultCode:"ERROR",resultMsg:e};i(t)}})}}},{}],4:[function(t,e,n){e.exports={format:function(t,e){var n={"M+":t.getMonth()+1,"d+":t.getDate(),"h+":t.getHours(),"m+":t.getMinutes(),"s+":t.getSeconds(),"q+":Math.floor((t.getMonth()+3)/3),S:t.getMilliseconds()};/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length)));for(var o in n)new RegExp("("+o+")").test(e)&&(e=e.replace(RegExp.$1,1==RegExp.$1.length?n[o]:("00"+n[o]).substr((""+n[o]).length)));return e},ago:function(t){var e=(new Date).getTime(),n=new Date(t).getTime(),o=e-n,i="",a=6e4,r=60*a,s=24*r,c=30*s,d=12*c,u=o/d,l=o/c,p=o/(7*s),v=o/s,m=o/r,f=o/a;return i=u>=1?parseInt(u)+"年前":l>=1?parseInt(l)+"个月前":p>=1?parseInt(p)+"周前":v>=1?parseInt(v)+"天前":m>=1?parseInt(m)+"个小时前":f>=1?parseInt(f)+"分钟前":"刚刚"}}},{}],5:[function(t,e,n){var o=$("body"),i=$('<div class="dialog-overlay"></div>'),a=$('<div class="dialog"></div>');e.exports={_stopEventTap:function(){var t=$('<div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 99999; "></div>');$("body").append(t),setTimeout(function(){t.remove()},350)},_initModal:function(){i=$('<div class="dialog-overlay"></div>'),a=$('<div class="dialog"></div>'),o.append(i),o.append(a)},_initEvent:function(){var t=this;$(".dialog-overlay").one("touchend",function(e){e.preventDefault(),t._stopEventTap(),t.hide()})},hide:function(){a.addClass("dialog-out"),i.removeClass("dialog-overlay-visible"),setTimeout(function(){i.remove(),a.remove()},200)},show:function(){i.addClass("dialog-overlay-visible"),a.addClass("dialog-in")},_position:function(){var t=parseInt(a.height())/2;a.css("marginTop","-"+t+"px")},alert:function(t,e){var n=this,o=$('<div class="dialog-inner"></div>');n._initModal();var i=t,r="温馨提示";"object"==typeof t&&t.title&&(i=t.body||"",r=t.title);var s=$('<div class="dialog-title">'+r+"</div>"),c=$('<div class="dialog-text">'+i+"</div>");o.append(s),o.append(c),a.append(o);var d=$('<div class="dialog-buttons"></div>'),u=$('<span class="dialog-button">确定</span>');d.append(u),a.append(d),u.on("click",function(){n.hide(),e&&e()}),n._position(),n.show()},confirm:function(t,e,n){var o=this,i=$('<div class="dialog-inner"></div>');o._initModal(),o._initEvent();var r={title:"温馨提示",body:"object"==typeof t?"":t,okText:"确定",cancelText:"取消"};"object"==typeof t&&(r=$.extend(r,t));var s=$('<div class="dialog-title">'+r.title+"</div>"),c=$('<div class="dialog-text">'+r.body+"</div>");i.append(s),i.append(c),a.append(i);var d=$('<div class="dialog-buttons"></div>'),u=$('<span class="dialog-button">'+r.cancelText+"</span>");$close=$('<span class="dialog-button">'+r.okText+"</span>"),d.append(u),d.append($close),a.append(d),u.on("click",function(){n&&n(),o.hide()}),$close.on("click",function(){e&&e(),o.hide()}),o._position(),o.show()}}},{}],6:[function(t,e,n){function o(t,e){return this instanceof o?this.init(t,e):new o(t,e)}function i(t,e){return t.changedTouches?t.changedTouches[0][e]:t[e]}function a(t){return d(t,function(t){return void 0!==p.style[t]})}function r(t,e,n){var o=m[e];o?t[o]=n:void 0!==t[e]?(m[e]=e,t[e]=n):d(v,function(o){var i=c(o)+c(e);return void 0!==t[i]?(m[e]=i,t[i]=n,!0):void 0})}function s(t){if(void 0!==p.style[t])return t;var e;return d(v,function(n){var o=c(n)+c(t);return void 0!==p.style[o]?(e="-"+n+"-"+t,!0):void 0}),e}function c(t){return t.charAt(0).toUpperCase()+t.substr(1)}function d(t,e){for(var n=0,o=t.length;o>n;n++)if(e(t[n],n))return!0;return!1}function u(t,e,n,o){var i=Math.abs(t-n),a=Math.abs(e-o),r=Math.sqrt(Math.pow(i,2)+Math.pow(a,2));return{x:i,y:a,z:r}}function l(t){var e=t.y/t.z,n=Math.acos(e);return 180/(Math.PI/n)}var p=document.createElement("div"),v=["webkit","moz","o","ms"],m={},f=o.support={},g=!1,h=5,y=55;f.transform3d=a(["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"]),f.transform=a(["transformProperty","WebkitTransform","MozTransform","OTransform","msTransform"]),f.transition=a(["transitionProperty","WebkitTransitionProperty","MozTransitionProperty","OTransitionProperty","msTransitionProperty"]),f.addEventListener="addEventListener"in window,f.mspointer=window.navigator.msPointerEnabled,f.cssAnimation=(f.transform3d||f.transform)&&f.transition;var b=["touch","mouse"],w={start:{touch:"touchstart",mouse:"mousedown"},move:{touch:"touchmove",mouse:"mousemove"},end:{touch:"touchend",mouse:"mouseup"}};f.addEventListener&&(document.addEventListener("gesturestart",function(){g=!0}),document.addEventListener("gestureend",function(){g=!1})),o.prototype.init=function(t,e){var n=this;if(n.element=t,"string"==typeof t&&(n.element=document.querySelector(t)),!n.element)throw new Error("element not found");return f.mspointer&&(n.element.style.msTouchAction="pan-y"),e=e||{},n.distance=e.distance,n.maxPoint=e.maxPoint,n.disableTouch=void 0===e.disableTouch?!1:e.disableTouch,n.disable3d=void 0===e.disable3d?!1:e.disable3d,n.transitionDuration=void 0===e.transitionDuration?"350ms":e.transitionDuration+"ms",n.currentPoint=0,n.currentX=0,n.animation=!1,n.use3d=f.transform3d,n.disable3d===!0&&(n.use3d=!1),f.cssAnimation?n._setStyle({transitionProperty:s("transform"),transitionTimingFunction:"cubic-bezier(0,0,0.25,1)",transitionDuration:"0ms",transform:n._getTranslate(0)}):n._setStyle({position:"relative",left:"0px"}),n.refresh(),b.forEach(function(t){n.element.addEventListener(w.start[t],n,!1)}),n},o.prototype.handleEvent=function(t){var e=this;switch(t.type){case w.start.touch:e._touchStart(t,"touch");break;case w.start.mouse:e._touchStart(t,"mouse");break;case w.move.touch:e._touchMove(t,"touch");break;case w.move.mouse:e._touchMove(t,"mouse");break;case w.end.touch:e._touchEnd(t,"touch");break;case w.end.mouse:e._touchEnd(t,"mouse");break;case"click":e._click(t)}},o.prototype.refresh=function(){var t=this;t._maxPoint=void 0===t.maxPoint?function(){for(var e,n=t.element.childNodes,o=-1,i=0,a=n.length;a>i;i++)e=n[i],1===e.nodeType&&o++;return o}():t.maxPoint,void 0===t.distance?t._maxPoint<0?t._distance=0:t._distance=t.element.scrollWidth/(t._maxPoint+1):t._distance=t.distance,t._maxX=-t._distance*t._maxPoint,t.moveToPoint()},o.prototype.hasNext=function(){var t=this;return t.currentPoint<t._maxPoint},o.prototype.hasPrev=function(){var t=this;return t.currentPoint>0},o.prototype.toNext=function(t){var e=this;e.hasNext()&&e.moveToPoint(e.currentPoint+1,t)},o.prototype.toPrev=function(t){var e=this;e.hasPrev()&&e.moveToPoint(e.currentPoint-1,t)},o.prototype.moveToPoint=function(t,e){var n=this;e=void 0===e?n.transitionDuration:e+"ms";var o=n.currentPoint;void 0===t&&(t=n.currentPoint),0>t?n.currentPoint=0:t>n._maxPoint?n.currentPoint=n._maxPoint:n.currentPoint=parseInt(t,10),f.cssAnimation?n._setStyle({transitionDuration:e}):n.animation=!0,n._setX(-n.currentPoint*n._distance,e),o!==n.currentPoint&&(n._triggerEvent("fsmoveend",!0,!1),n._triggerEvent("fspointmove",!0,!1))},o.prototype._setX=function(t,e){var n=this;n.currentX=t,f.cssAnimation?n.element.style[m.transform]=n._getTranslate(t):n.animation?n._animate(t,e||n.transitionDuration):n.element.style.left=t+"px"},o.prototype._touchStart=function(t,e){var n=this;if(!(n.disableTouch||n.scrolling||g)){n.element.addEventListener(w.move[e],n,!1),document.addEventListener(w.end[e],n,!1);var o=t.target.tagName;"mouse"===e&&"SELECT"!==o&&"INPUT"!==o&&"TEXTAREA"!==o&&"BUTTON"!==o&&t.preventDefault(),f.cssAnimation?n._setStyle({transitionDuration:"0ms"}):n.animation=!1,n.scrolling=!0,n.moveReady=!1,n.startPageX=i(t,"pageX"),n.startPageY=i(t,"pageY"),n.basePageX=n.startPageX,n.directionX=0,n.startTime=t.timeStamp,n._triggerEvent("fstouchstart",!0,!1)}},o.prototype._touchMove=function(t,e){var n=this;if(n.scrolling&&!g){var o,a,r=i(t,"pageX"),s=i(t,"pageY");if(n.moveReady){t.preventDefault(),o=r-n.basePageX,a=n.currentX+o,(a>=0||a<n._maxX)&&(a=Math.round(n.currentX+o/3)),n.directionX=0===o?n.directionX:o>0?-1:1;var c=!n._triggerEvent("fstouchmove",!0,!0,{delta:o,direction:n.directionX});c?n._touchAfter({moved:!1,originalPoint:n.currentPoint,newPoint:n.currentPoint,cancelled:!0}):n._setX(a)}else{var d=u(n.startPageX,n.startPageY,r,s);d.z>h&&(l(d)>y?(t.preventDefault(),n.moveReady=!0,n.element.addEventListener("click",n,!0)):n.scrolling=!1)}n.basePageX=r}},o.prototype._touchEnd=function(t,e){var n=this;if(n.element.removeEventListener(w.move[e],n,!1),document.removeEventListener(w.end[e],n,!1),n.scrolling){var o=-n.currentX/n._distance;o=n.directionX>0?Math.ceil(o):n.directionX<0?Math.floor(o):Math.round(o),0>o?o=0:o>n._maxPoint&&(o=n._maxPoint),n._touchAfter({moved:o!==n.currentPoint,originalPoint:n.currentPoint,newPoint:o,cancelled:!1}),n.moveToPoint(o)}},o.prototype._click=function(t){t.stopPropagation(),t.preventDefault()},o.prototype._touchAfter=function(t){var e=this;e.scrolling=!1,e.moveReady=!1,setTimeout(function(){e.element.removeEventListener("click",e,!0)},200),e._triggerEvent("fstouchend",!0,!1,t)},o.prototype._setStyle=function(t){var e=this,n=e.element.style;for(var o in t)r(n,o,t[o])},o.prototype._animate=function(t,e){var n=this,o=n.element,i=+new Date,a=parseInt(o.style.left,10),r=t,s=parseInt(e,10),c=function(t,e){return-(t/=e)*(t-2)},d=setInterval(function(){var t,e,n=new Date-i;n>s?(clearInterval(d),e=r):(t=c(n,s),e=t*(r-a)+a),o.style.left=e+"px"},10)},o.prototype.destroy=function(){var t=this;b.forEach(function(e){t.element.removeEventListener(w.start[e],t,!1)})},o.prototype._getTranslate=function(t){var e=this;return e.use3d?"translate3d("+t+"px, 0, 0)":"translate("+t+"px, 0)"},o.prototype._triggerEvent=function(t,e,n,o){var i=this,a=document.createEvent("Event");if(a.initEvent(t,e,n),o)for(var r in o)o.hasOwnProperty(r)&&(a[r]=o[r]);return i.element.dispatchEvent(a)},e.exports=o},{}],7:[function(t,e,n){e.exports={hide:function(){$(".preloader-indicator-overlay, .preloader-indicator-modal, .preloader-label").remove()},show:function(t){var e="数据加载中...";if("object"==typeof t){e=t.msg||e;var n=$(t.renderTo),o=$('<div class="preloader-label"></div>'),i=$('<span class="preloader"></span>'),a=$('<span class="msg">'+e+"</span>");i.appendTo(o),a.appendTo(o),0===n.find(".preloader-label").length&&o.appendTo(n);var r=parseInt(a.width());o.css("width",r+25+1+"px")}else{e=t||e;var s=$('<div class="preloader-indicator-overlay"></div>'),c=$('<div class="preloader-indicator-modal"></div>'),i=$('<span class="preloader preloader-white"></span>'),a=$('<span class="msg">'+e+"</span>");i.appendTo(c),a.appendTo(c),s.appendTo($("body")),c.appendTo($("body"));var r=parseInt(c.width())/2,d=parseInt(c.height())/2;i.css("marginLeft",r-25+"px"),c.css({marginLeft:"-"+r+"px",marginTop:"-"+d+"px"})}}}},{}],8:[function(t,e,n){e.exports={_getNodata:function(){if(!$(".g-nodata").length){var t='<div class="g-nodata">';t+='<i class="iconfont icon-warn"></i><div></div>',t+="</div>",$("body").append(t)}return $(".g-nodata")},show:function(t){var e=this._getNodata();$(".g-nodata div").text(t||"还没有任何数据记录"),e.show()},hide:function(){var t=this._getNodata();t.hide()}}},{}],9:[function(t,e,n){var o=$("body"),i=$('<div class="dialog-overlay"></div>'),a=$('<div class="dialog"></div>');e.exports={_initModal:function(){i=$('<div class="dialog-overlay"></div>'),a=$('<div class="dialog dialog-no-buttons"></div>'),o.append(i),o.append(a)},_hide:function(){a.addClass("dialog-out"),i.removeClass("dialog-overlay-visible"),setTimeout(function(){i.remove(),a.remove()},200)},_show:function(){i.addClass("dialog-overlay-visible"),a.addClass("dialog-in")},_position:function(){var t=parseInt(a.height())/2;a.css("marginTop","-"+t+"px")},show:function(t){var e=this,n=$('<div class="dialog-inner"></div>');e._initModal();var o=t.text||"",i=t.title||"";msgType=t.type||"success",callback=t.callback||null,"success"===msgType&&""===i&&(i="成功"),"error"===msgType&&""===i&&(i="失败");var r=$('<div class="iconfont icon-'+msgType+'"></div>'),s=$('<div class="dialog-title">'+i+"</div>"),c=$('<div class="dialog-text">'+o+"</div>");n.append(r),n.append(s),n.append(c),a.append(n),setTimeout(function(){e._hide(),callback&&callback()},2e3),e._position(),e._show()}}},{}],10:[function(t,e,n){var o=t("../../common/utils");e.exports={init:function(){var t=new Headroom(document.querySelector("header"),{tolerance:5,offset:205,classes:{initial:"animated",pinned:"slideDown",unpinned:"slideUp"}});t.init();var e={};if(e=$.jPanelMenu({menu:".menu",panel:".page-content",beforeOpen:function(){$("#header").appendTo(".jPanelMenu-panel")},beforeClose:function(){$("#header").appendTo("body")}}),e.on(),o.isLogin()){var n=o.getCookie("nick_name");$(".menu-profile").attr("href","./profile.html"),$(".menu-profile .login-info").text(n)}}}},{"../../common/utils":2}],11:[function(t,e,n){var o={};o.socket=null,o.connect=function(t){if("WebSocket"in window)o.socket=new WebSocket(t);else{if(!("MozWebSocket"in window))return void console.log("Error: WebSocket is not supported by this browser.");o.socket=new MozWebSocket(t)}o.socket.onopen=function(){console.log("Info: WebSocket connection opened.")},o.socket.onclose=function(){console.log("Info: WebSocket closed.")},o.socket.onmessage=function(t){o.render(t.data)}},o.initialize=function(){"http:"==window.location.protocol?o.connect("ws://"+window.location.host+"/websocket/message"):o.connect("wss://"+window.location.host+"/websocket/message")},o.sendMessage=function(){var t=document.getElementById("chat").value;""!=t&&(o.socket.send(t),document.getElementById("chat").value="")},o.render=function(t){if(!$(".notice-bar")[0]){var e=$('<div class="notice-bar"></div>');$("body").append(e)}$(".notice-bar").html(t).addClass("notice-in"),setTimeout(function(){$(".notice-bar").removeClass("notice-in")},3e3)},e.exports=o},{}],12:[function(t,e,n){var o=t("../../common/utils"),i=t("../../common/apimap"),a=t("../../components/tips"),r=t("../../components/ajax"),s=t("../../components/loading/loading"),c=t("../../components/dialog/dialog");e.exports={init:function(){var t=this;$(document).on("tap",".g-yue",function(){if(!o.isLogin())return window.location.href="./login.html",!1;o.stopEventTap();var e=$(this).data("id"),n=$(this).data("uid"),i=['<div class="input-row">','<textarea class="ask-txa" id="askWords" placeholder="说点什么"></textarea>',"</div>"].join("");c.confirm({title:"回应这个邀约",body:i},function(){var o=$.trim($("#askWords").val());return""===o?(a.show({type:"error",title:"说点什么吧"}),!1):void t.sendAsk(e,n,o)})})},sendAsk:function(t,e,n){s.show(),r.post(i.requestDatingApi,{datingId:t,userId:e,message:n},function(t){s.hide(),a.show({type:"success",title:"发送成功，请耐心等待回音"})},function(t){s.hide(),a.show({type:"error",title:t.resultMsg})})}}},{"../../common/apimap":1,"../../common/utils":2,"../../components/ajax":3,"../../components/dialog/dialog":5,"../../components/loading/loading":7,"../../components/tips":9}],13:[function(t,e,n){$(function(){var e=t("../../common/utils"),n=t("../../common/apimap"),o=t("../../components/tips"),i=t("../../components/ajax"),a=t("../../components/nodata"),r=t("../../components/loading/loading"),s=t("../../components/flipsnap"),c=t("../../components/date"),d=t("../../components/dialog/dialog"),u=t("../../mods/Nav/Nav"),l=t("../../mods/yue/yue"),p=t("../../mods/notice/notice"),v=$(window).width(),m=e.getUrlParam("id")||"",f={init:function(){var t=this;r.show(),t.getData(function(){var e=v*$(".scroller .item").length;$(".basic-info").height(v),$(".scroller .item").width(v),$(".scroller").width(e),u.init(),t.initEvent()})},initEvent:function(){var t=this;l.init(),p.initialize();s(".scroller",{distance:v});$(document).on("tap",".tab-item",function(){var t=$(this),e=t.data("tab");return t.hasClass("current")?!1:($(".tab-bar .current").removeClass("current"),t.addClass("current"),$(".dating-list").hide(),void $("#tab"+e).show())}),$(document).on("tap",".btn-accept",function(){e.stopEventTap();var n=$(this).data("id"),o=$(this).data("uid");d.confirm({title:"答应Ta",body:"答应这个请求将不可取消，同时也将拒绝其他请求，确认答应吗？"},function(){t.acceptAsk(n,o)})})},acceptAsk:function(t,e){r.show(),i.post(n.acceptDatingApi,{datingId:t,userId:e},function(t){r.hide(),o.show({type:"success",title:"您已答应，准备赴约吧"})},function(t){r.hide(),o.show({type:"error",title:t.resultMsg})})},getData:function(t){var e=this;i.get(n.profileApi,{id:m},function(n){if(r.hide(),n.result&&n.result.userInfo){if(!n.result.userInfo.id)return a.show("该用户不存在"),!1;e.renderData(n.result),t&t()}else a.show("返回的数据格式有问题")},function(t){r.hide(),a.show(t.resultMsg)})},renderData:function(t){var n={2:"icon-coffee",3:"icon-food",4:"icon-film",5:"icon-run",6:"icon-photo",7:"icon-badminton",8:"icon-riding",9:"icon-drive",1:"icon-lquote"},o={2:"喝咖啡/茶",3:"美食",4:"看电影",5:"跑步",6:"摄影",7:"羽毛球",8:"骑行",9:"自驾",1:"其他"},i={110100:"北京",310100:"上海",440100:"广州",440300:"深圳",330100:"杭州",510100:"成都"},a={1:"互联网/IT",2:"金融财务",3:"艺术/设计",4:"模特/演艺",5:"创业/投资",6:"摄影制作",7:"影视娱乐",8:"音乐/舞蹈",9:"广告传媒",10:"教育/体育"},r=t.userInfo,s=t.postDatingInfoList,d=r.sex,u=r.birthday,l=r.cityId,p=r.socialId;r.age=(new Date).getFullYear()-parseInt(u.substr(0,4)),r.sex="M"===d?"男":"女",r.sexCls="M"===d?"icon-male":"icon-female",r.city=i[l];var v="混"+a[p]+"圈";r.career&&""!==r.career&&(v+="的"+r.career),r.profession=v,$.each(s,function(t,e){var i=e.datingInfo.datingTime||"",a=e.datingInfo.typeId;""!==i?s[t].time=i.substr(0,10):s[t].time="随时",s[t].iconCls=n[a],s[t].typeName=o[a],s[t].id=e.datingInfo.uUID,s[t].article=e.datingInfo.article;var r=e.requestUserInfos;r.length>0&&$.each(r,function(e,n){if(n.requestDatingTime){var o=n.requestDatingTime;o=o.substr(0,19).replace(/\-/g,"/"),s[t].requestUserInfos[e].requestDatingTime=c.ago(o)}})});var m=e.template($("#tmpl").html(),{myHome:t.myHome,info:r,list:s});$(".page-content").html(m),document.title=r.nickName,$("#header h1").text(r.nickName)}};f.init()})},{"../../common/apimap":1,"../../common/utils":2,"../../components/ajax":3,"../../components/date":4,"../../components/dialog/dialog":5,"../../components/flipsnap":6,"../../components/loading/loading":7,"../../components/nodata":8,"../../components/tips":9,"../../mods/Nav/Nav":10,"../../mods/notice/notice":11,"../../mods/yue/yue":12}]},{},[13]);