!function t(o,e,n){function i(s,r){if(!e[s]){if(!o[s]){var d="function"==typeof require&&require;if(!r&&d)return d(s,!0);if(a)return a(s,!0);var l=new Error("Cannot find module '"+s+"'");throw l.code="MODULE_NOT_FOUND",l}var c=e[s]={exports:{}};o[s][0].call(c.exports,function(t){var e=o[s][1][t];return i(e?e:t)},c,c.exports,t,o,e,n)}return e[s].exports}for(var a="function"==typeof require&&require,s=0;s<n.length;s++)i(n[s]);return i}({1:[function(t,o,e){var n=window.location.protocol+"//"+window.location.host+"/",i={loginApi:n+"open-api/login",registApi:n+"open-api/simple-regist",perfectApi:n+"action/user/update",provincesListApi:n+"open-api/query/provinces-list",citiesListApi:n+"open-api/query/cities-list",addressesListApi:n+"open-api/query/addresses-list",postDatingApi:n+"action/dating/post",requestDatingApi:n+"action/dating/request",acceptDatingApi:n+"action/dating/accept",listApi:n+"open-api/query/dating/dating-list"};o.exports=i},{}],2:[function(t,o,e){var n={getUrlParam:function(t){var o=new RegExp("[?|&]"+t+"=([^&]+)"),e=location.search.match(o);return e&&e[1]},stopEventTap:function(){var t=$('<div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 99999; "></div>');$("body").append(t),setTimeout(function(){t.remove()},500)},formatDate:function(t){"string"==typeof t&&(t=this.strToDate(t));var o=t.getFullYear(),e=t.getMonth()+1,n=t.getDate();return 10>e&&(e="0"+e),10>n&&(n="0"+n),o+"-"+e+"-"+n},strToDate:function(t){var o=t.replace(/-/g,"/");return new Date(o)},hideKeyboard:function(){var t=$('<a style="width: 0;height: 0;font-size: 0;display: block"></a>');$("body").append(t),t.focus(),setTimeout(function(){t.remove()},0)},isIOS:function(){var t=ua.match(/(iPad).*OS\s([\d_]+)/),o=ua.match(/(iPod)(.*OS\s([\d_]+))?/),e=!t&&ua.match(/(iPhone\sOS)\s([\d_]+)/);return t||e||o?!0:!1},isAndroid:function(){return ua.indexOf("Android")>-1},isWeixin:function(){return ua.indexOf("MicroMessenger")>-1},template:function(t,o){function e(t){if(!t)return"";var o={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&apos;"};return(""+t).replace(/[&<>"']/g,function(t){return o[t]})}var n,i={"'":"'","\\":"\\","\r":"r","\n":"n","	":"t","\u2028":"u2028","\u2029":"u2029"},a=/'|\\|\r|\n|\t|\u2028|\u2029/g,s=/<%-([\s\S]+?)%>|<%=([\s\S]+?)%>|<%([\s\S]+?)%>|$/g,r=0,d="__p+='";t.replace(s,function(o,n,s,l,c){return d+=t.slice(r,c).replace(a,function(t){return"\\"+i[t]}),n&&(d+="'+\n((__t=("+n+"))==null?'':"+e.name+"(__t))+\n'"),s&&(d+="'+\n((__t=("+s+"))==null?'':__t)+\n'"),l&&(d+="';\n"+l+"\n__p+='"),r=c+o.length,o}),d+="';\n",d="with(obj||{}){\n"+d+"}\n",d=e.toString()+"var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+d+"return __p;\n";try{n=new Function("obj",d)}catch(l){throw l.source=d,l}if(o)return n(o);var c=function(t){return n(t)};return c.source="function(obj){\n"+d+"}",c}};o.exports=n},{}],3:[function(t,o,e){var n=function(t){1==t.isRedirect&&setTimeout(function(){window.location.href=t.redirectURL},2e3)};o.exports={post:function(t,o,e,i){$.ajax({url:t,data:o,type:"post",dataType:"json",success:function(t){n(t),"SUCCESS"===t.resultCode?e(t):i(t)},error:function(t){var o=(t.status||500,"对不起，服务器正在维护，请稍后再试...");switch(t.status){case 404:o="对不起，你访问的接口不存在...";break;case 403:o="对不起，你没有权限访问该接口...";break;case 500:o="对不起，正在进行服务器维护，请稍后再来...";break;case 502:o="对不起，你访问的接口程序出错...";break;case 503:o="对不起，你访问的接口后端异常...";break;default:o="对不起，服务器正在维护，请稍后再试..."}var t={isRedirect:!1,result:{},resultCode:"SERVER ERROR",resultMsg:o};i(t)}})},get:function(t,o,e,i){$.ajax({url:t,data:o,type:"get",dataType:"json",success:function(t){n(t),"SUCCESS"===t.resultCode?e(t):i(t)},error:function(t){var o=(t.status||500,"对不起，服务器正在维护，请稍后再试...");switch(t.status){case 404:o="对不起，你访问的接口不存在...";break;case 403:o="对不起，你没有权限访问该接口...";break;case 500:o="对不起，正在进行服务器维护，请稍后再来...";break;case 502:o="对不起，你访问的接口程序出错...";break;case 503:o="对不起，你访问的接口后端异常...";break;default:o="对不起，服务器正在维护，请稍后再试..."}var t={isRedirect:!1,result:{},resultCode:"ERROR",resultMsg:o};i(t)}})}}},{}],4:[function(t,o,e){var n=$("body"),i=$('<div class="dialog-overlay"></div>'),a=$('<div class="dialog"></div>');o.exports={_stopEventTap:function(){var t=$('<div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 99999; "></div>');$("body").append(t),setTimeout(function(){t.remove()},350)},_initModal:function(){i=$('<div class="dialog-overlay"></div>'),a=$('<div class="dialog"></div>'),n.append(i),n.append(a)},_initEvent:function(){var t=this;$(".dialog-overlay").one("touchend",function(o){o.preventDefault(),t._stopEventTap(),t.hide()})},hide:function(){a.addClass("dialog-out"),i.removeClass("dialog-overlay-visible"),setTimeout(function(){i.remove(),a.remove()},200)},show:function(){i.addClass("dialog-overlay-visible"),a.addClass("dialog-in")},_position:function(){var t=parseInt(a.height())/2;a.css("marginTop","-"+t+"px")},alert:function(t,o){var e=this,n=$('<div class="dialog-inner"></div>');e._initModal();var i=t,s="温馨提示";"object"==typeof t&&t.title&&(i=t.body||"",s=t.title);var r=$('<div class="dialog-title">'+s+"</div>"),d=$('<div class="dialog-text">'+i+"</div>");n.append(r),n.append(d),a.append(n);var l=$('<div class="dialog-buttons"></div>'),c=$('<span class="dialog-button">确定</span>');l.append(c),a.append(l),c.on("click",function(){e.hide(),o&&o()}),e._position(),e.show()},confirm:function(t,o,e){var n=this,i=$('<div class="dialog-inner"></div>');n._initModal(),n._initEvent();var s={title:"温馨提示",body:"object"==typeof t?"":t,okText:"确定",cancelText:"取消"};"object"==typeof t&&(s=$.extend(s,t));var r=$('<div class="dialog-title">'+s.title+"</div>"),d=$('<div class="dialog-text">'+s.body+"</div>");i.append(r),i.append(d),a.append(i);var l=$('<div class="dialog-buttons"></div>'),c=$('<span class="dialog-button">'+s.cancelText+"</span>");$close=$('<span class="dialog-button">'+s.okText+"</span>"),l.append(c),l.append($close),a.append(l),c.on("click",function(){e&&e(),n.hide()}),$close.on("click",function(){o&&o(),n.hide()}),n._position(),n.show()}}},{}],5:[function(t,o,e){o.exports={hide:function(){$(".preloader-indicator-overlay, .preloader-indicator-modal, .preloader-label").remove()},show:function(t){var o="数据加载中...";if("object"==typeof t){o=t.msg||o;var e=$(t.renderTo),n=$('<div class="preloader-label"></div>'),i=$('<span class="preloader"></span>'),a=$('<span class="msg">'+o+"</span>");i.appendTo(n),a.appendTo(n),0===e.find(".preloader-label").length&&n.appendTo(e);var s=parseInt(a.width());n.css("width",s+25+1+"px")}else{o=t||o;var r=$('<div class="preloader-indicator-overlay"></div>'),d=$('<div class="preloader-indicator-modal"></div>'),i=$('<span class="preloader preloader-white"></span>'),a=$('<span class="msg">'+o+"</span>");i.appendTo(d),a.appendTo(d),r.appendTo($("body")),d.appendTo($("body"));var s=parseInt(d.width())/2,l=parseInt(d.height())/2;i.css("marginLeft",s-25+"px"),d.css({marginLeft:"-"+s+"px",marginTop:"-"+l+"px"})}}}},{}],6:[function(t,o,e){o.exports={init:function(t){var o=this,e=$("body"),n=function(){};this.winHeight=window.innerHeight,this.moveTimer=null,this._loadingTop=!1,this._loadingBottom=!1,this._enabledTop=!0,this._enabledBottom=!0,this._scrollToBottomHandler=t.scrollToBottom?t.scrollToBottom:n,this._scrollToTopHandler=t.scrollToTop?t.scrollToTop:n,this._scrollMore10pxHandler=t.scrollEvent?t.scrollEvent:n,e.on("touchstart touchmove",function(t){switch(t.type){case"touchstart":o._startHandler(t);break;case"touchmove":o._moveHandler(t)}})},_startHandler:function(t){this._startY=t.touches[0].pageY},_moveHandler:function(t){var o=this,e=o._startY,n=e-t.touches[0].pageY;Math.abs(n)<10||o._loadingTop&&0>n||o._loadingBottom&&n>0||o.moveTimer||(o.moveTimer=setTimeout(function(){var t=document.body.scrollHeight,e=window.pageYOffset||document.body.scrollTop||document.documentElement.scrollTop,i=10;o._enabledBottom&&n>10&&i+e+o.winHeight>=t?(o._loadingBottom=!0,o._scrollToBottomHandler(),$(window).scrollTop(e+50)):o._enabledTop&&-10>n&&0>=e?(o._loadingTop=!0,o._scrollToTopHandler()):(n>10||-10>n)&&o._scrollMore10pxHandler(n),o.moveTimer=null,clearTimeout(o.moveTimer)},200))},after:function(t){"top"==t?this._loadingTop=!1:this._loadingBottom=!1},stop:function(t){"top"==t?(this._loadingTop=!1,this._enabledTop=!1):(this._loadingBottom=!1,this._enabledBottom=!1)},reopen:function(t){"undefined"==typeof t?(this._enabledTop=!0,this._enabledBottom=!0):"top"==t?this._enabledTop=!0:this._enabledBottom=!0}}},{}],7:[function(t,o,e){o.exports={_getNodata:function(){if(!$(".g-nodata").length){var t='<div class="g-nodata">';t+='<i class="iconfont icon-nodata"></i><div></div>',t+="</div>",$("body").append(t)}return $(".g-nodata")},show:function(t){var o=this._getNodata();$(".g-nodata div").text(t||"还没有任何数据记录"),o.show()},hide:function(){var t=this._getNodata();t.hide()}}},{}],8:[function(t,o,e){var n=$("body"),i=$('<div class="dialog-overlay"></div>'),a=$('<div class="dialog"></div>');o.exports={_initModal:function(){i=$('<div class="dialog-overlay"></div>'),a=$('<div class="dialog dialog-no-buttons"></div>'),n.append(i),n.append(a)},_hide:function(){a.addClass("dialog-out"),i.removeClass("dialog-overlay-visible"),setTimeout(function(){i.remove(),a.remove()},200)},_show:function(){i.addClass("dialog-overlay-visible"),a.addClass("dialog-in")},_position:function(){var t=parseInt(a.height())/2;a.css("marginTop","-"+t+"px")},show:function(t){var o=this,e=$('<div class="dialog-inner"></div>');o._initModal();var n=t.text||"",i=t.title||"";msgType=t.type||"success",callback=t.callback||null,"success"===msgType&&""===i&&(i="成功"),"error"===msgType&&""===i&&(i="失败");var s=$('<div class="iconfont icon-'+msgType+'"></div>'),r=$('<div class="dialog-title">'+i+"</div>"),d=$('<div class="dialog-text">'+n+"</div>");e.append(s),e.append(r),e.append(d),a.append(e),setTimeout(function(){o._hide(),callback&&callback()},2e3),o._position(),o._show()}}},{}],9:[function(t,o,e){var n=t("../../components/dialog/dialog");o.exports={init:function(){$(document).on("tap",".g-yue",function(){var t=['<div class="input-row">','<textarea class="ask-txa" placeholder="说点什么"></textarea>',"</div>"].join("");n.confirm({title:"回应这个邀约",body:t},function(){})})},sendAsk:function(){}}},{"../../components/dialog/dialog":4}],10:[function(t,o,e){$(function(){var o=t("../../common/utils"),e=t("../../common/apimap"),n=t("../../components/tips"),i=t("../../components/ajax"),a=t("../../components/nodata"),s=t("../../components/loading/loading"),r=t("../../mods/yue/yue"),d=t("../../components/mscroll"),l=1,c=!1,p=100,u={init:function(){var t=this;s.show(),t.getData(function(){t.initEvent()})},initEvent:function(){var t=this;r.init(),d.init({scrollToBottom:function(){return c?void d.stop():(l>1&&$("#loadmore").html(""),s.show({renderTo:"#loadmore"}),void t.getData(function(){d.after()}))}}),$(document).on("tap",".btn-filter",function(){o.stopEventTap(),$(".g-panel").addClass("open")}),$(document).on("tap",".tag-item",function(){o.stopEventTap();var e=$(this),n=e.data("val");e.hasClass("active")?(e.removeClass("active"),p=100):($(".tag-list .active").removeClass("active"),e.addClass("active"),p=n),$(".g-panel").removeClass("open"),t.switchTag()})},switchTag:function(){var t=this;l=1,c=!1,$(".list").html(""),$("#loadmore").html(""),a.hide(),$("body").scrollTop(0),d.reopen(),t.getData()},getData:function(t){var o=this,r={page:l};100!=p&&(r={page:l,type:"category",category:p}),i.get(e.listApi,r,function(e){if(s.hide(),e.result&&e.result.datingList){var i=e.result.datingList;0===i.length?(c=!0,1===l?a.show("现在暂时没什么约会，过会来看看吧~"):$("#loadmore").html("没有更多约会了~")):(o.renderData(i),$("#loadmore").html("上拉加载更多"),l++),t&&t()}else n.show({type:"error",title:"返回的数据格式有问题"})},function(t){s.hide(),a.show(t.resultMsg)})},renderData:function(t){var e={2:"icon-coffee",3:"icon-food",4:"icon-film",5:"icon-run",6:"icon-photo",7:"icon-badminton",8:"icon-riding",9:"icon-drive",1:"icon-lquote"},n={2:"喝咖啡/茶",3:"美食",4:"看电影",5:"跑步",6:"摄影",7:"羽毛球",8:"骑行",9:"自驾",1:"其他"},i={110100:"北京",310100:"上海",440100:"广州",440300:"深圳",330100:"杭州",510100:"成都"},a={1:"互联网/IT",2:"金融财务",3:"艺术/设计",4:"模特/演艺",5:"创业/投资",6:"摄影制作",7:"影视娱乐",8:"音乐/舞蹈",9:"广告传媒",10:"教育/体育"};$.each(t,function(o,s){var r=s.postUserInfo.sex,d=s.postUserInfo.birthday,l=s.datingTime||"",c=s.postUserInfo.cityId,p=s.postUserInfo.socialId,u=s.typeId;t[o].age=(new Date).getFullYear()-parseInt(d.substr(0,4)),t[o].sex="M"===r?"男":"女",""!==l&&(t[o].time=l.substr(0,10)),t[o].iconCls=e[u],t[o].typeName=n[u],t[o].city=i[c];var v="混"+a[p]+"圈";s.postUserInfo.career&&""!==s.postUserInfo.career&&(v+="的"+s.postUserInfo.career),t[o].profession=v});var s=o.template($("#listTmpl").html(),{list:t});$(".list").append(s)}};u.init()})},{"../../common/apimap":1,"../../common/utils":2,"../../components/ajax":3,"../../components/loading/loading":5,"../../components/mscroll":6,"../../components/nodata":7,"../../components/tips":8,"../../mods/yue/yue":9}]},{},[10]);