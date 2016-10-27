<template>
	<!-- 全局header -->
    <nv-head :page-type="pageType" :hd-title="hdTitle" 
             :show-menu="showMenu" :menu-back="menuBack">
    </nv-head>
    <loading :show-load="showLoad" load-type="loadmodal"></loading>
    <section class="page-content" transition="slide-right" style="background:#fff">   	
        <ul class="dating-list">
            <li class="empty-item" v-if="ajaxComplete && list.length==0">
                <div class="empty-tip">
			    快去看看有没有心仪的约会，晚了就被别人约走了！
			    </div>
			    <a class="btn btn-primary" v-link="{name:'list'}">
			        <span class="iconfont icon-yes"></span>寻找约会
			    </a>
            </li> 
            <li class="item" v-else v-for="item in list">
                <a class="who" v-link="{name: 'profile', params: {id: item.postUserInfo.id}}">
			        <img :src="item.postUserInfo.avatar | getAvatar 60" alt="" />
			        <span class="name">{{item.postUserInfo.nickName}}</span>
			    </a>
			    <div class="date-words"> 
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
			    <div class="request-list">
			        <span class="arrow"></span>
			        <div class="request-item">
			            <div class="info">
			                <div class="title">
			                    我: 
			                </div>
			                <div class="words">{{ item.requestDatingMessage }}</div>
			            </div>
			            <div class="action-area">
			                <span v-if="item.datingStatus=='accepted'">
				                <span class="iconfont icon-checked"></span>
				                <a class="iconfont icon-message" 
				                	v-link="{name:'chat',params:{uid:item.postUserInfo.id,did:item.datingInfo.uUID}}"></a>
				            </span>
			                <span class="iconfont icon-no" v-if="item.datingStatus=='rejected'"></span>
			                <span class="no-response" v-if="item.datingStatus!='accepted'&&item.datingStatus!='rejected'">还没回音</span>
			            </div>
			        </div>
			    </div>
            </li>
        </ul>
    </section>
</template>
<script>
    var Apimap = require('../libs/apimap');
    var Tips = require('../components/tips');
    var Ajax = require('../components/ajax');

    export default {
        ready (){
        	this.getData();
        	setTimeout(function(){
		        $(window).scrollTop(0);
		    },150);
        },
        data (){
            return {
                showMenu: false,
                pageType: 'asklist',
                hdTitle: '我请求的约会',
                menuBack: true,
                pageNo: 1,
				list: [],
				ajaxComplete: false,
				showLoad: false
            }
        },
        methods:{ 
            getData (){
                var me = this;
               	
               	me.showLoad = true;
                Ajax.get(Apimap.myRequestApi, {
                		page: me.pageNo
                	},
					function(d){
						me.showLoad = false;
						me.ajaxComplete = true;

					    if(d.result && d.result.datingList) {
	                        var result = d.result,
	                        	listArr = result.datingList;

					    	me.list = listArr;
					    	
					    } else {
	                        Tips.show({
		                        type: 'error',
		                        title: '返回的数据格式有问题'
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
            "nvHead":require('./header.vue'),        
            "loading": require('../components/loading.vue')
        }
    }
</script>
<style lang="less">
</style>
