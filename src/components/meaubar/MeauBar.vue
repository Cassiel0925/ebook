<template>
    <div class="meau-bar">
        <transition name="slide-up">
            <div class="meau-bar-wrapper" v-show="isShow" :class="{'no-shadow': isSettingShow}">
                <!-- 目录 -->
                <div class="icon-wrapper">
                    <span class="icon-menu icon" @click="settingShow(3)"></span>
                </div>
                <!-- 进度条 -->
                <div class="icon-wrapper">
                    <span class="icon-git-commit icon" @click="settingShow(2)"></span>
                </div>
                <!-- 主体设置 -->
                <div class="icon-wrapper">
                    <span class="icon-sun icon" @click="settingShow(1)"></span>
                </div>
                <!-- 字体大小设置 -->
                <div class="icon-wrapper">
                    <span class="icon-a icon" @click="settingShow(0)">A</span>
                </div>
            </div>
        </transition>

        <transition name="slide-up">
            <div class="setting-wrapper" v-show="isSettingShow">
                <!-- 字体设置 -->
                <setting-font-size v-if="showTag === 0"/>
                <!-- 主题设置 -->
                <setting-theme v-else-if="showTag === 1"/>
                <!-- 进度设置 -->
                <setting-progress v-else-if="showTag === 2" :bookAvailable="bookAvailable"/>
            </div>
        </transition>

        <!-- 目录内容 -->
        <content-view :bookAvailable="bookAvailable"
                      v-show="isShowContent"
                      @jumpTo="jumpTo"/>

        <!-- 蒙版 -->
        <transition name="fade">
            <div class="content-mask"
                 v-show="isShowContent"
                 @click="contentHide"></div>
        </transition>
    </div>
        
</template>
<script>
import ContentView from './childComps/ContentView.vue'
import SettingFontSize from './childComps/SettingFontSize.vue'
import SettingProgress from './childComps/SettingProgress.vue'
import SettingTheme from './childComps/SettingTheme.vue'

export default {
   name:'MeauBar',
   components: { 
      SettingFontSize,
      SettingTheme,
      SettingProgress,
      ContentView 
    },
   props: {
       isShow: {
           type: Boolean,
           default: false
       },
       bookAvailable: {
           type: Boolean,
           default: false
       }
   },
   data () {
       return {
           isSettingShow: false,
           showTag: 0,
           isShowContent: false
       }
   },
   methods: {
       settingShow(tag) {
           this.showTag = tag
           if(this.showTag === 3) {
               this.isShowContent = true
               this.isSettingShow = false
           } else {
               this.isSettingShow = true
           }
           
       },
       settingHide() {
           this.isSettingShow = false
       },
       contentHide() {
           this.isShowContent = false
       },
       jumpTo(target) {
           this.$emit('jumpTo', target)
       }
       
   }
}
</script>
<style lang="scss" scoped>
@import "../../assets/styles/global";
.meau-bar {
    .meau-bar-wrapper {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: px2rem(49);
        box-shadow: 0 px2rem(-8) px2rem(4) rgba(100, 100, 100, .15);
        background-color: #fff;
        display: flex;
        z-index: 100;
        .icon-wrapper {
            flex: 1;
            @include center;
        }
        &.no-shadow {
            box-shadow: none;
        }
    }
    
    .setting-wrapper {
        position: absolute;
        bottom: px2rem(49);
        left: 0;
        z-index: 101;
        width: 100%;
        height: px2rem(60);
        box-shadow: 0 px2rem(-8) px2rem(4) rgba(100, 100, 100, .15);
        background-color: #fff;
    }

    .content-mask {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background: rgba(51, 51, 51, .8);
        z-index: 10;
    }
}
</style>
