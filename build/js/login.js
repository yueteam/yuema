!function t(e,i,n){function o(s,a){if(!i[s]){if(!e[s]){var c="function"==typeof require&&require;if(!a&&c)return c(s,!0);if(r)return r(s,!0);var p=new Error("Cannot find module '"+s+"'");throw p.code="MODULE_NOT_FOUND",p}var l=i[s]={exports:{}};e[s][0].call(l.exports,function(t){var i=e[s][1][t];return o(i?i:t)},l,l.exports,t,e,i,n)}return i[s].exports}for(var r="function"==typeof require&&require,s=0;s<n.length;s++)o(n[s]);return o}({1:[function(t,e,i){var n=window.location.protocol+"//"+window.location.host+"/";"w.yuema.us"===window.location.hostname&&(n=window.location.protocol+"//www.yuema.us/");var o={loginApi:n+"open-api/login",registApi:n+"open-api/simple-regist",perfectApi:n+"action/user/update",provincesListApi:n+"open-api/query/provinces-list",citiesListApi:n+"open-api/query/cities-list",addressesListApi:n+"open-api/query/addresses-list",postDatingApi:n+"action/dating/post",requestDatingApi:n+"action/dating/request",acceptDatingApi:n+"action/dating/accept",listApi:n+"open-api/query/dating/dating-list",profileApi:n+"open-api/query/home-info"};e.exports=o},{}],2:[function(t,e,i){var n=function(t){1==t.isRedirect&&setTimeout(function(){window.location.href=t.redirectURL},2e3)};e.exports={post:function(t,e,i,o){$.ajax({url:t,data:e,type:"post",dataType:"json",success:function(t){n(t),"SUCCESS"===t.resultCode?i(t):o(t)},error:function(t){var e=(t.status||500,"对不起，服务器正在维护，请稍后再试...");switch(t.status){case 404:e="对不起，你访问的接口不存在...";break;case 403:e="对不起，你没有权限访问该接口...";break;case 500:e="对不起，正在进行服务器维护，请稍后再来...";break;case 502:e="对不起，你访问的接口程序出错...";break;case 503:e="对不起，你访问的接口后端异常...";break;default:e="对不起，服务器正在维护，请稍后再试..."}var t={isRedirect:!1,result:{},resultCode:"SERVER ERROR",resultMsg:e};o(t)}})},get:function(t,e,i,o){$.ajax({url:t,data:e,type:"get",dataType:"json",success:function(t){n(t),"SUCCESS"===t.resultCode?i(t):o(t)},error:function(t){var e=(t.status||500,"对不起，服务器正在维护，请稍后再试...");switch(t.status){case 404:e="对不起，你访问的接口不存在...";break;case 403:e="对不起，你没有权限访问该接口...";break;case 500:e="对不起，正在进行服务器维护，请稍后再来...";break;case 502:e="对不起，你访问的接口程序出错...";break;case 503:e="对不起，你访问的接口后端异常...";break;default:e="对不起，服务器正在维护，请稍后再试..."}var t={isRedirect:!1,result:{},resultCode:"ERROR",resultMsg:e};o(t)}})}}},{}],3:[function(t,e,i){e.exports={hide:function(){$(".preloader-indicator-overlay, .preloader-indicator-modal, .preloader-label").remove()},show:function(t){var e="数据加载中...";if("object"==typeof t){e=t.msg||e;var i=$(t.renderTo),n=$('<div class="preloader-label"></div>'),o=$('<span class="preloader"></span>'),r=$('<span class="msg">'+e+"</span>");o.appendTo(n),r.appendTo(n),0===i.find(".preloader-label").length&&n.appendTo(i);var s=parseInt(r.width());n.css("width",s+25+1+"px")}else{e=t||e;var a=$('<div class="preloader-indicator-overlay"></div>'),c=$('<div class="preloader-indicator-modal"></div>'),o=$('<span class="preloader preloader-white"></span>'),r=$('<span class="msg">'+e+"</span>");o.appendTo(c),r.appendTo(c),a.appendTo($("body")),c.appendTo($("body"));var s=parseInt(c.width())/2,p=parseInt(c.height())/2;o.css("marginLeft",s-25+"px"),c.css({marginLeft:"-"+s+"px",marginTop:"-"+p+"px"})}}}},{}],4:[function(t,e,i){var n=n||function(t,e){var i={},n=i.lib={},o=n.Base=function(){function t(){}return{extend:function(e){t.prototype=this;var i=new t;return e&&i.mixIn(e),i.$super=this,i},create:function(){var t=this.extend();return t.init.apply(t,arguments),t},init:function(){},mixIn:function(t){for(var e in t)t.hasOwnProperty(e)&&(this[e]=t[e]);t.hasOwnProperty("toString")&&(this.toString=t.toString)},clone:function(){return this.$super.extend(this)}}}(),r=n.WordArray=o.extend({init:function(t,i){t=this.words=t||[],this.sigBytes=i!=e?i:4*t.length},toString:function(t){return(t||a).stringify(this)},concat:function(t){var e=this.words,i=t.words,n=this.sigBytes,t=t.sigBytes;if(this.clamp(),n%4)for(var o=0;t>o;o++)e[n+o>>>2]|=(i[o>>>2]>>>24-8*(o%4)&255)<<24-8*((n+o)%4);else if(65535<i.length)for(o=0;t>o;o+=4)e[n+o>>>2]=i[o>>>2];else e.push.apply(e,i);return this.sigBytes+=t,this},clamp:function(){var e=this.words,i=this.sigBytes;e[i>>>2]&=4294967295<<32-8*(i%4),e.length=t.ceil(i/4)},clone:function(){var t=o.clone.call(this);return t.words=this.words.slice(0),t},random:function(e){for(var i=[],n=0;e>n;n+=4)i.push(4294967296*t.random()|0);return r.create(i,e)}}),s=i.enc={},a=s.Hex={stringify:function(t){for(var e=t.words,t=t.sigBytes,i=[],n=0;t>n;n++){var o=e[n>>>2]>>>24-8*(n%4)&255;i.push((o>>>4).toString(16)),i.push((15&o).toString(16))}return i.join("")},parse:function(t){for(var e=t.length,i=[],n=0;e>n;n+=2)i[n>>>3]|=parseInt(t.substr(n,2),16)<<24-4*(n%8);return r.create(i,e/2)}},c=s.Latin1={stringify:function(t){for(var e=t.words,t=t.sigBytes,i=[],n=0;t>n;n++)i.push(String.fromCharCode(e[n>>>2]>>>24-8*(n%4)&255));return i.join("")},parse:function(t){for(var e=t.length,i=[],n=0;e>n;n++)i[n>>>2]|=(255&t.charCodeAt(n))<<24-8*(n%4);return r.create(i,e)}},p=s.Utf8={stringify:function(t){try{return decodeURIComponent(escape(c.stringify(t)))}catch(e){throw Error("Malformed UTF-8 data")}},parse:function(t){return c.parse(unescape(encodeURIComponent(t)))}},l=n.BufferedBlockAlgorithm=o.extend({reset:function(){this._data=r.create(),this._nDataBytes=0},_append:function(t){"string"==typeof t&&(t=p.parse(t)),this._data.concat(t),this._nDataBytes+=t.sigBytes},_process:function(e){var i=this._data,n=i.words,o=i.sigBytes,s=this.blockSize,a=o/(4*s),a=e?t.ceil(a):t.max((0|a)-this._minBufferSize,0),e=a*s,o=t.min(4*e,o);if(e){for(var c=0;e>c;c+=s)this._doProcessBlock(n,c);c=n.splice(0,e),i.sigBytes-=o}return r.create(c,o)},clone:function(){var t=o.clone.call(this);return t._data=this._data.clone(),t},_minBufferSize:0});n.Hasher=l.extend({init:function(){this.reset()},reset:function(){l.reset.call(this),this._doReset()},update:function(t){return this._append(t),this._process(),this},finalize:function(t){return t&&this._append(t),this._doFinalize(),this._hash},clone:function(){var t=l.clone.call(this);return t._hash=this._hash.clone(),t},blockSize:16,_createHelper:function(t){return function(e,i){return t.create(i).finalize(e)}},_createHmacHelper:function(t){return function(e,i){return d.HMAC.create(t,i).finalize(e)}}});var d=i.algo={};return i}(Math);!function(){var t=n,e=t.lib,i=e.WordArray,e=e.Hasher,o=[],r=t.algo.SHA1=e.extend({_doReset:function(){this._hash=i.create([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(t,e){for(var i=this._hash.words,n=i[0],r=i[1],s=i[2],a=i[3],c=i[4],p=0;80>p;p++){if(16>p)o[p]=0|t[e+p];else{var l=o[p-3]^o[p-8]^o[p-14]^o[p-16];o[p]=l<<1|l>>>31}l=(n<<5|n>>>27)+c+o[p],l=20>p?l+((r&s|~r&a)+1518500249):40>p?l+((r^s^a)+1859775393):60>p?l+((r&s|r&a|s&a)-1894007588):l+((r^s^a)-899497514),c=a,a=s,s=r<<30|r>>>2,r=n,n=l}i[0]=i[0]+n|0,i[1]=i[1]+r|0,i[2]=i[2]+s|0,i[3]=i[3]+a|0,i[4]=i[4]+c|0},_doFinalize:function(){var t=this._data,e=t.words,i=8*this._nDataBytes,n=8*t.sigBytes;e[n>>>5]|=128<<24-n%32,e[(n+64>>>9<<4)+15]=i,t.sigBytes=4*e.length,this._process()}});t.SHA1=e._createHelper(r),t.HmacSHA1=e._createHmacHelper(r)}(),e.exports=n},{}],5:[function(t,e,i){var n=$("body"),o=$('<div class="dialog-overlay"></div>'),r=$('<div class="dialog"></div>');e.exports={_initModal:function(){o=$('<div class="dialog-overlay"></div>'),r=$('<div class="dialog dialog-no-buttons"></div>'),n.append(o),n.append(r)},_hide:function(){r.addClass("dialog-out"),o.removeClass("dialog-overlay-visible"),setTimeout(function(){o.remove(),r.remove()},200)},_show:function(){o.addClass("dialog-overlay-visible"),r.addClass("dialog-in")},_position:function(){var t=parseInt(r.height())/2;r.css("marginTop","-"+t+"px")},show:function(t){var e=this,i=$('<div class="dialog-inner"></div>');e._initModal();var n=t.text||"",o=t.title||"";msgType=t.type||"success",callback=t.callback||null,"success"===msgType&&""===o&&(o="成功"),"error"===msgType&&""===o&&(o="失败");var s=$('<div class="iconfont icon-'+msgType+'"></div>'),a=$('<div class="dialog-title">'+o+"</div>"),c=$('<div class="dialog-text">'+n+"</div>");i.append(s),i.append(a),i.append(c),r.append(i),setTimeout(function(){e._hide(),callback&&callback()},2e3),e._position(),e._show()}}},{}],6:[function(t,e,i){$(function(){var e=t("../../common/apimap"),i=t("../../components/tips"),n=t("../../components/ajax"),o=t("../../components/sha1"),r=t("../../components/loading/loading"),s={init:function(){this.initEvent()},initEvent:function(){var t=this,e=$("#password"),i=$("#owl");e.on("focus",function(){i.addClass("password")}),e.on("blur",function(){i.removeClass("password")}),$(".login-form").on("submit",function(){return t.doSubmit(),!1})},doSubmit:function(){var t=$("#email").val(),s=$("#password").val();r.show(),n.post(e.loginApi,{account:t,pwd:o.SHA1(s).toString()},function(t){r.hide(),window.location.href="./profile.html"},function(t){r.hide(),i.show({type:"error",title:t.resultMsg})})}};s.init()})},{"../../common/apimap":1,"../../components/ajax":2,"../../components/loading/loading":3,"../../components/sha1":4,"../../components/tips":5}]},{},[6]);