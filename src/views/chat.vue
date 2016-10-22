<template>
    <!-- 全局header -->
    <nv-head :page-type="pageType"
            :show-menu="showMenu" :hd-title="hdTitle">
    </nv-head>

    <section class="page-content" transition="slide-right">
	    <div class="chat-window">
	        <div class="chat-messages">
	            <ol class="chat-messages-list">
	                <li class="chat-message chat-message-theme">
	                	<div class="chat-message-bubble">
	                		<span class="label">
	                			<span class="iconfont icon-lquote"></span> 约吗？
	                		</span>
	                		<br>
	                		<span>十一去阳澄湖吃大闸蟹，能吃爽</span>
	                		<br>
	                		<span class="what"><span class="iconfont icon-food"></span>美食</span>
	                		<span class="time"><span class="iconfont icon-calendar"></span>2016-10-01</span>
	                	</div>
	                </li>
	                <li class="chat-time"><span>2016年09月30日 11:39</span></li>
	                <li class="chat-message chat-message-friend" v-for="chat in messageList">
	                	<div class="chat-message-avatar">
	                		<a href="./profile.html?id=80">
	                			<img src="http://www.yuema.us/upload/玄悟/04e204117f1b45d5832f995895120d74.jpg_s60" alt="">
	                		</a>
	                	</div>
	                	<div class="chat-message-bubble">我们约会吧~</div>
	                </li>
	            </ol>
	        </div>
	        <div class="chat-input-bar">
	            <div class="chat-info-container">

	            </div>
	            <div class="chat-effect-container">
	                <div class="chat-effect-bar"></div>
	            </div>
	            <div class="chat-input-wrapper">
	                <!-- <textarea class="chat-input" id="message" placeholder="" autofocus></textarea> -->
	                <div class="chat-input" id="message" contenteditable=""></div>
	                <button class="chat-send" id="sendBtn" @click="sendMessage">
	                    <span class="iconfont icon-send"></span>
	                </button>
	            </div>
	        </div>
	    </div>
	</div>
