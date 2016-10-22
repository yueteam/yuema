<template>
    <div class="user-info">
        <!-- 未登录 -->
        <div class="menu-profile" v-if="!nickname" @click="goEnter">
            <span class="iconfont icon-account"></span>          
            <span class="login-info">
            请登录
            </span>
        </div>
        <!-- 已登录 -->
        <div class="menu-profile" v-if="nickname" @click="goUser">
            <div class="avatar"><img v-if="avatar_url" :src="avatar_url"></div>
            <span class="login-info">
                {{nickname}}
            </span>
        </div>
    </div>
</template>
<script>
    var Utils = require('../libs/utils');

    export default {
        replace:true,
        data () {
            var nickname = '';
            if(Utils.isLogin()) {
                nickname = Utils.getCookie('nick_name');
            }
            return {
                nickname: nickname || '',
                avatar_url: localStorage.avatar ? localStorage.avatar+'_s120' : ''
            }
        },
        methods:{
            goEnter (){
                var link = window.location.protocol + '//' + window.location.host + '/login.html?redirect='+ encodeURIComponent(this.$route.path);
                this.location.href = link;
            },
            goUser (){
                this.$route.router.go({name:'profile', params:{id:'me'}});
            }
        }
    }
</script>

<style lang="sass">

</style>