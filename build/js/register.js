!function t(e,n,i){function r(o,s){if(!n[o]){if(!e[o]){var c="function"==typeof require&&require;if(!s&&c)return c(o,!0);if(a)return a(o,!0);var u=new Error("Cannot find module '"+o+"'");throw u.code="MODULE_NOT_FOUND",u}var l=n[o]={exports:{}};e[o][0].call(l.exports,function(t){var n=e[o][1][t];return r(n?n:t)},l,l.exports,t,e,n,i)}return n[o].exports}for(var a="function"==typeof require&&require,o=0;o<i.length;o++)r(i[o]);return r}({1:[function(t,e,n){var i=window.location.protocol+"//"+window.location.host+"/",r={loginApi:i+"open-api/login",registApi:i+"open-api/regist",provincesListApi:i+"open-api/get/provinces-list",citiesListApi:i+"open-api/get/cities-list",addressesListApi:i+"open-api/get/addresses-list",postDatingApi:i+"action/post/dating",requestDatingApi:i+"action/request/dating",acceptDatingApi:i+"action/accept/dating",listApi:i+"open-api/query/dating/dating-list"};e.exports=r},{}],2:[function(t,e,n){var i={getUrlParam:function(t){var e=new RegExp("[?|&]"+t+"=([^&]+)"),n=location.search.match(e);return n&&n[1]},stopEventTap:function(){var t=$('<div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 99999; "></div>');$("body").append(t),setTimeout(function(){t.remove()},500)},formatDate:function(t){"string"==typeof t&&(t=this.strToDate(t));var e=t.getFullYear(),n=t.getMonth()+1,i=t.getDate();return 10>n&&(n="0"+n),10>i&&(i="0"+i),e+"-"+n+"-"+i},strToDate:function(t){var e=t.replace(/-/g,"/");return new Date(e)},hideKeyboard:function(){var t=$('<a style="width: 0;height: 0;font-size: 0;display: block"></a>');$("body").append(t),t.focus(),setTimeout(function(){t.remove()},0)},isIOS:function(){var t=ua.match(/(iPad).*OS\s([\d_]+)/),e=ua.match(/(iPod)(.*OS\s([\d_]+))?/),n=!t&&ua.match(/(iPhone\sOS)\s([\d_]+)/);return t||n||e?!0:!1},isAndroid:function(){return ua.indexOf("Android")>-1},isWeixin:function(){return ua.indexOf("MicroMessenger")>-1},template:function(t,e){function n(t){if(!t)return"";var e={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&apos;"};return(""+t).replace(/[&<>"']/g,function(t){return e[t]})}var i,r={"'":"'","\\":"\\","\r":"r","\n":"n","	":"t","\u2028":"u2028","\u2029":"u2029"},a=/'|\\|\r|\n|\t|\u2028|\u2029/g,o=/<%-([\s\S]+?)%>|<%=([\s\S]+?)%>|<%([\s\S]+?)%>|$/g,s=0,c="__p+='";t.replace(o,function(e,i,o,u,l){return c+=t.slice(s,l).replace(a,function(t){return"\\"+r[t]}),i&&(c+="'+\n((__t=("+i+"))==null?'':"+n.name+"(__t))+\n'"),o&&(c+="'+\n((__t=("+o+"))==null?'':__t)+\n'"),u&&(c+="';\n"+u+"\n__p+='"),s=l+e.length,e}),c+="';\n",c="with(obj||{}){\n"+c+"}\n",c=n.toString()+"var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+c+"return __p;\n";try{i=new Function("obj",c)}catch(u){throw u.source=c,u}if(e)return i(e);var l=function(t){return i(t)};return l.source="function(obj){\n"+c+"}",l}};e.exports=i},{}],3:[function(t,e,n){var i=function(t){1==t.isRedirect&&setTimeout(function(){window.location.href=t.redirectURL},2e3)};e.exports={post:function(t,e,n,r){$.ajax({url:t,data:e,type:"post",dataType:"json",success:function(t){i(t),"SUCCESS"===t.resultCode?n(t):r(t)},error:function(t){var e=(t.status||500,"对不起，服务器正在维护，请稍后再试...");switch(t.status){case 404:e="对不起，你访问的接口不存在...";break;case 403:e="对不起，你没有权限访问该接口...";break;case 500:e="对不起，正在进行服务器维护，请稍后再来...";break;case 502:e="对不起，你访问的接口程序出错...";break;case 503:e="对不起，你访问的接口后端异常...";break;default:e="对不起，服务器正在维护，请稍后再试..."}var t={isRedirect:!1,result:{},resultCode:"SERVER ERROR",resultMsg:e};r(t)}})},get:function(t,e,n,r){$.ajax({url:t,data:e,type:"get",dataType:"json",success:function(t){i(t),"SUCCESS"===t.resultCode?n(t):r(t)},error:function(t){var e=(t.status||500,"对不起，服务器正在维护，请稍后再试...");switch(t.status){case 404:e="对不起，你访问的接口不存在...";break;case 403:e="对不起，你没有权限访问该接口...";break;case 500:e="对不起，正在进行服务器维护，请稍后再来...";break;case 502:e="对不起，你访问的接口程序出错...";break;case 503:e="对不起，你访问的接口后端异常...";break;default:e="对不起，服务器正在维护，请稍后再试..."}var t={isRedirect:!1,result:{},resultCode:"ERROR",resultMsg:e};r(t)}})}}},{}],4:[function(t,e,n){function i(t){var e={container:"body",checkIntime:!0,handAllResult:function(){console.log(0)},handFieldResult:function(){console.log(1)}},n=this;$.extend(e,t||{}),this.$root=$(e.container),e.checkIntime&&n.$root.on("blur","[data-rule]",function(){var t=$(this);n.checkField(t)}),this.errors=[],this._isNeedCheck=function(t){var e=t.attr("data-check");t.attr("id");t.val();var n=t.attr("data-rule").indexOf("require")<0&&""==t.val();return"false"==e||0==e||n?!1:!0},this._check=function(t){var e=this,n=t.val().replace(/(^\s*)|(\s*$)/g,""),i=(t.attr("id"),t.attr("data-rule")),a=t.attr("data-msg"),o=t.attr("data-min"),s=t.attr("data-max"),c=t.attr("data-minlength"),u=t.attr("data-maxlength"),l=t.attr("data-compare"),d=t.attr("data-pattern"),p=i.split("|");for(var f in p){var h=p[f];if(r[h]){var v=r[h].test(n);if(e._handResult(t,a,v,h),0==v)return!1}}if(d){var g=new RegExp(d),v=g.test(n);if(e._handResult(t,a,v,"pattern"),0==v)return!1}if(o){o=parseFloat(o),n=parseFloat(n);var v=n>=o;if(e._handResult(t,a,v,"min"),0==v)return!1}if(s){s=parseFloat(s),n=parseFloat(n);var v=s>=n;if(e._handResult(t,a,v,"max"),0==v)return!1}if(c){c=parseInt(c,10),n=n.length;var v=n>=c;if(e._handResult(t,a,v,"minlength"),0==v)return!1}if(u){u=parseInt(u,10),n=n.length;var v=u>=n;if(e._handResult(t,a,v,"maxlength"),0==v)return!1}if(l){var m=l.split("|");if(2!=m.length)throw"错误的配置";var _=$("#"+m[1]).val()||m[1],y=m[0],w=t.attr("type");switch("number"==w&&(n=parseFloat(n),_=parseFloat(_)),("date"==w||"datetime-local"==w)&&(n=n.replace("T"," "),n=n.replace("z","")+":00",n=new Date(n.replace(/-/g,"/")),_=_.replace("T"," "),_=_.replace("z","")+":00",_=new Date(_.replace(/-/g,"/"))),y){case">":var v=n>_;break;case"<":var v=_>n;break;case"=":var v=n==_;break;case">=":var v=n>=_;break;case"<=":var v=_>=n}if(e._handResult(t,a,v,"compare"),0==v)return!1}return!0},this._handResult=function(t,e,n,i){this._handFieldMsg(t,e,!n,i),n||this.errors.push({elem:t,msg:e,type:i})},this._handAllMsgs=function(){this.errors.length&&e.handAllResult(this.errors)},this._handFieldMsg=function(t,n,i,r){e.handFieldResult(t,n,i,r)},"undefined"==typeof i._initialized&&(i.prototype.checkField=function(t){return"string"==typeof t&&(t=$(t)),0!=n._isNeedCheck(t)?n._check(t):void 0},i.prototype.checkAll=function(){return n.errors=[],this.$root.find("[data-rule]").each(function(){var t=$(this);t.attr("id");0!=n._isNeedCheck(t)&&n._check(t)}),n._handAllMsgs(),n.errors.length?!1:!0}),i._initialized=!0}var r={require:/[^(^\s*)|(\s*$)]/,email:/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,phone:/^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/,mobile:/^[1][3,4,5,6,7,8,9][0-9]{9}$/,alipay:/(^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$)|(^1\d{10}$)/,id:/^\d{6}(18|19|20)\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i,currency:/^\d+(\.\d+)?$/,number:/^\d+$/,zip:/^[0-9]\d{5}$/,ip:/^[\d\.]{7,15}$/,price:/^\d+(\.\d{1,2})?$/,discount:/^(\d\.\d)$/,integer:/^[-\+]?\d+$/,english:/^[A-Za-z]+$/,chinese:/^[\u0391-\uFFE5]+$/,userName:/^[A-Za-z0-9_]{3,}$/i,nickname:/^[A-Za-z\u0391-\uFFE5][A-Za-z0-9\u0391-\uFFE5]{3,19}$/i,unSafe:/^(([^\^\.<>,;=?$"':#@！，。；《》｛｝【】￥…\]\[{}`])*)$/};e.exports=i},{}],5:[function(t,e,n){e.exports={hide:function(){$(".preloader-indicator-overlay, .preloader-indicator-modal, .preloader-label").remove()},show:function(t){var e="数据加载中...";if("object"==typeof t){e=t.msg||e;var n=$(t.renderTo),i=$('<div class="preloader-label"></div>'),r=$('<span class="preloader"></span>'),a=$('<span class="msg">'+e+"</span>");r.appendTo(i),a.appendTo(i),0===n.find(".preloader-label").length&&i.appendTo(n);var o=parseInt(a.width());i.css("width",o+25+1+"px")}else{e=t||e;var s=$('<div class="preloader-indicator-overlay"></div>'),c=$('<div class="preloader-indicator-modal"></div>'),r=$('<span class="preloader preloader-white"></span>'),a=$('<span class="msg">'+e+"</span>");r.appendTo(c),a.appendTo(c),s.appendTo($("body")),c.appendTo($("body"));var o=parseInt(c.width())/2,u=parseInt(c.height())/2;r.css("marginLeft",o-25+"px"),c.css({marginLeft:"-"+o+"px",marginTop:"-"+u+"px"})}}}},{}],6:[function(t,e,n){var i=i||function(t,e){var n={},i=n.lib={},r=i.Base=function(){function t(){}return{extend:function(e){t.prototype=this;var n=new t;return e&&n.mixIn(e),n.$super=this,n},create:function(){var t=this.extend();return t.init.apply(t,arguments),t},init:function(){},mixIn:function(t){for(var e in t)t.hasOwnProperty(e)&&(this[e]=t[e]);t.hasOwnProperty("toString")&&(this.toString=t.toString)},clone:function(){return this.$super.extend(this)}}}(),a=i.WordArray=r.extend({init:function(t,n){t=this.words=t||[],this.sigBytes=n!=e?n:4*t.length},toString:function(t){return(t||s).stringify(this)},concat:function(t){var e=this.words,n=t.words,i=this.sigBytes,t=t.sigBytes;if(this.clamp(),i%4)for(var r=0;t>r;r++)e[i+r>>>2]|=(n[r>>>2]>>>24-8*(r%4)&255)<<24-8*((i+r)%4);else if(65535<n.length)for(r=0;t>r;r+=4)e[i+r>>>2]=n[r>>>2];else e.push.apply(e,n);return this.sigBytes+=t,this},clamp:function(){var e=this.words,n=this.sigBytes;e[n>>>2]&=4294967295<<32-8*(n%4),e.length=t.ceil(n/4)},clone:function(){var t=r.clone.call(this);return t.words=this.words.slice(0),t},random:function(e){for(var n=[],i=0;e>i;i+=4)n.push(4294967296*t.random()|0);return a.create(n,e)}}),o=n.enc={},s=o.Hex={stringify:function(t){for(var e=t.words,t=t.sigBytes,n=[],i=0;t>i;i++){var r=e[i>>>2]>>>24-8*(i%4)&255;n.push((r>>>4).toString(16)),n.push((15&r).toString(16))}return n.join("")},parse:function(t){for(var e=t.length,n=[],i=0;e>i;i+=2)n[i>>>3]|=parseInt(t.substr(i,2),16)<<24-4*(i%8);return a.create(n,e/2)}},c=o.Latin1={stringify:function(t){for(var e=t.words,t=t.sigBytes,n=[],i=0;t>i;i++)n.push(String.fromCharCode(e[i>>>2]>>>24-8*(i%4)&255));return n.join("")},parse:function(t){for(var e=t.length,n=[],i=0;e>i;i++)n[i>>>2]|=(255&t.charCodeAt(i))<<24-8*(i%4);return a.create(n,e)}},u=o.Utf8={stringify:function(t){try{return decodeURIComponent(escape(c.stringify(t)))}catch(e){throw Error("Malformed UTF-8 data")}},parse:function(t){return c.parse(unescape(encodeURIComponent(t)))}},l=i.BufferedBlockAlgorithm=r.extend({reset:function(){this._data=a.create(),this._nDataBytes=0},_append:function(t){"string"==typeof t&&(t=u.parse(t)),this._data.concat(t),this._nDataBytes+=t.sigBytes},_process:function(e){var n=this._data,i=n.words,r=n.sigBytes,o=this.blockSize,s=r/(4*o),s=e?t.ceil(s):t.max((0|s)-this._minBufferSize,0),e=s*o,r=t.min(4*e,r);if(e){for(var c=0;e>c;c+=o)this._doProcessBlock(i,c);c=i.splice(0,e),n.sigBytes-=r}return a.create(c,r)},clone:function(){var t=r.clone.call(this);return t._data=this._data.clone(),t},_minBufferSize:0});i.Hasher=l.extend({init:function(){this.reset()},reset:function(){l.reset.call(this),this._doReset()},update:function(t){return this._append(t),this._process(),this},finalize:function(t){return t&&this._append(t),this._doFinalize(),this._hash},clone:function(){var t=l.clone.call(this);return t._hash=this._hash.clone(),t},blockSize:16,_createHelper:function(t){return function(e,n){return t.create(n).finalize(e)}},_createHmacHelper:function(t){return function(e,n){return d.HMAC.create(t,n).finalize(e)}}});var d=n.algo={};return n}(Math);!function(){var t=i,e=t.lib,n=e.WordArray,e=e.Hasher,r=[],a=t.algo.SHA1=e.extend({_doReset:function(){this._hash=n.create([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(t,e){for(var n=this._hash.words,i=n[0],a=n[1],o=n[2],s=n[3],c=n[4],u=0;80>u;u++){if(16>u)r[u]=0|t[e+u];else{var l=r[u-3]^r[u-8]^r[u-14]^r[u-16];r[u]=l<<1|l>>>31}l=(i<<5|i>>>27)+c+r[u],l=20>u?l+((a&o|~a&s)+1518500249):40>u?l+((a^o^s)+1859775393):60>u?l+((a&o|a&s|o&s)-1894007588):l+((a^o^s)-899497514),c=s,s=o,o=a<<30|a>>>2,a=i,i=l}n[0]=n[0]+i|0,n[1]=n[1]+a|0,n[2]=n[2]+o|0,n[3]=n[3]+s|0,n[4]=n[4]+c|0},_doFinalize:function(){var t=this._data,e=t.words,n=8*this._nDataBytes,i=8*t.sigBytes;e[i>>>5]|=128<<24-i%32,e[(i+64>>>9<<4)+15]=n,t.sigBytes=4*e.length,this._process()}});t.SHA1=e._createHelper(a),t.HmacSHA1=e._createHmacHelper(a)}(),e.exports=i},{}],7:[function(t,e,n){var i=$("body"),r=$('<div class="dialog-overlay"></div>'),a=$('<div class="dialog"></div>');e.exports={_initModal:function(){r=$('<div class="dialog-overlay"></div>'),a=$('<div class="dialog dialog-no-buttons"></div>'),i.append(r),i.append(a)},_hide:function(){a.addClass("dialog-out"),r.removeClass("dialog-overlay-visible"),setTimeout(function(){r.remove(),a.remove()},200)},_show:function(){r.addClass("dialog-overlay-visible"),a.addClass("dialog-in")},_position:function(){var t=parseInt(a.height())/2;a.css("marginTop","-"+t+"px")},show:function(t){var e=this,n=$('<div class="dialog-inner"></div>');e._initModal();var i=t.text||"",r=t.title||"";msgType=t.type||"success",callback=t.callback||null,"success"===msgType&&""===r&&(r="成功"),"error"===msgType&&""===r&&(r="失败");var o=$('<div class="iconfont icon-'+msgType+'"></div>'),s=$('<div class="dialog-title">'+r+"</div>"),c=$('<div class="dialog-text">'+i+"</div>");n.append(o),n.append(s),n.append(c),a.append(n),setTimeout(function(){e._hide(),callback&&callback()},2e3),e._position(),e._show()}}},{}],8:[function(t,e,n){$(function(){var e=(t("../../common/utils"),t("../../common/apimap")),n=t("../../components/loading/loading"),i=t("../../components/tips"),r=t("../../components/formvalid"),a=t("../../components/ajax"),o=(t("../../components/sha1"),new r({container:".reg-form",checkIntime:!1,handAllResult:function(t){if(t.length){var e=$(t[0].elem),n=t[0].type||"require",r=e.data(n+"-msg");i.show({type:"error",title:r})}},handFieldResult:function(t,e,n){}})),s={},c={init:function(){this.initEvent()},initEvent:function(){var t=this;$("#save").on("tap",function(){var e=($(this),o.checkAll());return e?void t.setSubmitData():void console.log("表单验证不通过")})},setSubmitData:function(){var t=this;$(".reg-form").find("[data-submit]").each(function(){var t=$(this),e=t.data("submit"),n=t.attr("id"),i=t.val();("true"==e||1==e)&&(s[n]=i)}),console.log("setSubmitData",s),t.doSubmit()},doSubmit:function(){n.show(),a.post(e.registApi,{method:"regist",userInfo:JSON.stringify(s)},function(t){n.hide(),i.show({type:"success",title:"保存成功"})},function(t){n.hide(),i.show({type:"error",title:t.resultMsg})})}};c.init()})},{"../../common/apimap":1,"../../common/utils":2,"../../components/ajax":3,"../../components/formvalid":4,"../../components/loading/loading":5,"../../components/sha1":6,"../../components/tips":7}]},{},[8]);