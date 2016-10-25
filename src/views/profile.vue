<template>
	<!-- 全局header -->
    <nv-head :page-type="pageType"
            :show-menu="showMenu" :hd-title="hdTitle">
    </nv-head>
    <loading :show-load="showLoad" load-type="loadmodal"></loading>
    <section class="page-content" :transition="transitionName">
    	<nodata :show="showNodata" :msg="nodataMsg"></nodata>
    	<div class="basic-info" v-if="!showNodata">
	        <div class="scroller">
	            <div class="item">
	                <img v-if="info && info.avatar" src="http://www.yuema.us/build/images/blank.gif" 
	                	:style="{backgroundImage: 'url(' + info.avatar + '_s480)'}" alt="" />
	            </div>
	        </div>
	        <ul class="top-info">
	            <li class="info-city">
	                <div class="iconfont icon-location"></div>
	                {{info.cityId | getCityName}}
	            </li>
	            <li class="info-constellation">
	                <div class="iconfont icon-constellation"></div>
	                {{info.constellation}}
	            </li>
	            <li class="info-age">
	                <div class="iconfont" :class="info.sex | getSexCls"></div>
	                {{info.birthday | getAge}}岁
	            </li>
	        </ul>
	        <div class="info">
	            <h2 class="name">
	                {{info.nickName}}
	            </h2>
	            <div class="profession">
	                {{info.socialId | getProfession info.career}}
	            </div>
	        </div>
	    </div>
	    <div class="details" v-if="!showNodata">
	        <ul class="stat">
	            <li class="stat-item">
	                <h3>0次<br>赴约</h3>
	            </li>
	            <li class="stat-item">
	                <h3>0次<br>爽约</h3>
	            </li>
	        </ul>
	    </div>
	    <div class="dating-con" v-if="!showNodata">
	        <div class="ask-lnk" v-if="myHome" v-link="{name:'asklist'}">
	        	<span class="ar-lnk">查看请求的约会进度</span>
	        </div>

            <ul class="dating-list">
                <li class="empty-item" v-if="list.length==0">
                	<div v-if="myHome">
	                    <div class="empty-tip">
	                    试试发个约会呗，看看谁想撩你？
	                    </div>
	                    <a class="btn btn-green" v-link="{name:'add'}">
	                        <span class="iconfont icon-send"></span>发起约会
	                    </a>
	                </div>
                    <div class="empty-tip" v-else>
                    	啊哦~ Ta还没发过约会呢~
                    </div>
                </li> 
                <li class="item" v-else v-for="(i, item) in list">
                    <div class="date-words">  
                        <div class="label" v-if="item.datingInfo.acceptUserId">	                        	
                        </div>
                        <div class="label" v-else>
                        	<span class="iconfont icon-lquote"></span>约吗？
                        </div>
                        {{item.datingInfo.article}}
                    </div>
                    <div class="date-info">
                        <span class="what">
                        	<span class="iconfont" :class="item.datingInfo.typeId | getIconClass"></span>
                        	{{item.datingInfo.typeId | getTypeName}}
                        </span>
                        <span class="time">
                        	<span class="iconfont icon-calendar"></span>
                        	{{item.datingInfo.datingTime | getDatingDate}}
                        </span>
                    </div>
                    <div class="yue-status" v-if="item.datingInfo.acceptUserId">
                    	<div class="flag">已约</div>
                    </div>
                    <a class="g-yue pure" v-else v-show="!myHome" href="javascript:;" @click="yue(item.datingInfo.uUID, info.id)">
                        <span class="iconfont icon-yes"></span>
                    </a>
                    <div class="request-list" v-if="item.requestUserInfos.length">
                        <span class="arrow"></span>
                        <div class="request-item" v-for="(j, requestItem) in item.requestUserInfos">
                            <div class="avatar">
                                <a v-link="{name:'profile',params:{id:requestItem.requestDatingUserInfo.id}}">
                                    <img :src="requestItem.requestDatingUserInfo.avatar | getAvatar 60" alt="" />
                                </a>
                            </div>
                            <div class="info">
                                <div class="name">
                                    {{requestItem.requestDatingUserInfo.nickName}}
                                    <span class="pub-time">{{requestItem.requestDatingTime | ago}}</span>
                                </div>
                                <div class="words">{{requestItem.requestDatingMessage}}</div>
                            </div>
                            <div class="action-area">
                                <div v-if="item.requestUserInfos[0].requestDatingAccept">
                                	<div v-if="j==0">
	                                	<span class="iconfont icon-checked"></span>
	                                	<a class="iconfont icon-message" 
	                                		v-link="{name:'chat',params:{uid:info.id,did:item.datingInfo.uUID}}"></a>
	                                </div>
	                                <span class="iconfont icon-no" v-else></span>
                                </div>                     
	                            <a v-else href="javascript:;" class="btn btn-tiny btn-primary btn-accept" @click="acceptAsk(item.datingInfo.uUID, requestItem.requestDatingUserInfo.id, i)">接受</a>

                            </div>
                        </div>
                    </div>
                </li>
            </ul>		        
	    </div>
    </section>
