!function t(e,n,o){function i(a,s){if(!n[a]){if(!e[a]){var c="function"==typeof require&&require;if(!s&&c)return c(a,!0);if(r)return r(a,!0);var d=new Error("Cannot find module '"+a+"'");throw d.code="MODULE_NOT_FOUND",d}var u=n[a]={exports:{}};e[a][0].call(u.exports,function(t){var n=e[a][1][t];return i(n?n:t)},u,u.exports,t,e,n,o)}return n[a].exports}for(var r="function"==typeof require&&require,a=0;a<o.length;a++)i(o[a]);return i}({1:[function(t,e,n){var o=window.location.protocol+"//"+window.location.host+"/";"w.yuema.us"===window.location.hostname&&(o=window.location.protocol+"//www.yuema.us/");var i={loginApi:o+"open-api/login",registApi:o+"open-api/simple-regist",perfectApi:o+"action/user/update",provincesListApi:o+"open-api/query/provinces-list",citiesListApi:o+"open-api/query/cities-list",addressesListApi:o+"open-api/query/addresses-list",postDatingApi:o+"action/dating/post",requestDatingApi:o+"action/dating/request",acceptDatingApi:o+"action/dating/accept",listApi:o+"open-api/query/dating/dating-list",profileApi:o+"open-api/query/home-info"};e.exports=i},{}],2:[function(t,e,n){var o={getUrlParam:function(t){var e=new RegExp("[?|&]"+t+"=([^&]+)"),n=location.search.match(e);return n&&n[1]},stopEventTap:function(){var t=$('<div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 99999; "></div>');$("body").append(t),setTimeout(function(){t.remove()},500)},formatDate:function(t){"string"==typeof t&&(t=this.strToDate(t));var e=t.getFullYear(),n=t.getMonth()+1,o=t.getDate();return 10>n&&(n="0"+n),10>o&&(o="0"+o),e+"-"+n+"-"+o},strToDate:function(t){var e=t.replace(/-/g,"/");return new Date(e)},hideKeyboard:function(){var t=$('<a style="width: 0;height: 0;font-size: 0;display: block"></a>');$("body").append(t),t.focus(),setTimeout(function(){t.remove()},0)},getNetworkState:function(){var t=150,e=!1;if(window.performance){var n=window.performance.timing,o=n.responseEnd-n.domainLookupStart;e=o>t?!1:!0}return e},isIOS:function(){var t=ua.match(/(iPad).*OS\s([\d_]+)/),e=ua.match(/(iPod)(.*OS\s([\d_]+))?/),n=!t&&ua.match(/(iPhone\sOS)\s([\d_]+)/);return t||n||e?!0:!1},isAndroid:function(){return ua.indexOf("Android")>-1},isWeixin:function(){return ua.indexOf("MicroMessenger")>-1},isLogin:function(){return ua.indexOf("MicroMessenger")>-1},template:function(t,e){function n(t){if(!t)return"";var e={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&apos;"};return(""+t).replace(/[&<>"']/g,function(t){return e[t]})}var o,i={"'":"'","\\":"\\","\r":"r","\n":"n","	":"t","\u2028":"u2028","\u2029":"u2029"},r=/'|\\|\r|\n|\t|\u2028|\u2029/g,a=/<%-([\s\S]+?)%>|<%=([\s\S]+?)%>|<%([\s\S]+?)%>|$/g,s=0,c="__p+='";t.replace(a,function(e,o,a,d,u){return c+=t.slice(s,u).replace(r,function(t){return"\\"+i[t]}),o&&(c+="'+\n((__t=("+o+"))==null?'':"+n.name+"(__t))+\n'"),a&&(c+="'+\n((__t=("+a+"))==null?'':__t)+\n'"),d&&(c+="';\n"+d+"\n__p+='"),s=u+e.length,e}),c+="';\n",c="with(obj||{}){\n"+c+"}\n",c=n.toString()+"var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+c+"return __p;\n";try{o=new Function("obj",c)}catch(d){throw d.source=c,d}if(e)return o(e);var u=function(t){return o(t)};return u.source="function(obj){\n"+c+"}",u}};e.exports=o},{}],3:[function(t,e,n){var o=function(t){1==t.isRedirect&&setTimeout(function(){window.location.href=t.redirectURL},2e3)};e.exports={post:function(t,e,n,i){$.ajax({url:t,data:e,type:"post",dataType:"json",success:function(t){o(t),"SUCCESS"===t.resultCode?n(t):i(t)},error:function(t){var e=(t.status||500,"对不起，服务器正在维护，请稍后再试...");switch(t.status){case 404:e="对不起，你访问的接口不存在...";break;case 403:e="对不起，你没有权限访问该接口...";break;case 500:e="对不起，正在进行服务器维护，请稍后再来...";break;case 502:e="对不起，你访问的接口程序出错...";break;case 503:e="对不起，你访问的接口后端异常...";break;default:e="对不起，服务器正在维护，请稍后再试..."}var t={isRedirect:!1,result:{},resultCode:"SERVER ERROR",resultMsg:e};i(t)}})},get:function(t,e,n,i){$.ajax({url:t,data:e,type:"get",dataType:"json",success:function(t){o(t),"SUCCESS"===t.resultCode?n(t):i(t)},error:function(t){var e=(t.status||500,"对不起，服务器正在维护，请稍后再试...");switch(t.status){case 404:e="对不起，你访问的接口不存在...";break;case 403:e="对不起，你没有权限访问该接口...";break;case 500:e="对不起，正在进行服务器维护，请稍后再来...";break;case 502:e="对不起，你访问的接口程序出错...";break;case 503:e="对不起，你访问的接口后端异常...";break;default:e="对不起，服务器正在维护，请稍后再试..."}var t={isRedirect:!1,result:{},resultCode:"ERROR",resultMsg:e};i(t)}})}}},{}],4:[function(t,e,n){var o=$("body"),i=$('<div class="dialog-overlay"></div>'),r=$('<div class="dialog"></div>');e.exports={_stopEventTap:function(){var t=$('<div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 99999; "></div>');$("body").append(t),setTimeout(function(){t.remove()},350)},_initModal:function(){i=$('<div class="dialog-overlay"></div>'),r=$('<div class="dialog"></div>'),o.append(i),o.append(r)},_initEvent:function(){var t=this;$(".dialog-overlay").one("touchend",function(e){e.preventDefault(),t._stopEventTap(),t.hide()})},hide:function(){r.addClass("dialog-out"),i.removeClass("dialog-overlay-visible"),setTimeout(function(){i.remove(),r.remove()},200)},show:function(){i.addClass("dialog-overlay-visible"),r.addClass("dialog-in")},_position:function(){var t=parseInt(r.height())/2;r.css("marginTop","-"+t+"px")},alert:function(t,e){var n=this,o=$('<div class="dialog-inner"></div>');n._initModal();var i=t,a="温馨提示";"object"==typeof t&&t.title&&(i=t.body||"",a=t.title);var s=$('<div class="dialog-title">'+a+"</div>"),c=$('<div class="dialog-text">'+i+"</div>");o.append(s),o.append(c),r.append(o);var d=$('<div class="dialog-buttons"></div>'),u=$('<span class="dialog-button">确定</span>');d.append(u),r.append(d),u.on("click",function(){n.hide(),e&&e()}),n._position(),n.show()},confirm:function(t,e,n){var o=this,i=$('<div class="dialog-inner"></div>');o._initModal(),o._initEvent();var a={title:"温馨提示",body:"object"==typeof t?"":t,okText:"确定",cancelText:"取消"};"object"==typeof t&&(a=$.extend(a,t));var s=$('<div class="dialog-title">'+a.title+"</div>"),c=$('<div class="dialog-text">'+a.body+"</div>");i.append(s),i.append(c),r.append(i);var d=$('<div class="dialog-buttons"></div>'),u=$('<span class="dialog-button">'+a.cancelText+"</span>");$close=$('<span class="dialog-button">'+a.okText+"</span>"),d.append(u),d.append($close),r.append(d),u.on("click",function(){n&&n(),o.hide()}),$close.on("click",function(){e&&e(),o.hide()}),o._position(),o.show()}}},{}],5:[function(t,e,n){function o(t,e){return this instanceof o?this.init(t,e):new o(t,e)}function i(t,e){return t.changedTouches?t.changedTouches[0][e]:t[e]}function r(t){return d(t,function(t){return void 0!==p.style[t]})}function a(t,e,n){var o=m[e];o?t[o]=n:void 0!==t[e]?(m[e]=e,t[e]=n):d(v,function(o){var i=c(o)+c(e);return void 0!==t[i]?(m[e]=i,t[i]=n,!0):void 0})}function s(t){if(void 0!==p.style[t])return t;var e;return d(v,function(n){var o=c(n)+c(t);return void 0!==p.style[o]?(e="-"+n+"-"+t,!0):void 0}),e}function c(t){return t.charAt(0).toUpperCase()+t.substr(1)}function d(t,e){for(var n=0,o=t.length;o>n;n++)if(e(t[n],n))return!0;return!1}function u(t,e,n,o){var i=Math.abs(t-n),r=Math.abs(e-o),a=Math.sqrt(Math.pow(i,2)+Math.pow(r,2));return{x:i,y:r,z:a}}function l(t){var e=t.y/t.z,n=Math.acos(e);return 180/(Math.PI/n)}var p=document.createElement("div"),v=["webkit","moz","o","ms"],m={},f=o.support={},h=!1,g=5,y=55;f.transform3d=r(["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"]),f.transform=r(["transformProperty","WebkitTransform","MozTransform","OTransform","msTransform"]),f.transition=r(["transitionProperty","WebkitTransitionProperty","MozTransitionProperty","OTransitionProperty","msTransitionProperty"]),f.addEventListener="addEventListener"in window,f.mspointer=window.navigator.msPointerEnabled,f.cssAnimation=(f.transform3d||f.transform)&&f.transition;var _=["touch","mouse"],b={start:{touch:"touchstart",mouse:"mousedown"},move:{touch:"touchmove",mouse:"mousemove"},end:{touch:"touchend",mouse:"mouseup"}};f.addEventListener&&(document.addEventListener("gesturestart",function(){h=!0}),document.addEventListener("gestureend",function(){h=!1})),o.prototype.init=function(t,e){var n=this;if(n.element=t,"string"==typeof t&&(n.element=document.querySelector(t)),!n.element)throw new Error("element not found");return f.mspointer&&(n.element.style.msTouchAction="pan-y"),e=e||{},n.distance=e.distance,n.maxPoint=e.maxPoint,n.disableTouch=void 0===e.disableTouch?!1:e.disableTouch,n.disable3d=void 0===e.disable3d?!1:e.disable3d,n.transitionDuration=void 0===e.transitionDuration?"350ms":e.transitionDuration+"ms",n.currentPoint=0,n.currentX=0,n.animation=!1,n.use3d=f.transform3d,n.disable3d===!0&&(n.use3d=!1),f.cssAnimation?n._setStyle({transitionProperty:s("transform"),transitionTimingFunction:"cubic-bezier(0,0,0.25,1)",transitionDuration:"0ms",transform:n._getTranslate(0)}):n._setStyle({position:"relative",left:"0px"}),n.refresh(),_.forEach(function(t){n.element.addEventListener(b.start[t],n,!1)}),n},o.prototype.handleEvent=function(t){var e=this;switch(t.type){case b.start.touch:e._touchStart(t,"touch");break;case b.start.mouse:e._touchStart(t,"mouse");break;case b.move.touch:e._touchMove(t,"touch");break;case b.move.mouse:e._touchMove(t,"mouse");break;case b.end.touch:e._touchEnd(t,"touch");break;case b.end.mouse:e._touchEnd(t,"mouse");break;case"click":e._click(t)}},o.prototype.refresh=function(){var t=this;t._maxPoint=void 0===t.maxPoint?function(){for(var e,n=t.element.childNodes,o=-1,i=0,r=n.length;r>i;i++)e=n[i],1===e.nodeType&&o++;return o}():t.maxPoint,void 0===t.distance?t._maxPoint<0?t._distance=0:t._distance=t.element.scrollWidth/(t._maxPoint+1):t._distance=t.distance,t._maxX=-t._distance*t._maxPoint,t.moveToPoint()},o.prototype.hasNext=function(){var t=this;return t.currentPoint<t._maxPoint},o.prototype.hasPrev=function(){var t=this;return t.currentPoint>0},o.prototype.toNext=function(t){var e=this;e.hasNext()&&e.moveToPoint(e.currentPoint+1,t)},o.prototype.toPrev=function(t){var e=this;e.hasPrev()&&e.moveToPoint(e.currentPoint-1,t)},o.prototype.moveToPoint=function(t,e){var n=this;e=void 0===e?n.transitionDuration:e+"ms";var o=n.currentPoint;void 0===t&&(t=n.currentPoint),0>t?n.currentPoint=0:t>n._maxPoint?n.currentPoint=n._maxPoint:n.currentPoint=parseInt(t,10),f.cssAnimation?n._setStyle({transitionDuration:e}):n.animation=!0,n._setX(-n.currentPoint*n._distance,e),o!==n.currentPoint&&(n._triggerEvent("fsmoveend",!0,!1),n._triggerEvent("fspointmove",!0,!1))},o.prototype._setX=function(t,e){var n=this;n.currentX=t,f.cssAnimation?n.element.style[m.transform]=n._getTranslate(t):n.animation?n._animate(t,e||n.transitionDuration):n.element.style.left=t+"px"},o.prototype._touchStart=function(t,e){var n=this;if(!(n.disableTouch||n.scrolling||h)){n.element.addEventListener(b.move[e],n,!1),document.addEventListener(b.end[e],n,!1);var o=t.target.tagName;"mouse"===e&&"SELECT"!==o&&"INPUT"!==o&&"TEXTAREA"!==o&&"BUTTON"!==o&&t.preventDefault(),f.cssAnimation?n._setStyle({transitionDuration:"0ms"}):n.animation=!1,n.scrolling=!0,n.moveReady=!1,n.startPageX=i(t,"pageX"),n.startPageY=i(t,"pageY"),n.basePageX=n.startPageX,n.directionX=0,n.startTime=t.timeStamp,n._triggerEvent("fstouchstart",!0,!1)}},o.prototype._touchMove=function(t,e){var n=this;if(n.scrolling&&!h){var o,r,a=i(t,"pageX"),s=i(t,"pageY");if(n.moveReady){t.preventDefault(),o=a-n.basePageX,r=n.currentX+o,(r>=0||r<n._maxX)&&(r=Math.round(n.currentX+o/3)),n.directionX=0===o?n.directionX:o>0?-1:1;var c=!n._triggerEvent("fstouchmove",!0,!0,{delta:o,direction:n.directionX});c?n._touchAfter({moved:!1,originalPoint:n.currentPoint,newPoint:n.currentPoint,cancelled:!0}):n._setX(r)}else{var d=u(n.startPageX,n.startPageY,a,s);d.z>g&&(l(d)>y?(t.preventDefault(),n.moveReady=!0,n.element.addEventListener("click",n,!0)):n.scrolling=!1)}n.basePageX=a}},o.prototype._touchEnd=function(t,e){var n=this;if(n.element.removeEventListener(b.move[e],n,!1),document.removeEventListener(b.end[e],n,!1),n.scrolling){var o=-n.currentX/n._distance;o=n.directionX>0?Math.ceil(o):n.directionX<0?Math.floor(o):Math.round(o),0>o?o=0:o>n._maxPoint&&(o=n._maxPoint),n._touchAfter({moved:o!==n.currentPoint,originalPoint:n.currentPoint,newPoint:o,cancelled:!1}),n.moveToPoint(o)}},o.prototype._click=function(t){t.stopPropagation(),t.preventDefault()},o.prototype._touchAfter=function(t){var e=this;e.scrolling=!1,e.moveReady=!1,setTimeout(function(){e.element.removeEventListener("click",e,!0)},200),e._triggerEvent("fstouchend",!0,!1,t)},o.prototype._setStyle=function(t){var e=this,n=e.element.style;for(var o in t)a(n,o,t[o])},o.prototype._animate=function(t,e){var n=this,o=n.element,i=+new Date,r=parseInt(o.style.left,10),a=t,s=parseInt(e,10),c=function(t,e){return-(t/=e)*(t-2)},d=setInterval(function(){var t,e,n=new Date-i;n>s?(clearInterval(d),e=a):(t=c(n,s),e=t*(a-r)+r),o.style.left=e+"px"},10)},o.prototype.destroy=function(){var t=this;_.forEach(function(e){t.element.removeEventListener(b.start[e],t,!1)})},o.prototype._getTranslate=function(t){var e=this;return e.use3d?"translate3d("+t+"px, 0, 0)":"translate("+t+"px, 0)"},o.prototype._triggerEvent=function(t,e,n,o){var i=this,r=document.createEvent("Event");if(r.initEvent(t,e,n),o)for(var a in o)o.hasOwnProperty(a)&&(r[a]=o[a]);return i.element.dispatchEvent(r)},e.exports=o},{}],6:[function(t,e,n){e.exports={hide:function(){$(".preloader-indicator-overlay, .preloader-indicator-modal, .preloader-label").remove()},show:function(t){var e="数据加载中...";if("object"==typeof t){e=t.msg||e;var n=$(t.renderTo),o=$('<div class="preloader-label"></div>'),i=$('<span class="preloader"></span>'),r=$('<span class="msg">'+e+"</span>");i.appendTo(o),r.appendTo(o),0===n.find(".preloader-label").length&&o.appendTo(n);var a=parseInt(r.width());o.css("width",a+25+1+"px")}else{e=t||e;var s=$('<div class="preloader-indicator-overlay"></div>'),c=$('<div class="preloader-indicator-modal"></div>'),i=$('<span class="preloader preloader-white"></span>'),r=$('<span class="msg">'+e+"</span>");i.appendTo(c),r.appendTo(c),s.appendTo($("body")),c.appendTo($("body"));var a=parseInt(c.width())/2,d=parseInt(c.height())/2;i.css("marginLeft",a-25+"px"),c.css({marginLeft:"-"+a+"px",marginTop:"-"+d+"px"})}}}},{}],7:[function(t,e,n){var o=$("body"),i=$('<div class="dialog-overlay"></div>'),r=$('<div class="dialog"></div>');e.exports={_initModal:function(){i=$('<div class="dialog-overlay"></div>'),r=$('<div class="dialog dialog-no-buttons"></div>'),o.append(i),o.append(r)},_hide:function(){r.addClass("dialog-out"),i.removeClass("dialog-overlay-visible"),setTimeout(function(){i.remove(),r.remove()},200)},_show:function(){i.addClass("dialog-overlay-visible"),r.addClass("dialog-in")},_position:function(){var t=parseInt(r.height())/2;r.css("marginTop","-"+t+"px")},show:function(t){var e=this,n=$('<div class="dialog-inner"></div>');e._initModal();var o=t.text||"",i=t.title||"";msgType=t.type||"success",callback=t.callback||null,"success"===msgType&&""===i&&(i="成功"),"error"===msgType&&""===i&&(i="失败");var a=$('<div class="iconfont icon-'+msgType+'"></div>'),s=$('<div class="dialog-title">'+i+"</div>"),c=$('<div class="dialog-text">'+o+"</div>");n.append(a),n.append(s),n.append(c),r.append(n),setTimeout(function(){e._hide(),callback&&callback()},2e3),e._position(),e._show()}}},{}],8:[function(t,e,n){var o=t("../../common/apimap"),i=t("../../components/tips"),r=t("../../components/ajax"),a=t("../../components/loading/loading"),s=t("../../components/dialog/dialog");e.exports={init:function(){var t=this;$(document).on("tap",".g-yue",function(){var e=$(this).data("id"),n=$(this).data("uid"),o=['<div class="input-row">','<textarea class="ask-txa" id="askWords" placeholder="说点什么"></textarea>',"</div>"].join("");s.confirm({title:"回应这个邀约",body:o},function(){var o=$.trim($("#askWords").val());return""===o?(i.show({type:"error",title:"说点什么吧"}),!1):void t.sendAsk(e,n,o)})})},sendAsk:function(t,e,n){a.show(),r.post(o.requestDatingApi,{datingId:t,userId:e,message:n},function(t){a.hide(),i.show({type:"success",title:"发送成功，请耐心等待回音"})},function(t){a.hide(),i.show({type:"error",title:t.resultMsg})})}}},{"../../common/apimap":1,"../../components/ajax":3,"../../components/dialog/dialog":4,"../../components/loading/loading":6,"../../components/tips":7}],9:[function(t,e,n){$(function(){var e=t("../../common/utils"),n=t("../../components/flipsnap"),o=t("../../mods/yue/yue"),i=$(".icons i"),r=$(".scroller .item"),a=n("#daily-sale .scroller",{distance:r.width()+8});a.element.addEventListener("fspointmove",function(){a.currentPoint==a._maxPoint,r.filter(".current").removeClass("current"),r.eq(a.currentPoint).addClass("current"),i.filter(".current").removeClass("current"),i.eq(a.currentPoint).addClass("current")},!1),a.moveToPoint(1);e.template($("#result-tmpl").html(),{title:"test",content:"hahaha"});o.init()})},{"../../common/utils":2,"../../components/flipsnap":5,"../../mods/yue/yue":8}]},{},[9]);