!function e(t,a,n){function i(r,s){if(!a[r]){if(!t[r]){var c="function"==typeof require&&require;if(!s&&c)return c(r,!0);if(o)return o(r,!0);var l=new Error("Cannot find module '"+r+"'");throw l.code="MODULE_NOT_FOUND",l}var d=a[r]={exports:{}};t[r][0].call(d.exports,function(e){var a=t[r][1][e];return i(a?a:e)},d,d.exports,e,t,a,n)}return a[r].exports}for(var o="function"==typeof require&&require,r=0;r<n.length;r++)i(n[r]);return i}({1:[function(e,t,a){var n=window.location.protocol+"//"+window.location.host+"/";"w.yuema.us"===window.location.hostname&&(n=window.location.protocol+"//www.yuema.us/");var i={loginApi:n+"open-api/login",registApi:n+"open-api/simple-regist",perfectApi:n+"action/user/update",provincesListApi:n+"open-api/query/provinces-list",citiesListApi:n+"open-api/query/cities-list",addressesListApi:n+"open-api/query/addresses-list",postDatingApi:n+"action/dating/post",requestDatingApi:n+"action/dating/request",acceptDatingApi:n+"action/dating/accept",listApi:n+"open-api/query/dating/dating-list",profileApi:n+"open-api/query/home-info"};t.exports=i},{}],2:[function(e,t,a){var n={getUrlParam:function(e){var t=new RegExp("[?|&]"+e+"=([^&]+)"),a=location.search.match(t);return a&&a[1]},stopEventTap:function(){var e=$('<div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 99999; "></div>');$("body").append(e),setTimeout(function(){e.remove()},500)},formatDate:function(e){"string"==typeof e&&(e=this.strToDate(e));var t=e.getFullYear(),a=e.getMonth()+1,n=e.getDate();return 10>a&&(a="0"+a),10>n&&(n="0"+n),t+"-"+a+"-"+n},strToDate:function(e){var t=e.replace(/-/g,"/");return new Date(t)},hideKeyboard:function(){var e=$('<a style="width: 0;height: 0;font-size: 0;display: block"></a>');$("body").append(e),e.focus(),setTimeout(function(){e.remove()},0)},getNetworkState:function(){var e=150,t=!1;if(window.performance){var a=window.performance.timing,n=a.responseEnd-a.domainLookupStart;t=n>e?!1:!0}return t},isIOS:function(){var e=ua.match(/(iPad).*OS\s([\d_]+)/),t=ua.match(/(iPod)(.*OS\s([\d_]+))?/),a=!e&&ua.match(/(iPhone\sOS)\s([\d_]+)/);return e||a||t?!0:!1},isAndroid:function(){return ua.indexOf("Android")>-1},isWeixin:function(){return ua.indexOf("MicroMessenger")>-1},isLogin:function(){return ua.indexOf("MicroMessenger")>-1},template:function(e,t){function a(e){if(!e)return"";var t={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&apos;"};return(""+e).replace(/[&<>"']/g,function(e){return t[e]})}var n,i={"'":"'","\\":"\\","\r":"r","\n":"n","	":"t","\u2028":"u2028","\u2029":"u2029"},o=/'|\\|\r|\n|\t|\u2028|\u2029/g,r=/<%-([\s\S]+?)%>|<%=([\s\S]+?)%>|<%([\s\S]+?)%>|$/g,s=0,c="__p+='";e.replace(r,function(t,n,r,l,d){return c+=e.slice(s,d).replace(o,function(e){return"\\"+i[e]}),n&&(c+="'+\n((__t=("+n+"))==null?'':"+a.name+"(__t))+\n'"),r&&(c+="'+\n((__t=("+r+"))==null?'':__t)+\n'"),l&&(c+="';\n"+l+"\n__p+='"),s=d+t.length,t}),c+="';\n",c="with(obj||{}){\n"+c+"}\n",c=a.toString()+"var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+c+"return __p;\n";try{n=new Function("obj",c)}catch(l){throw l.source=c,l}if(t)return n(t);var d=function(e){return n(e)};return d.source="function(obj){\n"+c+"}",d}};t.exports=n},{}],3:[function(e,t,a){var n=function(e){1==e.isRedirect&&setTimeout(function(){window.location.href=e.redirectURL},2e3)};t.exports={post:function(e,t,a,i){$.ajax({url:e,data:t,type:"post",dataType:"json",success:function(e){n(e),"SUCCESS"===e.resultCode?a(e):i(e)},error:function(e){var t=(e.status||500,"对不起，服务器正在维护，请稍后再试...");switch(e.status){case 404:t="对不起，你访问的接口不存在...";break;case 403:t="对不起，你没有权限访问该接口...";break;case 500:t="对不起，正在进行服务器维护，请稍后再来...";break;case 502:t="对不起，你访问的接口程序出错...";break;case 503:t="对不起，你访问的接口后端异常...";break;default:t="对不起，服务器正在维护，请稍后再试..."}var e={isRedirect:!1,result:{},resultCode:"SERVER ERROR",resultMsg:t};i(e)}})},get:function(e,t,a,i){$.ajax({url:e,data:t,type:"get",dataType:"json",success:function(e){n(e),"SUCCESS"===e.resultCode?a(e):i(e)},error:function(e){var t=(e.status||500,"对不起，服务器正在维护，请稍后再试...");switch(e.status){case 404:t="对不起，你访问的接口不存在...";break;case 403:t="对不起，你没有权限访问该接口...";break;case 500:t="对不起，正在进行服务器维护，请稍后再来...";break;case 502:t="对不起，你访问的接口程序出错...";break;case 503:t="对不起，你访问的接口后端异常...";break;default:t="对不起，服务器正在维护，请稍后再试..."}var e={isRedirect:!1,result:{},resultCode:"ERROR",resultMsg:t};i(e)}})}}},{}],4:[function(e,t,a){function n(e){var t={container:"body",checkIntime:!0,handAllResult:function(){console.log(0)},handFieldResult:function(){console.log(1)}},a=this;$.extend(t,e||{}),this.$root=$(t.container),t.checkIntime&&a.$root.on("blur","[data-rule]",function(){var e=$(this);a.checkField(e)}),this.errors=[],this._isNeedCheck=function(e){var t=e.attr("data-check");e.attr("id");e.val();var a=e.attr("data-rule").indexOf("require")<0&&""==e.val();return"false"==t||0==t||a?!1:!0},this._check=function(e){var t=this,a=e.val().replace(/(^\s*)|(\s*$)/g,""),n=(e.attr("id"),e.attr("data-rule")),o=e.attr("data-msg"),r=e.attr("data-min"),s=e.attr("data-max"),c=e.attr("data-minlength"),l=e.attr("data-maxlength"),d=e.attr("data-compare"),u=e.attr("data-pattern"),p=n.split("|");for(var f in p){var v=p[f];if(i[v]){var h=i[v].test(a);if(t._handResult(e,o,h,v),0==h)return!1}}if(u){var m=new RegExp(u),h=m.test(a);if(t._handResult(e,o,h,"pattern"),0==h)return!1}if(r){r=parseFloat(r),a=parseFloat(a);var h=a>=r;if(t._handResult(e,o,h,"min"),0==h)return!1}if(s){s=parseFloat(s),a=parseFloat(a);var h=s>=a;if(t._handResult(e,o,h,"max"),0==h)return!1}if(c){c=parseInt(c,10),a=a.length;var h=a>=c;if(t._handResult(e,o,h,"minlength"),0==h)return!1}if(l){l=parseInt(l,10),a=a.length;var h=l>=a;if(t._handResult(e,o,h,"maxlength"),0==h)return!1}if(d){var g=d.split("|");if(2!=g.length)throw"错误的配置";var w=$("#"+g[1]).val()||g[1],y=g[0],_=e.attr("type");switch("number"==_&&(a=parseFloat(a),w=parseFloat(w)),("date"==_||"datetime-local"==_)&&(a=a.replace("T"," "),a=a.replace("z","")+":00",a=new Date(a.replace(/-/g,"/")),w=w.replace("T"," "),w=w.replace("z","")+":00",w=new Date(w.replace(/-/g,"/"))),y){case">":var h=a>w;break;case"<":var h=w>a;break;case"=":var h=a==w;break;case">=":var h=a>=w;break;case"<=":var h=w>=a}if(t._handResult(e,o,h,"compare"),0==h)return!1}return!0},this._handResult=function(e,t,a,n){this._handFieldMsg(e,t,!a,n),a||this.errors.push({elem:e,msg:t,type:n})},this._handAllMsgs=function(){this.errors.length&&t.handAllResult(this.errors)},this._handFieldMsg=function(e,a,n,i){t.handFieldResult(e,a,n,i)},"undefined"==typeof n._initialized&&(n.prototype.checkField=function(e){return"string"==typeof e&&(e=$(e)),0!=a._isNeedCheck(e)?a._check(e):void 0},n.prototype.checkAll=function(){return a.errors=[],this.$root.find("[data-rule]").each(function(){var e=$(this);e.attr("id");0!=a._isNeedCheck(e)&&a._check(e)}),a._handAllMsgs(),a.errors.length?!1:!0}),n._initialized=!0}var i={require:/[^(^\s*)|(\s*$)]/,email:/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,phone:/^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/,mobile:/^[1][3,4,5,6,7,8,9][0-9]{9}$/,alipay:/(^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$)|(^1\d{10}$)/,id:/^\d{6}(18|19|20)\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i,currency:/^\d+(\.\d+)?$/,number:/^\d+$/,zip:/^[0-9]\d{5}$/,ip:/^[\d\.]{7,15}$/,price:/^\d+(\.\d{1,2})?$/,discount:/^(\d\.\d)$/,integer:/^[-\+]?\d+$/,english:/^[A-Za-z]+$/,chinese:/^[\u0391-\uFFE5]+$/,userName:/^[A-Za-z0-9_]{3,}$/i,nickname:/^[A-Za-z\u0391-\uFFE5][A-Za-z0-9\u0391-\uFFE5]{3,19}$/i,unSafe:/^(([^\^\.<>,;=?$"':#@！，。；《》｛｝【】￥…\]\[{}`])*)$/};t.exports=n},{}],5:[function(e,t,a){t.exports={hide:function(){$(".preloader-indicator-overlay, .preloader-indicator-modal, .preloader-label").remove()},show:function(e){var t="数据加载中...";if("object"==typeof e){t=e.msg||t;var a=$(e.renderTo),n=$('<div class="preloader-label"></div>'),i=$('<span class="preloader"></span>'),o=$('<span class="msg">'+t+"</span>");i.appendTo(n),o.appendTo(n),0===a.find(".preloader-label").length&&n.appendTo(a);var r=parseInt(o.width());n.css("width",r+25+1+"px")}else{t=e||t;var s=$('<div class="preloader-indicator-overlay"></div>'),c=$('<div class="preloader-indicator-modal"></div>'),i=$('<span class="preloader preloader-white"></span>'),o=$('<span class="msg">'+t+"</span>");i.appendTo(c),o.appendTo(c),s.appendTo($("body")),c.appendTo($("body"));var r=parseInt(c.width())/2,l=parseInt(c.height())/2;i.css("marginLeft",r-25+"px"),c.css({marginLeft:"-"+r+"px",marginTop:"-"+l+"px"})}}}},{}],6:[function(e,t,a){var n=$("body"),i=$('<div class="dialog-overlay"></div>'),o=$('<div class="dialog"></div>');t.exports={_initModal:function(){i=$('<div class="dialog-overlay"></div>'),o=$('<div class="dialog dialog-no-buttons"></div>'),n.append(i),n.append(o)},_hide:function(){o.addClass("dialog-out"),i.removeClass("dialog-overlay-visible"),setTimeout(function(){i.remove(),o.remove()},200)},_show:function(){i.addClass("dialog-overlay-visible"),o.addClass("dialog-in")},_position:function(){var e=parseInt(o.height())/2;o.css("marginTop","-"+e+"px")},show:function(e){var t=this,a=$('<div class="dialog-inner"></div>');t._initModal();var n=e.text||"",i=e.title||"";msgType=e.type||"success",callback=e.callback||null,"success"===msgType&&""===i&&(i="成功"),"error"===msgType&&""===i&&(i="失败");var r=$('<div class="iconfont icon-'+msgType+'"></div>'),s=$('<div class="dialog-title">'+i+"</div>"),c=$('<div class="dialog-text">'+n+"</div>");a.append(r),a.append(s),a.append(c),o.append(a),setTimeout(function(){t._hide(),callback&&callback()},2e3),t._position(),t._show()}}},{}],7:[function(e,t,a){var n=e("../../common/utils"),i=e("../../common/apimap"),o=e("../../components/loading/loading"),r=e("../../components/tips"),s=e("../../components/formvalid"),c=e("../../components/ajax");$(function(){var e=new s({container:".fm",checkIntime:!1,handAllResult:function(e){if(e.length){var t=$(e[0].elem),a=e[0].type||"require",n=t.data(a+"-msg");r.show({type:"error",title:n})}},handFieldResult:function(e,t,a){}}),t={},a={init:function(){this.initEvent()},initEvent:function(){var t=this;$(".file-upload").on("change",function(){$("#formFile")[0].submit()}),$(".sex-item").on("tap",function(){if(!$(this).hasClass("selected")){var e=$(this).data("val");$(".sex-row .selected").removeClass("selected"),$(this).addClass("selected"),$("#sex").val(e)}}),$(document).on("tap","#chooseCity",function(){n.stopEventTap(),$(".city-panel").addClass("open")}),$(document).on("tap",".city-item",function(){n.stopEventTap();var e=$(this),t=e.text(),a=e.data("val");e.hasClass("active")||($(".city-list .active").removeClass("active"),e.addClass("active"),$("#chooseCity").text(t),$("#cityId").val(a)),$(".city-panel").removeClass("open")}),$(document).on("tap","#chooseQz",function(){n.stopEventTap(),$(".qz-panel").addClass("open")}),$(document).on("tap",".qz-item",function(){n.stopEventTap();var e=$(this),t=e.text(),a=e.data("val");e.hasClass("active")||($(".qz-list .active").removeClass("active"),e.addClass("active"),$("#chooseQz").text(t),$("#socialId").val(a)),$(".qz-panel").removeClass("open")}),$("#save").on("tap",function(){var a=($(this),e.checkAll());return a?void t.setSubmitData():void console.log("表单验证不通过")})},setSubmitData:function(){var e=this;$(".fm").find("[data-submit]").each(function(){var e=$(this),a=e.data("submit"),n=e.attr("id"),i=e.val();("true"==a||1==a)&&(t[n]=i)}),console.log("setSubmitData",t),e.doSubmit()},doSubmit:function(){o.show(),c.post(i.perfectApi,{userInfo:JSON.stringify(t)},function(e){o.hide(),r.show({type:"success",title:"保存成功"}),setTimeout(function(){window.location.href="./profile.html"},500)},function(e){o.hide(),r.show({type:"error",title:e.resultMsg})})}};a.init()})},{"../../common/apimap":1,"../../common/utils":2,"../../components/ajax":3,"../../components/formvalid":4,"../../components/loading/loading":5,"../../components/tips":6}]},{},[7]);