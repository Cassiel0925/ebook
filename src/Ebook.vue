<template>
    <div class="ebook">
        <!-- 标题栏 -->
        <tab-bar :isShow="isShow"/>
        <!-- 电子书 -->
        <div class="read-wrapper">
            <div id="read"></div>
            <div class="mask">
                <div class="left" @click="prevPage"></div>
                <div class="center" @click="toggle"></div>
                <div class="right" @click="nextPage"></div>
            </div>
            
        </div>
        <!-- 菜单栏 -->
        <meau-bar :isShow="isShow"
                  ref="setting"
                  :bookAvailable="bookAvailable"
                  @jumpTo="jumpTo"
                  />
    </div>
</template>
<script>
import Epub from 'epubjs'
import TabBar from './components/tabbar/TabBar.vue'
import MeauBar from './components/meaubar/MeauBar.vue'

const DOWNLOAD_URL = '/static/2018_book.epub'
export default {
   name:'Ebook',
   components: { 
       TabBar,
       MeauBar 
    },
   data () {
        return {
            isShow: false,
            bookAvailable: false,
            navigation: {}
            
        }
    },
    computed: {
        defaultFontSize() {
            return this.$store.state.defaultFontSize
        },
        themeList() {
            return this.$store.state.themeList
        },
        defaultTheme() {
            return this.$store.state.defaultTheme
        },
        progress() {
            return this.$store.state.progress
        }
    },
    watch: {
        defaultFontSize (newVal, oldVal) {
            // 数据变化后调用setFontSize()
            this.setFontSize()
        },
        defaultTheme (newVal, oldVal) {
            this.setTheme()
        },
        progress (newVal, oldVal) {
            this.onProgressChange()
        }
    },
   methods: {
       showEpub() {
        //    1. 生成book
        this.book = new Epub(DOWNLOAD_URL)
        // 2. 通过renderTo 生成 rendition
        this.rendition = this.book.renderTo('read',{
            width: window.innerWidth,
            height: window.innerHeight
        })
        // 3. 通过rendition.display渲染电子书
        this.rendition.display()

        // 4. 获取themes 对象
        this.themes = this.rendition.themes
        // 5. 设置默认字体
        this.setFontSize()

        // 6. 设置主题
        this.registerTheme()
        this.setTheme()

        // 7. 获取locations对象
        // this.book.ready 当book解析完之后会调用这个函数 调用这个函数返回Promise
        this.book.ready.then(() => {
            // 生成目录
            this.navigation = this.book.navigation
            this.getNavigation(this.navigation)
            
            // 生成locations对象
            return this.book.locations.generate()
        }).then(res => {
            this.locations = this.book.locations
            // 标记电子书解析完毕状态
            this.bookAvailable = true
        })
        
       },

        //    上一页
        prevPage() {
            if(this.rendition) {
                this.rendition.prev()
            }
        },

        // 下一页
        nextPage() {
            if(this.rendition) {
                this.rendition.next()
            }
        },

        // 点击中间
        toggle() {
            this.isShow = !this.isShow
            // 隐藏菜单栏和标题栏
            this.$refs.setting.settingHide()
            // 隐藏目录
            this.$refs.setting.contentHide()
        },

        // 设置字体
        setFontSize() {
            if(this.themes) {
                this.themes.fontSize(this.defaultFontSize + 'px')
            }
        },

        // 主题注册
        registerTheme() {
            this.themeList.forEach(theme => {
                this.themes.register(theme.name, theme.style)
            })
        },
        // 设置主题
        setTheme() {
            this.themes.select(this.themeList[this.defaultTheme].name)
        },

        // 设置进度
        onProgressChange() {
            const percentage = this.progress / 100
            const location = percentage > 0 ? this.locations.cfiFromPercentage(percentage) : 0
            this.rendition.display(location)
        },

        // 目录
        getNavigation(navigation) {
            this.$store.commit('getNavigation', navigation)
        },

        // 跳转到对应的章节
        jumpTo(href) {
            this.rendition.display(href)
            // 隐藏标题栏和菜单栏
            this.toggle()
        }
        
   },
   mounted () {
       this.showEpub()
   }
}
</script>
<style lang="scss" scoped>
@import 'assets/styles/global';
.ebook {
    position: relative;
    .read-wrapper {
        .mask {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 98;
            display: flex;
            .left{
                flex: 0 0 px2rem(100);
            }
            .center {
                flex: 1;
            }
            .right {
                flex: 0 0 px2rem(100);
            }
        }
        
    }
}

</style>
