!function o(t,e,n){function i(s,r){if(!e[s]){if(!t[s]){var c="function"==typeof require&&require;if(!r&&c)return c(s,!0);if(a)return a(s,!0);var d=new Error("Cannot find module '"+s+"'");throw d.code="MODULE_NOT_FOUND",d}var l=e[s]={exports:{}};t[s][0].call(l.exports,function(o){var e=t[s][1][o];return i(e?e:o)},l,l.exports,o,t,e,n)}return e[s].exports}for(var a="function"==typeof require&&require,s=0;s<n.length;s++)i(n[s]);return i}({1:[function(o,t,e){var n=window.location.protocol+"//"+window.location.host+"/";"w.yuema.us"===window.location.hostname&&(n=window.location.protocol+"//www.yuema.us/");var i={loginApi:n+"open-api/login",registApi:n+"open-api/simple-regist",perfectApi:n+"action/user/update",provincesListApi:n+"open-api/query/provinces-list",citiesListApi:n+"open-api/query/cities-list",addressesListApi:n+"open-api/query/addresses-list",postDatingApi:n+"action/dating/post",requestDatingApi:n+"action/dating/request",acceptDatingApi:n+"action/dating/accept",listApi:n+"open-api/query/dating/dating-list",profileApi:n+"open-api/query/home-info"};t.exports=i},{}],2:[function(o,t,e){var n={getUrlParam:function(o){var t=new RegExp("[?|&]"+o+"=([^&]+)"),e=location.search.match(t);return e&&e[1]},stopEventTap:function(){var o=$('<div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 99999; "></div>');$("body").append(o),setTimeout(function(){o.remove()},500)},formatDate:function(o){"string"==typeof o&&(o=this.strToDate(o));var t=o.getFullYear(),e=o.getMonth()+1,n=o.getDate();return 10>e&&(e="0"+e),10>n&&(n="0"+n),t+"-"+e+"-"+n},strToDate:function(o){var t=o.replace(/-/g,"/");return new Date(t)},hideKeyboard:function(){var o=$('<a style="width: 0;height: 0;font-size: 0;display: block"></a>');$("body").append(o),o.focus(),setTimeout(function(){o.remove()},0)},getNetworkState:function(){var o=150,t=!1;if(window.performance){var e=window.performance.timing,n=e.responseEnd-e.domainLookupStart;t=n>o?!1:!0}return t},isIOS:function(){var o=ua.match(/(iPad).*OS\s([\d_]+)/),t=ua.match(/(iPod)(.*OS\s([\d_]+))?/),e=!o&&ua.match(/(iPhone\sOS)\s([\d_]+)/);return o||e||t?!0:!1},isAndroid:function(){return ua.indexOf("Android")>-1},isWeixin:function(){return ua.indexOf("MicroMessenger")>-1},getCookie:function(o){var t=new RegExp("(^| )"+o+"=([^;]*)(;|$)"),e=document.cookie.match(t);return null!=e?decodeURI(e[2]):""},isLogin:function(){var o=this,t=o.getCookie("logined");return""!==t?!0:!1},template:function(o,t){function e(o){if(!o)return"";var t={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&apos;"};return(""+o).replace(/[&<>"']/g,function(o){return t[o]})}var n,i={"'":"'","\\":"\\","\r":"r","\n":"n","	":"t","\u2028":"u2028","\u2029":"u2029"},a=/'|\\|\r|\n|\t|\u2028|\u2029/g,s=/<%-([\s\S]+?)%>|<%=([\s\S]+?)%>|<%([\s\S]+?)%>|$/g,r=0,c="__p+='";o.replace(s,function(t,n,s,d,l){return c+=o.slice(r,l).replace(a,function(o){return"\\"+i[o]}),n&&(c+="'+\n((__t=("+n+"))==null?'':"+e.name+"(__t))+\n'"),s&&(c+="'+\n((__t=("+s+"))==null?'':__t)+\n'"),d&&(c+="';\n"+d+"\n__p+='"),r=l+t.length,t}),c+="';\n",c="with(obj||{}){\n"+c+"}\n",c=e.toString()+"var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+c+"return __p;\n";try{n=new Function("obj",c)}catch(d){throw d.source=c,d}if(t)return n(t);var l=function(o){return n(o)};return l.source="function(obj){\n"+c+"}",l}};t.exports=n},{}],3:[function(o,t,e){var n=function(o){1==o.isRedirect&&setTimeout(function(){window.location.href=o.redirectURL},2e3)};t.exports={post:function(o,t,e,i){$.ajax({url:o,data:t,type:"post",dataType:"json",success:function(o){n(o),"SUCCESS"===o.resultCode?e(o):i(o)},error:function(o){var t=(o.status||500,"对不起，服务器正在维护，请稍后再试...");switch(o.status){case 404:t="对不起，你访问的接口不存在...";break;case 403:t="对不起，你没有权限访问该接口...";break;case 500:t="对不起，正在进行服务器维护，请稍后再来...";break;case 502:t="对不起，你访问的接口程序出错...";break;case 503:t="对不起，你访问的接口后端异常...";break;default:t="对不起，服务器正在维护，请稍后再试..."}var o={isRedirect:!1,result:{},resultCode:"SERVER ERROR",resultMsg:t};i(o)}})},get:function(o,t,e,i){$.ajax({url:o,data:t,type:"get",dataType:"json",success:function(o){n(o),"SUCCESS"===o.resultCode?e(o):i(o)},error:function(o){var t=(o.status||500,"对不起，服务器正在维护，请稍后再试...");switch(o.status){case 404:t="对不起，你访问的接口不存在...";break;case 403:t="对不起，你没有权限访问该接口...";break;case 500:t="对不起，正在进行服务器维护，请稍后再来...";break;case 502:t="对不起，你访问的接口程序出错...";break;case 503:t="对不起，你访问的接口后端异常...";break;default:t="对不起，服务器正在维护，请稍后再试..."}var o={isRedirect:!1,result:{},resultCode:"ERROR",resultMsg:t};i(o)}})}}},{}],4:[function(o,t,e){var n=$("body"),i=$('<div class="dialog-overlay"></div>'),a=$('<div class="dialog"></div>');t.exports={_stopEventTap:function(){var o=$('<div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 99999; "></div>');$("body").append(o),setTimeout(function(){o.remove()},350)},_initModal:function(){i=$('<div class="dialog-overlay"></div>'),a=$('<div class="dialog"></div>'),n.append(i),n.append(a)},_initEvent:function(){var o=this;$(".dialog-overlay").one("touchend",function(t){t.preventDefault(),o._stopEventTap(),o.hide()})},hide:function(){a.addClass("dialog-out"),i.removeClass("dialog-overlay-visible"),setTimeout(function(){i.remove(),a.remove()},200)},show:function(){i.addClass("dialog-overlay-visible"),a.addClass("dialog-in")},_position:function(){var o=parseInt(a.height())/2;a.css("marginTop","-"+o+"px")},alert:function(o,t){var e=this,n=$('<div class="dialog-inner"></div>');e._initModal();var i=o,s="温馨提示";"object"==typeof o&&o.title&&(i=o.body||"",s=o.title);var r=$('<div class="dialog-title">'+s+"</div>"),c=$('<div class="dialog-text">'+i+"</div>");n.append(r),n.append(c),a.append(n);var d=$('<div class="dialog-buttons"></div>'),l=$('<span class="dialog-button">确定</span>');d.append(l),a.append(d),l.on("click",function(){e.hide(),t&&t()}),e._position(),e.show()},confirm:function(o,t,e){var n=this,i=$('<div class="dialog-inner"></div>');n._initModal(),n._initEvent();var s={title:"温馨提示",body:"object"==typeof o?"":o,okText:"确定",cancelText:"取消"};"object"==typeof o&&(s=$.extend(s,o));var r=$('<div class="dialog-title">'+s.title+"</div>"),c=$('<div class="dialog-text">'+s.body+"</div>");i.append(r),i.append(c),a.append(i);var d=$('<div class="dialog-buttons"></div>'),l=$('<span class="dialog-button">'+s.cancelText+"</span>");$close=$('<span class="dialog-button">'+s.okText+"</span>"),d.append(l),d.append($close),a.append(d),l.on("click",function(){e&&e(),n.hide()}),$close.on("click",function(){t&&t(),n.hide()}),n._position(),n.show()}}},{}],5:[function(o,t,e){t.exports={hide:function(){$(".preloader-indicator-overlay, .preloader-indicator-modal, .preloader-label").remove()},show:function(o){var t="数据加载中...";if("object"==typeof o){t=o.msg||t;var e=$(o.renderTo),n=$('<div class="preloader-label"></div>'),i=$('<span class="preloader"></span>'),a=$('<span class="msg">'+t+"</span>");i.appendTo(n),a.appendTo(n),0===e.find(".preloader-label").length&&n.appendTo(e);var s=parseInt(a.width());n.css("width",s+25+1+"px")}else{t=o||t;var r=$('<div class="preloader-indicator-overlay"></div>'),c=$('<div class="preloader-indicator-modal"></div>'),i=$('<span class="preloader preloader-white"></span>'),a=$('<span class="msg">'+t+"</span>");i.appendTo(c),a.appendTo(c),r.appendTo($("body")),c.appendTo($("body"));var s=parseInt(c.width())/2,d=parseInt(c.height())/2;i.css("marginLeft",s-25+"px"),c.css({marginLeft:"-"+s+"px",marginTop:"-"+d+"px"})}}}},{}],6:[function(o,t,e){t.exports={init:function(o){var t=this,e=$("body"),n=function(){};this.winHeight=window.innerHeight,this.moveTimer=null,this._loadingTop=!1,this._loadingBottom=!1,this._enabledTop=!0,this._enabledBottom=!0,this._scrollToBottomHandler=o.scrollToBottom?o.scrollToBottom:n,this._scrollToTopHandler=o.scrollToTop?o.scrollToTop:n,this._scrollMore10pxHandler=o.scrollEvent?o.scrollEvent:n,e.on("touchstart touchmove",function(o){switch(o.type){case"touchstart":t._startHandler(o);break;case"touchmove":t._moveHandler(o)}})},_startHandler:function(o){this._startY=o.touches[0].pageY},_moveHandler:function(o){var t=this,e=t._startY,n=e-o.touches[0].pageY;Math.abs(n)<10||t._loadingTop&&0>n||t._loadingBottom&&n>0||t.moveTimer||(t.moveTimer=setTimeout(function(){var o=document.body.scrollHeight,e=window.pageYOffset||document.body.scrollTop||document.documentElement.scrollTop,i=10;t._enabledBottom&&n>10&&i+e+t.winHeight>=o?(t._loadingBottom=!0,t._scrollToBottomHandler(),$(window).scrollTop(e+50)):t._enabledTop&&-10>n&&0>=e?(t._loadingTop=!0,t._scrollToTopHandler()):(n>10||-10>n)&&t._scrollMore10pxHandler(n),t.moveTimer=null,clearTimeout(t.moveTimer)},200))},after:function(o){"top"==o?this._loadingTop=!1:this._loadingBottom=!1},stop:function(o){"top"==o?(this._loadingTop=!1,this._enabledTop=!1):(this._loadingBottom=!1,this._enabledBottom=!1)},reopen:function(o){"undefined"==typeof o?(this._enabledTop=!0,this._enabledBottom=!0):"top"==o?this._enabledTop=!0:this._enabledBottom=!0}}},{}],7:[function(o,t,e){t.exports={_getNodata:function(){if(!$(".g-nodata").length){var o='<div class="g-nodata">';o+='<i class="iconfont icon-warn"></i><div></div>',o+="</div>",$("body").append(o)}return $(".g-nodata")},show:function(o){var t=this._getNodata();$(".g-nodata div").text(o||"还没有任何数据记录"),t.show()},hide:function(){var o=this._getNodata();o.hide()}}},{}],8:[function(o,t,e){var n=$("body"),i=$('<div class="dialog-overlay"></div>'),a=$('<div class="dialog"></div>');t.exports={_initModal:function(){i=$('<div class="dialog-overlay"></div>'),a=$('<div class="dialog dialog-no-buttons"></div>'),n.append(i),n.append(a)},_hide:function(){a.addClass("dialog-out"),i.removeClass("dialog-overlay-visible"),setTimeout(function(){i.remove(),a.remove()},200)},_show:function(){i.addClass("dialog-overlay-visible"),a.addClass("dialog-in")},_position:function(){var o=parseInt(a.height())/2;a.css("marginTop","-"+o+"px")},show:function(o){var t=this,e=$('<div class="dialog-inner"></div>');t._initModal();var n=o.text||"",i=o.title||"";msgType=o.type||"success",callback=o.callback||null,"success"===msgType&&""===i&&(i="成功"),"error"===msgType&&""===i&&(i="失败");var s=$('<div class="iconfont icon-'+msgType+'"></div>'),r=$('<div class="dialog-title">'+i+"</div>"),c=$('<div class="dialog-text">'+n+"</div>");e.append(s),e.append(r),e.append(c),a.append(e),setTimeout(function(){t._hide(),callback&&callback()},2e3),t._position(),t._show()}}},{}],9:[function(o,t,e){var n=o("../../common/utils");t.exports={init:function(){var o=new Headroom(document.querySelector("header"),{tolerance:5,offset:205,classes:{initial:"animated",pinned:"slideDown",unpinned:"slideUp"}});o.init();var t={};if(t=$.jPanelMenu({menu:".menu",panel:".page-content",beforeOpen:function(){$("#header").appendTo(".jPanelMenu-panel")},beforeClose:function(){$("#header").appendTo("body")}}),t.on(),n.isLogin()){var e=n.getCookie("nick_name");$(".menu-profile").attr("href","./profile.html"),$(".menu-profile .login-info").text(e)}}}},{"../../common/utils":2}],10:[function(o,t,e){var n={};n.socket=null,n.connect=function(o){if("WebSocket"in window)n.socket=new WebSocket(o);else{if(!("MozWebSocket"in window))return void console.log("Error: WebSocket is not supported by this browser.");n.socket=new MozWebSocket(o)}n.socket.onopen=function(){console.log("Info: WebSocket connection opened.")},n.socket.onclose=function(){console.log("Info: WebSocket closed.")},n.socket.onmessage=function(o){n.render(o.data)}},n.initialize=function(){"http:"==window.location.protocol?n.connect("ws://"+window.location.host+"/websocket/message"):n.connect("wss://"+window.location.host+"/websocket/message")},n.sendMessage=function(){var o=document.getElementById("chat").value;""!=o&&(n.socket.send(o),document.getElementById("chat").value="")},n.render=function(o){if(!$(".notice-bar")[0]){var t=$('<div class="notice-bar"></div>');$("body").append(t)}$(".notice-bar").html(o).addClass("notice-in"),setTimeout(function(){$(".notice-bar").removeClass("notice-in")},3e3)},t.exports=n},{}],11:[function(o,t,e){var n=o("../../common/utils"),i=o("../../common/apimap"),a=o("../../components/tips"),s=o("../../components/ajax"),r=o("../../components/loading/loading"),c=o("../../components/dialog/dialog");t.exports={init:function(){var o=this;$(document).on("tap",".g-yue",function(){if(!n.isLogin())return window.location.href="./login.html",!1;n.stopEventTap();var t=$(this).data("id"),e=$(this).data("uid"),i=['<div class="input-row">','<textarea class="ask-txa" id="askWords" placeholder="说点什么"></textarea>',"</div>"].join("");c.confirm({title:"回应这个邀约",body:i},function(){var n=$.trim($("#askWords").val());return""===n?(a.show({type:"error",title:"说点什么吧"}),!1):void o.sendAsk(t,e,n)})})},sendAsk:function(o,t,e){r.show(),s.post(i.requestDatingApi,{datingId:o,userId:t,message:e},function(o){r.hide(),a.show({type:"success",title:"发送成功，请耐心等待回音"})},function(o){r.hide(),a.show({type:"error",title:o.resultMsg})})}}},{"../../common/apimap":1,"../../common/utils":2,"../../components/ajax":3,"../../components/dialog/dialog":4,"../../components/loading/loading":5,"../../components/tips":8}],12:[function(o,t,e){$(function(){var t=o("../../common/utils"),e=o("../../common/apimap"),n=o("../../components/tips"),i=o("../../components/ajax"),a=o("../../components/nodata"),s=o("../../components/loading/loading"),r=o("../../mods/yue/yue"),c=o("../../mods/Nav/Nav"),d=o("../../components/mscroll"),l=o("../../mods/notice/notice"),p=1,u=!1,v=100,f={init:function(){var o=this;c.init(),s.show(),o.getData(function(){o.initEvent()})},initEvent:function(){var o=this;r.init(),l.initialize(),d.init({scrollToBottom:function(){return u?void d.stop():(p>1&&$("#loadmore").html(""),s.show({renderTo:"#loadmore"}),void o.getData(function(){d.after()}))}}),$(document).on("tap",".menu-filter",function(){t.stopEventTap(),$(".g-panel").addClass("open")}),$(document).on("tap",".tag-item",function(){t.stopEventTap();var e=$(this),n=e.data("val");e.hasClass("active")?(e.removeClass("active"),v=100):($(".tag-list .active").removeClass("active"),e.addClass("active"),v=n),$(".g-panel").removeClass("open"),o.switchTag()})},switchTag:function(){var o=this;p=1,u=!1,$(".list").html(""),$("#loadmore").html(""),a.hide(),$("body").scrollTop(0),d.reopen(),o.getData()},getData:function(o){var t=this,r={page:p};100!=v&&(r={page:p,type:"category",category:v}),i.get(e.listApi,r,function(e){if(s.hide(),e.result&&e.result.datingList){var i=e.result.datingList;0===i.length?(u=!0,1===p?a.show("暂时没什么约会，过会来看看吧~"):$("#loadmore").html("没有更多约会了~")):(t.renderData(i),$("#loadmore").html("上拉加载更多"),p++),o&&o()}else n.show({type:"error",title:"返回的数据格式有问题"})},function(o){s.hide(),a.show(o.resultMsg)})},renderData:function(o){var e={2:"icon-coffee",3:"icon-food",4:"icon-film",5:"icon-run",6:"icon-photo",7:"icon-badminton",8:"icon-riding",9:"icon-drive",1:"icon-lquote"},n={2:"喝咖啡/茶",3:"美食",4:"看电影",5:"跑步",6:"摄影",7:"羽毛球",8:"骑行",9:"自驾",1:"其他"},i={110100:"北京",310100:"上海",440100:"广州",440300:"深圳",330100:"杭州",510100:"成都"},a={1:"互联网/IT",2:"金融财务",3:"艺术/设计",4:"模特/演艺",5:"创业/投资",6:"摄影制作",7:"影视娱乐",8:"音乐/舞蹈",9:"广告传媒",10:"教育/体育"};$.each(o,function(t,s){var r=s.postUserInfo.sex,c=s.postUserInfo.birthday,d=s.datingInfo.datingTime||"",l=s.postUserInfo.cityId,p=s.postUserInfo.socialId,u=s.datingInfo.typeId;o[t].age=(new Date).getFullYear()-parseInt(c.substr(0,4)),o[t].sex="M"===r?"男":"女",""!==d?o[t].time=d.substr(0,10):o[t].time="随时",o[t].iconCls=e[u],o[t].typeName=n[u],o[t].city=i[l];var v="混"+a[p]+"圈";s.postUserInfo.career&&""!==s.postUserInfo.career&&(v+="的"+s.postUserInfo.career),o[t].profession=v});var s=t.template($("#listTmpl").html(),{list:o});$(".list").append(s)}};f.init()})},{"../../common/apimap":1,"../../common/utils":2,"../../components/ajax":3,"../../components/loading/loading":5,"../../components/mscroll":6,"../../components/nodata":7,"../../components/tips":8,"../../mods/Nav/Nav":9,"../../mods/notice/notice":10,"../../mods/yue/yue":11}]},{},[12]);