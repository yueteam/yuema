$(function() {
	var Utils = require('../../common/utils');

	var app = {
    	init: function() {
    		this.type();
    	},

    	msg: '整天瞎jb聊，又TM不约！然后就没有然后了... 面对一些不了了之的缘分，你是否后悔过为什么不约出来见一见？为了那些忙得没时间在各种婚恋网站、社交平台上撩妹的职场精英们，约吗提供了直接约线下见面的机会，区别于low爆的同城社交，我们会对职场信息的真实性进行认证，前期也只在特定的圈子内先玩起来，我们相信技术也可以帮助人们找到对的另一半。',

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