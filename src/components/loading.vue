<template>
    <div id="loadmore" v-if="loadType=='loadmore'" v-show="showLoad">
        <div class="preloader-label" v-if="showLoading">
            <span class="preloader"></span>
            <span class="msg">数据加载中...</span>
        </div>
        <div class="preloader-label" v-else>
            <span v-if="loadEnd">到这里就没有了~</span>
            <span v-else>上拉加载更多</span>
        </div>
    </div>

    <div v-if="loadType=='loadmodal'" v-show="showLoad && show" class="preloader-indicator-overlay"></div>
    <div v-if="loadType=='loadmodal'" v-show="showLoad && show" class="preloader-indicator-modal">
        <span class="preloader preloader-white"></span>
        <span class="msg">数据加载中...</span>
    </div>
</template>

<script>

    export default {
        replace:true,
        props: ['loadType', 'showLoad', 'showLoading', 'loadEnd'],
        data (){
            return {
                show: false
            }
        },
        ready (){
            var me = this;
            if(this.loadType == 'loadmodal') {

                setTimeout(function(){ // 路由切换场景需要300ms
                    me.show = true;
                    var $loaderModal = $('.preloader-indicator-modal');
                    var w = 43;
                    var h = 35;

                    //25是loading图标的一半是17，padding的8
                    $('.preloader-indicator-modal .preloader').css('marginLeft', (w-25) + 'px');

                    $loaderModal.css({
                        'marginLeft': '-' + w + 'px',
                        'marginTop': '-' + h + 'px'
                    });
                },300);
            }
        }
    }
</script>