</template>
<script>
	var Utils = require("../libs/utils");
	var Apimap = require('../libs/apimap');
    var Tips = require('../components/tips');
    var Ajax = require('../components/ajax');
    var Loading = require('../components/loading');

    var socket = null;

    export default {
        ready (){
            
        },
        attached (){
        	var me = this;

        	setTimeout(function(){
        		me.updateChatHeight();
        	},100);	        	
        },
        data (){
            return {
                showMenu: false,
                pageType: 'chat',
                hdTitle: '聊天',
                userId: '',
	            datingId: '',
	            detail: {},
				messageList: []
            }
        },
        route:{
            data (transition){
            	var me = this;
                
                //获取url传的id参数
                this.userId = transition.to.params.uid;
                this.datingId = transition.to.params.did;

                this.getDetail();
            	this.getData(function() {
            		if (window.location.protocol == 'http:') {
		                me.connect('ws://' + window.location.host + '/websocket/chat/'+me.datingId+'/'+me.userId);
		            } else {
		                me.connect('wss://' + window.location.host + '/websocket/chat/'+me.datingId+'/'+me.userId);
		            }
            	});

            }
        },
        methods:{ 
            connect : function(host) {
	            var me = this;

	            if ('WebSocket' in window) {
	                socket = new WebSocket(host);
	            } else if ('MozWebSocket' in window) {
	                socket = new MozWebSocket(host);
	            } else {
	                Tips.show({
	                    type: 'error',
	                    title: 'Error: WebSocket is not supported by this browser.'
	                });
	                return;
	            }

	            socket.onopen = function () {
	                me.initEvent();
	            };

	            socket.onclose = function () {
	                document.getElementById('message').onkeydown = null;
	                Tips.show({
	                    type: 'error',
	                    title: 'Info: WebSocket closed.'
	                });
	            };

	            socket.onmessage = function (message) {
	                var msg = JSON.parse(message.data);
	                console.log(msg);
	                me.messageList.push(msg);
	            };
	        },

	        sendMessage : function() {
	            var me = this;
	            var message = $.trim($('#message').text());
	            var data = {
	                message: message,
	                userId: me.userId,
	                datingId: me.datingId
	            } 
	            if (!!message && !!me.userId && !!me.datingId) {
	                socket.send(JSON.stringify(data));

	                $('#message').text('');
	                
	                if(!Utils.isWeixin()) {
	                    me.updateChatHeight();
	                }
	            }
	        },

	        addMessage : function(message) {
	            var me = this;
	            var $messagesContainer=$(".chat-messages");
	            var $messagesList = $('.chat-messages-list');

	            var newSendTime = message.sendTime.substr(0,19);
	            newSendTime = newSendTime.replace(/-/g,'/');
	            if(lastSendTime == '' || (lastSendTime!='' && (new Date(newSendTime).getTime() - lastSendTime) > 3*60*1000)) { // 大于3分钟
	                var sendTime = me.handleTime(newSendTime);
	                var $messageTime=$('<li/>')
	                    .addClass('chat-time')
	                    .html('<span>'+sendTime+'</span>')
	                    .appendTo($messagesList);
	            }
	            lastSendTime = new Date(newSendTime).getTime();

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

	        handleTime : function(time) {
	            var newTime = time.substr(0,19);
	            var date = Utils.strToDate(newTime);
	            
	            var year = date.getFullYear(),
	            month = date.getMonth() + 1,
	            day = date.getDate(),
	            hours = date.getHours(),         //获取当前小时数(0-23)
	            minutes = date.getMinutes(),     //获取当前分钟数(0-59)
	            seconds = date.getSeconds();     //获取当前秒数(0-59)

	            if(month < 10){
	                month = '0' + month;
	            }
	            if(day < 10){
	                day = '0' + day;
	            }
	            if(hours < 10) {
	                hours = '0' + hours;
	            }
	            if(minutes < 10) {
	                minutes = '0' + minutes;
	            }
	            if(seconds < 10) {
	                seconds = '0' + seconds;
	            }
	            return year + '年' + month + '月' + day + '日 ' + hours + ':' + minutes;
	        },

	        updateChatHeight : function() {
	            $('.chat-messages').css({
	                height: $(window).height() - $(".chat-input-bar").height()
	            });
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

	            if(!Utils.isWeixin()) {
	                $('.chat-input').on("input", function(){
	                    me.updateChatHeight();
	                });
	            }

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
	                    Tips.show({
	                        type: 'error',
	                        title: d.resultMsg
	                    });
	                }
	            );

	        },

	        /**
	         * 获取聊天记录数据
	         */
	        getData: function (cb) {
	            var me = this;
	           
	            apiData = {
	                'userId': me.userId,
	                'datingId': me.datingId
	            };
	            Loading.show();
	            Ajax.get(Apimap.chatRecordsApi, apiData,
	                function(d){
	                    Loading.hide();

	                    if(d.result && d.result.messageList) {
	                        me.messageList = d.result.messageList;
	                        
	                    } else {
	                        Tips.show({
	                            type: 'error',
	                            title: '返回的聊天数据格式有问题'
	                        });
	                    }
	                    cb && cb();
	                },
	                function(d){
	                    Loading.hide();

	                    Tips.show({
	                        type: 'error',
	                        title: d.resultMsg
	                    });
	                    cb && cb();
	                }
	            );

	        }
        },
        components:{
            "nvHead":require('./header.vue')
        }
    }
