export default {
    setFontSize(state, payload) {
        state.defaultFontSize = payload
    },
    setTheme(state, payload) {
        state.defaultTheme = payload
    },
    onProgressChange(state, payload) {
        state.progress = payload
    },
    onProgressInput(state, payload) {
        state.progress = payload
    },
    getNavigation(state, payload) {
        state.navigation = payload
    }

}