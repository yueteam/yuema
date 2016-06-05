$(function() {
	var Utils = require('../../common/utils');
    var Apimap = require('../../common/apimap');
	var Tips = require('../../components/tips');
	var Ajax = require('../../components/ajax');
	var Loading = require('../../components/loading/loading');

    var userId = Utils.getUrlParam('uid') || '';
    var datingId = Utils.getUrlParam('did') || '';

	var Chat = {
        socket : null,

    	init: function() {
            if(!Utils.isLogin()) {
                window.location.href = './login.html';
                return false;
            }

            var msgH = $(window).height() - 50;
            $('.chat-messages').height(msgH);

            if (window.location.protocol == 'http:') {
                Chat.connect('ws://' + window.location.host + '/websocket/chat/'+datingId+'/'+userId);
            } else {
                Chat.connect('wss://' + window.location.host + '/websocket/chat/'+datingId+'/'+userId);
            }
    	},

        connect : function(host) {
            var me = this;

            if ('WebSocket' in window) {
                Chat.socket = new WebSocket(host);
            } else if ('MozWebSocket' in window) {
                Chat.socket = new MozWebSocket(host);
            } else {
                Tips.show({
                    type: 'error',
                    title: 'Error: WebSocket is not supported by this browser.'
                });
                return;
            }

            Chat.socket.onopen = function () {
                me.initEvent();
            };

            Chat.socket.onclose = function () {
                document.getElementById('message').onkeydown = null;
                Tips.show({
                    type: 'error',
                    title: 'Info: WebSocket closed.'
                });
            };

            Chat.socket.onmessage = function (message) {
                me.render(message.data);
            };
        },

        sendMessage : function() {
            var message = $.trim($('#message').val());
            var data = {
                message: message,
                userId: userId,
                datingId: datingId
            } 
            if (!!message && !!userId && !!datingId) {
                Chat.socket.send(JSON.stringify(data));

                var msgHtml = '<li class="chat-message chat-message-self">'
                                   + '<div class="chat-message-bubble" style="transform: translate3d(0px, 0px, 0px); opacity: 1;">'+message+'</div>'
                               + '</li>';
                $('.chat-messages-list').append(msgHtml);

                $('#message').val('');
            }
        },

        render : function(message) {
            var msgHtml = '<li class="chat-message chat-message-friend">'
                              + '<div class="chat-message-bubble">'+message+'</div>'
                          + '</li>';

            $('.chat-messages-list').append(msgHtml);
        },

    	/**
         * 初始化事件
         */
        initEvent: function () {
        	var me = this;

        	document.addEventListener("DOMContentLoaded", function() {
                // Remove elements with "noscript" class - <noscript> is not allowed in XHTML
                var noscripts = document.getElementsByClassName("noscript");
                for (var i = 0; i < noscripts.length; i++) {
                    noscripts[i].parentNode.removeChild(noscripts[i]);
                }
            }, false);

            // 回车发送
            document.getElementById('message').onkeydown = function(event) {
                if (event.keyCode == 13) {
                    Chat.sendMessage();
                }
            };

            // 发送
            $(document).on('tap', '#sendBtn', function () {
            	Chat.sendMessage();
            });

        }
    };

    Chat.init();
	
});