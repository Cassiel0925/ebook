<template>
    <div class="setting-theme">
        <div class="setting-theme-item" v-for="(item, index) in themeList" :key="index">
            <div class="preview" 
                :style="{background: item.style.body.background}"
                :class="{'no-border': item.style.body.background !== '#fff'}"
                @click="setTheme(index)"></div>
            <div class="text" :class="{'selected': defaultTheme === index}">{{item.name}}</div>
        </div>
    </div>
</template>
<script>
export default {
   name:'SettingTheme',
   computed: {
       themeList() {
           return this.$store.state.themeList
       },
       defaultTheme() {
           return this.$store.state.defaultTheme
       }
   },
   methods: {
       setTheme(index) {
           this.$store.commit('setTheme', index)
       }
   }
}
</script>
<style lang="scss" scoped>
@import "../../../assets/styles/global";
.setting-theme{
    height: 100%;
    display: flex;
    .setting-theme-item{
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: px2rem(5);
        box-sizing: border-box;
        .preview {
            flex: 1;
            border: px2rem(1) solid #ccc;
            box-sizing: border-box;
            &.no-border {
                border: none;
            }
        }
        .text {
            flex: 0 0 px2rem(20);
            font-size: px2rem(14);
            color: #ccc;
            @include center;
            &.selected {
                color: #000;
            }
        }
    }
}
</style>