</template>
<script>
    var Apimap = require('../libs/apimap');
    var Tips = require('../components/tips');
    var Ajax = require('../components/ajax');
    var Dialog = require('../components/dialog');
    var Yue = require('../components/yue');

    export default {
        ready (){
        	
        },
        data (){
            return {
                showMenu: false,
                pageType: 'profile',
                hdTitle: '个人主页',
                profileId: '',
                myHome: false,
                info: {},
				list: [],
				result: {},
				showLoad: false,
				showNodata: false,
				nodataMsg: '',
				transitionName: 'slide-right'
            }
        },
        route:{
            data (transition){
                
                //获取url传的id参数
                this.profileId = transition.to.params.id;

                //如果从详情返回并且typeid一样才去sessionStorge
                if(sessionStorage.profile && transition.from.name === 'asklist'
                	&& (this.profileId=='me'||this.profileId==sessionStorage.profileId)){
                    this.result = JSON.parse(sessionStorage.profile);
                    this.myHome = this.result.myHome;
			    	this.info = this.result.userInfo;
			    	this.list = this.result.postDatingInfoList;
                    this.$nextTick(()=> $(window).scrollTop(sessionStorage.profileScrollTop)); 	

                    var width = $(window).width();
			    	var scrollerW = width * $('.scroller .item').length;
	                $('.basic-info').height(width);
	                $('.scroller .item').width(width);
	                $('.scroller').width(scrollerW);
                }
                else{
                    //页面初次加载获取的数据
                    this.getData();
                }               
                
            },
            activate (transition){
            	if(transition.from.name === 'asklist'){
                	this.transitionName = 'fade';
                }
                setTimeout(function(){
                	transition.next();
                },100);
                
            },
            deactivate (transition){
                if(this.myHome && transition.to.name === 'asklist'){
                    sessionStorage.profileScrollTop = $(window).scrollTop();
                    sessionStorage.profile = JSON.stringify(this.result);
                    sessionStorage.profileId = this.result.userInfo.id;
                    this.transitionName = 'fade';
                }
                else{
                    sessionStorage.removeItem("profileScrollTop");
                    sessionStorage.removeItem("profile");
                    sessionStorage.removeItem("profileId");
                    this.transitionName = 'slide-right';
                }
                setTimeout(function(){
                	transition.next();
                },100);
            }
        },
        methods:{       	
	        //检查localstorage是否存储了头像
	        checkLs (avatar){
	            try {
	                var ls = window.localStorage;

	                if(!ls.getItem('avatar')) {
	                    ls.setItem('avatar', avatar);
	                } else {
	                    if(ls.getItem('avatar')!=avatar) {
	                        ls.setItem('avatar', avatar);
	                    }
	                }
	            }catch(e){
	                
	            }
	        },
            getData (){
                var me = this;

                var params = {
                    id: me.profileId
                };
               	
               	me.showLoad = true;
                Ajax.get(Apimap.profileApi, params,
					function(d){
						me.showLoad = false;

					    if(d.result && d.result.userInfo) {
	                        if(!d.result.userInfo.id) {
	                        	me.showNodata = true;
	                        	me.nodataMsg = '该用户不存在';
	                            return false;
	                        }

	                        var result = d.result,
	                        	userInfo = result.userInfo,
	                        	listArr = result.postDatingInfoList;

					    	me.myHome = result.myHome;
					    	me.info = userInfo;
					    	me.list = listArr;
					    	me.result = result;

					    	if(result.myHome) {
				                me.checkLs(userInfo.avatar);
				            }

				            var width = $(window).width();
					    	var scrollerW = width * $('.scroller .item').length;
			                $('.basic-info').height(width);
			                $('.scroller .item').width(width);
			                $('.scroller').width(scrollerW);
					    } else {
	                        me.showNodata = true;
	                        me.nodataMsg = '返回的数据格式有问题';
	                    }
					},
					function(d){						
	                	me.showLoad = false;

	                    me.showNodata = true;
	                    me.nodataMsg = d.resultMsg;
					}
				);
            },
            yue (id, userId){
                Yue.trigger(id, userId);
            },
            //接受应约
	        acceptAsk: function(did, uid, index) {
	            var me = this;

	            Dialog.confirm({'title': '接受请求', 'body': '接受这个请求的同时将拒绝掉其他请求，确认接受吗？'}, function(){
                    
                    Ajax.post(Apimap.acceptDatingApi, {
		                    'datingId': did,
		                    'userId': uid
		                },
		                function(d){
		                    me.list[index].requestUserInfos[0].requestDatingAccept = true;

		                    Tips.show({
		                        type: 'success',
		                        title: '您已接受，准备赴约吧'
		                    });
		                },
		                function(d){

		                    Tips.show({
		                        type: 'error',
		                        title: d.resultMsg
		                    });
		                }
		            );
                });
	           	            
	        }
        },
        components:{
            "nvHead": require('./header.vue'),
            "nodata": require('../components/nodata.vue'),        
            "loading": require('../components/loading.vue')
        }
    }
