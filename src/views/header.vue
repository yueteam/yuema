<template>
    <div class="page-cover" v-if="showMenu" @click="closeMenu">
    </div>

    <header id="header" class="header-fixed">
        <h1>{{hdTitle}}</h1>
        <a href="javascript:;" class="menu-back" v-if="pageType=='chat'||pageType=='profile'||pageType=='asklist'" @click="goBack"></a>
        <a href="javascript:;" class="menu-trigger" v-else @click="toggleMenu"></a>
        <a href="javascript:;" class="menu-right menu-filter" v-if="pageType=='list'" @click="toggleFilter">
            <span class="iconfont icon-filter"></span>
        </a>
    </header>

    <nav id="sideBar" class="menu" :class="{'show':showMenu}">      
        <user-info></user-info>
        <ul>
            <li class="menu-item" :class="{'current':pageType=='list'}" v-link="{name:'list'}" @click="closeMenu">
                <span class="iconfont icon-followed"></span>发现
            </li>
            <li class="menu-item" :class="{'current':pageType=='message'}" v-link="{name:'message'}" @click="closeMenu">
                <span class="iconfont icon-message"></span>消息
            </li>
            <li class="menu-item" :class="{'current':pageType=='add'}" v-link="{name:'add'}" @click="closeMenu">
                <span class="iconfont icon-send"></span>发起约会
            </li>
        </ul>
        <a class="menu-set" href="/login.html">
            <span class="iconfont icon-set"></span>
            退出
        </a>
    </nav>

    <div class="g-panel" :class="{'open':showFilter}">
        <ul class="tag-list">
            <li class="tag-item" v-link="{'name':'list',query:{tab:'2'}}" @click="closeFilter">
                <span class="iconfont icon-coffee"></span>喝咖啡/茶
            </li>
            <li class="tag-item" v-link="{'name':'list',query:{tab:'3'}}" @click="closeFilter">
                <span class="iconfont icon-food"></span>美食
            </li>
            <li class="tag-item" v-link="{'name':'list',query:{tab:'4'}}" @click="closeFilter">
                <span class="iconfont icon-film"></span>看电影
            </li>
            <li class="tag-item" v-link="{'name':'list',query:{tab:'11'}}" @click="closeFilter">
                <span class="iconfont icon-flight"></span>同行
            </li>
            <li class="tag-item" v-link="{'name':'list',query:{tab:'5'}}" @click="closeFilter">
                <span class="iconfont icon-run"></span>跑步
            </li>
            <li class="tag-item" v-link="{'name':'list',query:{tab:'7'}}" @click="closeFilter">
                <span class="iconfont icon-badminton"></span>羽毛球
            </li>
            <li class="tag-item" v-link="{'name':'list',query:{tab:'8'}}" @click="closeFilter">
                <span class="iconfont icon-riding"></span>骑行
            </li>
            <li class="tag-item" v-link="{'name':'list',query:{tab:'9'}}" @click="closeFilter">
                <span class="iconfont icon-drive"></span>自驾
            </li>
            <li class="tag-item" v-link="{'name':'list',query:{tab:'6'}}" @click="closeFilter">
                <span class="iconfont icon-photo"></span>摄影
            </li>
            <li class="tag-item" v-link="{'name':'list',query:{tab:'1'}}" @click="closeFilter">
                <span class="iconfont icon-lquote"></span>其他
            </li>
        </ul>
        <div class="close-panel" @click="closeFilter">
            <span class="iconfont icon-no"></span>
        </div>
    </div>
</template>

<script>

    export default {
        replace:true,
        props: ['hdTitle', 'pageType', 'showMenu', 'showFilter'],
        ready (){
            
        },
        data (){
            return {
                
            }
        },
        methods: {
            goBack (){
                window.history.go(-1);
            },
            toggleMenu (){                
                //$('html, body').addClass('scroll-hide');
                this.showMenu = !this.showMenu;
            },
            closeMenu (){           
                //$('html, body').removeClass('scroll-hide');
                this.showMenu = !this.showMenu;
            },
            toggleFilter (){
                this.showFilter = !this.showFilter;
            },
            closeFilter (){
                this.showFilter = !this.showFilter;
            }
        },
        components:{
            'userInfo':require('./user-info.vue')
        }
    }
</script>
