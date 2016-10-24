<template>
    <!-- 全局header -->
    <nv-head :page-type="pageType"
            :show-menu="showMenu" :hd-title="hdTitle">
    </nv-head>

    <section class="page-content">
    	<ul class="msg-list">
            <li class="item" v-for="item in list">
		        <a class="item-lnk" href="./chat.html?uid=<%= list[i].postUserId %>&did=<%= list[i].uUID %>">
		            <div class="avatar">
		                <img :src="item.avatar | getAvatar 60" alt="" />
		            </div>
		            <div class="info">
		                <span class="send-time">{{ item.sendTime | ago }}</span>
		                <div class="username">{{ item.from }}</div>
		                <div class="latest-msg">{{ item.message }}</div>
		            </div>
		        </a>
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
                pageType: 'message',
                hdTitle: '消息',
                pageNo: 1,
				list: []
            }
        },
        methods:{ 
            getData (){
                var me = this;
               	
               	Loading.show();
                Ajax.get(Apimap.chatListApi, {},
					function(d){
						Loading.hide();

					    if(d.result && d.result.chatList) {
	                        me.list = d.result.chatList;
					    	
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
	@import "../assets/less/common/variables.less";
	@import "../assets/less/common/mixins.less";

    .msg-list {
	    background-color: #fff;
	    .item {
	        .item-lnk {
	            .clearfix;
	            display: block;
	            padding: 12px;
	            color: @text-color;
	            border-bottom: 1px solid @border-color;
	        }
	        .avatar {
	            float: left;
	            margin-right: 12px;
	            width: 40px;
	            height: 40px;
	            overflow: hidden;
	            .border-radius(5px);
	            img {
	                display: block;
	                width: 40px;
	            }
	        }
	        .info {
	            position: relative;
	            height: 40px;
	            overflow: hidden;
	            .username {
	                font-size: 16px;
	                margin-bottom: 5px;
	            }
	            .latest-msg {
	                font-size: 13px;
	                color: #999;
	            }
	            .send-time {
	                position: absolute;
	                z-index: 9;
	                top: 0;
	                right: 0;
	                color: #999;
	            }
	        }
	    }
	}

</style>

