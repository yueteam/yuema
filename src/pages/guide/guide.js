$(function() {
	var Utils = require('../../common/utils');

	var app = {
    	init: function() {
    		this.type();
    	},

    	msg: '整天瞎jb聊，又TM不约！然后就没有然后了...面对一些不了了之的缘分，你是否后悔过为什么不约出来见一见？是否想认识业内大牛而苦于没有门道？约吗提供了直接约线下见面的机会，帮你搞定约会，带你认识大牛，拓展人脉。',

    	len: function(){
	    	return this.msg.length;
	    },

	    sentencePos: 0,

	    speed: 150, //打字速度(ms)

	    timer: null,

	    type: function() {
	    	var me = this,
	    		msg = this.msg,
	    		len = this.len(),
	    		speed = this.speed;

			if (me.sentencePos >= len) {
				me.sentencePos = 0;
				clearTimeout(me.timer);

				// $('.go').addClass('in');
				$('.btn').addClass('shaking');
			} else {
				me.sentencePos++;
				$('.content').text(msg.substring(0, me.sentencePos));

				me.timer = setTimeout(function(){
					me.type()
				}, speed);
			}
	    }
    };

    app.init();

});