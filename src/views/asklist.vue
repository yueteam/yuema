<template>
	<!-- 全局header -->
    <nv-head :page-type="pageType"
            :show-menu="showMenu" :hd-title="hdTitle">
    </nv-head>
    <section class="page-content" transition="slide-right">
    	
        <ul class="dating-list">
            <li class="empty-item" v-if="list.length==0">
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
				                <a class="iconfont icon-message" href="./chat.html?uid=<%= list[i].postUserInfo.id %>&did=<%= list[i].datingInfo.uUID %>"></a>
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
    var Loading = require('../components/loading');

    export default {
        ready (){
        	this.getData();
        },
        data (){
            return {
                showMenu: false,
                pageType: 'asklist',
                hdTitle: '我请求的约会',
                pageNo: 1,
				list: []
            }
        },
        methods:{ 
            getData (){
                var me = this;
               	
               	Loading.show();
                Ajax.get(Apimap.myRequestApi, {
                		page: me.pageNo
                	},
					function(d){
						Loading.hide();

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
						Loading.hide();

	                    Tips.show({
	                        type: 'error',
	                        title: d.resultMsg
	                    });
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
</style>
