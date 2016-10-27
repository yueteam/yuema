<template>
    <!-- 全局header -->
    <nv-head :page-type="pageType" :hd-title="hdTitle" 
             :show-menu="showMenu" :menu-back="menuBack">
    </nv-head>
    <loading :show-load="showLoad" load-type="loadmodal"></loading>
    <section class="page-content" :transition="transitionName">
	    <div class="chat-window">
	        <div class="chat-messages">
	            <ol class="chat-messages-list">
	                <li class="chat-message chat-message-theme">
	                	<div class="chat-message-bubble">
	                		<span class="label">
	                			<span class="iconfont icon-lquote"></span> 约吗？
	                		</span>
	                		<br>
	                		<span>{{detail.article}}</span>
	                		<br>
	                		<span class="what">
	                			<span class="iconfont" :class="detail.typeId | getIconClass"></span>
	                			{{detail.typeId | getTypeName}}
	                		</span>
	                		<span class="time">
	                			<span class="iconfont icon-calendar"></span>
	                			{{detail.datingTime | getDatingDate}}
	                		</span>
	                	</div>
	                </li>
	                <li class="chat-message" :class="msg.self?'chat-message-self':'chat-message-friend'" v-for="msg in messageList">
	                	<div class="chat-time"><span>{{msg.sendTime | msgTime}}</span></div>
	                	<div class="chat-message-avatar">
	                		<a v-link="{name: 'profile', params: {id: msg.fromUserId}}">
	                			<img :src="msg.avatar | getAvatar 60" alt="">
	                		</a>
	                	</div>
	                	<div class="chat-message-bubble">{{msg.message || msg.msg}}</div>
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
	                <div class="chat-input" id="message" contenteditable="" 
	                	@click="focusInput" @keydown.enter="sendMessage" @input="watchInputHeight"></div>
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

    var socket = null;
    var lastSendTime = '';

    export default {
        ready (){
            
        },
        attached (){
        	var me = this;

        	setTimeout(function(){
        		me.updateChatHeight();

        		// Remove elements with "noscript" class - <noscript> is not allowed in XHTML
                var noscripts = document.getElementsByClassName("noscript");
                for (var i = 0; i < noscripts.length; i++) {
                    noscripts[i].parentNode.removeChild(noscripts[i]);
                }
        	},100);	        	
        },
        data (){
            return {
                showMenu: false,
                pageType: 'chat',
                hdTitle: '聊天',
                menuBack: true,
                userId: '',
	            datingId: '',
	            detail: {},
				messageList: [],
				showLoad: false,
				transitionName: 'slide-right'
            }
        },
        route:{
            data (transition){
            	var me = this;
                
                //获取url传的id参数
                this.userId = transition.to.params.uid;
                this.datingId = transition.to.params.did;

                this.getDetail();
            	this.getData();

            	if (window.location.protocol == 'http:') {
	                me.connect('ws://' + window.location.host + '/websocket/chat/'+me.datingId+'/'+me.userId);
	            } else {
	                me.connect('wss://' + window.location.host + '/websocket/chat/'+me.datingId+'/'+me.userId);
	            }

	            setTimeout(function(){
			        $(window).scrollTop(0);
			    },150);

            },
            activate (transition){
            	if(transition.from.name === 'message'){
                	this.transitionName = 'slide-right';
                } else if(transition.from.name === 'profile'){
                	this.transitionName = 'fade';
                }
                setTimeout(function(){
                	transition.next();
                },100);
                
            },
            deactivate (transition){
                if(transition.to.name === 'profile'){
                    this.transitionName = 'fade';
                } else {
                    this.transitionName = 'slide-right';
                }
                setTimeout(function(){
                	transition.next();
                },100);
            }
        },
        filters: {
	        msgTime : function(time) {
	            var newSendTime = time.substr(0,19).replace(/-/g,'/');
	            var sendTime = '';
	            
	            if(lastSendTime == '' || (lastSendTime!='' && (new Date(newSendTime).getTime() - lastSendTime) > 60*60*1000)) { // 大于3分钟
	                sendTime = this.handleTime(newSendTime);
	            }
	            lastSendTime = new Date(newSendTime).getTime();
	            
	            return sendTime;
	        }
        },
        methods: { 
        	focusInput : function() {
        		$('#message').focus();
        	},
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
	                // me.initEvent();
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
	                setTimeout(function(){	                        
            			$('.chat-messages').scrollTop(9999999);
            		},100);
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

	        updateChatHeight : function() {
	            $('.chat-messages').css({
	                height: $(window).height() - $(".chat-input-bar").height() - 50
	            });
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

	    	/**
	         * 输入文字时检测响应输入框高度变化
	         */
	        watchInputHeight: function () {
	        	if(!Utils.isWeixin()) {
	                this.updateChatHeight();
	            }
	        },

	        /**
	         * 获取约会详情
	         */
	        getDetail: function () {
	            var me = this;
	           
	            var params = {
	                'userId': me.userId,
	                'datingId': me.datingId
	            };
	            me.showLoad = true;
	            Ajax.get(Apimap.datingDetailApi, params,
	                function(d){
	                    me.showLoad = false;

	                    if(d.result && d.result.datingInfo) {
	                        var datingInfo = d.result.datingInfo;

	                        me.detail = datingInfo;
	                    } else {
	                        Tips.show({
	                            type: 'error',
	                            title: '返回的约会数据格式有问题'
	                        });
	                    }
	                },
	                function(d){
	                	me.showLoad = false;
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
	        getData: function () {
	            var me = this;
	           
	            var params = {
	                'userId': me.userId,
	                'datingId': me.datingId
	            };
	            me.showLoad = true;
	            Ajax.get(Apimap.chatRecordsApi, params,
	                function(d){
	                    me.showLoad = false;

	                    if(d.result && d.result.messageList) {
	                        me.messageList = d.result.messageList;
	                        setTimeout(function(){	                        
	                			$('.chat-messages').scrollTop(9999999);
	                		},100);
	                    } else {
	                        Tips.show({
	                            type: 'error',
	                            title: '返回的聊天数据格式有问题'
	                        });
	                    }
	                },
	                function(d){
	                    me.showLoad = false;

	                    Tips.show({
	                        type: 'error',
	                        title: d.resultMsg
	                    });
	                }
	            );

	        }
        },
        components:{
            'nvHead': require('./header.vue'),        
            'loading': require('../components/loading.vue')
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
		padding: 10px;
		line-height: 1.4;
		.border-box();
	}

	.chat-message {
		position: relative;
		font-size: 0;
		margin-bottom: 20px;
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
		position: absolute;
		top: -15px;
		left: 0;
		width: 100%;
		text-align: center;
		span {
			display: inline-block;
			font-size: 12px;
			color: #999;
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

