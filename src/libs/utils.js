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
    }
};

module.exports = Utils;
