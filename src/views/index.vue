<template>
    <!-- 全局header -->
    <div class="spinner">
        <div class="cube1">
            <h1>约吗</h1>
        </div>
        <div class="cube2">
            <div class="location_indicator"></div>
        </div>
    </div>
</template>
<script>
    export default {
        ready (){
            setTimeout(() => {
                this.$route.router.go({name: 'list'});
            },2000);
        }
    }
</script>
<style lang="less">
    @import "../assets/less/common/variables.less";
    .spinner {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: @alizarin;
    }
    .cube1 {
        position: relative;
        height: 50%;       
        background: @green-sea;
        h1 {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 100px;
            line-height: 100px;
            text-align: center;
            font-size: 30px;
            color: #fff;
        }
    }

    /*Location indicator */
    .location_indicator{
        margin: 30px auto;
        position: relative;
        width: 30px;
    }

    .location_indicator:before, .location_indicator:after{
        position: absolute;
        content: "";
        z-index: 9;
    }

    .location_indicator:before{
        left: 5px;
        width: 20px;
        height: 20px;
        border-radius: 100% 100% 100% 0;
        box-shadow: 0px 0px 0px 2px rgba(255,255,255,1);
        -webkit-animation: mapping 1s linear infinite;
           -moz-animation: mapping 1s linear infinite;
                animation: mapping 1s linear infinite;
        -webkit-transform: rotate(-46deg);
           -moz-transform: rotate(-46deg);
                transform: rotate(-46deg);

    }

    .location_indicator:after{
        top: 24px;
        left: 0;
        width: 30px;
        height: 10px;
        border-radius: 100%;
        background-color: rgba(255, 255, 255, 0.2);
    }

    @-webkit-keyframes mapping{
        0% {top: 0;}
        50%{top: -5px;}
        100% {top:0; }
    }
    @-moz-keyframes mapping{
        0% {top: 0;}
        50%{top: -5px;}
        100% {top:0; }
    }
    @-keyframes mapping{
        0% {top: 0;}
        50%{top: -5px;}
        100% {top:0; }
    }
</style>

