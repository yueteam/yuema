var Utils = require("../../common/utils");
var Apimap = require('../../common/apimap');
var Tips = require('../../components/tips');
var Ajax = require('../../components/ajax');
var Loading = require('../../components/loading/loading');
var Dialog = require('../../components/dialog/dialog');

module.exports = {
    init: function() {
        var me = this;
        $(document).on('tap', '.g-yue', function(){
            Utils.stopEventTap();
            
            var id = $(this).data('id'),
                userId = $(this).data('uid');
            var bdHtml = [
                    '<div class="input-row">',
                        '<textarea class="ask-txa" id="askWords" placeholder="说点什么"></textarea>',
                    '</div>'
                ].join('');

            Dialog.confirm({'title': '回应这个邀约', 'body': bdHtml}, function(){
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
           
        });
    },
  
    /**
     * 判断是否微信
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
