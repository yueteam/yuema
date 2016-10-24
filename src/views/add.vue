<template>
    <!-- 全局header -->
    <nv-head :page-type="pageType"
            :show-menu="showMenu" :hd-title="hdTitle">
    </nv-head>

    <section class="page-content fade hiden">
    	<div class="post-box">
	        <div class="textarea-box" @click="focusTxa">
	            <textarea class="date-desc" id="dateDesc" placeholder="在此处描述你的约会，最多100个字。" autofocus></textarea>
	            <div class="bar">
	                <div class="bar-con">
	                    <div class="opt" id="optWhat" v-show="!!whatText">
	                    	<span class="iconfont" :class="whatText | getIconClass"></span>{{whatText | getTypeName}}
	                    </div>
	                    <div class="opt" id="optWhere" v-show="!!whereText"></div>
	                    <div class="opt" id="optWhen" v-show="!!whenText">
	                    	<span class="iconfont icon-calendar"></span>{{whenText}}
	                    </div>                
	                </div>
	                <a id="sendBtn" class="btn btn-small btn-primary" @click="send()">
	                    <span class="iconfont icon-send"></span>
	                </a>
	            </div>
	        </div>
	        <div class="post-option">
	            <a class="opt-item" :class="currentOpt=='what'?'active':''" href="javascript:;" @click="switchOpt('what')">
	                <span class="iconfont icon-idea"></span>
	            </a>
	            <a class="opt-item" :class="currentOpt=='where'?'active':''" href="javascript:;" style="line-height:44px;" @click="switchOpt('where')">
	                <span class="iconfont icon-location"></span>
	            </a>
	            <a class="opt-item" :class="currentOpt=='when'?'active':''" href="javascript:;" @click="switchOpt('when')">
	                <span class="iconfont icon-calendar"></span>
	            </a>
	        </div>
	        <div class="panels">
	            <div class="opt-panel what-block" :class="currentOpt=='what'?'open':''">
	                <h3>约什么</h3>
	                <ul class="what-list">
	                    <li class="what-item" :class="submitData.typeId==2?'selected':''" @click="chooseWhat(2)">
	                        <span class="iconfont icon-coffee"></span>喝咖啡/茶
	                    </li>
	                    <li class="what-item" :class="submitData.typeId==3?'selected':''" @click="chooseWhat(3)">
	                        <span class="iconfont icon-food"></span>美食
	                    </li>
	                    <li class="what-item" :class="submitData.typeId==4?'selected':''" @click="chooseWhat(4)">
	                        <span class="iconfont icon-film"></span>看电影
	                    </li>
	                    <li class="what-item" :class="submitData.typeId==11?'selected':''" @click="chooseWhat(11)">
	                        <span class="iconfont icon-flight"></span>同行
	                    </li>
	                    <li class="what-item" :class="submitData.typeId==5?'selected':''" @click="chooseWhat(5)">
	                        <span class="iconfont icon-run"></span>跑步
	                    </li>
	                    <li class="what-item" :class="submitData.typeId==7?'selected':''" @click="chooseWhat(7)">
	                        <span class="iconfont icon-badminton"></span>羽毛球
	                    </li>
	                    <li class="what-item" :class="submitData.typeId==8?'selected':''" @click="chooseWhat(8)">
	                        <span class="iconfont icon-riding"></span>骑行
	                    </li>
	                    <li class="what-item" :class="submitData.typeId==9?'selected':''" @click="chooseWhat(9)">
	                        <span class="iconfont icon-drive"></span>自驾
	                    </li>
	                    <li class="what-item" :class="submitData.typeId==6?'selected':''" @click="chooseWhat(6)">
	                        <span class="iconfont icon-photo"></span>摄影
	                    </li>
	                    <!-- <li class="what-item" :class="submitData.typeId==10?'selected':''" @click="chooseWhat(10)">
	                        <span class="iconfont icon-shopping"></span>逛商场
	                    </li> -->
	                    <li class="what-item" :class="submitData.typeId==1?'selected':''" @click="chooseWhat(1)">
	                        <span class="iconfont icon-lquote"></span>其他
	                    </li>
	                </ul>
	            </div>
	            <div class="opt-panel where-block" :class="currentOpt=='where'?'open':''">
	                <h3>约在哪</h3>
	                <ul class="where-list">
	                    <li class="where-item">敬请期待~</li>                
	                </ul>
	            </div>
	            <div class="opt-panel when-block" :class="currentOpt=='when'?'open':''">
	                <h3>约何时</h3>
	                <ul class="when-list">
	                    <li class="when-item" :class="whenType==1?'selected':''" @click="chooseWhen(1)">今天</li>
	                    <li class="when-item" :class="whenType==2?'selected':''" @click="chooseWhen(2)">明天</li>
	                    <li class="when-item" :class="whenType==0?'selected':''" @click="chooseWhen(0)">随时</li>
	                    <li class="when-item" :class="whenType==3?'selected':''" @click="chooseWhen(3)">
	                        <a href="javascript:;" class="ar-lnk">具体日期</a>
	                        <input type="date" id="calLink" v-on:change="changeDate" lazy />
	                    </li>
	                </ul>
	            </div>
	        </div>
	    </div>
    </section>
