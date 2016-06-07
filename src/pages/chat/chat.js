$(function() {
	var Utils = require('../../common/utils');
    var Apimap = require('../../common/apimap');
	var Tips = require('../../components/tips');
	var Ajax = require('../../components/ajax');
	var Loading = require('../../components/loading/loading');

    var userId = Utils.getUrlParam('uid') || '';
    var datingId = Utils.getUrlParam('did') || '';

    var pageNo = 1;
    var pageEnd = false;

	var Chat = {
        socket : null,

    	init: function() {
            if(!Utils.isLogin()) {
                window.location.href = './login.html';
                return false;
            }

            var msgH = $(window).height() - 50;
            $('.chat-messages').height(msgH);

            this.getDetail();
            this.getData();

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
                var msg = JSON.parse(message.data);

                me.addMessage(msg);
            };
        },

        sendMessage : function() {
            var me = this;
            var message = $.trim($('#message').val());
            var data = {
                message: message,
                userId: userId,
                datingId: datingId
            } 
            if (!!message && !!userId && !!datingId) {
                Chat.socket.send(JSON.stringify(data));

                // me.addMessage(message,true);

                $('#message').val('');
            }
        },

        addMessage : function(message) {
            var $messagesContainer=$(".chat-messages");
            var $messagesList = $('.chat-messages-list');

            var $messageContainer=$('<li/>')
                .addClass('chat-message '+(message.self?'chat-message-self':'chat-message-friend'))
                .appendTo($messagesList);
            
            var $messageAvatar=$('<div/>')
                .addClass('chat-message-avatar')
                .appendTo($messageContainer);

            var $messageBubble=$('<div/>')
                .addClass('chat-message-bubble')
                .appendTo($messageContainer);
            
            $messageAvatar.html('<a href="./profile.html?id=' + message.fromUserId + '"><img src="' + message.avatar + '_s60" alt="" /></a>');
            // $messageBubble.text(message);
            $messageBubble.html(message.message || message.msg);

            $messagesContainer.scrollTop(9999999);

            return {
                $container:$messageContainer,
                $bubble:$messageBubble
            };
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

        },

        /**
         * 获取约会详情
         */
        getDetail: function () {
            var me = this;

            var iconMap = {
                '2': 'icon-coffee',
                '3': 'icon-food',
                '4': 'icon-film',
                '5': 'icon-run',
                '6': 'icon-photo',
                '7': 'icon-badminton',
                '8': 'icon-riding',
                '9': 'icon-drive',
                '11': 'icon-flight',
                '1': 'icon-lquote'
            };
            var typeName = {
                '2': '喝咖啡/茶',
                '3': '美食',
                '4': '看电影',
                '5': '跑步',
                '6': '摄影',
                '7': '羽毛球',
                '8': '骑行',
                '9': '自驾',
                '11': '同行',
                '1': '其他'               
            };
           
            apiData = {
                'userId': userId,
                'datingId': datingId
            };
            Loading.show();
            Ajax.get(Apimap.datingDetailApi, apiData,
                function(d){
                    Loading.hide();

                    if(d.result && d.result.datingInfo) {
                        var datingInfo = d.result.datingInfo;

                        var datingTime = datingInfo.datingTime || '',
                            typeId = datingInfo.typeId;
                        
                        if(datingTime !== '') {
                            var time = datingTime.substr(0,10);
                        } else {
                            var time = '随时';
                        }
                        
                        var detaiHtml = '<li class="chat-message chat-message-theme">'
                                            +'<div class="chat-message-bubble">' 
                                                +'<span class="label"><span class="iconfont icon-lquote"></span> 约吗？</span><br />' 
                                                +'<span>' + datingInfo.article + '</span><br />'
                                                +'<span class="what"><span class="iconfont '+iconMap[typeId]+'"></span>'+typeName[typeId]+'</span>'
                                                +'<span class="time"><span class="iconfont icon-calendar"></span>'+time+'</span>'
                                            +'</div>'
                                        +'</li>';

                        $('.chat-messages-list').prepend(detaiHtml);
                    } else {
                        Tips.show({
                            type: 'error',
                            title: '返回的约会数据格式有问题'
                        });
                    }
                },
                function(d){
                    Loading.hide();
                }
            );

        },

        /**
         * 获取聊天记录数据
         */
        getData: function () {
            var me = this;
           
            apiData = {
                // 'page': pageNo,
                'userId': userId,
                'datingId': datingId
            };
            Loading.show();
            Ajax.get(Apimap.chatRecordsApi, apiData,
                function(d){
                    Loading.hide();

                    if(d.result && d.result.messageList) {
                        var messageList = d.result.messageList;
                        if(messageList.length > 0) {
                            for(var i = 0, len = messageList.length; i < len; i++) {
                                me.addMessage(messageList[i]);
                            }
                        }
                    } else {
                        Tips.show({
                            type: 'error',
                            title: '返回的聊天数据格式有问题'
                        });
                    }
                },
                function(d){
                    Loading.hide();
                }
            );

        }

    };

    Chat.init();
	
});