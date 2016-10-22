var Utils = require("../libs/utils");
var Apimap = require('../libs/apimap');
var Tips = require('./tips');
var Ajax = require('./ajax');
var Loading = require('./loading');
var Dialog = require('./dialog');

module.exports = {
    trigger: function(id, userId) {
        var me = this;
        // $(document).on('tap', '.g-yue', function(){
        if(!Utils.isLogin()) {
            this.$route.router.go({name: 'login'});
            return false;
        }

        Utils.stopEventTap();
        
        var bdHtml = [
                '<div class="input-row">',
                    '<textarea class="ask-txa" id="askWords" placeholder="讲文明懂礼貌，把握好这仅有的一次机会"></textarea>',
                '</div>'
            ].join('');

        Dialog.confirm({'title': '回应这个邀约', 'body': bdHtml, 'okText': '我想约你',}, function(){
            var askWords = $.trim($('#askWords').val());
            if(askWords === '') {
                Tips.show({
                    type: 'error',
                    title: '说点什么吧'
                });
                return false;
            }
            me.sendAsk(id, userId, askWords);
        });
           
        // });
    },
  
    /**
     * 发送信息
     * @return {Boolean} [description]
     */
    sendAsk: function(id, uid, message) {
        var me = this;

        Loading.show();
       
        Ajax.post(Apimap.requestDatingApi, {
                'datingId': id,
                'userId': uid,
                'message': message
            },
            function(d){
                Loading.hide();

                Tips.show({
                    type: 'success',
                    title: '发送成功，请耐心等待回音'
                });
            },
            function(d){
                Loading.hide();

                Tips.show({
                    type: 'error',
                    title: d.resultMsg
                });
            }
        );
    }

};
