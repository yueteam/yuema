webpackJsonp([6,8],Array(26).concat([function(n,e){n.exports=function(){var n=[];return n.toString=function(){for(var n=[],e=0;e<this.length;e++){var t=this[e];t[2]?n.push("@media "+t[2]+"{"+t[1]+"}"):n.push(t[1])}return n.join("")},n.i=function(e,t){"string"==typeof e&&(e=[[null,e,""]]);for(var i={},s=0;s<this.length;s++){var o=this[s][0];"number"==typeof o&&(i[o]=!0)}for(s=0;s<e.length;s++){var r=e[s];"number"==typeof r[0]&&i[r[0]]||(t&&!r[2]?r[2]=t:t&&(r[2]="("+r[2]+") and ("+t+")"),n.push(r))}},n}},function(n,e,t){function i(n,e){for(var t=0;t<n.length;t++){var i=n[t],s=d[i.id];if(s){s.refs++;for(var o=0;o<s.parts.length;o++)s.parts[o](i.parts[o]);for(;o<i.parts.length;o++)s.parts.push(c(i.parts[o],e))}else{for(var r=[],o=0;o<i.parts.length;o++)r.push(c(i.parts[o],e));d[i.id]={id:i.id,refs:1,parts:r}}}}function s(n){for(var e=[],t={},i=0;i<n.length;i++){var s=n[i],o=s[0],r=s[1],a=s[2],l=s[3],c={css:r,media:a,sourceMap:l};t[o]?t[o].parts.push(c):e.push(t[o]={id:o,parts:[c]})}return e}function o(n,e){var t=v(),i=b[b.length-1];if("top"===n.insertAt)i?i.nextSibling?t.insertBefore(e,i.nextSibling):t.appendChild(e):t.insertBefore(e,t.firstChild),b.push(e);else{if("bottom"!==n.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");t.appendChild(e)}}function r(n){n.parentNode.removeChild(n);var e=b.indexOf(n);e>=0&&b.splice(e,1)}function a(n){var e=document.createElement("style");return e.type="text/css",o(n,e),e}function l(n){var e=document.createElement("link");return e.rel="stylesheet",o(n,e),e}function c(n,e){var t,i,s;if(e.singleton){var o=y++;t=h||(h=a(e)),i=u.bind(null,t,o,!1),s=u.bind(null,t,o,!0)}else n.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(t=l(e),i=f.bind(null,t),s=function(){r(t),t.href&&URL.revokeObjectURL(t.href)}):(t=a(e),i=p.bind(null,t),s=function(){r(t)});return i(n),function(e){if(e){if(e.css===n.css&&e.media===n.media&&e.sourceMap===n.sourceMap)return;i(n=e)}else s()}}function u(n,e,t,i){var s=t?"":i.css;if(n.styleSheet)n.styleSheet.cssText=A(e,s);else{var o=document.createTextNode(s),r=n.childNodes;r[e]&&n.removeChild(r[e]),r.length?n.insertBefore(o,r[e]):n.appendChild(o)}}function p(n,e){var t=e.css,i=e.media;if(i&&n.setAttribute("media",i),n.styleSheet)n.styleSheet.cssText=t;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(t))}}function f(n,e){var t=e.css,i=e.sourceMap;i&&(t+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */");var s=new Blob([t],{type:"text/css"}),o=n.href;n.href=URL.createObjectURL(s),o&&URL.revokeObjectURL(o)}var d={},m=function(n){var e;return function(){return"undefined"==typeof e&&(e=n.apply(this,arguments)),e}},g=m(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),v=m(function(){return document.head||document.getElementsByTagName("head")[0]}),h=null,y=0,b=[];n.exports=function(n,e){if("object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");e=e||{},"undefined"==typeof e.singleton&&(e.singleton=g()),"undefined"==typeof e.insertAt&&(e.insertAt="bottom");var t=s(n);return i(t,e),function(n){for(var o=[],r=0;r<t.length;r++){var a=t[r],l=d[a.id];l.refs--,o.push(l)}if(n){var c=s(n);i(c,e)}for(var r=0;r<o.length;r++){var l=o[r];if(0===l.refs){for(var u=0;u<l.parts.length;u++)l.parts[u]();delete d[l.id]}}}};var A=function(){var n=[];return function(e,t){return n[e]=t,n.filter(Boolean).join("\n")}}()},,,,,,,,,function(n,e){"use strict";var t=window.location.protocol+"//"+window.location.host+"/";"w.yuema.us"===window.location.hostname&&(t=window.location.protocol+"//www.yuema.us/");var i={loginApi:t+"open-api/login",registApi:t+"open-api/simple-regist",perfectApi:t+"action/user/update",provincesListApi:t+"open-api/query/provinces-list",citiesListApi:t+"open-api/query/cities-list",addressesListApi:t+"open-api/query/addresses-list",postDatingApi:t+"action/dating/post",requestDatingApi:t+"action/dating/request",acceptDatingApi:t+"action/dating/accept",listApi:t+"open-api/query/dating/dating-list",profileApi:t+"open-api/query/home-info",myRequestApi:t+"action/query/dating/my-request-dating-list",datingDetailApi:t+"open-api/query/dating/dating-info",chatRecordsApi:t+"action/query/message/message-list",chatListApi:t+"action/query/chatting/my-chatting-list"};n.exports=i},function(n,e,t){(function(e){"use strict";var t=e("body"),i=e('<div class="dialog-overlay"></div>'),s=e('<div class="dialog"></div>');n.exports={_initModal:function(){i=e('<div class="dialog-overlay"></div>'),s=e('<div class="dialog dialog-no-buttons"></div>'),t.append(i),t.append(s)},_hide:function(){s.addClass("dialog-out"),i.removeClass("dialog-overlay-visible"),setTimeout(function(){i.remove(),s.remove()},200)},_show:function(){i.addClass("dialog-overlay-visible"),s.addClass("dialog-in")},_position:function(){var n=parseInt(s.height())/2;s.css("marginTop","-"+n+"px")},show:function(n){var t=this,i=e('<div class="dialog-inner"></div>');t._initModal();var o=n.text||"",r=n.title||"",a=n.type||"success",l=n.callback||null;"success"===a&&""===r&&(r="成功"),"error"===a&&""===r&&(r="失败");var c=e('<div class="iconfont icon-'+a+'"></div>'),u=e('<div class="dialog-title">'+r+"</div>"),p=e('<div class="dialog-text">'+o+"</div>");i.append(c),i.append(u),i.append(p),s.append(i),setTimeout(function(){t._hide(),l&&l()},2e3),t._position(),t._show()}}}).call(e,t(4))},function(n,e,t){(function(e){"use strict";var t=function(n){1==n.isRedirect&&setTimeout(function(){window.location.href=n.redirectURL},2e3)};n.exports={post:function(n,i,s,o,r){e.ajax({url:n,data:i,type:"post",dataType:"json",success:function(n){r||t(n),"SUCCESS"===n.resultCode?s(n):o(n)},error:function(n){var e=(n.status||500,"对不起，服务器正在维护，请稍后再试...");switch(n.status){case 404:e="对不起，你访问的接口不存在...";break;case 403:e="对不起，你没有权限访问该接口...";break;case 500:e="对不起，正在进行服务器维护，请稍后再来...";break;case 502:e="对不起，你访问的接口程序出错...";break;case 503:e="对不起，你访问的接口后端异常...";break;default:e="对不起，服务器正在维护，请稍后再试..."}var n={isRedirect:!1,result:{},resultCode:"SERVER ERROR",resultMsg:e};o(n)}})},get:function(n,i,s,o){e.ajax({url:n,data:i,type:"get",dataType:"json",success:function(n){t(n),"SUCCESS"===n.resultCode?s(n):o(n)},error:function(n){var e=(n.status||500,"对不起，服务器正在维护，请稍后再试...");switch(n.status){case 404:e="对不起，你访问的接口不存在...";break;case 403:e="对不起，你没有权限访问该接口...";break;case 500:e="对不起，正在进行服务器维护，请稍后再来...";break;case 502:e="对不起，你访问的接口程序出错...";break;case 503:e="对不起，你访问的接口后端异常...";break;default:e="对不起，服务器正在维护，请稍后再试..."}var n={isRedirect:!1,result:{},resultCode:"ERROR",resultMsg:e};o(n)}})}}}).call(e,t(4))},,,function(n,e,t){(function(e){"use strict";function i(n){return n&&n.__esModule?n:{"default":n}}var s=t(42),o=i(s);n.exports={hide:function(){e(".preloader-indicator-overlay, .preloader-indicator-modal, .preloader-label").remove()},show:function(n){var t="数据加载中...";if("object"===("undefined"==typeof n?"undefined":(0,o["default"])(n))){t=n.msg||t;var i=e(n.renderTo),s=e('<div class="preloader-label"></div>'),r=e('<span class="preloader"></span>'),a=e('<span class="msg">'+t+"</span>");r.appendTo(s),a.appendTo(s),0===i.find(".preloader-label").length&&s.appendTo(i);var l=parseInt(a.width());s.css("width",l+25+1+"px")}else{t=n||t;var c=e('<div class="preloader-indicator-overlay"></div>'),u=e('<div class="preloader-indicator-modal"></div>'),r=e('<span class="preloader preloader-white"></span>'),a=e('<span class="msg">'+t+"</span>");r.appendTo(u),a.appendTo(u),c.appendTo(e("body")),u.appendTo(e("body"));var l=parseInt(u.width())/2,p=parseInt(u.height())/2;r.css("marginLeft",l-25+"px"),u.css({marginLeft:"-"+l+"px",marginTop:"-"+p+"px"})}}}}).call(e,t(4))},function(n,e,t){"use strict";var i=t(43)["default"];e["default"]=function(n){return n&&n.constructor===i?"symbol":typeof n},e.__esModule=!0},function(n,e,t){n.exports={"default":t(44),__esModule:!0}},function(n,e,t){t(45),t(66),n.exports=t(13).Symbol},function(n,e,t){"use strict";var i=t(46),s=t(12),o=t(47),r=t(48),a=t(11),l=t(49),c=t(16),u=t(52),p=t(53),f=t(55),d=t(54),m=t(56),g=t(60),v=t(61),h=t(62),y=t(63),b=t(57),A=t(51),x=i.getDesc,w=i.setDesc,k=i.create,C=g.get,E=s.Symbol,S=s.JSON,T=S&&S.stringify,B=!1,M=d("_hidden"),_=i.isEnum,O=u("symbol-registry"),j=u("symbols"),R="function"==typeof E,D=Object.prototype,F=r&&c(function(){return 7!=k(w({},"a",{get:function(){return w(this,"a",{value:7}).a}})).a})?function(n,e,t){var i=x(D,e);i&&delete D[e],w(n,e,t),i&&n!==D&&w(D,e,i)}:w,q=function(n){var e=j[n]=k(E.prototype);return e._k=n,r&&B&&F(D,n,{configurable:!0,set:function(e){o(this,M)&&o(this[M],n)&&(this[M][n]=!1),F(this,n,A(1,e))}}),e},L=function(n){return"symbol"==typeof n},P=function(n,e,t){return t&&o(j,e)?(t.enumerable?(o(n,M)&&n[M][e]&&(n[M][e]=!1),t=k(t,{enumerable:A(0,!1)})):(o(n,M)||w(n,M,A(1,{})),n[M][e]=!0),F(n,e,t)):w(n,e,t)},U=function(n,e){y(n);for(var t,i=v(e=b(e)),s=0,o=i.length;o>s;)P(n,t=i[s++],e[t]);return n},N=function(n,e){return void 0===e?k(n):U(k(n),e)},Y=function(n){var e=_.call(this,n);return!(e||!o(this,n)||!o(j,n)||o(this,M)&&this[M][n])||e},I=function(n,e){var t=x(n=b(n),e);return!t||!o(j,e)||o(n,M)&&n[M][e]||(t.enumerable=!0),t},z=function(n){for(var e,t=C(b(n)),i=[],s=0;t.length>s;)o(j,e=t[s++])||e==M||i.push(e);return i},J=function(n){for(var e,t=C(b(n)),i=[],s=0;t.length>s;)o(j,e=t[s++])&&i.push(j[e]);return i},W=function(n){if(void 0!==n&&!L(n)){for(var e,t,i=[n],s=1,o=arguments;o.length>s;)i.push(o[s++]);return e=i[1],"function"==typeof e&&(t=e),!t&&h(e)||(e=function(n,e){if(t&&(e=t.call(this,n,e)),!L(e))return e}),i[1]=e,T.apply(S,i)}},Z=c(function(){var n=E();return"[null]"!=T([n])||"{}"!=T({a:n})||"{}"!=T(Object(n))});R||(E=function(){if(L(this))throw TypeError("Symbol is not a constructor");return q(f(arguments.length>0?arguments[0]:void 0))},l(E.prototype,"toString",function(){return this._k}),L=function(n){return n instanceof E},i.create=N,i.isEnum=Y,i.getDesc=I,i.setDesc=P,i.setDescs=U,i.getNames=g.get=z,i.getSymbols=J,r&&!t(65)&&l(D,"propertyIsEnumerable",Y,!0));var K={"for":function(n){return o(O,n+="")?O[n]:O[n]=E(n)},keyFor:function(n){return m(O,n)},useSetter:function(){B=!0},useSimple:function(){B=!1}};i.each.call("hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),function(n){var e=d(n);K[n]=R?e:q(e)}),B=!0,a(a.G+a.W,{Symbol:E}),a(a.S,"Symbol",K),a(a.S+a.F*!R,"Object",{create:N,defineProperty:P,defineProperties:U,getOwnPropertyDescriptor:I,getOwnPropertyNames:z,getOwnPropertySymbols:J}),S&&a(a.S+a.F*(!R||Z),"JSON",{stringify:W}),p(E,"Symbol"),p(Math,"Math",!0),p(s.JSON,"JSON",!0)},function(n,e){var t=Object;n.exports={create:t.create,getProto:t.getPrototypeOf,isEnum:{}.propertyIsEnumerable,getDesc:t.getOwnPropertyDescriptor,setDesc:t.defineProperty,setDescs:t.defineProperties,getKeys:t.keys,getNames:t.getOwnPropertyNames,getSymbols:t.getOwnPropertySymbols,each:[].forEach}},function(n,e){var t={}.hasOwnProperty;n.exports=function(n,e){return t.call(n,e)}},function(n,e,t){n.exports=!t(16)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(n,e,t){n.exports=t(50)},function(n,e,t){var i=t(46),s=t(51);n.exports=t(48)?function(n,e,t){return i.setDesc(n,e,s(1,t))}:function(n,e,t){return n[e]=t,n}},function(n,e){n.exports=function(n,e){return{enumerable:!(1&n),configurable:!(2&n),writable:!(4&n),value:e}}},function(n,e,t){var i=t(12),s="__core-js_shared__",o=i[s]||(i[s]={});n.exports=function(n){return o[n]||(o[n]={})}},function(n,e,t){var i=t(46).setDesc,s=t(47),o=t(54)("toStringTag");n.exports=function(n,e,t){n&&!s(n=t?n:n.prototype,o)&&i(n,o,{configurable:!0,value:e})}},function(n,e,t){var i=t(52)("wks"),s=t(55),o=t(12).Symbol;n.exports=function(n){return i[n]||(i[n]=o&&o[n]||(o||s)("Symbol."+n))}},function(n,e){var t=0,i=Math.random();n.exports=function(n){return"Symbol(".concat(void 0===n?"":n,")_",(++t+i).toString(36))}},function(n,e,t){var i=t(46),s=t(57);n.exports=function(n,e){for(var t,o=s(n),r=i.getKeys(o),a=r.length,l=0;a>l;)if(o[t=r[l++]]===e)return t}},function(n,e,t){var i=t(58),s=t(9);n.exports=function(n){return i(s(n))}},function(n,e,t){var i=t(59);n.exports=Object("z").propertyIsEnumerable(0)?Object:function(n){return"String"==i(n)?n.split(""):Object(n)}},function(n,e){var t={}.toString;n.exports=function(n){return t.call(n).slice(8,-1)}},function(n,e,t){var i=t(57),s=t(46).getNames,o={}.toString,r="object"==typeof window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],a=function(n){try{return s(n)}catch(e){return r.slice()}};n.exports.get=function(n){return r&&"[object Window]"==o.call(n)?a(n):s(i(n))}},function(n,e,t){var i=t(46);n.exports=function(n){var e=i.getKeys(n),t=i.getSymbols;if(t)for(var s,o=t(n),r=i.isEnum,a=0;o.length>a;)r.call(n,s=o[a++])&&e.push(s);return e}},function(n,e,t){var i=t(59);n.exports=Array.isArray||function(n){return"Array"==i(n)}},function(n,e,t){var i=t(64);n.exports=function(n){if(!i(n))throw TypeError(n+" is not an object!");return n}},function(n,e){n.exports=function(n){return"object"==typeof n?null!==n:"function"==typeof n}},function(n,e){n.exports=!0},function(n,e){},,function(n,e,t){var i,s;i=t(69),s=t(75),n.exports=i||{},n.exports.__esModule&&(n.exports=n.exports["default"]),s&&(("function"==typeof n.exports?n.exports.options:n.exports).template=s)},function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e["default"]={replace:!0,props:["hdTitle","pageType","showMenu","showFilter"],ready:function(){},data:function(){return{}},methods:{goBack:function(){window.history.go(-1)},toggleMenu:function(){this.showMenu=!this.showMenu},closeMenu:function(){this.showMenu=!this.showMenu},toggleFilter:function(){this.showFilter=!this.showFilter},closeFilter:function(){this.showFilter=!this.showFilter}},components:{userInfo:t(70)}}},function(n,e,t){var i,s;t(71),i=t(73),s=t(74),n.exports=i||{},n.exports.__esModule&&(n.exports=n.exports["default"]),s&&(("function"==typeof n.exports?n.exports.options:n.exports).template=s)},function(n,e,t){var i=t(72);"string"==typeof i&&(i=[[n.id,i,""]]);t(27)(i,{});i.locals&&(n.exports=i.locals)},function(n,e,t){e=n.exports=t(26)(),e.push([n.id,"\n\n","",{version:3,sources:[],names:[],mappings:"",file:"user-info.vue",sourceRoot:"webpack://"}])},function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=t(21);e["default"]={replace:!0,data:function(){var n="";return i.isLogin()&&(n=i.getCookie("nick_name")),{nickname:n||"",avatar_url:localStorage.avatar?localStorage.avatar+"_s120":""}},methods:{goEnter:function(){var n=window.location.protocol+"//"+window.location.host+"/login.html?redirect="+encodeURIComponent(this.$route.path);this.location.href=n},goUser:function(){this.$route.router.go({name:"profile",params:{id:"me"}})}}}},function(n,e){n.exports='\n    <div class="user-info">\n        <!-- 未登录 -->\n        <div class="menu-profile" v-if="!nickname" @click="goEnter">\n            <span class="iconfont icon-account"></span>          \n            <span class="login-info">\n            请登录\n            </span>\n        </div>\n        <!-- 已登录 -->\n        <div class="menu-profile" v-if="nickname" @click="goUser">\n            <div class="avatar"><img v-if="avatar_url" :src="avatar_url"></div>\n            <span class="login-info">\n                {{nickname}}\n            </span>\n        </div>\n    </div>\n'},function(n,e){n.exports='\n    <div class="page-cover" v-if="showMenu" @click="closeMenu">\n    </div>\n\n    <header id="header" class="header-fixed">\n        <h1>{{hdTitle}}</h1>\n        <a href="javascript:;" class="menu-back" v-if="pageType==\'chat\'||pageType==\'profile\'||pageType==\'asklist\'" @click="goBack"></a>\n        <a href="javascript:;" class="menu-trigger" v-else @click="toggleMenu"></a>\n        <a href="javascript:;" class="menu-right menu-filter" v-if="pageType==\'list\'" @click="toggleFilter">\n            <span class="iconfont icon-filter"></span>\n        </a>\n    </header>\n\n    <nav id="sideBar" class="menu" :class="{\'show\':showMenu}">      \n        <user-info></user-info>\n        <ul>\n            <li class="menu-item" :class="{\'current\':pageType==\'list\'}" v-link="{name:\'list\'}" @click="closeMenu">\n                <span class="iconfont icon-followed"></span>发现\n            </li>\n            <li class="menu-item" :class="{\'current\':pageType==\'message\'}" v-link="{name:\'message\'}" @click="closeMenu">\n                <span class="iconfont icon-message"></span>消息\n            </li>\n            <li class="menu-item" :class="{\'current\':pageType==\'add\'}" v-link="{name:\'add\'}" @click="closeMenu">\n                <span class="iconfont icon-send"></span>发起约会\n            </li>\n        </ul>\n        <a class="menu-set" href="/login.html">\n            <span class="iconfont icon-set"></span>\n            退出\n        </a>\n    </nav>\n\n    <div class="g-panel" :class="{\'open\':showFilter}">\n        <ul class="tag-list">\n            <li class="tag-item" v-link="{\'name\':\'list\',query:{tab:\'2\'}}" @click="closeFilter">\n                <span class="iconfont icon-coffee"></span>喝咖啡/茶\n            </li>\n            <li class="tag-item" v-link="{\'name\':\'list\',query:{tab:\'3\'}}" @click="closeFilter">\n                <span class="iconfont icon-food"></span>美食\n            </li>\n            <li class="tag-item" v-link="{\'name\':\'list\',query:{tab:\'4\'}}" @click="closeFilter">\n                <span class="iconfont icon-film"></span>看电影\n            </li>\n            <li class="tag-item" v-link="{\'name\':\'list\',query:{tab:\'11\'}}" @click="closeFilter">\n                <span class="iconfont icon-flight"></span>同行\n            </li>\n            <li class="tag-item" v-link="{\'name\':\'list\',query:{tab:\'5\'}}" @click="closeFilter">\n                <span class="iconfont icon-run"></span>跑步\n            </li>\n            <li class="tag-item" v-link="{\'name\':\'list\',query:{tab:\'7\'}}" @click="closeFilter">\n                <span class="iconfont icon-badminton"></span>羽毛球\n            </li>\n            <li class="tag-item" v-link="{\'name\':\'list\',query:{tab:\'8\'}}" @click="closeFilter">\n                <span class="iconfont icon-riding"></span>骑行\n            </li>\n            <li class="tag-item" v-link="{\'name\':\'list\',query:{tab:\'9\'}}" @click="closeFilter">\n                <span class="iconfont icon-drive"></span>自驾\n            </li>\n            <li class="tag-item" v-link="{\'name\':\'list\',query:{tab:\'6\'}}" @click="closeFilter">\n                <span class="iconfont icon-photo"></span>摄影\n            </li>\n            <li class="tag-item" v-link="{\'name\':\'list\',query:{tab:\'1\'}}" @click="closeFilter">\n                <span class="iconfont icon-lquote"></span>其他\n            </li>\n        </ul>\n        <div class="close-panel" @click="closeFilter">\n            <span class="iconfont icon-no"></span>\n        </div>\n    </div>\n'},,,,,,,,,,,,,,,,,,,,,,,function(n,e,t){var i,s;t(99),i=t(101),s=t(102),n.exports=i||{},n.exports.__esModule&&(n.exports=n.exports["default"]),s&&(("function"==typeof n.exports?n.exports.options:n.exports).template=s)},function(n,e,t){var i=t(100);"string"==typeof i&&(i=[[n.id,i,""]]);t(27)(i,{});i.locals&&(n.exports=i.locals)},function(n,e,t){e=n.exports=t(26)(),e.push([n.id,'.msg-list {\n  background-color: #fff;\n}\n.msg-list .item .item-lnk {\n  *zoom: 1;\n  display: block;\n  padding: 12px;\n  color: #333;\n  border-bottom: 1px solid #EEEEF2;\n}\n.msg-list .item .item-lnk:before,\n.msg-list .item .item-lnk:after {\n  display: table;\n  content: "";\n  line-height: 0;\n}\n.msg-list .item .item-lnk:after {\n  clear: both;\n}\n.msg-list .item .avatar {\n  float: left;\n  margin-right: 12px;\n  width: 40px;\n  height: 40px;\n  overflow: hidden;\n  border-radius: 5px;\n}\n.msg-list .item .avatar img {\n  display: block;\n  width: 40px;\n}\n.msg-list .item .info {\n  position: relative;\n  height: 40px;\n  overflow: hidden;\n}\n.msg-list .item .info .username {\n  font-size: 16px;\n  margin-bottom: 5px;\n}\n.msg-list .item .info .latest-msg {\n  font-size: 13px;\n  color: #999;\n}\n.msg-list .item .info .send-time {\n  position: absolute;\n  z-index: 9;\n  top: 0;\n  right: 0;\n  color: #999;\n}\n',"",{version:3,sources:["/./src/views/message.vue.style","/./src/views/message.vue"],names:[],mappings:"AAAA;EACE,uBAAuB;CACxB;AACD;GCCE,QDAS;EACT,eAAe;EACf,cAAc;EACd,YAAY;EACZ,iCAAiC;CAClC;AACD;;EAEE,eAAe;EACf,YAAY;EACZ,eAAe;CAChB;AACD;EACE,YAAY;CACb;AACD;EACE,YAAY;EACZ,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,iBAAiB;EAEjB,mBAAmB;CACpB;AACD;EACE,eAAe;EACf,YAAY;CACb;AACD;EACE,mBAAmB;EACnB,aAAa;EACb,iBAAiB;CAClB;AACD;EACE,gBAAgB;EAChB,mBAAmB;CACpB;AACD;EACE,gBAAgB;EAChB,YAAY;CACb;AACD;EACE,mBAAmB;EACnB,WAAW;EACX,OAAO;EACP,SAAS;EACT,YAAY;CACb",file:"message.vue",sourcesContent:['.msg-list {\n  background-color: #fff;\n}\n.msg-list .item .item-lnk {\n  *zoom: 1;\n  display: block;\n  padding: 12px;\n  color: #333;\n  border-bottom: 1px solid #EEEEF2;\n}\n.msg-list .item .item-lnk:before,\n.msg-list .item .item-lnk:after {\n  display: table;\n  content: "";\n  line-height: 0;\n}\n.msg-list .item .item-lnk:after {\n  clear: both;\n}\n.msg-list .item .avatar {\n  float: left;\n  margin-right: 12px;\n  width: 40px;\n  height: 40px;\n  overflow: hidden;\n  -webkit-border-radius: 5px;\n  border-radius: 5px;\n}\n.msg-list .item .avatar img {\n  display: block;\n  width: 40px;\n}\n.msg-list .item .info {\n  position: relative;\n  height: 40px;\n  overflow: hidden;\n}\n.msg-list .item .info .username {\n  font-size: 16px;\n  margin-bottom: 5px;\n}\n.msg-list .item .info .latest-msg {\n  font-size: 13px;\n  color: #999;\n}\n.msg-list .item .info .send-time {\n  position: absolute;\n  z-index: 9;\n  top: 0;\n  right: 0;\n  color: #999;\n}\n','.msg-list {\n  background-color: #fff;\n}\n.msg-list .item .item-lnk {\n  *zoom: 1;\n  display: block;\n  padding: 12px;\n  color: #333;\n  border-bottom: 1px solid #EEEEF2;\n}\n.msg-list .item .item-lnk:before,\n.msg-list .item .item-lnk:after {\n  display: table;\n  content: "";\n  line-height: 0;\n}\n.msg-list .item .item-lnk:after {\n  clear: both;\n}\n.msg-list .item .avatar {\n  float: left;\n  margin-right: 12px;\n  width: 40px;\n  height: 40px;\n  overflow: hidden;\n  border-radius: 5px;\n}\n.msg-list .item .avatar img {\n  display: block;\n  width: 40px;\n}\n.msg-list .item .info {\n  position: relative;\n  height: 40px;\n  overflow: hidden;\n}\n.msg-list .item .info .username {\n  font-size: 16px;\n  margin-bottom: 5px;\n}\n.msg-list .item .info .latest-msg {\n  font-size: 13px;\n  color: #999;\n}\n.msg-list .item .info .send-time {\n  position: absolute;\n  z-index: 9;\n  top: 0;\n  right: 0;\n  color: #999;\n}\n'],sourceRoot:"webpack://"}])},function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=t(36),s=t(37),o=t(38),r=t(41);e["default"]={ready:function(){this.getData()},data:function(){return{showMenu:!1,pageType:"message",hdTitle:"消息",pageNo:1,list:[]}},methods:{getData:function(){var n=this;r.show(),o.get(i.chatListApi,{},function(e){r.hide(),e.result&&e.result.chatList?n.list=e.result.chatList:s.show({type:"error",title:"返回的数据格式有问题"})},function(n){r.hide(),s.show({type:"error",title:n.resultMsg})})}},components:{nvHead:t(68)}}},function(n,e){n.exports='\n    <!-- 全局header -->\n    <nv-head :page-type="pageType"\n            :show-menu="showMenu" :hd-title="hdTitle">\n    </nv-head>\n\n    <section class="page-content">\n    \t<ul class="msg-list">\n            <li class="item" v-for="item in list">\n\t\t        <a class="item-lnk" href="./chat.html?uid=<%= list[i].postUserId %>&did=<%= list[i].uUID %>">\n\t\t            <div class="avatar">\n\t\t                <img :src="item.avatar | getAvatar 60" alt="" />\n\t\t            </div>\n\t\t            <div class="info">\n\t\t                <span class="send-time">{{ item.sendTime | ago }}</span>\n\t\t                <div class="username">{{ item.from }}</div>\n\t\t                <div class="latest-msg">{{ item.message }}</div>\n\t\t            </div>\n\t\t        </a>\n            </li>\n        </ul>\n    </section>\n'}]));