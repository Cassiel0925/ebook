<template>
    <transition name="slide-down">
        <div class="tab-bar" v-show="isShow" >
            <div class="left">
                <span class="icon-arrow_back_ios icon"></span>
            </div>
            <div class="right">
                <div class="icon-wrapper">
                    <span class="icon-cart icon"></span>
                </div>
                <div class="icon-wrapper">
                    <span class="icon-user icon"></span>
                </div>
                <div class="icon-wrapper">
                    <span class="icon-more-vertical icon"></span>
                </div>
            </div>
        </div>
    </transition>

</template>
<script>
export default {
   name:'TabBar',
   props: {
       isShow: {
           type: Boolean,
           default: false
       }
   }
}
</script>
<style lang='scss' scoped>
@import '../../assets/styles/global';
.tab-bar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: px2rem(45);
    z-index: 100;
    background-color: #fff;
    box-shadow: 0 px2rem(8) px2rem(5) rgba(100,100,100,.3);
    display: flex;
    .left {
        flex: 0 0 px2rem(60);
        @include center;
    }
    .right {
        flex: 1;
        justify-content: flex-end;
        display: flex;
        .icon-wrapper {
            flex: 0 0 px2rem(40);
            @include center;
        }
    }
}
</style>
