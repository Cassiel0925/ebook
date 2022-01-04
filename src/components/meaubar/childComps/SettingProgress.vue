<template>
    <div class="setting-progress">

        <div class="progress-wrapper">
            <input class="progress" type="range"
                                    max="100"
                                    min="0"
                                    step="1"
                                    :value="progress"
                                    :disabled="!bookAvailable"
                                    @change="onProgressChange($event.target.value)"
                                    @input="onProgressInput($event.target.value)"
                                    >
        </div>
        
        <div class="text-wrapper">
            <span>{{bookAvailable ? progress + '%' : '加载中…'}}</span>
        </div>
    </div>
</template>
<script>
export default {
   name:'SettingProgress',
   props: {
       bookAvailable: {
           type: Boolean,
           default: false
       }
   },
   data () {
       return {
       }
   },
   computed: {
       progress() {
           return this.$store.state.progress
       }
   },
   methods: {
    //    拖动进度条时触发事件
       onProgressInput(progress){
           this.$store.commit('onProgressInput', progress)
       },
    //    进度条松开后触发事件，根据进度条数值跳转到指定位置
    onProgressChange(progress) {
        this.$store.commit('onProgressChange', progress)
    }
   }
}
</script>
<style lang="scss" scoped>
@import "../../../assets/styles/global";
.setting-progress {
    position: relative;
    height: 100%;
    width: 100%;
    .progress-wrapper{
        width: 100%;
        height: 100%;
        @include center;
        padding: 0 px2rem(30);
        box-sizing: border-box;
        .progress {
            width: 100%;
            -webkit-appearance: none;
            height: px2rem(2);
            background: -webkit-linear-gradient(#999, #999) no-repeat, #ccc;
            background-size: 0 100%;
            &.focus {
                outline: none;
            }
            &::-webkit-slider-thumb {
                -webkit-appearance: none;
                height: px2rem(20);
                width: px2rem(20);
                border-radius: 50%;
                background: #fff;
                box-shadow: 0 4px 4px 0 rgba(0, 0, 0, .15);
                border: px2rem(1) solid #ddd;
            }
        }
    }
    .text-wrapper {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        color: #333;
        @include center;
        span {
            font-size: px2rem(14);
        }
    }
}
</style>
