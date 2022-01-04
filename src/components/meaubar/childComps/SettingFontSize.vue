<template>
    <div class="setting-font-size">
        <div class="preview" :style="{fontSize: firstFontSize}">A</div>
        
        <div class="select">
            <div class="select-wrapper" 
                 v-for="(item, index) in fontSizeList" :key="index"
                 @click="setFontSize(item.fontSize)">
                <div class="line"></div>
                <div class="point-wrapper">
                    <div class="point" v-show="defaultFontSize === item.fontSize">
                        <div class="small-point"></div>
                    </div>
                </div>
                <div class="line"></div>
            </div>
        </div>
        
        <div class="preview" :style="{fontSize: lastFontSize}">A</div>
    </div>
</template>
<script>

export default {
   name:'SettingFontSize',
   data () {
       return {
        
       }
   },
   computed: {
       fontSizeList() {
            return this.$store.state.fontSizeList
       },
       firstFontSize() {
            return this.$store.state.fontSizeList[0].fontSize + 'px'
        },
        lastFontSize() {
            var length = this.$store.state.fontSizeList.length
            return this.$store.state.fontSizeList[length - 1].fontSize + 'px'
        },
        defaultFontSize() {
            return this.$store.state.defaultFontSize
        }
       
   },
   methods: {
    //    字体大小设置
    setFontSize(fontSize) {
        this.$store.commit('setFontSize', fontSize)
    }
   }
}
</script>
<style lang="scss" scoped>
@import "../../../assets/styles/global";
.setting-font-size{
    display: flex;
    height: 100%;
    .preview{
        flex: 0 0 px2rem(40);
        @include center;
    }
    .select {
        display: flex;
        flex: 1;
        .select-wrapper {
            flex: 1;
            display: flex;
            align-items: center;
            &:first-child{
                .line {
                    &:first-child {
                        border-top: none;
                    }
                }
            }
            &:last-child{
                .line {
                    &:last-child {
                        border-top: none;
                    }
                }
            }
            .line {
                flex: 1;
                height: 0;
                border-top: px2rem(1) solid #ccc;
            }
            .point-wrapper {
                height: px2rem(7);
                border-left: px2rem(1) solid #ccc;
                position: relative;
                .point{
                    position: absolute;
                    top: px2rem(-8);
                    left: px2rem(-10);
                    width: px2rem(20);
                    height: px2rem(20);
                    border-radius: 50%;
                    background-color: #fff;
                    border: px2rem(1) solid #ccc;
                    @include center;
                    .small-point{
                        height: px2rem(5);
                        width: px2rem(5);
                        border-radius: 50%;
                        background-color: #000;
                    }
                }
            }
        }
        
    }
}
</style>
