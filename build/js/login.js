!function t(e,n,i){function s(o,a){if(!n[o]){if(!e[o]){var c="function"==typeof require&&require;if(!a&&c)return c(o,!0);if(r)return r(o,!0);var p=new Error("Cannot find module '"+o+"'");throw p.code="MODULE_NOT_FOUND",p}var d=n[o]={exports:{}};e[o][0].call(d.exports,function(t){var n=e[o][1][t];return s(n?n:t)},d,d.exports,t,e,n,i)}return n[o].exports}for(var r="function"==typeof require&&require,o=0;o<i.length;o++)s(i[o]);return s}({1:[function(t,e,n){var i=window.location.protocol+"//"+window.location.host+"/",s={loginApi:i+"open-api/login",registApi:i+"open-api/simple-regist",perfectApi:i+"action/user/update/user-info",provincesListApi:i+"open-api/get/provinces-list",citiesListApi:i+"open-api/get/cities-list",addressesListApi:i+"open-api/get/addresses-list",postDatingApi:i+"action/post/dating",requestDatingApi:i+"action/request/dating",acceptDatingApi:i+"action/accept/dating",listApi:i+"open-api/query/dating/dating-list"};e.exports=s},{}],2:[function(t,e,n){var i=function(t){1==t.isRedirect&&setTimeout(function(){window.location.href=t.redirectURL},2e3)};e.exports={post:function(t,e,n,s){$.ajax({url:t,data:e,type:"post",dataType:"json",success:function(t){i(t),"SUCCESS"===t.resultCode?n(t):s(t)},error:function(t){var e=(t.status||500,"对不起，服务器正在维护，请稍后再试...");switch(t.status){case 404:e="对不起，你访问的接口不存在...";break;case 403:e="对不起，你没有权限访问该接口...";break;case 500:e="对不起，正在进行服务器维护，请稍后再来...";break;case 502:e="对不起，你访问的接口程序出错...";break;case 503:e="对不起，你访问的接口后端异常...";break;default:e="对不起，服务器正在维护，请稍后再试..."}var t={isRedirect:!1,result:{},resultCode:"SERVER ERROR",resultMsg:e};s(t)}})},get:function(t,e,n,s){$.ajax({url:t,data:e,type:"get",dataType:"json",success:function(t){i(t),"SUCCESS"===t.resultCode?n(t):s(t)},error:function(t){var e=(t.status||500,"对不起，服务器正在维护，请稍后再试...");switch(t.status){case 404:e="对不起，你访问的接口不存在...";break;case 403:e="对不起，你没有权限访问该接口...";break;case 500:e="对不起，正在进行服务器维护，请稍后再来...";break;case 502:e="对不起，你访问的接口程序出错...";break;case 503:e="对不起，你访问的接口后端异常...";break;default:e="对不起，服务器正在维护，请稍后再试..."}var t={isRedirect:!1,result:{},resultCode:"ERROR",resultMsg:e};s(t)}})}}},{}],3:[function(t,e,n){e.exports={hide:function(){$(".preloader-indicator-overlay, .preloader-indicator-modal, .preloader-label").remove()},show:function(t){var e="数据加载中...";if("object"==typeof t){e=t.msg||e;var n=$(t.renderTo),i=$('<div class="preloader-label"></div>'),s=$('<span class="preloader"></span>'),r=$('<span class="msg">'+e+"</span>");s.appendTo(i),r.appendTo(i),0===n.find(".preloader-label").length&&i.appendTo(n);var o=parseInt(r.width());i.css("width",o+25+1+"px")}else{e=t||e;var a=$('<div class="preloader-indicator-overlay"></div>'),c=$('<div class="preloader-indicator-modal"></div>'),s=$('<span class="preloader preloader-white"></span>'),r=$('<span class="msg">'+e+"</span>");s.appendTo(c),r.appendTo(c),a.appendTo($("body")),c.appendTo($("body"));var o=parseInt(c.width())/2,p=parseInt(c.height())/2;s.css("marginLeft",o-25+"px"),c.css({marginLeft:"-"+o+"px",marginTop:"-"+p+"px"})}}}},{}],4:[function(t,e,n){var i=i||function(t,e){var n={},i=n.lib={},s=i.Base=function(){function t(){}return{extend:function(e){t.prototype=this;var n=new t;return e&&n.mixIn(e),n.$super=this,n},create:function(){var t=this.extend();return t.init.apply(t,arguments),t},init:function(){},mixIn:function(t){for(var e in t)t.hasOwnProperty(e)&&(this[e]=t[e]);t.hasOwnProperty("toString")&&(this.toString=t.toString)},clone:function(){return this.$super.extend(this)}}}(),r=i.WordArray=s.extend({init:function(t,n){t=this.words=t||[],this.sigBytes=n!=e?n:4*t.length},toString:function(t){return(t||a).stringify(this)},concat:function(t){var e=this.words,n=t.words,i=this.sigBytes,t=t.sigBytes;if(this.clamp(),i%4)for(var s=0;t>s;s++)e[i+s>>>2]|=(n[s>>>2]>>>24-8*(s%4)&255)<<24-8*((i+s)%4);else if(65535<n.length)for(s=0;t>s;s+=4)e[i+s>>>2]=n[s>>>2];else e.push.apply(e,n);return this.sigBytes+=t,this},clamp:function(){var e=this.words,n=this.sigBytes;e[n>>>2]&=4294967295<<32-8*(n%4),e.length=t.ceil(n/4)},clone:function(){var t=s.clone.call(this);return t.words=this.words.slice(0),t},random:function(e){for(var n=[],i=0;e>i;i+=4)n.push(4294967296*t.random()|0);return r.create(n,e)}}),o=n.enc={},a=o.Hex={stringify:function(t){for(var e=t.words,t=t.sigBytes,n=[],i=0;t>i;i++){var s=e[i>>>2]>>>24-8*(i%4)&255;n.push((s>>>4).toString(16)),n.push((15&s).toString(16))}return n.join("")},parse:function(t){for(var e=t.length,n=[],i=0;e>i;i+=2)n[i>>>3]|=parseInt(t.substr(i,2),16)<<24-4*(i%8);return r.create(n,e/2)}},c=o.Latin1={stringify:function(t){for(var e=t.words,t=t.sigBytes,n=[],i=0;t>i;i++)n.push(String.fromCharCode(e[i>>>2]>>>24-8*(i%4)&255));return n.join("")},parse:function(t){for(var e=t.length,n=[],i=0;e>i;i++)n[i>>>2]|=(255&t.charCodeAt(i))<<24-8*(i%4);return r.create(n,e)}},p=o.Utf8={stringify:function(t){try{return decodeURIComponent(escape(c.stringify(t)))}catch(e){throw Error("Malformed UTF-8 data")}},parse:function(t){return c.parse(unescape(encodeURIComponent(t)))}},d=i.BufferedBlockAlgorithm=s.extend({reset:function(){this._data=r.create(),this._nDataBytes=0},_append:function(t){"string"==typeof t&&(t=p.parse(t)),this._data.concat(t),this._nDataBytes+=t.sigBytes},_process:function(e){var n=this._data,i=n.words,s=n.sigBytes,o=this.blockSize,a=s/(4*o),a=e?t.ceil(a):t.max((0|a)-this._minBufferSize,0),e=a*o,s=t.min(4*e,s);if(e){for(var c=0;e>c;c+=o)this._doProcessBlock(i,c);c=i.splice(0,e),n.sigBytes-=s}return r.create(c,s)},clone:function(){var t=s.clone.call(this);return t._data=this._data.clone(),t},_minBufferSize:0});i.Hasher=d.extend({init:function(){this.reset()},reset:function(){d.reset.call(this),this._doReset()},update:function(t){return this._append(t),this._process(),this},finalize:function(t){return t&&this._append(t),this._doFinalize(),this._hash},clone:function(){var t=d.clone.call(this);return t._hash=this._hash.clone(),t},blockSize:16,_createHelper:function(t){return function(e,n){return t.create(n).finalize(e)}},_createHmacHelper:function(t){return function(e,n){return l.HMAC.create(t,n).finalize(e)}}});var l=n.algo={};return n}(Math);!function(){var t=i,e=t.lib,n=e.WordArray,e=e.Hasher,s=[],r=t.algo.SHA1=e.extend({_doReset:function(){this._hash=n.create([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(t,e){for(var n=this._hash.words,i=n[0],r=n[1],o=n[2],a=n[3],c=n[4],p=0;80>p;p++){if(16>p)s[p]=0|t[e+p];else{var d=s[p-3]^s[p-8]^s[p-14]^s[p-16];s[p]=d<<1|d>>>31}d=(i<<5|i>>>27)+c+s[p],d=20>p?d+((r&o|~r&a)+1518500249):40>p?d+((r^o^a)+1859775393):60>p?d+((r&o|r&a|o&a)-1894007588):d+((r^o^a)-899497514),c=a,a=o,o=r<<30|r>>>2,r=i,i=d}n[0]=n[0]+i|0,n[1]=n[1]+r|0,n[2]=n[2]+o|0,n[3]=n[3]+a|0,n[4]=n[4]+c|0},_doFinalize:function(){var t=this._data,e=t.words,n=8*this._nDataBytes,i=8*t.sigBytes;e[i>>>5]|=128<<24-i%32,e[(i+64>>>9<<4)+15]=n,t.sigBytes=4*e.length,this._process()}});t.SHA1=e._createHelper(r),t.HmacSHA1=e._createHmacHelper(r)}(),e.exports=i},{}],5:[function(t,e,n){var i=$("body"),s=$('<div class="dialog-overlay"></div>'),r=$('<div class="dialog"></div>');e.exports={_initModal:function(){s=$('<div class="dialog-overlay"></div>'),r=$('<div class="dialog dialog-no-buttons"></div>'),i.append(s),i.append(r)},_hide:function(){r.addClass("dialog-out"),s.removeClass("dialog-overlay-visible"),setTimeout(function(){s.remove(),r.remove()},200)},_show:function(){s.addClass("dialog-overlay-visible"),r.addClass("dialog-in")},_position:function(){var t=parseInt(r.height())/2;r.css("marginTop","-"+t+"px")},show:function(t){var e=this,n=$('<div class="dialog-inner"></div>');e._initModal();var i=t.text||"",s=t.title||"";msgType=t.type||"success",callback=t.callback||null,"success"===msgType&&""===s&&(s="成功"),"error"===msgType&&""===s&&(s="失败");var o=$('<div class="iconfont icon-'+msgType+'"></div>'),a=$('<div class="dialog-title">'+s+"</div>"),c=$('<div class="dialog-text">'+i+"</div>");n.append(o),n.append(a),n.append(c),r.append(n),setTimeout(function(){e._hide(),callback&&callback()},2e3),e._position(),e._show()}}},{}],6:[function(t,e,n){$(function(){var e=t("../../common/apimap"),n=t("../../components/tips"),i=t("../../components/ajax"),s=t("../../components/sha1"),r=t("../../components/loading/loading"),o={init:function(){this.initEvent()},initEvent:function(){var t=this,e=$("#password"),n=$("#owl");e.on("focus",function(){n.addClass("password")}),e.on("blur",function(){n.removeClass("password")}),$(".login-form").on("submit",function(){return t.doSubmit(),!1})},doSubmit:function(){var t=$("#email").val(),o=$("#password").val();r.show(),i.post(e.loginApi,{account:t,pwd:s.SHA1(o).toString()},function(t){r.hide(),window.location.href="./profile.html"},function(t){r.hide(),n.show({type:"error",title:t.resultMsg})})}};o.init()})},{"../../common/apimap":1,"../../components/ajax":2,"../../components/loading/loading":3,"../../components/sha1":4,"../../components/tips":5}]},{},[6]);