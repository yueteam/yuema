<template>
    <!-- 全局header -->
    <nv-head :page-type="pageType"
            :show-menu="showMenu" :hd-title="hdTitle" :cur-tab="searchKey.tab">
    </nv-head>

    <section class="page-content" transition="fade">
        <nodata :show="showNodata" :msg="nodataMsg"></nodata>
        <ul class="list">
            <li class="item" v-for="item in items">
                <div v-link="{name:'profile',params:{id:item.postUserInfo.id}}">
                    <div class="avatar">
                        <img :src="item.postUserInfo.avatar | getAvatar 120" alt="" />
                    </div>
                    <div class="info-box">
                        <div class="name">{{item.postUserInfo.nickName}}</div>
                        <div class="info">
                            {{item.postUserInfo.birthday | getAge}}岁, 
                            {{item.postUserInfo.sex | getSex}}, 
                            {{item.postUserInfo.cityId | getCityName}}
                        </div>
                        <div class="info career-info">{{item.postUserInfo.socialId | getProfession item.postUserInfo.career}}</div>
                    </div>
                    <div class="latest-date">
                        <span class="label">约吗？</span>{{item.datingInfo.article}}
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
                </div>
                <a class="g-yue" href="javascript:;" @click="yue(item.datingInfo.uUID,item.datingInfo.userId)">
                    <span class="iconfont icon-yes"></span>
                </a>
            </li>
        </ul>
        <loading :show-load="showLoad" :load-type="loadType" :show-loading="showScroll" :load-end="loadEnd"></loading>
    </section>
</template>

<script>
    var Utils = require("../libs/utils");
    var Apimap = require('../libs/apimap');
    var Tips = require('../components/tips');
    var Ajax = require('../components/ajax');
    var Yue = require('../components/yue');

    export default {
        data (){
            return {
                showMenu: false,
                scroll: true,
                showLoad: false,
                loadType: 'loadmore',
                showScroll: false,
                loadEnd: false,
                pageType: 'list',
                hdTitle: '约吗',
                items: [],
                searchKey: {
                    pageNo: 1,
                    tab: 'all'
                },
                searchDataStr:'',
                showNodata: false,
                nodataMsg: ''
            }
        },
        route:{
            data (transition){
                let query = transition.to.query,
                    tab = query.tab || 'all';

                //记录首次加载的查询条件
                if(this.searchDataStr == ""){
                    this.searchDataStr = JSON.stringify(this.searchKey);
                }
                //如果从左侧切换分类，则清空查询条件
                if(transition.from.name === "list"){
                    this.loadEnd = false;
                    this.items = [];
                    this.searchKey.pageNo = 1;
                }

                //如果从详情返回并且typeid一样才去sessionStorge
                if(sessionStorage.searchKey && transition.from.name === "profile"
                    && sessionStorage.tab == tab){
                    this.items = JSON.parse(sessionStorage.items);
                    this.searchKey = JSON.parse(sessionStorage.searchKey);
                    this.$nextTick(()=> $(window).scrollTop(sessionStorage.scrollTop));
                }
                else{
                    //页面初次加载获取的数据
                    this.searchKey.tab = tab;
                    this.getItems();
                }

                //滚动加载
                $(window).on('scroll', () => {
                    this.getScrollData();
                });

            },
            deactivate (transition){
                $(window).off('scroll');
                if(transition.to.name === "profile"){
                    sessionStorage.scrollTop = $(window).scrollTop();
                    sessionStorage.items = JSON.stringify(this.items);
                    sessionStorage.searchKey = JSON.stringify(this.searchKey);
                    sessionStorage.tab = transition.from.query.tab || 'all';
                }
                else{
                    sessionStorage.removeItem("scrollTop");
                    sessionStorage.removeItem("items");
                    sessionStorage.removeItem("searchKey");
                    sessionStorage.removeItem("tab");
                }
                transition.next();
            }
        },
        methods:{
            getItems (){
                var me = this;

                var searchKey = this.searchKey;
                
                if(searchKey.tab == 'all') {
                    var params = {
                        'page': searchKey.pageNo
                    };
                } else {
                    var params = {
                        'page': searchKey.pageNo,
                        'type': 'category',
                        'category': searchKey.tab
                    };
                }
               
                Ajax.get(Apimap.listApi, params,
                    function(d){
                        me.showScroll = false;

                        if(d.result && d.result.datingList) {
                            var listData  = d.result.datingList;

                            if(listData.length === 0) {
                                if(searchKey.pageNo === 1) {
                                    me.showLoad = false;
                                    me.showNodata = true;
                                    me.nodataMsg = '暂时没什么约会，过会来看看吧~';
                                } else {
                                    me.showLoad = true;
                                    me.loadEnd = true;
                                }
                            } else {
                                me.items = me.items.concat(listData);
                                searchKey.pageNo++;
                                me.scroll = true;
                                me.showLoad = true;
                                if(listData.length < 21) {
                                    me.loadEnd = true;
                                    me.scroll = false;
                                }
                            }
                            
                        } else {
                            Tips.show({
                                type: 'error',
                                title: '返回的数据格式有问题'
                            });
                            me.scroll = true;
                        }
                    },
                    function(d){
                        me.scroll = true;
                        me.showScroll = false;

                        Tips.show({
                            type: 'error',
                            title: d.resultMsg
                        });
                    }
                );
            },
            //滚动加载数据
            getScrollData (){
                if(this.scroll){
                    let totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());
                    if ($(document).height() <= totalheight + 200) {
                        this.scroll = false;
                        this.showLoad = true;
                        this.showScroll = true;
                        this.getItems();
                    }
                }
            },
            yue (id, userId){
                Yue.trigger(id, userId);
            }
        },
        components:{
            "nvHead": require('./header.vue'),
            "nodata": require('../components/nodata.vue'),        
            "loading": require('../components/loading.vue')
        }
    }
</script>

<style lang="sass">
    $border-color: #EEEEF2;
    $text-color: #333;
    $green-sea: #61c8d1;

    .clearfix {
      *zoom: 1;
      &:before,
      &:after {
        content: "";
        display: table;
        clear: both;
      }
    }

    .list {
        background-color: #fff;
        .item {
            position: relative;
            padding: 12px;
            border-bottom: 1px solid $border-color;
            .item-lnk {
                @extend .clearfix;
                display: block;
                color: $text-color;
            }
            .avatar {
                float: left;
                margin-right: 12px;
                width: 68px;
                height: 68px;
                overflow: hidden;
                -webkit-border-radius: 50%;
                border-radius: 50%;
                img {
                    display: block;
                    width: 68px;
                }
            }
            .info-box {
                height: 68px;
                font-size: 14px;
                overflow: hidden;
                .name {
                    margin-bottom: 6px;
                }
                .info {
                    color: #999;
                    line-height: 1.4;
                }
                .career-info {
                    padding-right: 50px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
            .latest-date {
                margin-top: 12px;
                line-height: 1.6;
                font-size: 16px;
                .label {
                    color: $green-sea;
                }
            }
            .date-info {
                color: #999;
                .what, .address {
                    margin-right: 10px;
                }
                .iconfont {
                    margin-right: 3px;
                    font-size: 12px;
                }
            }
        }
    }
</style>