</script>
<style lang="less">
	@import "../assets/less/common/variables.less";
	@import "../assets/less/common/mixins.less";

    .chat-window button:focus {
		-webkit-tap-highlight-color: rgba(255,255,255,0);
		-webkit-tap-highlight-color: transparent;
		outline: none;
	}

	.chat-window {
		
	}

	.chat-messages {
		height: 460px;
		overflow-x: hidden;
		overflow-y: auto;
		width: 100%;
		position: relative;
		background: @clouds;
	}

	.chat-messages-list {
		list-style-type: none;
		padding: 0;
		margin: 0;
		width: 100%;
		padding: 60px 10px;
		line-height: 1.4;
		.border-box();
	}

	.chat-message {
		position: relative;
		font-size: 0;
		margin-bottom: 10px;
		padding-left: 40px;
		.chat-message-avatar {
			position: absolute;
			z-index: 9;
			left: 0;
			top: 0;
			width: 35px;
			height: 35px;
			overflow: hidden;
			.border-radius(50%);
			img {
				display: block;
				width: 35px;
				height: 35px;
			}
		}
		.chat-message-bubble {
			display: inline-block;
			font-size: 14px;
			max-width: 280px;
			background: #fff;
			padding: 8px 15px;
			border-radius: 18px;
			word-break: break-word;
			.border-box();
		}
	}

	.chat-time {
		margin: 10px 0;
		text-align: center;
		span {
			display: inline-block;
			padding: 3px 5px;
			font-size: 12px;
			color: #fff;
			background-color: @silver;
			border-radius: 5px;
		}
	}

	.chat-message-effect {
		position: absolute;
	}	

	.chat-message-self.chat-message-merge-start .chat-message-bubble {
		border-bottom-right-radius: 0;
	}

	.chat-message-self.chat-message-merge-middle .chat-message-bubble {
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
	}

	.chat-message-self.chat-message-merge-end .chat-message-bubble {
		border-top-right-radius: 0;
	}

	.chat-message-self {
		text-align: right;
		padding-left: 0;
		padding-right: 40px;
		.chat-message-avatar {
			left: auto;
			right: 0;
		}
	}

	.chat-message-self .chat-message-bubble,
	.chat-message-effect .chat-message-bubble { 
		background: @green-sea;
		color: #fff;
		text-align: left;
	}
	.chat-message-theme {
		margin-bottom: 20px;
		padding-left: 0;
		text-align: center;
		.chat-message-bubble {
			text-align: left;
			.label {
				font-size: 14px;
	            color: @green-sea;
	        }
	        .what, .time {
	            margin-right: 10px;
	            color: #999;
	            font-size: 12px;
		        .iconfont {
		            margin-right: 3px;
		            font-size: 12px;
		        }
	        }
		}
	}

	.chat-input-bar {
		position: relative;
		background: @green-sea;
	}

	.chat-input-wrapper {
		position: relative;
		z-index: 2;
		padding: 10px 0;
		border-radius: 0 0 2px 2px;
		color: #fff;
	}

	.chat-input-wrapper,
	.chat-send {
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-flex-wrap: wrap;
		-ms-flex-wrap: wrap;
		flex-wrap: wrap;
		-webkit-justify-content: center;
		justify-content: center;
		font-size: 16px;
	}

	.chat-input-tool {
		background: transparent;
		border: none;
		padding: 0 20px;
		color: inherit;
	}

	.chat-input {
		.border-box();
		outline: none;
		resize: none;
		overflow: hidden;
		min-height: 38px;
		-webkit-flex: 1;
		flex: 1;
		font-size: 14px;
		padding: 10px 0 10px 20px;
		color: #fff;
		cursor: text;
	}

	.chat-input:empty::before {
		content: "说点什么吧...";
	}

	.chat-input:focus::before {
		content: "";
	}

	.chat-send {
		background: transparent;
		border: none;
		position: relative;
		overflow: hidden;
		padding: 0 20px;
		color: #fff;
		-webkit-transition: color 0.6s;
		transition: color 0.6s;
	}

	.chat-input:empty + .chat-send {
		color: #fff;
	}

	.chat-send>i {
		position: relative;
	}

	.chat-effect-container {
		position: absolute;
		top: -100px;
		width: 100%;
	}

	.chat-effect-bar {
		background: @green-sea;
		position: absolute;
		top: 100px;
		width: 100%;
		height: 40px;
		-webkit-transform: rotateY(0);
		transform: rotateY(0);
	}

	.chat-effect-dots {
		position: absolute;
	}

	.chat-effect-dot {
		background: @green-sea;
		position: absolute;
		width: 15px;
		height: 15px;
		border-radius: 100%;
	}

	.chat-info-container {
		position: absolute;
		top: -20px;
		font-size: 12px;
		color: #2B8EC2;
	}

	.chat-info-typing {
		position: absolute;
		left: 80px;
		white-space: nowrap;
	}

</style>