</template>
<script>
    var Utils = require("../libs/utils");
	var Apimap = require('../libs/apimap');
    var Tips = require('../components/tips');
    var Ajax = require('../components/ajax');
    var Loading = require('../components/loading');
    var Nodata = require('../components/nodata');
    var Dialog = require('../components/dialog');

	var now = new Date(),
        today = new Date(now.setHours(0, 0, 0, 0)),
        tommorrow = new Date(today.getTime() + 1 * 86400 * 1000),
        last30days = new Date(today.getTime() + 29 * 86400 * 1000);

    export default {
        ready (){
        	
        },
        attached (){
        	
        	setTimeout(function(){
        		$('#dateDesc').focus();

	    		var listH = $(window).height() - $('.textarea-box').height() - $('.post-option').height() - 50;
	            $('.panels').height(listH);
	    		$('.opt-panel').height(listH);

	    		$('.page-content').removeClass('hiden');
        	},100);
	        	
        },
        data (){
            return {
                showMenu: false,
                pageType: 'add',
                hdTitle: '发起约会',
                currentOpt: 'what',
                whatText: '',
                whenType: '',
                whenText: '',
                submitData: {
                	typeId: 1
                }
            }
        },
        methods:{ 
        	focusTxa : function() {
        		$('#dateDesc').focus();
        	},
        	switchOpt : function(opt) {
        		this.currentOpt = opt;
        	},
        	chooseWhat : function(what) {
        		this.whatText = what;
        		this.submitData.typeId = what;
        		this.getOptWhereWidth();
        	},
        	chooseWhen : function(when) {
        		this.whenType = when;

                if(when == 1) {
                	this.whenText = '今天';
                    var theDate = Utils.formatDate(today);
                    $('#calLink').val(theDate);
                } else if(when == 2) {
                	this.whenText = '明天';
                    var theDate = Utils.formatDate(tommorrow);
                    $('#calLink').val(theDate);
                } else if(when == 0) {
                	this.whenText = '随时';
                    $('#calLink').val('');
                }
            	this.getOptWhereWidth();
        	},
        	changeDate : function(e) {
	        	var date = Utils.formatDate(e.target.value);
                date = date.replace(/\-/g,'/');

                this.whenText = date;
                this.getOptWhereWidth();
            },

        	getOptWhereWidth : function() {
            	var conW = $('.bar-con').width(),
            		whatW = $('#optWhat').width(),
            		whenW = $('#optWhen').width();

            	var whereW = conW - whatW - whenW - 33;
            	$('#optWhere').css('maxWidth', whereW);
            },

            send: function () {
            	var desc = $.trim($('#dateDesc').val());

            	if(desc === '') {
            		Tips.show({
	                    type: 'error',
	                    title: '说点什么吧'
	                });
            	} else {
            		this.submitData.article = desc;
            		if($('#calLink').val() !== '') {
            			this.submitData.datingTime = $('#calLink').val();
            		}
            		console.log(this.submitData);
            		this.doSubmit();
            	}
            },

	        // 提交数据
	        doSubmit: function () {
	            var me = this;

	            Loading.show();
	           
	            Ajax.post(Apimap.postDatingApi, {
						'datingInfo': JSON.stringify(me.submitData)
					},
					function(d){
						Loading.hide();

					    Tips.show({
		                    type: 'success',
		                    title: '发布成功'
		                });

		                setTimeout(function(){
		                	me.$route.router.go({name: 'list'});
		                },2000);
	                	
					},
					function(d){
						Loading.hide();

					    Tips.show({
		                    type: 'error',
		                    title: d.resultMsg
		                });
					},
					true
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

    body {
		position: relative;
	}
	.post-box {
		.textarea-box {
			position: relative;
			.date-desc {
				display: block;
				padding: 10px 10px 50px;
				width: 100%;
				height: 206px;
				font-size: 16px;
				background: #fff;
				.border-box();
			}
			.bar {
				position: absolute;
				z-index: 9;
				left: 0;
				bottom: 0;
				padding: 0 80px 0 10px;
				width: 100%;
				height: 40px;
				.border-box();
				.bar-con {
					line-height: 30px;
					border-top: 2px dotted @borderColor;
					.clearfix();
				}
				.opt {
					float: left;
					margin-right: 15px;
					color: #999;
					&:last-child {
						margin-right: 0;
					}
					.iconfont {
						margin-right: 5px;
						font-size: 12px;
					}
				}
				#optWhere {
					.text-overflow();
				}
				#sendBtn {
					position: absolute;
					z-index: 10;
					right: 10px;
					top: 0;
				}
			}
		}
		.post-option {
			width: 100%;
			height: 44px;
			.flex();
			.opt-item {
				position: relative;
				line-height: 40px;
	        	text-align: center;
	        	font-size: 20px;
	        	color: #666;
				background: @gray;
				.flex-avg();
				border-top: 1px solid @borderColor;
				border-right: 1px solid @borderColor;
		        &:last-child {
		            border-right: 0;
		        }
		        &.active {
		        	color: #fff;
		        	background: @green-sea;
		        }
			}
		}
		.panels {
			height: 367px;
			position: relative;
			overflow: hidden;
		}
		.opt-panel {
			position: absolute;
			z-index: 99;
			top: 0;
			left: 0;
			width: 100%;
			height: 367px;
			opacity: 0;
			.translate3d(0%,100%,0);
			.transition(400ms);
			font-size: 14px;
			background: @light-gray;
			overflow-y: auto;
			&.open {
				opacity: 1;
				.translate3d(0%,0%,0);
			}
			h3 {
				margin: 0;
				padding-left: 15px;
				height: 35px;
				line-height: 35px;
				color: #666;
				font-size: 16px;
				font-weight: 500;
				background: @white;
			}
			.what-list {
				.clearfix;
				color: #666;
				.what-item {
					position: relative;
					float: left;
					padding-left: 15px;
					width: 50%;
					height: 50px;
					line-height: 50px;
		        	text-align: left;
		        	border-bottom: 1px solid @borderColor;
		        	.border-box();
					&:nth-child(odd) {
						border-right: 1px solid @borderColor;
					}
					&.selected {
						color: @green-sea;
					}
					.iconfont {
						margin-right: 10px;
					}
				}
			}
			.where-list {
				color: #666;
				.where-item {
					padding-left: 15px;
					height: 60px;
					line-height: 60px;
		        	border-bottom: 1px solid @borderColor;
				}
			}
			.when-list {
				color: #666;
				.when-item {
					position: relative;
					padding-left: 15px;
					height: 60px;
					line-height: 60px;
		        	border-bottom: 1px solid @borderColor;
					&.selected {
						color: @green-sea;
						.ar-lnk {
							color: @green-sea;
						}
					}
		        	#calLink {
		        		position: absolute;
		        		z-index: 9;
		        		top: 0;
		        		left: 0;
		        		opacity: 0;
		        		width: 100%;
		        		height: 60px;
		        	}
				}
			}
		}
	}

</style>

