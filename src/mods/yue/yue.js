var Dialog = require('../../components/dialog/dialog');
module.exports = {

    init: function() {
        $(document).on('tap', '.g-yue', function(){
            var bdHtml = [
                    '<div class="input-row">',
                        '<textarea class="ask-txa" placeholder="说点什么"></textarea>',
                    '</div>'
                ].join('');

            Dialog.confirm({'title': '回应这个邀约', 'body': bdHtml}, function(){
                
            });
           
        });
    },
  
    /**
     * 判断是否微信
     * @return {Boolean} [description]
     */
    sendAsk: function() {
        
    }

};
