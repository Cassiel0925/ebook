import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        fontSizeList: [
            { fontSize: 12 },
            { fontSize: 14 },
            { fontSize: 16 },
            { fontSize: 18 },
            { fontSize: 20 },
            { fontSize: 22 },
            { fontSize: 24 },
        ],
        defaultFontSize: 16,
        themeList: [{
                name: 'default',
                style: {
                    body: {
                        'color': '#000',
                        'background': '#fff'
                    }
                }
            },
            {
                name: 'eye',
                style: {
                    body: {
                        'color': '#000',
                        'background': '#ceeaba'
                    }
                }
            },
            {
                name: 'night',
                style: {
                    body: {
                        'color': '#fff',
                        'background': '#000'
                    }
                }
            },
            {
                name: 'gold',
                style: {
                    body: {
                        'color': '#000',
                        'background': 'rgb(241, 236, 226)'
                    }
                }
            },
        ],
        defaultTheme: 0,
        progress: 0,
        navigation: {}
    },
    mutations,
    modules: {

    }
})

export default store