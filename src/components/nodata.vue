<template>
    <div class="g-nodata" v-if="show">
        <i class="iconfont icon-warn"></i>
        <div>{{msg || '还没有任何数据记录'}}</div>
    </div>
</template>

<script>

    export default {
        //replace:true,
        props: ['show', 'msg'],
        ready (){
            
        }
    }
</script>
