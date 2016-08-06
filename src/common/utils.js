var Utils = {

    /**
     * 获取URL参数
     * @return {[type]} [description]
     */
    getUrlParam: function(key){
        var reg = new RegExp('[?|&]'+ key +'=([^&]+)');
        var match = location.search.match(reg);
        return match && match[1];
    },

    /**
     * 阻止点透
     * @return {[type]} [description]
     */
    stopEventTap: function () {
        var $el = $('<div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 99999; "></div>');
        $('body').append($el);
        setTimeout(function () {
            $el.remove();
        }, 500);
    },

     /**
     * 格式化时间
     * @param  {[type]} date [description]
     * @return {[type]}      [description]
     */
    formatDate : function (date) {
        if(typeof date === 'string'){
            date = this.strToDate(date);
        }
        var year = date.getFullYear(),
            month = date.getMonth() + 1,
            day = date.getDate();

        if(month < 10){
            month = '0' + month;
        }
        if(day < 10){
            day = '0' + day;
        }
        return year + '-' + month + '-' + day;
    },

    /**
     * 字符串格式转时间
     * @param  {[type]} str [description]
     * @return {[type]}     [description]
     */
    strToDate : function (str) {
        var newStr = str.replace(/-/g,'/');
        return new Date(newStr);
    },

    /**
     * 隐藏键盘
     * @return {[type]} [description]
     */
    hideKeyboard: function () {
        var $a = $('<a style="width: 0;height: 0;font-size: 0;display: block"></a>');
        $('body').append($a);
        $a.focus();
        setTimeout(function(){
            $a.remove();
        }, 0);
    },

    /**
     * 获取网络状态是否良好
     * @return {[type]} [description]
     */
    getNetworkState : function () {
        var timingTime = 150;
        //默认网络状况不好
        var isGoodState = false;

        if(window.performance){
            var timing = window.performance.timing;
            var time = timing.responseEnd - timing.domainLookupStart; //从请求发起到返回的时间
            isGoodState = time > timingTime ? false : true;   //(本地pc10~ms   chorme network 模拟效果3g 100~ 图片加载比较流畅 edge 250 300~ 图片不流畅)
        }

        return isGoodState;
    },

    /**
     * 判断是否IOS操作系统，判断android也可以采用这个方法
     * @return {Boolean} [description]
     */
    isIOS : function() {
        var ua = window.navigator.userAgent;
        var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
        var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
        var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);

        if (ipad || iphone || ipod) {
            return true;
        }
        else{
            return false;
        }
    },

    /**
     * 是否android系统
     * @return {Boolean} [description]
     */
    isAndroid: function() {
        var ua = window.navigator.userAgent;
        return ua.indexOf('Android') > -1;
    },

    /**
     * 判断是否微信
     * @return {Boolean} [description]
     */
    isWeixin: function() {
        var ua = window.navigator.userAgent;
        return ua.indexOf('MicroMessenger') > -1;
    },

    /**
     * 获取cookie
     * @return {Boolean} [description]
     */
    getCookie: function(name) {
        var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)'),
            arr = document.cookie.match(reg);
     
        if(arr != null) { 
            return decodeURI(arr[2]); 
        }

        return ''; 
    },

    /**
     * 判断是否已登录
     * @return {Boolean} [description]
     */
    isLogin: function() {
        var me = this,
            isLogin = me.getCookie('logined');

        return isLogin !== '' ? true : false;
    },

    /**
     * underscore模板引擎
     * @return {[type]} [description]
     */
    template: function(text, data) {
        var escapes = {
            "'":      "'",
            '\\':     '\\',
            '\r':     'r',
            '\n':     'n',
            '\t':     't',
            '\u2028': 'u2028',
            '\u2029': 'u2029'
        };
        var escaper = /'|\\|\r|\n|\t|\u2028|\u2029/g;
        var entityRegexes = /[&<>"']/g;
        var matcher = /<%-([\s\S]+?)%>|<%=([\s\S]+?)%>|<%([\s\S]+?)%>|$/g; // escape、interpolate、evaluate
        var index = 0;
        var source = "__p+='";
        var render;

        function escapeEntity(string) {
            if (!string) {
                return '';
            }
            var entityMap = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&apos;'
            };
            return ('' + string).replace(/[&<>"']/g, function(match) {
                return entityMap[match];
            });
        }

        text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
            // HTML部分（index到offset）
            source += text.slice(index, offset).replace(escaper, function(match) {
                return '\\' + escapes[match];
            });
            // 变量值或js代码（offset之后）
            if (escape) { // 变量值，并进行HTML实体转义
                source += "'+\n((__t=(" + escape + "))==null?'':" + escapeEntity.name + "(__t))+\n'";
            }
            if (interpolate) { // 变量值
                source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
            }
            if (evaluate) { // js代码
                source += "';\n" + evaluate + "\n__p+='";
            }
            index = offset + match.length;
            return match;
        });
        source += "';\n";

        source = 'with(obj||{}){\n' + source + '}\n'; // 使用with获取传入的data的属性

        source = escapeEntity.toString() + // HTML实体转义函数
            "var __t,__p='',__j=Array.prototype.join," + // source是编译后的函数代码。“__t”是局部变量，用于获取变量的值。"__p"用于拼接模板
            "print=function(){__p+=__j.call(arguments,'');};\n" + // print函数用于打印带有常量字符串的变量值。使用Array.prototype.join把print内的参数变成字符串
            source + "return __p;\n";

        try { // 使用try-catch，出错后方便调试
            render = new Function('obj', source); // 使用new Function创建编译后的函数，this指向window
        } catch (e) {
            e.source = source;
            throw e;
        }

        if (data) return render(data); // 如果传递了data，则返回编译后的模板
        var template = function(data) { // 预编译函数
            return render(data);
        };

        template.source = 'function(obj){\n' + source + '}'; // 可以使用source属性查看编译后的函数，方便调试

        return template; // 如果没有传递data，则返回预编译函数
    }
};

module.exports = Utils;
