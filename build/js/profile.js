!function t(e,n,o){function i(r,s){if(!n[r]){if(!e[r]){var c="function"==typeof require&&require;if(!s&&c)return c(r,!0);if(a)return a(r,!0);var d=new Error("Cannot find module '"+r+"'");throw d.code="MODULE_NOT_FOUND",d}var l=n[r]={exports:{}};e[r][0].call(l.exports,function(t){var n=e[r][1][t];return i(n?n:t)},l,l.exports,t,e,n,o)}return n[r].exports}for(var a="function"==typeof require&&require,r=0;r<o.length;r++)i(o[r]);return i}({1:[function(t,e,n){var o=window.location.protocol+"//"+window.location.host+"/";"w.yuema.us"===window.location.hostname&&(o=window.location.protocol+"//www.yuema.us/");var i={loginApi:o+"open-api/login",registApi:o+"open-api/simple-regist",perfectApi:o+"action/user/update",provincesListApi:o+"open-api/query/provinces-list",citiesListApi:o+"open-api/query/cities-list",addressesListApi:o+"open-api/query/addresses-list",postDatingApi:o+"action/dating/post",requestDatingApi:o+"action/dating/request",acceptDatingApi:o+"action/dating/accept",listApi:o+"open-api/query/dating/dating-list",profileApi:o+"open-api/query/home-info",myRequestApi:o+"action/query/dating/my-request-dating-list",datingDetailApi:o+"open-api/query/dating/dating-info",chatRecordsApi:o+"action/query/message/message-list",chatListApi:o+"action/query/chatting/my-chatting-list"};e.exports=i},{}],2:[function(t,e,n){var o={getUrlParam:function(t){var e=new RegExp("[?|&]"+t+"=([^&]+)"),n=location.search.match(e);return n&&n[1]},stopEventTap:function(){var t=$('<div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 99999; "></div>');$("body").append(t),setTimeout(function(){t.remove()},500)},formatDate:function(t){"string"==typeof t&&(t=this.strToDate(t));var e=t.getFullYear(),n=t.getMonth()+1,o=t.getDate();return 10>n&&(n="0"+n),10>o&&(o="0"+o),e+"-"+n+"-"+o},strToDate:function(t){var e=t.replace(/-/g,"/");return new Date(e)},hideKeyboard:function(){var t=$('<a style="width: 0;height: 0;font-size: 0;display: block"></a>');$("body").append(t),t.focus(),setTimeout(function(){t.remove()},0)},getNetworkState:function(){var t=150,e=!1;if(window.performance){var n=window.performance.timing,o=n.responseEnd-n.domainLookupStart;e=o>t?!1:!0}return e},isIOS:function(){var t=window.navigator.userAgent,e=t.match(/(iPad).*OS\s([\d_]+)/),n=t.match(/(iPod)(.*OS\s([\d_]+))?/),o=!e&&t.match(/(iPhone\sOS)\s([\d_]+)/);return e||o||n?!0:!1},isAndroid:function(){var t=window.navigator.userAgent;return t.indexOf("Android")>-1},isWeixin:function(){var t=window.navigator.userAgent;return t.indexOf("MicroMessenger")>-1},getCookie:function(t){var e=new RegExp("(^| )"+t+"=([^;]*)(;|$)"),n=document.cookie.match(e);return null!=n?decodeURI(n[2]):""},isLogin:function(){var t=this,e=t.getCookie("logined");return""!==e?!0:!1},template:function(t,e){function n(t){if(!t)return"";var e={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&apos;"};return(""+t).replace(/[&<>"']/g,function(t){return e[t]})}var o,i={"'":"'","\\":"\\","\r":"r","\n":"n","	":"t","\u2028":"u2028","\u2029":"u2029"},a=/'|\\|\r|\n|\t|\u2028|\u2029/g,r=/<%-([\s\S]+?)%>|<%=([\s\S]+?)%>|<%([\s\S]+?)%>|$/g,s=0,c="__p+='";t.replace(r,function(e,o,r,d,l){return c+=t.slice(s,l).replace(a,function(t){return"\\"+i[t]}),o&&(c+="'+\n((__t=("+o+"))==null?'':"+n.name+"(__t))+\n'"),r&&(c+="'+\n((__t=("+r+"))==null?'':__t)+\n'"),d&&(c+="';\n"+d+"\n__p+='"),s=l+e.length,e}),c+="';\n",c="with(obj||{}){\n"+c+"}\n",c=n.toString()+"var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+c+"return __p;\n";try{o=new Function("obj",c)}catch(d){throw d.source=c,d}if(e)return o(e);var l=function(t){return o(t)};return l.source="function(obj){\n"+c+"}",l}};e.exports=o},{}],3:[function(t,e,n){var o=function(t){1==t.isRedirect&&setTimeout(function(){window.location.href=t.redirectURL},2e3)};e.exports={post:function(t,e,n,i){$.ajax({url:t,data:e,type:"post",dataType:"json",success:function(t){o(t),"SUCCESS"===t.resultCode?n(t):i(t)},error:function(t){var e=(t.status||500,"对不起，服务器正在维护，请稍后再试...");switch(t.status){case 404:e="对不起，你访问的接口不存在...";break;case 403:e="对不起，你没有权限访问该接口...";break;case 500:e="对不起，正在进行服务器维护，请稍后再来...";break;case 502:e="对不起，你访问的接口程序出错...";break;case 503:e="对不起，你访问的接口后端异常...";break;default:e="对不起，服务器正在维护，请稍后再试..."}var t={isRedirect:!1,result:{},resultCode:"SERVER ERROR",resultMsg:e};i(t)}})},get:function(t,e,n,i){$.ajax({url:t,data:e,type:"get",dataType:"json",success:function(t){o(t),"SUCCESS"===t.resultCode?n(t):i(t)},error:function(t){var e=(t.status||500,"对不起，服务器正在维护，请稍后再试...");switch(t.status){case 404:e="对不起，你访问的接口不存在...";break;case 403:e="对不起，你没有权限访问该接口...";break;case 500:e="对不起，正在进行服务器维护，请稍后再来...";break;case 502:e="对不起，你访问的接口程序出错...";break;case 503:e="对不起，你访问的接口后端异常...";break;default:e="对不起，服务器正在维护，请稍后再试..."}var t={isRedirect:!1,result:{},resultCode:"ERROR",resultMsg:e};i(t)}})}}},{}],4:[function(t,e,n){e.exports={format:function(t,e){var n={"M+":t.getMonth()+1,"d+":t.getDate(),"h+":t.getHours(),"m+":t.getMinutes(),"s+":t.getSeconds(),"q+":Math.floor((t.getMonth()+3)/3),S:t.getMilliseconds()};/(y+)/i.test(e)&&(e=e.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length)));for(var o in n)new RegExp("("+o+")").test(e)&&(e=e.replace(RegExp.$1,1==RegExp.$1.length?n[o]:("00"+n[o]).substr((""+n[o]).length)));return e},ago:function(t){var e=(new Date).getTime(),n=new Date(t).getTime(),o=e-n,i="",a=6e4,r=60*a,s=24*r,c=30*s,d=12*c,l=o/d,u=o/c,p=o/(7*s),m=o/s,v=o/r,f=o/a;return i=l>=1?parseInt(l)+"年前":u>=1?parseInt(u)+"个月前":p>=1?parseInt(p)+"周前":m>=1?parseInt(m)+"天前":v>=1?parseInt(v)+"小时前":f>=1?parseInt(f)+"分钟前":"刚刚"}}},{}],5:[function(t,e,n){var o=$("body"),i=$('<div class="dialog-overlay"></div>'),a=$('<div class="dialog"></div>');e.exports={_stopEventTap:function(){var t=$('<div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 99999; "></div>');$("body").append(t),setTimeout(function(){t.remove()},350)},_initModal:function(){i=$('<div class="dialog-overlay"></div>'),a=$('<div class="dialog"></div>'),o.append(i),o.append(a)},_initEvent:function(){var t=this;$(".dialog-overlay").one("touchend",function(e){e.preventDefault(),t._stopEventTap(),t.hide()})},hide:function(){a.addClass("dialog-out"),i.removeClass("dialog-overlay-visible"),setTimeout(function(){i.remove(),a.remove()},200)},show:function(){i.addClass("dialog-overlay-visible"),a.addClass("dialog-in")},_position:function(){var t=parseInt(a.height())/2;a.css("marginTop","-"+t+"px")},alert:function(t,e){var n=this,o=$('<div class="dialog-inner"></div>');n._initModal();var i=t,r="温馨提示";"object"==typeof t&&t.title&&(i=t.body||"",r=t.title);var s=$('<div class="dialog-title">'+r+"</div>"),c=$('<div class="dialog-text">'+i+"</div>");o.append(s),o.append(c),a.append(o);var d=$('<div class="dialog-buttons"></div>'),l=$('<span class="dialog-button">确定</span>');d.append(l),a.append(d),l.on("click",function(){n.hide(),e&&e()}),n._position(),n.show()},confirm:function(t,e,n){var o=this,i=$('<div class="dialog-inner"></div>');o._initModal(),o._initEvent();var r={title:"温馨提示",body:"object"==typeof t?"":t,okText:"确定",cancelText:"取消"};"object"==typeof t&&(r=$.extend(r,t));var s=$('<div class="dialog-title">'+r.title+"</div>"),c=$('<div class="dialog-text">'+r.body+"</div>");i.append(s),i.append(c),a.append(i);var d=$('<div class="dialog-buttons"></div>'),l=$('<span class="dialog-button">'+r.cancelText+"</span>");$close=$('<span class="dialog-button">'+r.okText+"</span>"),d.append(l),d.append($close),a.append(d),l.on("click",function(){n&&n(),o.hide()}),$close.on("click",function(){e&&e(),o.hide()}),o._position(),o.show()}}},{}],6:[function(t,e,n){function o(t,e){return this instanceof o?this.init(t,e):new o(t,e)}function i(t,e){return t.changedTouches?t.changedTouches[0][e]:t[e]}function a(t){return d(t,function(t){return void 0!==p.style[t]})}function r(t,e,n){var o=v[e];o?t[o]=n:void 0!==t[e]?(v[e]=e,t[e]=n):d(m,function(o){var i=c(o)+c(e);return void 0!==t[i]?(v[e]=i,t[i]=n,!0):void 0})}function s(t){if(void 0!==p.style[t])return t;var e;return d(m,function(n){var o=c(n)+c(t);return void 0!==p.style[o]?(e="-"+n+"-"+t,!0):void 0}),e}function c(t){return t.charAt(0).toUpperCase()+t.substr(1)}function d(t,e){for(var n=0,o=t.length;o>n;n++)if(e(t[n],n))return!0;return!1}function l(t,e,n,o){var i=Math.abs(t-n),a=Math.abs(e-o),r=Math.sqrt(Math.pow(i,2)+Math.pow(a,2));return{x:i,y:a,z:r}}function u(t){var e=t.y/t.z,n=Math.acos(e);return 180/(Math.PI/n)}var p=document.createElement("div"),m=["webkit","moz","o","ms"],v={},f=o.support={},g=!1,h=5,y=55;f.transform3d=a(["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"]),f.transform=a(["transformProperty","WebkitTransform","MozTransform","OTransform","msTransform"]),f.transition=a(["transitionProperty","WebkitTransitionProperty","MozTransitionProperty","OTransitionProperty","msTransitionProperty"]),f.addEventListener="addEventListener"in window,f.mspointer=window.navigator.msPointerEnabled,f.cssAnimation=(f.transform3d||f.transform)&&f.transition;var b=["touch","mouse"],_={start:{touch:"touchstart",mouse:"mousedown"},move:{touch:"touchmove",mouse:"mousemove"},end:{touch:"touchend",mouse:"mouseup"}};f.addEventListener&&(document.addEventListener("gesturestart",function(){g=!0}),document.addEventListener("gestureend",function(){g=!1})),o.prototype.init=function(t,e){var n=this;if(n.element=t,"string"==typeof t&&(n.element=document.querySelector(t)),!n.element)throw new Error("element not found");return f.mspointer&&(n.element.style.msTouchAction="pan-y"),e=e||{},n.distance=e.distance,n.maxPoint=e.maxPoint,n.disableTouch=void 0===e.disableTouch?!1:e.disableTouch,n.disable3d=void 0===e.disable3d?!1:e.disable3d,n.transitionDuration=void 0===e.transitionDuration?"350ms":e.transitionDuration+"ms",n.currentPoint=0,n.currentX=0,n.animation=!1,n.use3d=f.transform3d,n.disable3d===!0&&(n.use3d=!1),f.cssAnimation?n._setStyle({transitionProperty:s("transform"),transitionTimingFunction:"cubic-bezier(0,0,0.25,1)",transitionDuration:"0ms",transform:n._getTranslate(0)}):n._setStyle({position:"relative",left:"0px"}),n.refresh(),b.forEach(function(t){n.element.addEventListener(_.start[t],n,!1)}),n},o.prototype.handleEvent=function(t){var e=this;switch(t.type){case _.start.touch:e._touchStart(t,"touch");break;case _.start.mouse:e._touchStart(t,"mouse");break;case _.move.touch:e._touchMove(t,"touch");break;case _.move.mouse:e._touchMove(t,"mouse");break;case _.end.touch:e._touchEnd(t,"touch");break;case _.end.mouse:e._touchEnd(t,"mouse");break;case"click":e._click(t)}},o.prototype.refresh=function(){var t=this;t._maxPoint=void 0===t.maxPoint?function(){for(var e,n=t.element.childNodes,o=-1,i=0,a=n.length;a>i;i++)e=n[i],1===e.nodeType&&o++;return o}():t.maxPoint,void 0===t.distance?t._maxPoint<0?t._distance=0:t._distance=t.element.scrollWidth/(t._maxPoint+1):t._distance=t.distance,t._maxX=-t._distance*t._maxPoint,t.moveToPoint()},o.prototype.hasNext=function(){var t=this;return t.currentPoint<t._maxPoint},o.prototype.hasPrev=function(){var t=this;return t.currentPoint>0},o.prototype.toNext=function(t){var e=this;e.hasNext()&&e.moveToPoint(e.currentPoint+1,t)},o.prototype.toPrev=function(t){var e=this;e.hasPrev()&&e.moveToPoint(e.currentPoint-1,t)},o.prototype.moveToPoint=function(t,e){var n=this;e=void 0===e?n.transitionDuration:e+"ms";var o=n.currentPoint;void 0===t&&(t=n.currentPoint),0>t?n.currentPoint=0:t>n._maxPoint?n.currentPoint=n._maxPoint:n.currentPoint=parseInt(t,10),f.cssAnimation?n._setStyle({transitionDuration:e}):n.animation=!0,n._setX(-n.currentPoint*n._distance,e),o!==n.currentPoint&&(n._triggerEvent("fsmoveend",!0,!1),n._triggerEvent("fspointmove",!0,!1))},o.prototype._setX=function(t,e){var n=this;n.currentX=t,f.cssAnimation?n.element.style[v.transform]=n._getTranslate(t):n.animation?n._animate(t,e||n.transitionDuration):n.element.style.left=t+"px"},o.prototype._touchStart=function(t,e){var n=this;if(!(n.disableTouch||n.scrolling||g)){n.element.addEventListener(_.move[e],n,!1),document.addEventListener(_.end[e],n,!1);var o=t.target.tagName;"mouse"===e&&"SELECT"!==o&&"INPUT"!==o&&"TEXTAREA"!==o&&"BUTTON"!==o&&t.preventDefault(),f.cssAnimation?n._setStyle({transitionDuration:"0ms"}):n.animation=!1,n.scrolling=!0,n.moveReady=!1,n.startPageX=i(t,"pageX"),n.startPageY=i(t,"pageY"),n.basePageX=n.startPageX,n.directionX=0,n.startTime=t.timeStamp,n._triggerEvent("fstouchstart",!0,!1)}},o.prototype._touchMove=function(t,e){var n=this;if(n.scrolling&&!g){var o,a,r=i(t,"pageX"),s=i(t,"pageY");if(n.moveReady){t.preventDefault(),o=r-n.basePageX,a=n.currentX+o,(a>=0||a<n._maxX)&&(a=Math.round(n.currentX+o/3)),n.directionX=0===o?n.directionX:o>0?-1:1;var c=!n._triggerEvent("fstouchmove",!0,!0,{delta:o,direction:n.directionX});c?n._touchAfter({moved:!1,originalPoint:n.currentPoint,newPoint:n.currentPoint,cancelled:!0}):n._setX(a)}else{var d=l(n.startPageX,n.startPageY,r,s);d.z>h&&(u(d)>y?(t.preventDefault(),n.moveReady=!0,n.element.addEventListener("click",n,!0)):n.scrolling=!1)}n.basePageX=r}},o.prototype._touchEnd=function(t,e){var n=this;if(n.element.removeEventListener(_.move[e],n,!1),document.removeEventListener(_.end[e],n,!1),n.scrolling){var o=-n.currentX/n._distance;o=n.directionX>0?Math.ceil(o):n.directionX<0?Math.floor(o):Math.round(o),0>o?o=0:o>n._maxPoint&&(o=n._maxPoint),n._touchAfter({moved:o!==n.currentPoint,originalPoint:n.currentPoint,newPoint:o,cancelled:!1}),n.moveToPoint(o)}},o.prototype._click=function(t){t.stopPropagation(),t.preventDefault()},o.prototype._touchAfter=function(t){var e=this;e.scrolling=!1,e.moveReady=!1,setTimeout(function(){e.element.removeEventListener("click",e,!0)},200),e._triggerEvent("fstouchend",!0,!1,t)},o.prototype._setStyle=function(t){var e=this,n=e.element.style;for(var o in t)r(n,o,t[o])},o.prototype._animate=function(t,e){var n=this,o=n.element,i=+new Date,a=parseInt(o.style.left,10),r=t,s=parseInt(e,10),c=function(t,e){return-(t/=e)*(t-2)},d=setInterval(function(){var t,e,n=new Date-i;n>s?(clearInterval(d),e=r):(t=c(n,s),e=t*(r-a)+a),o.style.left=e+"px"},10)},o.prototype.destroy=function(){var t=this;b.forEach(function(e){t.element.removeEventListener(_.start[e],t,!1)})},o.prototype._getTranslate=function(t){var e=this;return e.use3d?"translate3d("+t+"px, 0, 0)":"translate("+t+"px, 0)"},o.prototype._triggerEvent=function(t,e,n,o){var i=this,a=document.createEvent("Event");if(a.initEvent(t,e,n),o)for(var r in o)o.hasOwnProperty(r)&&(a[r]=o[r]);return i.element.dispatchEvent(a)},e.exports=o},{}],7:[function(t,e,n){e.exports={hide:function(){$(".preloader-indicator-overlay, .preloader-indicator-modal, .preloader-label").remove()},show:function(t){var e="数据加载中...";if("object"==typeof t){e=t.msg||e;var n=$(t.renderTo),o=$('<div class="preloader-label"></div>'),i=$('<span class="preloader"></span>'),a=$('<span class="msg">'+e+"</span>");i.appendTo(o),a.appendTo(o),0===n.find(".preloader-label").length&&o.appendTo(n);var r=parseInt(a.width());o.css("width",r+25+1+"px")}else{e=t||e;var s=$('<div class="preloader-indicator-overlay"></div>'),c=$('<div class="preloader-indicator-modal"></div>'),i=$('<span class="preloader preloader-white"></span>'),a=$('<span class="msg">'+e+"</span>");i.appendTo(c),a.appendTo(c),s.appendTo($("body")),c.appendTo($("body"));var r=parseInt(c.width())/2,d=parseInt(c.height())/2;i.css("marginLeft",r-25+"px"),c.css({marginLeft:"-"+r+"px",marginTop:"-"+d+"px"})}}}},{}],8:[function(t,e,n){e.exports={init:function(t){var e=this,n=$("body"),o=function(){};this.winHeight=window.innerHeight,this.moveTimer=null,this._loadingTop=!1,this._loadingBottom=!1,this._enabledTop=!0,this._enabledBottom=!0,this._scrollToBottomHandler=t.scrollToBottom?t.scrollToBottom:o,this._scrollToTopHandler=t.scrollToTop?t.scrollToTop:o,this._scrollMore10pxHandler=t.scrollEvent?t.scrollEvent:o,n.on("touchstart touchmove",function(t){switch(t.type){case"touchstart":e._startHandler(t);break;case"touchmove":e._moveHandler(t)}})},_startHandler:function(t){this._startY=t.touches[0].pageY},_moveHandler:function(t){var e=this,n=e._startY,o=n-t.touches[0].pageY;Math.abs(o)<10||e._loadingTop&&0>o||e._loadingBottom&&o>0||e.moveTimer||(e.moveTimer=setTimeout(function(){var t=document.body.scrollHeight,n=window.pageYOffset||document.body.scrollTop||document.documentElement.scrollTop,i=10;e._enabledBottom&&o>10&&i+n+e.winHeight>=t?(e._loadingBottom=!0,e._scrollToBottomHandler(),$(window).scrollTop(n+50)):e._enabledTop&&-10>o&&0>=n?(e._loadingTop=!0,e._scrollToTopHandler()):(o>10||-10>o)&&e._scrollMore10pxHandler(o),e.moveTimer=null,clearTimeout(e.moveTimer)},200))},after:function(t){"top"==t?this._loadingTop=!1:this._loadingBottom=!1},stop:function(t){"top"==t?(this._loadingTop=!1,this._enabledTop=!1):(this._loadingBottom=!1,this._enabledBottom=!1)},reopen:function(t){"undefined"==typeof t?(this._enabledTop=!0,this._enabledBottom=!0):"top"==t?this._enabledTop=!0:this._enabledBottom=!0}}},{}],9:[function(t,e,n){e.exports={_getNodata:function(){if(!$(".g-nodata").length){var t='<div class="g-nodata">';t+='<i class="iconfont icon-warn"></i><div></div>',t+="</div>",$("body").append(t)}return $(".g-nodata")},show:function(t){var e=this._getNodata();$(".g-nodata div").text(t||"还没有任何数据记录"),e.show()},hide:function(){var t=this._getNodata();t.hide()}}},{}],10:[function(t,e,n){var o=$("body"),i=$('<div class="dialog-overlay"></div>'),a=$('<div class="dialog"></div>');e.exports={_initModal:function(){i=$('<div class="dialog-overlay"></div>'),a=$('<div class="dialog dialog-no-buttons"></div>'),o.append(i),o.append(a)},_hide:function(){a.addClass("dialog-out"),i.removeClass("dialog-overlay-visible"),setTimeout(function(){i.remove(),a.remove()},200)},_show:function(){i.addClass("dialog-overlay-visible"),a.addClass("dialog-in")},_position:function(){var t=parseInt(a.height())/2;a.css("marginTop","-"+t+"px")},show:function(t){var e=this,n=$('<div class="dialog-inner"></div>');e._initModal();var o=t.text||"",i=t.title||"";msgType=t.type||"success",callback=t.callback||null,"success"===msgType&&""===i&&(i="成功"),"error"===msgType&&""===i&&(i="失败");var r=$('<div class="iconfont icon-'+msgType+'"></div>'),s=$('<div class="dialog-title">'+i+"</div>"),c=$('<div class="dialog-text">'+o+"</div>");n.append(r),n.append(s),n.append(c),a.append(n),setTimeout(function(){e._hide(),callback&&callback()},2e3),e._position(),e._show()}}},{}],11:[function(t,e,n){var o=t("../../common/utils");e.exports={init:function(){if(o.isLogin()){var t=window.localStorage;if($(".profile-lnk")[0]&&t.getItem("avatar")){var e=t.getItem("avatar");$(".profile-lnk").prepend('<div class="avatar"><img src="'+e+'_s120" alt="" /></div>'),$(".profile-lnk .icon-account").remove()}var n=o.getCookie("nick_name");$(".menu-profile .profile-lnk").attr("href","./profile.html"),$(".menu-profile .login-info").text(n)}var i=new Headroom(document.querySelector("header"),{tolerance:5,offset:205,classes:{initial:"animated",pinned:"slideDown",unpinned:"slideUp"}});i.init();var a={};a=$.jPanelMenu({menu:".menu",panel:".page-content",beforeOpen:function(){$("#header").appendTo(".jPanelMenu-panel")},afterClose:function(){$("#header").appendTo("body")}}),a.on()}}},{"../../common/utils":2}],12:[function(t,e,n){var o={};o.socket=null,o.connect=function(t){if("WebSocket"in window)o.socket=new WebSocket(t);else{if(!("MozWebSocket"in window))return void console.log("Error: WebSocket is not supported by this browser.");o.socket=new MozWebSocket(t)}o.socket.onopen=function(){console.log("Info: WebSocket connection opened.")},o.socket.onclose=function(){console.log("Info: WebSocket closed.")},o.socket.onmessage=function(t){o.render(t.data)}},o.initialize=function(){"http:"==window.location.protocol?o.connect("ws://"+window.location.host+"/websocket/message"):o.connect("wss://"+window.location.host+"/websocket/message")},o.sendMessage=function(){var t=document.getElementById("chat").value;""!=t&&(o.socket.send(t),document.getElementById("chat").value="")},o.render=function(t){if(!$(".notice-bar")[0]){var e=$('<div class="notice-bar"></div>');$("body").append(e)}$(".notice-bar").html(t).addClass("notice-in"),setTimeout(function(){$(".notice-bar").removeClass("notice-in")},3e3)},e.exports=o},{}],13:[function(t,e,n){var o=t("../../common/utils"),i=t("../../common/apimap"),a=t("../../components/tips"),r=t("../../components/ajax"),s=t("../../components/loading/loading"),c=t("../../components/dialog/dialog");e.exports={init:function(){var t=this;$(document).on("tap",".g-yue",function(){if(!o.isLogin())return window.location.href="./login.html",!1;o.stopEventTap();var e=$(this).data("id"),n=$(this).data("uid"),i=['<div class="input-row">','<textarea class="ask-txa" id="askWords" placeholder="讲文明懂礼貌，把握好这仅有的一次机会"></textarea>',"</div>"].join("");c.confirm({title:"回应这个邀约",body:i,okText:"我想约你"},function(){var o=$.trim($("#askWords").val());return""===o?(a.show({type:"error",title:"说点什么吧"}),!1):void t.sendAsk(e,n,o)})})},sendAsk:function(t,e,n){s.show(),r.post(i.requestDatingApi,{datingId:t,userId:e,message:n},function(t){s.hide(),a.show({type:"success",title:"发送成功，请耐心等待回音"})},function(t){s.hide(),a.show({type:"error",title:t.resultMsg})})}}},{"../../common/apimap":1,"../../common/utils":2,"../../components/ajax":3,"../../components/dialog/dialog":5,"../../components/loading/loading":7,"../../components/tips":10}],14:[function(t,e,n){$(function(){var e=t("../../common/utils"),n=t("../../common/apimap"),o=t("../../components/tips"),i=t("../../components/ajax"),a=t("../../components/nodata"),r=t("../../components/loading/loading"),s=t("../../components/flipsnap"),c=t("../../components/date"),d=t("../../components/dialog/dialog"),l=t("../../mods/nav/nav"),u=t("../../mods/yue/yue"),p=t("../../mods/notice/notice"),m=t("../../components/mscroll"),v=$(window).width(),f=e.getUrlParam("id")||"",g=1,h=!1,y={init:function(){var t=this;return e.isLogin()?(r.show(),void t.getData(function(){var e=v*$(".scroller .item").length;$(".basic-info").height(v),$(".scroller .item").width(v),$(".scroller").width(e),l.init(),t.initEvent()})):(window.location.href="./login.html",!1)},checkLs:function(t){var e=window.localStorage;e.getItem("avatar")||e.setItem("avatar",t)},initEvent:function(){var t=this;u.init(),p.initialize();s(".scroller",{distance:v});m.init({scrollToBottom:function(){var e=$(".tab-bar .current").data("tab");return h?void m.stop():2==e||$("#tab2").data("init")?(g>1&&$("#loadmore").html(""),r.show({renderTo:"#loadmore"}),void t.getAskListData(function(){m.after()})):!1}}),$(document).on("tap",".tab-item",function(){var e=$(this),n=e.data("tab");return e.hasClass("current")?!1:($(".tab-bar .current").removeClass("current"),e.addClass("current"),$(".tab-con").hide(),$("#tab"+n).show(),void(2!=n||$("#tab2").data("init")||t.getAskListData()))}),$(document).on("tap",".btn-accept",function(){e.stopEventTap();var n=$(this),o=n.parent(".action-area"),i=n.data("id"),a=n.data("uid"),r=n.data("myid");d.confirm({title:"接受请求",body:"接受这个请求的同时将拒绝掉其他请求，确认接受吗？"},function(){t.acceptAsk(i,a,function(){o.html('<span class="iconfont icon-checked"></span><a class="iconfont icon-message" href="./chat.html?uid='+r+"&did="+i+'"></a>')})})})},acceptAsk:function(t,e,a){r.show(),i.post(n.acceptDatingApi,{datingId:t,userId:e},function(t){r.hide(),a&&a(),o.show({type:"success",title:"您已接受，准备赴约吧"})},function(t){r.hide(),o.show({type:"error",title:t.resultMsg})})},getData:function(t){var e=this;i.get(n.profileApi,{id:f},function(n){if(r.hide(),n.result&&n.result.userInfo){if(!n.result.userInfo.id)return a.show("该用户不存在"),!1;e.renderData(n.result),t&t()}else a.show("返回的数据格式有问题")},function(t){r.hide(),a.show(t.resultMsg)})},renderData:function(t){var n={2:"icon-coffee",3:"icon-food",4:"icon-film",5:"icon-run",6:"icon-photo",7:"icon-badminton",8:"icon-riding",9:"icon-drive",11:"icon-flight",1:"icon-lquote"},o={2:"喝咖啡/茶",3:"美食",4:"看电影",5:"跑步",6:"摄影",7:"羽毛球",8:"骑行",9:"自驾",11:"同行",1:"其他"},i={110100:"北京",310100:"上海",440100:"广州",440300:"深圳",330100:"杭州",510100:"成都"},a={1:"互联网/IT",2:"金融财务",3:"艺术/设计",4:"模特/演艺",5:"创业/投资",6:"摄影制作",7:"影视娱乐",8:"音乐/舞蹈",9:"广告传媒",10:"教育/体育"},r=t.userInfo,s=t.postDatingInfoList,d=r.sex,l=r.birthday,u=r.cityId,p=r.socialId;r.age=(new Date).getFullYear()-parseInt(l.substr(0,4)),r.sex="M"===d?"男":"女",r.sexCls="M"===d?"icon-male":"icon-female",r.city=i[u];var m="混"+a[p]+"圈";r.career&&""!==r.career&&(m+="的"+r.career),r.profession=m,$.each(s,function(t,e){var i=e.datingInfo.datingTime||"",a=e.datingInfo.typeId;""!==i?s[t].time=i.substr(0,10):s[t].time="随时",s[t].iconCls=n[a],s[t].typeName=o[a],s[t].id=e.datingInfo.uUID,s[t].article=e.datingInfo.article;var r=e.requestUserInfos;r.length>0&&(r[0].requestDatingAccept&&(s[t].done=!0),$.each(r,function(e,n){if(n.requestDatingTime){var o=n.requestDatingTime;o=o.substr(0,19).replace(/\-/g,"/"),s[t].requestUserInfos[e].requestDatingTime=c.ago(o)}}))});var v=e.template($("#tmpl").html(),{myHome:t.myHome,info:r,list:s});$(".page-content").html(v),document.title=r.nickName,$("#header h1").text(r.nickName),this.checkLs(r.avatar)},getAskListData:function(){var t=this;r.show(),i.get(n.myRequestApi,{page:g},function(e){r.hide(),e.result&&e.result.datingList?0===e.result.datingList.length?(h=!0,1===g?t.renderAskListData([]):$("#loadmore").html("没有更多了~")):($("#loadmore").html("上拉加载更多"),g++,t.renderAskListData(e.result.datingList)):o.show({type:"error",title:"返回的数据格式有问题"})},function(t){r.hide(),o.show({type:"error",title:t.resultMsg})})},renderAskListData:function(t){var n={2:"icon-coffee",3:"icon-food",4:"icon-film",5:"icon-run",6:"icon-photo",7:"icon-badminton",8:"icon-riding",9:"icon-drive",11:"icon-flight",1:"icon-lquote"},o={2:"喝咖啡/茶",3:"美食",4:"看电影",5:"跑步",6:"摄影",7:"羽毛球",8:"骑行",9:"自驾",11:"同行",1:"其他"};$.each(t,function(e,i){var a=i.datingInfo.datingTime||"",r=i.datingInfo.typeId;""!==a?t[e].datingInfo.datingTime=a.substr(0,10):t[e].datingInfo.datingTime="随时",t[e].datingInfo.iconCls=n[r],t[e].datingInfo.typeName=o[r]});var i=e.template($("#askListTmpl").html(),{list:t});$("#tab2").data("init",!0),$("#tab2 .dating-list").append(i)}};y.init()})},{"../../common/apimap":1,"../../common/utils":2,"../../components/ajax":3,"../../components/date":4,"../../components/dialog/dialog":5,"../../components/flipsnap":6,"../../components/loading/loading":7,"../../components/mscroll":8,"../../components/nodata":9,"../../components/tips":10,"../../mods/nav/nav":11,"../../mods/notice/notice":12,"../../mods/yue/yue":13}]},{},[14]);