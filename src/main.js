import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import '@/assets/styles/icon.css'
import '@/assets/styles/global.scss'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})