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

    <div v-if="loadType=='loadmodal'" v-show="showLoad" class="preloader-indicator-overlay"></div>
    <div v-if="loadType=='loadmodal'" v-show="showLoad" class="preloader-indicator-modal">
        <span class="preloader preloader-white"></span>
        <span class="msg">数据加载中...</span>
    </div>
</template>

<script>

    export default {
        replace:true,
        props: ['loadType', 'showLoad', 'showLoading', 'loadEnd'],
        ready (){
            if(this.loadType == 'loadmodal') {
                var $loaderModal = $('.preloader-indicator-modal');
                var w = parseInt($loaderModal.width())/2;
                var h = parseInt($loaderModal.height())/2;

                //25是loading图标的一半是17，padding的8
                $('.preloader-indicator-modal .preloader').css('marginLeft', (w-25) + 'px');

                $loaderModal.css({
                    'marginLeft': '-' + w + 'px',
                    'marginTop': '-' + h + 'px'
                });
            }
        }
    }
</script>