</script>
<style lang="less">
	@import "../assets/less/common/variables.less";
	@import "../assets/less/common/mixins.less";

	.ui-slider {
	    overflow: hidden;

	    img{
	        -webkit-user-drag: none;
	        -webkit-user-select: none;
	    }

	    .icons{
	        padding-top: 10px;
	        text-align: center;
	        i{
	            background-color: @silver;
	            width: 16px;
	            height: 6px;
	            border-radius: 20px;
	            display: inline-block;
	            vertical-align: middle;
	            margin: 1px;
	            &.current{
	                background-color: @turquoise;
	            }
	        }
	    }

	}

	.badge-ribbon {
		position: relative;
		background: @turquoise;
		height: 30px;
		width: 30px;
		.border-radius(50%);
	}
	.badge-ribbon:before,
	.badge-ribbon:after {
		content: '';
		position: absolute;
		border-bottom: 21px solid @turquoise;
		border-left: 12px solid transparent;
		border-right: 12px solid transparent;
		top: 21px;
		left: -3px;
		.transform(rotate(-140deg));
	}
	.badge-ribbon:after {
		left: auto;
		right: -3px;
		.transform(rotate(140deg));
	}

	.basic-info {
		position: relative;
		height: 375px;
		.ui-slider;
		.scroller{
	        .clearfix;
	        .item{ 
	        	float: left;
	        	width: 100%;
	        	img {
	        		display: block;
	                width: 100%;
	                background-size: cover;
	                background-position: center center;
	                background-repeat: no-repeat;
	        	}
	        }
	    }
	    .icons {
	    	position: absolute;
	        top: 0;
	        left: 0;
	        width: 100%;
	        padding-top: 20px;
	    }
		.info {
			position: absolute;
		    bottom: 0;
		    left: 0;
		    width: 100%;
		    height: 60px;
		    color: #fff;
		    background: -webkit-gradient(linear, left top, left bottom, from(transparent), to(rgba(0,0,0,0.5)));
		    background: -webkit-linear-gradient(top, transparent 0%, rgba(0,0,0,0.5) 100%);
		    background: linear-gradient(to bottom, transparent 10px, rgba(0,0,0,0.6) 100%);

			.name {
				margin-bottom: 5px;
				font-size: 20px;
				font-weight: 600;
				text-align: center;
			}
			.profession {
				text-align: center;		
				font-size: 14px;	
				
			}
		}
		.top-info {
			position: absolute;
		    top: 0;
		    left: 0;
		    width: 100%;
		    height: 50px;
		    color: #fff;
			background: -webkit-gradient(linear, left bottom, left top, from(transparent), to(rgba(0,0,0,0.5)));
		    background: -webkit-linear-gradient(bottom, transparent 0%, rgba(0,0,0,0.5) 100%);
		    background: linear-gradient(to top, transparent 0%, rgba(0,0,0,0.5) 100%);
		    li {
		    	float: left;
		    	padding: 10px 10px 0;
		    	text-align: center;
		    	.iconfont {
		    		font-size: 15px;
		    	}
		    }
		    .info-age, .info-constellation {
		    	float: right;
		    }
		}
		.side-action {
			position: absolute;
			z-index: 99;
			right: 10px;
			bottom: 60px;		
			.pub-date {
				display: block;
				width: 30px;
				height: 30px;
				line-height: 30px;
				color: #fff;
				font-size: 14px;
				text-align: center;
				background: @green-sea;
				.border-radius(50%);
				.box-shadow(0 2px 4px rgba(0,0,0,.5));
			}
		}

	}
	.details {
		.clearfix;
		background: #fff;
		.stat {
			.clearfix;
			background-color: #fff;
			.stat-item {
				position: relative;
				float: left;
				padding: 12px 0;
				width: 50%;
				text-align: center;
				line-height: 1.6;
				font-size: 16px;
				.hairline(right, @borderColor);
				&:last-child {
					.hairline-remove(right);
				}
				h3 {
					margin: 0;
					font-weight: normal;
				}
			}
		}
	}
	.dating-con {
	    margin-top: 20px;
	    .ask-lnk {
	    	margin: 0 20px 20px;
	    	height: 50px;
	    	line-height: 50px;
	    	text-align: center;
	    	font-size: 15px;
	    	background: #fff;
			.border-radius(5px);
	    	.ar-lnk {
	    		background-size: 15px 25px;
	    	}
	    }
	}
	.dating-list {
	    padding: 0 30px;
	    background-color: #fff;
	    .empty-item {
	    	padding: 30px 0;
	    	text-align: center;
	    	.empty-tip {
	    		font-size: 16px;
	    		color: #999;
	    	}
	    	.btn {
	    		margin-top: 20px;
	    		height: 40px;
	    		line-height: 40px;
	    	}
	    }
	    .item {
	        position: relative;
	        padding: 20px 0;
	        border-bottom: 1px solid @border-color;
	        .who {
	        	display: block;
	        	img {
	        		margin-right: 5px;
	        		width: 30px;
	        		height: 30px;
	        		display: inline-block;
	        		vertical-align: middle;
	        		.border-radius(50%);
	        	}
	        	.name {
	        		color: @green-sea;
	        		font-size: 14px;
	        		vertical-align: middle;
	        	}
	        }
	        .date-words {
	            line-height: 1.8;
	            font-size: 16px;
	            .icon-lquote {
	                position: absolute;
	                top: 18px;
	                left: 0;
	            }
	            .label {
	                padding-left: 20px;
	                height: 30px;
	                color: @green-sea;
	            }
	        }
	        .date-info {
	            line-height: 1.8;
	            color: #999;
	            .what, .address {
	                margin-right: 10px;
	            }
	            .iconfont {
	                margin-right: 3px;
	                font-size: 12px;
	            }
	        }
	        .g-yue {
	        	top: auto;
	        	bottom: 15px;
	        	right: 0;
	        }
	        .yue-status {
	        	position: absolute;
	        	top: 0;
	        	left: 0;
				.flag {
					position: relative;
					width: 50px;
					height: 30px;
					padding-top: 10px;
					background: @turquoise;
					color: #fff;
					font-size: 12px;
					text-align: center;
					&:after {
						content: "";
						position: absolute;
						left: 0;
						bottom: -1px;
						width: 0;
						height: 0;
						border-bottom: 10px solid #fff;
						border-left: 25px solid transparent;
						border-right: 25px solid transparent;
					}
				}
	        }
	        .request-list {
	        	position: relative;
	        	margin-top: 10px;
		        background: @gray;
		        .arrow {
		        	position: absolute;
		        	z-index: 9;
		        	top: -15px;
		        	left: 20px;
		        	height: 0;
					width: 0;
					overflow: hidden;
					font-size: 0;
					line-height: 0;
					border-color: transparent transparent @gray transparent;
					border-style: solid;
					border-width: 8px;
		        }
		        .request-item {
		        	.clearfix;
		        	position: relative;
		        	padding: 10px 50px 10px 10px;
		        	border-bottom: 1px solid @border-color;
		        	&:last-child {
		        		border: 0;
		        	}
		        	.avatar {
		        		float: left;
		        		margin-right: 10px;
		        		width: 30px;
		        		height: 30px;
		        		overflow: hidden;
		        		.border-radius(50%);
		        		img {
		        			display: block;
		        			width: 30px;
		        			height: 30px;
		        		}
		        	}
		        	.info {
		        		font-size: 14px;
		        		overflow: hidden;
		        		.name {
		        			margin-bottom: 2px;
							.pub-time {
								margin-left: 10px;
								color: #999;
								font-size: 12px;
							}
		        		}
		        		.title {
		        			margin-bottom: 2px;
		        			color: #999;
		        		}
		        	}
		        	.action-area {
		        		position: absolute;
		        		bottom: 10px;
		        		right: 10px;
		        		z-index: 9;
		        	}
		        	.icon-checked {
		        		margin-right: 5px;
		        		color: @green-sea;
		        	}
		        	.icon-message {
		        		color: @green-sea;
		        	}
		        	.icon-no {
		        		color: @alizarin;
		        	}
		        	.no-response {
		        		color: #999;
		        		font-size: 14px;
		        	}
		        }
		    }
	    }
	}

</style>
